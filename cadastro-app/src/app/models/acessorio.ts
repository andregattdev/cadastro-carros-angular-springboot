export class Acessorio {
  id!: number;
  nome!: string;
  descricao?: string;

  constructor(id?: number, nome?: string, descricao?: string) {
    if (id) this.id = id;
    if (nome) this.nome = nome;
    if (descricao) this.descricao = descricao;
  }
}
