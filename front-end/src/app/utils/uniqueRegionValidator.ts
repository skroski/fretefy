import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function nomeUnicoAsyncValidator(): (control: AbstractControl) => Observable<ValidationErrors | null> {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    const nome = control.value?.trim().toLowerCase();
    const regioesLocalStorage = JSON.parse(localStorage.getItem('regioesLocal') || '[]');

    const nomeJaExiste = regioesLocalStorage.some((regiao: any) =>
      regiao.nomeRegiao?.trim().toLowerCase() === nome
    );

    return of(nomeJaExiste).pipe(
      delay(300),
      map(jaExiste => (jaExiste ? { nomeDuplicado: true } : null))
    );
  };
}
