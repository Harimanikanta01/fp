import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { IoRemoveCircleSharp } from "react-icons/io5";

function Car() {
    const [cart, newCart] = useState([]);

const [no,setNo]=useState(1)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:9000/products");
                newCart(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
       

        fetchProducts();
    }, []); 
   const totalprice=cart.reduce((total,item)=>total+item.price*no,0)
    const next=()=>{
        if(no>=5){
alert('max products reached')
        }
        else{
            setNo(no+1)
        }
        
    }
    const neg=()=>{
        if(no>0){
            setNo(no-1)
        }
        
    }
    
        const click=(carty)=>{
            console.log(carty)
    alert("product successfully buyed from cart")
        }

   
    

    return (
        <div>
           
            <ul>
            
                {cart.map((carty) => (
                
                    <div key={carty.id}className="card row-md-3 bg-white">
                         <h1 style={{position:"fixed",top:"0px",right:"3px"}}>Your Cart price:{totalprice}</h1>
                        <div className="card-body row md-5">
                        <img className="card-img"src={carty.img} alt={carty.name} style={{ width: "160px", height: "200px" }} />
                        </div>
                        <div className="card-body row md-2">
                        <h2 className=" card-title">{carty.name}</h2>
                        <h3>Price: ${carty.price}</h3></div>
                        <h3>Discount:{carty.discount}</h3>
                        <button style={{width:'60px',border:"0px",outline:'none'}} onClick={next}><IoMdAddCircle style={{backgroundColor:'white',color:'orange',width:'60px',height:'40px'}} /></button><h3 style={{color:'red',width:'70px',border:'2px solid black'}}>{no}</h3>
                        <button style={{width:'60px',border:"0px",outline:'none'}} onClick={neg}><IoRemoveCircleSharp style={{backgroundColor:'white',color:'orange',width:'60px',height:'40px'}}  /></button>
                        <button onClick={()=>click(carty)} className="btn btn-danger col-md-2 m-2">Buynow</button>
            
                    </div>
                ))}
                
            </ul>
            
        </div>
    );
}

export default Car;