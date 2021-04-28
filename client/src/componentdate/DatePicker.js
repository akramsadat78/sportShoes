import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-jalali';
import TetherComponent from 'react-tether';
import Calendar from './Calendar';
import classnames from 'classnames';
import '../css/basic.css';
import { toPersian, toEnglish } from 'persian';

export const outsideClickIgnoreClass = 'ignore--click--outside';

export default class DatePicker extends Component {

  constructor(props){
    super(props);
    this.state = {
       // data: this.props.dataParentToChild,
        currentDateTime: new Date().toLocaleDateString('fa-IR')
    }
}
  static propTypes = {
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    children: PropTypes.node,
    min: PropTypes.object,
    max: PropTypes.object,
    defaultMonth: PropTypes.object,
    inputFormat: PropTypes.string,
    removable: PropTypes.bool,
    timePickerComponent: PropTypes.func,
    calendarStyles: PropTypes.object,
    disabled: PropTypes.bool,
    calendarContainerProps: PropTypes.object
  };

  static defaultProps = {
    inputFormat: 'jYYYY/jM/jD',
    disabled: false,
    calendarStyles: require('../css/basic.css'),
    calendarContainerProps: {}
  };
  componentDidMount() {
    if (this.props.value) {
      let { inputValue } = this.state;
      let value = this.props.value;
      let inputFormat = this.props.inputFormat;
      inputValue = value.format(inputFormat);
      this.setState({ inputValue });
    }

  }
  state = {
    isOpen: false,
    disabled: this.props.disabled,
    momentValue: this.props.defaultValue || null,
    inputValue: this.props.defaultValue ?
      this.props.defaultValue.format(this.props.inputFormat) : ''
  };

