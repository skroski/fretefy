import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function municipiosUnicasValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const municipios = control.value;
    const municipiosLocalStorage = JSON.parse(localStorage.getItem('regioesLocal') || '[]');

    const municipiosExistentes = municipiosLocalStorage.some((municipio: any) => municipio.municipios || []);

    const municipioDuplicado = municipios.some((municipio: string) =>
      municipiosExistentes.includes(municipio)
    );

    return municipioDuplicado ? { municipioDuplicadoLocalStorage: true } : null;
  };
}
