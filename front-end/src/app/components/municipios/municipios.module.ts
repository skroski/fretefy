import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipiosComponent } from './municipios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [MunicipiosComponent],
  exports: [MunicipiosComponent]
})
export class MunicipiosModule { }
