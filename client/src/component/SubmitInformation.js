import React, { Component } from 'react';
import '../css/SubmitInformation.css';
import InputTextField from './InputTextField';
import DropdownSelect from './DropdownSelect';
import DropdownSelectName from './DropdownSelectName';
import DatePicker from '../componentdate/DatePicker';
export default class SubmitInformation extends Component {
  constructor(props){
    super(props);

    this.handleImage = this.handleImage.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);

    this.enterShoeName = this.enterShoeName.bind(this);
    this.enterShoeColor = this.enterShoeColor.bind(this);
    this.enterShoeCostBuy = this.enterShoeCostBuy.bind(this);
    this.enterShoeDescription = this.enterShoeDescription.bind(this);

    this.state = {
      shoe_name: '',//shoe_name in DB
      shoe_model: '',//shoe_model in DB
      shoe_code: '',//shoe_code in DB
      shoe_color: '',//shoe_color in DB
      shoe_profit: '',//shoe_profit in DB
      shoe_image: '',//shoe_image in DB
      shoe_description: '',//shoe_description in DB
      arraymodel:['Nike','Pama','Adidas','Reebook','Skechers','Asics','Puma'],
      prev_code:'',//save previous code in DB 
      validation:0,//check if information is valid or not
      file: null,//save image
      dynamicRowsIds: [1],//row number of table
      dynamic_size: [],//keep size that is  selected
      dynamic_count: [],//keep count that is  selected
      dynamic_purchase_date: [],//keep purchase_date that is chosen
      dynamic_cost_buy: [],//keep cost_buy that is written
      dynamic_sale_date:[],//sale_date is empty 
      dynamic_cost_sale:[],//cost_sale is empty 
      dynamic_profit : [],//profit is empty 
      responseToPost: ''
      
    }
    
  }
  
  /* part enter image */
  handleImage(event) {
    this.setState({
      file : event.target.value
    })
  }

  /* part enter model,name,color */
  handleEnterArraymodel  = (event)  => {
    this.setState({
      shoe_model: event.currentTarget.value
    });
  }

  enterShoeName(e) {
    this.setState({
      shoe_name: e.target.value
    });
  }

  enterShoeColor(e) {
    this.setState({
      shoe_color: e.target.value
    });
  }

   /* part enter size,count,purchaseDate,costSale */
   enterShoeSize  = (event,val) => {
    let dynamic_size = [ ...this.state.dynamic_size ];
    dynamic_size[val-1] = event.currentTarget.value  ;
    this.setState({
      dynamic_size
    });
  }

  enterShoeCount  = (event,val)  => {
    let dynamic_count = [ ...this.state.dynamic_count ];
    dynamic_count[val-1] = event.currentTarget.value  ;
    this.setState({
      dynamic_count
    });
  }

  CallbackenterShoePurchaseDate = (childData,val) =>{
    let dynamic_purchase_date = [ ...this.state.dynamic_purchase_date ];
    dynamic_purchase_date[val-1] = childData ;
    this.setState({
      dynamic_purchase_date
    });
  }

  enterShoeCostBuy(e,val) {
    let dynamic_cost_buy = [ ...this.state.dynamic_cost_buy ];
    dynamic_cost_buy[val-1] = e.target.value ;
    this.setState({
      dynamic_cost_buy
    });
  }
  
  /*part enter description*/
  enterShoeDescription(e) {
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

  /* get data(previous code) from DB*/
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

  /* submit information */
  handleSubmit = async e => {
    e.preventDefault();
   
    const obj = {
      shoe_name: this.state.shoe_name,
      shoe_model: this.state.shoe_model,
      shoe_code: Math.floor(this.state.prev_code)+ 1,
      shoe_color: this.state.shoe_color,
      shoe_size:this.state.dynamic_size,
      shoe_count: this.state.dynamic_count,
      shoe_purchase_date:this.state.dynamic_purchase_date,
      shoe_sale_date:this.state.dynamic_sale_date,
      shoe_cost_buy: this.state.dynamic_cost_buy,
      shoe_cost_sale: this.state.dynamic_cost_sale,
      shoe_profit: this.state.dynamic_profit,
      shoe_image: this.state.file,
      shoe_description: this.state.shoe_description
    };

    alert("اطلاعات کفش وارد شد ")

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

    var arraysize_1_to_60 = Array.from(Array(60).keys()) // 1 to 60
    var arraynumber_1_to_100 = Array.from(Array(100).keys()) // 1 to 100

    //go to first page after enter information
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

            {/*part enter image*/}
            <div id="section1-SubmitInformation">
              <div id = "section1" >
                <div id = "border" >
                  <img id="image" src={this.state.file}/>
                </div>
              </div>
              <div id = "section2" >
                <div id = "border" >
                  <input class="file-input" placeholder = " عکس را وارد کنید url" type="text" required= "true"  onChange={this.handleImage}/>
                </div>
              </div>
            </div>

            <div id="section2-SubmitInformation">
              {/*part enter color and code*/}
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
                      _handleChange ={this.enterShoeColor}
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <label><b>: کد کفش</b></label> 
                    <label id="code">{Math.floor(this.state.prev_code)+ 1}</label>
                  </li>
                </ul>
              </div>
             {/*part enter name and model*/}
              <div id="section2-col2">
                <ul>
                  <li>
                    <label  ><b>: برند کفش</b></label>
                    <div id="selectModel">
                      <DropdownSelectName 
                      name = "heoo"
                      required = "true"
                      lableName = "برند"
                      placeholder = "برند کفش"
                      val = {this.state.arraymodel}
                      _handleChange = {event =>  this.handleEnterArraymodel(event) }
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
                      _handleChange ={this.enterShoeName}
                    />
                  </li>
                </ul>
              </div>
            </div>

            {/* part enter size,count,purcheseDate,costSale */}
            <div id="section3-SubmitInformation">
          
              <div id = "border-table" >
                <table id="table_inform">
                  <thead>
                    <tr>
                      <th>هزینه خرید</th>
                      <th>تاریخ خرید</th>
                      <th>تعداد کفش</th>
                      <th>سایز کفش</th>
                    </tr>
                  </thead>
                
                  <tbody>
                    {this.state.dynamicRowsIds.map((item) => (
                      <tr>
                        <td>
                          <InputTextField 
                          name = "test"
                          id = "test"
                          type = "number"
                          min="0"
                          required = "true"
                          _handleChange ={e =>  this.enterShoeCostBuy(e,item)}
                          />
                        </td>
                        <td> 
                          <DatePicker parentCallback = {childData =>  this.CallbackenterShoePurchaseDate(childData,item) }/>
                        </td>
                        <td>
                          <DropdownSelect 
                          name = "helloo"
                          required = "true"
                          lableName = "numbers"
                          placeholder = "تعداد کفش"
                          val = {arraynumber_1_to_100}
                          _handleChange = {event =>  this.enterShoeCount(event,item) }
                          />
                        </td>
                        <td>
                          <DropdownSelect 
                          name = "heoo"
                          required = "true"
                          lableName = "numbers"
                          placeholder = "سایز کفش"
                          val = {arraysize_1_to_60}
                          _handleChange = {event =>  this.enterShoeSize(event,item) }
                          /> 
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>     
              </div>

              <label onClick={ () => this.addDynamicRow() }><b>{"اضافه کردن سطر"}</b></label>
              <label onClick={ () => this.deletDynamicRow() }><b>{"پاک کردن سطر"}</b></label>

            </div>
            {/*enter description */}
            <div id="section4-SubmitInformation">
              <label  ><b>: توضیحات</b></label> 
              <InputTextField 
                name = "test"
                id = "test"
                type = "text"
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
