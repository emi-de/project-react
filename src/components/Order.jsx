import React from 'react';
import { Button } from 'reactstrap';
// eslint-disable-next-line
import order from './order.css';
import OrderDetails from './OrderDetials';


class Order extends React.Component {

    state={
        orders: [],
        productList: [],
        detailsBox: false,
        detailsId: "",
        numberBtnColor: false
    }

    componentDidMount() {
        this.getOrderListFromDatabase();
        this.getproductListFromDatabase();
    }

    getOrderListFromDatabase = () => fetch('http://localhost:3001/orders').then(response => response.json()).then( data => {
        this.setState({
            orders: data
        })
    })

    getproductListFromDatabase = () => fetch('http://localhost:3001/products').then(response => response.json()).then( data => {
        this.setState({
            productList: data
        })
    })

    // getChekedProducts = async (id) => {

    //     let orderProducts = [];
    //     let checkedOrderProducts = [];
    //     let object = {};

    //     this.state.productList.map((elem) => {
    //         if(elem.orderId === id){
    //             orderProducts.push(elem);
    //         }
    //     })

    //     this.state.productList.map((elem) => {
    //         if(elem.orderId === id && elem.checked){
    //             checkedOrderProducts.push(elem);
    //         }
    //     })

    //     if(orderProducts.length === checkedOrderProducts.length && orderProducts.length > 0) {
    //             object = {
    //                productsAreChecked: true
    //            }
    //         } else {
    //             object = {
    //                  productsAreChecked: false
    //             }
    //      }

    //      await fetch(`http://localhost:3001/orders/${id}`, {
    //         method : 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //          body: JSON.stringify(object)
    //      })

    //      this.getOrderListFromDatabase();

    // }

    getChekedProducts = async (e, index) => {

        let orderId = this.state.orders[index].id;
        let object = {
            productsAreChecked: !this.state.orders[index].productsAreChecked
        }

        await fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

        await this.getOrderListFromDatabase();
    }



    getAmountAfterReturn = async (id, price, returnProduct) => {

        let orderPrice;

        this.state.orders.map((elem) => {
            if(elem.id === id && returnProduct){
                orderPrice = (Number(elem.price.replace(/,/g, '.')) - Number(price.replace(/,/g, '.'))).toFixed(2)
                
            
            } else if (elem.id === id && !returnProduct){
                orderPrice = (Number(elem.price.replace(/,/g, '.')) + Number(price.replace(/,/g, '.'))).toFixed(2)
            }
        })

        let object = {
            price: orderPrice
        }

        await fetch(`http://localhost:3001/orders/${id}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
             body: JSON.stringify(object)
         })

         await this.getOrderListFromDatabase();
    }

    getAmountAfterExchange = async (id, amountDifference, exchangeProduct) => {

        let orderPrice;

        this.state.orders.map((elem) => {
            if(elem.id === id && exchangeProduct){
                orderPrice = (Number(elem.price.replace(/,/g, '.')) - Number(amountDifference.replace(/,/g, '.'))).toFixed(2)
                this.getOrderListFromDatabase();
            
            } else if (elem.id === id && !exchangeProduct){
                orderPrice = (Number(elem.price.replace(/,/g, '.')) + Number(amountDifference.replace(/,/g, '.'))).toFixed(2)
                this.getOrderListFromDatabase();
            }
        })

        let object = {
            price: orderPrice
        }

        await fetch(`http://localhost:3001/orders/${id}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
             body: JSON.stringify(object)
         })
         await this.getOrderListFromDatabase();
    }


    onBtnNumber = (e, index) => {

        this.setState((prevState) => ({
            detailsBox: !prevState.detailsBox,
            detailsId: this.state.orders[index].id
        }))
    }

    onBtnPaid = async (e, index) => {

        let orderId = this.state.orders[index].id;
        let object = {
            orderPaid: !this.state.orders[index].orderPaid
        }

        await fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

        await this.getOrderListFromDatabase();
    }
    
    onBtnSend = async (e, index) => {

        let orderId = this.state.orders[index].id;
        let object = {
            orderSend: !this.state.orders[index].orderSend
        }

       await fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

        await this.getOrderListFromDatabase();
    }

    onBtnDelete = async (e, index) => {

        let orderId = this.state.orders[index].id;

        if (window.confirm("Potwierdź usunięcie zamówienia")) {

        await fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
         })
        }
        
        await this.getOrderListFromDatabase();
    }

    onTxtChange = async (e, index) => {
        let orderId = this.state.orders[index].id;
        let object = {
            text: e.target.value
        }

       await fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

        await this.getOrderListFromDatabase();

    }

    render() {

    let ordersList = this.state.orders;
        
        return (
            <div>
                {ordersList.map((elem, index) => (

                <div className="order-item" key={elem.id} >
                    <Button 
                    color="success"
                    className="order-number btn-lg"
                    onClick={(e) => this.onBtnNumber(e, index)}
                    >Nr: {elem.number}
                    </Button>
                    <div 
                    className="order-price">
                    Wartość zamówienia: {elem.price} PLN
                    </div>

                    <div 
                    className="order-payment">
                    Płatność: {elem.payment}
                    </div>

                    <div className="order-info" className="btn-group" role="group"  >
                        <Button 
                        color="secondary" 
                        className="order-rw"
                        onClick={(e) => this.getChekedProducts(e, index)}
                        style={{backgroundColor: elem.productsAreChecked ? "seagreen" : ""}}
                        >{elem.productsAreChecked ? "przygotowane" : "do przygotowania"}
                        </Button>
                        <Button 
                        color="secondary" 
                        className="order-paid"
                        onClick={(e) => this.onBtnPaid(e, index)}
                        style={{backgroundColor: elem.orderPaid ? "seagreen" : ""}}
                        > {elem.orderPaid ? "opłacone" : "nieopłacone"}
                        </Button>
                        <Button 
                        color="secondary" 
                        className="order-send"
                        onClick={(e) => this.onBtnSend(e, index)}
                        style={{backgroundColor: elem.orderSend ? "seagreen" : ""}}
                        >{elem.orderSend ? "wysłane" : "niewysłane"}
                        </Button>
                        <Button 
                        color="secondary" 
                        className="order-delete"
                        onClick={(e) => this.onBtnDelete(e, index)}
                        >usuń
                        </Button>
                    </div>
                    <div className="input-group order-textarea" style={{width: "60%"}}>
                        <div className="input-group-prepend">
                        <span className="input-group-text">Uwagi</span>
                    </div>
                    <textarea 
                    className="form-control" 
                    value={elem.text}
                    onChange={(e) => this.onTxtChange(e, index)}>
                    </textarea>
                    </div>

                    {this.state.detailsBox && elem.id === this.state.detailsId ? <OrderDetails 
                    orderId={elem.id} 
                    orderPrice={elem.price} 
                    returnAmount={elem.returnAmount} 
                    getOrderListFromDatabase={this.getOrderListFromDatabase} 
                    getproductListFromDatabase={this.getproductListFromDatabase} 
                    productList={this.state.productList}
                    getChekedProducts={this.getChekedProducts}
                    getAmountAfterReturn={this.getAmountAfterReturn}
                    getAmountAfterExchange={this.getAmountAfterExchange}
                     /> : <div></div>}
                    </div>
                ))
                }
            </div>
        )
    }

}

export default Order;

