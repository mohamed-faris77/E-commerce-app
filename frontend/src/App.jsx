// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Home from './pages/home/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import './styles/index.css';
import About from './pages/About';
import Contact from './pages/Contact';
import MobilePage from './pages/MobilePage';
import EletronicsPage from './pages/ElectronicsPage';
import KitchenHomePage from './pages/KitchenHomePage';
import FashionPage from './pages/FashionPage';
import CustomerService from './pages/CustomerService';
import Careers from './pages/Careers';


function Layout({ children, theme, setTheme }) {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <Layout theme={theme} setTheme={setTheme}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/eletronics" element={<EletronicsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/homeandkitchen" element={<KitchenHomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customer" element={<CustomerService />} />
          <Route path="/mobile" element={<MobilePage />} />
          <Route path="/fashion" element={<FashionPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registe" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />

          {/* Protected Routes - Require Authentication */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Admin Only Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}


export default App;