import React, { useContext, useEffect } from 'react';
import './App.css';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthContext, FirebaseContext} from './store/Context';
import Create from './Pages/Create'
import View from './Pages/ViewPost'



function App() {
  

  const {user,setUser}=useContext(AuthContext)
  const {auth, db}=useContext(FirebaseContext)
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((username) => {
      setUser(username);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view/:productId" element={<View />} />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
