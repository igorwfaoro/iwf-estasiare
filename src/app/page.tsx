import { Metadata } from 'next';
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
