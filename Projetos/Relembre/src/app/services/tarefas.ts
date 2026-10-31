//O services ele é literalmente com um serviço é o que leva e trás informações entre o tab1 e o tab2

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private tarefas: any[] = [];

  constructor() {
    // Dados iniciais para teste (card padrão)
    this.tarefas = [
      {
        id: 1,
        titulo: 'Tarefa Exemplo',
        descricao: 'Esta é uma tarefa de exemplo',
        prioridade: 'alta',
        imagem: null,
        abrir: false,
        dataCriacao: new Date()
      }
    ];
  }

  // Adicionar nova tarefa
  adicionarTarefa(tarefa: any) {
    // 'push' adiciona um item ao final do array
    this.tarefas.push(tarefa);
    console.log('Tarefas após adicionar:', this.tarefas); // Log para debug
  }

  // Obter todas as tarefas
  getTarefas(): any[] {
    return this.tarefas;
  }

  // Remover tarefa
  removerTarefa(tarefa: any) {
    // 'findIndex' procura a posição da tarefa no array pelo ID
    const index = this.tarefas.findIndex(t => t.id === tarefa.id);
    if (index > -1) { // Se encontrou (index não é -1)
      // 'splice' remove 1 elemento na posição encontrada
      this.tarefas.splice(index, 1);
    }
  }

  // Duplicar tarefa
  duplicarTarefa(tarefa: any) {
    const tarefaDuplicada = {
         ...tarefa,        // '...' spread operator - copia todas as propriedades
      id: Date.now(),   // Gera novo ID único baseado no timestamp atual
      titulo: '${tarefa.titulo} (Cópia)', // Adiciona "(Cópia)" ao título
      dataCriacao: new Date() // Nova data de criação
    };
    this.tarefas.push(tarefaDuplicada); // Adiciona a cópia ao array
  }

  // Atualizar tarefa
  atualizarTarefa(tarefaAtualizada: any) {
    // Encontra a posição da tarefa antiga no array
    const index = this.tarefas.findIndex(t => t.id === tarefaAtualizada.id);
    if (index > -1) {
      // Substitui a tarefa antiga pela atualizada na mesma posição
      this.tarefas[index] = tarefaAtualizada;
    }
  }

  // Obter tarefa por ID
  // 'find' retorna a primeira tarefa que tem o ID especificado
  getTarefaPorId(id: number): any {
    return this.tarefas.find(t => t.id === id);
  }
}
