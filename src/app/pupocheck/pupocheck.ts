import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

export function noAdminValidator(control: AbstractControl):
  ValidationErrors | null {
  const text = control.value as string;
  if (text &&
    text.toLowerCase().includes('admin')) {
    return {
      adminForbidden: true
    };
  } return null;
}

export function passwordMatchValidator(group: AbstractControl):
  ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (pass !== confirm) {
    return { passwordsMismatch: true };
  } return null;
}

export function phoneValidator(control: AbstractControl):
  ValidationErrors | null {
  const text = control.value as string;
  if (text && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(text)) {
    return { badPhone: true };
  } return null;
}

export function cityValidator(control: AbstractControl):
  ValidationErrors | null {
  const text = control.value as string;
  const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Нижний Новгород'];
  if (text && !cities.includes(text)) {
    return { badCity: true };
  } return null;
}

export function noProfanityValidator(control: AbstractControl):
  ValidationErrors | null {
  const text = (control.value as string) || '';
  const bad = ['дурак', 'глупый', 'тупой'];
  if (bad.some((word) => text.toLowerCase().includes(word))) {
    return { profanity: true };
  } return null;
}

@Component({
  selector: 'app-pupocheck',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './pupocheck.html',
  styleUrl: './pupocheck.css',
})

export class Pupocheck {

  public regForm = new FormGroup({
    login: new FormControl('', [
      Validators.required, Validators.minLength(3), noAdminValidator ]),
    email: new FormControl('', [
      Validators.required, Validators.email ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(6),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$') ]),
    confirmPassword: new FormControl('', [
      Validators.required ]),
    name: new FormControl('', [
      Validators.required, Validators.minLength(2),
      Validators.pattern('^[А-Яа-яЁё\\s-]+$') ]),
    age: new FormControl('', [
      Validators.required, Validators.pattern('^[0-9]+$'),
      Validators.min(16), Validators.max(100) ]),
    phone: new FormControl('', [
      Validators.required, phoneValidator ]),
    city: new FormControl('', [
      Validators.required, cityValidator ]),
    comment: new FormControl('', [
      Validators.maxLength(200), noProfanityValidator ]),
    agree: new FormControl(false, [
      Validators.requiredTrue ]),
  }, { validators: passwordMatchValidator });

  public bad(name: string, error: string): boolean {
    const field = this.regForm.get(name);
    return !!field && field.touched && field.hasError(error);
  }

  public badForm(error: string): boolean {
    return this.regForm.touched && this.regForm.hasError(error);
  }

  public onSubmit(): void {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      alert('Не успешно! Заполни форму правильно');
      return;
    }
    console.log('Собранные данные:', this.regForm.value);
    alert('Успешно! Все данные отправлены на проверку');
    this.regForm.reset();
  }

}
