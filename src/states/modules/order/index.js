import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isLoadingCreateOrder: false,
    isLoadingCreateQR: false,

    linkQR: '',
    orderCreate: {},
    orderCurrent: 0,
    courseSelectedToOrder: {},
  },
  reducers: {
    setOrderCurrent: (state, action) => ({
      ...state,
      orderCurrent: action.payload,
    }),

    setCourseSelectedToOrder: (state, action) => ({
      ...state,
      courseSelectedToOrder: action.payload,
    }),

    //Tạo đơn
    createOrder: (state) => ({
      ...state,
      isLoadingCreateOrder: true,
    }),
    createOrderSuccess: (state, action) => ({
      ...state,
      isLoadingCreateOrder: false,
      orderCreate: action.payload.data,
    }),
    createOrderFailure: (state) => ({
      ...state,
      isLoadingCreateOrder: false,
    }),

    //Tạo QR
    createQR: (state) => ({
      ...state,
      isLoadingCreateQR: true,
    }),
    createQRSuccess: (state, action) => ({
      ...state,
      isLoadingCreateQR: false,
      linkQR: action.payload.data,
    }),
    createQRFailure: (state) => ({
      ...state,
      isLoadingCreateQR: false,
    }),
  },
});

export const { 
  setOrderCurrent, 
  setCourseSelectedToOrder,

  createOrder,
  createOrderSuccess,
  createOrderFailure,

  createQR,
  createQRSuccess,
  createQRFailure,
 } = orderSlice.actions;

export default orderSlice.reducer;
