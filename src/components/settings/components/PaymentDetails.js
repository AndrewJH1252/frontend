import React, { useState } from 'react';

const PaymentDetails = ({
  paymentMethods = [], // Provide a default value as an empty array
  onUpdatePaymentMethods,
  billingAddress,
  onUpdateBillingAddress,
}) => {
  const [newPayment, setNewPayment] = useState({
    cardNumber: '',
    cardName: '',
    expirationDate: '',
    cvv: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({
      ...newPayment,
      [name]: value,
    });
  };

  const handleAddPayment = () => {
    const updatedPaymentMethods = [...paymentMethods, newPayment];
    onUpdatePaymentMethods(updatedPaymentMethods);
    setNewPayment({
      cardNumber: '',
      cardName: '',
      expirationDate: '',
      cvv: '',
    });
  };

  const handleEditBillingAddress = () => {
    setIsEditing(true);
  };

  const handleSaveBillingAddress = () => {
    onUpdateBillingAddress(billingAddress); // Implement this function to save the billing address
    setIsEditing(false);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Payment Details</h3>

      {/* Payment Methods */}
      <div className="mb-4">
        <h4 className="text-lg font-medium">Payment Methods</h4>
        <ul>
          {paymentMethods.map((method, index) => (
            <li key={index}>
              {method.cardName}, **** **** **** {method.cardNumber.slice(-4)}
            </li>
          ))}
        </ul>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="cardName"
              placeholder="Cardholder Name"
              value={newPayment.cardName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={newPayment.cardNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="expirationDate"
              placeholder="Expiration Date (MM/YY)"
              value={newPayment.expirationDate}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={newPayment.cvv}
              onChange={handleInputChange}
            />
            <button onClick={handleAddPayment}>Add Payment Method</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)}>Add Payment Method</button>
        )}
      </div>

      {/* Billing Address */}
      <div>
        <h4 className="text-lg font-medium">Billing Address</h4>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="billingAddress"
              placeholder="Billing Address"
              value={billingAddress}
              onChange={(e) => onUpdateBillingAddress(e.target.value)}
            />
            <button onClick={handleSaveBillingAddress}>Save Billing Address</button>
          </div>
        ) : (
          <div>
            <p>{billingAddress}</p>
            <button onClick={handleEditBillingAddress}>Edit Billing Address</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
