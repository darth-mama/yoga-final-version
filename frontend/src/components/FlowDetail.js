// src/components/FlowDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FlowDetail = () => {
  const { id } = useParams();
  const [flow, setFlow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlow = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          `http://localhost:5001/api/myvinyasas/${id}`,
          config
        );
        setFlow(response.data);
      } catch (error) {
        console.error("Error fetching flow details:", error);
        navigate("/my-vinyasas");
      }
    };

    fetchFlow();
  }, [id, navigate]);

  if (!flow) {
    return <div>Loading flow details...</div>;
  }

  return (
    <div>
      <h1>{flow.name}</h1>
      <p>Created At: {new Date(flow.createdAt).toLocaleString()}</p>
      <h2>Poses</h2>
      <ul>
        {flow.poses.map((pose, index) => (
          <li key={index}>
            <strong>{pose.name}</strong>: {pose.description}
          </li>
        ))}
      </ul>
      <h2>Mudras</h2>
      <ul>
        {flow.mudras.map((mudra, index) => (
          <li key={index}>
            <strong>{mudra.name}</strong>: {mudra.description}
          </li>
        ))}
      </ul>
      <h2>Pranayamas</h2>
      <ul>
        {flow.pranayamas.map((pranayama, index) => (
          <li key={index}>
            <strong>{pranayama.name}</strong>: {pranayama.description}
          </li>
        ))}
      </ul>
      <h2>Aromas</h2>
      <ul>
        {flow.aromas.map((aroma, index) => (
          <li key={index}>
            <strong>{aroma.name}</strong>: {aroma.description}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/my-vinyasas")}>Back to My Flows</button>
    </div>
  );
};

export default FlowDetail;
