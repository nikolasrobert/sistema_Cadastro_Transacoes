
import { ControleGastos } from './Controle_Gastos';


const sistema = new ControleGastos();

// função para atualizar os resultados na tela 
function atualizarResultado() {
  const totais = sistema.consultarTotais();
  const resultadoFormatado = document.getElementById('resultado');
  if (resultadoFormatado ) {
    // converte os totais para um formato legível em JSON
    resultadoFormatado .textContent = JSON.stringify(totais, null, 2);
  }
}

// cadastro da pessoa
const formPessoa = document.getElementById('formPessoa') as HTMLFormElement;
if (formPessoa) {
  formPessoa.addEventListener('submit', (e) => {
    e.preventDefault();     //não recarregar pagina

    // pegando os elementos digitados no formulário
    const nomeInput = document.getElementById('nomePessoa') as HTMLInputElement;
    const idadeInput = document.getElementById('idadePessoa') as HTMLInputElement;
    const nome = nomeInput.value;
    const idade = parseInt(idadeInput.value, 10);

    // adiciona pessoa ao sistema
    const pessoa = sistema.adicionarPessoa(nome, idade);
    //alert para gerar dinamismo ao usuário, para que saiba que está funcionando
    alert(`Pessoa cadastrada com sucesso! ID: ${pessoa.id}`);

    // limpa os campos do formulário e atualiza os resultados na tela
    formPessoa.reset();
    atualizarResultado();
  });
}

// cadastro de Transação
const formTransacao = document.getElementById('formTransacao') as HTMLFormElement;
if (formTransacao) {
  formTransacao.addEventListener('submit', (e) => {
    e.preventDefault(); //evita recarregamento

    // pega elementos do digitados no formulário
    const descricaoInput = document.getElementById('descricaoTransacao') as HTMLInputElement;
    const valorInput = document.getElementById('valorTransacao') as HTMLInputElement;
    const tipoSelect = document.getElementById('tipoTransacao') as HTMLSelectElement;
    const idPessoaInput = document.getElementById('pessoaTransacao') as HTMLInputElement;

    const descricao = descricaoInput.value;
    const valor = parseFloat(valorInput.value);
    const tipo = tipoSelect.value as 'receita' | 'despesa';
    const idPessoa = parseInt(idPessoaInput.value, 10);
    
    // adiciona a transação ao sistema e tratamento de erros
    const resultado = sistema.adicionarTransacao(descricao, valor, tipo, idPessoa);
    if (typeof resultado === 'string') {
      alert(`Erro: ${resultado}`);
    } else {
      // caso de tudo certo
      alert(`Transação cadastrada com sucesso! ID: ${resultado.id}`);
    }

    // limpa os campos do formulário e atualiza os resultados na tela
    formTransacao.reset();
    atualizarResultado();
  });
}


//funcao para exibir os totais detalhados na tabela, organizando os valores por pessoa e total geral.
function consultarTotais() {
    const totais = sistema.consultarTotais();

    const tabela = document.getElementById("tabela-totais");
    if (!tabela) return;  //se não tiver tabela interrompe

    tabela.innerHTML = ""; // limpa os dados anteriores

    // preenche a tabela com os totais individuais por pessoa
    totais.totaisPorPessoa.forEach(item => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${item.pessoa.nome}</td>
            <td>R$ ${item.totalReceitas.toFixed(2)}</td>
            <td>R$ ${item.totalDespesas.toFixed(2)}</td>
            <td>R$ ${item.saldo.toFixed(2)}</td>
        `;
        //adicionar elemento filho
        tabela.appendChild(linha);
    });

    // adicionando uma linha (final) com os totais gerais 
    const linhaFinal = document.createElement("tr");
    linhaFinal.innerHTML = `
        <td><strong>Total Geral</strong></td>
        <td><strong>R$ ${totais.geral.totalReceitas.toFixed(2)}</strong></td>
        <td><strong>R$ ${totais.geral.totalDespesas.toFixed(2)}</strong></td>
        <td><strong>R$ ${totais.geral.saldo.toFixed(2)}</strong></td>
    `;
    tabela.appendChild(linhaFinal);
}


// expor as funções globalmente para que o HTML consiga acessá-las
(window as any).consultarTotais = consultarTotais;
