import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const image = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

export const imageStorage = multer({ storage: image }).single("image");
