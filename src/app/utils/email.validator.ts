import { ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const regExp = new RegExp(`[A-Za-z0-9]{6,}@gmail\.(bg|com)`);
  return (control) => {
    const isValid = control.value === '' || regExp.test(control.value);
    return isValid ? null : { invalidEmail: true };
  };
}