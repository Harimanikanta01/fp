const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model"); // Ensure this is the correct path to your model

const url = "mongodb://127.0.0.1:27017/new";
const m = express();
m.use(express.json());

mongoose.connect(url)
    .then(() => {
        console.log("connected");
    })
    .catch((error) => {
        console.log(error);
    });

m.get("/", (req, res) => {
    res.write("connected");
    res.end();
});

m.get("/products", async (req, res) => {
    try {
        const allProducts = await Product.find(); // Fetch all products from the database
        res.json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
});

m.post("/add", async (req, res) => {
    console.log("Request Body:", req.body); // Log the entire request body
    const { name, age } = req.body; // Destructure name and age
    if (!name || !age) {
        return res.status(400).json({ message: "Name and age are required." });
    }
    try {
        const newProduct = new Product({ name, age }); // Create a new product instance
        await newProduct.save(); // Save the product to the database
        return res.status(201).json(newProduct); // Return the newly created product
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error saving product" }); // Send error response
    }
});

m.get("/ret/:id", async(req, res) => {
    const newData =await Product.findById(req.params.id);
    return res.json(newData);
});
m.delete("/del/:id",async(req,res)=>{
    try{
    const deletei=await Product.findByIdAndDelete(req.params.id)
    console.log("succssfully deleted")
    }
    catch(error){
        console.log(error)
    }
},
m.put("/up/:id",async(req,res)=>{
    const {name,age}=req.body;
    try{
    const updateiw=await Product.findByIdAndUpdate(req.params.id,{name,age},{ new: true, runValidators: true })
    console.log("successfully updated")
    }
    catch(error){
        console.log(error)
    }
})
    
    
)

m.listen(3000, () => {
    console.log("server is running.....");
});
