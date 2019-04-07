import React from 'react';
// eslint-disable-next-line
import orderForm from './orderForm.css';

class OrderForm extends React.Component {
    
    onSubmitBtn = async (e) => {
       
        const object = {
            number: this.props.newOrderNumber,
            price: "",
            payment: this.props.newOrderPayment,
            text: "",
            productsAreChecked: false,
            orderPaid: false,
            orderSend: false   
        }

        await fetch('http://localhost:3001/orders', {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        }).then( resp => resp.json())
        .then( data => {
            console.log(data);
            console.log(object);
        })
            
    }

    render() {

        let paymentType = ["payU", "przelew", "pobranie-dpd", "pobranie-poczta", "pobranie-inpost", "płatność w sklepie"]

        return (
          <div className="order-form_box form-group">
            <form className="order-form ">
                <input 
                type="text" 
                id="new-order_number"
                className="form-control"
                value={this.props.newOrderNumber} 
                onChange={this.props.onChangeNumber}
                placeholder="Wpisz numer zamówienia"
                />
                <select 
                id="new-order_payment "
                className="form-control"
                style={{width: "auto"}}
                name="payment" 
                value={this.props.newOrderPayment}
                onChange={this.props.onChangePayment} >
                <option defaultValue>Wybierz płatność</option>
                    {paymentType.map((elem, index) => (
                        <option key={index +1} value={elem}>{elem}</option>
                    ))
                    }                    
                </select>
                <button 
                type="submit" 
                className="add-item_button btn btn-light btn-sm" 
                onClick={this.onSubmitBtn}> 
                Dodaj zamówienie 
                </button>
            </form>            
          </div>
        )
    }

}

export default OrderForm;