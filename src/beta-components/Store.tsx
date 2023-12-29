import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const navigate = useNavigate();
  const discs = [
    { id: 1, name: "Disc A", price: "15.99" },
    { id: 2, name: "Disc B", price: "18.50" },
    { id: 3, name: "Disc C", price: "12.85" },
    { id: 4, name: "Disc D", price: "20.50" },
    { id: 5, name: "Disc E", price: "15.65" },
    { id: 6, name: "Disc F", price: "17.50" },
    { id: 7, name: "Disc G", price: "16.75" },
  ];

  const goBack = () => {
    navigate(-1);
  };

  const refresh = () => {
    navigate("/");
  };

  return (
    <section className="main-section text-center">
      <i
        className="fa fa-arrow-left"
        style={{
          position: "absolute",
          top: "30px",
          left: "20px",
          fontSize: "30px",
          color: "white",
          padding: "5px",
        }}
        onClick={goBack}
      ></i>
      {/* Header and other UI elements */}
      <div className="discs-container">
        {discs.map((disc) => (
          <div key={disc.id} className="disc">
            <h3>{disc.name}</h3>
            <p>Price: ${disc.price}</p>
          </div>
        ))}
      </div>
      {/* Footer and other UI elements */}
    </section>
  );
};

export default Store;
