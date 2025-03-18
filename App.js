import Sa from './jaya';
import { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingBag } from "react-icons/md";

function App() {
  const [data, setData] = useState({
    search: ''
  });

  const change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <>
      <div className='title fixed-top shadow p-2 bg-light d-flex align-items-center justify-content-between'>
        <h2 className='d-flex align-items-center'>
          <MdOutlineShoppingBag style={{ width: "70px", height: "70px",color:'red'
           }} /> 
          <span className='ml-2'>SHOPKART</span>
        </h2>
        <form onSubmit={submit} className='d-flex align-items-center'>
          <input 
            type='text' 
            name='search' 
            placeholder='Search' 
            onChange={change} 
            className='form-control mr-2' 
            style={{ width: "300px" }} 
          />
          <button className="btn btn-outline-warning" type="submit">Submit</button>
          <Link to="http://localhost:3000/login/" className='btn btn-outline-success m-3'>Create Account</Link>
          <Link to="http://localhost:3000/create/" className='btn btn-outline-dark m-3'>Login</Link>
          <Link to="http://localhost:3000/cart" className='btn btn-outline-danger m-3'>Cart</Link>
        </form>
      </div>
      
    </>
  );
}

export default App;