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
      address: {
        create: {
          formattedAddress:
            'Espaço de Eventos La Casa Piemont, 240 - Estrada VRS, 826 - Linha Boêmios, Farroupilha - RS, 95181-899, Brasil',
          street: 'Estrada VRS',
          number: '826',
          zipCode: '95181-899',
          neighborhood: null,
          city: 'Farroupilha',
          state: 'RS',
          country: 'Brasil',
          latitude: -29.3090002,
          longitude: -51.3144784
        }
      },
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

  const providerCategories = [
    'Fotografia',
    'Vídeo',
    'Espaço para Evento',
    'Catering',
    'Decoração',
    'Música',
    'Entretenimento',
    'Cerimonialista',
    'Moda e Vestuário',
    'Beleza',
    'Transporte',
    'Papelaria',
    'Lembranças',
    'Equipamentos',
    'Som',
    'Assessoria Jurídica',
    'Assessoria Financeira',
    'Segurança',
    'Limpeza',
    'Serviços para Crianças',
    'Outro'
  ];

  for (const category of providerCategories) {
    await prisma.providerCategory.create({
      data: {
        description: category
      }
    });
  }

  await prisma.providerCategory.create({
    data: {
      description: 'Outro',
      isOther: true
    }
  });

  const providerlinkTypes = [
    {
      name: 'Instagram',
      icon: 'FaInstagram',
      urlStructure: 'https://instagram.com/{{urlKey}}'
    },
    {
      name: 'WhatsApp',
      icon: 'FaWhatsapp',
      urlStructure: 'https://wa.me/{{urlKey}}'
    },
    {
      name: 'E-mail',
      icon: 'FaEnvelope',
      urlStructure: 'mailto:{{urlKey}}'
    }
  ];

  for (const type of providerlinkTypes) {
    await prisma.providerLinkType.create({
      data: type
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

  await prisma.providerCategory.createMany({
    data: [
      { description: 'Fotografia' },
      { description: 'Vídeo' },
      { description: 'Espaços para Eventos' },
      { description: 'Catering' },
      { description: 'Decoração' },
      { description: 'Música' },
      { description: 'Entretenimento' },
      { description: 'Cerimonialistas' },
      { description: 'Moda e Vestuário' },
      { description: 'Beleza' },
      { description: 'Transporte' },
      { description: 'Papelaria' },
      { description: 'Lembranças' },
      { description: 'Equipamentos' },
      { description: 'Som' },
      { description: 'Assessoria Jurídica' },
      { description: 'Assessoria Financeira' },
      { description: 'Segurança' },
      { description: 'Limpeza' },
      { description: 'Serviços para Crianças' },
      { description: 'Outro', isOther: true }
    ]
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
