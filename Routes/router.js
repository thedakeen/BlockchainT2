const { registerValidator, loginValidator } = require("../validations/auth");

const { Router } = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const upload = require("../validations/avatarValidation");
const router = Router();
const { authorizationCheck, refuse } = require("../utils/AuthMiddleware");

router.get("/user/login", refuse, userController.loginForm);
router.post("/user/login", loginValidator, userController.login);
router.get("/user/register", refuse, userController.registrationForm);
router.post("/user/register", registerValidator, userController.registration);
router.post("/user/logout", authorizationCheck, userController.logout);

// USER PROIFLE
router.get(
  "/user/profile/:userId?",
  authorizationCheck,
  userController.profileForm
);
router.post("/user/profile", authorizationCheck, userController.profileWallet);
router.post(
  "/user/profile/addFriend",
  authorizationCheck,
  userController.sendFriendRequest
);

router.post(
  "/user/profile/addPost",
  authorizationCheck,
  postController.addPost
);
// END OF USER PROFILE

// COMMENTS
router.post("/addComment", authorizationCheck, commentController.addComment);

// END OF COMMENTS

router.get("/user/friends", authorizationCheck, userController.friendsPageForm);
router.post(
  "/user/friends/accept",
  authorizationCheck,
  userController.acceptFriendRequest
);
router.post(
  "/user/friends/decline",
  authorizationCheck,
  userController.declineFriendRequest
);

router.post(
  "/user/profile/avatar",
  upload.single("avatar"),
  authorizationCheck,
  userController.updateAvatar
);
router.get(
  "/user/profile/wallet",
  authorizationCheck,
  userController.profileGetWalletAddress
);

router.get("/", userController.home);

module.exports = router;
