
import { requestGetConfigSocial, requestGetConfigSocialFail, requestGetConfigSocialSuccess } from "@/states/modules/config";
import callApi from "../callApi";

export const requestConfig = () => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: "/contact-information",
    actionTypes: [
      requestGetConfigSocial,
      requestGetConfigSocialSuccess,
      requestGetConfigSocialFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
};
