import React, { Component } from 'react';
import '../css/SubmitInformation.css';
import InputTextField from './InputTextField';
import DropdownSelect from './DropdownSelect';
import DatePicker from '../componentdate/DatePicker';
export default class SubmitInformation extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);

    this.enterShoeName = this.enterShoeName.bind(this);
    this.enterShoeModel = this.enterShoeModel.bind(this);
    this.enterShoeCode = this.enterShoeCode.bind(this);
    this.enterShoeColor = this.enterShoeColor.bind(this);
    this.enterShoeSize = this.enterShoeSize.bind(this);
    this.enterShoeCount = this.enterShoeCount.bind(this);

    this.enterShoePurchaseDate = this.enterShoePurchaseDate.bind(this);
    this.enterShoeSaleDate = this.enterShoeSaleDate.bind(this);
    this.enterShoeCostBuy = this.enterShoeCostBuy.bind(this);
    this.enterShoeCostSale = this.enterShoeCostSale.bind(this);
    this.enterShoeProfit = this.enterShoeProfit.bind(this);

    this.enterShoeDescription = this.enterShoeDescription.bind(this);
    this.enterShoeImage = this.enterShoeImage.bind(this);

    this.state = {
      shoe_name: '',
      shoe_model: '',
      shoe_code: '',
      shoe_color: '',
      shoe_size: '',
      shoe_count: '',
      shoe_purchase_date: '',
      shoe_sale_date: '',
      shoe_cost_buy: '',
      shoe_cost_sale: '',
      shoe_profit: '',
      shoe_image: '',
      shoe_description: '',
      response: '',
      responseToPost: '',
      prev_code:'',
      validation:0,
      file: null
    }
    
  }

  enterShoeName(e) {
    this.setState({
      shoe_name: e.target.value
    });
  }

  enterShoeModel(e) {
    this.setState({
      shoe_model: e.target.value
    });
  }
  
  enterShoeCode(e) {
    this.setState({
      shoe_code: e.target.value
    });
  }

  enterShoeColor(e) {
    this.setState({
      shoe_color: e.target.value
    });
  }
  
  enterShoeSize(e) {
    this.setState({
      shoe_size: e.target.value
    });
  }
   
  enterShoeCount(e) {
    this.setState({
      shoe_count: e.target.value
    });
  }

  enterShoePurchaseDate(e) {
    this.setState({
      shoe_purchase_date: e.target.value
    });
  }

  enterShoeSaleDate(e) {
    this.setState({
      shoe_sale_date: e.target.value
    });
  }

  enterShoeCostBuy(e) {
    this.setState({
      shoe_cost_buy: e.target.value
    });
  }

  enterShoeCostSale(e) {
    this.setState({
      shoe_cost_sale: e.target.value
    });
  }

  enterShoeProfit(e) {
    this.setState({
      shoe_profit: e.target.value
    });
  }

  enterShoeDescription(e) {
    this.setState({
      shoe_description: e.target.value
    });
  }

  enterShoeImage(e) {
    this.setState({
      shoe_image: e.target.value
    });
  }

  handleChange(event) {
   
    this.setState({
      //file: URL.createObjectURL(event.target.files[0])
      file : event.target.value
    })
  }

  
  componentDidMount() {
    fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(result => {

        result.map(index => {
            this.setState({
                prev_code : index.shoe_code
            }) 
        })
   })
  }
  handleSubmit = async e => {
    e.preventDefault();
  

    const obj = {
      shoe_name: this.state.shoe_name,
      shoe_model: this.state.shoe_model,
      shoe_code: Math.floor(this.state.prev_code)+ 1,
      shoe_color: this.state.shoe_color,
      shoe_size: this.state.shoe_size,
      shoe_count: this.state.shoe_count,
      shoe_purchase_date:this.state.shoe_purchase_date,
      shoe_sale_date:this.state.shoe_sale_date,
      shoe_cost_buy: this.state.shoe_cost_buy,
      shoe_cost_sale: this.state.shoe_cost_sale,
      shoe_profit: this.state.shoe_profit,
      shoe_image: this.state.file,
      shoe_description: this.state.shoe_description
    };

    alert("form information enterd :) ")

    const response = await fetch('/information/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj) ,
    });
       
    const body = await response.text();

    this.setState({
      responseToPost: body ,
      shoe_name: '',
      shoe_model: '',
      shoe_code: '',
      shoe_color: '',
      shoe_size: '',
      shoe_count: '',
      shoe_purchase_date: '',
      shoe_sale_date: '',
      shoe_cost_buy: '',
      shoe_cost_sale: '',
      shoe_profit: '',
      shoe_image: '',
      shoe_description: '' ,
      validation:1    
    })

  };
  
  render() {
    var arraysize_1_to_100 = Array.from(Array(101).keys()) // 0 to 100
    var arraynumber_1_to_100 = Array.from(Array(101).keys()) // 0 to 100

    if (this.state.validation == 1) {
      this.props.history.push('/first')
    }

    return (
      <div>
        <ul id="navbar">
          <li><a href="/first">کفش ورزشی</a></li>
          <li><a href="#">=></a></li>
          <li><a href="#">ثبت اطلاعات</a></li>
        </ul>

        
        <form onSubmit={this.handleSubmit}>
          <div id="wrap">

            <div id="section1-SubmitInformation">
              <div id = "section1" >
                <div id = "border" >
                  <img id="image" src={this.state.file}/>
                </div>
              </div>
              <div id = "section2" >
                <div id = "border" >
                  {/*<input class="file-input" type="file"  onChange={this.handleChange}/>*/}
                  <input class="file-input" placeholder = " عکس را وارد کنید url" type="text" required= "true"  onChange={this.handleChange}/>
                </div>
              </div>
            </div>

            <div id="section2-SubmitInformation">
              <div id="section2-col1">
                <ul>
                <li>
                    <label  ><b>: رنگ کفش</b></label> 
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      //required = "true"
                      placeholder = "رنگ کفش"
                      val = {this.state.shoe_color}
                      _handleChange ={this.enterShoeColor}
                    />
                  </li>
                  </ul>
                  <ul>
                  <li>
                    <label><b>: کد کفش</b></label> 
                    <label id="code">{Math.floor(this.state.prev_code)+ 1}</label>
                    {/*<InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      required = "true"
                      placeholder = "کد کفش"
                      val = {this.state.shoe_code}
                      _handleChange ={this.enterShoeCode}
                    />*/}
                  </li>
                  
                 {/* <li>
                    <label  ><b>: تعداد کفش</b></label>
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      //required = "true"
                      placeholder = "تعداد کفش"
                      val = {this.state.shoe_count}
                      _handleChange ={this.enterShoeCount}
                    />
                 </li> */}
                </ul>
              </div>
            
              <div id="section2-col2">
                <ul>
                <li>
                    <label  ><b>: برند کفش</b></label>
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      required = "true"
                      placeholder = "برند کفش"
                      val = {this.state.shoe_model}
                      _handleChange ={this.enterShoeModel}
                    />
                  </li>
                  </ul>
                  <ul>
                <li>
                    <label  id="name-shoe"  ><b>: نام کفش</b></label>
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      required = "true"
                      placeholder = "نام کفش"
                      val = {this.state.shoe_name}
                      _handleChange ={this.enterShoeName}
                    />
                  </li>
                 {/* <li>
                    <label  ><b>: سایز کفش</b></label>
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      //required = "true"
                      placeholder = "سایز کفش"
                      val = {this.state.shoe_size}
                      _handleChange ={this.enterShoeSize}
                    />
                 </li>*/}
                </ul>
              </div>
            </div>

            <div id="section3-SubmitInformation">
            <table id="table_inform">
              <tr>
                  <th>تعداد فروش</th>
                  <th>هزینه فروش</th>
                  <th>تاریخ فروش</th>
                  <th>هزینه خرید</th>
                  <th>تاریخ خرید</th>
                  <th>تعداد کفش</th>
                  <th>سایز کفش</th>
              
              </tr>

              <tr>
                  <td>0</td>
                  <td>-</td>
                  <td>-</td>
                  <td> <DatePicker /></td>
                  <td> <DatePicker /></td>
                  <td>
                  <DropdownSelect 
                  name = "helloo"
                  required = "false"
                  lableName = "numbers"
                  placeholder = "select numbers"
                  val = {arraynumber_1_to_100}
                  //_handleChange = { this._handleChange }
                  />
                  {/*<InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      //required = "true"
                      placeholder = "تعداد کفش"
                      val = {this.state.shoe_count}
                      _handleChange ={this.enterShoeCount}
                  />*/}
                  </td>

                  <td>
                  <DropdownSelect 
                  name = "helloo"
                  required = "false"
                  lableName = "numbers"
                  placeholder = "select numbers"
                  val = {arraysize_1_to_100}
                  //_handleChange = { this._handleChange }
                  />
                  {/*
                  <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      //required = "true"
                      placeholder = "سایز کفش"
                      val = {this.state.shoe_size}
                      _handleChange ={this.enterShoeSize}
                 />
                  */}
                  </td>
                  
                  
              </tr>
          </table>
              <div id="section2-col1">
                <ul>
                  <li>
                    <label  ><b>: تاریخ فروش</b></label>
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "Date"
                      //required = "true"
                      val = {this.state.shoe_sale_date}
                      _handleChange ={this.enterShoeSaleDate}
                    />
                  </li>
                  <li>
                    <label  ><b>: هزینه فروش</b></label>
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      //required = "true"
                      val = {this.state.shoe_cost_sale}
                      _handleChange ={this.enterShoeCostSale}
                    />
                  </li>
                </ul>
              </div>
            
              <div id="section2-col2">
                <ul>
                  <li>
                    <label  ><b>: تاریخ خرید</b></label> 
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "Date"
                      required = "true"
                      val = {this.state.shoe_purchase_date}
                      _handleChange ={this.enterShoePurchaseDate}
                    />
                  </li>
                  <li>
                    <label  ><b>: هزینه خرید</b></label>
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      required = "true"
                      val = {this.state.shoe_cost_buy}
                      _handleChange ={this.enterShoeCostBuy}
                    />
                  </li>
                </ul>
              </div>
            </div>

            <div id="section4-SubmitInformation">
              <label  ><b>: توضیحات</b></label> 
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
               // required = "true"
                placeholder = "توضیحات"
                val = {this.state.shoe_description}
                _handleChange ={this.enterShoeDescription}
              />
            </div>
          </div>

          <div id = "sectionSubmit-SubmitInformation" >
              <button  type="submit" class = "button-SubmitInformation"> ثبت </button> 
            </div>

        </form>
        
      </div>
      );
  }
}
