import React, { useState, useEffect } from "react";
import Home from "./Home";
import SignIn from "../signIn/SignIn";

const Routes: React.FC = (props) => {
  // hooks to define state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasProjects, setHasProjects] = useState(false);
  const [rendered, setRendered] = useState(<SignIn />);


  // need to add type for userInfo if not null
  // const [userInfo, setUserInfo] = useState<user[] | null>(null);
  const [userInfo, setUserInfo] = useState({username: 'tom', id: 'abc'});

  // runs on render and checks 'isloggedin' display correct page depending on whether user is logged in 
  // could add logic for 'hasprojects'
  // need to make prettier
  useEffect(()=> {
    if (isLoggedIn) {
      setRendered(
                    <Home
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                    />
                    )
    } else setRendered(<SignIn />)
  }, [isLoggedIn])
  
  return (
    <div>
      <button onClick={(): void=> setIsLoggedIn(!isLoggedIn)} >TOGGLE BUTTON FOR DEBUG</button>
      {rendered}
    </div>
  );
};

export default Routes;