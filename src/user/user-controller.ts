import { CreateUserDto } from './dtos/CreateUser.dto';
import UserService from './user-service';
import { Request, Response } from 'express';

// a user controller is a class that handles the user routes (incoming frontend requests)
class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({error: 'User not found'});
      } else {
        res.json(user)
      }
    } catch (error: any) {
      res.status(500).json({error: error.message});
    }
  };
}

export default UserController;