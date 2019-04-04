import React from 'react';
// eslint-disable-next-line
import product from './product.css';



    
class ProductDetails extends React.Component {

    state = { 
        exchangeValue: ""
    }

    
    onBtnCheck = (e, index) => {
       
        let id = index +1;
        let objectP = {
            checked: !this.props.productList[index].checked,
        }

        fetch(`http://localhost:3001/products/${id}`, {
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

        console.log(checkedOrderProducts);
    }

    onBtnExchange = (e, index) => {
        this.setState((prevState) => ({
            exchangeForm: !prevState.exchangeForm
        }))

        //let id = index +1;
        


        // fetch(`http://localhost:3001/products/${id}`, {
        //     method : 'PATCH',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify()
        // })

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
                {this.state.exchangeForm && 
                <input 
                type="text" 
                value={this.state.exchangeValue}
                onChange={(e) => this.changeExchangeForm(e, index)}
                ></input>}
                <p className="product-price">{elem.price}</p>
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
                onClick={this.onBtnExchange}
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