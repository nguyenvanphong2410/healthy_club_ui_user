import { createOrder, createOrderFailure, createOrderSuccess, createQR, createQRFailure, createQRSuccess } from "@/states/modules/order/index.js";
import callApi from "../callApi.js";

export const requestCreateOrder = (idCourse, idClassRegisterOfCourse) => async (dispatch, getState) => {
  
  return callApi({
    method: 'post',
    apiPath: `user/orders/course/${idCourse}/${idClassRegisterOfCourse}`,
    actionTypes: [
      createOrder,
      createOrderSuccess,
      createOrderFailure,
    ],
    variables: {},
    dispatch,
    getState
  })
}

export const requestCreateOrderAndQR = (idCourse, idClassRegisterOfCourse) => async (dispatch, getState) => {
  // Gọi API để tạo order trước
  const orderResponse = await dispatch(requestCreateOrder(idCourse, idClassRegisterOfCourse));

  // Kiểm tra nếu orderResponse thành công thì lấy orderCreate từ state
  const orderCreate = getState().order.orderCreate;

  if (orderCreate && orderCreate._id) {
    // Tiếp tục gọi API để tạo QR code với orderId là orderCreate._id
    await dispatch(requestCreateQR(orderCreate._id));
  } else {
    console.error("Không thể lấy orderCreate._id từ state");
  }
}

export const requestCreateQR = (orderId) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `user/orders/${orderId}/qr-code`,
    actionTypes: [
      createQR,
      createQRSuccess,
      createQRFailure,
    ],
    variables: {},
    dispatch,
    getState
  })
}
