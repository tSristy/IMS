import React, { useState } from 'react';
import { Card, Form, Container, Row, Col, Button } from 'react-bootstrap';
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
    <>
    <Container fluid>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Transaction Master</Card.Title>
          {errorMessage && <div className="error-message" style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="docNo">
                  <Form.Label>Doc No:</Form.Label>
                  <Form.Control type="text" value={docNo} onChange={handleDocNoChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="refNo">
                  <Form.Label>Ref No:</Form.Label>
                  <Form.Control type="text" value={refNo} onChange={handleRefNoChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="mvtDate">
                  <Form.Label>MVT Date:</Form.Label>
                  <Form.Control type="date" value={mvtDate} onChange={handleMvtDateChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="mvtType">
                  <Form.Label>MVT Type:</Form.Label>
                  <Form.Select value={mvtType} onChange={handleMvtTypeChange}>
                    <option value="">Select Type</option>
                    <option value="Receive">Receive</option>
                    <option value="Issue">Issue</option>
                    <option value="Damage">Damage</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="companyId">
                  <Form.Label>Company ID:</Form.Label>
                  <Form.Control type="text" value={companyId} onChange={handleCompanyIdChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control type="number" value={quantity} onChange={handleQuantityChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="createdBy">
                  <Form.Label>Created By:</Form.Label>
                  <Form.Control type="text" value={createdBy} onChange={handleCreatedByChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="updatedBy">
                  <Form.Label>Updated By:</Form.Label>
                  <Form.Control type="text" value={updatedBy} onChange={handleUpdatedByChange} />
                </Form.Group>
              </Col>
            </Row>
            <TransactionDetails quantity={quantity} onTransactionDetailsChange={handleTransactionDetailsChange} />
            <Button type="submit" variant="primary" style={{ width: '100%' }}>Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};  

export default TransactionMaster;
