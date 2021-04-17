import React, { Component } from 'react';
import '../css/SubmitInformation.css';
import InputTextField from './InputTextField';
import DropdownSelect from './DropdownSelect';
import DropdownSelectName from './DropdownSelectName';
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
    //this.enterShoeSize = this.enterShoeSize.bind(this);
    //this.enterShoeCount = this.enterShoeCount.bind(this);

    //this.enterShoePurchaseDate = this.enterShoePurchaseDate.bind(this);
    //this.enterShoeSaleDate = this.enterShoeSaleDate.bind(this);
    //this.enterShoeCostBuy = this.enterShoeCostBuy.bind(this);
    this.enterShoeCostSale2 = this.enterShoeCostSale2.bind(this);
    this.enterShoeProfit = this.enterShoeProfit.bind(this);

    this.enterShoeDescription = this.enterShoeDescription.bind(this);
    this.enterShoeImage = this.enterShoeImage.bind(this);

    this.state = {
      shoe_name: '',
      shoe_model: '',
      shoe_code: '',
      shoe_color: '',
     // shoe_size: '',
      //shoe_count: '',
      //shoe_purchase_date: '',
      //shoe_sale_date: '',
      //shoe_cost_buy: '',
      //shoe_cost_sale: '',
      shoe_profit: '',
      shoe_image: '',
      shoe_description: '',
      response: '',
      responseToPost: '',
      prev_code:'',
      validation:0,
      file: null,
      dynamicEditorRowsIds: [],
      dynamic_size: [],
      dynamic_count: [],
      dynamic_temp_purchase_date: [],
      dynamic_purchase_date: [],
      dynamic_cost_buy: [],
      dynamic_sale_date:[],
      dynamic_cost_sale:[],
      arraymodel:['Nike','Pama','Adidas','Reebook','Skechers','Asics','Puma']
    }
    
  }
  
  deletDynamicRow(){
    alert("delete")
    alert(this.state.dynamicEditorRowsIds.length)
    this.setState({
      dynamicEditorRowsIds:
      this.state.dynamicEditorRowsIds.filter(rowId =>
        rowId !== this.state.dynamicEditorRowsIds.length
      )
    });
  }
  addDynamicRow() {
    alert(this.state.dynamicEditorRowsIds.length)

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
      dynamicEditorRowsIds: [...this.state.dynamicEditorRowsIds,this.state.dynamicEditorRowsIds.length+1 ]
    });
 }
 
 removeDynamicRow(id) {
   alert("id")
   alert(id)
   alert(this.state.dynamicEditorRowsIds.filter(rowId =>
    rowId !== 2
  ))
    this.setState({
      dynamicEditorRowsIds:
        this.state.dynamicEditorRowsIds.filter(rowId =>
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
 }

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
  this.setState({
    //shoe_sale_date: e.target.value,
    dynamic_count
  });

  
   /* this.setState({
      dynamic_count: [...this.state.dynamic_count,event.currentTarget.value ]
    });*/
    // shoe_count: event.currentTarget.value
}

handleChangeArraymodel  = (event)  => {
  this.setState({
    shoe_model: event.currentTarget.value
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

enterShoeCostSale2(e,val) {
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
  
  /*enterShoeSize(e) {
    this.setState({
      shoe_size: e.target.value
    });
  }
   */
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
    alert("shoe-model")
  alert(this.state.shoe_model)
  /*alert("dynamic_cost_buy")
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
  alert(this.state.dynamic_size[2])*/

  
    const obj = {
      shoe_name: this.state.shoe_name,
      shoe_model: this.state.shoe_model,
      shoe_code: Math.floor(this.state.prev_code)+ 1,
      shoe_color: this.state.shoe_color,
     // shoe_size: this.state.shoe_size,
      shoe_size:this.state.dynamic_size,
      shoe_count: this.state.dynamic_count,
      shoe_purchase_date:this.state.dynamic_purchase_date,
      shoe_sale_date:this.state.dynamic_sale_date,
      shoe_cost_buy: this.state.dynamic_cost_buy,
      shoe_cost_sale: this.state.dynamic_cost_sale,
     // shoe_count: this.state.shoe_count,
      //shoe_purchase_date:this.state.shoe_purchase_date,
      /*shoe_sale_date:this.state.shoe_sale_date,
      shoe_cost_buy: this.state.shoe_cost_buy,
      shoe_cost_sale: this.state.shoe_cost_sale,*/
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
      //dynamic_size:'',
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
    var arraysize_1_to_100 = Array.from(Array(100).keys()) // 0 to 100
    var arraynumber_1_to_100 = Array.from(Array(100).keys()) // 0 to 100


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
                  <input class="file-input" placeholder = " عکس را وارد کنید url" type="text" /*required= "true"*/  onChange={this.handleChange}/>
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
                    {/*<InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                      //1/required = "true"
                      placeholder = "برند کفش"
                      val = {this.state.shoe_model}
                      _handleChange ={this.enterShoeModel}
                    />*/}
                    <div id="selectModel">
                    <DropdownSelectName 
                     name = "heoo"
                     
                            //1/required = "false"
                     lableName = "برند"
                     placeholder = "برند کفش"
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

            <div id="section3-SubmitInformation">
          
            <div id = "border-table" >
               <table id="table_inform">
               <thead>
               <tr>
               
            {/*<th>تعداد فروش</th>
            <th>هزینه فروش</th>
            <th>تاریخ فروش</th>*/}
            <th>هزینه خرید</th>
            <th>تاریخ خرید</th>
            <th>تعداد کفش</th>
            <th>سایز کفش</th>
          </tr>
                </thead>
                
                <tbody>
                    {
                        this.state.dynamicEditorRowsIds.map((item) => (
                         
                                 
                               
                          <tr>
                           
                            
                           
                   
                            {/*this.getDynamicEditableRow(item)*/}
                           
                         {/* <td>0</td>
                          <td>-</td>
                         <td>-</td>*/}
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
                      //required = "true"
                      //val = {this.state.shoe_cost_sale}
                      _handleChange ={e =>  this.enterShoeCostSale2(e,item)}
                    />
                          </td>
                          <td> 
                            <DatePicker parentCallback = {childData =>  this.handleCallbackenterShoePurchaseDate(childData,item) }/>
                          </td>
                          <td>
                            <DropdownSelect 
                            name = "helloo"
                            //1/required = "false"
                            lableName = "numbers"
                            placeholder = "تعداد کفش"
                            val = {arraynumber_1_to_100}
                            _handleChange = {event =>  this.handleChangeShoeCount(event,item) }
                            />
                          </td>
                          <td>
                            <DropdownSelect 
                            name = "heoo"
                            //1/required = "false"
                            lableName = "numbers"
                            placeholder = "سایز کفش"
                            val = {arraysize_1_to_100}
                            _handleChange = {event =>  this.handleChangeShoeSize(event,item) }
                            /> 
                          </td>
                        </tr>
                        ))
                    }
                </tbody>
        
              </table>
              
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
                  </div>*/}
            
              {/*<div id="section2-col2">
                <ul>
                  <li>
                    <label  ><b>: تاریخ خرید</b></label> 
                    
                  </li>
                  <li>
                    <label  ><b>: هزینه خرید</b></label>
                    <InputTextField 
                      name = "test"
                      id = "test"
                      type = "text"
                     //1/ required = "true"
                      val = {this.state.shoe_cost_buy}
                      _handleChange ={this.enterShoeCostBuy}
                    />
                  </li>
                </ul>
              </div>
                */}
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
