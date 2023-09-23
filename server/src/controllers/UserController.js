import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

class UserController {
  async createUser(request, response) {
    try {
      const { name, email, password } = request.body;
      const hashPassword = await bcrypt.hash(password, 8);
      await prisma.clients.create({
        data: {
          name,
          email,
          password: hashPassword
        }
      });
      return response.status(201).send({ message: 'user created' });
    } catch (error) {
      console.log(error);
      return response
        .status(409)
        .send({ error: 'the email is alredy being used' });
    }
  }

  async deleteUser(request, response) {
    try {
      const { email } = request.body;

      await prisma.clients.delete({ where: { email } });

      return response.send({
        message: `user with email:${email} deleted`
      });
    } catch {
      return response.send({
        error: 'unable to delete user'
      });
    }
  }

  async returnUsers(_, response) {
    const clients = await prisma.clients.findMany();

    return response.status(200).send(clients);
  }
}

export default UserController;
