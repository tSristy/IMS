import React, { useState, useEffect } from 'react';
// import './styles.css';

const TransactionDetails = ({ quantity, onTransactionDetailsChange }) => {
  const [productIds, setProductIds] = useState([]);
  const [transactionIds, setTransactionIds] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchProductIds();
    fetchTransactionIds();
  }, []);

  useEffect(() => {
    // Update formData when quantity change
    setFormData(Array.from({ length: quantity }, () => ({
      transactionId: '',
      productId: '',
      unitPrice: '',
      totalPrice: '',
      serialNo: '',
      warranty: '',
      storeFromId: '',
      storeToId: '',
      createdBy: '',
      updatedBy: ''
    })));
  }, [quantity]);

  const fetchProductIds = async () => {
    try {
      const response = await fetch('http://localhost:4321/products');
      const data = await response.json();
      const ids = data.map(product => product.Product_Id);
      setProductIds(ids);
    } catch (error) {
      console.error('Error fetching product IDs:', error);
    }
  };

  const fetchTransactionIds = async () => {
    try {
      const response = await fetch('http://localhost:4321/transaction_master');
      if (response.ok) {
        const data = await response.json();
        setTransactionIds(data); 
      } else {
        console.error('Failed to fetch transaction IDs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching transaction IDs:', error);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index][name] = value;
      return updatedFormData;
    });

    // Pass the datat
    onTransactionDetailsChange([...formData]);
}

  const renderTransactionDetailsForms = () => {
    return formData.map((data, index) => (
      <div className="card transaction-details" key={index}>
        <h2>Transaction Details {index + 1}</h2>
        <form className="form">
          <div className="form-row">
            <div className="form-col">
              <label htmlFor={`transactionId${index}`}>Transaction:</label>
              <select 
                id={`transactionId${index}`} 
                name={`transactionId`} 
                value={data.transactionId} 
                onChange={e => handleChange(e, index)}
              >
                <option value="">Select ID</option>
                {transactionIds.map((id, idx) => (
                  <option key={idx} value={id}>{id}</option>
                ))}
              </select>
            </div>

            <div className="form-col">
              <label htmlFor={`productId${index}`}>Product:</label>
              <select 
                id={`productId${index}`} 
                name={`productId`} 
                value={data.productId} 
                onChange={e => handleChange(e, index)}
              >
                <option value="">Select ID</option>
                {productIds.map((id, idx) => (
                  <option key={idx} value={id}>{id}</option>
                ))}
              </select>
            </div>

            <div className="form-col">
              <label htmlFor={`unitPrice${index}`}>Unit Price:</label>
              <input 
                type="number" 
                id={`unitPrice${index}`} 
                name="unitPrice" 
                value={data.unitPrice} 
                onChange={e => handleChange(e, index)} 
              />
            </div>
            
            <div className="form-col">
              <label htmlFor={`totalPrice${index}`}>Total Price:</label>
              <input 
                type="number" 
                id={`totalPrice${index}`} 
                name="totalPrice" 
                value={data.totalPrice} 
                onChange={e => handleChange(e, index)} 
              />
            </div>
            <div className="form-col">
              <label htmlFor={`serialNo${index}`}>Serial No:</label>
              <input 
                type="text" 
                id={`serialNo${index}`} 
                name="serialNo" 
                value={data.serialNo}
                onChange={e => handleChange(e, index)} 
              />
            </div>
            <div className="form-col">
              <label htmlFor={`warranty${index}`}>Warranty:</label>
              <input 
                type="text" 
                id={`warranty${index}`} 
                name="warranty" 
                value={data.warranty} 
                onChange={e => handleChange(e, index)} 
              />
            </div>
            <div className="form-col">
              <label htmlFor={`storeFromId${index}`}>Store From:</label>
              <input 
                type="text" 
                id={`storeFromId${index}`} 
                name="storeFromId" 
                value={data.storeFromId} 
                onChange={e => handleChange(e, index)} 
              />
            </div>
            <div className="form-col">
              <label htmlFor={`storeToId${index}`}>Store To:</label>
              <input 
                type="text" 
                id={`storeToId${index}`} 
                name="storeToId" 
                value={data.storeToId} 
                onChange={e => handleChange(e, index)} 
              />
            </div>
            <div className="form-col">
              <label htmlFor={`createdBy${index}`}>Created By:</label>
              <input 
                type="text" 
                id={`createdBy${index}`} 
                name="createdBy" 
                value={data.createdBy} 
                onChange={e => handleChange(e, index)} 
              />
            </div>
            <div className="form-col">
              <label htmlFor={`updatedBy${index}`}>Updated By:</label>
              <input 
                type="text" 
                id={`updatedBy${index}`} 
                name="updatedBy" 
                value={data.updatedBy} 
                onChange={e => handleChange(e, index)} 
              />
            </div>
          </div>
        </form>
      </div>
    ));
  };

  return (
    <div className="container">
      {renderTransactionDetailsForms()}
    </div>
  );
};

export default TransactionDetails;
