
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Municipio } from 'src/app/modules/models/municipios';
import { RegiaoBrasil } from 'src/app/modules/models/regiaobrasil';
import { MunicipiosService } from 'src/app/modules/services/municipios.service';


@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.scss']
})
export class MunicipiosComponent implements OnInit {

  selectedMunicipio: string;
  regioesBrasil: RegiaoBrasil[] = [];
  municipioControl = new FormControl('');
  @Input() estadoId?: number;
  @Input() municipios?: Municipio[] = [];
  @Input() id: number;
  @Input() formControlName: string;
  @Output() municipioSelecionado = new EventEmitter<string>();


  constructor(private municipiosService: MunicipiosService) { }

  ngOnInit(): void {
    this.municipiosService.getMunicipiosByEstado(this.estadoId).subscribe(municipios => {
      this.municipios = municipios;
    });
  }
  onMunicipioChange(event: Event) {
    this.municipioSelecionado.emit(this.selectedMunicipio);
  }
  onRegiaoChange(selectedRegiaoId: number) {
    const selectedRegiao = this.regioesBrasil.find(regiao => regiao.id === selectedRegiaoId);
    this.municipios = selectedRegiao.municipios;
  }
}
