import React from 'react';

class ProductsForm extends React.Component {

    onSubmitBtn = (e) => {

        const object = {
            name: this.props.newProductName,
            price: this.props.newProductPrice,
            orderId: this.props.orderId,
            checked: false,
            exchangeForm: false,
            exchangeValue: "",
            checkedColor: "seagreen"  
        }

        fetch('http://localhost:3001/products', {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        })

        let priceSum = (Number(this.props.newProductPrice.replace(/,/g, '.')) + Number(this.props.orderPrice.replace(/,/g, '.'))).toFixed(2)

        let newPrice = {
            price: priceSum
        }

        fetch(`http://localhost:3001/orders/${this.props.orderId}`, {
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPrice)
        })




        window.location.reload();
    }

    render () {



        return (
            <div className="add-product_form">
                <input 
                type="text"
                className="add-product_name"
                value={this.props.newProductName} 
                onChange={this.props.onChangeName}
                />
                <input 
                type="text" 
                className="add-product_price"
                value={this.props.newProductPrice}
                onChange={this.props.onChangePrice}
                />
                <button type="submit" className="add-product_button" onClick={this.onSubmitBtn}>Dodaj produkt</button>
            </div>
        )
    }

}

export default ProductsForm;