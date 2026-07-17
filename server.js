require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/response", async (req, res) => {
    const { answer, date } = req.body;
        console.log("BOT TOKEN EXISTS:", !!process.env.BOT_TOKEN);
    console.log("CHAT ID:", process.env.CHAT_ID);
    console.log(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`);

    const message = `🎉 She responded!

Answer: ${answer}

Date: ${date}

Time: ${new Date().toLocaleString()}`;

    try {
        console.log(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`);
        await axios.post(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text: message,
            }
        );

        res.status(200).json({
            success: true,
            message: "Telegram message sent!"
        });

    } catch (err) {
        console.error("Telegram Error:");

        if (err.response) {
            console.log(err.response.data);
        } else {
            console.log(err.message);
        }

        res.status(500).json({
            success: false
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});