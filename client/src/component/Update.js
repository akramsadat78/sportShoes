import React, { Component } from 'react';
import InputTextField from './InputTextField';
import '../css/Update.css';
export default class Update extends Component {
 
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.handleSubmit.bind(this);
    
        this.changeShoeName = this.changeShoeName.bind(this);
        this.changeShoeModel = this.changeShoeModel.bind(this);
        this.changeShoeCode = this.changeShoeCode.bind(this);
        this.changeShoeColor = this.changeShoeColor.bind(this);
        this.changeShoeSize = this.changeShoeSize.bind(this);
        this.changeShoeCount = this.changeShoeCount.bind(this);
    
        this.changeShoePurchaseDate = this.changeShoePurchaseDate.bind(this);
        this.changeShoeSaleDate = this.changeShoeSaleDate.bind(this);
        this.changeShoeCostBuy = this.changeShoeCostBuy.bind(this);
        this.changeShoeCostSale = this.changeShoeCostSale.bind(this);
        this.changeShoeProfit = this.changeShoeProfit.bind(this);
    
        this.changeShoeDescription = this.changeShoeDescription.bind(this);
        this.changeShoeImage = this.changeShoeImage.bind(this);

        this.state = {
            data: this.props.dataParentToChild,
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
            file: null,
            calculate_profit : 0,
            validation:0
        }
    }

    
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
  
  changeShoeSize(e) {
    this.setState({
      shoe_size: e.target.value
    });
  }
   
  changeShoeCount(e) {
    this.setState({
      shoe_count: e.target.value
    });
  }

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
                  this.setState({
                  shoe_name: index.shoe_name ,
                  shoe_model: index.shoe_model,
                  shoe_code: index.shoe_code,
                  shoe_color: index.shoe_color,
                  shoe_size: index.shoe_size,
                  shoe_count: index.shoe_count,
                  shoe_purchase_date: index.shoe_purchase_date,
                  shoe_sale_date: index.shoe_sale_date,
                  shoe_cost_buy: index.shoe_cost_buy,
                  shoe_cost_sale: index.shoe_cost_sale,
                  shoe_profit: index.shoe_profit,
                  shoe_image: index.shoe_image,
                  file:index.shoe_image,
                  calculate_profit : index.shoe_cost_sale-index.shoe_cost_buy,
                  shoe_description: index.shoe_description
             }) 
           }
      })
   })
  }
    
  handleSubmit = async e => {
    e.preventDefault();

    const obj = {
      shoe_name: this.state.shoe_name,
      shoe_model: this.state.shoe_model,
      shoe_code: this.state.shoe_code,
      shoe_color: this.state.shoe_color,
      shoe_size: this.state.shoe_size,
      shoe_count: this.state.shoe_count,
      shoe_purchase_date:this.state.shoe_purchase_date,
      shoe_sale_date:this.state.shoe_sale_date,
      shoe_cost_buy: this.state.shoe_cost_buy,
      shoe_cost_sale: this.state.shoe_cost_sale,
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

      if (this.state.validation == 1) {
        this.props.history.push('/first')
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
                        <label  ><b>: کد کفش</b></label> 
                        <InputTextField 
                          name = "test"
                          id = "test"
                          type = "text"
                          required = "true"
                          placeholder = "کد کفش"
                          val = {this.state.shoe_code}
                          _handleChange ={this.changeShoeCode}
                        />
                      </li>
                      <li>
                        <label  ><b>: تعداد کفش</b></label>
                        <InputTextField 
                          name = "test"
                          id = "test"
                          type = "text"
                          //required = "true"
                          placeholder = "تعداد کفش"
                          val = {this.state.shoe_count}
                          _handleChange ={this.changeShoeCount}
                        />
                      </li>
                    </ul>
                  </div>
                
                  <div id="section2-col2">
                    <ul>
                      <li>
                        <label  ><b>: مدل کفش</b></label>
                        <InputTextField 
                          name = "test"
                          id = "test"
                          type = "text"
                          //required = "true"
                          placeholder = "مدل کفش"
                          val = {this.state.shoe_model}
                          _handleChange ={this.changeShoeModel}
                        />
                      </li>
                      <li>
                        <label  ><b>: سایز کفش</b></label>
                        <InputTextField 
                          name = "test"
                          id = "test"
                          type = "text"
                          //required = "true"
                          placeholder = "سایز کفش"
                          val = {this.state.shoe_size}
                          _handleChange ={this.changeShoeSize}
                        />
                      </li>
                    </ul>
                  </div>
    
                  <div id="section2-col3">
                    <ul>
                      <li>
                        <label  ><b>: نام کفش</b></label>
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
                      <li>
                        <label  ><b>: رنگ کفش</b></label> 
                        <InputTextField 
                          name = "test"
                          id = "test"
                          type = "text"
                          //required = "true"
                          placeholder = "رنگ کفش"
                          val = {this.state.shoe_color}
                          _handleChange ={this.changeShoeColor}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
    
                <div id="section3-SubmitInformation_update">
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
                  </div>
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
