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

    onBtnClick = (e, index) => {

        this.setState((prevState) => ({
            detailsBox: !prevState.detailsBox,
            detailsId: index +1
        }))
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
                    onClick={(e) => this.onBtnClick(e, index)}
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
                        <Button color="secondary" className="order-paid">opłacone</Button>
                        <Button color="secondary" className="order-send">wysłane</Button>
                        <Button color="secondary" className="order-delete">usuń</Button>
                    </div>
                    {this.state.detailsBox && elem.id === this.state.detailsId ? <OrderDetails orderId={elem.id} /> : <div></div>}
                    </div>
                ))
                }
            </div>
        )
    }

}

export default Order;

