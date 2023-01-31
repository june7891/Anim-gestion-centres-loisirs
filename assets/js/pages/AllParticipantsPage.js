import React, { useState, useEffect } from "react";
import logo from "../../images/Logo_blue.svg";
import ParticipantsList from "../components/ParticipantsList";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ParticipantForm from "../components/ParticipantForm";
import "../../styles/participant/participant.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ParticipantsPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [schoolLevels, setSchoolLevels] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState([]);
  const [enterprise, setEnterprise] = useState();

  useEffect(() => {
    const loggedInUser = window.user;
    if (loggedInUser) {
      setEnterprise(loggedInUser?.["enterprise"]);
      setUser(loggedInUser?.["roles"]);
    }
  });

  const initialValues = {
    enterprise,
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    schoolLevel: "",
    schoolType: "",
    schoolName: "",
    address: "",
    city: "",
    postalCode: "",
    ParentOne: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    ParentTwo: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    activities: [],
  };

  const onSubmit = (values) => {
    values.enterprise = enterprise;
    // console.log(values.enterprise);

    const refreshPage = () => {
      window.location.reload();
    };
    axios
      .post("/api/participants", values)
      .then(function (response) {
        // console.log(response);
        handleClose();
        refreshPage();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Champs obligatoire"),
    lastname: Yup.string().required("Champs obligatoire"),
    dateOfBirth: Yup.string().required("Champs obligatoire"),
    schoolLevel: Yup.string().required("Champs obligatoire"),
    schoolType: Yup.string().required("Champs obligatoire"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  // console.log(formik.touched);

  useEffect(() => {
    axios.get("/api/school_levels").then((response) => {
      // console.log(response.data);
      setSchoolLevels(response.data["hydra:member"]);
    });

    axios.get("/api/school_types").then((response) => {
      // console.log(response.data);
      setSchoolTypes(response.data["hydra:member"]);
    });

    const loggedInUser = window.user;
    const enterprise = loggedInUser?.["enterprise"];
    // console.log(enterprise);
    axios.get(`/api/activities?enterprise=${enterprise}`).then((response) => {
      // console.log(response.data);
      setActivities(response.data["hydra:member"]);
    });
  }, []);

  return (
    <>
      <nav>
        <a href="/">
          <img src={logo} alt="" />{" "}
        </a>
        <div className="links">
          <ul>
            {user[0] === "ROLE_USER" ? (
              ""
            ) : (
              <li onClick={handleShow}>Ajouter un participant </li>
            )}
            <li>
              {" "}
              <Link to="/all-activities">Mes activités</Link>{" "}
            </li>

            <li>
              {" "}
              <a href="/logout">Me déconnecter</a>{" "}
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <ParticipantsList />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h4>Ajouter un nouveau participant</h4>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ParticipantForm />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ParticipantsPage;
