import React, { useEffect, useState } from "react";
import axios from "axios";

const MyVinyasas = () => {
  const [vinyasas, setVinyasas] = useState([]);

  useEffect(() => {
    const fetchVinyasas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/myvinyasas"
        );
        setVinyasas(response.data);
      } catch (error) {
        console.error("Error fetching vinyasas:", error);
      }
    };

    fetchVinyasas();
  }, []);

  return (
    <div>
      <h1>My Vinyasas</h1>
      {vinyasas.map((vinyasa) => (
        <div key={vinyasa.id}>
          <h2>{vinyasa.name}</h2>
          <p>Created At: {new Date(vinyasa.createdAt).toLocaleString()}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default MyVinyasas;
