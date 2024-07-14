import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const MyVinyasas = () => {
  const { logout, user } = useAuth();
  const [flows, setFlows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          "http://localhost:5001/api/myvinyasas",
          config
        );
        setFlows(response.data);
      } catch (error) {
        console.error("Error fetching flows:", error);
        if (error.response && error.response.status === 401) {
          logout();
          navigate("/login");
        }
      }
    };

    fetchFlows();
  }, [navigate, logout]);

  const removeFlow = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`http://localhost:5001/api/myvinyasas/${id}`, config);
      setFlows((prevFlows) => prevFlows.filter((flow) => flow.id !== id));
    } catch (error) {
      console.error("Error removing vinyasa:", error);
    }
  };

  if (flows.length === 0) {
    return <div>No flows found. Create a new flow to get started.</div>;
  }

  return (
    <div>
      {user && <h2>Welcome, {user.username}!</h2>}
      <h1>My Saved Flows</h1>
      <ul>
        {flows.map((flow) => (
          <li key={flow.id}>
            <Link to={`/flow-detail/${flow.id}`}>{flow.name}</Link> -{" "}
            {new Date(flow.createdAt).toLocaleString()}
            <button onClick={() => removeFlow(flow.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyVinyasas;
