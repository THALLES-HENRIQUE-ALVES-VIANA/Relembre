import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { TarefasService } from '../services/tarefas';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page {

  // Array para armazenar as tarefas adicionais vindas do service
  tarefasExtras: any[] = [];
  
  // Tarefa fixa de exemplo 
  tarefa1: any = {
    titulo: 'Tarefa Exemplo',
    descricao: 'Descrição da tarefa exemplo', 
    prioridade: 'media',
    imagem: null,
    abrir: false  // Controla se o card está expandido ou não
  };

  // Variáveis para o controle do metódo edição
  editandoTarefa: any = null;        // Armazena qual tarefa está sendo editada
  tituloEditado: string = '';        // Valor temporário do título durante edição
  descricaoEditada: string = '';     // Valor temporário da descrição durante edição
  prioridadeEditada: string = 'media'; // Valor temporário da prioridade durante edição
  imagemEditada: string | null = null; // Imagem temporária durante edição

  // serviço vindo de service tarefas
  constructor(
    private tarefasService: TarefasService,
    private modalCtrl: ModalController
  ) {}

  // Executa quando a página está prestes a ser exibida,garantindo assim que as tarefas estejam atualizadas sempre que o usuário voltar para esta tab
  ionViewWillEnter() {
    this.carregarTarefas();
  }

  //Carrega as tarefas do serviço para o array local, isso sincroniza a interface com os dados atualizados
  carregarTarefas() {
    this.tarefasExtras = this.tarefasService.getTarefas();
  }

   //Manipula a seleção de arquivos de imagem
  fileSelecionado(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.editandoTarefa) {
          // Se está editando, armazena na variável temporária de edição
          this.imagemEditada = e.target?.result as string;
        } else {
          // Se não está editando, aplica diretamente na tarefa exemplo
          this.tarefa1.imagem = e.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
   //Remove uma tarefa usando o serviço
  removerTarefa(tarefa: any) {
    this.tarefasService.removerTarefa(tarefa);
    this.carregarTarefas(); // Recarrega a lista após remover
  }

  //Cria uma cópia de uma tarefa existente
  duplicarTarefa(tarefa: any) {
    this.tarefasService.duplicarTarefa(tarefa);
    this.carregarTarefas(); // Recarrega a lista após duplicar
  }

  // Método editar - Abre o modo de edição
  editarTarefa(tarefa: any) {
    console.log("Editando tarefa:", tarefa);
    
    // Preenche as variáveis temporárias com os valores atuais da tarefa
    this.editandoTarefa = tarefa;
    this.tituloEditado = tarefa.titulo;
    this.descricaoEditada = tarefa.descricao;
    this.prioridadeEditada = tarefa.prioridade;
    this.imagemEditada = tarefa.imagem;
  }

  //Salva a edição
  salvarEdicao() {
    // Validação do título
    if (!this.tituloEditado.trim()) {
      alert('Por favor, adicione um título para a tarefa!');
      return;
    }

    // Cria um novo objeto com os dados editados
    const tarefaEditada = {
      ...this.editandoTarefa,  // Mantém todas as propriedades originais (id, dataCriacao, etc)
      titulo: this.tituloEditado.trim(),
      descricao: this.descricaoEditada.trim(),
      prioridade: this.prioridadeEditada,
      imagem: this.imagemEditada
    };

    // Atualiza no serviço
    this.tarefasService.atualizarTarefa(tarefaEditada);
    this.carregarTarefas();
    
    // Se estiver editando a tarefa1 (tarefa exemplo), atualiza ela também
    if (this.editandoTarefa === this.tarefa1) {
      this.tarefa1 = { ...tarefaEditada };
    }

    this.cancelarEdicao(); // Fecha o modo de edição
  }

  //Método para cancelar as edições
  cancelarEdicao() {
    // Reseta todas as variáveis de edição
    this.editandoTarefa = null;
    this.tituloEditado = '';
    this.descricaoEditada = '';
    this.prioridadeEditada = 'media';
    this.imagemEditada = null;
  }

  // Essa parte serve para abrir a imagem, na parte da edição
  abrirInputImagemEdicao() {
    const input = document.getElementById('inputImg') as HTMLInputElement;
    input?.click();
  }

  //E essa parte remove a imagem na edição
  removerImagemEdicao() {
    this.imagemEditada = null;
  }
}