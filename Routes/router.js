const {
  registerValidator,
  loginValidator,
} = require("C:/Users/VNSV/WebstormProjects/BlockchainT2/validations/auth");

const { Router } = require("express");
const userController = require("C:/Users/VNSV/WebstormProjects/BlockchainT2/controllers/userController");
const upload = require("../validations/avatarValidation");
const {authorizationCheck,
  refuseAccess} = require("../utils/AuthMiddleware")
const router = Router();

router.get("/user/login",refuseAccess, userController.loginForm);
router.post("/user/login", loginValidator, userController.login);
router.get("/user/register",refuseAccess, userController.registrationForm);
router.post("/user/register", registerValidator, userController.registration);
router.post("/user/logout",authorizationCheck, userController.logout);

router.get("/user/profile/:userId?",authorizationCheck, userController.profileForm);
router.post("/user/profile",authorizationCheck, userController.profile);
router.post("/user/profile/addFriend",authorizationCheck, userController.sendFriendRequest);

router.get("/user/friends",authorizationCheck, userController.friendsPageForm);
router.post("/user/friends/accept", authorizationCheck, userController.acceptFriendRequest);
router.post("/user/friends/decline",authorizationCheck, userController.declineFriendRequest);

router.post("/user/profile/avatar", upload.single("avatar"),authorizationCheck, userController.updateAvatar);
router.get("/user/profile/wallet",authorizationCheck, userController.profileGetWalletAddress);

router.get("/", userController.home);

module.exports = router;
