import { useState,useEffect } from "react";
import axios from 'axios'
import './App.css';
import { Link } from "react-router-dom";

function Circle(){
 const [data,setData]=useState([])

 const c = async () => {
    const response=await axios('http://127.0.0.1:8000/circle/')
    setData(response.data)
 }
 useEffect(()=>{
c()
 },[])
 

    return(
        
         <div className="circle mt-5 md-2">
            {data.map((product) => (
                <div key={product.id}>
                  <Link to={`/circle/${product.id}`}>
                    <img src={product.image} alt={product.text} class=" mt-4 mr-10 ml-5 rounded-circle"style={{width:"65px",height:"65px"}}/>
                    <p className="ml-5">{product.text}</p></Link> 
                </div>
            ))}
          
           
    
        </div>
        
        
    )
}
export default Circle