# Lista 1 - Implementação Design Pattern

Estratégias Utilizadas:

- O padrão Observer é utilizado para notificar a interface do usuário (CLI) sempre que houver uma alteração na lista de contatos. A classe ContatosSubject age como o assunto observável, mantendo uma lista de observadores (CLI) e notificando-os sempre que ocorre uma mudança nos contatos.
  Padrão de Projeto Facade:

- O padrão Facade é utilizado para encapsular a complexidade do sistema de gerenciamento de contatos e fornecer uma interface simples para interação com o usuário. A classe ContatosFacade age como uma fachada, fornecendo métodos convenientes para adicionar, remover, listar e buscar contatos. Ela também gerencia a comunicação com o assunto observável (ContatosSubject) para notificar os observadores (CLI) sobre mudanças nos contatos.
  Módulo readline:

- O código é estruturado em classes para uma melhor organização e reutilização de código. Cada classe tem responsabilidades bem definidas, seguindo os princípios de encapsulamento e coesão. Além disso, a modularização é aplicada para separar as funcionalidades em unidades independentes, facilitando a manutenção e a extensibilidade do sistema.
