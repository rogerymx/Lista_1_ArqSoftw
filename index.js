const readline = require("readline");

class Contato {
  constructor(nome, telefone, email) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }
}

class GerenciadorContatos {
  constructor() {
    this.contatos = [];
  }

  adicionarContato(contato) {
    this.contatos.push(contato);
  }

  removerContato(nome) {
    this.contatos = this.contatos.filter((contato) => contato.nome !== nome);
  }

  listarContatos() {
    return this.contatos;
  }

  buscarContatoPorNome(nome) {
    return this.contatos.filter((contato) => contato.nome.includes(nome));
  }
}

class ContatosSubject {
  constructor() {
    this.observers = [];
  }

  adicionarObserver(observer) {
    this.observers.push(observer);
  }

  removerObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notificarObservers(contatos) {
    this.observers.forEach((observer) => observer.atualizar(contatos));
  }
}

class ContatosFacade {
  constructor() {
    this.gerenciadorContatos = new GerenciadorContatos();
    this.contatosSubject = new ContatosSubject();
  }

  adicionarContato(nome, telefone, email) {
    const contato = new Contato(nome, telefone, email);
    this.gerenciadorContatos.adicionarContato(contato);
    this.contatosSubject.notificarObservers(
      this.gerenciadorContatos.listarContatos()
    );
  }

  removerContato(nome) {
    this.gerenciadorContatos.removerContato(nome);
    this.contatosSubject.notificarObservers(
      this.gerenciadorContatos.listarContatos()
    );
  }

  listarContatos() {
    return this.gerenciadorContatos.listarContatos();
  }

  buscarContatoPorNome(nome) {
    return this.gerenciadorContatos.buscarContatoPorNome(nome);
  }

  registrarObserver(observer) {
    this.contatosSubject.adicionarObserver(observer);
  }
}

class CLI {
  constructor(contatosFacade, rl) {
    this.contatosFacade = contatosFacade;
    this.contatosFacade.registrarObserver(this);
    this.rl = rl;
  }

  atualizar(contatos) {
    console.log("Lista de contatos atualizada:");
    console.log(contatos);
  }

  exibirMenu() {
    console.log("===== Menu =====");
    console.log("1. Adicionar Contato");
    console.log("2. Remover Contato");
    console.log("3. Listar Contatos");
    console.log("4. Buscar Contato por Nome");
    console.log("5. Sair");
    console.log("================");

    this.rl.question("Escolha uma opção: ", (opcao) => {
      switch (opcao) {
        case "1":
          this.rl.question("Nome do contato: ", (nome) => {
            this.rl.question("Telefone do contato: ", (telefone) => {
              this.rl.question("Email do contato: ", (email) => {
                this.contatosFacade.adicionarContato(nome, telefone, email);
                this.exibirMenu();
              });
            });
          });
          break;
        case "2":
          this.rl.question(
            "Nome do contato a ser removido: ",
            (nomeRemover) => {
              this.contatosFacade.removerContato(nomeRemover);
              this.exibirMenu();
            }
          );
          break;
        case "3":
          console.log("Lista de contatos:");
          console.log(this.contatosFacade.listarContatos());
          this.exibirMenu();
          break;
        case "4":
          this.rl.question("Nome do contato a ser buscado: ", (nomeBuscar) => {
            console.log("Resultado da busca:");
            console.log(this.contatosFacade.buscarContatoPorNome(nomeBuscar));
            this.exibirMenu();
          });
          break;
        case "5":
          console.log("Saindo...");
          this.rl.close();
          return;
        default:
          console.log("Opção inválida.");
          this.exibirMenu();
      }
    });
  }
}

// Função para iniciar a CLI
function iniciarCLI() {
  const contatosFacade = new ContatosFacade();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const cli = new CLI(contatosFacade, rl);
  cli.exibirMenu();
}

// Iniciar a CLI
iniciarCLI();
