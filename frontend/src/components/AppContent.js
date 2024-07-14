// src/components/AppContent.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Navbar";
import Home from "./Home";
import FlowStart from "./Flow1Start";
import Shop from "./Shop";
import Cart from "./Cart"; // Import Cart component
import Checkout from "./Checkout";
import Payment from "./Payment";
import Confirmation from "./Confirmation";
import Poses from "./Flow2Pose";
import Mudras from "./Flow3Mudras";
import Pranayamas from "./Flow4Pranayams";
import Aromas from "./Flow5Aromas";
import FlowPreview from "./Flow6Preview";
import Flow7Save from "./Flow7Save";
import FlowDetail from "./FlowDetail"; // Import FlowDetail
import MyVinyasas from "./MyVinyasas";
import Test from "./Test";
import Login from "./Login";
import Register from "./Register";
import { AuthProvider } from "../context/AuthContext";
import { FlowProvider } from "../context/FlowContext";
import { CartProvider } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const AppContent = () => {
  return (
    <Router>
      <AuthProvider>
        <FlowProvider>
          <CartProvider>
            <NavigationBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/create-vinyasa" element={<FlowStart />} />
              {/* <Route exact path="/flow-start" element={<FlowStart />} /> */}
              <Route path="/poses" element={<Poses />} />
              <Route path="/mudras" element={<Mudras />} />
              <Route path="/pranayamas" element={<Pranayamas />} />
              <Route path="/aromas" element={<Aromas />} />
              <Route path="/flow-preview" element={<FlowPreview />} />
              <Route path="/save-flow" element={<Flow7Save />} />
              <Route path="/flow-detail/:id" element={<FlowDetail />} />{" "}
              {/* Add FlowDetail route */}
              <Route path="/my-vinyasas" element={<MyVinyasas />} />{" "}
              {/* Add this route */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/test" element={<Test />} />
              <Route path="*" element={<div>404 Not Found</div>} />{" "}
              {/* Catch-all route for undefined paths */}
            </Routes>
          </CartProvider>
        </FlowProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppContent;
