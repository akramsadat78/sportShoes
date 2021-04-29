import React, { Component } from 'react';
import InputTextField from './InputTextField';
import '../css/Update.css';
import DatePickerDetail from '../componentdate/DatePickerDetail';
import DropdownSelectName from './DropdownSelectName';

export default class Update extends Component {
 
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  
    this.click = this.click.bind(this);
    this.changeShoeSaleNumber = this.changeShoeSaleNumber.bind(this);
    this.changeShoeCostBuy = this.changeShoeCostBuy.bind(this);
    this.changeShoeCostSale = this.changeShoeCostSale.bind(this);
    this.changeShoeProfit = this.changeShoeProfit.bind(this);
    this.changeShoeDescription = this.changeShoeDescription.bind(this);
    this.changeShoeName = this.changeShoeName.bind(this);
    this.changeShoeColor = this.changeShoeColor.bind(this);

    this.state = {
      data: this.props.dataParentToChild,
      shoe_name: '',
      shoe_model: '',
      shoe_code: '',
      shoe_color: '',
      shoe_profit: '',
      shoe_image: '',
      shoe_description: '',
      file: null,
      calculate_profit : 0,
      validation:0,
      dynamicEditorRowsIds: [],
      dynamic_size: [],
      dynamic_count: [],
      dynamic_purchase_date: [],
      dynamic_cost_buy: [],
      dynamic_sale_date:[],
      dynamic_cost_sale:[],
      dynamic_sale_number:[],
      dynamic_profit : [],
      dynamic_profit_save:[],
      dynamic_array:[],
      inside_row:[],
      save_purchase_date:[],
      detail:0,
      test:[],
      current_count:0,
      indexrow:0,
      first_cost_sale : 0,
      arraymodel:['Nike','Pama','Adidas','Reebook','Skechers','Asics','Puma'],
      checkWriteDate:[],
      checkWriteCost:[],
      changing:true
    }
  }

  deletDynamicRow(){
    this.setState({
      dynamic_array:
      this.state.dynamic_array.filter(rowId =>
        rowId !== this.state.dynamic_array.length
      )
    });
  }

  addDynamicRow() {
    this.setState({
      dynamic_array: [...this.state.dynamic_array,this.state.dynamic_array.length+1 ]
    });
  }

  handleChangeArraymodel  = (event)  => {
    this.setState({
      shoe_model: event.currentTarget.value
    });
  }

  handleChangeShoeSize  = (event,val) => {
    let dynamic_size = [ ...this.state.dynamic_size ];
    dynamic_size[val-1] = event.currentTarget.value  ;
    this.setState({
      dynamic_size
    });
  }

  handleChangeShoeCount  = (event,val)  => {
    let dynamic_count = [ ...this.state.dynamic_count ];
    dynamic_count[val-1] = event.currentTarget.value  ;
  
    this.setState({
      dynamic_count
    });
  }

  handleCallbackenterShoeSaleDate = (childData,val) =>{

    let dynamic_sale_date = [ ...this.state.dynamic_sale_date ];

    if( childData  == '' ){
      
      dynamic_sale_date[val] = '' ;

      this.setState({
        dynamic_sale_date
      });

    }else{

      if( this.state.save_purchase_date[val] <= childData ){
     
      dynamic_sale_date[val] = childData ;

      let checkWriteCost = [ ...this.state.checkWriteCost ];
      checkWriteCost[val] = 1;

      this.setState({
        dynamic_sale_date,
        checkWriteCost
      });

    }else{
      alert("تاریخ فروش درست نیست")
    }
      
    }

  }

  handleCallbackenterShoePurchaseDate = (childData,val) =>{ 
    let dynamic_purchase_date = [ ...this.state.dynamic_purchase_date ];
    dynamic_purchase_date[val-1] = childData ;
    this.setState({
      dynamic_purchase_date
    });
  }

  click(index,numberShoe,costSale) {

    if(this.state.dynamic_count[index-1] == null){
      alert("کفشی برای ویرایش وارد نشده است")
    }else{
      let range=Math.floor(numberShoe);
      this.setState({
        first_cost_sale : costSale,
        detail:1,
        inside_row : Array.from(Array(range).keys()) ,
        current_count:range,
        indexrow:index
      });
    }
  }

  changeShoeSaleNumber(e,val) {
    let dynamic_sale_number = [ ...this.state.dynamic_sale_number ];
    dynamic_sale_number[val] = e.target.value ;
    this.setState({
      dynamic_sale_number
    });
  }

  changeShoeCostSale(e,val) {

    let dynamic_cost_sale = [ ...this.state.dynamic_cost_sale ];
    let dynamic_profit = [ ...this.state.dynamic_profit ];

    if( e.target.value  == '' ){

      dynamic_cost_sale[val] = '' ;
      dynamic_profit[val] = '';

      this.setState({
        dynamic_cost_sale,
        dynamic_profit
      });

    }else{
      
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

  changeShoeProfit(e,val) {
    let dynamic_profit = [ ...this.state.dynamic_profit ];
    dynamic_profit[val-1] = e.target.value ;
    this.setState({
      dynamic_profit
    });
  }

  changeShoeCostBuy(e,val) {
    let dynamic_cost_buy = [ ...this.state.dynamic_cost_buy ];
    dynamic_cost_buy[val-1] = e.target.value ;
    this.setState({
      dynamic_cost_buy
    });
  }

  handleChangeShoeCostBuy(){
    this.setState({
      dynamic_cost_buy: [...this.state.dynamic_cost_buy,this.state.shoe_sale_date ]
    })
  }

  changeShoeDescription(e) {
    this.setState({
      shoe_description: e.target.value
    });
  }

  handleChange(event) {
    this.setState({
      file : event.target.value
    })
  }

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
          if ( (index.shoe_code == this.state.data) ){
              let sum=0;
              index.shoe_count.map((item,count1) => {
                sum = Math.floor(item) + sum;

                var itr = Array.from(Array(Math.floor(item)).keys())
                itr.map((item,count2) => {
                  this.state.save_purchase_date = [...this.state.save_purchase_date, index.shoe_purchase_date[count1] ]
                })

                this.setState({
                save_purchase_date : this.state.save_purchase_date
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
                dynamic_array:index.shoe_count,
                test: Array.from(Array(Math.floor(sum)).keys())
              }) 
          }
       })
    })
  }
    
  
  handleSubmit = async e => {
    e.preventDefault();

    let dateIsEntered = true;
    let costIsEntered = true;

    //check not empty sale date for cost that is entered
    this.state.checkWriteDate.map((item,index) => {
      if( item == 1){

        if(((this.state.dynamic_sale_date[index] == null) ||( this.state.dynamic_sale_date[index] == '')) && this.state.dynamic_cost_sale[index]  != '' ){
          alert("تاریخ فروش کفش را وارد یا تصحیح کنید");
          dateIsEntered = false;
        }

      }
      
    })
    
    //check not empty cost input for sale date that is entered
    this.state.checkWriteCost.map((item,index) => {
      if( item == 1){

        if(((this.state.dynamic_cost_sale[index] == null) || (this.state.dynamic_cost_sale[index] == '')) && this.state.dynamic_sale_date[index]  != '' ){
          alert("هزینه فروش کفش را وارد کنید");
          costIsEntered = false;
        }

      }
      
    })
    
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

 
  render() { 

    var show;

    if (this.state.validation == 1) {
      this.props.history.push('/first')
    }

    if(this.state.detail == 1){
      let sum=0;
      this.state.dynamic_count.map((item,index) => {
        if (index < (this.state.indexrow-1)) {
          sum = Math.floor(item) + sum
        }
      })
      
      show=
        <div>
          <div id = "border-table" >
            <table id="table_inform">
              <thead>
                <tr>
                  <th>سود </th>
                  <th>هزینه فروش</th>
                  <th>تاریخ فروش</th>
                  <th>شماره</th>
                </tr>
              </thead>
                        
              <tbody>
                {this.state.inside_row.map((item,index) =>
                  <tr>
                    <td> 
                      <label>{this.state.dynamic_profit[index+sum]}</label>
                    </td>
                    <td> 
                      {
                        <div>
                          {(((this.state.dynamic_profit_save[index+sum] == null) || (this.state.dynamic_profit_save[index+sum] == '')) 
                            ) ? (
                              <InputTextField 
                              name = "test"
                              id = "test"
                              type = "number"
                              placeholder = {this.state.dynamic_cost_sale[index+sum]}
                              _handleChange ={e =>  this.changeShoeCostSale(e,index+sum)}
                              />
                            ) : (
                              <label>{this.state.dynamic_cost_sale[index+sum]}</label>
                          )}
                      </div>
                      }
                      
                    </td>
                    <td>
                      <div>
                        {( (this.state.dynamic_profit_save[index+sum] == null) || (this.state.dynamic_profit_save[index+sum] == '')
                          ) ? (
                            <DatePickerDetail  dataParentToChild = {this.state.dynamic_sale_date[index+sum]} parentCallback = {childData =>  this.handleCallbackenterShoeSaleDate(childData,index+sum) }/>   
                          ) : (
                            <label>{this.state.dynamic_sale_date[index+sum]}</label>
                        )}
                      </div>
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

            <div id="section1-SubmitInformation_update">
              <div id = "section1" >
                <div id = "border" >
                  <img id="image" src={this.state.shoe_image}/>
                </div>
              </div>
              <div id = "section2" >
                <div id = "border" >
                  <input class="file-input" type="text"  placeholder = {" عکس را وارد کنید url"} onChange={this.handleChange}/>
                </div>
              </div>
            </div>
           
            <div id="section2-SubmitInformation_update">

               {/*رنگ و کدکفش */}
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
        
              <div id="section2-col2">
                 {/*برند و نام کفش */}
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
                    {this.state.dynamic_array.map((item,index) =>
                      <tr>
                        <td onClick={() => { this.click(index+1,this.state.dynamic_count[index],this.state.dynamic_cost_buy[index])}}>
                          <label id="edit">جزئیات </label> 
                        </td>

                        <td>
                          <label>{this.state.dynamic_cost_buy[index]}</label>
                        </td>

                        <td> 
                          <label>{this.state.dynamic_purchase_date[index]} </label>
                        </td>

                        <td>
                          <label>{this.state.dynamic_count[index]}</label>
                        </td>

                        <td>
                          <label>{this.state.dynamic_size[index]}</label>
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
            {/*جزییات */}
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
