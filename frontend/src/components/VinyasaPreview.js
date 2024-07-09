import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const VinyasaPreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const saveVinyasa = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/myvinyasas",
        state
      );
      console.log(res.data);
      navigate("/my-vinyasas");
    } catch (error) {
      console.error("Error saving vinyasa:", error);
      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Vinyasa Preview</h1>
      <h2>{state.name}</h2>
      <h3>Poses</h3>
      <ul>
        {state.poses.map((pose) => (
          <li key={uuidv4()}>{pose}</li>
        ))}
      </ul>
      <h3>Mudras</h3>
      <ul>
        {state.mudras.map((mudra) => (
          <li key={uuidv4()}>{mudra}</li>
        ))}
      </ul>
      <h3>Pranayamas</h3>
      <ul>
        {state.pranayamas.map((pranayama) => (
          <li key={uuidv4()}>{pranayama}</li>
        ))}
      </ul>
      <h3>Aromas</h3>
      <ul>
        {state.aromas.map((aroma) => (
          <li key={uuidv4()}>{aroma}</li>
        ))}
      </ul>
      <h3>Description</h3>
      <p>{state.description}</p>
      <button onClick={saveVinyasa}>Save My Vinyasa</button>
    </div>
  );
};

export default VinyasaPreview;
