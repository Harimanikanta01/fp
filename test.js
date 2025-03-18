const express = require("express");
const mongoose = require("mongoose");
const models1 = require("./model2");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const model3=require('./model3')
const url = "mongodb://127.0.0.1:27017/new";

try {
    mongoose.connect(url);
    console.log("Database is connected");
} catch (error) {
    console.log("Not connected to MongoDB database");
}

const am = express();
am.use(cors());
am.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
     }
});
const upload = multer({ storage: storage });


am.post("/valid", async (req, res) => {
    const { name, password } = req.body;

    const verify1 = new models1({ name, password });
    const wait = await models1.findOne({ name });
    try {
        if (wait) {
            console.log("User  already exists");
            res.status(400).json({ success: false, message: "User  already exists" });
        } else {
            await verify1.save();
            console.log("Successfully stored");
            res.status(201).json({ success: true, message: "User  created successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// User login route
am.post("/login", async (req, res) => {
    const { name, password } = req.body;

    const log = await models1.findOne({ name });

    if (log && log.password === password) {
        const token = jwt.sign({ name: log.name }, "hari123", { expiresIn: "1h" });
        res.status(200).json({ token });
        console.log(token);
    } else {
        res.status(400).json("Failed");
        console.log("Invalid credentials");
    }
});

const tokenizer = (req, res, next) => {
    const token = req.headers['Authorization']?.split(' ')[1];
    if (!token) {
        return res.status(400).json("No token provided!");
    } else {
        jwt.verify(token, "hari123", (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json("Unauthorized");
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

am.get('/cart1', tokenizer, (req, res) => {
    console.log("Entered successfully");
    res.status(200).json("This is a security URL");
});


am.post("/cart", async (req, res) => {
    const { name, img, price, discount } = req.body;
    console.log({ name, img, price, discount });
    const prod = new model3({ name, img, price, discount });
    try {
        await prod.save(); 
        console.log("Product sent to database");
        res.status(201).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


am.get("/products", async (req, res) => {
    try {
        const ct = await model3.find().lean(); 
        res.json(ct);
        console.log(ct);
    } catch (error) {
        console.log("Error fetching products", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


am.listen(9000, () => {
    console.log("Server running on port 9000");
});