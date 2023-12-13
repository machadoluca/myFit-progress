import prisma from '../lib/prisma.js';

async function createClientSchedules(id) {
  const weekDays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ];

  for (let day of weekDays) {
    await prisma.schedules.create({
      data: {
        weekDay: day,
        clientId: id
      }
    });
  }
}

export default createClientSchedules;
