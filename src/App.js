import React, { useState, useEffect } from "react";
import axios from "axios";
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    for (const key in attachments) {
      if (attachments[key]) {
        data.append(key, attachments[key]);
      }
    }

    axios
      .post("https://machinebackend-un08.onrender.com/api/add-student", data)
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
      .get("https://machinebackend-un08.onrender.com/api/get-students")
      .then((response) => {
        console.log(response.data,"checking data")
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
      .delete(`https://machinebackend-un08.onrender.com/api/delete-student/${id}`)
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

  return (

<div>

      <h1>Add Machine Data</h1>


      <div>
      <h3>Part Details</h3>
      <div className="form-grid">
      <div className="form-group">
        <label htmlFor="input1">Part Number</label>
        <input
                  type="text"
                  name="partNumber"
                  value={formData.partNumber}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
        <label htmlFor="input2">Manufacturer</label>
        <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
        <label htmlFor="input3">Quantity</label>
        <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
      </div>
    </div>
      </div>


      <div>
      <h3>Supplier Details</h3>
      <div className="form-grid">
      <div className="form-group">
      <label>Supplier Name</label>
                <input
                  type="text"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
      <label>Quantity</label>
                <input
                  type="text"
                  name="supplierQuantity"
                  value={formData.supplierQuantity}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
      <label>Date Code</label>
                <input
                   type="date"
                   name="dateCode"
                   value={formData.dateCode}
                   onChange={handleInputChange}
                   required
                />
      </div>
      
      <div className="form-group">
      <label>Cost per Piece (USD)</label>
                <input
                  type="text"
                  name="costPerPieceUSD"
                  value={formData.costPerPieceUSD}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
      <label>Cost per Piece (INR)</label>
                <input
                    type="text"
                    name="costPerPieceINR"
                    value={formData.costPerPieceINR}
                    onChange={handleInputChange}
                    required
                />
      </div>
      <div className="form-group">
      <label>Total Cost (USD)</label>
                <input
                  ype="text"
                  name="totalCostUSD"
                  value={formData.totalCostUSD}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
      <label>Total Cost (INR)</label>
                <input
                 type="text"
                 name="totalCostINR"
                 value={formData.totalCostINR}
                 onChange={handleInputChange}
                 required
                />
      </div>
    </div>
   

    <h3>Customer Details</h3>
      <div className="form-grid">
      <div className="form-group">
      <label>Customer Name</label>
                <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                />
      </div>
      <div className="form-group">
      <label>Quantity </label>
                <input
                  type="text"
                  name="customerQuantity"
                  value={formData.customerQuantity}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
      <label>Invoice Number</label>
                <input
                 type="text"
                 name="invoiceNumber"
                 value={formData.invoiceNumber}
                 onChange={handleInputChange}
                 required
                />
      </div>
      
      <div className="form-group">
      <label>Cost per Piece (USD)</label>
                <input
                 type="text"
                 name="customerCostPerPieceUSD"
                 value={formData.customerCostPerPieceUSD}
                 onChange={handleInputChange}
                 required
                />
      </div>
      <div className="form-group">
      <label>Cost per Piece (INR)</label>
                <input
                 type="text"
                 name="customerCostPerPieceINR"
                 value={formData.customerCostPerPieceINR}
                 onChange={handleInputChange}
                 required
                />
      </div>
      <div className="form-group">
      <label>Total Cost (USD)</label>
                <input
                  type="text"
                  name="customerTotalCostUSD"
                  value={formData.customerTotalCostUSD}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
      <label>Total Cost (INR)</label>
                <input
                  type="text"
                  name="customerTotalCostINR"
                  value={formData.customerTotalCostINR}
                  onChange={handleInputChange}
                  required
                />
      </div>
    </div>

    <h3>Additional Details</h3>
      <div className="form-grid">
      <div className="form-group">
      <label>BOE</label>
                <input
                  type="text"
                  name="boe"
                  value={formData.boe}
                  onChange={handleInputChange}
                  required
                />
      </div>
      <div className="form-group">
      <label>Import Date</label>
                <input
                   type="date"
                   name="importDate"
                   value={formData.importDate}
                   onChange={handleInputChange}
                   required
                />
      </div>
      <div className="form-group">
      <label>Duty Payment</label>
                <input
                  type="text"
                  name="dutyPayment"
                  value={formData.dutyPayment}
                  onChange={handleInputChange}
                  required
                />
      </div>
      
     
    </div>


    <h3>Attachments</h3>
     <div className="form-grid">
     


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
              <div className="form-group">
                <div>
                <label>{field.split(/(?=[A-Z])/).join(" ").replace(/^\w/, (c) => c.toUpperCase())}</label>

                  <br/>
                  <input
                    type="file"
                    name={field}
                    accept=".xlsx,.pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ))}



     </div>

     <div>
      <h3>Remarks</h3>
      <textarea 
       type="textarea"
       name="remarks"
       value={formData.remarks}
       onChange={handleInputChange}
       
       />
      </div>
          <button onClick={handleSubmit} variant="primary" type="submit">
            Submit
          </button>
          <button variant="secondary" type="reset">
            Reset
          </button>
    


      </div>








     
      <h2>Search Machines</h2>
      <input
        type="text"
        placeholder="Search by part number"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <h2>List of Machines</h2>
      <table>
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Manufacturer</th>
            <th>Quantity</th>
            <th>Supplier Name</th>
            <th>Supplier Quantity</th>
            <th>Date Code</th>
            <th>Cost per Piece (USD)</th>
            <th>Cost per Piece (INR)</th>
            <th>Total Cost (USD)</th>
            <th>Total Cost (INR)</th>
            <th>Customer Name</th>
            <th>Customer Quantity</th>
            <th>Invoice Number</th>
            <th>Customer Cost per Piece (USD)</th>
            <th>Customer Cost per Piece (INR)</th>
            <th>Customer Total Cost (USD)</th>
            <th>Customer Total Cost (INR)</th>
            <th>BOE</th>
            <th>Import Date</th>
            <th>Duty Payment</th>
            <th>Remarks</th>
            <th>Attachments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.partNumber}</td>
              <td>{student.manufacturer}</td>
              <td>{student.quantity}</td>
              <td>{student.supplierName}</td>
              <td>{student.supplierQuantity}</td>
              <td>{student.dateCode}</td>
              <td>{student.costPerPieceUSD}</td>
              <td>{student.costPerPieceINR}</td>
              <td>{student.totalCostUSD}</td>
              <td>{student.totalCostINR}</td>
              <td>{student.customerName}</td>
              <td>{student.customerQuantity}</td>
              <td>{student.invoiceNumber}</td>
              <td>{student.customerCostPerPieceUSD}</td>
              <td>{student.customerCostPerPieceINR}</td>
              <td>{student.customerTotalCostUSD}</td>
              <td>{student.customerTotalCostINR}</td>
              <td>{student.boe}</td>
              <td>{student.importDate}</td>
              <td>{student.dutyPayment}</td>
              <td>{student.remarks}</td>
          <td>
                  <div className="r1">
        {student.attachments &&
          Object.entries(student.attachments).map(([key, value]) =>
            value ? (
              <div key={key} className="r2">
                <a
                  href={`https://machinebackend-un08.onrender.com/${value}`}
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
          </td>
          <td>
          <button variant="danger" onClick={() => handleDelete(student.id)}>
        Delete
      </button>
      
          </td>
             
              </tr>))}
              </tbody>
      </table>
    
      </div>)}
      export default App;