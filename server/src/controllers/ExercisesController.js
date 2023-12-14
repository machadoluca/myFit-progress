import prisma from '../lib/prisma.js';

class ExercisesController {
  async listAllExercises(_, response) {
    const exercises = await prisma.exercises.findMany({
      select: {
        name: true,
        group: true
      }
    });

    return response.status(200).send(exercises);
  }

  async listById(request, response) {
    const id = request.params.id;
    const exercises = await prisma.exercises.findUnique({
      where: {
        workoutId: id
      }
    });

    return response.status(200).send(exercises);
  }
}

export default ExercisesController;
