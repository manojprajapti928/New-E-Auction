import React from "react";

const WinnerDetails = ({ winner, product }) => {
  if (!winner || !product) {
    return (
      <div className="text-center text-lg text-red-500">
        No winner or product details available.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Bid Winner Details
      </h2>

      {/* Product Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Product Information</h3>
        <p>
          <strong>Product Image:</strong>
          <img src={product.imageUrl} alt="image" />
        </p>
        <p>
          <strong>Product Name:</strong> {product.name}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Final Bid Price:</strong> ${product.finalBidPrice}
        </p>
      </div>

      {/* Winner Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Winner Information</h3>
        <p>
          <strong>Name:</strong> {winner.name}
        </p>
        <p>
          <strong>Email:</strong> {winner.email}
        </p>
        <p>
          <strong>Bid Amount:</strong> ${winner.bidAmount}
        </p>
      </div>

      {/* Optional Message */}
      <div className="mt-4 text-center">
        <p className="text-green-600 font-medium">
          Congratulations to {winner.name} for winning the auction!
        </p>
      </div>
    </div>
  );
};

export default WinnerDetails;
