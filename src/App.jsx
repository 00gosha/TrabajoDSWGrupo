import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import LatestThreads from './components/LatestThreads.jsx';
import Login from './components/Login.jsx';
import CreateThreadForm from './components/CreateThreadForm.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [threadsRefreshKey, setThreadsRefreshKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);

  return (
    <div className="min-h-screen overflow-hidden bg-void text-chrome">
      <Navbar />
      <main>
        <Hero />
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setSelectedThread(null);
          }}
        />
        <LatestThreads
          refreshKey={threadsRefreshKey}
          selectedCategory={selectedCategory}
          selectedThread={selectedThread}
          onClearCategory={() => setSelectedCategory('')}
          onOpenThread={setSelectedThread}
        />
        <Login />
        <CreateThreadForm
          onThreadCreated={(thread) => {
            setSelectedCategory(thread.category);
            setSelectedThread(thread);
            setThreadsRefreshKey((current) => current + 1);
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
