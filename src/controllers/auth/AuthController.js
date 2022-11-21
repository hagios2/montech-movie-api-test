import {errorResponse, successResponse} from "../../responses/response.js"
import { registerUser } from "../../services/Auth/RegisterUserService.js"
import { logInUser, logOutUser } from "../../services/Auth/AuthService.js"

class AuthController {

  register = async (req, res) => {
    try {
      const user = await registerUser(req.body);
      return successResponse(res, user, "OK", 201);
    } catch (error) {
      return errorResponse(res, error?.message || error, 400);
    }
  }

  login = async (req, res) => {
    try {
      const token = await logInUser(req.body);
      return successResponse(res, { data: token }, "Login successful");
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  logout = async (req, res) => {
    try {
      const { _id } = req.user;
      await logOutUser(_id);
      return successResponse(res, {}, "logged out successful");
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

const UserAuthController = new AuthController()

export default UserAuthController 