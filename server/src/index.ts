import express, { Express, Request, Response, Application } from "express";
import { spawn } from "child_process";
import dotenv from "dotenv";
import { app } from "./app";
import connectDB from "./db";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed: ", error);
  });

// app.get("/", (req: Request, res: Response) => {
//   let dataToSend: any;

//   const python = spawn("python", ["src/p.py"]);

//   python.stdout.on("data", function (data) {
//     dataToSend = data.toString();
//   });

//   python.on("close", (code) => {
//     res.send(dataToSend);
//   });
//   // res.send("Welcome to Express & TypeScript Server");
// });
