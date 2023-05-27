import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/public", express.static( path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/portal", (req, res) => {
    res.sendFile(__dirname + "/portal.html");
});

app.get("/orientation", (req, res) => {
    res.sendFile(__dirname + "/orientation.html")
});

app.get("/guide", (req, res) => {
    res.sendFile(__dirname + "/guide.html");
});

app.get("/admission", (req, res) => {
    res.sendFile(__dirname + "/admission.html");
});


app.listen(3000, () => {
    console.log(__dirname);
});