import prisma from '../lib/prisma.js';

async function addExercisesInSchedules(scheduleId, exercises) {
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

export default addExercisesInSchedules;
