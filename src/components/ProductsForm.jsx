import React from 'react';

class ProductsForm extends React.Component {

    onSubmitBtn = (e) => {

        const object = {
            name: this.props.newProductName,
            price: this.props.newProductPrice,
            orderId: this.props.orderId,
            checked: false,
            checkedColor: "seagreen"  
        }

        fetch('http://localhost:3001/products', {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
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
                <button type="submit" className="add-product_button" onClick={this.onSubmitBtn}>Dodaj</button>
            </div>
        )
    }

}

export default ProductsForm;