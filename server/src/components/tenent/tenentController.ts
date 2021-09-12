import { NextFunction, Response, Request } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { User } from "../users/userModel";
import { Tenent } from "./tenentModel";

// @desc   Send message to owner
// @route  POST /api/v1/tenents
// @access Private
export const createTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const user = await User.findById(req.user);

      if (!user) {
        return next(new ErrorResponse(400, "Invalid user credentials"));
      }

      const tenent = await Tenent.create({
        tenent_id: req.user,
        ...req.body,
      });

      response(res, 200, true, tenent);
    } else {
      return next(new ErrorResponse(400, "Invalid user credentials"));
    }
  }
);

// @desc   Search for tenent message
// @route  GET /api/v1/tenents/:propertyId
// @access Private
export const searchSingleTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenent = await Tenent.findOne({
      property_id: req.params.id?.toString(),
    }).where({ tenent_id: req.user });

    if (!tenent) {
      return next(new ErrorResponse(400, "Not found"));
    }
    response(res, 200, true);
  }
);

// @desc   Get pending tenents
// @route  GET /api/v1/tenents/
// @access Private
export const getTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user._id;
    const tenent = await Tenent.find({ owner_id: userId });

    if (!tenent) {
      return next(new ErrorResponse(400, "Not found"));
    }
    response(res, 200, true, tenent);
  }
);

// @desc   Decline tenent
// @route  DELETE /api/v1/tenents/:id
// @access Private
export const declineTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user._id;
    console.log(req.params.id.toString(), userId);
    const tenent = await Tenent.findById(req.params.id.toString());

    if (!tenent) {
      return next(new ErrorResponse(400, "Not found"));
    }

    tenent.remove();
    
    response(res, 200, true, {});
  }
);
