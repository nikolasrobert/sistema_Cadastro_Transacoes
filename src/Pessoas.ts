//declarando a classe Pessoa
export class Pessoa {
    private static proximoId: number = 1;
  
    public id: number;
    public nome: string;
    public idade: number;
  
    constructor(nome: string, idade: number) {
      this.id = Pessoa.proximoId++;
      this.nome = nome;
      this.idade = idade;
    }
  }
  