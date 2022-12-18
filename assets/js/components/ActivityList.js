import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import loadingIcon from "../../images/Loading_icon.gif";
import SecondaryNavBar from "../components/SecondaryNavBar.js";
import ChecklistItem from "./ChecklistItem";

const ActivityList = () => {
  const [activity, setActivity] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);


  

  const [activeItemsCount, setActiveItemsCount] = useState(0);


  useEffect((e) => {
    const items = JSON.parse(localStorage.getItem('présents'));
    if (items) {
     setTimeout(() => setActiveItemsCount(items), 1000);
    }

  }, []);



  useEffect(() => {
    // console.log(activeItemsCount);
    window.localStorage.setItem('présents', JSON.stringify(activeItemsCount));
  }, [activeItemsCount]);





  let params = useParams();
  const id = params.id;

  useEffect(() => {
    const getActivity = async () => {
      await axios.get(`/api/activities/${id}`).then((response) => {
        const data = response.data;
        setActivity(data);
        setParticipants(
          data.participants.sort((a, b) => a.lastname.localeCompare(b.lastname))
        );
       
      });
    };
    getActivity();
    setLoading(false);


  }, [id]);

const handleReset = () => {
  localStorage.clear();
  location.reload();
}

const handleSave = (e) => {
  const array = [];
  localStorage.setItem("array", JSON.stringify(array))

}

  return (
    <>
      <SecondaryNavBar />

      <div className="">
        <h3 className="">{activity.name}</h3>
      
        <div className="total">
          {" "}
          <p className="text">Total présents: </p>
          <p> {activeItemsCount}</p>
        </div>

        <button className="btn-red" onClick={handleReset}>Reset</button>
        <button className="btn-blue" onClick={handleSave}>Save</button>
        <p className="date">
          Date d'aujourd'hui:{" "}
          {new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(
            new Date()
          )}{" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Présence</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <img className="loading-icon" src={loadingIcon} />
          ) : (
            participants.map((participant, index) => (
              <tr key={participant.id}>
                <th  scope="row">
                  {index + 1}
                </th>
                <td><a href={`/participant-details/${participant.id}`}> {participant.lastname}</a></td>
                <td>{participant.firstname}</td>
                <td>
                <ChecklistItem
                  key={index}
                  participant={participant.id}
                  setActiveItemsCount={setActiveItemsCount}
                   />
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <th>Présent </th>
            <td>{activeItemsCount} </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ActivityList;
