import express, { Express, Request, Response, Application } from "express";
import { spawn } from "child_process";
import dotenv from "dotenv";
import { app } from "./app";
import connectDB from "./db";
import ApiResponse from "./utils/ApiResponse";

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
//   let dataToSend = "";

//   const python = spawn("python", ["src/p.py"]);

//   python.stdout.on("data", function (data) {
//     dataToSend += data;
//   });

//   python.stderr.on("data", (error) => {
//     console.error(`stderr: ${error}`);
//   });

//   python.on("close", (code) => {
//     if (code === 0) {
//       const result = JSON.parse(dataToSend);
//       res.json(new ApiResponse(200, { data: result }, "data has been sent"));
//     }
//   });
// });
