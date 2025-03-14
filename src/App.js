// import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import store from "./redux/authentication/store";
import LoginComponent from "./components/LoginComponent";
import Header from "./components/Header";
// import ProtectedComponent from "./components/Users";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import SignupComponent from './Pages/SignupComponent';
import Cart from './Pages/Cart';
import Products from './Pages/Products';
import Profile from './Pages/Profile';
function App() {
  return (
    // <Provider store={store}>
    //   <LoginComponent/>
    //   <ProtectedComponent/>
    // </Provider>
    <Provider store={store}>
    <Router>
    <Header/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginComponent />} />
    <Route path="/signup" element={<SignupComponent />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products" element={<Products />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </Router>
    </Provider>
  );
}

export default App;
