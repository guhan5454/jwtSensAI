import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserSignup from './pages/userSignup.js';
import Home from './pages/home.js'
import UserLogin from './pages/UserLogin.js';
import UserDashboard from './pages/UserDashboard.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route>
            <Route exact path="/" element={<Home />} />
            <Route path="/auth/user/login" element={<UserLogin/>} />
            <Route path="/auth/user/signup" element={<UserSignup />} />
            <Route path='/user/dashboard' element={<UserDashboard />} />
            {/* <Route path="/admin-dashboard" component={AdminDashboardPage} /> */}
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
