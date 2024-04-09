import { Metadata } from 'next';
import HomeNavbar from './components/HomeNavbar/HomeNavbar';
import HomeHeader from './components/HomeHeader/HomeHeader';
import Events from './components/Events/Events';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import { COLORS } from '../util/colors';

const meta = {
  title: 'Estasiare | Construindo momentos mágicos!',
  description:
    'Acreditamos que cada momento especial merece ser celebrado de forma única e inesquecível. Com nossa plataforma intuitiva e flexível, você pode criar o evento dos seus sonhos, seja um casamento mágico, um aniversário emocionante ou qualquer ocasião especial que mereça ser comemorada.',
  image: '/images/logo-profile.png'
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: 'index',
  themeColor: COLORS.primary,
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    type: 'website',
    siteName: `Estasiare`
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    card: 'summary',
    images: meta.image
  }
};

export default async function Home() {
  return (
    <>
      <HomeNavbar />
      <HomeHeader />

      <div className="flex flex-col gap-10 py-10 px-3">
        <Events />
        <About />
      </div>

      <Footer />
    </>
  );
}
