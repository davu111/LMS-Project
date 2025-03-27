const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const cors = require("cors");

const route = require("./src/routes");

app.use(cors());

const db = require("./src/config/db");
//Connect Db
db.connect();
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(morgan("combined"));

//Routes
route(app);

const server = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
}); 

// Đóng server khi nhận tín hiệu SIGINT hoặc SIGTERM
const closeServer = () => {
    console.log("Đang đóng server...");
    server.close(() => {
        console.log("Server đã đóng.");
        process.exit(0);
    });
};

// Bắt các tín hiệu để tự động đóng server
process.on("SIGINT", closeServer);
process.on("SIGTERM", closeServer);