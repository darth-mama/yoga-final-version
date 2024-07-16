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
          console.log("No token found, saving flow to local storage...");
          localStorage.setItem("unsavedFlow", JSON.stringify(flow));
          navigate("/login");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.post(
          "http://localhost:5001/api/myvinyasas",
          flow,
          config
        );
        console.log("Flow saved successfully:", response.data);
        resetFlow();
        localStorage.removeItem("unsavedFlow");
        navigate("/my-vinyasas");
      } catch (error) {
        console.error("Error saving flow:", error);
        navigate("/login");
      }
    };

    if (flow.name) {
      saveFlow();
    } else {
      navigate("/flow-start");
    }
  }, [flow, navigate, resetFlow]);

  return <div>Saving your flow...</div>;
};

export default Flow7Save;
