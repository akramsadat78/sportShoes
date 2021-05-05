import React, { Component } from 'react';
import InputTextField from './InputTextField';
import '../css/Update.css';
import DatePickerDetail from '../componentdate/DatePickerDetail';
import DropdownSelectName from './DropdownSelectName';
import DropdownSelect from './DropdownSelect';
import DatePicker from '../componentdate/DatePicker';

export default class Update extends Component {
 
  constructor(props){
    super(props);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  
    this.click = this.click.bind(this);
    this.changeShoeCostSale = this.changeShoeCostSale.bind(this);
    this.changeShoeDescription = this.changeShoeDescription.bind(this);
    this.changeShoeName = this.changeShoeName.bind(this);
    this.changeShoeColor = this.changeShoeColor.bind(this);

    this.state = {
      code_shoe_selected: this.props.dataParentToChild,//code of selected shoe
      shoe_name: '',//shoe_name in DB
      shoe_model: '',//shoe_model in DB
      shoe_code: '',//shoe_code in DB
      shoe_color: '',//shoe_color in DB
      shoe_profit: '',//shoe_profit in DB
      shoe_image: '',//shoe_image in DB
      shoe_description: '',//shoe_description in DB
      file: null,//save change image
      calculate_profit : 0,//calculate profit
      validation:0,//check if update is done or not
      dynamic_size: [],//keep size that is  selected
      dynamic_count: [],//keep count that is  selected
      dynamic_purchase_date: [],//keep purchase_date that is chosen
      dynamic_cost_buy: [],//keep cost_buy that is written
      dynamic_sale_date:[],//keepsale_date that is chosen
      dynamic_cost_sale:[],//keep cost_buy that is written
      dynamic_profit : [],//if user is deleted all data of cost in box , we should delete profit otherwise calculate it
      dynamic_profit_save:[],
      dynamicRowsIds:[],//row number of table
      staticRowsIds : '',//row number of table => first table in submition part 
      inside_row:[],//keep count of each row of table
      first_purchase_date:[],//save purchase date for compare with sale date
      first_cost_sale : 0,//save cost sale for compare with cost buy
      detail:0,//show detail of each shoe if detail=1
      indexrow:0,//keep indexrow of first table
      arraymodel:['Nike','Pama','Adidas','Reebook','Skechers','Asics','Puma'],
      checkWriteDate:[],//if cost is entered => check sale date enter too
      checkWriteCost:[],//if date is entered => check cost enter too
      choseRow : 0 //witch row is selected to be edited
    }
  }

  /*part change image */
  handleChangeImage(event) {
    this.setState({
      file : event.target.value
    })
  }

  /* part change model,name,color */
  changeShoeName(e) {
    this.setState({
      shoe_name: e.target.value
    });
  }

  changeShoeColor(e) {
    this.setState({
      shoe_color: e.target.value
    });
  }

  handleChangeArraymodel  = (event)  => {
    this.setState({
      shoe_model: event.currentTarget.value
    });
  }

  /* part enter size,count,purchaseDate,costSale */
  handleChangeShoeSize  = (event,val) => {
    let dynamic_size = [ ...this.state.dynamic_size ];
    dynamic_size[val] = event.currentTarget.value  ;
    this.setState({
      dynamic_size
    });
  }

  handleChangeShoeCount  = (event,val)  => {
    let dynamic_count = [ ...this.state.dynamic_count ];
    dynamic_count[val] = event.currentTarget.value  ;
  
    this.setState({
      dynamic_count
    });
  }

  handleChangeShoeCostBuy = (event,val)  =>{
    let dynamic_cost_buy = [ ...this.state.dynamic_cost_buy ];
    dynamic_cost_buy[val] = event.target.value ;
    this.setState({
      dynamic_cost_buy
    });
  }


  handleCallbackenterShoePurchaseDate = (childData,val) =>{ 
    let dynamic_purchase_date = [ ...this.state.dynamic_purchase_date ];
    dynamic_purchase_date[val] = childData ;
    this.setState({
      dynamic_purchase_date
    });
  }

