import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import { Home } from './Pages/Home/Home.tsx'; // Corrected to named import
import EventBooking from './Pages/eventBooking/eventBooking.tsx';
import LoginPage from './Pages/LoginPage/LoginPage.tsx';
import CreateEvent from './Pages/CreateEvent/CreateEvent.tsx';
import Checkout from './Pages/CheckoutPage/Checkout.tsx';
import SignUp from './Pages/SignUp/Signup.tsx';
import MyEvents from './Pages/MyEvents/MyEvents.tsx';
import EditEvent from './Pages/EditEvent/EditEvent.tsx'; // Included if needed
import Logout from './components/Logout.tsx';
import NotFoundPage from './Pages/PageNotFound/PageNotFound.tsx';

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(Boolean(localStorage.getItem('userEmail')));

  const handleLogin = () => {
    // Simulate successful login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulate logout
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar loggedIn={isLoggedIn} />
        <div className="content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Use the named import here */}
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/edit-event/:eventId" element={<EditEvent />} /> {/* Included if needed */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/events-organized" element={<MyEvents />} />
            <Route path="/event-booking/:eventId" element={<EventBooking />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>  
    </Router>
  );
}

export default App;
