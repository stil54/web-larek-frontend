import { validateEmail, validatePhone } from '../utils/validation';

export class OrderForm {
  private submitButton: HTMLButtonElement;

  constructor() {
    this.submitButton = document.getElementById('submit-order')! as HTMLButtonElement;
    this.setupValidation();
  }

  private setupValidation(): void {
    const emailInput = document.getElementById('email')! as HTMLInputElement;
    const phoneInput = document.getElementById('phone')! as HTMLInputElement;

    [emailInput, phoneInput].forEach(input => {
      input.addEventListener('input', () => {
        const isEmailValid = validateEmail(emailInput.value);
        const isPhoneValid = validatePhone(phoneInput.value);
        this.submitButton.disabled = !(isEmailValid && isPhoneValid);
      });
    });
  }
}