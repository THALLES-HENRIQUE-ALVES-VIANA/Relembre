import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TarefasService } from '../services/tarefas'; 

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab2Page {
  imagemTemp: string | null = null;
  titulo: string = '';
  descricao: string = '';
  prioridade: string = 'media'; // Valor padrão

  constructor(private tarefasService: TarefasService) {} 

  abrirInputImagem() {
    const input = document.getElementById('inputImagem') as HTMLInputElement;
    input?.click();
  }

  fileSelecionado(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagemTemp = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  criarTarefa() {
    // Validação básica
    if (!this.titulo.trim()) {
      console.log('Erro: Título é obrigatório');
      return;
    }

    const novaTarefa = {
      id: Date.now(), 
      titulo: this.titulo,
      descricao: this.descricao,
      prioridade: this.prioridade || 'media',
      imagem: this.imagemTemp,
      abrir: false,
      dataCriacao: new Date()
    };

    console.log('Criando tarefa:', novaTarefa);

    this.limparFormulario();
  }

  adicionarTarefa() {
    if (!this.titulo.trim()) {
      alert('Por favor, adicione um título para a tarefa!');
      return;
    }

    if (!this.prioridade) {
      alert('Por favor, selecione uma prioridade!');
      return;
    }

    const novaTarefa = {
      id: Date.now(), // ID único
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      prioridade: this.prioridade,
      imagem: this.imagemTemp,
      abrir: false, // Inicialmente fechada
      dataCriacao: new Date()
    };

    // Usar o serviço para adicionar a tarefa
    this.tarefasService.adicionarTarefa(novaTarefa);

    // Feedback para o usuário
    console.log('Tarefa adicionada com sucesso:', novaTarefa);
    
    // Limpar o formulário
    this.limparFormulario();
    
  }

  limparFormulario() {
    this.titulo = '';
    this.descricao = '';
    this.prioridade = 'media';
    this.imagemTemp = null;
    
    // Limpar o input de arquivo também
    const input = document.getElementById('inputImagem') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  // Método opcional para definir a prioridade visualmente
  definirPrioridade(prioridade: string) {
    this.prioridade = prioridade;
    console.log('Prioridade definida:', prioridade);
  }
}