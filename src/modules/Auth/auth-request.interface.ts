import { Request } from "express";

// Extend the Request interface to include the loggedInUser property
export interface AuthenticatedRequest extends Request {
  loggedInUser?: number;
  user?: any;
}
