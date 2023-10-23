import express from "express";
import {
  registerControllers,
  loginControllers,
  testControllers,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();

// routing
router.post("/register", registerControllers);
router.post("/login", loginControllers);
router.post("/forgot-password", forgotPasswordController);
router.post("/test", requireSignIn, isAdmin, testControllers);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(201).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
