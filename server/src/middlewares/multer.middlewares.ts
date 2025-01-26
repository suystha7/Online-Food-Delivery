import multer, { diskStorage } from "multer";
import path from "path";
import ApiError from "../utils/ApiError";

const storage = diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "./public/images");
  },
  filename: (_req, file, callback) => {
    // filename can have spaces between them so splitting and joining with -
    // filename could be also empty so used optional chaining before splitting
    const filenameWithoutExtension = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-")
      ?.split(".")[0];

    // filename can be a.b.c.jpeg
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf(".")
    );

    const suffix = Date.now() + Math.round(Math.random() * 1e4);

    callback(null, filenameWithoutExtension + suffix.toString() + extension);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (file.fieldname === "avatar") {
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        return cb(
          new ApiError(400, "Only file types .svg, .jpeg, .jpg, .png are allowed")
        );
      }
    }

    cb(null, true);
  },
});
