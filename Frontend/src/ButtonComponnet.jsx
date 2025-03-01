import React from 'react';

const ButtonComponent = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        background: "#667eea",
        color: "white",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s ease",
        marginTop: "10px",
      }}
      onMouseOver={(e) => (e.target.style.background = "#5a67d8")}
      onMouseOut={(e) => (e.target.style.background = "#667eea")}
    >
      {name}
    </button>
  );
};

export default ButtonComponent;
