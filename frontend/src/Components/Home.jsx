// import React, { useState } from "react";
// import FrontpageLogo from "../assets/Frontpage_logo.gif";
// import SignIn from "./Signin.jsx";
// import SignUp from "./Signup.jsx";
// const Home = () => {
//   const [isSigningUp, setIsSigningUp] = useState(true);
//   const handleSwitchForm = () => {
//     setIsSigningUp(!isSigningUp);
//   };
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="container mx-auto ">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 flex flex-col items-center bg-blue-500 rounded-l-3xl py-4 px-4">
//             <img
//               src={FrontpageLogo}
//               alt="Frontpage Logo"
//               className="max-w-xs h-max"
//             />
//             <p className="text-3xl font-bold mb-4 text-white">Twitter EHR</p>
//             <p className="text-sm text-gray-200 text-center pb-2">
//               Real-time dashboard offers secure updates and patient engagement
//               in healthcare.
//             </p>
//           </div>
//           <div className="md:w-1/2 flex flex-col items-center bg-slate-200 rounded-r-3xl">
//             {isSigningUp ? <SignUp /> : <SignIn />}
//             <p className="text-sm text-gray-600">
//               {isSigningUp
//                 ? "Already have an account? "
//                 : "Don't have an account? "}

//               <button onClick={handleSwitchForm} className="text-blue-500">
//                 {isSigningUp ? "Sign In" : "Sign Up"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Home;



// Responsive Code

import React, { useState } from "react";
import FrontpageLogo from "../assets/Frontpage_logo.gif";
import SignIn from "./Signin.jsx";
import SignUp from "./Signup.jsx";

const Home = () => {
  const [isSigningUp, setIsSigningUp] = useState(true);

  const handleSwitchForm = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex flex-col items-center bg-blue-500 md:rounded-l-3xl py-4 px-4">
            <img
              src={FrontpageLogo}
              alt="Frontpage Logo"
              className="max-w-xs h-max"
            />
            <p className="text-3xl font-bold mb-4 text-white">Twitter EHR</p>
            <p className="text-sm text-gray-200 text-center pb-2">
              Real-time dashboard offers secure updates and patient engagement
              in healthcare.
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col items-center bg-slate-200 md:rounded-r-3xl md:mt-0">
            {isSigningUp ? <SignUp /> : <SignIn />}
            <p className="text-sm text-gray-600">
              {isSigningUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button onClick={handleSwitchForm} className="text-blue-500">
                {isSigningUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
