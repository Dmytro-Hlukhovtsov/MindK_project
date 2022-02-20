import { useCallback, useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useQuery } from "react-query";
import configs from "../../configs";
import { authGoogle } from "../../containers/auth/api/authApi";
import { apiClient } from "../../config/axios";

const Login = () => {
  const [auth, setAuth] = useState(true);

  const onGoogleAuthSuccess = useCallback((data) => {
    apiClient
      .post(`/auth/google`, {
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

  console.log(onFacebookAuthSuccess);
  return (
    <div>
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
      <FacebookLogin
        appId={configs.facebookClientId}
        autoLoad
        fields="name,email"
        scope="public_profile, user_friends"
        callback={onFacebookAuthSuccess}
        icon="fa-facebook"
      />
      {auth && (
        <div>
          accessToken:
          {auth.accessToken}
          <br />
          refreshToken:
          {auth.refreshToken}
          <br />
          succeed
        </div>
      )}
    </div>
  );
};

export default Login;
