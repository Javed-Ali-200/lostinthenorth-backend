import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Package from './pages/Package';
import Book from './pages/Book';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/package" element={<Package />} />
      <Route path="/book" element={<Book />} />
    </Routes>
  );
}

export default App;