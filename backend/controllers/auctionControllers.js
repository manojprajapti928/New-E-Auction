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

// End Auction
exports.endAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const bids = await Bid.findAll({
      where: { auctionId },
      include: [{ model: User, attributes: ["id", "username", "email"] }],
      order: [["amount", "DESC"]],
    });

    if (bids.length > 0) {
      const winningBid = bids[0];

      const product = await Product.findByPk(auctionId);
      product.soldTo = winningBid.User.id;
      await product.save();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "manojprajapti928@gmail.com",
          pass: "pskt xmiz haep xkwt",
        },
      });

      const mailOptions = {
        from: "manojprajapti928@gmail.com",
        to: winningBid.User.email,
        subject: "Congratulations! You won the auction",
        text: `Dear ${winningBid.User.username},\n\nCongratulations! You have won the auction for the product "${product.name}" with a bid of $${winningBid.amount}.\n\nPlease contact us for further details.\n\nBest regards,\nAuction Team`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({
        message: "Auction ended",
        soldTo: winningBid.User.username,
        soldPrice: winningBid.amount,
      });
    } else {
      res.status(404).json({ message: "Product Unsold" });
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

// Cron Job to Update Auction Status
// cron.schedule("* * * * *", async () => {
//   console.log("Running cron job to update expired auctions...");

//   try {
//     const now = new Date();

//     // Find expired auctions that are not marked as ended
//     const expiredAuctions = await Auction.findAll({
//       where: {
//         auctionEnd: { [Op.lte]: now },
//         status: { [Op.ne]: "ended" },
//       },
//     });

//     for (const auction of expiredAuctions) {
//       // Update auction status to "ended"
//       await auction.update({ status: "ended" });

//       console.log(`Auction ID ${auction.id} marked as ended.`);

//       // Notify users or emit WebSocket event if required
//       io.emit('auctionEnded', { auctionId: auction.id });
//     }

//     console.log("Cron job completed successfully.");
//   } catch (error) {
//     console.error("Error in cron job:", error.message);
//   }
// });
