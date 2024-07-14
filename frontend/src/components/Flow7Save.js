import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../context/FlowContext";
import axios from "axios";

const Flow7Save = () => {
  const { flow, resetFlow } = useFlow();
  const navigate = useNavigate();

  useEffect(() => {
    const saveFlow = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, redirecting to login...");
          navigate("/login");
          return;
        }

        console.log("Saving flow:", flow); // Log the flow data being saved

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.post(
          "http://localhost:5001/api/myvinyasas",
          flow,
          config
        );
        console.log("Flow saved successfully:", response.data);
        resetFlow(); // Clear the flow after saving
        navigate("/my-vinyasas");
      } catch (error) {
        console.error("Error saving flow:", error);
        navigate("/login");
      }
    };

    if (flow.name) {
      saveFlow();
    } else {
      console.log("No flow name found, redirecting to flow start...");
      navigate("/flow-start");
    }
  }, [flow, navigate, resetFlow]);

  return <div>Saving your flow...</div>;
};

export default Flow7Save;
