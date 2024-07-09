import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const VinyasaForm = () => {
  const [formData, setFormData] = useState({
    name: "", // Vinyasa name
    poses: [],
    mudras: [],
    pranayamas: [],
    aromas: [],
    description: "",
  });
  const [posesData, setPosesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/priyangsubanerjee/yogism/master/all-poses.json"
        );
        setPosesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching poses data:", error);
      }
    };

    fetchPoses();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e, category) => {
    const selectedItems = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, [category]: selectedItems });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/vinyasa-preview", { state: formData });
  };

  if (loading) {
    return <div>Loading poses...</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Vinyasa Name"
        required
      />
      <h2>Choose Poses</h2>
      <select
        multiple
        name="poses"
        value={formData.poses}
        onChange={(e) => onSelectChange(e, "poses")}
      >
        {posesData.map((pose) => (
          <option key={uuidv4()} value={pose.english_name}>
            {pose.english_name} ({pose.sanskrit_name}) - {pose.benefits}
          </option>
        ))}
      </select>

      <h2>Choose Mudras</h2>
      <select
        multiple
        name="mudras"
        value={formData.mudras}
        onChange={(e) => onSelectChange(e, "mudras")}
      >
        <option key={uuidv4()} value="Gyan Mudra">
          Gyan Mudra - Improves concentration
        </option>
        <option key={uuidv4()} value="Shuni Mudra">
          Shuni Mudra - Promotes patience
        </option>
      </select>

      <h2>Choose Pranayamas</h2>
      <select
        multiple
        name="pranayamas"
        value={formData.pranayamas}
        onChange={(e) => onSelectChange(e, "pranayamas")}
      >
        <option key={uuidv4()} value="Nadi Shodhana">
          Nadi Shodhana - Balances energy channels
        </option>
        <option key={uuidv4()} value="Kapalabhati">
          Kapalabhati - Cleanses respiratory system
        </option>
      </select>

      <h2>Choose Aromas</h2>
      <select
        multiple
        name="aromas"
        value={formData.aromas}
        onChange={(e) => onSelectChange(e, "aromas")}
      >
        <option key={uuidv4()} value="Lavender">
          Lavender - Calming
        </option>
        <option key={uuidv4()} value="Peppermint">
          Peppermint - Energizing
        </option>
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Description"
      ></textarea>

      <button type="submit">Add To Vinyasa</button>
    </form>
  );
};

export default VinyasaForm;
