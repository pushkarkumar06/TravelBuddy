import express from "express";
import { signup , login, logout , getAllTravelersExceptMe} from "../controllers/user_controller.js";
import { getUsersOverlappingWithMe} from "../controllers/matchTravel_controller.js";
// import { login } from "../controllers/user_controller.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup); // Route: /api/v1/users/signup
router.post("/login", login); // Route: /api/v1/users/login
router.get("/logout", logout); // Route: /api/v1/users/logout
router.get('/me', authenticateUser, (req, res) => {
  res.json(req.user); // Only returns firstName and lastName
});
router.get("/explore", authenticateUser, getAllTravelersExceptMe);
router.get("/travel-buddies", authenticateUser, getUsersOverlappingWithMe);


export default router;
