import { Request, Response } from "express";

export const createChat = async (req: Request, res: Response) => {
  try {
    const chat = req.body.message;

    if (!chat) {
      throw new Error("메시지가 없습니다.");
    }
    if (typeof chat !== "string") {
      throw new Error("메시지는 문자열이어야 합니다.");
    }

    res.status(201).send(chat);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};
