const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log(err));

// Booking Schema
const bookingSchema = new mongoose.Schema({

    customerName:{
        type:String,
        required:true
    },

    roomType:{
        type:String,
        required:true
    },

    guests:{
        type:Number,
        required:true,
        min:1
    },

    checkIn:{
        type:String,
        required:true
    },

    checkOut:{
        type:String,
        required:true
    }

});

const Booking = mongoose.model("Booking", bookingSchema);

// CREATE Booking

app.post("/bookings", async (req, res) => {

    try{

        const booking = new Booking(req.body);

        await booking.save();

        res.status(201).json({

            message:"Room Booked Successfully",

            booking

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});

// READ Bookings

app.get("/bookings", async (req, res) => {

    try{

        const bookings = await Booking.find();

        res.json(bookings);

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});

// UPDATE Booking

app.put("/bookings/:id", async (req, res) => {

    try{

        const booking = await Booking.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new:true,

                runValidators:true

            }

        );

        if(!booking){

            return res.status(404).json({

                message:"Booking Not Found"

            });

        }

        res.json({

            message:"Booking Updated Successfully",

            booking

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});

// DELETE Booking

app.delete("/bookings/:id", async (req, res) => {

    try{

        const booking = await Booking.findByIdAndDelete(req.params.id);

        if(!booking){

            return res.status(404).json({

                message:"Booking Not Found"

            });

        }

        res.json({

            message:"Booking Cancelled Successfully"

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});



