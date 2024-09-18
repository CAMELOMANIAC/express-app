import { Router } from "express";
import { createChat } from "../controllers/controller.js";

const router = Router();

router.post("/", createChat);
router.all("/", (req, res) => {
  res.status(405).json({ error: "허용되지 않은 메서드 입니다." });
});

export default router;
