const Bid = require('../models/Bid');
const Product = require('../models/Product');
const Auction = require('../models/Auction')
const User = require('../models/User');

// const {io} = require('../server')

// Place a bid
exports.placeBid = async (req, res) => {
  const { auctionId, bidAmount } = req.body;
  console.log(req.body,"body")

  console.log(auctionId,bidAmount,"bidAmount")

  try {
    const auction = await Auction.findByPk(auctionId);
    console.log(auction,"auctionId")

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    const product = await Product.findByPk(auction.productId);
    if (!product) {
      return res.status(404).json({ error: "Associated product not found" });
    }
  

    const highestBid = await Bid.findOne({
      where: { auctionId },
      order: [['amount', 'DESC']],
    });
    console.log(highestBid,"highestBid")

    if (highestBid && bidAmount <= highestBid.amount) {
      return res.status(400).json({
        error: `Your bid must be higher than the current highest bid of ${highestBid.amount}`,
      });
    }

    const bid = await Bid.create({
      userId: req.user.userId,
      auctionId,
      amount: bidAmount,
    });

    console.log(bid,"bid")
    const user = await User.findByPk(req.user.userId, {
      attributes: ['username', 'email'],
    });

    res.status(201).json({
      message: 'Bid placed',
      bid: {
        amount: bid.amount,
        username: user.username,
        auctionId: bid.auctionId,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message)
  }
};


  // const { Bid, User, Product } = require("../models");

  exports.getAllBids = async (req, res) => {
    try {
      const bids = await Bid.findAll({
        where: { auctionId: req.params.auctionId },
        include: [
          { model: User, attributes: ['username'] },
          { model: Product, attributes: ['name'] },
        ],
        order: [['amount', 'DESC']],
      });
  
      const highestBid = bids.length > 0 ? bids[0] : null;
  
      res.status(200).json({ message: "All bids retrieved", bids, highestBid });
    } catch (error) {
      console.error("Error retrieving bids:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  
  // Delete a bid (Admin only)
  exports.deleteBid = async (req, res) => {
    const { bidId } = req.params;
  
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
      }
  
      const bid = await Bid.findByPk(bidId);
  
      if (!bid) {
        return res.status(404).json({ error: 'Bid not found' });
      }
  
      await bid.destroy();

      // io.emit('bidDeleted', { bidId });
      res.status(200).json({ message: 'Bid deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
