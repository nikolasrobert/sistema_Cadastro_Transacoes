// importa a classe pessoa
import { Pessoa } from './Pessoas';

// importa a classe Transacao e TipoTransacao
import { Transacao, TipoTransacao } from './Transacao';


//declaração da ControleGastos
export class ControleGastos {
  //arrays privados pois nao devem ser disponibilizados
  private pessoas: Pessoa[] = [];
  private transacoes: Transacao[] = [];


  //método adicionarPessoa, recebe nome e idade
  public adicionarPessoa(nome: string, idade: number): Pessoa {
    const pessoa = new Pessoa(nome, idade);
    this.pessoas.push(pessoa);
    return pessoa;
  }

  //método adicionarTransacao, recebe descrição, valor, tipo de transação e o ID, todos tipados
  public adicionarTransacao(
    descricao: string,
    valor: number,
    tipo: TipoTransacao,
    idPessoa: number
  ): Transacao | string {

    // procura pelo ID especificado
    const pessoa = this.pessoas.find(p => p.id === idPessoa);
    // verificações de erro
    if (!pessoa) {
      return "Pessoa não encontrada.";
    }
    if (pessoa.idade < 18 && tipo === 'receita') {
      return "Pessoas menores de 18 anos não podem ter receitas.";
    }
    const transacao = new Transacao(descricao, valor, tipo, idPessoa);
    //adiciona a Transacao criada para o array transacao e o retorna
    this.transacoes.push(transacao);
    return transacao;
  }


  //método consultarTotais retorna a pessoa, o total das receitas e das despesas e faz o cálculo do saldo
  public consultarTotais() {
    //mapeamento de cada pessoa para um objeto contendo as informações necessárias para fazer o retorno
    const totaisPorPessoa = this.pessoas.map(pessoa => {
      const transacoesPessoa = this.transacoes.filter(transacao => transacao.idPessoa === pessoa.id);
      const totalReceitas = transacoesPessoa
        .filter(transacao => transacao.tipo === 'receita')
        .reduce((soma, transacao) => soma + transacao.valor, 0);
      const totalDespesas = transacoesPessoa
        .filter(transacao => transacao.tipo === 'despesa')
        .reduce((soma, transacao) => soma + transacao.valor, 0);
      return {
        pessoa,
        totalReceitas,
        totalDespesas,
        saldo: totalReceitas - totalDespesas,
      };
    });

    //calculo do total geral de receita e despesas somando o total de cada pessoa
    let totalReceitasGeral = 0;
    let totalDespesasGeral = 0;

    for (let i = 0; i < totaisPorPessoa.length; i++) {
      totalReceitasGeral += totaisPorPessoa[i].totalReceitas;
      totalDespesasGeral += totaisPorPessoa[i].totalDespesas;
    }

    
    //retorna um objeto contendo o total por pessoa e a informação geral
    return {
      totaisPorPessoa,
      geral: {
        totalReceitas: totalReceitasGeral,
        totalDespesas: totalDespesasGeral,
        saldo: totalReceitasGeral - totalDespesasGeral,
      }
    };
  }
}
