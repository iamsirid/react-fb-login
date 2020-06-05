import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
const Facebook = () => {
  const [isLogin, setIsLogin] = useState(false);
  const initialLoginData = {
    userID: '',
    name: '',
    email: '',
    picture: {},
  };
  const [loginData, setLoginData] = useState(initialLoginData);

  useEffect(() => {
    setIsLogin(!!loginData.userID);
  }, [loginData]);

  let fbContent;

  const fbLoginHandler = () => console.log('clicked');

  const logoutHandler = (e) => {
    window.FB.logout();
    setLoginData(initialLoginData);
  };

  const responseFacebook = (res) => {
    setLoginData({
      userID: res.userID,
      name: res.name,
      email: res.email,
      picture: res.picture,
    });
  };
  if (isLogin) {
    fbContent = (
      <div>
        <p>{loginData.userID}</p>
        <p>Name: {loginData.name}</p>
        <p>{loginData.email}</p>
        {loginData.picture.data && (
          <img src={loginData.picture.data.url} alt="" />
        )}
        <p>
          <button onClick={logoutHandler}>logout</button>
        </p>
      </div>
    );
  } else {
    fbContent = (
      <FacebookLogin
        appId="2552113601785709"
        // autoLoad={true}
        fields="name,email,picture"
        onClick={fbLoginHandler}
        callback={responseFacebook}
      />
    );
  }
  return (
    <div>
      {fbContent}
      <p>UserID: {loginData.userID}</p>
    </div>
  );
};

export default Facebook;
