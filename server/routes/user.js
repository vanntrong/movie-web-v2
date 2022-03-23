const middlewareController = require("../controller/middleware");
const userController = require("../controller/user");

const router = require("express").Router();

router.patch("/watch-later", middlewareController.verifyToken, userController.updateUserListWatchLater);

router.patch("/update", middlewareController.verifyToken, userController.updateUser);

router.get("/all", middlewareController.verifyTokenAndAdmin, userController.getAllUser);

router.delete("/delete/:id", middlewareController.verifyToken, userController.deleteUser);

module.exports = router;
