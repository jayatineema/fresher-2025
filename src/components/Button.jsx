import React from "react";

const Button = ({ onClick, text, disabled }) => {
    return (
        <button onClick={onClick} style={styles.button} disabled={disabled}>
            {text}
        </button>
    );
};

const styles = {
    button: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
    },
};

export default Button;
