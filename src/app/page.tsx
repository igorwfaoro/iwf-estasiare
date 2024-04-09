import { Metadata } from 'next';
import HomeNavbar from './components/HomeNavbar/HomeNavbar';
import HomeHeader from './components/HomeHeader/HomeHeader';
import Events from './components/Events/Events';
import About from './components/About/About';
import Footer from './components/Footer/Footer';

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
