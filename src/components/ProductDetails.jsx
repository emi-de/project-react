import React from 'react';
// eslint-disable-next-line
import product from './product.css';



    
class ProductDetails extends React.Component {

    onBtnCheck = async (e, index) => {

        console.log(this.props.productList[index].checked);
       
        let productId = this.props.productList[index].id;
        let objectP = {
            checked: !this.props.productList[index].checked,
        }

        await fetch(`http://localhost:3001/products/${productId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectP)
        })


        let orderProducts = [];
        let checkedOrderProducts = [];
        let orderId = this.props.productList[index].orderId
        let objectO = {};

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

        

        //tutaj trzeba poprawić:

        if(orderProducts.length === checkedOrderProducts.length) {
            objectO = {
                productsAreChecked: true
            }
        } else {
            objectO = {
                productsAreChecked: false
            }
        }

        await fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectO)
        })

        await this.props.getproductListFromDatabase();
        await this.props.getOrderListFromDatabase();
    }



    onBtnReturn = async (e, index) => {

        let productId = this.props.productList[index].id;
        let objectP = {
            returnProduct: !this.props.productList[index].returnProduct
        }

        await fetch(`http://localhost:3001/products/${productId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectP)
        })

        let orderId = this.props.productList[index].orderId

        let objectO = {};

        if(this.props.productList[index].returnProduct) {
        objectO = {
            returnAmount: Number(this.props.returnAmount) + Number(this.props.productList[index].price.replace(/,/g, '.')),
            returnProducts: !this.props.productList[index].returnProduct
            }
        } else {
            objectO = {
                returnAmount: Number(this.props.returnAmount) - Number(this.props.productList[index].price.replace(/,/g, '.')),
                returnProducts: !this.props.productList[index].returnProduct
            }
        }

        await fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objectO)
        })

        this.props.getproductListFromDatabase();
        this.props.getOrderListFromDatabase();

    }


    onBtnExchange = (e, index) => {

        let productId = this.props.productList[index].id;
        let ProductName = prompt("podaj nowy produkt")
        let ProductPrice = prompt("podaj cenę")

        let object = {
            exchangeProduct: !this.props.productList[index].exchangeProduct,
            exchangeProductName: ProductName,
            exchangeProductPrice: ProductPrice   
        }
        
        fetch(`http://localhost:3001/products/${productId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })


    }



    render () {

        let product = this.props.productList.map((elem, index) => {  

            if(elem.orderId === this.props.orderId) {

             return <div className="product-item" key={index +1}>

                <div>
                <p 
                className="product-name" 
                style={{textDecoration: elem.exchangeProduct || elem.returnProduct ? "line-through" : "none"}}>{elem.name}
                </p>

                <p 
                className="product-price" 
                style={{textDecoration: elem.exchangeProduct || elem.returnProduct ? "line-through" : "none"}}>{parseInt(elem.price).toFixed(2).replace(/,/g, '.')} PLN
                </p>
                </div>

                <div className="product-exchange" style={{display: elem.exchangeProduct ? "block" : "none"}}>
                <p className="product-name">{elem.exchangeProduct ? elem.exchangeProductName : ""}  </p>
                <p className="product-price">{elem.exchangeProduct ? elem.exchangeProductPrice.replace(/,/g, '.') : ""} PLN</p>
                </div>

                <button 
                className="product-rw" 
                onClick={(e) => this.onBtnCheck(e, index)}
                style={{backgroundColor: elem.checked ? elem.checkedColor : ""}}
                >
                { elem.checked ? "odłożone" : "do odłożenia"}
                </button>

                <button 
                className="product-return"
                onClick={(e) => this.onBtnReturn(e, index)}
                >zwrot
                </button>

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