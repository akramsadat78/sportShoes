import React, { Component } from 'react';
import { DatePicker } from "jalali-react-datepicker";
export default class ProfitCalculation extends Component {
  
  
  render() {
     return (
      <div>
      <h2>Date Picker</h2>
      <DatePicker label="تاریخ" />
    </div>
    );
  }
}
