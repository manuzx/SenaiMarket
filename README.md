SenaiMarket - Mobile E-commerce App

O SenaiMarket é uma aplicação mobile desenvolvida com React Native e Expo. O projeto foca em fornecer uma experiência fluida de compra, utilizando navegação complexa, persistência de dados local e design responsivo.

Arquitetura do Projeto e Diretórios

Com base na estrutura de pastas definida no projeto, a separação de responsabilidades foi organizada da seguinte forma:
Plaintext

SenaiMarket/
├── assets/             # Recursos estáticos (imagens, ícones e fontes).
├── src/                # Diretório principal do código-fonte.
│   ├── data/           # Modelagem de dados e mocks.
│   │   └── Produtos.js # Lista de objetos representando o catálogo do app.
│   ├── routes/         # Gerenciamento de fluxos de navegação.
│   │   ├── AppTabs.jsx # Navegação por abas (Tab Bar) pós-login.
│   │   ├── AuthStack.jsx # Fluxo de autenticação (Login/Cadastro).
│   │   └── Routes.js   # Arquivo mestre que alterna entre os fluxos Auth e App.
│   ├── screens/        # Componentes de interface (Telas).
│   │   ├── CadastroScreen.js
│   │   ├── CarrinhoScreen.js
│   │   ├── DetalhesScreen.js
│   │   ├── LoginScreen.js
│   │   ├── PerfilScreen.js
│   │   └── VitrineScreen.js
├── App.js              # Ponto de entrada (Root) da aplicação.
├── app.json            # Configurações do Expo.
├── index.js            # Registro do componente principal.
└── package.json        # Manifest de dependências e scripts do projeto.

Tecnologias e Implementações Técnicas
Navegação (React Navigation)

A aplicação utiliza uma arquitetura de navegação híbrida para garantir a melhor experiência do usuário (UX):

    Stack Navigator: Utilizado no AuthStack.jsx para transições lineares entre Login e Cadastro, e dentro da aba Home para navegar da Vitrine para os Detalhes do Produto.

    Bottom Tab Navigator: Implementado no AppTabs.jsx, organiza as áreas principais: Início, Carrinho e Perfil.

 Persistência de Dados (AsyncStorage)

O projeto utiliza o @react-navigation/async-storage para gerenciar o estado persistente:

    Autenticação: Armazena e valida os dados do usuário durante o ciclo de vida do app.

    Carrinho: Persiste a lista de compras para que os itens não sejam perdidos ao fechar o aplicativo.

 Interface e Componentes

    FlatList: Implementada para renderização otimizada do catálogo de produtos, garantindo performance mesmo em listas extensas. * Hooks (useState & useEffect): Utilizados para controle de estado local, manipulação de formulários e sincronização de dados com o armazenamento local.

 Como Executar

    Clone o repositório.

    Na raiz do projeto, instale as dependências:
    Bash

    npm install

    Inicie o projeto com o Expo:
    Bash

    npx expo start

 Perfil do Desenvolvedor

Emmanuel Cordeiro

    Formação: Técnico em Desenvolvimento de Sistemas (SENAI).

    Competências: Desenvolvimento Mobile, Lógica de Programação, Manipulação de JSON e UX Design.