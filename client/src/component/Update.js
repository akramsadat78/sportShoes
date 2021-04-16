import React, { Component } from 'react';
import InputTextField from './InputTextField';
import '../css/Update.css';
import DropdownSelect from './DropdownSelect';
import DatePicker from '../componentdate/DatePicker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class Update extends Component {
 
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.handleSubmit.bind(this);
    
        this.changeShoeName = this.changeShoeName.bind(this);
        this.changeShoeModel = this.changeShoeModel.bind(this);
        this.changeShoeCode = this.changeShoeCode.bind(this);
        this.changeShoeColor = this.changeShoeColor.bind(this);
      /*  this.changeShoeSize = this.changeShoeSize.bind(this);
        this.changeShoeCount = this.changeShoeCount.bind(this);*/
    
        this.click = this.click.bind(this);
        this.changeShoeSaleNumber = this.changeShoeSaleNumber.bind(this);
        this.changeShoeCostBuy2 = this.changeShoeCostBuy2.bind(this);
        this.changeShoeCostSale2 = this.changeShoeCostSale2.bind(this);
        this.changeShoeProfit = this.changeShoeProfit.bind(this);
    
        this.changeShoeDescription = this.changeShoeDescription.bind(this);
        this.changeShoeImage = this.changeShoeImage.bind(this);

        this.state = {
            data: this.props.dataParentToChild,
            shoe_name: '',
            shoe_model: '',
            shoe_code: '',
            shoe_color: '',
            /*shoe_size: '',
            shoe_count: '',
            shoe_purchase_date: '',
            shoe_sale_date: '',
            shoe_cost_buy: '',
            shoe_cost_sale: '',*/
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
            dynamic_array:[],
            inside_row:[],
            detail:0,
            test:[],
            current_count:0,
            indexrow:0
        }
    }

    
    deletDynamicRow(){
      alert("delete")
      alert(this.state.dynamic_array.length)
      this.setState({
        dynamic_array:
        this.state.dynamic_array.filter(rowId =>
          rowId !== this.state.dynamic_array.length
        )
      });
    }
    addDynamicRow() {
      alert(this.state.dynamic_array.length)
  
      /*if (this.state.dynamicEditorRowsIds.length == 0) {
        header = 
        <tr>
              <th>تعداد فروش</th>
              <th>هزینه فروش</th>
              <th>تاریخ فروش</th>
              <th>هزینه خرید</th>
              <th>تاریخ خرید</th>
              <th>تعداد کفش</th>
              <th>سایز کفش</th>
            </tr>;
      } else {
        
      }*/
      this.setState({
        dynamic_array: [...this.state.dynamic_array,this.state.dynamic_array.length+1 ]
      });
   }
   
  /* removeDynamicRow(id) {
     alert("id")
     alert(id)
     alert(this.state.dynamic_array.filter(rowId =>
      rowId !== 2
    ))
      this.setState({
        dynamic_array:
          this.state.dynamic_array.filter(rowId =>
            rowId !== id
          )
      })
   }
   
   getDynamicEditableRow(rowId) {
     return (
       <tr key={rowId}>
          <td>
            <p>{rowId}</p>
            <button onClick={() => this.removeDynamicRow(rowId)}>REMOVE THIS ROW</button>
          </td>
        </tr>
     )
   }*/
  
    handleChangeShoeSize  = (event,val) => {
      let dynamic_size = [ ...this.state.dynamic_size ];
      dynamic_size[val-1] = event.currentTarget.value  ;
    this.setState({
      //shoe_sale_date: e.target.value,
      dynamic_size
    });
      /*this.setState({
        dynamic_size: [...this.state.dynamic_size,event.currentTarget.value ]
      });*/
      //shoe_size: event.currentTarget.value
  }
    handleChangeShoeCount  = (event,val)  => {
      let dynamic_count = [ ...this.state.dynamic_count ];
      dynamic_count[val-1] = event.currentTarget.value  ;
    //  let range=Math.floor(event.currentTarget.value);
 
    this.setState({
      //shoe_sale_date: e.target.value,
      dynamic_count
    //  inside_row : Array.from(Array(range).keys()) 
    });
     /* this.setState({
        dynamic_count: [...this.state.dynamic_count,event.currentTarget.value ]
      });*/
      // shoe_count: event.currentTarget.value
  }
  handleCallbackenterShoeSaleDate = (childData,val) =>{
    let dynamic_sale_date = [ ...this.state.dynamic_sale_date ];
    dynamic_sale_date[val] = childData ;
    this.setState({
      //shoe_sale_date: e.target.value,
      dynamic_sale_date
    });
  }

    handleCallbackenterShoePurchaseDate = (childData,val) =>{ 
    let dynamic_purchase_date = [ ...this.state.dynamic_purchase_date ];
    dynamic_purchase_date[val-1] = childData ;
    this.setState({
      //shoe_sale_date: e.target.value,
      dynamic_purchase_date
    });
     /* this.setState({
        dynamic_purchase_date: [...this.state.dynamic_purchase_date,childData ]
      })*/
      //  shoe_purchase_date: childData
  }

  click(index,numberShoe) {
    alert(numberShoe)

   let range=Math.floor(numberShoe);
    this.setState({
   
    detail:1,
    inside_row : Array.from(Array(range).keys()) ,
    current_count:range,
    indexrow:index
    });
    
  }
  changeShoeSaleNumber(e,val) {
    alert("val")
    alert(val)
    let dynamic_sale_number = [ ...this.state.dynamic_sale_number ];
    dynamic_sale_number[val] = e.target.value ;
    this.setState({
      //shoe_sale_date: e.target.value,
      dynamic_sale_number
    });
  }

  changeShoeCostSale2(e,val) {
    let dynamic_cost_sale = [ ...this.state.dynamic_cost_sale ];
    dynamic_cost_sale[val] = e.target.value ;
    this.setState({
      //shoe_sale_date: e.target.value,
      dynamic_cost_sale
    });
  }

  changeShoeCostBuy2(e,val) {
    let dynamic_cost_buy = [ ...this.state.dynamic_cost_buy ];
    dynamic_cost_buy[val-1] = e.target.value ;
    this.setState({
      //shoe_sale_date: e.target.value,
      dynamic_cost_buy
    });
  }
  handleChangeShoeCostBuy(){
    //alert("=====================")
    this.setState({
      
      dynamic_cost_buy: [...this.state.dynamic_cost_buy,this.state.shoe_sale_date ]
    
      })
      //  dynamic_cost_buy: [...this.state.dynamic_cost_buy,e.target.value ]
      //shoe_sale_date: childData
      //  shoe_cost_buy: e.target.value
  }
  /*
  handleCallbackenterShoeSaleDate = (childData) =>{
    this.setState({
      dynamic_cost_buy: [...this.state.dynamic_cost_buy,childData ]
      })
      //shoe_sale_date: childData
  }*/
  
  
  /***************************************/
    
    changeShoeName(e) {
    this.setState({
      shoe_name: e.target.value
    });
  }

  changeShoeModel(e) {
    this.setState({
      shoe_model: e.target.value
    });
  }
  
  changeShoeCode(e) {
    this.setState({
      shoe_code: e.target.value
    });
  }

  changeShoeColor(e) {
    this.setState({
      shoe_color: e.target.value
    });
  }
  
  /*changeShoeSize(e) {
    this.setState({
      shoe_size: e.target.value
    });
  }*/
   
  /*changeShoeCount(e) {
    this.setState({
      shoe_count: e.target.value
    });
  }*/

  changeShoePurchaseDate(e) {
    this.setState({
      shoe_purchase_date: e.target.value
    });
  }

  changeShoeSaleDate(e) {
    this.setState({
      shoe_sale_date: e.target.value
    });
  }

  changeShoeCostBuy(e) {
    this.setState({
      shoe_cost_buy: e.target.value
    });
  }

  changeShoeCostSale(e) {
    this.setState({
      shoe_cost_sale: e.target.value
    });
  }

  changeShoeProfit(e) {
    this.setState({
      shoe_profit: e.target.value
    });
  }

  changeShoeDescription(e) {
    this.setState({
      shoe_description: e.target.value
    });
  }

  changeShoeImage(e) {
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
              if ( (index.shoe_code == this.state.data) ){
                 let sum=0;
                 index.shoe_count.map((item,index) =>
                     sum = Math.floor(item) + sum
                 )
                 alert(sum)
                  this.setState({
                  shoe_name: index.shoe_name ,
                  shoe_model: index.shoe_model,
                  shoe_code: index.shoe_code,
                  shoe_color: index.shoe_color,
                  // shoe_size: index.shoe_size,
                  // shoe_count: index.shoe_count,
                  // shoe_purchase_date: index.shoe_purchase_date,
                  // shoe_sale_date: index.shoe_sale_date,
                  // shoe_cost_buy: index.shoe_cost_buy,
                  // shoe_cost_sale: index.shoe_cost_sale,
                  dynamic_size: index.shoe_size,
                  dynamic_count: index.shoe_count,
                  dynamic_purchase_date: index.shoe_purchase_date,
                  dynamic_sale_date: index.shoe_sale_date,
                  dynamic_cost_buy: index.shoe_cost_buy,
                  dynamic_cost_sale: index.shoe_cost_sale,
                  shoe_profit: index.shoe_profit,
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
    alert("dynamic_cost_buy")
  alert(this.state.shoe_sale_date)
  alert(this.state.dynamic_cost_buy[0])
  alert(this.state.dynamic_cost_buy[1])
  alert(this.state.dynamic_cost_buy[2])
  alert("dynamic_purchase_date")
  alert(this.state.dynamic_purchase_date[0])
  alert(this.state.dynamic_purchase_date[1])
  alert(this.state.dynamic_purchase_date[2])

  alert("dynamic_count")
  alert(this.state.dynamic_count[0])
  alert(this.state.dynamic_count[1])
  alert(this.state.dynamic_count[2])

  alert("dynamic_size")
  alert(this.state.dynamic_size[0])
  alert(this.state.dynamic_size[1])
  alert(this.state.dynamic_size[2])

  alert("dynamic_sale_date")
  alert(this.state.dynamic_sale_date[0])
  alert(this.state.dynamic_sale_date[1])
  alert(this.state.dynamic_sale_date[2])

  alert("dynamic_cost_sale")
  alert(this.state.dynamic_cost_sale[0])
  alert(this.state.dynamic_cost_sale[1])
  alert(this.state.dynamic_cost_sale[14])

  alert("dynamic_sale_number")
  alert(this.state.dynamic_sale_number[0])
  alert(this.state.dynamic_sale_number[1])
  alert(this.state.dynamic_sale_number[14])

    const obj = {
      shoe_name: this.state.shoe_name,
      shoe_model: this.state.shoe_model,
      shoe_code: this.state.shoe_code,
      shoe_color: this.state.shoe_color,
     /* shoe_size: this.state.shoe_size,
      shoe_count: this.state.shoe_count,
      shoe_purchase_date:this.state.shoe_purchase_date,
      shoe_sale_date:this.state.shoe_sale_date,
      shoe_cost_buy: this.state.shoe_cost_buy,
      shoe_cost_sale: this.state.shoe_cost_sale,*/
      shoe_size: this.state.dynamic_size,
      shoe_count: this.state.dynamic_count,
      shoe_purchase_date:this.state.dynamic_purchase_date,
      shoe_sale_date:this.state.dynamic_sale_date,
      shoe_cost_buy: this.state.dynamic_cost_buy,
      shoe_cost_sale: this.state.dynamic_cost_sale,
      shoe_profit: this.state.shoe_cost_sale - this.state.shoe_cost_buy,
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
  
    this.setState({
      validation : 1
    })  

  };

 
    render() { 
      var arraysize_1_to_100 = Array.from(Array(100).keys()) // 0 to 100
    var arraynumber_1_to_100 = Array.from(Array(100).keys()) // 0 to 100
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
<p>inside_row[1] = {this.state.inside_row[1]}</p>
<p>indexrow ={this.state.indexrow}</p>
<p>sum = {sum}</p>
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
                
                    {
                        this.state.inside_row.map((item,index) =>
                        
                              
                          <tr  >
 
                           
                         <td> 
                         <InputTextField 
                            name = "test"
                      id = "test"
                      type = "text"
                      //placeholder = {this.state.dynamic_cost_sale[index+sum]}
                      //required = "true"
                      //val = {this.state.shoe_cost_sale}
                      _handleChange ={e =>  this.changeShoeSaleNumber(e,index+sum)}
                    />
                        </td>
                          <td> 
                          <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      placeholder = {this.state.dynamic_cost_sale[index+sum]}
                      //required = "true"
                      //val = {this.state.shoe_cost_sale}
                      _handleChange ={e =>  this.changeShoeCostSale2(e,index+sum)}
                    />
                          </td>
                         <td>
                         <DatePicker  dataParentToChild = {this.state.dynamic_sale_date[index+sum]} parentCallback = {childData =>  this.handleCallbackenterShoeSaleDate(childData,index+sum) }/>
                           
                    </td>
                    <td>{index+1}</td>
                        </tr>
                        )
                      
                    }
                    
                </tbody>
        
              </table>

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
                      {/*<input class="file-input" type="file"  onChange={this.handleChange}/>*/}
                      <input class="file-input" type="text"  placeholder = " عکس را وارد کنید url" onChange={this.handleChange}/>
                    </div>
                  </div>
                </div>
    
                <div id="section2-SubmitInformation_update">
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
                    <label id="code">{Math.floor(this.state.shoe_code)}</label>
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
                      //1/required = "true"
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
                      //1/required = "true"
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

                <div id="section3-SubmitInformation_update">
                  
            <div id = "border-table" >
               <table id="table_inform">
               <thead>
               <tr>
               <th>انتخاب سطر</th>
            <th>سود </th>
            <th>هزینه فروش</th>
            <th>تاریخ فروش</th>
            <th>هزینه خرید</th>
            <th>تاریخ خرید</th>
            <th>تعداد کفش</th>
            <th>سایز کفش</th>
          </tr>
                </thead>
                
                <tbody>
                
                    {
                        this.state.dynamic_array.map((item,index) =>
                        
                              
                          <tr  >
 
                            {/*this.getDynamicEditableRow(item)*/}
                            {/*<Link to={ `/shoe${this.state.shoe_code}/${index}` }>
                            
                           <td onClick={() => { this.click(this.state.dynamic_count[index])}}></td>
                           </Link>
                         <td> 
                         <InputTextField 
                            name = "test"
                      id = "test"
                      type = "text"
                      //placeholder = {this.state.dynamic_cost_sale[index]}
                      //required = "true"
                      //val = {this.state.shoe_cost_sale}
                      _handleChange ={e =>  this.changeShoeSaleNumber(e,index+1)}
                    />
                        </td>
                          <td> 
                          <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      //placeholder = {this.state.dynamic_cost_sale[index]}
                      //required = "true"
                      //val = {this.state.shoe_cost_sale}
                      _handleChange ={e =>  this.changeShoeCostSale2(e,index+1)}
                    />
                          </td>
                         <td>
                         <DatePicker  parentCallback = {childData =>  this.handleCallbackenterShoeSaleDate(childData,index+1) }/>
                          
                    </td>*/}
                     <td onClick={() => { this.click(index+1,this.state.dynamic_count[index])}}>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                          <td>
                            {/*<DatePicker parentCallback = {this.handleCallbackenterShoeSaleDate}/>*/}
                            {/*<InputTextField 
                            name = "test"
                            id = "test"
                            type = "text"
                            //1/ required = "true"
                           // val = {this.state.dynamic_cost_buy[0]}
                            _handleChange ={this.handleChangeShoeCostBuy}
                            />*/}
                            
                             <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      placeholder = {this.state.dynamic_cost_buy[index]}
                      //required = "true"
                      //val = {this.state.shoe_cost_sale}
                      _handleChange ={e =>  this.changeShoeCostBuy2(e,index+1)}
                    />
                          </td>
                          <td> 
                          <DatePicker dataParentToChild = {this.state.dynamic_purchase_date[index]} parentCallback = {childData =>  this.handleCallbackenterShoePurchaseDate(childData,index+1) }/>
                            {/*<DatePicker parentCallback = {childData =>  this.handleCallbackenterShoePurchaseDate(childData,item) }/>*/}
                          </td>
                          <td>
                           
                            <DropdownSelect 
                            name = "helloo"
                            //1/required = "false"
                            lableName = "numbers"
                            placeholder = {this.state.dynamic_count[index]}
                            val = {arraynumber_1_to_100}
                            _handleChange = {event =>  this.handleChangeShoeCount(event,index+1) }
                            />
                          </td>
                          <td>
                            <DropdownSelect 
                            name = "heoo"
                            //1/required = "false"
                            lableName = "numbers"
                            placeholder = {this.state.dynamic_size[index]}
                            val = {arraysize_1_to_100}
                            _handleChange = {event =>  this.handleChangeShoeSize(event,index+1) }
                            /> 
                          </td>
                        </tr>
                        )
                      
                    }
                    
                </tbody>
        
              </table>
             
              {show}
              </div>
              <label onClick={ () => this.addDynamicRow() }><b>{"اضافه کردن سطر"}</b></label>
              <label onClick={ () => this.deletDynamicRow() }><b>{"پاک کردن سطر"}</b></label>
                  {/*<div id="section2-col1">
                    <ul>
                      <li>
                        <label  ><b>: تاریخ فروش</b></label>
                        <InputTextField 
                          name = "test"
                          id = "test"
                          type = "Date"
                          //required = "true"
                          val = {this.state.shoe_sale_date}
                          _handleChange ={this.changeShoeSaleDate}
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
                          _handleChange ={this.changeShoeCostSale}
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
                          _handleChange ={this.changeShoePurchaseDate}
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
                          _handleChange ={this.changeShoeCostBuy}
                        />
                      </li>
                      <li>
                        <label id="name-profit" ><b>: سود</b></label> 
                        <label id="answer"><b>{this.state.shoe_cost_sale - this.state.shoe_cost_buy}</b></label> 
                      </li>
                    </ul>
                </div>*/}
                </div>
    
                <div id="section4-SubmitInformation_update">
                  <label  ><b>: توضیحات</b></label> 
                  <InputTextField 
                    name = "test"
                    id = "test"
                    type = "text"
                   // required = "true"
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
