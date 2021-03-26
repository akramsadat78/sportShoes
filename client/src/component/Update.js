import React, { Component } from 'react';
import InputTextField from './InputTextField';
import axios from 'axios';

export default class Update extends Component {
    constructor(props){
        super(props);

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
            shoe_description: ''
        }
    }

    
  handl = async e => {
    e.preventDefault();
    alert("ssssssssss")
    const response = await fetch('/information', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const body = await response.json();

  
    body.map(index => {
      if ( (index.shoe_code == this.state.data) ){
        alert(index.shoe_name )
        alert(index.shoe_model )
        alert(index.shoe_image )
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
            shoe_description: index.shoe_description
          }) 
      }
     })
     

  };

      
    render() { 
        return(
            <div>
            <ul id="navbar">
              <li><a href="/first">کفش ورزشی</a></li>
              <li><a href="#">=></a></li>
              <li><a href="#">به روز رسانی </a></li>
            </ul>
    
            
            <form onSubmit={this.handl}>
              <div id="wrap">
    
                <div id="section1-SubmitInformation">
                  <div id = "section1" >
                    <div id = "border" >
                      <img id="image" src={this.state.shoe_image}/>
                    </div>
                  </div>
                  <div id = "section2" >
                    <div id = "border" >
                      {/*<input class="file-input" type="file"  onChange={this.handleChange}/>*/}
                      <input class="file-input" type="text" /*required= "true"*/  onChange={this.handleChange}/>
                    </div>
                  </div>
                </div>
    
                <div id="section2-SubmitInformation">
                  <div id="section2-col1">
                    <ul>
                      <li>
                        <label  ><b>: کد کفش</b></label> 
                        <InputTextField 
                          name = "test"
                          id = "test"
                          type = "text"
                          //required = "true"
                          placeholder = "کد کفش"
                          val = {this.state.shoe_code}
                          //_handleChange ={this.enterShoeCode}
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
                         // _handleChange ={this.enterShoeCount}
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
                         // _handleChange ={this.enterShoeModel}
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
                         // _handleChange ={this.enterShoeSize}
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
                         // required = "true"
                          placeholder = "نام کفش"
                          val = {this.state.shoe_name}
                         // _handleChange ={this.enterShoeName}
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
                          //_handleChange ={this.enterShoeColor}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
    
                <div id="section3-SubmitInformation">
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
                         // _handleChange ={this.enterShoeSaleDate}
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
                          //_handleChange ={this.enterShoeCostSale}
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
                         // required = "true"
                          val = {this.state.shoe_purchase_date}
                          //_handleChange ={this.enterShoePurchaseDate}
                        />
                      </li>
                      <li>
                        <label  ><b>: هزینه خرید</b></label>
                        <InputTextField 
                          name = "test"
                          id = "test"
                          type = "text"
                          //required = "true"
                          val = {this.state.shoe_cost_buy}
                         // _handleChange ={this.enterShoeCostBuy}
                        />
                      </li>
                      <li>
                        <label id="name-profit" ><b>: سود</b></label> 
                        <label id="answer"><b>??</b></label> 
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
                   // _handleChange ={this.enterShoeDescription}
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
/*
export default class Update extends Component {
  
    constructor(props){
        super(props);

        this.onChangeShoeName = this.onChangeShoeName.bind(this);
        this.onChangeShoeModel = this.onChangeShoeModel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            data: this.props.dataParentToChild,
            shoe_name: '',
            shoe_model: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/information/edit/'+this.state.data)
            .then(response => {
                this.setState({ 
                    shoe_name: response.data.shoe_name, 
                    shoe_model: response.data.shoe_model });
            })
            .catch(function (error) {
                console.log(error);
            })
        alert(this.state.shoe_name)
    }
  
    onChangeShoeName(e) {
        this.setState({
            shoe_name: e.target.value
        });
    }

    onChangeShoeModel(e) {
        this.setState({
            shoe_model: e.target.value
        })  
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
          shoe_name: this.state.shoe_name,
          shoe_model: this.state.shoe_model
        };

        axios.post('http://localhost:5000/information/update/'+this.state.data, obj)
            .then(res => console.log(res.data));
        
            this.props.history.push('/first');
    }

  render() {
    
  //  const {data} = this.state;
        return(
            <div style={{ marginTop: 10 }}>
            <h3 align="center">Update shoe</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>shoe Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.shoe_name}
                      onChange={this.onChangeShoeName}
                      />
                </div>
                <div className="form-group">
                    <label>shoe model : </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.shoe_model}
                      onChange={this.onChangeShoeModel}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>

            /*<div>
                <p>=================</p>
                {data}
            </div>
        )
  }
}
*/