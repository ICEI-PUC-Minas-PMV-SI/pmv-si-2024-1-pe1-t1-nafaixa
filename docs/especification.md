# Especificações do Projeto

Como apresentado anteriormente, o “NaFaixa” visa auxiliar em problemas complementares que impactam os organizadores de eventos gratuitos e seu público. Nosso propósito é proporcionar benefícios mútuos, possibilitando uma divulgação eficiente dos eventos por parte dos organizadores e facilitando a busca por eventos gratuitos para o público.

Nesta etapa do projeto foram utilizadas:

- Ferramentas de Design Thinking para construção das personas;
- Técnica 3W para escrita das histórias de usuário;
- Calls em grupo para o planejamento dos requisitos funcionais e não funcionais.


## Personas

### Persona 01

Pedro tem 26 anos, é solteiro, nasceu na periferia, é graduado em Sistemas de Informação e atualmente trabalha como Tech Lead em uma empresa de tecnologia local. É engajado em comunidades de eventos voltados à tecnologia, dos quais participa sempre que possível para se manter atualizado no mercado, e onde recentemente foi convidado por um líder da comunidade para ajudar na organização de um evento gratuito focado no empreendedorismo para jovens adultos. Mesmo estando ansioso por estar fazendo algo novo, Pedro embarca nesta jornada e após a preparação do evento, busca uma plataforma que o auxilie a atrair seu público desejado.

### Persona 02

Gabriela tem 22 anos, está em um relacionamento há dois anos, está no segundo semestre da graduação de Engenharia da Computação e está em busca de sua primeira oportunidade na área de desenvolvimento. Após muitos currículos enviados e pouco retorno, Gabriela decide participar de eventos de tecnologia para expandir seu networking, porém os ingressos para esses eventos são muito caros e ela busca por oportunidades de eventos gratuitos em sua cidade. 


## Histórias de Usuários
| EU COMO | QUERO/PRECISO | PARA |
| --- | --- | --- |
| Organizador de eventos | cadastrar meu evento na plataforma | atrair potenciais participantes. |
| Organizador de eventos | ter visibilidade prévia de quem confirmou presença no meu evento | poder gerenciar os recursos da melhor forma. |
| Organizador de eventos | poder alterar meus dados pessoais | caso seja necessário atualizá-los. |
| Organizador de eventos | poder alterar os dados dos meus eventos cadastrados | caso haja alguma atualização a ser feita. |
| Pessoa interessada em eventos gratuitos | filtrar os eventos por categoria específica | facilitar minha busca. |
| Pessoa interessada em eventos gratuitos | pesquisar por um evento específico | facilitar minha busca. |
| Pessoa interessada em eventos gratuitos | visualizar os eventos mais próximos a mim | facilitar minha busca. |
| Pessoa interessada em eventos gratuitos | ter a visibilidade de todos os eventos gratuitos disponíveis | analisar todas as opções. |
| Pessoa interessada em eventos gratuitos | acessar todos os detalhes do evento que eu tiver interesse | saber todas as informações relevantes. |

01: Como um organizador de eventos, eu quero poder cadastrar meu evento na plataforma para
atrair potenciais participantes.
- CA 01: O evento criado precisa ter os seguintes dados: Nome, categoria, data e localização
do evento.
- CA 02: Depois de criado o evento, o sistema deve informar que foi cadastrado com
sucesso, caso contrário deverá retornar mensagem de erro.

02: Como um organizador de eventos, eu quero ter visibilidade prévia das pessoas que
confirmaram presença no meu evento para utilizar os recursos da melhor forma.
- CA 01: O sistema deve apresentar um botão para o usuário demonstrar interesse no
evento.
- CA 02: Ao usuário confirmar sua presença, este dado deve ser enviado/apresentado ao
organizador.

03: Como um organizador de eventos, eu quero poder alterar meus dados pessoais para caso
seja necessário atualizá-los.
- CA 01: O organizador deve ser autenticado no sistema.
  
04: Como um organizador de eventos, eu quero poder alterar os dados dos meus eventos
cadastrados para caso haja alguma atualização a ser feita.
- CA 01: O organizador deve estar autenticado no sistema.
  
05: Como uma pessoa interessada em eventos gratuitos, eu quero poder filtrar os eventos por
categorias específicas para facilitar minha busca.
- CA 01: O sistema deve ser capaz de filtrar apenas uma categoria por vez.
- CA 02: O filtro deve ter como base a lista de categorias disponíveis.
- CA 03: A busca deverá retornar os eventos específicos da categoria selecionada.
- CA 04: Caso não encontrado nenhum resultado, o sistema deve mostrar mensagem de
erro.

