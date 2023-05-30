import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const app = express();

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const firebaseConfig = {
    apiKey: "AIzaSyCTl3BDu7zVmy9QLqMDao31c6ZVOCeghM4",
    authDomain: "sairam-freshers.firebaseapp.com",
    projectId: "sairam-freshers",
    storageBucket: "sairam-freshers.appspot.com",
    messagingSenderId: "60215698703",
    appId: "1:60215698703:web:f33b8689373865bf5b8a7a"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

app.use("/public", express.static(path.join(__dirname, "public")));


app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/admin", async (req, res) => {
    res.sendFile(__dirname + "/admin.html");
});

app.get("/portal", (req, res) => {
    res.sendFile(__dirname + "/portal.html");
});

app.get("/orientation", (req, res) => {
    res.sendFile(__dirname + "/orientation.html");
});

app.get("/schedule", async (req, res) => {
    const db = getFirestore(firebaseApp);
    const dbData = await getDoc(doc(db, "orientation", "meetings"));
    // console.log(dbData.data());
    res.json(dbData.data());
});

app.post("/delete-schedule", async (req, res) => {
    const meetingData = req.body;
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "orientation", "meetings");
    try {
        await updateDoc(docRef, {
            data: arrayRemove(meetingData)
        });
        res.status(200).json({
            status: "deleted"
        });
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});

app.post("/add-schedule", async (req, res) => {
    const meetingData = req.body;
    console.log(meetingData);
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "orientation", "meetings");
    try {
        await updateDoc(docRef, {
            data: arrayUnion(meetingData)
        });
        res.status(200).json({
            status: "added"
        });
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});

app.get("/guide", (req, res) => {
    res.sendFile(__dirname + "/guide.html");
});

app.get("/admission", (req, res) => {
    res.sendFile(__dirname + "/admission.html");
});

app.all("*", (req, res) => {
    res.status(404).send("<h1>ERROR: 404</h1><hr><h1>This path was not found</h1>");
});

app.listen(3000, () => {
    console.log(__dirname);
});
