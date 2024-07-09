// src/components/VinyasaDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VinyasaDetail = () => {
  const { id } = useParams();
  const [vinyasa, setVinyasa] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVinyasa = async () => {
      const res = await axios.get(`/api/my/vinyasas/${id}`);
      setVinyasa(res.data);
    };
    fetchVinyasa();
  }, [id]);

  const addToAccount = () => {
    // Add logic to add vinyasa to user's account
    // Redirect to login if not logged in
    navigate("/login");
  };

  if (!vinyasa) return <div>Loading...</div>;

  return (
    <div>
      <h1>{vinyasa.name}</h1>
      <p>{vinyasa.description}</p>
      <button onClick={addToAccount}>Add Vinyasa to My Account</button>
    </div>
  );
};

export default VinyasaDetail;
