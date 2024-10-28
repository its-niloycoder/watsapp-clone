const express = require("express");
const WebSocket = require("ws");
const cookie = require("cookie");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
const wss = new WebSocket.Server({ server });

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");

app.use(require("cookie-parser")());

const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../static")));

let message_dictionary = [];

// WebSocket connection handling
wss.on("connection", (ws, req) => {
    console.log("New client connected");

    const myCookie = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const UserID = myCookie.UserID ? myCookie.UserID : "Anonymous";

    // Handle incoming messages from clients
    ws.on("message", (message) => {
        const msg = {
            UserID,
            TimeStamp: Date.now(),
            Message: message.toString()
        };

        if (msg.Message) {
            message_dictionary.push(msg);
        }

        console.log(message_dictionary);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message_dictionary));
            }
        });
    });

    // Handle client disconnect
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

// Route for login.js
app.get("/login.js", (req, res) => {
    res.render("login.ejs");
});

// Login route
app.post("/login", (req, res) => {
    const { UserID } = req.body;
    if (!UserID) {
        res.send("Sorry, an error occurred.");
    } else {
        res.cookie("UserID", UserID, {});
        res.redirect("/");
    }
});

// Logout route
app.get("/logout", (req, res) => {
    res.clearCookie("UserID");
    res.redirect("/");
});