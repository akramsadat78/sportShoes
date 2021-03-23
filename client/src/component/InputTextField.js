/* import */
import React from 'react';

/* input tag */
const InputTextField = ({ name,id, type, required,placeholder ,val, _handleChange }) => (

    <div >
    <input 
    type = { type }
    id ={id}
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