  setOpen(isOpen) {
    this.setState({ isOpen });
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value)
      this.setMomentValue(nextProps.value);
    if ('disabled' in nextProps && nextProps.disabled !== this.props.disabled)
      this.setState({ disabled: nextProps.disabled });
  }

  setMomentValue(momentValue) {
    const { inputFormat } = this.props;

    if (this.props.onChange) {
      this.props.onChange(momentValue);
    }

    let inputValue = "";
    if (momentValue)
      inputValue = momentValue.format(inputFormat);
    this.setState({ momentValue, inputValue });
  }

  handleFocus() {
    this.setOpen(true);
  }

  handleBlur(event) {

    const { onBlur, inputFormat } = this.props;
    const { isOpen, momentValue } = this.state;

    if (isOpen) {
      this.refs.input.focus();
    } else if (onBlur) {
      onBlur(event);
    }

    //onBlur call onChange func from parent props
    if (momentValue) {
      this.setMomentValue(momentValue);
      // const inputValue = momentValue.format(inputFormat);
      // this.setState({ inputValue });
    }

  }


  
  handleClickOutsideCalendar() {
    this.setOpen(false);

    
    var currentDate = this.state.currentDateTime.split('/');
    var yearDate = currentDate[0];
    var monthDate = currentDate[1];
    var dayDate = currentDate[2];

    var persianNumber = [ "۰","۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
    

    //correct year
    var yearlength = yearDate.length
    var itr = Array.from(Array(yearlength).keys())
    var pow = yearlength
    var yd = 0

    itr.map((item, index) => { 
      var y = yearDate.charAt(index)
      pow = pow -1
      persianNumber.map((itemp, indexp) => {  
        if(  y == itemp){
          yd = indexp*Math.pow(10,pow) + yd
        }
      })
    })

    // convert month
    var monthlength = monthDate.length
    itr = Array.from(Array(monthlength).keys())
    pow = monthlength
    var md = 0

    itr.map((item, index) => {  
      var m = monthDate.charAt(index)
      pow = pow -1
      persianNumber.map((itemp, indexp) => { 
        if(  m == itemp){
          md = indexp*Math.pow(10,pow) + md
        }
      })
    })
    
     // convert day
     var monthday = dayDate.length
     itr = Array.from(Array(monthday).keys())
     pow = monthday
     var dd = 0
 
     itr.map((item, index) => {  
       var d = dayDate.charAt(index)
       pow = pow -1
       persianNumber.map((itemp, indexp) => { 
         if(  d == itemp){
           dd = indexp*Math.pow(10,pow) + dd
         }
       })
     })
     
    if (this.state.inputValue != null){
      var inputDate = this.state.inputValue.split('/');
      var yearInputDate = Math.floor(inputDate[0]);
      var monthInputDate = Math.floor(inputDate[1]);
      var dayInputDate = Math.floor(inputDate[2]);


      if( yd > yearInputDate ){//correct
        this.props.parentCallback(this.state.inputValue);
      }else if (yd == yearInputDate ){
        if(md > monthInputDate ){//correct
          this.props.parentCallback(this.state.inputValue);
        }else if(md == monthInputDate ){
          if(dd >= dayInputDate ){//correct
            this.props.parentCallback(this.state.inputValue);
          }else{
            this.setState({ inputValue: '' });
            alert("تاریخ درست وارد نشده است")
          }
        }else{
          this.setState({ inputValue: '' });
          alert("تاریخ درست وارد نشده است")
        }
      }else{
        this.setState({ inputValue: '' });
        alert("تاریخ درست وارد نشده است")
      }

    }

    if (!this.state.inputValue)
      this.setState({ momentValue: null });
  }

  handleSelectDay(selectedDay) {
    const { momentValue: oldValue } = this.state;
    let momentValue = selectedDay.clone();

    if (oldValue) {
      momentValue = momentValue
        .set({
          hour: oldValue.hours(),
          minute: oldValue.minutes(),
          second: oldValue.seconds()
        });
    }

    this.setMomentValue(momentValue);
  }

  handleInputChange(event) {
    const { inputFormat, min, max } = this.props;
    const inputValue = event.target.value;
    const momentValue = moment(inputValue, inputFormat);

    if (momentValue.isValid()) {
      if ((min && momentValue.isBefore(min)) || (max && momentValue.isAfter(max))) {
        this.setState({ inputValue: "", momentValue: null });
        return;
      }
      else
        this.setState({ momentValue });
    }

    this.setState({ inputValue });
  }

  handleInputClick() {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  }

  renderInput() {
    let { isOpen, inputValue, disabled } = this.state;

    const className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: isOpen
    });


    return (
      <div>
        <input
           placeholder ={this.props.dataParentToChild}
          className={className}
          required="true"
          type="text"
          ref="input"
          disabled={disabled}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleInputChange.bind(this)}
          onClick={this.handleInputClick.bind(this)}
          value={inputValue}
        />
      </div>
    );
  }

  renderCalendar() {
    const { momentValue } = this.state;
    const { timePickerComponent: TimePicker, onChange, min, max, defaultMonth, calendarStyles, calendarContainerProps } = this.props;

    return (
      <div>
        <Calendar
          min={min}
          max={max}
          selectedDay={momentValue}
          defaultMonth={defaultMonth}
          onSelect={this.handleSelectDay.bind(this)}
          onClickOutside={this.handleClickOutsideCalendar.bind(this)}
          outsideClickIgnoreClass={outsideClickIgnoreClass}
          styles={calendarStyles}
          containerProps={calendarContainerProps}
        >
          {
            TimePicker ? (
              <TimePicker
                min={min}
                max={max}
                momentValue={momentValue}
                setMomentValue={this.setMomentValue.bind(this)}
              />
            ) : null
          }
        </Calendar>
      </div>
    );
  }

  removeDate() {
    const { onChange } = this.props;
    if (onChange) {
      onChange('');
    }
    this.setState({
      input: '',
      inputValue: ''
    });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <TetherComponent attachment="top center">
        {this.renderInput()}
        {isOpen ? this.renderCalendar() : null}
      </TetherComponent>
    );
  }
}
