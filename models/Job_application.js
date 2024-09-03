const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    education: [
      {
        institutionName: {
          type: String,
          required: true,
        },
        startYear: {
          type: Number,
          min: 1930,
          max: new Date().getFullYear(),
          required: true,
          validate: Number.isInteger,
        },
        endYear: {
          type: Number,
          max: new Date().getFullYear(),
          validate: [
            { validator: Number.isInteger, msg: "L'année doit etre un entier" },
            {
              validator: function (value) {
                return this.startYear <= value;
              },
              msg: "Le mois final doit etre supérieur ou égal au mois initial",
            },
          ],
        },
      },
    ],
    skills: [String],
    rating: {
      type: Number,
      max: 5.0,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Notes invalides",
      },
    },
    resume: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("JobApplicantInfo", schema);
