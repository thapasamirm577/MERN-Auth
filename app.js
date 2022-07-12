import express from "express";
import userModel from "./model.js";
import { dbInit } from "./config.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
dbInit();

//middleware
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/user/create", async (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    const { name, age, email, password } = req.body;

    if (name.trim() === "" || age === null || email.trim() === "") {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const users = await userModel.create({
            name: name,
            age: age,
            email: email,
            password,
        });
        if (users) return res.status(200).json(users);
        return res.status(500).json({
            message: "Error",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: "Wrong password" });
        }

        const accessToken = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            "secret"
        );
        let options = {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        };

        if (req.cookies.token === undefined) {
            res.cookie("token", accessToken, options);
        }

        res.status(200).json({
            message: "Success login",
            accessToken,
            data: user,
        });
        next();
    } catch (error) {
        next(console.log("error in login " + error));
    }
});

app.get("/loggedin", async (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(400).json({ error: "Bad request" });
    }

    try {
        const decoded = jwt.verify(token, "secret");
        if (!decoded) {
            return res.status(400).json({ error: "UnAuthorized" });
        }
        const user = await userModel.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        return res
            .status(200)
            .json({ message: "User Authorized", token, data: user });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error in loggedin" + error });
    }
});

app.get("/logout", async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Success logout" });
});

app.get("/users", async (req, res) => {
    const users = await userModel.findAll();
    res.send(users);
});

app.get("/user/:userId", async (req, res) => {
    if (req.params.userId) {
        try {
            const users = await userModel.findOne({ id: req.params.userId });
            if (users) return res.send(users);
            return res.status(404).json({ message: "User not found" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        return res.status(400).json({ message: "Provide right request" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
