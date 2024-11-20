'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface Estacao {
  codigo: number;
  nome: string;
  preco: number;
  horarioDeAbertura: string;
  horarioDeFechamento: string;
  bombaDisponivel: boolean;
}

export default function GerenciamentoEstacoes() {
  const router = useRouter();

  // **Estados para os campos do formulário**
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [horarioDeAbertura, setHorarioDeAbertura] = useState('');
  const [horarioDeFechamento, setHorarioDeFechamento] = useState('');
  const [bombaDisponivel, setBombaDisponivel] = useState(false);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [codigoAtualizando, setCodigoAtualizando] = useState<number | null>(null);
  const [erro, setErro] = useState('');
  const API_URL = 'http://localhost:8080/RecargaMaps';

  // **Efeito para buscar as estações ao carregar a página**
  useEffect(() => {
    buscarEstacoes();
  }, []);

  // **Função para buscar as estações cadastradas**
  const buscarEstacoes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar estações.');
      }
      const data = await response.json();
      setEstacoes(data);
      setErro('');
    } catch (error) {
      setErro('Erro ao buscar estações.');
      console.error('Erro ao buscar estações:', error);
    }
  };

  // **Função para criar uma nova estação**
  const criarEstacao = async () => {
    if (!nome || !preco || !horarioDeAbertura || !horarioDeFechamento) {
      setErro('Preencha todos os campos.');
      return;
    }

    const precoNumero = parseFloat(preco);
    if (isNaN(precoNumero)) {
      setErro('Preço inválido. Insira um número válido.');
      return;
    }

    const novaEstacao = {
      nome,
      preco: precoNumero,
      horarioDeAbertura,
      horarioDeFechamento,
      bombaDisponivel,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaEstacao),
      });

      if (!response.ok) {
        throw new Error('Erro na criação da estação.');
      }

      setErro('');
      limparFormulario();
      buscarEstacoes();
    } catch (error) {
      setErro('Erro ao criar estação.');
      console.error('Erro ao criar estação:', error);
    }
  };

  // **Função para atualizar uma estação existente**
  const atualizarEstacao = async () => {
    if (!nome || !preco || !horarioDeAbertura || !horarioDeFechamento) {
      setErro('Preencha todos os campos.');
      return;
    }

    const precoNumero = parseFloat(preco);
    if (isNaN(precoNumero)) {
      setErro('Preço inválido. Insira um número válido.');
      return;
    }

    const estacaoAtualizada = {
      nome,
      preco: precoNumero,
      horarioDeAbertura,
      horarioDeFechamento,
      bombaDisponivel,
    };

    try {
      const response = await fetch(`${API_URL}/${codigoAtualizando}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estacaoAtualizada),
      });

      if (!response.ok) {
        throw new Error('Erro na atualização da estação.');
      }

      setErro('');
      limparFormulario();
      buscarEstacoes();
    } catch (error) {
      setErro('Erro ao atualizar estação.');
      console.error('Erro ao atualizar estação:', error);
    }
  };

  // **Função para deletar uma estação**
  const deletarEstacao = async (codigo: number) => {
    try {
      const response = await fetch(`${API_URL}/${codigo}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar estação.');
      }

      buscarEstacoes();
    } catch (error) {
      setErro('Erro ao deletar estação.');
      console.error('Erro ao deletar estação:', error);
    }
  };

  // **Função para limpar o formulário de criação/atualização**
  const limparFormulario = () => {
    setNome('');
    setPreco('');
    setHorarioDeAbertura('');
    setHorarioDeFechamento('');
    setBombaDisponivel(false);
    setCodigoAtualizando(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* **Título da página** */}
      <h1 className="text-3xl font-bold mb-4 text-center">Gerenciamento de Estações</h1>

      {/* **Exibição de erros** */}
      {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

      {/* **Formulário para criar ou atualizar estação** */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          {codigoAtualizando ? 'Atualizar Estação' : 'Nova Estação'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome:</label>
            <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preço:</label>
            <input
              type="number"
              placeholder="Digite o preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Horário de Abertura:</label>
            <input
              type="time"
              value={horarioDeAbertura}
              onChange={(e) => setHorarioDeAbertura(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Horário de Fechamento:</label>
            <input
              type="time"
              value={horarioDeFechamento}
              onChange={(e) => setHorarioDeFechamento(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={bombaDisponivel}
            onChange={() => setBombaDisponivel(!bombaDisponivel)}
            className="mr-2"
          />
          <label className="text-sm">Bomba Disponível</label>
        </div>

        {/* **Botão de criação ou atualização da estação** */}
        <button
          onClick={codigoAtualizando ? atualizarEstacao : criarEstacao}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          {codigoAtualizando ? 'Atualizar Estação' : 'Criar Estação'}
        </button>
      </div>

      {/* **Tabela de estações cadastradas** */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Estações Criadas</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Nome</th>
                <th className="border p-2">Preço</th>
                <th className="border p-2">Horário de Abertura</th>
                <th className="border p-2">Horário de Fechamento</th>
                <th className="border p-2">Bomba Disponível</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {estacoes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">Nenhuma estação cadastrada.</td>
                </tr>
              ) : (
                estacoes.map((estacao) => (
                  <tr key={estacao.codigo} className="text-center">
                    <td className="border p-2">{estacao.nome}</td>
                    <td className="border p-2">{estacao.preco}</td>
                    <td className="border p-2">{estacao.horarioDeAbertura}</td>
                    <td className="border p-2">{estacao.horarioDeFechamento}</td>
                    <td className="border p-2">
                      {estacao.bombaDisponivel ? 'Sim' : 'Não'}
                    </td>
                    <td className="border p-2">
                      {/* **Botões de atualização e deleção** */}
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                        onClick={() => {
                          setNome(estacao.nome);
                          setPreco(estacao.preco.toString());
                          setHorarioDeAbertura(estacao.horarioDeAbertura);
                          setHorarioDeFechamento(estacao.horarioDeFechamento);
                          setBombaDisponivel(estacao.bombaDisponivel);
                          setCodigoAtualizando(estacao.codigo);
                        }}
                      >
                        Atualizar
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        onClick={() => deletarEstacao(estacao.codigo)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
