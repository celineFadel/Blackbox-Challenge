const path = require("path");

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use("/uploads/", express.static(path.join(__dirname, "/uploads")));
app.use("/public/", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => res.sendFile("public/index.html", {root:__dirname}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
