import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MunicipiosModule } from './components/municipios/municipios.module';
import { EstadosService } from './modules/services/estados.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HomeModule,
    MunicipiosModule,
    ToolbarModule,

    AppRoutingModule
  ],
  providers: [EstadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
