import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.guest.deleteMany({});
  await prisma.gift.deleteMany({});
  await prisma.eventContentImage.deleteMany({});
  await prisma.eventHandbook.deleteMany({});
  await prisma.invitation.deleteMany({});
  await prisma.event.deleteMany({});

  const event = await prisma.event.create({
    data: {
      eventType: 'WEDDING',
      date: dayjs('2024-09-21 16:00:00').toDate(),
      slug: 'casamento-igor-gabi',
      address:
        'Espaço de Eventos La Casa Piemont, 240 - Estrada VRS 826 - Linha Boêmios, Farroupilha - RS, 95181-899',
      content: {
        create: {
          primaryColor: '#1E3A8A',
          bannerImage:
            '20240410-164250.5050_0e06542c-60f6-42d3-bb8f-4beaca2084ee.png',
          logoImage:
            '20240410-164251.5151_1d1276e7-df76-48fe-ac2b-fc26e81a78a8.png',
          spotifyPlaylistUrl:
            'https://open.spotify.com/embed/playlist/4repDc6kVmb39JvP5uq4Eb?utm_source=generator'
        }
      },
      financial: {
        create: {
          paypalBusinessCode: 'igor.faoro17@gmail.com'
        }
      },
      contactInfo: {
        create: {}
      },
      weddingDetail: {
        create: {
          brideName: 'Gabrielle',
          groomName: 'Igor'
        }
      }
    },
    include: {
      content: true
    }
  });

  // create design images
  const photos = [
    'https://i.postimg.cc/MGsGCZD2/photo-1.jpg',
    'https://i.postimg.cc/Jhhr5VWT/photo-10.jpg',
    'https://i.postimg.cc/TPHRk7dT/photo-11.jpg',
    'https://i.postimg.cc/ZRBJX8np/photo-12.jpg',
    'https://i.postimg.cc/63kBK84S/photo-13.jpg',
    'https://i.postimg.cc/L5j28mzs/photo-14.jpg',
    'https://i.postimg.cc/C1zKSyPZ/photo-2.jpg',
    'https://i.postimg.cc/WzZbqGPT/photo-3.jpg',
    'https://i.postimg.cc/63gpQHgM/photo-4.jpg',
    'https://i.postimg.cc/PrGqsRmx/photo-5.jpg',
    'https://i.postimg.cc/MpqKXf3J/photo-6.jpg',
    'https://i.postimg.cc/Jzx7X7SD/photo-7.jpg',
    'https://i.postimg.cc/8Phz1mHb/photo-8.jpg',
    'https://i.postimg.cc/h4QGYBQ6/photo-9.jpg'
  ];

  for (const photo of photos) {
    await prisma.eventContentImage.create({
      data: {
        eventContent: { connect: { id: event.content.id } },
        image: photo
      }
    });
  }

  await prisma.userEvent.create({
    data: {
      role: 'ADMIN',
      event: {
        connect: { id: event.id }
      },
      user: {
        create: {
          name: 'Igor Wilian Faoro',
          email: 'igor.faoro17@gmail.com'
        }
      }
    }
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
