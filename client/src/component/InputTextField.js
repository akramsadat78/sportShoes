/* import */
import React from 'react';

/* input tag */
const InputTextField = ({ name, type, required,placeholder ,val, _handleChange }) => (

    <div >
    <input 
    type = { type }
    name = { name }
    placeholder = { placeholder }
    autoComplete = "off"
    value = {val}
    required = { required }
    onChange = { _handleChange }
    /> 
    </div>
);

export default InputTextField;