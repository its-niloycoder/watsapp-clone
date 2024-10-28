import "./WhatsappSoloGroup.css"

import { useState, useEffect } from "react"

function WhatsappSoloGroup() {
    function getCookies() {
        const cookies = {};
        const allCookies = document.cookie.split('; ');

        allCookies.forEach(cookie => {
            const [key, value] = cookie.split('=');
            cookies[key] = decodeURIComponent(value);
        });

        return cookies;
    }

    const appStyles = {
        height: '100vh',
        // only this value is importent in this internal css and imporancy of vh unit
        margin: 0,
        // from external css
        backgroundImage: "url('image')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',  // Parallax effect
    };

    const [message, setMessage] = useState("")
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [nameing, setNameing] = useState("Anonmus");

    useEffect(() => {
        const cookies = getCookies();
        setNameing(cookies.UserID);
        // Create WebSocket connection when the component mounts
        const ws = new WebSocket('ws://localhost:3000'); // Ensure the port matches the server
        setSocket(ws);

        // Listen for messages from the server
        ws.onmessage = (event) => {
            setMessages(() => JSON.parse(event.data));
        };

        // Clean up the connection when the component unmounts
        return () => {
            ws.close();
        };
    }, []);

    // Send message to WebSocket server
    const sendMessage = () => {
        if (socket) {
            if (message) {
                socket.send(message);
            }
            setMessage(''); // Clear the input field
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents a newline in a text area
            sendMessage(); // Call send function
        }
    };

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }
    titleCase("I'm a little tea pot");

    return (
        <div style={appStyles}>
            <h2 style={{ textAlign: "center" }}>It's {titleCase(nameing)}</h2>



            {/* <h2 style={{textAlign: "center"}}>Messages</h2> */}
            {/* <div className="background-wrapper" style={{
                display: "inline-block"
            }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        textAlign: msg.UserID ==  nameing ? "right" : "left"
                    }} className="bg-primary text-dark rounded-pill px-2 py-1 m-1 border">{msg.UserID !=  nameing ? msg.UserID + ':' : ''} {msg.Message}</div>
                ))}
                {/* i think 18 is the best rather then py-1 *}
            </div> */}

            <div className="background-wrapper">
                <div className="scrollable-content">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-bubble ${msg.UserID === nameing ? "sent" : "received"}`}
                        >
                            {msg.UserID !== nameing ? `${titleCase(msg.UserID)}: ` : ""} {msg.Message}
                        </div>
                    ))}
                </div>
            </div>

            <div className="message-prompt-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type and press Enter"
                    onKeyDown={handleKeyDown}
                    className="message-input form-control"
                // style={{
                //     display: "flex",
                //     alignItems: "center"
                // }}
                />
            </div>
            {/* <button onClick={sendMessage}>Send</button> */}
        </div>
    )
}

export default WhatsappSoloGroup