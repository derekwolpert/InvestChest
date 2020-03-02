const express = require("express");
const compression = require("compression");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');

const users = require("./routes/api/users");
const trades = require("./routes/api/trades");
const stocks = require("./routes/api/stocks");
const path = require("path");

app.use(compression());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/dist"));
    app.get("/", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "frontend", "public", "index.html")
        );
    });
}

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/trades", trades);
app.use("/api/stocks", stocks);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));