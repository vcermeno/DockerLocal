import React, { useState } from "react";
import SignIn from "../signIn/SignIn";

const Home: React.FC = (props) => {
  // hooks to define state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasProjects, setHasProjects] = useState(false);

  // need to add type for userInfo if not null
  // const [userInfo, setUserInfo] = useState<user[] | null>(null);
  const [userInfo, setUserInfo] = useState([]);

  // display correct page depending on whether user is logged in or has projects
  // if (!isLoggedIn) {
  //   return <SignIn />;
  // } else if (!hasProjects) {
  //   return <GetStarted />;
  // } else {
  //   return <Projects />;
  // }
  return (
    <div>
      <h1> I'm a home component! </h1>
      <SignIn />
    </div>
  );
};

export default Home;