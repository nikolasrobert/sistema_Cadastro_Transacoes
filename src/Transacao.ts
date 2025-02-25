// definição de dois tipos, despesa e receita
export type TipoTransacao = 'despesa' | 'receita';

// declaração da classe Transacao
export class Transacao {
  //contador para gerar ID unico
  private static proximoId: number = 1;

  //tipando
  public id: number;
  public descricao: string;
  public valor: number;
  public tipo: TipoTransacao;
  public idPessoa: number;

  //fazendo o constructor da classe
  constructor(descricao: string, valor: number, tipo: TipoTransacao, idPessoa: number) {
    //incremento de ID
    this.id = Transacao.proximoId++;
    this.descricao = descricao;
    this.valor = valor;
    this.tipo = tipo;
    this.idPessoa = idPessoa;
  }
}
