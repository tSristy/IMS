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
    return (
      <div className="container" style={{ maxWidth: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {formData.map((data, index) => (
          <div className="card transaction-details" key={index} style={{ marginRight: '20px', marginBottom: '20px', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Transaction Details {index + 1}</h2>
            <form className="form" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="form-row" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px', alignItems: 'flex-start' }}>
                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`transactionId${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Transaction:</label>
                  <select
                    id={`transactionId${index}`}
                    name={`transactionId`}
                    value={data.transactionId}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  >
                    <option value="">Select ID</option>
                    {transactionIds.map((id, idx) => (
                      <option key={idx} value={id}>{id}</option>
                    ))}
                  </select>
                </div>

                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`productId${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Product:</label>
                  <select
                    id={`productId${index}`}
                    name={`productId`}
                    value={data.productId}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  >
                    <option value="">Select ID</option>
                    {productIds.map((id, idx) => (
                      <option key={idx} value={id}>{id}</option>
                    ))}
                  </select>
                </div>

                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`unitPrice${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Unit Price:</label>
                  <input
                    type="number"
                    id={`unitPrice${index}`}
                    name="unitPrice"
                    value={data.unitPrice}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                </div>

                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`totalPrice${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Total Price:</label>
                  <input
                    type="number"
                    id={`totalPrice${index}`}
                    name="totalPrice"
                    value={data.totalPrice}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                </div>
                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`serialNo${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Serial No:</label>
                  <input
                    type="text"
                    id={`serialNo${index}`}
                    name="serialNo"
                    value={data.serialNo}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                </div>

                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`warranty${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Warranty:</label>
                  <input
                    type="text"
                    id={`warranty${index}`}
                    name="warranty"
                    value={data.warranty}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                </div>

                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`storeFromId${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Store From:</label>
                  <input
                    type="text"
                    id={`storeFromId${index}`}
                    name="storeFromId"
                    value={data.storeFromId}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                </div>

                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`storeToId${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Store To:</label>
                  <input
                    type="text"
                    id={`storeToId${index}`}
                    name="storeToId"
                    value={data.storeToId}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                </div>

                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`createdBy${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Created By:</label>
                  <input
                    type="text"
                    id={`createdBy${index}`}
                    name="createdBy"
                    value={data.createdBy}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                </div>

                <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                  <label htmlFor={`updatedBy${index}`} style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Updated By:</label>
                  <input
                    type="text"
                    id={`updatedBy${index}`}
                    name="updatedBy"
                    value={data.updatedBy}
                    onChange={e => handleChange(e, index)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
                  />
                </div>

              </div>
            </form>
          </div>
        ))}
      </div>
    );
  }

    return (
      <div className="container">
        {renderTransactionDetailsForms()}
      </div>
    );
  };

  export default TransactionDetails;
