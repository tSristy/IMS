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
    <div className="container">
      <div className="card">
        <h1>Transaction Master</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="docNo">Doc No:</label>
              <input type="text" id="docNo" name="docNo" value={docNo} onChange={handleDocNoChange} />
            </div>

            <div className="form-col">
              <label htmlFor="refNo">Ref No:</label>
              <input type="text" id="refNo" name="refNo" value={refNo} onChange={handleRefNoChange} />
            </div>
            <div className="form-col">
              <label htmlFor="mvtDate">MVT Date:</label>
              <input type="date" id="mvtDate" name="mvtDate" value={mvtDate} onChange={handleMvtDateChange} />
            </div>
            <div className="form-col">
              <label htmlFor="mvtType">MVT Type:</label>
              <select id="mvtType" name="mvtType" value={mvtType} onChange={handleMvtTypeChange}>
                <option value="">Select Type</option>
                <option value="Receive">Receive</option>
                <option value="Issue">Issue</option>
                <option value="Damage">Damage</option>
              </select>
            </div>

            <div className="form-col">
              <label htmlFor="companyId">Company ID:</label>
              <input type="text" id="companyId" name="companyId" value={companyId} onChange={handleCompanyIdChange} />
            </div>
            <div className="form-col">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className="form-col">
              <label htmlFor="createdBy">Created By:</label>
              <input type="text" id="createdBy" name="createdBy" value={createdBy} onChange={handleCreatedByChange} />
            </div>
            <div className="form-col">
              <label htmlFor="updatedBy">Updated By:</label>
              <input type="text" id="updatedBy" name="updatedBy" value={updatedBy} onChange={handleUpdatedByChange} />
            </div>
          </div>
          
          <TransactionDetails quantity={quantity} onTransactionDetailsChange={handleTransactionDetailsChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionMaster;
