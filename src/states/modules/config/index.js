import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    isLoadingConfig: false,
    config: [],

  },
  reducers: {
    requestGetConfigSocial: (state) => ({
      ...state,
      isLoadingConfig: true,
    }),
    requestGetConfigSocialSuccess: (state, action) => ({
      ...state,
      isLoadingConfig: false,
      config: action.payload.data
    }),
    requestGetConfigSocialFail: (state) => ({
      ...state,
      isLoadingConfig: false,
    }),
  },
});

export const {
  requestGetConfigSocial,
  requestGetConfigSocialSuccess,
  requestGetConfigSocialFail,
} = configSlice.actions;

export default configSlice.reducer;