06: Como uma pessoa interessada em eventos gratuitos, eu quero poder pesquisar por um
evento específico para facilitar minha busca.
- CA 01: A busca deve permitir filtrar por nome e localização ou por palavras-chave.
- CA 02: Caso não encontrado nenhum resultado, o sistema deve mostrar mensagem de
erro.
- CA 03: A busca deverá retornar os eventos compatíveis com as palavras-chave inseridas.
  
07: Como uma pessoa interessada em eventos gratuitos, eu quero poder visualizar os eventos
mais próximos a mim para facilitar minha busca.
- CA 01: O usuário deve permitir o uso de sua localização.
- CA 02: O sistema deverá utilizar a API do Google Maps para reconhecer a localização do
usuário.
- CA 03: Caso não exista evento próximo ao usuário, não deverá listar.
  
08: Como uma pessoa interessada em eventos gratuitos, eu quero ter a visibilidade de todos os
eventos gratuitos disponíveis para analisar todas as opções.
- CA 01: O sistema deve listar todos os eventos cadastrados ordenados por data.
- CA 02: Caso não exista nenhum evento cadastrado, não deverá listar.
  
09: Como uma pessoa interessada em eventos gratuitos, eu quero ter acesso aos detalhes do
evento que eu tiver interesse para saber todas as informações importantes.
- CA 01: O evento deve conter nome, categoria, data e localização.


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID | DESCRIÇÃO DO REQUISITO | PRIORIDADE |
| --- | --- | --- |
| RF-001 | O sistema deve oferecer a funcionalidade de cadastrar um novo evento. | ALTA |
| RF-002 | O sistema deve fornecer um filtro por categoria para facilitar a navegação. | ALTA |
| RF-003 | O sistema deve apresentar uma barra de pesquisa para facilitar a localização de eventos específicos. | MÉDIA |
| RF-004 | O sistema deve apresentar uma listagem de eventos por proximidade de localização. | BAIXA |
| RF-005 | O sistema deve apresentar uma listagem completa de todos os eventos cadastrados. | ALTA |
| RF-006 | O sistema deve apresentar os dados detalhados de todos os eventos cadastrados. | ALTA |
| RF-007 | O sistema deve oferecer a opção de confirmar presença em um ou mais eventos. | MÉDIA |
| RF-008 | O sistema deve oferecer uma página de cadastro de organizador. | ALTA |
| RF-009 | O sistema deve oferecer uma página de login para o organizador. | ALTA |
| RF-010 | O sistema deve oferecer uma página para alteração de dados do organizador. | ALTA |
| RF-011 | O sistema deve oferecer a opção de alteração dos dados do evento já cadastrado. | ALTA |

  RF01: Cadastro de novo evento
- Descrição: O sistema deve oferecer a funcionalidade de cadastrar um novo evento.
- Pré-condições: O usuário está autenticado no sistema.
- Fluxo Principal:
1. O usuário acessa a página de cadastro de eventos.
2. Preenche as informações do novo evento.
3. Confirma o cadastro do evento.

  RF02: Filtro por categoria
- Descrição: O sistema deve fornecer um filtro por categoria para facilitar a navegação.
- Pré-condições: O usuário está na página principal.
- Fluxo Principal:
1. O usuário seleciona a categoria desejada.
2. A lista de eventos é filtrada de acordo com a categoria escolhida.

  RF03: Barra de pesquisa
- Descrição: O sistema deve apresentar uma barra de pesquisa para facilitar a localização de
eventos específicos.
- Pré-condições: O usuário está na página principal.
- Fluxo Principal:
1. O usuário insere palavras-chave na barra de pesquisa.
2. A lista de eventos é filtrada com base nos termos inseridos.

  RF04: Listagem por localização
- Descrição: O sistema deve apresentar uma listagem de eventos por proximidade de
localização.
- Pré-condições: O usuário deve permitir o acesso a localização..
- Fluxo Principal:
1. O usuário permite ao sistema identificar sua localização.
2. O usuário solicita a lista de eventos com base na sua localização ao clicar em um ícone de
busca por localização.
3. A lista de eventos é exibida com base na localização especificada.

  RF05: Listagem de todos os eventos
- Descrição: O sistema deve apresentar uma listagem completa de todos os eventos
cadastrados.
- Pré-condições: O usuário está na página principal.
- Fluxo Principal:
1. O usuário acessa a página de listagem completa de eventos.

  RF06: Apresentação de dados dos eventos
