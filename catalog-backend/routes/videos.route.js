const express = require("express");
const router = express.Router();

const videoController = require("../controllers/video.controller");

router.get("/", videoController.index);
router.get("/:id", videoController.show);
router.post("/", videoController.create);
router.put("/:id", videoController.update);
router.delete("/:id", videoController.delete);
module.exports = router;

function verifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Token não informado." });

  jwt.verify(token, secret, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: "Token inválido." });

    req.userId = decoded.id;
    console.log("User Id: " + decoded.id);
    next();
  });
}
