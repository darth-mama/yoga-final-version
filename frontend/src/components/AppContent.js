// src/components/AppContent.jsimport React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavigationBar from "./Navbar";
import Home from "./Home";
import Flow1Start from "./Flow1Start";
import UserLanding from "./UserLanding";

import Poses from "./Flow2Pose";
import Mudras from "./Flow3Mudras";
import Pranayamas from "./Flow4Pranayams";
import Aromas from "./Flow5Aromas";
import FlowPreview from "./Flow6Preview";
import Flow7Save from "./Flow7Save";
import FlowDetail from "./FlowDetail";
import MyVinyasas from "./MyVinyasas";
import Test from "./Test";
import Login from "./Login";
import Register from "./Register";

import { AuthProvider, useAuth } from "../context/AuthContext";
import { FlowProvider } from "../context/FlowContext";
import { CartProvider } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const AppWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Define the routes where the navbar should not be displayed
  const noNavbarRoutes = ["/shop"];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <NavigationBar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create-vinyasa" element={<Flow1Start />} />{" "}
        {/* Ensure correct path */}
        <Route path="/poses" element={<Poses />} />
        <Route path="/mudras" element={<Mudras />} />
        <Route path="/pranayamas" element={<Pranayamas />} />
        <Route path="/aromas" element={<Aromas />} />
        <Route path="/flow-preview" element={<FlowPreview />} />
        <Route path="/save-flow" element={<Flow7Save />} />
        <Route path="/flow-detail/:id" element={<FlowDetail />} />{" "}
        <Route path="/my-vinyasas" element={<MyVinyasas />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-landing" element={<UserLanding />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<div>404 Not Found</div>} />{" "}
      </Routes>
    </>
  );
};

const AppContent = () => {
  return (
    <Router>
      <AuthProvider>
        <FlowProvider>
          <CartProvider>
            <AppWrapper />
          </CartProvider>
        </FlowProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppContent;
