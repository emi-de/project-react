import React from 'react';
import ProductsForm from './ProductsForm';
import ProductDetails from './ProductDetails';

class OrderDetails extends React.Component {

    state={
        newProductName: "",
        newProductPrice: "",
        orderId: "",
        productList: []
        
    }

    componentDidMount() {

        fetch('http://localhost:3001/products').then(response => response.json()).then( data => {
            this.setState({
                productList: data
            })
        })
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
            <div>
                <ProductsForm
                orderId={this.props.orderId}
                newProductName={this.state.newProductName}
                newProductPrice={this.state.newProductPrice}
                orderPrice={this.props.orderPrice}
                onChangeName={this.onChangeName}
                onChangePrice={this.onChangePrice}
                 />
                <ProductDetails 
                orderId={this.props.orderId}
                productList={this.state.productList}
                />
                
            </div>
        )
  }
}

export default OrderDetails;