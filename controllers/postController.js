const { PostModel } = require("../models/postModel.js");
const { UserModel } = require("../models/userModel.js");

const addPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.session.userId;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).send("User not found");

    if (!user.hasTopWeb3NFT)
      return res.status(403).send("NFT is required to post");

    const post = new PostModel({ content, author: userId });
    await post.save();

    res.redirect("/user/profile/" + userId);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addPost,
};
