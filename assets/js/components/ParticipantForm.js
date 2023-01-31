import React, { useState, useEffect } from "react";
import "../../styles/participant/participant.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ParticipantForm = () => {
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
    console.log(values.enterprise);

    const refreshPage = () => {
      window.location.reload();
    };
    axios
      .post("/api/participants", values)
      .then(function (response) {
        console.log(response);
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
    console.log(enterprise);
    axios.get(`/api/activities?enterprise=${enterprise}`).then((response) => {
      // console.log(response.data);
      setActivities(response.data["hydra:member"]);
    });
  }, []);

  return (
    <form className="participant-form" onSubmit={formik.handleSubmit}>
      <div className="row mb-5">
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Nom"
            name="lastname"
            id="lastname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastname}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <p className="error">{formik.errors.firstname}</p>
          ) : null}
        </div>
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Prénom"
            name="firstname"
            id="firstname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstname}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <p className="error">{formik.errors.firstname}</p>
          ) : null}
        </div>
        <div class="form-group col-md-3">
          <input
            type="date"
            class="form-control"
            placeholder="Date de naissance"
            name="dateOfBirth"
            id="dateOfBirth"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <p className="error">{formik.errors.dateOfBirth}</p>
          ) : null}
        </div>
      </div>
      <div class="row mb-5">
        <div class="form-group col-md-3">
          <select
            class="form-control"
            name="schoolLevel"
            id="level"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.schoolLevel}
          >
            <option disabled="disabled" selected="selected" value="">
              Classe*
            </option>
            {schoolLevels.map((level) => (
              <option key={level.id} value={level["@id"]}>
                {level?.level}
              </option>
            ))}
          </select>
          {formik.touched.schoolLevel && formik.errors.schoolLevel ? (
            <div className="error">{formik.errors.schoolLevel}</div>
          ) : null}
        </div>
        <div class="form-group col-md-3">
          <select
            class="form-control"
            name="schoolType"
            id="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.schoolType}
          >
            <option disabled="disabled" selected="selected" value="">
              Type d'école*
            </option>
            {schoolTypes.map((type) => (
              <option key={type.id} value={type["@id"]}>
                {type?.type}
              </option>
            ))}
          </select>
          {formik.touched.schoolType && formik.errors.schoolType ? (
            <div className="error">{formik.errors.schoolType}</div>
          ) : null}
        </div>
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Nom d'école"
            name="schoolName"
            id="school_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.schoolName}
          />
        </div>
      </div>
      <div class="row mb-5">
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Adresse"
            name="address"
            id="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </div>
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Code postale"
            name="postalCode"
            id="postalCode"
            onChange={formik.handleChange}
            value={formik.values.postalCode}
          />
        </div>
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Ville"
            name="city"
            id="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
        </div>
      </div>

      <h3>Information parents</h3>

      <h5>Parent 1</h5>

      <div class="row mb-5">
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Nom"
            name="ParentOne.lastName"
            id="lastName"
            onChange={formik.handleChange}
            value={formik.values.ParentOne.lastName}
          />
        </div>
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Prénom"
            name="ParentOne.firstName"
            id="firstname"
            onChange={formik.handleChange}
            value={formik.values.ParentOne.firstName}
          />
        </div>
      </div>
      <div class="row mb-5">
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="N° de téléphone"
            name="ParentOne.phoneNumber"
            id="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.ParentOne.phoneNumber}
          />
        </div>
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            name="ParentOne.email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.ParentOne.email}
          />
        </div>
      </div>

      <h5>Parent 2</h5>

      <div class="row mb-5">
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Nom"
            name="ParentTwo.lastName"
            id="lastName"
            onChange={formik.handleChange}
            value={formik.values.ParentTwo.lastName}
          />
        </div>
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Prénom"
            name="ParentTwo.firstName"
            id="firstname"
            onChange={formik.handleChange}
            value={formik.values.ParentTwo.firstName}
          />
        </div>
      </div>
      <div class="row mb-5">
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="N° de téléphone"
            name="ParentTwo.phoneNumber"
            id="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.ParentTwo.phoneNumber}
          />
        </div>
        <div class="form-group col-md-3">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            name="ParentTwo.email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.ParentTwo.email}
          />
        </div>
      </div>

      <h3>Activités</h3>
      <div class="form-group">
        <div class="form-check">
          {activities.map((activity) => (
            <>
              <input
                type="checkbox"
                name={`activities`}
                key={activity.id}
                onChange={formik.handleChange}
                value={activity["@id"]}
              />{" "}
              <label>{activity?.name}</label>
            </>
          ))}
        </div>
      </div>
      <button type="submit" className="save-btn">
        Enregistrer
      </button>
    </form>
  );
};

export default ParticipantForm;
