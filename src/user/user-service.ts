import { CreateUserDto } from './dtos/CreateUser.dto';
import { IUser } from './models/User';
import UserModel from './models/User';

class UserService {
  async getUserById(userId): Promise<IUser | null> {
    try {
      return await UserModel.findById(userId);
    } catch (error) {
      console.error(`Error fetching user by ID: ${userId}`, error);
      return null;
    }
  }

  async getUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find().exec();
      return users;
    } catch (error) {
      console.error('Error fetching users', error);
      return [];
    }
  }
}

export default UserService;
