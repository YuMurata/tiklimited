import express from "express";
// import { updateUser} from "../services/userService";
import upload from "./multerHandler";

export const getUpload = () => {
  const router = express.Router();

  console.log("export upload")

  // ユーザー更新APIの呼出
  router.post(
    "/update",
    upload.single("file"),
    (req: express.Request, res: express.Response) => {
      console.log(req.file);
      res.redirect("/");
    }
  );
  return router;
};