  /*part enter description*/
  changeShoeDescription(e) {
    this.setState({
      shoe_description: e.target.value
    });
  }

  /* add and delet row in table*/
  deletDynamicRow(){
    this.setState({
      dynamicRowsIds:
      this.state.dynamicRowsIds.filter(rowId =>
        rowId !== this.state.dynamicRowsIds.length
      )
    });
  }

  addDynamicRow() {
    this.setState({
      dynamicRowsIds: [...this.state.dynamicRowsIds,this.state.dynamicRowsIds.length+1 ]
    });
  }

  /* see details */
  click(index,numberShoe,costSale) {

    if(this.state.dynamic_count[index-1] == null){
      alert("کفشی برای ویرایش وارد نشده است")
    }else{
      let range=Math.floor(numberShoe);//keep count of each row of table
      this.setState({
        first_cost_sale : costSale,
        detail:1,
        inside_row : Array.from(Array(range).keys()) ,
        indexrow:index
      });
    }
  }

  /* part enter SaleDate,CostSale */
  handleCallbackenterShoeSaleDate = (childData,val) =>{
    let dynamic_sale_date = [ ...this.state.dynamic_sale_date ];

    if( childData  == '' ){//user is deleted all data of date in box
      dynamic_sale_date[val] = '' ;

      this.setState({
        dynamic_sale_date
      });
    }else{//user chose date

      var entered_purchase_date = this.state.first_purchase_date[val].split('/');
      var yearPurchaseDate =  Math.floor(entered_purchase_date[0]);
      var monthPurchaseDate = Math.floor( entered_purchase_date[1]);
      var dayPurchaseDate = Math.floor( entered_purchase_date[2]);

      var entered_sale_date = childData.split('/');//end date
      var yearSaleDate =  Math.floor(entered_sale_date[0]);
      var monthSaleDate =  Math.floor(entered_sale_date[1]);
      var daySaleDate =  Math.floor(entered_sale_date[2]);

      if(yearPurchaseDate == yearSaleDate){//same year
        if(monthSaleDate == monthPurchaseDate){//same month
          if(daySaleDate >= dayPurchaseDate){//correct
            dynamic_sale_date[val] = childData ;

            let checkWriteCost = [ ...this.state.checkWriteCost ];
            checkWriteCost[val] = 1;

            this.setState({
              dynamic_sale_date,
              checkWriteCost
            });
          }else{
            dynamic_sale_date[val] = '' ;

            this.setState({
              dynamic_sale_date
            });
            alert("تاریخ فروش درست نیست")
          }
        }else if(monthSaleDate > monthPurchaseDate){//future month => correct
          dynamic_sale_date[val] = childData ;

          let checkWriteCost = [ ...this.state.checkWriteCost ];
          checkWriteCost[val] = 1;

          this.setState({
            dynamic_sale_date,
            checkWriteCost
          });
        }else{//prev month => incoorect
          dynamic_sale_date[val] = '' ;

          this.setState({
            dynamic_sale_date
          });
          alert("تاریخ فروش درست نیست")
        }
      }else if(yearPurchaseDate < yearSaleDate){//future year => correct
        dynamic_sale_date[val] = childData ;

        let checkWriteCost = [ ...this.state.checkWriteCost ];
        checkWriteCost[val] = 1;

        this.setState({
          dynamic_sale_date,
          checkWriteCost
        });
      }else{//prev year => incorrect
        dynamic_sale_date[val] = '' ;

        this.setState({
          dynamic_sale_date
        });
        alert("تاریخ فروش درست نیست")
      }

    }
  }

