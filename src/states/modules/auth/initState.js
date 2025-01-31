import { GENDER, GENDER_USER } from "@/utils/constants";

export const initInfoRegister = {
  name: '',
  email: '',
  gender: GENDER_USER.OTHER,
  password: '',
  confirmPassword: '',
  phone: '',
};

export const errInfoRegister = {
  name: '',
  email: '',
  gender: '',
  password: '',
  confirmPassword: '',
  phone: '',
};