- Descrição: O sistema deve apresentar os dados detalhados de todos os eventos cadastrados.
- Pré-condições: O usuário está visualizando a página de detalhes do evento.
- Fluxo Principal:
1. O usuário seleciona um evento específico.
2. Os dados completos do evento são exibidos.

  RF07: Confirmação de presença
- Descrição: O sistema deve oferecer a opção de confirmar presença em um ou mais eventos.
- Pré-condições: O usuário está visualizando a página de detalhes do evento e informar um
e-mail.
- Fluxo Principal:
1. O usuário acessa a página do evento desejado.
2. O usuário insere seu e-mail.
3. Seleciona a opção de confirmar presença.

  RF08: Cadastro de organizador
- Descrição: O sistema deve oferecer uma página de cadastro de organizador.
- Pré-condições: O usuário deve um conter e-mail válido.
- Fluxo principal:
1. O usuário acessa o portal do organizador.
2. O usuário deve inserir os dados necessários para cadastro.
3. O usuário confirma seu cadastro como organizador.

  RF09: Login do organizador
- Descrição: O sistema deve oferecer uma página de login para o organizador.
- Pré-condições: O usuário deve estar cadastrado na plataforma como organizador.
- Fluxo principal:
1. O usuário acessa o portal do organizador.
2. O usuário insere os dados solicitados.
3. O usuário efetua o login e é apresentada a tela de organizador.

  RF10: Alteração de dados do organizador
- Descrição: O sistema deve oferecer uma página para alteração de dados do organizador.
- Pré condições: O organizador precisa estar autenticado na plataforma.
- Fluxo principal:
1. O usuário acessa o portal do organizador.
2. O usuário acessa a tela de configuração.
3. O sistema oferece a opção de alterar seu e-mail, nome ou senha.

  RF11: Alteração de dados dos eventos cadastrados
- Descrição: O sistema deve oferecer a opção de alteração dos dados do evento já cadastrado.
- Pré condições: O organizador deve estar autenticado e possuir um evento cadastrado na
plataforma.
- Fluxo principal:
1. O usuário deve acessar o portal do organizador.
2. O usuário deve acessar seus eventos cadastrados.
3. O usuário tem a opção de alterar as informações do seu evento, ou excluir o mesmo


### Requisitos não Funcionais

| ID | DESCRIÇÃO DO REQUISITO | PRIORIDADE |
| --- | --- | --- |
| RNF-001 | O sistema deve ser compatível com o Google Chrome,, garantindo uma experiência consistente. | ALTA |
| RNF-002 | O sistema deve possuir uma API integrada com o Google Maps para fornecer informações de localização. | MÉDIA |
| RNF-003 | As tecnologias fundamentais para o sistema são HTML, CSS e Javascript. | ALTA |
| RNF-004 | Os dados do sistema devem ser armazenados no formato JSON. | ALTA |
| RNF-005 | O sistema deve oferecer a funcionalidade de solicitar e obter a localização atual do usuário. | MÉDIA |

RNF01: Compatibilidade com o Google Chrome
- Descrição: O sistema deve ser compatível com o Google Chrome, garantindo uma experiência consistente.
- Critérios de Aceitação: O sistema é testado e otimizado para funcionar no navegador.

RNF02: Integração com Google Maps
- Descrição: O sistema deve possuir uma API integrada com o Google Maps para fornecer informações de localização.
- Critérios de Aceitação: A API do Google Maps é implementada e funcional.

RNF03: Tecnologias utilizadas
- Descrição: As tecnologias fundamentais para o sistema são HTML, CSS e Javascript.
- Critérios de Aceitação: O desenvolvimento e a manutenção do sistema são realizados utilizando as tecnologias especificadas.

RNF04: Armazenamento em JSON
- Descrição: Os dados do sistema serão armazenados no formato JSON.
- Critérios de Aceitação: Os dados são persistentes e podem ser recuperados conforme necessário utilizando a estrutura JSON.

RNF05: Obter localização do usuário
Descrição: O sistema deve oferecer a funcionalidade de solicitar e obter a localização atual do usuário.
Critérios de Aceitação: O processo de solicitação de permissão para acessar a localização deve ser claro e compreensível para o usuário.


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | DESCRIÇÃO DA RESTRIÇÃO |
| --- | --- |
| 01 | O projeto deverá ser entregue até o final do semestre |
| 02 | Não pode ser desenvolvido um módulo de backend |
| 03 | Não pode ser utilizado um banco de dados |
