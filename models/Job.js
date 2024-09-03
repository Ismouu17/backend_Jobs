const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    maxApplicants: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: "le nombre de candidatures maximale doit etre un entier",
        },
        {
          validator: function (value) {
            return value > 0;
          },
          msg: "le nombre de candidatures maximale doit etre supérieur à 0",
        },
      ],
    },
    maxPositions: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Le nombre de positions max doit etre un entier",
        },
        {
          validator: function (value) {
            return value > 0;
          },
          msg: "le nombre de position max doit etre supérieur à 0",
        },
      ],
    },
    activeApplications: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "le nombre de candidatures actives doit etre un entier",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "le nombre de candidatures actives doit etre superieur à 0",
        },
      ],
    },
    acceptedCandidates: {
      type: Number,
      default: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "le nombre de candidat acceptés doit etre un entier",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "le nombre de candidat acceptés doit etre supérieur à 0",
        },
      ],
    },
    dateOfPosting: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfPosting < value;
          },
          msg: "La date limite doit etre supérieure à la date de publication",
        },
      ],
    },
    skillsets: [String],
    jobType: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          msg: "La durée de l'offre doit etre un entier",
        },
      ],
    },
    salary: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Le salaire doit etre un entier",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "Le salaire doit etre positif",
        },
      ],
    },
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
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("jobs", schema);
