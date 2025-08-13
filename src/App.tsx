import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* main content area grows to fill space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
