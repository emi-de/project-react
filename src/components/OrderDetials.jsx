import React from 'react';
import ProductsForm from './ProductsForm';
import ProductDetails from './ProductDetails';
// eslint-disable-next-line
import orderDetails from './orderDetails.css';

class OrderDetails extends React.Component {

    state={
        newProductName: "",
        newProductPrice: "",
        orderId: "",
        productList: this.props.productList
        
    }

    componentDidMount() {
        this.props.getproductListFromDatabase()
    }

    

    onChangeName = (e) => {
        this.setState({
            newProductName: e.target.value
        })
    }

    onChangePrice = (e) => {
        this.setState({
            newProductPrice: e.target.value
        })
    }


    render () {

        return (
            <div className="order-details">
                <ProductsForm
                orderId={this.props.orderId}
                newProductName={this.state.newProductName}
                newProductPrice={this.state.newProductPrice}
                orderPrice={this.props.orderPrice}
                onChangeName={this.onChangeName}
                onChangePrice={this.onChangePrice}
                getproductListFromDatabase={this.props.getproductListFromDatabase}
                getOrderListFromDatabase={this.props.getOrderListFromDatabase}
                 />
                <ProductDetails 
                orderId={this.props.orderId}
                productList={this.props.productList}
                returnAmount={this.props.returnAmount}
                getproductListFromDatabase={this.props.getproductListFromDatabase}
                getOrderListFromDatabase={this.props.getOrderListFromDatabase}
                getChekedProducts={this.props.getChekedProducts}
                getAmountAfterReturn={this.props.getAmountAfterReturn}
                getAmountAfterExchange={this.props.getAmountAfterExchange}
                />
                
            </div>
        )
  }
}

export default OrderDetails;