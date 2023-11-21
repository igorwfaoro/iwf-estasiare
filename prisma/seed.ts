import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  const event = await prisma.event.create({
    data: {
      eventType: 'WEDDING',
      date: dayjs('2024-09-21 16:00:00').toDate(),
      slug: 'casamento-igor-gabi',
      address: {
        create: {
          shortDescription: 'La Casa Piemont - Farroupilha - RS',
          fullDescription:
            'Espaço de Eventos La Casa Piemont, 240 - Estrada VRS 826 - Linha Boêmios, Farroupilha - RS, 95181-899',
        },
      },
      content: {
        create: {
          primaryColor: '#687FF9',
          bannerImage:
            'https://www.weddinggownpreservationkit.com/blog-images/zoom-virtual-wedding-background-lg.jpg',
          logoImage: 'https://casamentoigorgabi.vercel.app/images/logo-ig.svg',
          favicon: 'https://casamentoigorgabi.vercel.app/images/favicon.svg',
          spotifyPlaylistUrl:
            'https://open.spotify.com/embed/playlist/4repDc6kVmb39JvP5uq4Eb?utm_source=generator',
        },
      },
      financial: {
        create: {
          paypalBusinessCode: 'igor.faoro',
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
      content: true,
    },
  });

  // create guests
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

  // create design images
  const photos = [
    'https://lh3.googleusercontent.com/pw/AIL4fc-9B2tKjMXeSjUW1i8e67115RthmMvLXiYHBjJxOBylze0mnaOTfK8gjtWjOZ1-EnAUGbFbBH3iJry34Y66X3kn3BV7OBUQud82j2zlRSOPThUrWk62=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc9VRo6hemKXbpqsRQ_6HY5Qm6g1IIkHV3bR98ocbSe4lenLsJYIj-_XhoPCW2ChdF_kQCsV6L2pRDQlnj7tphpDgWDt7jPG_czZajkqFRDcBnIsXREz=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc95THPBFcW2FbBYainAwbVtQnN1nDJEdNuqsFeNM4RiwetMjM4eXK3yEdoAD07CGtwBrPMVperZoEdrwKiOxHp-WT1-0gVZsTP7eb2PYqVZqXxiJMO_=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc_dIk5Vc6K_jIXKXUW50imE_lnRve4fwKeNDiUPAc3hS0cuqtUBmz4duHAC-qUp12yHFFHjSlD8hPkL84LEH19_iqF68FfxG9PFu5CqpSkP0E6pbOwg=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc9ty7ztSk2r0E8alYYdjObunqvMpiFD3qKY55mlsDNjukGOfWHhxBCZxYNgkgZQJMGs4x7kUGAOzPpD904-FJAv7o2bcNinJ0JI2CJk-o4W0iJoqM4I=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc8mBwasDBw5Syw7VXXW4CIco9UaM_OJRtRbr6KYhLnTykF6mSxYBCjlLWg__6Iy0t60yN-tRIWYGxoLP502X451JQkdUQ6iJZpxbRyA9QLQEEGmBAgu=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc9zO1BnFdre3G1FCBfqwtz2Hngj66jhJDtAfUzAheR-0dwp5oXQpXen768xWqsZhgsepHGwBwHk3Qres2isTWt01qqkSoZhcqVOJ40x1SwIoVBYiGvQ=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc_WDH9S-G1uAVoIGvAuOYiI_DJJdTxMHMT4rOtIbvYW56jBwbT8V7qj2axZbAQgOoDA6EcPR3095NdPvtznyOOE_mq_oBEBflu7JFZDVMYQ3z4c-dvk=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc-8iwjbdzGD_tlAsiO_Lhjb281j0N1BEUHTB7oVR8tNbg7L5IQ8TYZ8rusplQSGlqmglLMFFIGQxQkt1tGyeIFnBvBdUs6a8qp_AUihnmSwICIYviBz=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc9f8FCw_oMADEegEk-DqYkifOQpCMVdNdGL6nNs0iqYde8q4Dj2s3PoUO-feQSk0kh5RU4p_EOqKjAZ3wFrB0JAUO76YNs9X-JXa9aarzXkbB7pdESM=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc8qtajGIccGykczxlQLXoJ6reRe2IEw2xkIjULaCLnqDw3cYWRGNFEn3craRaF4H0fM5CnvplvL6VwAVJf-oSaiNGWpH7hBp9BBLDGi9ZE_6YUosoaJ=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc-LrUZHqsihH0h9zJBwQB26RoLyBfSjqqF5W0LGPU3TXqq7QVzG71-QTRxrR8vRYSun4zf_lL3O-W5eIMOC1vZBzy9Qa6w5ZLr2Vz7QUXg2C7lFRotz=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc_ePKzVShzMi07PvCjWRRskXm4ZVG_Jt4UBEoiQGeSR2a-9y6I1glqL0ZL1JSuLaUHl1SMQuiyXOg9ULJTZMqIm5X0WorPSUeqzDzfAnmQ2qGTVKqhU=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AIL4fc-5Y-_swBtUwpQvmVepDDsv1xb88O02fPM6sPKpmYBtTv1s_LJUeTu5JP6qD24c4VYsFQhrWno9bScxb-LKusZ-CPjvTv1Som3o9wRleVa6sNmu_wLJ=w1920-h1080',
  ];

  for (const photo of photos) {
    await prisma.eventContentImage.create({
      data: {
        eventContent: { connect: { id: event.content.id } },
        image: photo,
      },
    });
  }
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
