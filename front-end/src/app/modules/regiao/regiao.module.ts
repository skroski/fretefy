import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiaoComponent } from './regiao.component';
import { RegiaoRoutingModule } from './regiao.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MunicipiosModule } from 'src/app/components/municipios/municipios.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MunicipiosModule,
    ReactiveFormsModule,
    HttpClientModule,
    RegiaoRoutingModule
  ],
  declarations: [RegiaoComponent],
  exports: [RegiaoComponent]
})
export class RegiaoModule { }
