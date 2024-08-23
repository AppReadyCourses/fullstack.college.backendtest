

const mongoose = require('mongoose')


const tagSchema = mongoose.Schema(
    {
        name: String,
        topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "topics" }],
      },
      {
        timestamps: true,
      }
)

const Tag = mongoose.model("Tag", tagSchema)

module.exports = Tag