# Front-End Online Store! :department_store:

  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

  Neste projeto existe uma versão simplificada, sem persistência no banco de dados, de uma **loja online**, foi desenvolvido em grupo suas funcionalidades de acordo com demandas definidas em um quadro _Kanban_, em um cenário próximo ao do mercado de trabalho.
  
  A partir dessas demandas, tivemos uma aplicação em que pessoas usuárias podem:
  - Buscar produtos por termos e categorias a partir da _API do Mercado Livre_;
  - Interagir com os produtos buscados de modo a adicioná-los e removê-los de um carrinho de compras em diferentes quantidades;
  - Simular a finalização da compra dos itens selecionados.
  
  <summary><strong>:memo: Quais skills desenvolvemos? </strong></summary><br />

  * Métodos Ágeis;
  * Kanban;
  * Scrum;
  * Trabalhar em equipes utilizando Kanban ou Scrum de maneira eficaz;
  * Praticar todas as habilidades básicas desenvolvidas em Front-End.

# Quer conhecer mais o nosso projeto?

<details>
  <summary><strong>Detalhes:</strong></summary><br />

  1. Clone o repositório

  - Use o comando: `git@github.com:rodriguestg/gabriel-rodrigues-g25-frontend-online-store.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd gabriel-rodrigues-g25-frontend-online-store.git`

  2. Instale as dependências

  - `npm install`.
  
</details>

<details>
  <summary><strong>🎛 Linter</strong></summary><br />

O [ESLint](https://eslint.org/) foi utilizado para fazer a análise estática do código garantindo a sua qualidade de forma a tê-lo mais legível, de mais fácil manutenção e seguindo as boas práticas de desenvolvimento. 

</details>
  
<details>
  <summary><strong>:convenience_store: Desenvolvimento </strong></summary><br />

  ### Documentação da API do Mercado Livre

  A página _web_ consome os dados de uma API do _Mercado Livre_ para realizar buscas de itens da loja online.
  Para realizar essas buscas, consultamos os seguintes _endpoints_:

  - Para listar as categorias disponíveis:
    - Endpoint: https://api.mercadolibre.com/sites/MLB/categories
  - Para buscar por itens por termo:
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
  - Para buscar itens por categoria:
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
  - Para buscar detalhes de um item especifico:
    - Endpoint: https://api.mercadolibre.com/items/$PRODUCT_ID

</details>

---

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto no qual você pode customizar e reutilizar todas as vezes que for executar o trybe-publisher.

Para deixá-lo com a sua cara, basta alterar o seguinte arquivo da sua máquina: ~/.student-repo-publisher/custom/_NEW_README.md

É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
