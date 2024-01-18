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
          shortDescription: 'La Casa Piemont - Farroupilha - RS',
          fullDescription:
            'Espaço de Eventos La Casa Piemont, 240 - Estrada VRS 826 - Linha Boêmios, Farroupilha - RS, 95181-899'
        }
      },
      content: {
        create: {
          primaryColor: '#1E3A8A',
          bannerImage:
            'https://www.weddinggownpreservationkit.com/blog-images/zoom-virtual-wedding-background-lg.jpg',
          logoImage:
            'https://svgur.com/i/126V.svg',
          spotifyPlaylistUrl:
            'https://open.spotify.com/embed/playlist/4repDc6kVmb39JvP5uq4Eb?utm_source=generator'
        }
      },
      financial: {
        create: {
          paypalBusinessCode: 'igor.faoro17@gmail.com'
        }
      },
      weddingDetail: {
        create: {
          brideName: 'Gabrielle',
          groomName: 'Igor'
        }
      },
      gifts: {
        create: [
          {
            description: 'Lingerie para noite de nupcias',
            image:
              'https://artrendablog.files.wordpress.com/2016/01/lingerie-sensual-41.jpg',
            price: 100
          },
          {
            description: 'Cueca sexy para o noivo na noite de nupcias',
            image:
              'https://static.riachuelo.com.br/RCHLO/14081164004/portrait/e67aee6015dfb1a1c4878175f5e84c4fbf2c2de6.jpg',
            price: 70
          },
          {
            description: '3 meses de Netflix para os noivos (pensa no vício)',
            image:
              'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV0ZmxpeHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
            price: 190
          },
          {
            description:
              'Adote um boletinho! Tem de vários jeitos, vocês não vão se arrepender!',
            image:
              'https://infograficos.estadao.com.br/focas/por-minha-conta/dist/images/2ek3e9-2.jpg',
            price: 120
          },
          {
            description: 'Ajuda nos 14 meses de aluguel',
            image:
              'https://aventurasnahistoria.uol.com.br/media/uploads/entretenimento/barriga_madruga_cobrando_1.jpg',
            price: 350
          },
          {
            description: 'Olha o aviãozinho! - Mãeeee',
            image:
              'https://noticiasdatv.uol.com.br/media/_versions/_versions/sbt-topa-tudo-por-dinheiro-silvio-santos-aviaozinho-divulgacao_free_big_fixed_large.jpg',
            price: 100
          },
          {
            description:
              'Rolo de macarrão para a noiva usar quando o noivo aprontar',
            image:
              'https://img.freepik.com/fotos-premium/uma-senhora-idosa-madura-senior-muito-irritada-segurando-um-rolo-de-massa-e-ameacando-bater-em-alguem-com-ele-seu-marido-isolado-em-um-fundo-rosa_255757-9586.jpg',
            price: 70
          },
          {
            description:
              'Capacete para o noivo se proteger do rolo de macarrão (de quem foi a ideia de girico de dar um rolo de macarrão para a noiva?)',
            image:
              'https://img.r7.com/images/2013/12/09/11_54_41_350_file?dimensions=771x420&no_crop=true',
            price: 300
          },
          {
            description:
              'Engov, muito Engov para os noivos que gostam do álcool',
            image:
              'https://araujo.vteximg.com.br/arquivos/ids/4374279-1000-1000/KIT_42664_3.jpg?v=638199566232530000',
            price: 150
          },
          {
            description:
              'Curso de culinária para a noiva (para dar uma folga pro noivo)',
            image:
              'https://s2.glbimg.com/mnKG2t7zn_vZreR61bASMHuh8qY=/e.glbimg.com/og/ed/f/original/2020/04/09/captura_de_tela_2020-04-08_as_17.17.36.png',
            price: 1000
          },
          {
            description:
              'Curso preparatório de aspirantes a pais - Quer um bebê? Pague um curso para nós',
            image:
              'https://paisefilhos.uol.com.br/wp-content/uploads/2019/02/quiroprata-bebe.jpg',
            price: 800
          },
          {
            description:
              'Kit churrasco de patrão - O noivo garante alguns convites',
            image: 'https://i.imgur.com/GAzF7oA.jpg',
            price: 390
          },
          {
            description:
              'Ajude a pagar o cartão de crédito - Sim.... estouramos vários limites hahaha (cada ha é uma lágrima)',
            image:
              'https://s2.glbimg.com/dI_K1sjkkk4Bk3kHqFCLmA6KExw=/620x345/e.glbimg.com/og/ed/f/original/2021/07/20/tweet-nubank_wgVC6ZU.jpg',
            price: 500
          },
          {
            description: '1 mês de ração para os pets',
            image: 'https://i.imgur.com/GWMsaen.jpg',
            price: 130
          },
          {
            description:
              'Cobertor pra Gabi que está sempre coberta..... de razão',
            image: 'https://pbs.twimg.com/media/EoFBb9xXMAAkBTm.jpg',
            price: 60
          },
          {
            description:
              'Dose de paciência para o noivo esperar a noiva se arrumar',
            image:
              'https://i.pinimg.com/originals/4a/6d/2b/4a6d2bbb9a5532f6e8e4d50ae21536d8.jpg',
            price: 120
          },
          {
            description:
              'Gasto com excesso de bagagem para lua de mel (com certeza será da Gabi)',
            image:
              'https://fernandabahia74.files.wordpress.com/2018/01/img_8520.jpg?w=584',
            price: 200
          },
          {
            description:
              'Pagar a Jaque pra cuidar da Aurora e da Maya na lua de mel',
            image: 'https://i.imgur.com/xPMiuoS.jpg',
            price: 350
          },
          {
            description: 'Vale da Shein para noiva renovar o guarda-roupa',
            image: 'https://i.ytimg.com/vi/7TyS4WNtqOY/maxresdefault.jpg',
            price: 100
          },
          {
            description:
              'Cafézinho e pão de queijo no aeroporto (tá mais caro que os fornecedores do casamento kkkk)',
            image:
              'https://vejasp.abril.com.br/wp-content/uploads/2019/07/casa-pao-queijo.jpg?quality=70&strip=info&w=681&resize=1200,800',
            price: 3200
          },
          {
            description: 'Toma aqui uns 50 reais',
            image:
              'https://www.ubirataonline.com.br/wp-content/uploads/2022/01/naiara-azevedo-em-50-reais-instagram.jpg',
            price: 50
          },
          {
            description: 'Jogo da vida pra aprender a viver',
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzhKCoE5C5fy__L8MerRfN-gXMDCEDbfIrw&usqp=CAU',
            price: 110
          },
          {
            description: 'Vale dança do romano pros noivos aprenderem a dançar',
            image:
              'https://vejasp.abril.com.br/wp-content/uploads/2016/12/passinhodoromano.jpg?quality=70&strip=info&w=840&h=540&crop=1',
            price: 310
          },
          {
            description:
              'Espirro nas cidades turísticas que vamos visitar, cada espirro vai um rim',
            image:
              'https://olhosdeturista.com.br/wp-content/uploads/2017/09/voce-so-pensa-em-viajar.jpg',
            price: 700
          },
          {
            description:
              'Lembról pros noivos não esquecerem o aniversário de casamento',
            image:
              'https://rollingstone.uol.com.br/media/uploads/harry-potter-e-a-pedra-filosofal-neville_reproducao.jpg',
            price: 130
          }
        ]
      },
      invitations: {
        create: [
          {
            description: 'Pedro e Ana'
          },
          {
            description: 'João e Mili'
          }
        ]
      },
      handbooks: {
        create: [
          {
            title: 'Manual de Padrinhos',
            description:
              'Guia para nossos padrinhos, com dicas para tornar nosso casamento especial',
            content:
              '<div><ul><li><strong>Vista-se elegantemente</strong> e de acordo com o estilo da cerimônia.<br><li>A cor do evento é: <span style="background-color: #1E3A8A; color: white;">#1E3A8A</span>. Recomendamos que você incorpore essa cor em sua vestimenta, seja em uma gravata, vestido, ou acessório.</li><li><strong>Esteja pronto</strong> para ajudar e apoiar os noivos em todas as fases do casamento.</li><li><strong>Celebre conosco</strong> e divirta-se na festa de casamento!</li></ul><p>Se você tiver alguma dúvida ou precisar de mais informações, entre em contato conosco. Agradecemos por fazer parte deste dia especial!</p></div>'
          },
          {
            title: 'Manual das Daminhas',
            description:
              'Guia para nossas daminhas, com dicas sobre vestimenta e comportamento',
            content:
              '<div><ul><li>Use o vestido de dama de honra que foi escolhido para você. Ele é lindo!</li><li>Lembre-se de sorrir enquanto caminha pelo corredor. Sua alegria é contagiante.</li><li>Aproveite o momento e divirta-se na festa. Haverá uma pista de dança esperando por você!</li><li>Se precisar de ajuda ou tiver alguma pergunta, fale com um adulto de confiança.</li></ul><p>Estamos gratos por você fazer parte deste dia. Vamos criar memórias incríveis juntos!</p></div>'
          },
          {
            title: 'Manual de Convidados',
            description:
              'Guia para nossos convidados, com informações essenciais sobre o evento',
            content:
              '<div><ul><li>Data do Evento: [Inserir Data]</li><li>Local: [Inserir Local]</li><li>Vestimenta: [Inserir Código de Vestimenta]</li><li>Horário: [Inserir Horário]</li></ul><p>Por favor, confirme a sua presença até [Inserir Data de Confirmação]. Se você tiver alguma dúvida, entre em contato conosco. Esperamos vê-lo lá!</p></div>'
          }
        ]
      }
    },
    include: {
      invitations: true,
      content: true
    }
  });

  // create guests
  await prisma.guest.create({
    data: {
      invitation: { connect: { id: event.invitations[0].id } },
      name: 'Pedro'
    }
  });
  await prisma.guest.create({
    data: {
      invitation: { connect: { id: event.invitations[0].id } },
      name: 'Ana'
    }
  });
  await prisma.guest.create({
    data: {
      invitation: { connect: { id: event.invitations[1].id } },
      name: 'João'
    }
  });
  await prisma.guest.create({
    data: {
      invitation: { connect: { id: event.invitations[1].id } },
      name: 'Mili'
    }
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
    'https://lh3.googleusercontent.com/pw/AIL4fc-5Y-_swBtUwpQvmVepDDsv1xb88O02fPM6sPKpmYBtTv1s_LJUeTu5JP6qD24c4VYsFQhrWno9bScxb-LKusZ-CPjvTv1Som3o9wRleVa6sNmu_wLJ=w1920-h1080'
  ];

  for (const photo of photos) {
    await prisma.eventContentImage.create({
      data: {
        eventContent: { connect: { id: event.content.id } },
        image: photo
      }
    });
  }

  // TODO: create users events
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
