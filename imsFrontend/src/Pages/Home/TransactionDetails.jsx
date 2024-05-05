import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

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

  const handleChange = (e, index, fieldName) => {
    const { value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index][fieldName] = value;
    setFormData(updatedFormData);

    // Pass updated data
    onTransactionDetailsChange(updatedFormData);
    
  }

  const renderTransactionDetailsForms = () => {
    return (
      <>
      <Container fluid style={{marginTop:'20px'}}>
        {formData.map((data, index) => (
          <Row key={index} className="justify-content-start mb-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Details {index + 1}</Card.Title>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId={`transactionId${index}`}>
                          <Form.Label>Transaction:</Form.Label>
                          <Form.Select
                            value={data.transactionId}
                            onChange={e => handleChange(e, index, 'transactionId')}
                          >
                            <option value="">Select ID</option>
                            {transactionIds.map((id, idx) => (
                              <option key={idx} value={id}>{id}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`productId${index}`}>
                          <Form.Label>Product:</Form.Label>
                          <Form.Select
                            value={data.productId}
                            onChange={e => handleChange(e, index, 'productId')}
                          >
                            <option value="">Select ID</option>
                            {productIds.map((id, idx) => (
                              <option key={idx} value={id}>{id}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`unitPrice${index}`}>
                          <Form.Label>Unit Price:</Form.Label>
                          <Form.Control
                            type="number"
                            value={data.unitPrice}
                            onChange={e => handleChange(e, index, 'unitPrice')}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`totalPrice${index}`}>
                          <Form.Label>Total Price:</Form.Label>
                          <Form.Control
                            type="number"
                            value={data.totalPrice}
                            onChange={e => handleChange(e, index, 'totalPrice')}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`serialNo${index}`}>
                          <Form.Label>Serial No:</Form.Label>
                          <Form.Control
                            type="text"
                            value={data.serialNo}
                            onChange={e => handleChange(e, index, 'serialNo')}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`warranty${index}`}>
                          <Form.Label>Warranty:</Form.Label>
                          <Form.Control
                            type="text"
                            value={data.warranty}
                            onChange={e => handleChange(e, index, 'warranty')}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`storeFromId${index}`}>
                          <Form.Label>Store From:</Form.Label>
                          <Form.Control
                            type="text"
                            value={data.storeFromId}
                            onChange={e => handleChange(e, index, 'storeFromId')}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`storeToId${index}`}>
                          <Form.Label>Store To:</Form.Label>
                          <Form.Control
                            type="text"
                            value={data.storeToId}
                            onChange={e => handleChange(e, index, 'storeToId')}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`createdBy${index}`}>
                          <Form.Label>Created By:</Form.Label>
                          <Form.Control
                            type="text"
                            value={data.createdBy}
                            onChange={e => handleChange(e, index, 'createdBy')}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId={`updatedBy${index}`}>
                          <Form.Label>Updated By:</Form.Label>
                          <Form.Control
                            type="text"
                            value={data.updatedBy}
                            onChange={e => handleChange(e, index, 'updatedBy')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </>
    );
  }

    return (
      <div className="container">
        {renderTransactionDetailsForms()}
      </div>
    );
  };

  export default TransactionDetails;
