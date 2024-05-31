import About from './components/About/About';
import Events from './components/Events/Events';
import Footer from './components/Footer/Footer';
import HomeHeader from './components/HomeHeader/HomeHeader';
import Navbar from './components/Navbar/Navbar';

export default async function Home() {
  return (
    <main className='bg-gray-100'>
      <Navbar />
      <HomeHeader />

      <div className="flex flex-col gap-10 py-10 px-3">
        <Events />
        <About />
      </div>

      <Footer />
    </main>
  );
}
