const { UserModel } = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");
const loginForm = (req, res) => {
  try {
    const error = req.session.message.loginError;
    delete req.session.message.loginError;
    res.render("login_page", {
      title: "Login Page",
      IsAuthorized: req.session.authorized,
      error: error,
      passwordError: null,
      emailError: null,
    });
  } catch {
    res.render("login_page", {
      title: "Login Page",
      IsAuthorized: req.session.authorized,
      error: null,
      passwordError: null,
      emailError: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mapppedErrors = errors.mapped();
      return res.render("login_page", {
        title: "Login Page",
        IsAuthorized: req.session.authorized,
        error: null,
        passwordError: mapppedErrors.password,
        emailError: mapppedErrors.email,
      });
    }

    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.render("login_page", {
        title: "Login Page",
        IsAuthorized: req.session.authorized,
        error: "Wrong login or password",
        passwordError: null,
        emailError: null,
      });
      return;
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPass) {
      res.render("login_page", {
        title: "Login Page",
        IsAuthorized: req.session.authorized,
        error: "Wrong login or password",
        passwordError: null,
        emailError: null,
      });
      return;
    }

    req.session.authorized = true;
    req.session.userId = user._id;
    // req.session.user({
    //   id: user._id,
    //   wallet: user.walletAddress,
    // });

    res.redirect("/");
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const registrationForm = (req, res) => {
  res.render("register_page", {
    title: "Register Page",
    IsAuthorized: req.session.authorized,
    nameError: null,
    passwordError: null,
    emailError: null,
  });
};

const registration = async (req, res) => {
  try {
    const errorFormatter = ({
      location,
      msg,
      param,
      value,
      nestedErrors,
      path,
    }) => {
      return {};
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mapppedErrors = errors.mapped();
      return res.render("register_page", {
        title: "Register Page",
        IsAuthorized: req.session.authorized,
        nameError: mapppedErrors.name,
        passwordError: mapppedErrors.password,
        emailError: mapppedErrors.email,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      passwordHash: passwordHashed,
    });

    const user = await doc.save();

    res.redirect("/user/login");
  } catch (e) {
    res.status(500).json({
      message: "Registration failed",
    });
  }
};
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid");
    res.redirect("/user/login");
  });
};

const home = (req, res) => {
  let IsAuthorized = req.session.authorized;
  if (!IsAuthorized) {
    IsAuthorized = false;
  }
  const userId = req.session.userId;
  res.render("home_page", {
    title: "Home Page",
    IsAuthorized: IsAuthorized,
    userId: userId,
  });
};

const friendsPageForm = async (req, res) => {
  let IsAuthorized = req.session.authorized;
  const userId = req.session.userId;
  try {
    const user = await UserModel.findById(userId)
      .populate("friendRequests", "name _id")
      .populate("friends", "name _id");

    res.render("friends_page", {
      title: `${user.name}'s Friends`,
      IsAuthorized: IsAuthorized,
      currentUser: user,
      currentUserId: userId,
      IsAuthorized: IsAuthorized,
      friendRequests: user.friendRequests,
      friends: user.friends,
      friendsCount: user.friendsCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// const profileForm = async (req, res) => {
//   let IsAuthorized = req.session.authorized;
//   try {
//     const userId = req.session.userId;
//     const user = await UserModel.findById(userId);

//     return res.render("profile_page", {
//       title: "Profile",
//       IsAuthorized: IsAuthorized,
//       wallet: user.walletAddress,
//       userId: userId,
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Internal server error");
//   }
// };

const profileForm = async (req, res) => {
  let IsAuthorized = req.session.authorized;
  try {
    const currentUserId = req.session.userId;
    const requestedUserId = req.params.userId || currentUserId;

    const user = await UserModel.findById(requestedUserId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isCurrentUser = requestedUserId === currentUserId;

    let currentUser = null;

    if (!isCurrentUser) {
      currentUser = await UserModel.findById(currentUserId);
    }

    res.render("profile_page", {
      title: `${user.name}'s Profile`,
      IsAuthorized: IsAuthorized,
      user: user,
      currentUser: isCurrentUser ? user : currentUser,
      isCurrentUser: isCurrentUser,
      wallet: user.walletAddress,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const profileWallet = async (req, res) => {
  const { walletAddress } = req.body;
  const userId = req.session.userId;

  try {
    const user = await UserModel.findById(userId);
    user.walletAddress = walletAddress;
    await user.save();

    return res.render("profile_page", {
      title: "Profile",
      IsAuthorized: req.session.IsAuthorized,
      wallet: user.walletAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const profileGetWalletAddress = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await UserModel.findById(userId);
    if (user.walletAddress) {
      res.json({ walletAddress: user.walletAddress });
    } else {
      res.json({ walletAddress: null });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

///////// avatar ///////////
const updateAvatar = async (req, res) => {
  try {
    res.redirect("/user/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

///////// friend requests //////////

const sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    if (userId === friendId) {
      return res.status(400).send("Error");
    }

    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);

    if (!friend) {
      return res.status(404).send("User not found");
    }

    if (
      friend.friendRequests.includes(userId) ||
      user.friends.includes(friendId)
    ) {
      return res.status(400).send("Request already sent");
    }

    friend.friendRequests.push(userId);
    await friend.save();

    res.status(200).send("Request sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const acceptFriendRequest = async (req, res) => {
  const { userId, requestId } = req.body;

  console.log("Accepting friend request with data:", { userId, requestId });

  try {
    const user = await UserModel.findById(userId);
    const requestingUser = await UserModel.findById(requestId);

    if (!user || !requestingUser) {
      return res.status(404).send("User not found");
    }

    if (
      user.friendRequests
        .map((id) => id.toString())
        .includes(requestId.toString())
    ) {
      user.friendRequests.pull(requestId);

      user.friends.push(requestId);
      requestingUser.friends.push(userId);

      user.friendsCount += 1;
      requestingUser.friendsCount += 1;

      await user.save();
      await requestingUser.save();

      res.status(200).send("Friend request accepted");
    } else {
      res.status(404).send("Friend request not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const declineFriendRequest = async (req, res) => {
  const { userId, requestId } = req.body;

  // console.log("Declining friend request with data:", { userId, requestId });

  try {
    const user = await UserModel.findById(userId);
    const requestingUser = await UserModel.findById(requestId);

    if (!user || !requestingUser) {
      return res.status(404).send("User not found");
    }

    if (
      user.friendRequests
        .map((id) => id.toString())
        .includes(requestId.toString())
    ) {
      user.friendRequests.pull(requestId);
      await user.save();
      res.status(200).send("Friend request declined");
    } else {
      res.status(404).send("Friend request not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  loginForm,
  login,
  registrationForm,
  registration,
  logout,
  home,
  profileForm,
  profileWallet,
  profileGetWalletAddress,
  updateAvatar,
  friendsPageForm,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
};
