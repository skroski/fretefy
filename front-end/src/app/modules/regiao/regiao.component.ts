import { Component, OnInit, } from '@angular/core';
import { MunicipiosService } from '../services/municipios.service';
import { Regiao } from '../models/regioes';
import { Municipio } from '../models/municipios';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegiaoBrasil } from '../models/regiaobrasil';
import * as XLSX from 'xlsx';
import { nomeUnicoAsyncValidator } from 'src/app/utils/uniqueRegionValidator';
import { EstadosService } from '../services/estados.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estado } from '../models/estado';
import { umMunicipoObrigatorioValidator } from 'src/app/utils/cityRequireOne';
import { municipiosUnicasValidator } from 'src/app/utils/uniqueCity';

@Component({
  selector: 'app-regiao',
  templateUrl: './regiao.component.html',
  styleUrls: ['./regiao.component.scss']
})
export class RegiaoComponent implements OnInit {

  constructor(private fb: FormBuilder, private municipiosService: MunicipiosService, private estadoService: EstadosService) {
    const storedRegioes = localStorage.getItem('regioesLocal');
    if (storedRegioes) {
      this.regioesLocal = JSON.parse(storedRegioes);
    }
    this.regioes$ = this.municipiosService.getRegioesBrasil().pipe(
      map((regioes: Regiao[]) => {
        return regioes;
      })
    );
  }
  regioes$: Observable<Regiao[]>;
  estados$: Observable<Estado[]>;
  municipios$: Observable<Municipio[]>;
  regiaoForm!: FormGroup;
  selectedRegiao!: Regiao;
  regioesLocal: Regiao[] = [];
  regioesBrasil: RegiaoBrasil[] = [];
  nomeRegiao!: string;
  estadoRegiao!: number;
  estadoNome!: string;
  descricaoRegiao!: string;
  municipioRegiao!: string;
  municipioSelecionado: string;
  regiaoFormControl = new FormControl();
  municipioFormControl = new FormControl();
  siglaFormControl = new FormControl();

  isEditing = false;

  ngOnInit(): void {
    this.regiaoForm = this.fb.group({
      nomeRegiao: ['', Validators.required, [nomeUnicoAsyncValidator()]],
      estadoRegiao: ['', Validators.required],
      estadoNome: ['', Validators.required],
      descricaoRegiao: ['', Validators.required],
      municipioRegiao: ['', Validators.required, , [umMunicipoObrigatorioValidator()], municipiosUnicasValidator()],
      ativo: [true]

    });
    this.municipiosService.getRegioesBrasil().subscribe(regioes => {
      this.regioes$ = of(regioes);
    });
    this.estadoService.getEstados().subscribe(estados => {
      this.estados$ = of(estados);
    });

    const storedRegioes = localStorage.getItem('regioesLocal');
    if (storedRegioes) {
      this.regioesLocal = JSON.parse(storedRegioes);
    }
    this.fetchMunicipios();
  }

  fetchMunicipios() {
    const estadoId = this.selectedRegiao ? this.selectedRegiao.id : 0;
    this.municipiosService.getMunicipiosByEstado(estadoId).subscribe(municipios => {
      this.municipios$ = of(municipios);
    });
  }
  onRegiaoChange(regiaoBrasil: any) {

    this.selectedRegiao = regiaoBrasil;
    this.estadoService.getEstadosByRegiao(regiaoBrasil).subscribe(estados => {
      this.estados$ = of(estados);
    });

  }

  onEstadoSelecionado(): void {

    const estadoId = this.regiaoForm.get('estadoRegiao')?.value;

    if (estadoId) {
      this.municipios$ = this.municipiosService.getMunicipiosByEstado(estadoId);
      this.estadoService.getEstadosById(estadoId).subscribe(
        (estadoSelecionado) => {
          if (estadoSelecionado) {
            this.regiaoForm.get('estadoNome')?.setValue(estadoSelecionado.nome);
          } else {
            console.error('Estado não encontrado!');
          }
        },
        (error) => {
          console.error('Erro ao buscar estado:', error);
        }
      );

    }
  }

  onMunicipioSelecionado(municipioForm: string) {
    this.regiaoForm.get('municipioRegiao').setValue(municipioForm);
  }


  salvarRegiao() {
    if (this.regiaoForm.valid) {
      const novaRegiao: Regiao = this.regiaoForm.value;
      novaRegiao.id = this.regioesLocal.length + 1;
      this.regioesLocal.push(novaRegiao);
      localStorage.setItem('regioesLocal', JSON.stringify(this.regioesLocal));
      this.regiaoForm.reset();
      this.isEditing = false;
    }
    else {
      this.regiaoForm.markAllAsTouched();
    }
  }

  editarRegiao(regiao: Regiao) {
    const index = this.regioesLocal.findIndex(r => r.id === regiao.id);
    if (index !== -1) {
      this.regioesLocal[index] = regiao;
    }
    this.regiaoForm.patchValue(regiao);
    this.isEditing = true;
  }

  excluirRegiao(regiao: Regiao) {
    this.regioesLocal = this.regioesLocal.filter(r => r !== regiao);
    localStorage.setItem('regioesLocal', JSON.stringify(this.regioesLocal));
  }
  exportAsExcelFile(): void {
    const worksheetRegioes: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.regioesLocal);
    const workbookRegioes: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbookRegioes, worksheetRegioes, 'Regioes');
    XLSX.writeFile(workbookRegioes, 'regioes.xlsx');
  }




}
