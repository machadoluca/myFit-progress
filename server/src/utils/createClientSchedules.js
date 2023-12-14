import prisma from '../lib/prisma.js';

async function createClientSchedules(id) {
  for (let i = 0; i < 7; i++) {
    await prisma.schedules.create({
      data: {
        weekDay: i,
        clientId: id
      }
    });
  }
}

export default createClientSchedules;
