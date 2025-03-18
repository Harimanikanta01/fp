
import axios from "axios";
import { useState,useEffect } from "react";
import './App.css';
function Discount(){
    const [data,setData]=useState([])

    const a=async()=>{
        const response=await axios("http://127.0.0.1:8000/discount/")
        setData(response.data)
    }
    
    
    useEffect(()=>{
  a()
    },[])
return(
    <div>
        <h3><b>Discount</b></h3>
    <div className="discount card ml-3">
        
      <div className="row fade-in-down">
{
    data.map((products)=>(
        <ul key={products.id}>
            <div className=" card md-2 mt-3">
        <img src={products.image}alt={products.id}style={{width:'355px',height:'250px'}}className="card-img-top  "></img>
        </div>
        </ul>
       
    ))
    
}
</div>
    </div>
    </div>  
    
)
}
export default Discount