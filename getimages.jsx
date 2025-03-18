import React, { useEffect, useState } from "react";
import axios from 'axios';

function Get() {
    const [op, setOp] = useState([]); 
    const fetchImages = async () => {
        try {
            const response = await axios("http://localhost:2000/pro");
            setOp(response.data); 
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div>
            {op.map((product) => (
                <div key={product._id}> 
                    <img src={product.bannerimg} alt={product._id}/>
                </div>
            ))}
        </div>
    );
}

export default Get;