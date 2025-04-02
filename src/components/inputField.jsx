import React from "react";

const InputField = ({ type, name, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            style={styles.input}
        />
    );
};
const styles = {
    input: {
        padding: "10px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "100%",
    },
};

export default InputField;
