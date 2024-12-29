import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function umMunicipoObrigatorioValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const municipios = control.value;
    if (!municipios || municipios.length === 0) {
      return { nenhumaCidade: true };
    }
    return null;
  };
}
