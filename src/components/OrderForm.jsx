import React from 'react';

class OrderForm extends React.Component {
    
    onSubmitBtn = async (e) => {
       
        const object = {
            number: this.props.newOrderNumber,
            price: this.props.newOrderPrice,
            payment: this.props.newOrderPayment,
            productsAreChecked: false     
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

        let paymentType = ["wybierz", "payU", "przelew", "pobranie-dpd", "pobranie-poczta", "pobranie-inpost", "płatność w sklepie"]

        return (
          <div>
            <form>
                <label>Numer zamówienia:</label>
                <input 
                type="text" 
                id="new-order_number" 
                value={this.props.newOrderNumber} 
                onChange={this.props.onChangeNumber}
                />
                <label>Kwota:</label>
                <input 
                type="text" 
                id="new-order_price" 
                value={this.props.newOrderPrice} 
                onChange={this.props.onChangePrice}
                />
                <select id="new-order_payment" 
                name="payment" 
                value={this.props.newOrderPayment}
                onChange={this.props.onChangePayment} >
                    {paymentType.map((elem, index) => (
                        <option key={index +1} value={elem}>{elem}</option>
                    ))
                    }                    
                </select>
                <button type="submit" className="add-item_button" onClick={this.onSubmitBtn}> dodaj zamówienie </button>
            </form>            
          </div>
        )
    }

}

export default OrderForm;