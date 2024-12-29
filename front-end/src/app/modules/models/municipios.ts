export interface Municipio {
  id: number;
  nome: string;
  microrregiao: {
    nome: string;
    mesorregiao: {
      nome: string;
      UF: {
        sigla: string;
        nome: string;
      };
    };
  };
}
