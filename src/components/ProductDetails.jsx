import React from 'react';
// eslint-disable-next-line
import product from './product.css';



    
class ProductDetails extends React.Component {

    state = { 
        exchangeValue: ""
    }

    
    onBtnCheck = (e, index) => {
       
        let productId = this.props.productList[index].id;
        let objectP = {
            checked: !this.props.productList[index].checked,
        }

        console.log(productId);

        fetch(`http://localhost:3001/products/${productId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectP)
        })

        let orderProducts = [];
        let checkedOrderProducts = [];
        let orderId = this.props.productList[index].orderId

        this.props.productList.map((elem) => {
            if(elem.orderId === orderId) {
                orderProducts.push(elem)
            }
        })

        this.props.productList.map((elem) => {
            if(elem.orderId === orderId && elem.checked) {
                checkedOrderProducts.push(elem)
            }
        })

        let objectO = {};

        if(orderProducts.length === checkedOrderProducts.length) {
            objectO = {
                productsAreChecked: true
            }
        } else {
            objectO = {
                productsAreChecked: false
            }
        }

        fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectO)
        })
    }


    onBtnExchange = (e, index) => {

        let productId = this.props.productList[index].id;

        let object = {
            exchangeForm: !this.props.productList[index].exchangeForm,
            exchangeValue: this.state.exchangeValue
        }
        
        fetch(`http://localhost:3001/products/${productId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

    }

    changeExchangeForm = (e) => {
        this.setState({
            exchangeValue: e.target.value
        })
    }


    render () {
    

        let product = this.props.productList.map((elem, index) => {  

            if(elem.orderId === this.props.orderId) {

             return <div className="product-item" key={index +1}>

                <p className="product-name">{elem.name}</p>

                {elem.exchangeForm && 
                <input 
                type="text" 
                value={this.state.exchangeValue}
                onChange={(e) => this.changeExchangeForm(e, index)}
                ></input>}

                <p className="product-price">{elem.price.replace(/,/g, '.')} zł</p>

                <button 
                className="product-rw" 
                onClick={(e) => this.onBtnCheck(e, index)}
                style={{backgroundColor: elem.checked ? elem.checkedColor : ""}}
                >
                odłożone
                </button>

                <button className="product-return">zwrot</button>

                <button 
                className="product-exchange"
                onClick={(e) => this.onBtnExchange(e, index)}
                >
                wymiana
                </button>
            </div>  
            } else {
                return null;
            }

        })

       
        return product;    
            
           
        
  }
}

export default ProductDetails;