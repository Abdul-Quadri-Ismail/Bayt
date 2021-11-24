import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { Conversation } from "./conversationModel";

// @desc   Get Conversation
// @route  GET /api/v1/conversation
// @access Private
export const getUserConverse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const conversation = await Conversation.find().where(
      "messageId",
      req.params.id
    );
    if (!conversation) {
      return next(new ErrorResponse(400, "Not found"));
    }

    response(res, 200, true, conversation);
  }
);

// @desc   Send Message
// @route  GET /api/v1/conversation
// @access Private
export const sendMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user) {
      req.body.sender = req.body.user._id;
    } else {
      req.body.sender = req.user;
    }

    const { tenant_id, owner_id, message, messageId, sender } = req.body;

    await Conversation.create(
      {
        tenant_id,
        owner_id,
        message,
        messageId,
        sender,
      },
      (err, doc) => {
        if (doc) {
          response(res, 200, true, {});
        }
      }
    );
  }
);
