import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import createClientSchedules from '../utils/createClientSchedules.js';
import addExercisesInSchedules from '../utils/addExercisesInSchedule.js';

class ClientController {
  async createUser(request, response) {
    try {
      const { name, email, password } = request.body;
      const userExists = await prisma.clients.findUnique({
        where: {
          email
        }
      });

      if (userExists) {
        throw new Error();
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const newUser = await prisma.clients.create({
        data: {
          name,
          email,
          password: hashPassword
        }
      });

      createClientSchedules(newUser.id);

      return response.status(201).send({ message: 'User created' });
    } catch {
      return response
        .status(400)
        .send({ error: 'The email is alredy being used' });
    }
  }

  async deleteUser(request, response) {
    try {
      const { email, password } = request.body;

      await prisma.clients.delete({ where: { email, password } });

      return response.send({
        message: `User with email: ${email} deleted`
      });
    } catch {
      return response.send({
        error: 'Unable to delete user'
      });
    }
  }

  async editSchedule(request, response) {
    let { selectedExercises, weekDay } = request.body;
    const { userId } = request;
    const { id: scheduleId } = await prisma.schedules.findFirst({
      where: {
        clientId: userId,
        weekDay
      }
    });

    addExercisesInSchedules(scheduleId, selectedExercises);

    return response.status(200).send({ scheduleId });
  }
}

class TreinerController {}

export { ClientController, TreinerController };
