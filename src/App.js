import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col ,Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; 

function App() {
  const [formData, setFormData] = useState({
    partNumber: "",
    manufacturer: "",
    quantity: "",
    supplierName: "",
    supplierQuantity: "",
    dateCode: "",
    costPerPieceUSD: "",
    costPerPieceINR: "",
    totalCostUSD: "",
    totalCostINR: "",
    customerName: "",
    customerQuantity: "",
    invoiceNumber: "",
    customerCostPerPieceUSD: "",
    customerCostPerPieceINR: "",
    customerTotalCostUSD: "",
    customerTotalCostINR: "",
    boe: "",
    importDate: "",
    dutyPayment: "",
    remarks: "",
    supplierPI: '',
    supplierInvoice:  '',
    outwardRemittance:  '',
    boeAttachment:  '',
    customerInvoice:  '',
    customerPO:  '',
    testReport:  '',
    customerPaymentDetails:  '',
    exportShipmentBill:  '',
    airwayBill:  '',
    partPhoto:  '',
  });

  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [attachments, setAttachments] = useState({});
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setAttachments((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }

    const attachmentFields = [
      "supplierPI",
      "supplierInvoice",
      "outwardRemittance",
      "boeAttachment",
      "customerInvoice",
      "customerPO",
      "testReport",
      "customerPaymentDetails",
      "exportShipmentBill",
      "airwayBill",
      "partPhoto",
    ];
  

    axios
      .post("http://localhost:3001/api/add-student", data)
      .then((response) => {
        alert(response.data.message || "Data submitted successfully");
        setFormData({
          partNumber: "",
          manufacturer: "",
          quantity: "",
          supplierName: "",
          supplierQuantity: "",
          dateCode: "",
          costPerPieceUSD: "",
          costPerPieceINR: "",
          totalCostUSD: "",
          totalCostINR: "",
          customerName: "",
          customerQuantity: "",
          invoiceNumber: "",
          customerCostPerPieceUSD: "",
          customerCostPerPieceINR: "",
          customerTotalCostUSD: "",
          customerTotalCostINR: "",
          boe: "",
          importDate: "",
          dutyPayment: "",
          remarks: "",
          supplierPI: null,
          supplierInvoice: null,
          outwardRemittance: null,
          boeAttachment: null,
          customerInvoice: null,
          customerPO: null,
          testReport: null,
          customerPaymentDetails: null,
          exportShipmentBill: null,
          airwayBill: null,
          partPhoto: null,
        });
        fetchStudents(); 
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("There was an error submitting the data.");
      });
  };

  const fetchStudents = () => {
    axios
      .get("http://localhost:3001/api/get-students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        alert("There was an error fetching the data.");
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/delete-student/${id}`)
      .then((response) => {
        alert(response.data.message || "Data deleted successfully");
        fetchStudents(); 
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("There was an error deleting the data.");
      });
  };

  const filteredStudents = students.filter((student) =>
    student.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );








const columns = [
  { dataField: "partNumber", text: "Part Number" },
  { dataField: "manufacturer", text: "Manufacturer" },
  { dataField: "quantity", text: "Quantity" },
  { dataField: "supplierName", text: "Supplier Name" },
  { dataField: "supplierQuantity", text: "Supplier Quantity" },
  { dataField: "dateCode", text: "Date Code" },
  { dataField: "costPerPieceUSD", text: "Cost per Piece (USD)" },
  { dataField: "costPerPieceINR", text: "Cost per Piece (INR)" },
  { dataField: "totalCostUSD", text: "Total Cost (USD)" },
  { dataField: "totalCostINR", text: "Total Cost (INR)" },
  { dataField: "customerName", text: "Customer Name" },
  { dataField: "customerQuantity", text: "Customer Quantity" },
  { dataField: "invoiceNumber", text: "Invoice Number" },
  { dataField: "customerCostPerPieceUSD", text: "Customer Cost per Piece (USD)" },
  { dataField: "customerCostPerPieceINR", text: "Customer Cost per Piece (INR)" },
  { dataField: "customerTotalCostUSD", text: "Customer Total Cost (USD)" },
  { dataField: "customerTotalCostINR", text: "Customer Total Cost (INR)" },
  { dataField: "boe", text: "BOE" },
  { dataField: "importDate", text: "Import Date" },
  { dataField: "dutyPayment", text: "Duty Payment" },
  { dataField: "remarks", text: "Remarks" },
  {
    dataField: "attachments",
    text: "Attachments",
    text:
    <div>
       Attachments
       <div className="rt1">
           <div className="rt2">
           Supplier PI
           </div>
           <div className="rt2">
           Supplier Invoice
           </div>
           <div className="rt2">
           Outward Remittance
           </div>
           <div className="rt2">
           Boe Attachment
           </div>
           <div className="rt2">
           Customer Invoice
           </div>
           <div className="rt2">
           Customer PO
           </div>
           <div className="rt2">
           Test Report

           </div>
           <div className="rt2">
           Customer Payment Details
           </div>
           <div className="rt2">
           Export Shipment Bill
           </div>
           <div className="rt2">
           Airway Bill
           </div>
           <div className="rt2">
           Part Photo
           </div>        
 </div>
    </div>,

    
    formatter: (cell, row) => (
      <div className="r1">
        {row.attachments &&
          Object.entries(row.attachments).map(([key, value]) =>
            value ? (
              <div key={key} className="r2">
                <a
                  href={`http://localhost:3001/${value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {key.split(/(?=[A-Z])/).join(" ")}
                </a>
              </div>
            ) : null
          )}
      </div>
    ),
    headerStyle: { textAlign: 'center' },
  },
  {
    dataField: "actions",
    text: "Actions",
    formatter: (cell, row) => (
      <Button variant="danger" onClick={() => handleDelete(row.id)}>
        Delete
      </Button>
    ),
  },
];


  return (
    <Container className="container">
      <div className="form-container">
        <h1>Add Machine Data</h1>
        <Form onSubmit={handleSubmit}>
        {/* Part Details */}
          <h3>Part Details</h3>
          <div className="row">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Part Number</Form.Label>
                <Form.Control
                  type="text"
                  name="partNumber"
                  value={formData.partNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

{/* Supplier Details */}
          <h3>Supplier Details</h3>
          <div className="row">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control
                  type="text"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="supplierQuantity"
                  value={formData.supplierQuantity}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Date Code</Form.Label>
                <Form.Control
                  type="date"
                  name="dateCode"
                  value={formData.dateCode}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Cost per Piece (USD)</Form.Label>
                <Form.Control
                  type="text"
                  name="costPerPieceUSD"
                  value={formData.costPerPieceUSD}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Cost per Piece (INR)</Form.Label>
                <Form.Control
                  type="text"
                  name="costPerPieceINR"
                  value={formData.costPerPieceINR}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Total Cost (USD)</Form.Label>
                <Form.Control
                  type="text"
                  name="totalCostUSD"
                  value={formData.totalCostUSD}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Total Cost (INR)</Form.Label>
                <Form.Control
                  type="text"
                  name="totalCostINR"
                  value={formData.totalCostINR}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <h3>Customer Details</h3>

          <div className="row">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="customerQuantity"
                  value={formData.customerQuantity}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Invoice Number</Form.Label>
                <Form.Control
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Cost per Piece (USD)</Form.Label>
                <Form.Control
                  type="text"
                  name="customerCostPerPieceUSD"
                  value={formData.customerCostPerPieceUSD}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Cost per Piece (INR)</Form.Label>
                <Form.Control
                  type="text"
                  name="customerCostPerPieceINR"
                  value={formData.customerCostPerPieceINR}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Total Cost (USD)</Form.Label>
                <Form.Control
                  type="text"
                  name="customerTotalCostUSD"
                  value={formData.customerTotalCostUSD}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Total Cost (INR)</Form.Label>
                <Form.Control
                  type="text"
                  name="customerTotalCostINR"
                  value={formData.customerTotalCostINR}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <h3>Additional Details</h3>

          <div className="row">
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>BOE</Form.Label>
                <Form.Control
                  type="text"
                  name="boe"
                  value={formData.boe}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Import Date</Form.Label>
                <Form.Control
                  type="date"
                  name="importDate"
                  value={formData.importDate}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label>Duty Payment</Form.Label>
                <Form.Control
                  type="text"
                  name="dutyPayment"
                  value={formData.dutyPayment}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <h3>Attachments</h3>
           <Container>
           <Row>
            {[
              "supplierPI",
              "supplierInvoice",
              "outwardRemittance",
              "boeAttachment",
              "customerInvoice",
              "customerPO",
              "testReport",
              "customerPaymentDetails",
              "exportShipmentBill",
              "airwayBill",
              "partPhoto",
            ].map((field) => (
            
              <Col sm={4} key={field}>
                <Form.Group>
                  <Form.Label>{field.split(/(?=[A-Z])/).join(" ")}</Form.Label>
                  <Form.Control
                    type="file"
                    name={field}
                    accept=".xlsx,.pdf"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Container>

          <Form.Group>
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="black" type="reset">
          Reset
          </Button>
        </Form>
      </div>

      <h2 className="mac">Search Machines</h2>
      <Form.Control
        type="text"
        placeholder="Search by part number"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <h2 className="mac">List of Machiness</h2>
      <BootstrapTable
        keyField="id"
        data={filteredStudents}
        columns={columns}
        pagination={paginationFactory()}
        bordered={true}
        striped={true}
      />
    </Container>
  );
}

export default App;
