// src/components/VinyasaList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VinyasaList = () => {
  const [vinyasas, setVinyasas] = useState([]);

  useEffect(() => {
    const fetchVinyasas = async () => {
      const res = await axios.get("/api/vinyasas");
      setVinyasas(res.data);
    };
    fetchVinyasas();
  }, []);

  return (
    <div>
      <h1>Vinyasa Sequences</h1>
      <ul>
        {vinyasas.map((vinyasa) => (
          <li key={vinyasa.id}>
            <Link to={`/vinyasas/${vinyasa.id}`}>{vinyasa.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VinyasaList;
