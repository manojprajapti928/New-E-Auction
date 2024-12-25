import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home";
import Details from "./Component/Details";
import Registration from "./Components/Registration";
import LoginForm from "./Components/LoginForm";
// import AdminLogin from "./Component/AdminLogin";
import AdminDashboard from "./Component/AdminDashboard";
import Dashboard from "./Component/Dashboard";
import UserList from "./Component/UserList";
import UserDetail from "./Component/UserDetail";
import ProductList from "./Component/ProductList";
import AddProduct from "./Component/AddProducts";
import AuctionList from "./Component/AuctionList"; // Import AuctionList
import ProtectedRoute from "./Components/ProtectedRoute";
import BidDetail from "./Component/bidDetail";
import ProductCard from "./Component/ProductCard";
import AddAuction from "./Component/AddAuction";
import UpdateCard from "./Component/UpdateCard";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate authentication (replace this with actual logic)
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <>
    
    
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/Registration" element={<Registration />} />
          {/* <Route path="/AdminLogin" element={<AdminLogin />} /> */}
          <Route path="/AuctionList" element={<AuctionList />} />
          <Route path="/bid-list" element={<BidDetail />} />
          

          {/* Protected routes */}
          <Route
            path="/Home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Details/:auctionId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Details />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserList"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserDetail/:userId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProductList"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddProduct"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProductCard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProductCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddAuction"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddAuction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UpdateCard/:productId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateCard/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
