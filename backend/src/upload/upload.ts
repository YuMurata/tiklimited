import express from "express";
// import { updateUser} from "../services/userService";
import upload from "./multerHandler";

export const getUpload = () => {
  const router = express.Router();

  console.log("export upload");

  // ユーザー更新APIの呼出
  router.post(
    "/update",
    upload.single("file"),
    (req: express.Request, res: express.Response) => {      
      if (req.file) {
        res.send({path: req.file.filename});
      } else {
        res.status(500).send("upload failed");
      }
    }
  );
  return router;
};
