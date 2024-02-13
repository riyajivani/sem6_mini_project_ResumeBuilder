import React from "react";
import Logo  from '../assets/logo1.png';
import { Footer } from "../containers";
import {AuthButtonWithProvider} from "../component";
import {FaGoogle, FaGithub} from 'react-icons/fa6'

const Authentication = () => {

  return (
    <div className="auth-section">
      {/* top section */}
      <img src={Logo} className="w-12 h-auto object-contain" alt="" />

      
      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-3xl lg:text-4xl text-purple-700">Welcome to RESUME BUILDER</h1>
        <p className="text-base text-gray-600">let's create resume</p>
        <h2 className="text-2xl text-gray-600">Authenticate</h2>
      
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6">
          <AuthButtonWithProvider Icon={FaGoogle} label={"SignIn with Google"} provider={"GoogleAuthProvider" } />
          <AuthButtonWithProvider Icon={FaGithub} label={"SignIn with Github"} provider={"GithubAuthProvider" }/>
        </div>

      </div>

      
      {/* footer section */}
      <Footer />
      
    </div>
  );
};

export default Authentication;
