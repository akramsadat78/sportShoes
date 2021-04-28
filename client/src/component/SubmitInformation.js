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
    this.enterShoeColor = this.enterShoeColor.bind(this);
    this.enterShoeCostSale = this.enterShoeCostSale.bind(this);
    this.enterShoeDescription = this.enterShoeDescription.bind(this);

    this.state = {
      shoe_name: '',
      shoe_model: '',
      shoe_code: '',
      shoe_color: '',
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
      dynamic_profit : [],
      arraymodel:['Nike','Pama','Adidas','Reebook','Skechers','Asics','Puma']
    }
    
  }
  
  deletDynamicRow(){
    this.setState({
      dynamicEditorRowsIds:
      this.state.dynamicEditorRowsIds.filter(rowId =>
        rowId !== this.state.dynamicEditorRowsIds.length
      )
    });
  }

  addDynamicRow() {
    this.setState({
      dynamicEditorRowsIds: [...this.state.dynamicEditorRowsIds,this.state.dynamicEditorRowsIds.length+1 ]
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

  handleChangeArraymodel  = (event)  => {
    this.setState({
      shoe_model: event.currentTarget.value
    });
  }

  handleCallbackenterShoePurchaseDate = (childData,val) =>{
    let dynamic_purchase_date = [ ...this.state.dynamic_purchase_date ];
    dynamic_purchase_date[val-1] = childData ;
    this.setState({
      dynamic_purchase_date
    });
  }

  enterShoeCostSale(e,val) {
    let dynamic_cost_buy = [ ...this.state.dynamic_cost_buy ];
    dynamic_cost_buy[val-1] = e.target.value ;
    this.setState({
      dynamic_cost_buy
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

  enterShoeDescription(e) {
    this.setState({
      shoe_description: e.target.value
    });
  }
  
  handleChange(event) {
    this.setState({
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

    var arraysize_1_to_100 = Array.from(Array(60).keys()) // 0 to 100
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
                  <input class="file-input" placeholder = " عکس را وارد کنید url" type="text" required= "true"  onChange={this.handleChange}/>
                </div>
              </div>
            </div>

            <div id="section2-SubmitInformation">
              {/*کد کفش و رنگ کفش*/}
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
              {/* برند کفش و نام کفش*/}
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
                      _handleChange ={this.enterShoeName}
                    />
                  </li>
                </ul>
              </div>
            </div>
            {/*سایز و تعداد کفش و هزینه و قیمت خرید */}
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
                    {this.state.dynamicEditorRowsIds.map((item) => (
                      <tr>
                        <td>
                          <InputTextField 
                          name = "test"
                          id = "test"
                          type = "text"
                          required = "true"
                          _handleChange ={e =>  this.enterShoeCostSale(e,item)}
                          />
                        </td>
                        <td> 
                          <DatePicker parentCallback = {childData =>  this.handleCallbackenterShoePurchaseDate(childData,item) }/>
                        </td>
                        <td>
                          <DropdownSelect 
                          name = "helloo"
                          required = "true"
                          lableName = "numbers"
                          placeholder = "تعداد کفش"
                          val = {arraynumber_1_to_100}
                          _handleChange = {event =>  this.handleChangeShoeCount(event,item) }
                          />
                        </td>
                        <td>
                          <DropdownSelect 
                          name = "heoo"
                          required = "true"
                          lableName = "numbers"
                          placeholder = "سایز کفش"
                          val = {arraysize_1_to_100}
                          _handleChange = {event =>  this.handleChangeShoeSize(event,item) }
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
            {/*توضیحات */}
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
          {/*فرستادن فرم اطلاعات */}
          <div id = "sectionSubmit-SubmitInformation" >
            <button  type="submit" class = "button-SubmitInformation"> ثبت </button> 
          </div>
        </form>

      </div>
      );
  }
}
