const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const trades = require("./routes/api/trades");

const User = require("./models/User");

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

app.use("/api/users", users);
app.use("/api/trades", trades);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));