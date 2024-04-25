import { useState } from 'react'
import './App.css'
// import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar/> */}
      <Outlet/>
    </>
  )
}

export default App


// import { useState } from 'react';
// import './App.css';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Components/Sidebar'; 
// import Signin from './Components/Signin'; 

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Function to handle login
//   const handleLogin = () => {
//     // Perform login logic
//     setIsLoggedIn(true);
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     // Perform logout logic
//     setIsLoggedIn(false);
//   };

//   return (
//     <>
//       {isLoggedIn ? <Sidebar onLogout={handleLogout} /> : <Signin onLogin={handleLogin} />}
//       <Outlet />
//     </>
//   );
// }

// export default App;
