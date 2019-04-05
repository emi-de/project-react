import React from 'react';
import { Button } from 'reactstrap';
// eslint-disable-next-line
import order from './order.css';
import OrderDetails from './OrderDetials';


class Order extends React.Component {

    state={
        orders: [],
        detailsBox: false,
        detailsId: ""
    }

    componentDidMount() {

        fetch('http://localhost:3001/orders').then(response => response.json()).then( data => {
            this.setState({
                orders: data
            })
        })
    }

    onBtnNumber = (e, index) => {

        this.setState((prevState) => ({
            detailsBox: !prevState.detailsBox,
            detailsId: index +1
        }))
    }

    onBtnPaid = (e, index) => {

        let orderId = index +1;
        let object = {
            orderPaid: !this.state.orders[index].orderPaid
        }

        fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

        window.location.reload();
    }
    
    onBtnSend = (e, index) => {

        let orderId = this.state.orders[index].id;
        let object = {
            orderSend: !this.state.orders[index].orderSend
        }

        fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

        window.location.reload();
    }

    onBtnDelete = (e, index) => {

        let orderId = this.state.orders[index].id;

        if (window.confirm("Potwierdź usunięcie zamówienia")) {

        fetch(`http://localhost:3001/orders/${orderId}`, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
    }

        window.location.reload();
    }

    render() {

    let ordersList = this.state.orders;
        
        return (
            <div>
                {ordersList.map((elem, index) => (
                <div className="order-item" key={elem.id}>
                    <Button 
                    color="success" 
                    className="order-number"
                    onClick={(e) => this.onBtnNumber(e, index)}
                    >{elem.number}
                    </Button>
                    <p className="order-price">{elem.price}</p>
                    <p className="order-payment">{elem.payment}</p>
                    <div className="order-info">
                        <Button 
                        color="secondary" 
                        className="order-rw"
                        style={{backgroundColor: elem.productsAreChecked ? "seagreen" : ""}}
                        >przygotowane
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
                    {this.state.detailsBox && elem.id === this.state.detailsId ? <OrderDetails orderId={elem.id} orderPrice={elem.price} /> : <div></div>}
                    </div>
                ))
                }
            </div>
        )
    }

}

export default Order;

