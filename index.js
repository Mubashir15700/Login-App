const express = require('express');
require("dotenv").config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const noCache = require('nocache');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Connection = require('./database/db');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

app.set("port", process.env.PORT);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRETE,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));
app.use(noCache());

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
    res.render("404");
});

Connection();

app.listen(app.get("port"), () => {
    console.log(`Server started running on port ${process.env.PORT} `);
});