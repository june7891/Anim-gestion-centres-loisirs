import React from "react";

const DeleteModal = (props) => {
  const hide = () => {
    props.hideModal();
  };

  const deleteItem = () => {
    props.delete();
  };
  return (
    <div>
      <div className="backdrop-modal"></div>
      <div>
        <div className="delete-modal p-3">
          <div className="d-flex flex-row-reverse">
            <button className="btn btn-outline-danger" onClick={hide}>
              X
            </button>
          </div>
          <h5 className="my-3">
            Voulez-vous vraiment supprimer cette activité?
          </h5>
          <div className="d-flex justify-content-end ">
            <button className="btn-blue mx-2" onClick={deleteItem}>
              Oui
            </button>
            <button className="btn-red" onClick={hide}>
              Non
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
