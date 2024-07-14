// src/context/FlowContext.js
import React, { createContext, useState, useContext, useCallback } from "react";

const FlowContext = createContext();

export const useFlow = () => useContext(FlowContext);

export const FlowProvider = ({ children }) => {
  const [flow, setFlow] = useState({
    name: "",
    poses: [],
    mudras: [],
    pranayamas: [],
    aromas: [],
  });

  const addPose = (pose) => {
    setFlow((prevFlow) => ({
      ...prevFlow,
      poses: [...prevFlow.poses, pose],
    }));
  };

  const removePose = (poseId) => {
    setFlow((prevFlow) => ({
      ...prevFlow,
      poses: prevFlow.poses.filter((pose) => pose.id !== poseId),
    }));
  };

  const addMudra = (mudra) => {
    setFlow((prevFlow) => ({
      ...prevFlow,
      mudras: [...prevFlow.mudras, mudra],
    }));
  };

  const removeMudra = (mudraId) => {
    setFlow((prevFlow) => ({
      ...prevFlow,
      mudras: prevFlow.mudras.filter((mudra) => mudra.id !== mudraId),
    }));
  };

  const addPranayama = (pranayama) => {
    setFlow((prevFlow) => ({
      ...prevFlow,
      pranayamas: [...prevFlow.pranayamas, pranayama],
    }));
  };

  const removePranayama = (pranayamaId) => {
    setFlow((prevFlow) => ({
      ...prevFlow,
      pranayamas: prevFlow.pranayamas.filter(
        (pranayama) => pranayama.id !== pranayamaId
      ),
    }));
  };

  const addAroma = (aroma) => {
    setFlow((prevFlow) => ({
      ...prevFlow,
      aromas: [...prevFlow.aromas, aroma],
    }));
  };

  const removeAroma = (aromaId) => {
    setFlow((prevFlow) => ({
      ...prevFlow,
      aromas: prevFlow.aromas.filter((aroma) => aroma.id !== aromaId),
    }));
  };
  const resetFlow = useCallback(() => {
    setFlow({
      name: "",
      poses: [],
      mudras: [],
      pranayamas: [],
      aromas: [],
    });
  }, []);
  // const resetFlow = () => {
  //   setFlow({
  //     name: "",
  //     poses: [],
  //     mudras: [],
  //     pranayamas: [],
  //     aromas: [],
  //   });
  // };
  return (
    <FlowContext.Provider
      value={{
        flow,
        setFlow,
        addPose,
        removePose,
        addMudra,
        removeMudra,
        addPranayama,
        removePranayama,
        addAroma,
        removeAroma,
        resetFlow,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
