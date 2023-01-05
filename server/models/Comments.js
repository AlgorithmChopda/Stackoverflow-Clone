import mongoose from "mongoose";

const CommentSchema = mongoose.Schema ({
    comment_body: String,
    comment_userid: String,
    comment_answerid: String
})

export default mongoose.model("Comment", CommentSchema)