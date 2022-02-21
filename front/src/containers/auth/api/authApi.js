import { apiClient } from "../../../config/axios";

export const authGoogle = (data) => {
  apiClient
    .post(`/auth/google`, {
      access_token: data.accessToken,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
};
