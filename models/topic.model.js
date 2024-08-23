

const mongoose = require('mongoose')


const topicSchema = mongoose.Schema(
    {
        title: String,
        subTitle: String,
        slug: String,
        codes: String,
        pageUrl: String,
        titleImageUrl: String,
        videoUrl: String,
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags" }],
    },
    {
        timestamps: true
    }
)

const Topic = mongoose.model("Topic", topicSchema)

module.exports = Topic