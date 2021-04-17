/* import **/
import React from 'react';


/* select tag */
const DropdownSelectName = ({ required, name,placeholder, lableName, _handleChange, val }) => ( 
    <div>
        <select 
         name = { name }
         onChange = { _handleChange }
         required = { required } >
         <option value = ""   > {placeholder} </option> 
         {val.map((values, i) =>
                < option value = { values }key = { values } > { values } </option>
          )} 
        </select>

    </div>
);

export default DropdownSelectName;