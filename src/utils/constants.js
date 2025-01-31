export const STATUS_USER = [];
STATUS_USER['DE_ACTIVE'] = 0;
STATUS_USER['ACTIVE'] = 1;

export const ORDER_STATUS = [];
ORDER_STATUS['PENDING'] = 0;
ORDER_STATUS['COMPLETED'] = 1;
ORDER_STATUS['CANCEL'] = 2;

export const ORDER_STATUS_LABEL = [
  {
    key: ORDER_STATUS['PENDING'],
    label: 'Chờ xác nhận',
    color: 'orange',
  },
  {
    key: ORDER_STATUS['COMPLETED'],
    label: 'Đã xác nhận',
    color: 'green',
  },
  {
    key: ORDER_STATUS['CANCEL'],
    label: 'Đã hủy',
    color: 'red',
  },
];

export const CONFIG_TYPE = {
  BANK: 'BANK',
  LARK: 'LARK',
  OTP: 'OTP',
  SERVICE: 'SERVICE',
};

export const BANK_TEMPLATE_OPTIONS = {
  COMPACT: 'compact',
  COMPACT2: 'compact2',
  QR_ONLY: 'qr_only',
  PRINT: 'print',
};

export const TYPE_MODAL_PACKAGE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};
export const TYPE_MODAL_FEEDBACK = {
  CREATE: 'CREATE_FEEDBACK',
  UPDATE: 'UPDATE_FEEDBACK',
};

export const MAX_STRING_SIZE = 255;

export const STATUS_CUSTOMER = [];
STATUS_CUSTOMER['DE_ACTIVE'] = 0;
STATUS_CUSTOMER['ACTIVE'] = 1;

export const GENDER = {
  MALE: 0,
  FEMALE: 1,
};

export const PACKAGE_TYPE = {
  NORMALLY: 0,
  NEW_ACCOUNT_GIFT: 1,
};

export const OPTION_SELECT_LIMIT = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
];

export const TYPE_SUBMIT = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};

export const PROTECTED = {
  UNPROTECTED: 0,
  PROTECTED: 1,
};

export const PAGE_ERROR = {
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
};

export const CUSTOMER_TYPE = {
  UNCONFIRMED: 'unconfirmed',
  CONFIRMED: 'confirmed',
};

export const TYPE_FILE = [
  'image/jpg',
  'image/JPG',
  'image/jpeg',
  'image/JPEG',
  'image/png',
  'image/PNG',
  'image/svg+xml',
  'image/webp',
];

export const TYPE_IMAGE = {
  PICTURE_ONE: 'PICTURE_ONE',
  PICTURE_TWO: 'PICTURE_TWO',
  PICTURE_THREE: 'PICTURE_THREE',
};

export const PRODUCT_STATUS = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const GENDER_USER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
};

export const STATUS_ACTIVE = {
  INACTIVE: 0,
  ACTIVE: 1,
};

export const STATUS_BOOKING = {
  PENDING: "pending",
  PROCESSING: "processing",
  SUCCESS: "success",
};

export const formatLocalDateTime = {
  "lang": {
      "locale": "en_US",
      "rangePlaceholder": ["Ngày bắt đầu", "Ngày kết thúc"],
      "shortWeekDays": ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      "shortMonths": [
          "Thg 1",
          "Thg 2",
          "Thg 3",
          "Thg 4",
          "Thg 5",
          "Thg 6",
          "Thg 7",
          "Thg 8",
          "Thg 9",
          "Thg 10",
          "Thg 11",
          "Thg 12"
      ],
      "yearFormat": "YYYY",
      "dateFormat": "DD-MM-YYYY",
      "today": "Hôm nay",
      "placeholder": "Chọn ngày",
  }
}
export const monthNames = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];