import React from 'react'

const ButtonComponnet = ({name,onClick}) => {
  return (
    <div className='Buttons' 
    onClick={onClick}
    style={{
        padding: "10px 20px",
        margin: "10px",
        fontSize: "16px",
        width: "20%",
        cursor: "pointer",
        border: "2px solid black",
        backgroundColor: "white",
        transition: "background-color 0.3s ease",
      }}
      >
        {name}
    </div>
  )
}

export default ButtonComponnet