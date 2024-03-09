# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

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

| ID | DESCRIÇÃO DA RESTRIÇÃO |
| --- | --- |
| 01 | O projeto deverá ser entregue até o final do semestre |
| 02 | Não pode ser desenvolvido um módulo de backend |
| 03 | Não pode ser utilizado um banco de dados |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| A aplicação deve permitir que o usuário gerencie suas tarefas | ALTA |  
|RF-002| A aplicação deve permitir a emissão de um relatório de tarefas realizadas no mês   | MÉDIA | 


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva | MÉDIA | 
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
