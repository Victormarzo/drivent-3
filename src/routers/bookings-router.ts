import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { postBooking, getBooking } from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", postBooking);

export { bookingsRouter };
