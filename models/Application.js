const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "applied", 
        "shortlisted", 
        "accepted", 
        "rejected", 
        "deleted", 
        "cancelled", 
        "finished",
      ],
      default: "applied",
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
    dateOfJoining: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfApplication <= value;
          },
          msg: "La date d'adhésion doit etre supérieure à la date de candidature",
        },
      ],
    },
    sop: {
      type: String,
      validate: {
        validator: function (v) {
          return v.split(" ").filter((ele) => ele != "").length <= 250;
        },
        msg: "La déclaration d'intention ne doit pas dépasser 250 mots",
      },
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("applications", schema);
