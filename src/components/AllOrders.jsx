import React from 'react';
import OrderForm from './OrderForm';
import Order from './Order';


class AllOrders extends React.Component {

    state={
        newOrderNumber: "",
        newOrderPrice: ""
    }

    onChangeNumber = (e) => {
        this.setState({
            newOrderNumber: e.target.value
        })
    }

    onChangePrice = (e) => {
        this.setState({
            newOrderPrice: e.target.value
        })
    }

    onChangePayment = (e) => {
        this.setState({
            newOrderPayment: e.target.value
        })
    }

    render() {

        return (
          <div>
              <OrderForm 
              newOrderNumber={this.state.newOrderNumber} 
              newOrderPrice={this.state.newOrderPrice}
              newOrderPayment={this.state.newOrderPayment}
              onChangeNumber={this.onChangeNumber}
              onChangePrice={this.onChangePrice}
              onChangePayment={this.onChangePayment}
              />

              <div className="order-list">
                <Order />
              </div>

          </div>
        )
    }

}

export default AllOrders;