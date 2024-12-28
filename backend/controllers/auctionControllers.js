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

// End Auction
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

      // Find the product associated with the auctionId
      // const product = await Product.findByPk(auctionId);

      // Check if the product was found
      // if (!product) {
      //   return res.status(404).json({ message: "Product not found" });
      // }

      // Update the product's 'soldTo' field
      // product.soldTo = winningBid.User.id;
      // await product.save();

      // Set up the email transport and options
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "manojprajapti928@gmail.com",
          pass: "pskt xmiz haep xkwt", // Make sure this is secure
        },
      });

      const mailOptions = {
        from: "manojprajapti928@gmail.com",
        to: winningBid.User.email,
        subject: "🎉 Congratulations! You won the auction 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f9; padding: 20px; border-radius: 10px; width: 600px; margin: 0 auto;">
            <div style="text-align: center; background-color: #4CAF50; color: #fff; padding: 10px; border-radius: 5px;">
              <h2>Congratulations, ${winningBid.User.username}!</h2>
            </div>
            <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px;">
              <p style="font-size: 1.2em; font-weight: bold; color: #333;">🎉 You have won the auction for the product:</p>
              <h3 style="color: #333;">${product.name}</h3>
              <p style="color: #333;">Winning Bid: <strong>$${winningBid.amount}</strong></p>
              <hr style="border: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 1.1em; color: #333;">Please follow the instructions below to claim your product:</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                <p><strong>Claim Your Product:</strong></p>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="padding: 8px; font-size: 1em;">1. Contact us at <a href="mailto:manojprajapti928@gmail.com">manojprajapti928@gmail.com</a> for further instructions.</li>
                  <li style="padding: 8px; font-size: 1em;">2. Provide the auction details and shipping address.</li>
                  <li style="padding: 8px; font-size: 1em;">3. Await confirmation and shipment of your product!</li>
                </ul>
              </div>
              <hr style="border: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 1.1em; color: #333;">We are excited to complete your transaction and thank you for participating in our auction!</p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:manojprajapti928@gmail.com" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Contact Us</a>
              </div>
            </div>
            <div style="text-align: center; margin-top: 30px; font-size: 0.9em; color: #777;">
              <p style="margin-bottom: 10px;">Best regards,</p>
              <p><strong>Auction Team</strong></p>
              <p><a href="mailto:manojprajapti928@gmail.com">manojprajapti928@gmail.com</a></p>
            </div>
          </div>
        `,
      };

      // Send the email to the winning user
      await transporter.sendMail(mailOptions);

      // Respond with a success message
      res.status(200).json({
        message: "Auction ended successfully",
        product: {
          id: product.id,
          name: product.name,
          soldTo: winningBid.User.username,
          soldPrice: winningBid.amount,
        },
      });
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
