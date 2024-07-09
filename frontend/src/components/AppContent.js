import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VinyasaList from "./VinyasaList";
import VinyasaDetail from "./VinyasaDetail";
import VinyasaForm from "./VinyasaForm";
import VinyasaPreview from "./VinyasaPreview";
import MyVinyasas from "./MyVinyasas";
import Test from "./Test";

const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VinyasaList />} />
        <Route path="/vinyasas/:id" element={<VinyasaDetail />} />
        <Route path="/create-vinyasa" element={<VinyasaForm />} />
        <Route path="/vinyasa-preview" element={<VinyasaPreview />} />
        <Route path="/my-vinyasas" element={<MyVinyasas />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default AppContent;
