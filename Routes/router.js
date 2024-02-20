const {
  registerValidator,
  loginValidator,
} = require("/mnt/d/ProgramData/webstorm/Web3Project/validations/auth");

const { Router } = require("express");
const userController = require("/mnt/d/ProgramData/webstorm/Web3Project/controllers/userController");
const upload = require("../validations/avatarValidation");
const router = Router();

router.get("/user/login", userController.loginForm);
router.post("/user/login", loginValidator, userController.login);
router.get("/user/register", userController.registrationForm);
router.post("/user/register", registerValidator, userController.registration);
router.post("/user/logout", userController.logout);

router.get("/user/profile/:userId?", userController.profileForm);
router.post("/user/profile", userController.profileWallet);
router.post("/user/profile/addFriend", userController.sendFriendRequest);

router.get("/user/friends", userController.friendsPageForm);
router.post("/user/friends/accept", userController.acceptFriendRequest);
router.post("/user/friends/decline", userController.declineFriendRequest);

router.post(
  "/user/profile/avatar",
  upload.single("avatar"),
  userController.updateAvatar
);
router.get("/user/profile/wallet", userController.profileGetWalletAddress);

router.get("/", userController.home);

module.exports = router;
