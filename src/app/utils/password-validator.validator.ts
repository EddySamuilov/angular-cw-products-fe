import { ValidatorFn } from "@angular/forms";

export function passwordValidator(passwordControlName: string, confirPasswordControlName: string): ValidatorFn {
  return (control) => {
    const passwordFormControl = control.get(passwordControlName);
    const confirmPasswordFormControl = control.get(confirPasswordControlName);

    const isPasswordMatch = passwordFormControl?.value === confirmPasswordFormControl?.value;

    return isPasswordMatch ? null : { passwordMismatch: true }
  }
}