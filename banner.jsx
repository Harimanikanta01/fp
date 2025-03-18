import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";

function Banner() {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchData = async () => {
        try {
            const response = await axios('http://127.0.0.1:8000/banner/');
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            }, 4000);

            return () => clearInterval(interval); 
        }
    }, [data]);

    const nextImage = () => {
        
 setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        
       
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    return (
        <div className="banner overflow-hidden">
            <div className="overflow-hidden flex-box">
                <Link to=""></Link>
                {data.length > 0 && (
                    <div>
                        <img 
                            src={data[currentIndex]?.img} 
                            alt={`Banner ${currentIndex}`} 
                            style={{ width: "100%", height: "360px", transform: 'translateX(0)' }} 
                            className="flex transition-transform ease-out duration-500" 
                        />
                        <button 
                            onClick={prevImage} 
                            style={{ position: 'absolute', left: '2%', top: '70%' }} 
                            className="rounded-circle shadow bg-white"
                        >
                            <ChevronLeft size="40" />
                        </button>
                        <button 
                            onClick={nextImage} 
                            style={{ position: 'absolute', right: '2%', top: '70%' }} 
                            className="rounded-circle shadow bg-white"
                        >
                            <ChevronRight size="40" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Banner;