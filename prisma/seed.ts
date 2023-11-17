import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  const event = await prisma.event.create({
    data: {
      eventType: 'WEDDING',
      date: dayjs('2024-09-21 16:00:00').toDate(),
      slug: 'casamento-igor-gabi',
      address: 'La Casa Piemont - Farroupilha - RS',
      financialDetail: {
        create: {
          paypalBusinessCode: 'igor.faoro',
        },
      },
      designDetail: {
        create: {
          primaryColor: '#687FF9',
          bannerImage:
            'https://www.weddinggownpreservationkit.com/blog-images/zoom-virtual-wedding-background-lg.jpg',
        },
      },
      weddingDetail: {
        create: {
          brideName: 'Gabrielle',
          groomName: 'Igor',
        },
      },
      gifts: {
        create: [
          {
            description: 'Ajuda nos 14 meses de aluguel',
            image:
              'https://aventurasnahistoria.uol.com.br/media/uploads/entretenimento/barriga_madruga_cobrando_1.jpg',
            price: 350,
          },
          {
            description: '1 mês de ração para os pets',
            image: 'https://i.imgur.com/GWMsaen.jpg',
            price: 130,
          },
        ],
      },
      invitations: {
        create: [
          {
            description: 'Pedro e Ana',
          },
          {
            description: 'João e Mili',
          },
        ],
      },
    },
    include: {
      invitations: true,
    },
  });

  await prisma.guest.create({
    data: {
      invitation: { connect: { id: event.invitations[0].id } },
      name: 'Pedro',
    },
  });

  await prisma.guest.create({
    data: {
      invitation: { connect: { id: event.invitations[0].id } },
      name: 'Ana',
    },
  });

  await prisma.guest.create({
    data: {
      invitation: { connect: { id: event.invitations[1].id } },
      name: 'João',
    },
  });

  await prisma.guest.create({
    data: {
      invitation: { connect: { id: event.invitations[1].id } },
      name: 'Mili',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
