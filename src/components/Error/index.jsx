import React from 'react';
import { PAGE_ERROR } from '@/utils/constants';
import ImageNotFound from '@/assets/images/error/not-found.png';
import ImageForbidden from '@/assets/images/error/forbidden.png';

function PageError({ type, title }) {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="text-center">
        <img src={type === PAGE_ERROR.NOT_FOUND ? ImageNotFound : ImageForbidden} alt="img-err" />
        <p className="text-[#000000c4] font-semibold m-5">
          {title}{' '}
          <a href="/" className="text-[#1478ff] italic underline">
            {' '}
            Về trang chủ
          </a>
        </p>
      </div>
    </div>
  );
}

export default PageError;
