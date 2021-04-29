import React, { Component } from 'react';
import '../css/ProfitCalculation.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
import DatePicker from '../componentdate/DatePicker';
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
        array_size:[],
        start:1,
        validation:0,
        sum:0,
        dynamic_sale_date : '',
        dynamic_purchase_date : '',
        array : []
    }
  }

  handleCallbackenterShoeSaleDate = (childData) =>{

    var entered_purchase_date = this.state.dynamic_purchase_date.split('/');
    var yearPurchaseDate =  Math.floor(entered_purchase_date[0]);
    var monthPurchaseDate = Math.floor( entered_purchase_date[1]);
    var dayPurchaseDate = Math.floor( entered_purchase_date[2]);

    var entered_sale_date = childData.split('/');
    var yearSaleDate =  Math.floor(entered_sale_date[0]);
    var monthSaleDate =  Math.floor(entered_sale_date[1]);
    var daySaleDate =  Math.floor(entered_sale_date[2]);

    //range 1 month
    if(monthPurchaseDate == 12){//month 12
      if(monthSaleDate == 12){
        if(daySaleDate > dayPurchaseDate){
          if(yearPurchaseDate == yearSaleDate){
            this.setState({
              validation:1,
              dynamic_sale_date : childData
            });
          }
        }
      }else if(monthSaleDate == 1){
        if(daySaleDate <= dayPurchaseDate ){
          if((yearPurchaseDate+1) == yearSaleDate){
            this.setState({
              validation:1,
              dynamic_sale_date : childData
            });
          }
        }
      }
    }else{//other month
      if(monthSaleDate == monthPurchaseDate){
        if(daySaleDate > dayPurchaseDate ){
          if(yearPurchaseDate == yearSaleDate){
            this.setState({
              validation:1,
              dynamic_sale_date : childData
            });
          }
        }
      }else if(monthSaleDate == (monthPurchaseDate+1)){
        if(daySaleDate <= dayPurchaseDate ){
          if(yearPurchaseDate == yearSaleDate){
            this.setState({
              validation:1,
              dynamic_sale_date : childData
            });
          }
        }
      }
    }
  }

  handleCallbackenterShoePurchaseDate = (childData) =>{
    
    this.setState({
      dynamic_purchase_date : childData
    });
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
    alert("محاسبه درامد ...")

    if(this.state.validation == 1){
      var purchase_date = this.state.dynamic_purchase_date.split('/');
      var year_pd = Math.floor(purchase_date[0]);
      var month_pd = Math.floor(purchase_date[1]);
      var day_pd = Math.floor(purchase_date[2]);

      var sale_date = this.state.dynamic_sale_date.split('/');
      var year_sd = Math.floor(sale_date[0]);
      var month_sd = Math.floor(sale_date[1]);
      var day_sd = Math.floor(sale_date[2]);

      var name ;
      var model ;
      var code ;
      var profit ;
      var shoeSaleDateDB;
      var size ;
      
      const response = await fetch('/information', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const body = await response.json();

      body.map(index => {

        var count = 0  ;
        var save_count = 0  ;
        var counter = 0;

        index.shoe_sale_date.map((item,ind) =>{
         
          if ( ind == 0 ){
            count = index.shoe_count[counter];
            counter = counter + 1;
          }else if ( ind == count ){
            save_count = count;
            count = index.shoe_count[counter];
            count = count + save_count;
            counter = counter + 1;
          }

          if( item != null){

            shoeSaleDateDB = item.split('/');
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
                  profit = this.state.array_profit.concat(index.shoe_profit[ind]);
                  size =  this.state.array_size.concat(index.shoe_size[counter-1]);
      
                  this.setState({
                    array_name: name ,
                    array_model: model ,
                    array_code: code ,
                    array_profit: profit ,
                    array_size: size,
                    sum:this.state.sum+index.shoe_profit[ind],
                    start:0
                  }) 
      
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
                    profit = this.state.array_profit.concat(index.shoe_profit[ind]);
                    size =  this.state.array_size.concat(index.shoe_size[counter-1]);
        
                    this.setState({
                      array_name: name ,
                      array_model: model ,
                      array_code: code ,
                      array_profit: profit ,
                      array_size: size ,
                      sum:this.state.sum+index.shoe_profit[ind],
                      start:0
                    }) 
        
                  }
                }
              }else if(monthDB == 1){
                if(dayDB<=day_sd){
                  if(yearDB==year_sd){
                    name = this.state.array_name.concat(index.shoe_name);
                    model = this.state.array_model.concat(index.shoe_model);
                    code = this.state.array_code.concat(index.shoe_code);
                    profit = this.state.array_profit.concat(index.shoe_profit[ind]);
                    size =  this.state.array_size.concat(index.shoe_size[counter-1]);
        
                    this.setState({
                      array_name: name ,
                      array_model: model ,
                      array_code: code ,
                      array_profit: profit ,
                      array_size: size,
                      sum:this.state.sum+index.shoe_profit[ind],
                      start:0
                    }) 
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
                    profit = this.state.array_profit.concat(index.shoe_profit[ind]);
                    size =  this.state.array_size.concat(index.shoe_size[counter-1]);
        
                    this.setState({
                      array_name: name ,
                      array_model: model ,
                      array_code: code ,
                      array_profit: profit ,
                      array_size: size,
                      sum:this.state.sum+index.shoe_profit[ind],
                      start:0
                    }) 
        
                  }
                }
              }else if(monthDB == month_sd){
                if(dayDB<=day_sd){
                  if((yearDB==year_pd) && (yearDB==year_sd)){
                    name = this.state.array_name.concat(index.shoe_name);
                    model = this.state.array_model.concat(index.shoe_model);
                    code = this.state.array_code.concat(index.shoe_code);
                    profit = this.state.array_profit.concat(index.shoe_profit[ind]);
                    size =  this.state.array_size.concat(index.shoe_size[counter-1]);
        
                    this.setState({
                      array_name: name ,
                      array_model: model ,
                      array_code: code ,
                      array_profit: profit ,
                      array_size: size,
                      sum:this.state.sum+index.shoe_profit[ind],
                      start:0
                    }) 
                  }
                }
              }
            }
          }
          }
        })
      });

    }else{
      alert(" بازه یک ماهه را به درستی وارد کنید")
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
              <th>سایز کفش</th>
              <th>مدل کفش</th>
              <th>نام کفش</th>
              <th>کد کفش</th>
          </tr>

          { this.state.array_name.map((item, index) => {  
            return <tr key={index}>
                    <td> {this.state.array_profit[index]} </td> 
                    <td> {this.state.array_size[index]} </td> 
                    <td> {this.state.array_model[index]} </td>  
                    <td> {item} </td>
                    <td> {this.state.array_code[index]} </td>  
                  </tr>  
            })  
          } 

          <tr>
            <td>{this.state.sum}</td>
            <td></td>
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
                <DatePicker dataParentToChild = {this.state.dynamic_purchase_date} parentCallback = {childData =>  this.handleCallbackenterShoePurchaseDate(childData) }/>    
              </li>
            </ul>

            <div class="line">
              <hr/>
            </div>

          <ul>
            <li>
              <p><b>: تاریخ فروش</b></p> 
            </li>
            <li>
              <DatePicker dataParentToChild = {this.state.dynamic_sale_date} parentCallback = {childData =>  this.handleCallbackenterShoeSaleDate(childData) }/>   
            </li>
          </ul>

          <div class="line">
            <hr/>
          </div>

          <div id="info">
            <p> بازه یک ماهه وارد کنید</p>
          </div>
          
          <div id = "sectionSubmit_ProfitCalculation" >
            <button  type="submit" class = "button_ProfitCalculation"> ثبت </button> 
          </div>
              
        </form>
      </div>
      
    </div>
    );
  }
}
