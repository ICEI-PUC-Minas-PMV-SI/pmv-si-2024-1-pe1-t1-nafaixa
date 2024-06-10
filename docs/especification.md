# Especificações do Projeto

Como apresentado anteriormente, o “NaFaixa” visa auxiliar em problemas complementares que impactam os produtores de eventos gratuitos e seu público. Nosso propósito é proporcionar benefícios mútuos, possibilitando uma divulgação eficiente dos eventos por parte dos produtores e facilitando a busca por eventos gratuitos para o público.

Nesta etapa do projeto foram utilizadas:

- Ferramentas de Design Thinking para construção das personas;
- Técnica 3W para escrita das histórias de usuário;
- Calls em grupo para o planejamento dos requisitos funcionais e não funcionais.


## Personas

### Persona 01

Gabriela tem 26 anos, é solteira, nasceu na periferia, é graduada em Sistemas de Informação e atualmente trabalha como Tech Lead em uma empresa de tecnologia local. É engajada em comunidades de eventos voltados à tecnologia, dos quais participa sempre que possível para se manter atualizada no mercado, e onde recentemente foi convidada por um líder da comunidade para ajudar na organização de um evento gratuito focado no empreendedorismo para jovens adultos. Mesmo estando ansiosa por estar fazendo algo novo, Gabriela embarca nesta jornada e após a preparação do evento, busca uma plataforma que a auxilie a atrair seu público desejado.

### Persona 02

Eduarda tem 22 anos, está em um relacionamento há dois anos, está no segundo semestre da graduação de Engenharia da Computação e está em busca de sua primeira oportunidade na área de desenvolvimento. Após muitos currículos enviados e pouco retorno, Gabriela decide participar de eventos de tecnologia para expandir seu networking, porém os ingressos para esses eventos são muito caros e ela busca por oportunidades de eventos gratuitos em sua cidade. 


## Histórias de Usuários
| EU COMO | QUERO/PRECISO | PARA |
| --- | --- | --- |
| Produtor de eventos | cadastrar meu evento na plataforma | atrair potenciais participantes. |
| Produtor de eventos | ter visibilidade prévia de quem confirmou presença no meu evento | poder gerenciar os recursos da melhor forma. |
| Pessoa interessada em eventos gratuitos | filtrar os eventos por categoria específica | agilizar minha busca. |
| Pessoa interessada em eventos gratuitos | pesquisar por um evento específico | facilitar minha busca. |
| Pessoa interessada em eventos gratuitos | visualizar os eventos mais próximos a mim | aprimorar minha busca. |
| Pessoa interessada em eventos gratuitos | ter a visibilidade de todos os eventos gratuitos disponíveis | analisar todas as opções. |
| Pessoa interessada em eventos gratuitos | acessar todos os detalhes do evento que eu tiver interesse | saber todas as informações relevantes. |


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID | DESCRIÇÃO DO REQUISITO | PRIORIDADE |
| --- | --- | --- |
| RF-001 | O sistema deve oferecer a funcionalidade de cadastrar um novo evento. | ALTA |
| RF-002 | O sistema deve fornecer um filtro por categoria para facilitar a navegação. | ALTA |
| RF-003 | O sistema deve apresentar uma barra de pesquisa para facilitar a localização de eventos específicos. | MÉDIA |
| RF-004 | O sistema deve apresentar os eventos cadastrados por proximidade de localização em um mapa. | BAIXA |
| RF-005 | O sistema deve apresentar uma listagem completa de todos os eventos cadastrados. | ALTA |
| RF-006 | O sistema deve apresentar os dados detalhados de todos os eventos cadastrados. | ALTA |
| RF-007 | O sistema deve oferecer a opção de confirmar presença em um ou mais eventos. | MÉDIA |
| RF-008 | O sistema deve oferecer uma página de cadastro de produtor. | ALTA |
| RF-009 | O sistema deve oferecer uma página de login para o produtor. | ALTA |
| RF-010 | O sistema deve oferecer uma página para alteração de dados do produtor. | ALTA |
| RF-011 | O sistema deve oferecer a opção de alteração dos dados do evento já cadastrado. | ALTA |


### Requisitos não Funcionais

| ID | DESCRIÇÃO DO REQUISITO | PRIORIDADE |
| --- | --- | --- |
| RNF-001 | O sistema deve ser compatível com o Google Chrome, garantindo uma experiência consistente. | ALTA |
| RNF-002 | O sistema deve possuir uma API integrada com o Google Maps para fornecer informações de localização. | BAIXA |
| RNF-003 | As tecnologias fundamentais para o sistema são HTML, CSS e Javascript. | ALTA |
| RNF-004 | Os dados do sistema devem ser armazenados no formato JSON. | ALTA |
| RNF-005 | O sistema deve oferecer a funcionalidade de solicitar e obter a localização atual do usuário. | BAIXA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | DESCRIÇÃO DA RESTRIÇÃO |
| --- | --- |
| 01 | O projeto deverá ser entregue até o final do semestre |
| 02 | Não pode ser desenvolvido um módulo de backend |
| 03 | Não pode ser utilizado um banco de dados |
| 04 | Serão utilizados somente servidores gratuitos |
