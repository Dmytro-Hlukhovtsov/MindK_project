import React, { useCallback, useContext } from "react";
import GoogleLogin from "react-google-login";
import jwtDecode from "jwt-decode";
import { apiClient } from "../../config/axios";
import configs from "../../configs";
import authContext from "../../authContext";

const GoogleBtn = () => {
  const { setContext } = useContext(authContext);
  const onGoogleAuthSuccess = useCallback((data) => {
    apiClient
      .post(`/auth/google`, {
        access_token: data.accessToken,
      })
      .then((res) => {
        setContext({ token: res.data, user: jwtDecode(res.data.accessToken) });
        localStorage.setItem("token", JSON.stringify(res.data));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  });
  return (
    <GoogleLogin
      clientId={configs.googleClientID}
      buttonText="Login"
      onSuccess={onGoogleAuthSuccess}
      onFailure={(error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      }}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleBtn;
