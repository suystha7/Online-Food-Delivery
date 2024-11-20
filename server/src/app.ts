import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "./loggers/morgan.loggers";
import categoryRouter from "./routes/category.routes";
import userRouter from "./routes/user.routes";
import foodRouter from "./routes/food.routes";
import cartRouter from './routes/cart.routes'
import errorHandler from "./middlewares/error.middlewares";

const app = express();

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
app.use("/api/v1/carts",cartRouter)

app.use("/health", (req: Request, res: Response) => {
  res.send("Sucess ok");
});

app.use(errorHandler);

export { app };
