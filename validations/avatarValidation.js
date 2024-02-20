const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/avatars"));
  },
  filename: function (req, file, cb) {
    const userId = req.session.userId;
    const extension = file.originalname.split(".").pop();
    cb(null, `${userId}.${extension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
