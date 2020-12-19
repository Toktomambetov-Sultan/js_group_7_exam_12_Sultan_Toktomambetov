const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const uploadImage = require("../tools/routers/uploadImg");
const authorizationMiddleware = require("../tools/routers/authorizationMiddleware");

const schema = require("../Models");

router.get("/", async (req, res) => {
  try {
    const photos = await schema.Photo.find(
      req.query.id
        ? {
            user: req.query.id,
          }
        : {}
    );
    let user = null;
    if (req.query.id) {
      user = await schema.User.findById(req.query.id);
      user = user.toJSON();
      delete user.token;
    }
    res.send({ photos, user });
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
    const photo = await schema.Photo.findById(req.body.id);

    if (String(req.user._id) !== String(photo.user))
      return res.status(400).send({
        error: "access is denied",
      });
    await schema.Photo.findByIdAndDelete(photo._id);
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
