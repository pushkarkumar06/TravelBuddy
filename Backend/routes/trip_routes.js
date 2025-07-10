import express from "express";
import { getMyActivities , createTrip , getAllActivities , joinActivity} from "../controllers/trip_controller.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/my-activities", authenticateUser, getMyActivities);
router.get("/activities", authenticateUser, getAllActivities);
router.post("/", authenticateUser, createTrip);
router.post("/activities/:id/join", authenticateUser, createTrip);
router.post("/join/:activityId", authenticateUser, joinActivity);

export default router;
