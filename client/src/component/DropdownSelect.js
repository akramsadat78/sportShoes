/* import **/
import React from 'react';


/* select tag */
const DropdownSelect = ({ required, name, lableName, _handleChange, val }) => ( 
    <div>
        <select 
         name = { name }
         onChange = { _handleChange }
         required = { required } >
         <option value = "" > انتخاب سایز </option> 
         {val.map((values, i) =>
                < option value = { i }key = { values } > { values } </option>
          )} 
        </select>

    </div>
);

export default DropdownSelect;