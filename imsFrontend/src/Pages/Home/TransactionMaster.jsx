import React, { useState } from 'react';
// import './styles.css';
import TransactionDetails from './TransactionDetails';

const TransactionMaster = () => {
  const [docNo, setDocNo] = useState('');
  const [refNo, setRefNo] = useState('');
  const [mvtDate, setMvtDate] = useState('');
  const [mvtType, setMvtType] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [createdBy, setCreatedBy] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState([]);

  const handleDocNoChange = (e) => {
    setDocNo(e.target.value);
  };

  const handleRefNoChange = (e) => {
    setRefNo(e.target.value);
  };

  const handleMvtDateChange = (e) => {
    setMvtDate(e.target.value);
  };

  const handleMvtTypeChange = (e) => {
    setMvtType(e.target.value);
  };

  const handleCompanyIdChange = (e) => {
    setCompanyId(parseInt(e.target.value));
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value) || 0;
    setQuantity(parsedValue);
  };

  const handleCreatedByChange = (e) => {
    setCreatedBy(e.target.value);
  };

  const handleUpdatedByChange = (e) => {
    setUpdatedBy(e.target.value);
  };


  const handleTransactionDetailsChange = (updatedFormData) => {
    // console.log("Transaction details changed:", updatedFormData);
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!docNo || !refNo || !mvtDate || !mvtType || !companyId || !quantity || !createdBy || !updatedBy) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
  
    try {
      const transactionDetails = formData.map(data => ({
        Transaction_Id: data.transactionId,
        Product_Id: data.productId,
        Unit_Price: data.unitPrice,
        Total_Price: data.totalPrice,
        Serial_No: data.serialNo,
        Warranty: data.warranty,
        Store_From_Id: data.storeFromId,
        Store_To_Id: data.storeToId,
        Created_By: data.createdBy,
        Modified_By: data.updatedBy
      }));
  
      const transactionData = {
        docNo,
        refNo,
        mvtDate,
        mvtType,
        companyId,
        quantity,
        createdBy,
        updatedBy,
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        transactionDetails: transactionDetails 
      };
  
  
      const response = await fetch('http://localhost:4321/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });
  
      if (response.ok) {
        // Reset form fields
        setDocNo('');
        setRefNo('');
        setMvtDate('');
        setMvtType('');
        setCompanyId('');
        setQuantity(1);
        setCreatedBy('');
        setUpdatedBy('');
  
        setErrorMessage('Form submitted successfully');
      } else {
        setErrorMessage('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setErrorMessage('Failed to submit form');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div className="card" style={{ marginRight: '20px', marginBottom: '20px', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ textAlign: 'center' }}>Transaction Master</h1>
        {errorMessage && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
        <form className="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="form-row" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px', alignItems: 'flex-start' }}>
            <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
              <label htmlFor="docNo" style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Doc No:</label>
              <input type="text" id="docNo" name="docNo" value={docNo} onChange={handleDocNoChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />
            </div>
            <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
              <label htmlFor="refNo" style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Ref No:</label>
              <input type="text" id="refNo" name="refNo" value={refNo} onChange={handleRefNoChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />
            </div>
            <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
              <label htmlFor="mvtDate" style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>MVT Date:</label>
              <input type="date" id="mvtDate" name="mvtDate" value={mvtDate} onChange={handleMvtDateChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />
            </div>
            <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
              <label htmlFor="mvtType" style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>MVT Type:</label>
              <select id="mvtType" name="mvtType" value={mvtType} onChange={handleMvtTypeChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}>
                <option value="">Select Type</option>
                <option value="Receive">Receive</option>
                <option value="Issue">Issue</option>
                <option value="Damage">Damage</option>
              </select>
            </div>
            <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
              <label htmlFor="companyId" style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Company ID:</label>
              <input type="text" id="companyId" name="companyId" value={companyId} onChange={handleCompanyIdChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />
            </div>
            <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
              <label htmlFor="quantity" style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Quantity:</label>
              <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />
            </div>
            <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
              <label htmlFor="createdBy" style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Created By:</label>
              <input type="text" id="createdBy" name="createdBy" value={createdBy} onChange={handleCreatedByChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />
            </div>
            <div className="form-col" style={{ flex: 1, maxWidth: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
              <label htmlFor="updatedBy" style={{ width: 'auto', marginBottom: '5px', fontWeight: 'bold' }}>Updated By:</label>
              <input type="text" id="updatedBy" name="updatedBy" value={updatedBy} onChange={handleUpdatedByChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />
            </div>
          </div>
          <TransactionDetails quantity={quantity} onTransactionDetailsChange={handleTransactionDetailsChange} />
          <button type="submit" style={{ width: '100%', padding: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    </div>
  );
};  

export default TransactionMaster;
