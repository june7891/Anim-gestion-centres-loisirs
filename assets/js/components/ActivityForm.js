import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const ActivityForm = () => {
  const [enterprise, setEnterprise] = useState();

  useEffect(() => {
    const loggedInUser = window.user;

    if (loggedInUser) {
      setEnterprise(loggedInUser?.["enterprise"]);
    }
  });

  const initialValues = {
    enterprise,
    name: "",
    capacity: 0,
    reference: "",
    price: 0,
    startedAt: "",
    endedAt: "",
    price: 0,
    startDate: "",
    endDate: "",
  };

  const onSubmit = (values, index) => {
    values.enterprise = enterprise;

    const refreshPage = () => {
      window.location.reload();
    };
    axios
      .post("/api/activities", values)
      .then(function (response) {
        // console.log(response);
        refreshPage();
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Champs obligatoire"),
    reference: Yup.string().required("Champs obligatoire"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <form className="activity-form" onSubmit={formik.handleSubmit}>
        <div className="row mb-5">
          <div class="form-group col-md-3">
            <input
              type="text"
              name="name"
              id="activity_name"
              placeholder="Nom d'activité"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="error">{formik.errors.name}</p>
            ) : null}
          </div>
          <div class="form-group col-md-3">
            <input
              type="text"
              name="reference"
              id="reference"
              placeholder="N° de référence"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reference}
            />
            {formik.touched.reference && formik.errors.reference ? (
              <p className="error">{formik.errors.reference}</p>
            ) : null}
          </div>
        </div>

        <div className="row mb-5">
          <div class="form-group col-md-3">
            <label htmlFor="capacity">Capacité</label>
            <input
              className="medium-input"
              type="number"
              name="capacity"
              id="capacity"
              min="0"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.capacity}
            />
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="price">Tarif</label>
            <input
              className="medium-input"
              type="number"
              name="price"
              id="price"
              min="0"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
          </div>
        </div>

        <div className="row mb-5">
          <div class="form-group col-md-3">
            <label htmlFor="started_at">Heure du début</label>
            <input
              className="medium-input"
              type="time"
              name="startedAt"
              id="started_at"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startedAt}
            />
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="ended_at">Heure de la fin</label>
            <input
              className="medium-input"
              type="time"
              name="endedAt"
              id="ended_at"
              placeholder="Heure du la fin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endedAt}
            />
          </div>
        </div>

        <div className="row mb-5">
          <div class="form-group col-md-3">
            <label htmlFor="startDate">Date du début</label>
            <input
              className="medium-input"
              placeholder="Date du début"
              type="date"
              name="startDate"
              id="startDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
            />
          </div>
          <div class="form-group col-md-3">
            <label htmlFor="endDate">Date de la fin</label>
            <input
              className="medium-input"
              type="date"
              name="endDate"
              id="endDate"
              placeholder="Date de la fin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
            />
          </div>
        </div>
        <button type="submit" className="save-btn">
          Enregistrer
        </button>
      </form>
    </>
  );
};

export default ActivityForm;
