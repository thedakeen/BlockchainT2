const { CommentModel } = require("../models/commentModel.js");
const { PostModel } = require("../models/postModel.js");
const { UserModel } = require("../models/userModel.js");

const addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.session.userId;

    const user = await UserModel.findById(userId);
    if (!user.hasTopWeb3NFT)
      return res.status(403).send("NFT is required to comment");

    const comment = new CommentModel({ content, author: userId, post: postId });
    await comment.save();

    const post = await PostModel.findById(postId);
    post.comments.push(comment._id);
    await post.save();

    res.redirect(req.header("Referer") || "/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { addComment };
