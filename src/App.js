// src/App.js
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// ...
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './ProductList.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li className='home'>
              <Link to="/">Home</Link>
            </li>
            <li className='createp'>
              <Link to="/create">Create Product</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/create" element={<ProductForm />} />
          <Route path="/update/:id" element={<ProductForm />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
