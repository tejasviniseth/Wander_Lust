const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const razorpay = require("../utils/razorpay");

router.post("/:id/book", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).send("Listing not found");

        const amountInPaise = listing.price * 100;

        const options = {
            amount: listing.price * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}_${listing._id.toString().slice(-5)}`
        };

        const order = await razorpay.orders.create(options);

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID,
            name: listing.title,
            description: "Stay Booking Payment",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to initiate booking");
    }
});

module.exports = router;