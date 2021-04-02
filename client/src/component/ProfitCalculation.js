import React, { Component } from 'react';
import '../css/ProfitCalculation.css';
import InputTextField from './InputTextField';
import { CSVDownload ,CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
export default class ProfitCalculation extends Component {
  constructor(props) { 
    super(props)  
    this.onSubmit = this.handleSubmit.bind(this);

    this.enterShoePurchaseDate = this.enterShoePurchaseDate.bind(this);
    this.enterShoeSaleDate = this.enterShoeSaleDate.bind(this);

    this.state = {
        shoe_name: '',
        shoe_model: '',
        shoe_code: '',
        shoe_purchase_date: '',
        shoe_sale_date: '',
        shoe_profit: '',
        array_name:[],
        array_model:[],
        array_code:[],
        array_profit:[],
        start:1,
        validation:0,
        sum:0
    }
  }

  enterShoePurchaseDate(e) {
    this.setState({
      shoe_purchase_date: e.target.value
    });
  }

  enterShoeSaleDate(e) {
    var entered_purchase_date = this.state.shoe_purchase_date.split('-');
    var yearPurchaseDate =  Math.floor(entered_purchase_date[0]);
    var monthPurchaseDate = Math.floor( entered_purchase_date[1]);
    var dayPurchaseDate = Math.floor( entered_purchase_date[2]);

    var entered_sale_date = e.target.value.split('-');
    var yearSaleDate =  Math.floor(entered_sale_date[0]);
    var monthSaleDate =  Math.floor(entered_sale_date[1]);
    var daySaleDate =  Math.floor(entered_sale_date[2]);

    //range 1 month
    if(monthPurchaseDate == 12){//month 12
      if(monthSaleDate == 12){
        if(daySaleDate > dayPurchaseDate){
          if(yearPurchaseDate == yearSaleDate){
            this.setState({
              validation:1
            });
          }
        }
      }else if(monthSaleDate == 1){
        if(daySaleDate <= dayPurchaseDate ){
          if((yearPurchaseDate+1) == yearSaleDate){
            this.setState({
              validation:1
            });
          }
        }
      }
    }else{//other month
      if(monthSaleDate == monthPurchaseDate){
        if(daySaleDate > dayPurchaseDate ){
          if(yearPurchaseDate == yearSaleDate){
            this.setState({
              validation:1
            });
          }
        }
      }else if(monthSaleDate == (monthPurchaseDate+1)){
        if(daySaleDate <= dayPurchaseDate ){
          if(yearPurchaseDate == yearSaleDate){
            this.setState({
              validation:1
            });
          }
        }
      }
    }
    
    this.setState({
      shoe_sale_date: e.target.value
    });
  }

  handleSubmit = async e => {
  e.preventDefault();

  if(this.state.start == 1){
  if(this.state.validation == 1){
    var purchase_date = this.state.shoe_purchase_date.split('-');
    var year_pd = Math.floor(purchase_date[0]);
    var month_pd = Math.floor(purchase_date[1]);
    var day_pd = Math.floor(purchase_date[2]);

    var sale_date = this.state.shoe_sale_date.split('-');
    var year_sd = Math.floor(sale_date[0]);
    var month_sd = Math.floor(sale_date[1]);
    var day_sd = Math.floor(sale_date[2]);

    var name ;
    var model ;
    var code ;
    var profit ;
    var shoeSaleDateDB;
    
    const response = await fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const body = await response.json();
    alert("start")

    body.map(index => {

      if(index.shoe_sale_date !=''){
        alert(index.shoe_sale_date)
        shoeSaleDateDB = index.shoe_sale_date.split('-');
        var yearDB = Math.floor(shoeSaleDateDB[0]);
        var monthDB = Math.floor(shoeSaleDateDB[1]);
        var dayDB = Math.floor(shoeSaleDateDB[2]);

        //same month
        if(month_sd == month_pd){
          if((monthDB == month_pd) && (monthDB == month_sd) ){
            if( (day_pd<dayDB) && (dayDB<=day_sd)){
              if((yearDB==year_pd) && (yearDB==year_sd)){
                name = this.state.array_name.concat(index.shoe_name);
                model = this.state.array_model.concat(index.shoe_model);
                code = this.state.array_code.concat(index.shoe_code);
                profit = this.state.array_profit.concat(index.shoe_profit);
    
                this.setState({
                  array_name: name ,
                  array_model: model ,
                  array_code: code ,
                  array_profit: profit ,
                  sum:this.state.sum+index.shoe_profit,
                  start:0,
                  validation:0
                }) 
    
                alert("hi")
              }
            }
          }
        }else{//diffrence month
          //month 12
          if( (month_pd == 12) && (month_sd == 1) ){
            if(monthDB == 12){
              if(day_pd<dayDB){
                if(yearDB==year_pd){
                  name = this.state.array_name.concat(index.shoe_name);
                  model = this.state.array_model.concat(index.shoe_model);
                  code = this.state.array_code.concat(index.shoe_code);
                  profit = this.state.array_profit.concat(index.shoe_profit);
      
                  this.setState({
                    array_name: name ,
                    array_model: model ,
                    array_code: code ,
                    array_profit: profit ,
                    sum:this.state.sum+index.shoe_profit,
                    start:0,
                    validation:0
                  }) 
      
                  alert("hi2")
                }
              }
            }else if(monthDB == 1){
              if(dayDB<=day_sd){
                if(yearDB==year_sd){
                  name = this.state.array_name.concat(index.shoe_name);
                  model = this.state.array_model.concat(index.shoe_model);
                  code = this.state.array_code.concat(index.shoe_code);
                  profit = this.state.array_profit.concat(index.shoe_profit);
      
                  this.setState({
                    array_name: name ,
                    array_model: model ,
                    array_code: code ,
                    array_profit: profit ,
                    sum:this.state.sum+index.shoe_profit,
                    start:0,
                    validation:0
                  }) 
      
                  alert("hi3")
                }
              }
            }
          //other month
          }else if(month_sd == (month_pd+1)){
            if(monthDB == month_pd){
              if(day_pd<dayDB){
                if((yearDB==year_pd) && (yearDB==year_sd)){
                  name = this.state.array_name.concat(index.shoe_name);
                  model = this.state.array_model.concat(index.shoe_model);
                  code = this.state.array_code.concat(index.shoe_code);
                  profit = this.state.array_profit.concat(index.shoe_profit);
      
                  this.setState({
                    array_name: name ,
                    array_model: model ,
                    array_code: code ,
                    array_profit: profit ,
                    sum:this.state.sum+index.shoe_profit,
                    start:0,
                    validation:0
                  }) 
      
                  alert("hi4")
                }
              }
            }else if(monthDB == month_sd){
              if(dayDB<=day_sd){
                if((yearDB==year_pd) && (yearDB==year_sd)){
                  name = this.state.array_name.concat(index.shoe_name);
                  model = this.state.array_model.concat(index.shoe_model);
                  code = this.state.array_code.concat(index.shoe_code);
                  profit = this.state.array_profit.concat(index.shoe_profit);
      
                  this.setState({
                    array_name: name ,
                    array_model: model ,
                    array_code: code ,
                    array_profit: profit ,
                    sum:this.state.sum+index.shoe_profit,
                    start:0,
                    validation:0
                  }) 
      
                  alert("hi5")
                }
              }
            }
          }
        }
      }
    });

  }else{
    alert("please enter the date in range of one month or ")
  }
}else{
  alert("range of date is chosen")
}


};
  
  render() {
    
    return (
      <div>
        <ul id="navbar">
          <li><a href="/first">کفش ورزشی</a></li>
          <li><a href="#">=></a></li>
          <li><a href="#">محاسبه درآمد</a></li>
        </ul>
                
        <div id="wrap1_ProfitCalculation">
        <table id="table-to-xls">
              <tr>
                  <th>سود</th>
                  <th>کد کفش</th>
                  <th>مدل کفش</th>
                  <th>نام کفش</th>
              </tr>

              {  this.state.array_name.map((item, index) => {  
                return <tr key={index}>
                         <td> {this.state.array_profit[index]} </td> 
                         <td> {this.state.array_code[index]} </td>  
                         <td> {this.state.array_model[index]} </td>  
                         <td> {item} </td>
                     </tr>  
                     })  
              } 
              <tr>
              <td>{this.state.sum}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  
              </tr>
          </table>
          <div id="excel">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              filename="Report"
              sheet="tablexls"
              buttonText=" Excel گرفتن"/>
          </div>
        </div>

        <div id="wrap2_ProfitCalculation">
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <p  ><b>: تاریخ خرید</b></p> 
            </li>
            <li>
              <InputTextField 
                name = "test"
                id = "test"
                type = "Date"
                required = "true"
                val = {this.state.shoe_purchase_date}
                _handleChange ={this.enterShoePurchaseDate}
              />
            </li>
            </ul>
            <div class="line">
              <hr/>
            </div>
        <ul>
            <li>
               <p  ><b>: تاریخ فروش</b></p> 
            </li>
            <li>
              <InputTextField 
                name = "test"
                id = "test"
                type = "Date"
                required = "true"
                val = {this.state.shoe_sale_date}
                _handleChange ={this.enterShoeSaleDate}
              />
            </li>
            </ul>
            <div class="line">
              <hr/>
            </div>

            <div id="info">
              <p>please enter the date in range of one month</p>
            </div>


            <div id = "sectionSubmit_ProfitCalculation" >
              <button  type="submit" class = "button_ProfitCalculation"> ثبت </button> 
            </div>
            
            </form>
        </div>
      
     
      </div>
      );
    /*
    return (
      <div>
          <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download as XLS"/>
          <table id="table-to-xls">
              <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Age</th>
              </tr>
              <tr>
                  <td>Jill</td>
                  <td>Smith</td>
                  <td>50</td>
              </tr>
              <tr>
                  <td>Eve</td>
                  <td>Jackson</td>
                  <td>94</td>
              </tr>
          </table>

      </div>
  );
  /*  return (  
      <div>  
        <table id="emp" class="table">  
          <thead>  
            <tr>  
              <th>نام کفش</th>  
              <th>مدل کفش</th>  
              <th>کد کفش</th>  
              <th>سود</th>  
            </tr>  
          </thead>  
          <tbody>             
             {  this.state.ProductData.map((p, index) => {  
                return <tr key={index}>  
                         <td>  "شس"   </td>  
                         <td >"یی"</td>  
                          <td >"یییی"</td> 
                             <td style={{ paddingRight: "114px" }} >{p.Department}</td>  
                     </tr>  
                     })  
                      }  
              </tbody>  
     </table>  
      <div>  
         <ReactHTMLTableToExcel  
          className="btn btn-info"  
          table="emp"  
           filename="ReportExcel"  
           sheet="Sheet"  
           buttonText="Export excel" /> 
      </div>  
       </div>  
      
     )  */
  }
}
