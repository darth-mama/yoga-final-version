import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get("/api/test");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Test Message from Backend:</h1>
      <p>{message}</p>
    </div>
  );
};

export default Test;
