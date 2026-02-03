const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();
const eventCount = { 
    login: 0, 
    logout: 0, 
    purchase: 0, 
    profileUpdate: 0 
};

eventEmitter.on("login", (user) => { 
    eventCount.login++; 
    console.log(`[EVENT] Login: ${user}`); 
});

eventEmitter.on("logout", (user) => { 
    eventCount.logout++; 
    console.log(`[EVENT] Logout: ${user}`); 
});

eventEmitter.on("purchase", (user, item) => { 
    eventCount.purchase++; 
    console.log(`[EVENT] Purchase: ${user} bought ${item}`); 
});

eventEmitter.on("profile", (user) => { 
    eventCount.profileUpdate++; 
    console.log(`[EVENT] Profile Update: ${user}`); 
});

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/emit") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");

        const type = url.searchParams.get("type");
        const user = url.searchParams.get("user") || "Guest";
        const item = url.searchParams.get("item") || "Item";

        eventEmitter.emit(type, user, item);

        return res.end(JSON.stringify({ 
            message: `Event ${type} triggered!`, 
            counts: eventCount 
        }));
    }

    let filePath = "." + url.pathname;
    if (filePath === "./") filePath = "./index.html"; 

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = { 
        ".html": "text/html", 
        ".js": "text/javascript", 
        ".css": "text/css" 
    };
    
    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "File Not Found" }));
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is live at: http://localhost:${PORT}`);
    console.log("Node.js is now serving your files and handling events.");
});