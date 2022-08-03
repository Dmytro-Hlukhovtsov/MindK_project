import React, { useCallback } from "react";
import FacebookLogin from "react-facebook-login";
import { apiClient } from "../../config/axios";
import configs from "../../configs";

const FacebookBtn = ({ setAuth }) => {
  const onFacebookAuthSuccess = useCallback((data) => {
    apiClient
      .post(`/auth/facebook`, {
        access_token: data.accessToken,
      })
      .then((res) => {
        setAuth(res.data);
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