  changeShoeCostSale(e,val) {
    let dynamic_cost_sale = [ ...this.state.dynamic_cost_sale ];
    let dynamic_profit = [ ...this.state.dynamic_profit ];

    if( e.target.value  == '' ){//user is deleted all data of cost in box

      dynamic_cost_sale[val] = '' ;
      dynamic_profit[val] = '';

      this.setState({
        dynamic_cost_sale,
        dynamic_profit
      });

    }else{//user enter cost
      dynamic_cost_sale[val] = e.target.value ;
      dynamic_profit[val] = e.target.value - this.state.first_cost_sale;

      let checkWriteDate = [ ...this.state.checkWriteDate ];
      checkWriteDate[val] = 1;

      this.setState({
        dynamic_cost_sale,
        dynamic_profit,
        checkWriteDate
      });

    }

  }

  /* get data(for selected shoe) from DB*/
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
          if ( (index.shoe_code == this.state.code_shoe_selected) ){
              index.shoe_count.map((item,count1) => {
                //as much as item first_purchase_date = shoe_purchase_date[count1]

                var itr = Array.from(Array(Math.floor(item)).keys())
                itr.map((item,count2) => {
                  this.state.first_purchase_date = [...this.state.first_purchase_date, index.shoe_purchase_date[count1] ]
                })

                this.setState({
                  first_purchase_date : this.state.first_purchase_date
               }) 

              })

              this.setState({
                shoe_name: index.shoe_name ,
                shoe_model: index.shoe_model,
                shoe_code: index.shoe_code,
                shoe_color: index.shoe_color,
                dynamic_size: index.shoe_size,
                dynamic_count: index.shoe_count,
                dynamic_purchase_date: index.shoe_purchase_date,
                dynamic_sale_date: index.shoe_sale_date,
                dynamic_cost_buy: index.shoe_cost_buy,
                dynamic_cost_sale: index.shoe_cost_sale,
                dynamic_profit: index.shoe_profit,
                dynamic_profit_save: index.shoe_profit,
                shoe_image: index.shoe_image,
                file:index.shoe_image,
                calculate_profit : index.shoe_cost_sale-index.shoe_cost_buy,
                shoe_description: index.shoe_description,
                dynamicRowsIds:index.shoe_count,
                staticRowsIds: index.shoe_count.length
              }) 
          }
       })
    })
  }
    
  /* submit information(update) */
  handleSubmit = async e => {
    e.preventDefault();

    let dateIsEntered = true;
    let costIsEntered = true;

    //check not empty sale date if cost is entered
    this.state.checkWriteDate.map((item,index) => {
      if( item == 1){

        if(((this.state.dynamic_sale_date[index] == null) ||( this.state.dynamic_sale_date[index] == '')) && this.state.dynamic_cost_sale[index]  != '' ){
          alert("تاریخ فروش کفش را وارد یا تصحیح کنید");
          dateIsEntered = false;
        }

      }
      
    })
    
    //check not empty cost input if sale date is entered
    this.state.checkWriteCost.map((item,index) => {
      if( item == 1){

        if(((this.state.dynamic_cost_sale[index] == null) || (this.state.dynamic_cost_sale[index] == '')) && this.state.dynamic_sale_date[index]  != '' ){
          alert("هزینه فروش کفش را وارد کنید");
          costIsEntered = false;
        }

      }
      
    })
    
    //if two cost and sale date are entred
    if( (costIsEntered == true) && (dateIsEntered == true)){
      const obj = {
        shoe_name: this.state.shoe_name,
        shoe_model: this.state.shoe_model,
        shoe_code: this.state.shoe_code,
        shoe_color: this.state.shoe_color,
        shoe_size: this.state.dynamic_size,
        shoe_count: this.state.dynamic_count,
        shoe_purchase_date:this.state.dynamic_purchase_date,
        shoe_sale_date:this.state.dynamic_sale_date,
        shoe_cost_buy: this.state.dynamic_cost_buy,
        shoe_cost_sale: this.state.dynamic_cost_sale,
        shoe_profit: this.state.dynamic_profit,
        shoe_image: this.state.file,
        shoe_description: this.state.shoe_description
      };

      const response = await fetch('/information/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj) ,
      });

      alert("به روز رسانی انجام شد")

      this.setState({
        validation : 1
      })  
    }
  };

  /* selected the row to be edited */
  handleRow  = (event,val)  => {
    this.setState({
      choseRow : event.target.value
    })
  }

  render() { 

    var arraynumber_1_to_100 = Array.from(Array(100).keys()) // 1 to 100
    var arraysize_1_to_60 = Array.from(Array(60).keys()) // 1 to 60
    var show;

    //go to first page after update information
    if (this.state.validation == 1) {
      this.props.history.push('/first')
    }


    if(this.state.detail == 1){
      //count range for each row of detail
      let sum=0;
      this.state.dynamic_count.map((item,index) => {
        if (index < (this.state.indexrow-1)) {
          sum = Math.floor(item) + sum
        }
      })
      
      //detail
      show=
        <div>
          <div id = "border-table" >
            <table id="table_inform">
              <thead>
                <tr>
                  <th>سود </th>
                  <th>هزینه فروش</th>
                  <th>تاریخ فروش</th>
                  <th>انتخاب سطر</th>
                </tr>
              </thead>

              <tr>
                <td>-</td>
                <td>      
                  <InputTextField 
                  name = "test"
                  id = "test"
                  type = "number"
                  min = "0"
                  _handleChange ={e =>  this.changeShoeCostSale(e,this.state.choseRow-1+sum)}
                  />    
                </td>
                <td>
                  <DatePickerDetail  parentCallback = {childData =>  this.handleCallbackenterShoeSaleDate(childData,this.state.choseRow-1+sum) }/>   
                </td>
                <td> 
                  <div  id="selectRow">
                  <DropdownSelect 
                  name = "helloo"
                  lableName = "numbers"
                  placeholder = " شماره سطر"
                  val = {Array.from(Array(this.state.inside_row.length).keys()) }
                  _handleChange = {event =>  this.handleRow(event,this.state.inside_row.length) }
                  />
                  </div>
                </td>
              </tr>  

              {/* details */}
              <tbody>
                {this.state.inside_row.map((item,index) =>
                  <tr>
                    <td> 
                      <label>{this.state.dynamic_profit[index+sum]}</label>
                    </td>
                    <td>
                      <label>{this.state.dynamic_cost_sale[index+sum]}</label>
                    </td>
                    <td>
                      <label>{this.state.dynamic_sale_date[index+sum]}</label>
                     </td>
                    <td>
                      {index+1}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
    }

    return(
      <div>
        <ul id="navbar-update">
          <li><a href="/first">کفش ورزشی</a></li>
          <li><a href="#">=></a></li>
          <li><a href="#">به روز رسانی </a></li>
        </ul>

        
        <form onSubmit={this.handleSubmit}>
          <div id="wrap_update">

            {/*part change image*/}
            <div id="section1-SubmitInformation_update">
              <div id = "section1" >
                <div id = "border" >
                  <img id="image" src={this.state.file}/>
                </div>
              </div>
              <div id = "section2" >
                <div id = "border" >
                  <input class="file-input" type="text"  placeholder = {" عکس را وارد کنید url"} onChange={this.handleChangeImage}/>
                </div>
              </div>
            </div>
           
            <div id="section2-SubmitInformation_update">
              {/*part change color and code*/}
              <div id="section2-col1">
                <ul>
                  <li>
                    <label  ><b>: رنگ کفش</b></label> 
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      required = "true"
                      placeholder = "رنگ کفش"
                      val = {this.state.shoe_color}
                      _handleChange ={this.changeShoeColor}
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <label><b>: کد کفش</b></label>
                    <label id="code">{Math.floor(this.state.shoe_code)}</label>
                  </li>
                </ul>
              </div>
               {/*part change name and model*/}
              <div id="section2-col2">
                <ul>
                  <li>
                    <label  ><b>: برند کفش</b></label>
                    <div id="selectModel">
                      <DropdownSelectName 
                      name = "heoo"
                      lableName = "برند"
                      placeholder = {this.state.shoe_model}
                      val = {this.state.arraymodel}
                      _handleChange = {event =>  this.handleChangeArraymodel(event) }
                      />
                    </div>
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
                      _handleChange ={this.changeShoeName}
                    />
                  </li>
                </ul>
              </div>
                
            </div>

             {/* part see and enter size,count,purcheseDate,costSale */}
            <div id="section3-SubmitInformation_update">
                    
              <div id = "border-table" >
                <table id="table_inform">

                  <thead>
                    <tr>
                      <th>انتخاب سطر</th>
                      <th>هزینه خرید</th>
                      <th>تاریخ خرید</th>
                      <th>تعداد کفش</th>
                      <th>سایز کفش</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {this.state.dynamicRowsIds.map((item,index) =>
                      <tr>
                        <td >
                          <label id="edit" onClick={() => { this.click(index+1,this.state.dynamic_count[index],this.state.dynamic_cost_buy[index])}}>جزئیات </label> 
                        </td>

                        <td>
                          {
                            <div>
                              {((index<this.state.staticRowsIds) 
                                ) ? (
                                  <label>{this.state.dynamic_cost_buy[index]}</label>
                                ) : (
                                  <InputTextField 
                                  name = "test"
                                  id = "test"
                                  type = "number"
                                  min = "0"
                                  required = "true"
                                  _handleChange ={e =>  this.handleChangeShoeCostBuy(e,index)}
                                  />
                              )}
                            </div>
                          }
                        </td>

                        <td> 
                          {
                            <div>
                              {((index<this.state.staticRowsIds) 
                                ) ? (
                                  <label>{this.state.dynamic_purchase_date[index]} </label>
                                ) : (
                                  <DatePicker parentCallback = {childData =>  this.handleCallbackenterShoePurchaseDate(childData,index) }/>
                              )}
                            </div>
                          }
                        </td>

                        <td>
                          {
                            <div>
                              {((index<this.state.staticRowsIds) 
                                ) ? (
                                  <label>{this.state.dynamic_count[index]}</label>
                                ) : (
                                  <DropdownSelect 
                                  name = "helloo"
                                  required = "true"
                                  lableName = "numbers"
                                  placeholder = "تعداد کفش"
                                  val = {arraynumber_1_to_100}
                                  _handleChange = {event =>  this.handleChangeShoeCount(event,index) }
                                  />
                                )}
                            </div>
                          }
                        </td>

                        <td>
                          {
                            <div>
                              {((index<this.state.staticRowsIds) 
                                ) ? (
                                  <label>{this.state.dynamic_size[index]}</label>
                                ) : (
                                  <DropdownSelect 
                                  name = "heoo"
                                  required = "true"
                                  lableName = "numbers"
                                  placeholder = "سایز کفش"
                                  val = {arraysize_1_to_60}
                                  _handleChange = {event =>  this.handleChangeShoeSize(event,index) }
                                  /> 
                                )}
                            </div>
                          }
                        </td>
                      </tr>
                    )} 
                  </tbody>
          
                </table>
              </div>

              <div id="lableEdit">
                <label onClick={ () => this.addDynamicRow() }><b>{"اضافه کردن سطر"}</b></label>
                <label onClick={ () => this.deletDynamicRow() }><b>{"پاک کردن سطر"}</b></label>
              </div>
                  
            </div>
           
           {/*change description */}
            <div id="section5-SubmitInformation_update">
              {show}
            </div>

            <div id="section4-SubmitInformation_update">
              <label  ><b>: توضیحات</b></label> 
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
                placeholder = "توضیحات"
                val = {this.state.shoe_description}
                _handleChange ={this.changeShoeDescription}
              />
            </div>
          </div>

          <div id = "sectionSubmit-SubmitInformation_update" >
            <button  type="submit" class = "button-SubmitInformation_update"> به روز رسانی </button> 
          </div>

        </form>
              
      </div>
              
    );
  }
}