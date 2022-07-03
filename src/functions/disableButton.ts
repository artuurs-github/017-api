import { RefObject } from 'react';

const disableButton = (
  buttonPrevious: RefObject<HTMLButtonElement>,
  buttonNext: RefObject<HTMLButtonElement>,
  currentPage: number,
  totalPages: string,
) => {
  if (buttonPrevious.current && buttonNext.current) {
    if (currentPage === 1) {
      buttonPrevious.current.classList.add('app-button-disabled');
    } else {
      buttonPrevious.current.classList.remove('app-button-disabled');
    }

    if (currentPage === Number(totalPages)) {
      buttonNext.current.classList.add('app-button-disabled');
    } else {
      buttonNext.current.classList.remove('app-button-disabled');
    }
  }
};

export default disableButton;
