import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "./loggers/morgan.loggers";
import categoryRouter from "./routes/category.routes";
import userRouter from "./routes/user.routes";
import foodRouter from "./routes/food.routes";
import cartRouter from "./routes/cart.routes";
import orderRouter from "./routes/order.routes";
import bannerRouter from "./routes/banner.routes";
import ratingRouter from "./routes/rating.routes";
import recommendedFoodRouter from "./routes/recommendedFood.routes";
import errorHandler from "./middlewares/error.middlewares";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*"
        : process.env.CORS_ORIGIN?.split(","),
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morganMiddleware);

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/api/v1/recommended-foods", recommendedFoodRouter);
app.use("/api/v1/banners", bannerRouter);

app.use("/health", (req: Request, res: Response) => {
  res.send("Sucess ok");
});

app.use(errorHandler);

export { app };
