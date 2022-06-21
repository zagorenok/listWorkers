import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import data from './mock-data.json';

 const App = () => {
   const [workers, setWorkers] = useState(data);
   const [addFormData, setAddFormData] = useState({
     name: '',
     surname: '',
     department: '',
     salary: '',
   });
  
   const handleAddFormChange = (event) => {
     event.preventDefault();
     const fieldName = event.target.getAttribute('name');
     const fieldValue = event.target.value;
     const newFormData = { ...addFormData };
     newFormData[fieldName] = fieldValue;
     setAddFormData(newFormData);
   };

   const handleAddFormSubmit = (event) => {
     event.preventDefault();
     const newWorker = {
       id: nanoid(),
       name: addFormData.name,
       surname: addFormData.surname,
       department: addFormData.department,
       salary: addFormData.salary,
     };
     const newWorkers = [...workers, newWorker];
     setWorkers(newWorkers);
   };

   const sumSalaries = data.reduce((sum, value) => (sum + parseFloat(value.salary)), 0);
   const departmentIT = data.filter(el => el.department.includes('IT'));
   const sumIT = departmentIT.reduce((sum, value) => sum + parseFloat(value.salary), 0);
   const departmentSales = data.filter((el) => el.department.includes('Sales'));
   const sumSales = departmentSales.reduce((sum, value) => sum + parseFloat(value.salary), 0); 
   const departmentAdmin = data.filter((el) => el.department.includes('Administration'));
   const sumAdmin = departmentAdmin.reduce((sum, value) => sum + parseFloat(value.salary), 0);


   return (
     <div className="app-container">
       <table>
         <thead>
           <tr>
             <th>firstName</th>
             <th>lastName</th>
             <th>department</th>
             <th>salary</th>
           </tr>
         </thead>
         <tbody>
           {workers.map((worker) => (
             <tr>
               <td>{worker.name}</td>
               <td>{worker.surname}</td>
               <td>{worker.department}</td>
               <td>{worker.salary}</td>
             </tr>
           ))}
           <tr>
             <td colSpan="2"></td>
             <td>Summary</td>
             <td>{sumSalaries}USD</td>
           </tr>
           <tr>
             <td colSpan="2"></td>
             <td>IT</td>
             <td>{sumIT}USD</td>
           </tr>
           <tr>
             <td colSpan="2"></td>
             <td>Sales</td>
             <td>{sumSales}USD</td>
           </tr>
           <tr>
             <td colSpan="2"></td>
             <td>Administration</td>
             <td>{sumAdmin}USD</td>
           </tr>
         </tbody>
       </table>

       <h2>Add a worker</h2>
       <form onSubmit={handleAddFormSubmit}>
         <input
           type="text"
           name="name"
           required="required"
           placeholder="Enter a name..."
           onChange={handleAddFormChange}
         />
         <input
           type="text"
           name="surname"
           required="required"
           placeholder="Enter a surname..."
           onChange={handleAddFormChange}
         />
         <select name="department" onChange={handleAddFormChange}>
           <option value="IT">IT</option>
           <option value="Sales">Sales</option>
           <option value="Administration">Administration</option>
         </select>
         <input
           type="text"
           name="salary"
           required="required"
           placeholder="Salary"
           onChange={handleAddFormChange}
         />
         <button type="submit">Add</button>
       </form>
     </div>
   );
 };;

export default App;




