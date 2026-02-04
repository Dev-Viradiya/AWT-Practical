const http = require("http");
const fs = require("fs");
const url = require("url");
const events = require("./events");

let sessionUser = null;

function serveFile(path, type, res) {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
    } else {
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    }
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname === "/style.css") {
    serveFile("./public/style.css", "text/css", res);
    return;
  }

  if (req.method === "GET" && parsed.pathname === "/") {
    serveFile("./pages/login.html", "text/html", res);
    return;
  }

  if (req.method === "POST" && parsed.pathname === "/login") {
    let body = "";
    req.on("data", c => body += c);
    req.on("end", () => {
      const data = new URLSearchParams(body);
      sessionUser = data.get("username");
      events.emit("login", sessionUser);
      res.writeHead(302, { Location: "/dashboard" });
      res.end();
    });
    return;
  }

  if (req.method === "GET" && parsed.pathname === "/dashboard") {
    if (!sessionUser) {
      res.writeHead(302, { Location: "/" });
      res.end();
      return;
    }

    fs.readFile("./pages/dashboard.html", "utf8", (err, page) => {
      page = page.replace("{{username}}", sessionUser);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(page);
    });
    return;
  }

  /* PURCHASE WITH ITEM NAME */
  if (req.method === "POST" && parsed.pathname === "/purchase") {
    let body = "";
    req.on("data", c => body += c);
    req.on("end", () => {
      const data = new URLSearchParams(body);
      const itemName = data.get("item");

      events.emit("purchase", sessionUser, itemName);

      res.writeHead(302, { Location: "/dashboard" });
      res.end();
    });
    return;
  }

  if (req.method === "POST" && parsed.pathname === "/update") {
    let body = "";
    req.on("data", c => body += c);
    req.on("end", () => {
      const data = new URLSearchParams(body);
      const newName = data.get("newname");
      events.emit("update", sessionUser, newName);
      sessionUser = newName;
      res.writeHead(302, { Location: "/dashboard" });
      res.end();
    });
    return;
  }

  if (req.method === "POST" && parsed.pathname === "/summary") {
    events.emit("summary");
    res.writeHead(302, { Location: "/dashboard" });
    res.end();
    return;
  }

  if (req.method === "POST" && parsed.pathname === "/logout") {
    events.emit("logout", sessionUser);
    sessionUser = null;
    res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(3002, () => {
  console.log("Server running at http://localhost:3002");
});
