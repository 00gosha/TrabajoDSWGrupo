import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import LatestThreads from './components/LatestThreads.jsx';
import Login from './components/Login.jsx';
import CreateThreadForm from './components/CreateThreadForm.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-void text-chrome">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <LatestThreads />
        <Login />
        <CreateThreadForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
