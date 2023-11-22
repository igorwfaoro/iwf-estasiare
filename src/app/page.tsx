import { Metadata } from 'next';
import './page.scss';
import HomeNavbar from './components/HomeNavbar';
import HomeHeader from './components/HomeHeader';
import Events from './components/Events';
import About from './components/About';
import Footer from './components/Footer';

export const metadata: Metadata = {
  // description: event.titleDescription,
  // robots: 'index',
  // themeColor: event.content.primaryColor,
  // openGraph: {
  //   description: event.titleDescription,
  //   ...(event.content.logoImage && { images: event.content.logoImage }),
  //   type: 'website',
  //   siteName: `Eventy`,
  // },
  // twitter: {
  //   title: event.titleDescription,
  //   description: `${event.titleDescription} | Eventy`,
  //   card: 'summary',
  //   ...(event.content.logoImage && { images: event.content.logoImage }),
  // },
};

export default async function Home() {
  return (
    <div id="page-home">
      <HomeNavbar />
      <HomeHeader />
      <Events />
      <About />
      <Footer />
    </div>
  );
}
