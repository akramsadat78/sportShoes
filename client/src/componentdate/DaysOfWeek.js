import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/basic.css';
// Day of week names for use in date-picker heading
const dayOfWeekNames = [ 'ج', 'پ', 'چ', 'س', 'د', 'ی','ش'];

export default class DaysOfWeek extends Component {
  static propTypes = {
    styles: PropTypes.object
  };

  render() {
    const { styles } = this.props;

    return (
     
      <div id="daysOfWeek">
         {/*<div className={styles.daysOfWeek}>*/}
        { dayOfWeekNames.map((name, key) => <div key={key}>{name}</div>) }
      </div>
    );
  }
}
