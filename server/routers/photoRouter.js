const express = require("express");
const router = express.Router();

const uploadImage = require("../tools/routers/uploadImg");
const authorizationMiddleware = require("../tools/routers/authorizationMiddleware");

const schema = require("../Models");

router.get("/", async (req, res) => {
  try {
    const photos = await schema.Photo.find(req.body);
    res.send(photos);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Wrong request.",
    });
  }
});

router.post(
  "/",
  [authorizationMiddleware(true), uploadImage.single("image")],
  async (req, res) => {
    try {
      const photo = new schema.Photo({
        title: req.body.title,
        user: req.user._id,
      });
      photo.image = req.file && req.file.filename;
      await photo.save();

      res.send(photo);
    } catch (error) {
      req.file &&
        (await fs.unlink(config.ImageUploadingDir + "/" + req.file.filename));
      res.status(400).send({
        message: "Wrong request.",
        error,
      });
    }
  }
);

router.delete("/", [authorizationMiddleware(true)], async (req, res) => {
  try {
    if (req.body.id !== req.user._id)
      return res.status(400).send({
        error: "access is denied",
      });

    await schema.Photo.findByIdAndDelete(req.body.id);
    res.send({ message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Wrong request.",
      error,
    });
  }
});

module.exports = router;
