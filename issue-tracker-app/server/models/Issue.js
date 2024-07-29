const mongoose = require("mongoose");

const statuses = ["New", "Assigned", "Pending", "Completed"];

const IssueModel = new mongoose.Schema({
    status: { type: String, enum: statuses },
    owner: { type: String },
    effort: { type: Number },
    created: { type: Date },
    due: { type: Date },
    title: { type: String },
});

module.exports = mongoose.model("Issue", IssueModel);
