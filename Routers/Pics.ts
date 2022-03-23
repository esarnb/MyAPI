import express, { Router } from "express";
import Image from "../Models/ImageModel";
import stream from "stream";
import multer from "multer"; // handles file uploads - multipart/form-data
import isGif from "is-gif"; // check if a data file is a gif
import dotenv from "dotenv";

dotenv.config();
const app = express();
const router = Router();
const upload = multer();

router.get("/:name", (req, res) => {
  if (!req.params.name.endsWith(".jpg") && !req.params.name.endsWith(".gif")) {
    return res.end(`${req.params.name} is invalid.`);
  }

  Image.findOne(
    { name: req.params.name.replace(".jpg", "").replace(".gif", "") },
    (err, img: any) => {
      if (err) return res.end(err);
      if (!img) return res.send("Image not found.");

      let ps = new stream.PassThrough();

      stream.pipeline(bufferToStream(img.file), ps, (err) => {
        if (err) return res.end(err);
      });

      res.writeHead(200, {
        "Content-Type": img.type,
        "Content-Length": img.file.length,
      });

      ps.pipe(res);
    },
  );
});

router.post("/", upload.single("screenshot"), (req, res) => {
  let secret = req.body.secret;
 
  if (secret !== process.env.secret) return res.end("Unauthorized");

  let file = (req as any).file.buffer;
  let name = req.body.name;
  let type = isGif(file) ? "image/gif" : "image/jpeg";

  let screenshot = new Image({ name, file, type });
  screenshot.save();
  res.send(
    `https://pics.esarnb.com/${name}.${type == "image/gif" ? "gif" : "jpg"}`,
  );
});

app.use(router);

function bufferToStream(binary) {
  const readableInstanceStream = new stream.Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return readableInstanceStream;
}

export default app;
