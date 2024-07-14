// src/components/PoseShop.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../context/FlowContext";
import "./Home.css";
import "../index.css";
import "./PageTitle.css";

const Poses = () => {
  const [posesData, setPosesData] = useState([]);
  const navigate = useNavigate();
  const { flow, addPose, removePose } = useFlow();

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/priyangsubanerjee/yogism/master/all-poses.json"
        );
        setPosesData(
          response.data.map((pose) => ({
            id: uuidv4(),
            name: pose.english_name,
            description: pose.benefits,
          }))
        );
      } catch (error) {
        console.error("Error fetching poses data:", error);
      }
    };

    fetchPoses();
  }, []);

  const togglePose = (pose) => {
    if (flow.poses.find((p) => p.id === pose.id)) {
      removePose(pose.id);
    } else {
      addPose(pose);
    }
  };

  const proceedToNext = () => {
    navigate("/mudras");
  };

  return (
    <Container className="mt-4">
      <div className="text-center">
        <h1 className="page-title">
          <strong>The Yoga Flow (Vinyasa) Arc</strong>
        </h1>
        <div classname="content">
          <p>
            Following this arc and sequence ensures that your body is prepared
            for the next series of poses and remains uninjured. Each phase of
            the arc serves a specific purpose:
          </p>
          <h4>
            <strong>Grounding</strong>
          </h4>
          <p>
            Start with grounding poses to center yourself and establish a strong
            foundation.
          </p>
          <h4>
            <strong>Warming</strong>
          </h4>
          Gradually increase your heart rate and warm up your muscles with
          gentle movements.
          <h4>
            <strong>Heating</strong>
          </h4>
          Move into more dynamic and challenging poses to build strength and
          flexibility.
          <h4>
            <strong>Cooling</strong>{" "}
          </h4>
          Gradually bring your body back to a calm state with cooling poses.
          <h4>
            <strong>Savasana</strong>{" "}
          </h4>
          End with deep relaxation to integrate the benefits of your practice.
        </div>
      </div>
      <br></br>
      <h2 className="text-center mb-4">Choose Your Poses</h2>
      <Row>
        <Col md={12}>
          <div className="text-end">
            <h5 classname="pose-selection">Selected Poses:</h5>
            <ListGroup>
              {flow.poses.map((pose) => (
                <ListGroup.Item key={pose.id}>{pose.name}</ListGroup.Item>
              ))}
            </ListGroup>
            {/* <Button
              className="mt-2 me-2"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </Button> */}
            <Button
              className="mt-2 custom-button"
              variant="success"
              onClick={proceedToNext}
            >
              Continue to Mudras
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        {posesData.map((pose) => (
          <Col md={4} className="mb-4" key={pose.id}>
            <Card>
              <Card.Body>
                <Card.Title>{pose.name}</Card.Title>
                <Card.Text>{pose.description}</Card.Text>
                <Button variant="primary" onClick={() => togglePose(pose)}>
                  {flow.poses.find((p) => p.id === pose.id)
                    ? "Pose Added"
                    : "Add Pose"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Poses;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";

// const Poses = () => {
//   const [poses, setPoses] = useState([]);
//   const [selectedPoses, setSelectedPoses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPoses = async () => {
//       try {
//         const response = await axios.get(
//           "https://raw.githubusercontent.com/priyangsubanerjee/yogism/master/all-poses.json"
//         );
//         const posesData = response.data.map((pose) => ({
//           id: uuidv4(),
//           name: pose.english_name,
//           description: pose.benefits,
//           category: "Pose",
//         }));
//         setPoses(posesData);
//       } catch (error) {
//         console.error("Error fetching poses:", error);
//       }
//     };

//     fetchPoses();
//   }, []);

//   // const addPose = (pose) => {
//   //   setSelectedPoses([...selectedPoses, pose]);
//   // };
//   const togglePose = (pose) => {
//     if (selectedPoses.find((p) => p.id === pose.id)) {
//       setSelectedPoses(selectedPoses.filter((p) => p.id !== pose.id));
//     } else {
//       setSelectedPoses([...selectedPoses, pose]);
//     }
//   };
//   const proceedToNext = () => {
//     navigate("/mudras", { state: { selectedPoses } });
//   };

//   return (
//     <Container className="mt-4">
//       <h1 className="text-center mb-4">Create Your Own Flow</h1>
//       <Row>
//         <Col md={12}>
//           <div className="text-end">
//             <h5>Selected Poses:</h5>
//             <ListGroup>
//               {selectedPoses.map((pose) => (
//                 <ListGroup.Item key={pose.id}>{pose.name}</ListGroup.Item>
//               ))}
//             </ListGroup>
//             <Button className="mt-2" variant="success" onClick={proceedToNext}>
//               Continue to Mudras
//             </Button>
//           </div>
//         </Col>
//       </Row>
//       <Row className="mt-4">
//         {poses.map((pose) => (
//           <Col md={4} className="mb-4" key={pose.id}>
//             <Card>
//               <Card.Body>
//                 <Card.Title>{pose.name}</Card.Title>
//                 <Card.Text>{pose.description}</Card.Text>
//                 <Button variant="primary" onClick={() => togglePose(pose)}>
//                   {selectedPoses.find((p) => p.id === pose.id)
//                     ? "Pose Added"
//                     : "Add Pose"}
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       <Row>
//         <Col md={12}>
//           <div className="text-end">
//             <h5>Selected Poses:</h5>
//             <ListGroup>
//               {selectedPoses.map((pose) => (
//                 <ListGroup.Item key={pose.id}>{pose.name}</ListGroup.Item>
//               ))}
//             </ListGroup>
//             <Button className="mt-2" variant="success" onClick={proceedToNext}>
//               Continue to Mudras
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Poses;

// //   return (
// //     <Container className="mt-4">
// //       <h1 className="text-center mb-4">Create Your Own Flow</h1>
// //       <Row>
// //         {poses.map((pose) => (
// //           <Col md={4} className="mb-4" key={pose.id}>
// //             <Card>
// //               <Card.Body>
// //                 <Card.Title>{pose.name}</Card.Title>
// //                 <Card.Text>{pose.description}</Card.Text>
// //                 <Button variant="primary" onClick={() => addPose(pose)}>
// //                   Add Pose
// //                 </Button>
// //               </Card.Body>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>
// //       <div className="text-center mt-4">
// //         <Button variant="success" onClick={proceedToNext}>
// //           Proceed to Mudras
// //         </Button>
// //       </div>
// //     </Container>
// //   );
// // };

// // export default Poses;
