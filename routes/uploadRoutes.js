const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const expressFileUpload = require("express-fileupload");
const fileUpload = require("express-fileupload");
const path = require("path");

const profileFolder = path.join(`${__dirname}/../public/profile`)
const resumeFolder = path.join(`${__dirname}/../public/resume`)

const router = express.Router();
router.use(fileUpload())

router.post("/resume", (req, res) => {
  const { file } = req.files
  if (
    file.name.split(".")[1] != "pdf"
  ) {
    res.status(400).json({
      message: "Format de fichier invalide",
    });
  } else {
        file.mv(path.join(resumeFolder, file.name))
        res.send({
          message: "CV Enregistré avec succes",
          url: `/host/resume/${file.name}`,
        });
  }
});

router.post("/profile", (req, res) => {
  const { file } = req.files
  if (
    file.name.split(".")[1] != "jpg" &&
    file.name.split(".")[1] != "png"
  ) {
    res.status(400).json({
      message: "Format de fichier invalide",
    });
  } else {
        file.mv(path.join(profileFolder, file.name))
        res.send({
          message: "Photo de profil enregistrée avec succes",
          url: `/host/profile/${file.name}`,
        });
  }
});

module.exports = router;
