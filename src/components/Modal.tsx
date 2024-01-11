import React, { useState } from "react";
import "../css/modal.css";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  const [plannerName, setPlannerName] = useState("");

  const handleConfirm = () => {
    onConfirm(plannerName);
    setPlannerName(""); // Clear the input after confirmation
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Enter a name for your planner</h3>
        <input
          type="text"
          value={plannerName}
          onChange={(e) => setPlannerName(e.target.value)}
        />
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Modal;
