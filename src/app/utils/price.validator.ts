import { ValidatorFn } from '@angular/forms';

export function priceValidator(): ValidatorFn {
  return (control) => {
    const isValid = control.value === '' || control.value >= 0;
    return isValid ? null : { invalidPrice: true };
  };
}