import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

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

      this.#createClientSchedules(newUser.id);

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
    const { userId } = request;
    const { selectedExercises, weekDay } = request.body;
    const { id: scheduleId } = await prisma.schedules.findFirst({
      where: {
        clientId: userId,
        weekDay
      }
    });

    this.#addExercisesInSchedule(scheduleId, selectedExercises);

    return response.status(200).send({ scheduleId });
  }

  async #createClientSchedules(id) {
    const weekDays = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado'
    ];

    /**
     * change to create many
     */
    for (let day of weekDays) {
      await prisma.schedules.create({
        data: {
          weekDay: day,
          clientId: id
        }
      });
    }
  }

  async #addExercisesInSchedule(scheduleId, exercises) {
    const formatExercises = exercises.map(exercise => exercise.toLowerCase());
    const exercisesId = await prisma.exercises.findMany({
      where: {
        name: {
          in: formatExercises
        }
      },
      select: {
        id: true
      }
    });

    await prisma.schedules.update({
      where: {
        id: scheduleId
      },
      data: {
        workout: {
          connect: exercisesId.map(item => ({ id: item.id }))
        }
      }
    });
  }
}

class TreinerController {}

export { ClientController, TreinerController };
