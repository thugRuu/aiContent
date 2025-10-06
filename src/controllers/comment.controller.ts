import { Request, Response } from "express";
import prisma from "../lib/prisma";


// ➤ Create a Comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { profileId, postId, content } = req.body;

    const comment = await prisma.comment.create({
      data: {
        profileId,
        postId,
        content,
      },
      include: {
        profile: true,
        post: true,
      },
    });

    res.status(201).json(comment);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
};

// ➤ Get All Comments
export const getComments = async (_req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        profile: true,
        post: true,
      },
    });
    res.json(comments);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

// ➤ Get Comment by ID
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id:String(id) },
      include: {
        profile: true,
        post: true,
      },
    });

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.json(comment);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching comment", error: error.message });
  }
};

// ➤ Update Comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.update({
      where: { id:String(id) },
      data: { content },
    });

    res.json(comment);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Comment not found" });
    }
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

// ➤ Delete Comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.comment.delete({
      where: { id:String(id) },
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Comment not found" });
    }
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};
