/* import */
import React from 'react';

/* input tag */
const InputTextField = ({ name,id,min, type, required,placeholder ,val, _handleChange }) => (

    <div >
    <input 
    type = { type }
    id ={id}
    name = { name }
    min = {min}
    placeholder = { placeholder }
    autoComplete = "off"
    value = {val}
    required = { required }
    onChange = { _handleChange }
    /> 
    </div>
);

export default InputTextField;