// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AuctionEnded = () => {
//   const { auctionId } = useParams();
//   const [auctionDetails, setAuctionDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//       const fetchAuctionDetails = async () => {
//           try {
//               const response = await axios.get(
//                   `http://localhost:3001/api/auction/getEndAuction/${auctionId}`
//               );
//               setAuctionDetails(response.data);
//               console.log(response.data, "success");
//           } catch (error) {
//               setError("Error fetching auction details.");
//               console.error("Error fetching auction details:", error);
//           }
//       };

//       fetchAuctionDetails();
//   }, [auctionId]);

//   const handlePayment = () => {
//       alert("Proceeding to payment...");
//       navigate(`/payment/${auctionId}`);
//   };

//   if (error) {
//       return <div className="text-center text-red-500">{error}</div>;
//   }

//   if (!auctionDetails) {
//       return <div className="text-center text-white">Loading...</div>;
//   }

//   return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-24 pb-10">
//           <div className="max-w-4xl mx-auto p-6 bg-gray-700 rounded-lg shadow-lg">
//               <h1 className="text-3xl font-bold text-center mb-6">Auction Ended</h1>

//               <div className="flex flex-col items-center">
//                   <h2 className="text-2xl font-semibold">{auctionDetails.endedAuction.product?.name}</h2>
//                   <p className="text-lg text-gray-300 mt-2">Auction Ended On: {new Date(auctionDetails.auctionEnd).toLocaleDateString()}</p>
//                   <p className="text-xl text-green-500 font-bold mt-4">Winning Bid: ₹{auctionDetails.endedAuction.winningBid.amount}</p>

//                   <img
//                       src={auctionDetails.endedAuction.product?.imageUrl}
//                       alt={auctionDetails.endedAuction.product?.name}
//                       className="w-full max-w-md mt-6 rounded-lg shadow-md"
//                   />

//                   <div className="mt-6 text-gray-200">
//                       <h3 className="text-xl font-semibold mb-2">Product Description</h3>
//                       <p>{auctionDetails.endedAuction.product?.description}</p>
//                   </div>

//                   <div className="mt-6 text-gray-200">
//                       <h3 className="text-xl font-semibold mb-2">Winning Bidder</h3>
//                       <p>Name: {auctionDetails.endedAuction.winningBid.user.username || "N/A"}</p>
//                       <p>Email: {auctionDetails.endedAuction.winningBid.user.email || "N/A"}</p>
//                       <p>Winning Bid: ₹{auctionDetails.endedAuction.winningBid.amount}</p>
//                   </div>

//                   <div className="mt-8 flex justify-center">
//                       <button
//                           onClick={handlePayment}
//                           className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
//                       >
//                           Pay Now
//                       </button>
//                   </div>
//               </div>
//           </div>
//       </div>
//   );
// };


// export default AuctionEnded;
