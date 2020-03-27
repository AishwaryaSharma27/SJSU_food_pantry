const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        productName:{
            type:String,
            required: true
        },
        quantity:{
            type:Number,
            required:true
        },
        zoneNumber:{
            type:String,
            required:true
        }
    });

module.exports = Products = mongoose.model("products", ProductSchema);