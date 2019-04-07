import React from 'react';
// eslint-disable-next-line
import product from './productDetails.css';


    
class ProductDetails extends React.Component {


    onBtnCheck = async (e, index) => {
       
        let productId = this.props.productList[index].id;
        let orderId = this.props.productList[index].orderId;
        let object = {
            checked: !this.props.productList[index].checked,
        }

        
        await fetch(`http://localhost:3001/products/${productId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

        //await this.props.getChekedProducts(orderId);
        await this.props.getproductListFromDatabase();
    }


    onBtnReturn = async (e, index) => {

        let productId = this.props.productList[index].id;
        let orderId = this.props.productList[index].orderId;
        let productPrice = this.props.productList[index].price;
        let returnProduct = !this.props.productList[index].returnProduct
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
        await this.props.getAmountAfterReturn(orderId, productPrice, returnProduct);
        await this.props.getproductListFromDatabase();
        await this.props.getOrderListFromDatabase();
    }


    onBtnExchange = async (e, index) => {

        let productId = this.props.productList[index].id;
        let orderId = this.props.productList[index].orderId;
        let exchangeProduct = !this.props.productList[index].exchangeProduct;
        let amountDifference = "";
        let productName = "";
        let productPrice = "";

        if(!this.props.productList[index].exchangeProduct){

            productName = prompt("podaj nowy produkt")
            productPrice = prompt("podaj cenę")
            

            let object = {
                checked: false,
                exchangeProduct: !this.props.productList[index].exchangeProduct,
                exchangeProductName: productName,
                exchangeProductPrice: productPrice   
            }
            
            await fetch(`http://localhost:3001/products/${productId}`, {
                method : 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object)
            })

            amountDifference = (Number(this.props.productList[index].price.replace(/,/g, '.')) - Number(productPrice.replace(/,/g, '.'))).toFixed(2)

            this.props.getproductListFromDatabase(); 
        }

        if(this.props.productList[index].exchangeProduct){

            let object = {
                exchangeProduct: !this.props.productList[index].exchangeProduct,
                exchangeProductName: "",
                exchangeProductPrice: ""   
            }
            
            await fetch(`http://localhost:3001/products/${productId}`, {
                method : 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object)
            })

            amountDifference = (Number(productPrice.replace(/,/g, '.')) + Number(this.props.productList[index].price.replace(/,/g, '.'))).toFixed(2)

            this.props.getproductListFromDatabase();
        }

        await this.props.getAmountAfterExchange(orderId, amountDifference, exchangeProduct);
        await this.props.getproductListFromDatabase();
        await this.props.getOrderListFromDatabase();
    }



    render () {

        let product = this.props.productList.map((elem, index) => {  
    
            if(elem.orderId === this.props.orderId) {

             return <div className="product-box" key={index +1}>
                <div className="product-smallbox">
                    <div className="product-item">
                        <div 
                        className="product-name" 
                        style={{textDecoration: elem.exchangeProduct || elem.returnProduct ? "line-through" : "none"}}>{elem.name}
                        </div>

                        <div 
                        className="product-price" 
                        style={{textDecoration: elem.exchangeProduct || elem.returnProduct ? "line-through" : "none"}}>{parseInt(elem.price).toFixed(2).replace(/,/g, '.')} PLN
                        </div>
                    </div>
                    
                    <div className="product-exchange" style={{display: elem.exchangeProduct ? "block" : "none"}}>
                    <div className="product-item"> 
                        <div className="product-name">{elem.exchangeProduct ? elem.exchangeProductName : ""}  </div>
                        <div className="product-price">{elem.exchangeProduct ? elem.exchangeProductPrice.replace(/,/g, '.') : ""} PLN</div>
                    </div>
                    </div>
                </div>
                <div className="btn-group">
                    <button 
                    className="product-rw btn btn-light" 
                    onClick={(e) => this.onBtnCheck(e, index)}
                    style={{backgroundColor: elem.checked ? elem.checkedColor : ""}}
                    >
                    { elem.checked ? "odłożone" : "do odłożenia"}
                    </button>

                    <button 
                    className="product-return btn btn-light"
                    onClick={(e) => this.onBtnReturn(e, index)}
                    >zwrot
                    </button>

                    <button 
                    className="product-exchange btn btn-light"
                    onClick={(e) => this.onBtnExchange(e, index)}
                    >
                    wymiana
                    </button>
                </div>
                
            </div>  
            } else {
                return null;
            }
        })

        return product;    
  }
}

export default ProductDetails;