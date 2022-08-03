import React, { useCallback, useContext } from "react";
import FacebookLogin from "react-facebook-login";
import jwtDecode from "jwt-decode";
import { apiClient } from "../../config/axios";
import configs from "../../configs";
import authContext from "../../authContext";

const FacebookBtn = () => {
  const { setContext } = useContext(authContext);
  const onFacebookAuthSuccess = useCallback((data) => {
    apiClient
      .post(`/auth/facebook`, {
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
    <FacebookLogin
      appId={configs.facebookClientId}
      fields="name,email"
      scope="public_profile, user_friends"
      callback={onFacebookAuthSuccess}
      icon="fa-facebook"
    />
  );
};

export default FacebookBtn;
