import { Municipio } from "./municipios";

export interface RegiaoBrasil {
  id: number;
  nome: string;
  sigla: string;
  municipios: Municipio[];
}
