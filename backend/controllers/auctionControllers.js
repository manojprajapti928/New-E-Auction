const cron = require("node-cron");
const Auction = require("../models/Auction");
const Product = require("../models/Product");
const Bid = require("../models/Bid");
const { Op } = require("sequelize");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const moment = require("moment-timezone");

exports.createAuction = async (req, res) => {
  const { productId, auctionStart, auctionEnd } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const existingAuction = await Auction.findOne({
      where: {
        productId: product.id,
        status: { [Op.in]: ["upcoming", "ongoing","completed"] },
      },
    });

    if (existingAuction) {
      return res.status(400).json({ error: "This product is already use in Auction." });
    }

    const startTime = moment.tz(auctionStart, "Asia/Kolkata").toDate();
    const endTime = moment.tz(auctionEnd, "Asia/Kolkata").toDate();
    const now = moment().tz("Asia/Kolkata").toDate();

    if (startTime >= endTime || startTime <= now) {
      return res.status(400).json({ error: "Invalid auction dates provided." });
    }

    let status = "upcoming";
    if (startTime <= now && now < endTime) {
      status = "ongoing";
    } else if (now >= endTime) {
      status = "completed";
    }

    const auction = await Auction.create({
      productId,
      auctionStart: startTime,
      auctionEnd: endTime,
      status,
    });

    await product.update({ status: "pending" });

    cron.schedule(
      `${endTime.getSeconds()} ${endTime.getMinutes()} ${endTime.getHours()} ${endTime.getDate()} ${
        endTime.getMonth() + 1
      } *`,
      async () => {
        console.log(`Auction ${auction.id} is ending...`);
        await auction.update({ status: "completed" });
      }
    );

    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Auctions
exports.getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json({ auctions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Auction by ID
exports.getAuctionById = async (req, res) => {
  const { auctionId } = req.params;

  try {
    const auction = await Auction.findByPk(auctionId, {
      include: [{ model: Product }],
    });

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    res.status(200).json({ auction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Auction Status
exports.updateAuctionStatuses = async () => {
  const now = moment().tz("Asia/Kolkata").toDate();

  // Update upcoming to ongoing
  await Auction.update(
    { status: "ongoing" },
    {
      where: {
        auctionStart: { [Op.lte]: now },
        auctionEnd: { [Op.gt]: now },
        status: "upcoming",
      },
    }
  );

  // Update ongoing to completed
  await Auction.update(
    { status: "completed" },
    {
      where: {
        auctionEnd: { [Op.lte]: now },
        status: "ongoing",
      },
    }
  );
};
cron.schedule("* * * * *", exports.updateAuctionStatuses);



exports.endAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findByPk(auctionId);
    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }


    // Find all bids for the given auctionId
    const bids = await Bid.findAll({
      where: { auctionId },
      include: [{ model: User, attributes: ["id", "username", "email"] }],
      order: [["amount", "DESC"]],
    });

    const product = await Product.findByPk(auction.productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if there are any bids
    if (bids.length > 0) {
      const winningBid = bids[0];

      product.soldTo = winningBid.User.id;
      product.status = "sold";
      await product.save();

      // Delete all non-winning bids
      await Bid.destroy({
        where: {
          auctionId,
          id: { [Op.ne]: winningBid.id },
        },
      });

      // Send email to the winning user
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "manojprajapat928@gmail.com",
          pass: "egou npff eckk aqqe", 
        },
      });

      const mailOptions = {
        from: "manojprajapti928@gmail.com",
        to: winningBid.User.email,
        subject: "🎉 Congratulations! You won the auction 🎉",
        html: `
          <div>
            <h2>Congratulations, ${winningBid.User.username}!</h2>
            <p>You have won the auction for the product: ${product.name}</p>
            <p>Winning Bid: $${winningBid.amount}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      // Check if the logged-in user is the winner
      const loggedInUserId = req.user.userId;

      if (loggedInUserId === winningBid.User.id) {
        // Send full details to the winner
        res.status(200).json({
          message: "Auction ended successfully..............................",
          product: {
            id: product.id,
            name: product.name,
            soldPrice: winningBid.amount,
          },
          winnerDetails: {
            id: winningBid.User.id,
            username: winningBid.User.username,
            email: winningBid.User.email,
            // ABC:"abc"
          },
        
        });
       
      } else {
        // Send limited details to other users
        res.status(200).json({
          message: "Auction ended successfully",
          product: {
            id: product.id,
            name: product.name,
            soldPrice: winningBid.amount,
          },
          winner: {
            username: winningBid.User.username,
          },
        });
      }
    } else {
      product.status = "unsold";
      await product.save();
      res.status(404).json({ message: "No bids placed. Product unsold." });
    }
  } catch (error) {
    console.error("Error ending auction:", error);
    res.status(500).json({ error: error.message });
  }
};




// Delete Auction
exports.deleteAuction = async (req, res) => {
  const { auctionId } = req.params;

  try {
    const auction = await Auction.findByPk(auctionId);

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    await auction.destroy();
    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get Ended Auctions
exports.getEndedAuctions = async (req, res) => {
  try {
    const { auctionId } = req.params;

    // Fetch the specific auction by ID with completed status
    const endedAuction = await Auction.findOne({
      where: { id: auctionId, status: "completed" },
      include: [
        {
          model: Product,
          include: [
            {
              model: Bid,
              order: [["amount", "DESC"]], // Sort bids in descending order
              limit: 1, 
              include: [
                {
                  model: User,
                  attributes: ["id", "username", "email"], // Include user details
                },
              ],
            },
          ],
        },
      ],
    });

    // If no ended auction is found, return a message
    if (!endedAuction) {
      return res.status(404).json({ message: "No ended auction found" });
    }

    // Extracting relevant data
    const winningBid = endedAuction.Product?.Bids[0];
    const response = {
      auctionId: endedAuction.id,
      product: {
        id: endedAuction.Product.id,
        name: endedAuction.Product.name,
        imageUrl: endedAuction.Product.imageUrl,
        description: endedAuction.Product.description,
        
      },
      winningBid: winningBid
        ? {
            amount: winningBid.amount,
            user: {
              id: winningBid.User.id,
              username: winningBid.User.username,
              email: winningBid.User.email,
            },
          }
        : null, 
    };

    
    res.status(200).json({ endedAuction: response });
  } catch (error) {
    console.error("Error fetching ended auction:", error);
    res.status(500).json({ error: error.message });
  }
};
