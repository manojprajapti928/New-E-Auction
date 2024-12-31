const Product = require("../models/Product");

// Create product (admin only)
exports.createProduct = async (req, res) => {
  const { id, name, description, startingPrice, auctionStart, auctionEnd } =
    req.body;

  try {
    const startTime = new Date(auctionStart);
    const endTime = new Date(auctionEnd);

    if (startTime >= endTime) {
      return res
        .status(400)
        .json({ error: "Auction end time must be after start time." });
    }
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const product = await Product.create({
      id,
      name,
      description,
      startingPrice,
      auctionStart: startTime,
      auctionEnd: endTime,
      imageUrl,
    });

    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, startingPrice, auctionStart, auctionEnd } =
    req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : product.imageUrl;

    await product.update({
      name,
      description,
      startingPrice,
      auctionStart,
      auctionEnd,
      imageUrl,
    });

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
