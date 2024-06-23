# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

## Plano de Testes de Software

Abaixo é apresentado o plano dos testes, onde em cada Caso de Teste (CT) está associado o Requisito Funcional que ele está verificando.

| Caso de teste | CT01 - Criar conta |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique em “Entrar” <br> 3) Clique em “Cadastre-se” <br> 4) Preencha todos os campos do formulário <br> 5) Clique no botão “Criar perfil” |
| Requisitos associados | RF-008 |
| Resultado esperado | Prosseguir para a tela de login |
| Dados de entrada | Inserção de dados válidos no formulário de cadastro |
| Resultado obtido | Sucesso |

| Caso de teste | CT02 - Fazer login |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique em “Entrar” <br> 3) Preencha os campos de e-mail e senha <br> 4) Clique no botão “Entrar”. |
| Requisitos associados | RF-009 |
| Resultado esperado | Prosseguir para a tela “Meus eventos” |
| Dados de entrada | Inserção de dados de login válidos |
| Resultado obtido | Sucesso |

| Caso de teste | CT03 - Alterar dados do produtor |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/login.html <br> 2) Faça login <br> 3) Clique em “Meu perfil” <br> 4) Altere o dado desejado <br> 5) Clique no botão “Salvar alterações”. |
| Requisitos associados | RF-010 |
| Resultado esperado | Prosseguir para a tela “Meu perfil” com os dados atualizados |
| Dados de entrada | Inserção de dado válido no campo a ser alterado |
| Resultado obtido | Sucesso |

| Caso de teste | CT04 - Alterar dados de evento cadastrado |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Faça login <br> 3) Clique em “Meus eventos” <br> 4) Altere o dado desejado <br> 5) Clique no botão “Salvar alterações”. |
| Requisitos associados | RF-011 |
| Resultado esperado | Prosseguir para a tela “Meus eventos” com os dados atualizados |
| Dados de entrada | Inserção de dado válido no campo a ser alterado |
| Resultado obtido | Problema identificado |
| Bug identificado | O campo “Sobre o evento” não está aparecendo automaticamente preenchido na edição do evento cadastrado |

| Caso de teste | CT05 - Criar evento |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Faça login <br> 3) Clique em “Criar evento” <br> 4) Preencha todos os campos do formulário <br> 5) Clique no botão “Criar evento”. |
| Requisitos associados | RF-001 |
| Resultado esperado | Prosseguir para a tela “Meus eventos” |
| Dados de entrada | Inserção de dados válidos no formulário de cadastro |
| Resultado obtido | Sucesso |

| Caso de teste | CT06 - Visualizar todos os eventos |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique no botão “mostrar mais” |
| Requisitos associados | RF-005 |
| Resultado esperado | Prosseguir para a tela com todos os eventos cadastrados |
| Dados de entrada | Sem dados de entrada |
| Resultado obtido | Sucesso |

| Caso de teste | CT07 - Visualizar eventos por categoria |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique na categoria desejada |
| Requisitos associados | RF-002 |
| Resultado esperado | Prosseguir para a tela com a listagem dos eventos da categoria selecionada |
| Dados de entrada | Sem dados de entrada |
| Resultado obtido | Sucesso |

| Caso de teste | CT08 - Visualizar eventos por proximidade 01 |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique em “Localização” na navbar <br> 3) Permita o site a acessar a sua localização <br> 4) Clique no botão “ver todos” ao lado de “Eventos perto de mim” |
| Requisitos associados | RF-004 |
| Resultado esperado | Prosseguir para a tela com o mapa e a listagem dos eventos mais próximos do usuário |
| Dados de entrada | Permissão para acessar localização |
| Resultado obtido | Sucesso |

| Caso de teste | CT09 - Visualizar eventos por proximidade 02 |
| --- | --- |
| Procedimento | 1) Navegue pelo mapa <br> 2) Clique em “Esconder o mapa” |
| Requisitos associados | RF-004 |
| Resultado esperado | O mapa deve ser ocultado |
| Dados de entrada | Sem dados de entrada |
| Resultado obtido | Sucesso |

| Caso de teste | CT10 - Utilizar a barra de pesquisa |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Digite o nome do evento que você procura na barra de pesquisa localizada na navbar <br> 3) Clique na tecla Enter do teclado |
| Requisitos associados | RF-003 |
| Resultado esperado | Prosseguir para a tela com os eventos que correspondem ao termo pesquisado |
| Dados de entrada | Inserção de dado de pesquisa |
| Resultado obtido | Sucesso |

| Caso de teste | CT11 - Visualizar os detalhes de eventos |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique no evento que você deseja visualizar |
| Requisitos associados | RF-006 |
| Resultado esperado | Prosseguir para a tela com os detalhes do evento selecionado |
| Dados de entrada | Sem dados de entrada |
| Resultado obtido | Sucesso |

| Caso de teste | CT12 - Confirmar presença em um evento |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique no evento que você deseja visualizar <br> 3) Informe o seu e-mail no campo de formulário <br> 4) Clique no botão “Enviar” |
| Requisitos associados | RF-007 |
| Resultado esperado | Exibir uma mensagem de sucesso ao usuário e contabilizar esta pessoa confirmada em “Meus eventos” para o produtor |
| Dados de entrada | Inserção de dado válido no formulário de confirmação de presença |
| Resultado obtido | Sucesso |

| Caso de teste | CT13 - Ordenar eventos |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique na aba de eventos que deseja (por categoria ou para ver todos os eventos cadastrados) <br> 3) Clique no filtro “Ordenar” <br> 4) Escolha como prefere o ordenamento (por data, de A a Z ou de Z a A) |
| Requisitos associados | RF-002 e RF-005 |
| Resultado esperado | Os eventos devem se ordenar de acordo com a escolha de ordenamento |
| Dados de entrada | Sem dados de entrada |
| Resultado obtido | Sucesso |

| Caso de teste | CT14 - Recuperação de senha |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique em Entrar <br> 3) Clique em “Esqueceu sua senha?” <br> 4) Informe o e-mail para o qual deve ser enviado o link de recuperação de senha <br> 5) Em seu e-mail, acesse o link enviado pelo NaFaixa <br> 6) Crie a sua nova senha e confirme ela novamente <br> 7) Clique em Enviar <br> 8) Realize login com a nova senha cadastrada |
| Requisitos associados | RF-009 |
| Resultado esperado | Modificação da senha cadastrada |
| Dados de entrada | Inserção de e-mail válido e nova senha criada |
| Resultado obtido | Problema identificado |
| Bug identificado | Link de recuperação de senha inválido |

| Caso de teste | CT15 - Direcionamento do carrossel |
| --- | --- |
| Procedimento | 1) Acesse o endereço https://nafaixa-13247e25093e.herokuapp.com/index.html <br> 2) Clique numa das páginas do carrossel de imagens |
| Requisitos associados | RF-002 |
| Resultado esperado | Prosseguir para a tela com a listagem dos eventos da categoria referente à imagem no carrossel |
| Dados de entrada | Sem dados de entrada |
| Resultado obtido | Sucesso |

## Registro dos Testes de Software

Abaixo é possível visualizar as evidências dos testes de software realizados, baseado no plano de testes pré-definido.

|*Caso de Teste*                                 |*CT01 - Criar conta*                                         |
|---|---|
|Requisito Associado | RF-008 - O sistema deve oferecer uma página de cadastro do produtor.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1f0J1u5J6O48UBaBNq0RfkZxMWEG5KCU5/view?usp=sharing | 

|*Caso de Teste*                                 |*CT02 - Fazer login*                                        |
|---|---|
|Requisito Associado | RF-009 - O sistema deve oferecer uma página de login para o produtor.		|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1FQi4bUN5RqyKJ416H3z9M8ULm9M4nXnB/view?usp=sharing | 

|*Caso de Teste*                                 |*CT03 - Alterar dados do produtor*                                        |
|---|---|
|Requisito Associado | RF-010 - O sistema deve oferecer uma página para alteração de dados do produtor.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1lqOeazcKe_5d_M3ECIr3U7Bhn0jlabNh/view?usp=sharin | 

|*Caso de Teste*                                 |*CT04 - Alterar dados de evento cadastrado*                                        |
|---|---|
|Requisito Associado | RF-011 - O sistema deve oferecer a opção de alteração dos dados do evento já cadastrado.	|
|Link do vídeo do teste realizado: |  | 

|*Caso de Teste*                                 |*CT05 - Criar evento*                                        |
|---|---|
|Requisito Associado | RF-001 - O sistema deve oferecer a funcionalidade de cadastrar um novo evento.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1Mz6juhLDiw399o0es0_hNpd6gK7DydmA/view?usp=sharing | 

|*Caso de Teste*                                 |*CT06 - Visualizar todos os eventos*                                        |
|---|---|
|Requisito Associado | RF-005 - O sistema deve apresentar uma lista completa de todos os eventos cadastrados.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1DUBlemIizfK5PIh7rnBGl32ph88czlbt/view?usp=sharing | 

|*Caso de Teste*                                 |*CT07 - Visualizar eventos por categoria*                                        |
|---|---|
|Requisito Associado | RF-002 - O sistema deve fornecer um filtro por categoria para facilitar a navegação.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1KIQ7yw1GGTT-Ua048CSwdiRIKuvcdnJ5/view?usp=sharing | 

|*Caso de Teste*                                 |*CT08 - Visualizar eventos por proximidade 01*                                        |
|---|---|
|Requisito Associado | RF-004 - O sistema deve apresentar os eventos cadastrados por proximidade de localização em um mapa.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1UUShG7B61GIBbdXTj54lomz-K3Ytf58-/view?usp=sharing | 

|*Caso de Teste*                                 |*CT09 - Visualizar eventos por proximidade 02*                                        |
|---|---|
|Requisito Associado | RF-004 - O sistema deve apresentar os eventos cadastrados por proximidade de localização em um mapa.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1UUShG7B61GIBbdXTj54lomz-K3Ytf58-/view?usp=sharing | 

|*Caso de Teste*                                 |*CT10 - Utilizar a barra de pesquisa*                                        |
|---|---|
|Requisito Associado | RF-003 - O sistema deve apresentar uma barra de pesquisa para facilitar a localização de eventos específicos.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/16RE97kmF6C_1mtVJWy_8rUE2pZAwXU4p/view?usp=sharing | 

|*Caso de Teste*                                 |*CT11 - Visualizar os detalhes de eventos*                                        |
|---|---|
|Requisito Associado | RF-006 - O sistema deve apresentar os dados detalhados de todos os eventos cadastrados.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/15EeQFVsWT35xrYc8JNFp5owDN7TuJBpb/view?usp=sharing | 

|*Caso de Teste*                                 |*CT12 - Confirmar presença em um evento*                                        |
|---|---|
|Requisito Associado | RF-007 - O sistema deve oferecer a opção de confirmar a presença de um ou mais eventos.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/15EeQFVsWT35xrYc8JNFp5owDN7TuJBpb/view?usp=sharing | 

|*Caso de Teste*                                 |*CT13 - Ordenar eventos*                                        |
|---|---|
|Requisitos Associados | RF-002 -	O sistema deve fornecer um filtro por categoria para facilitar a navegação.	<br> RF-005 - O sistema deve apresentar uma lista completa de todos os eventos cadastrados.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1KIQ7yw1GGTT-Ua048CSwdiRIKuvcdnJ5/view?usp=sharing | 

|*Caso de Teste*                                 |*CT14 - Recuperação de senha*                                        |
|---|---|
|Requisitos Associados | RF-009 - O sistema deve oferecer uma página de login para o produtor. |
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1WSK41GvKLrK0-fq4TrYDxbizpUf0ahbA/view?usp=sharing | 

|*Caso de Teste*                                 |*CT15 - Direcionamento do carrossel*                                        |
|---|---|
|Requisito Associado | RF-002 - O sistema deve fornecer um filtro por categoria para facilitar a navegação.	|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1mF6v27OGQt8fucEkFoZNIXGFoFx1YqnN/view?usp=sharing | 

## Avaliação dos Testes de Software

Durante a execução dos primeiros testes, ainda antes do site ser oficialmente lançado, foram identificados alguns bugs relacionados ao cadastro do produtor que estava permitindo cadastrar o mesmo e-mail mais de uma vez; o carrossel de imagens da página inicial não estava direcionando o usuário à categoria específica; o mapa, onde é possível observar os eventos por proximidade, não estava funcionando de forma adequada; e havia também falhas em alguns redirecionamentos. É importante ressaltar que todos estes problemas foram solucionados antes de lançarmos o site.

Já após o lançamento, elaboramos nosso plano de testes e verificamos cada requisito/funcionalidade destacada, onde pudemos identificar pequenos bugs, como o preenchimento automático de todas as informações ao editar um evento já cadastrado e também o funcionamento do link de recuperação de senha, os quais estão em processo de resolução.

Os principais pontos fortes do nosso projeto, além da entrega de valor, podem ser facilmente observados nos resultados do plano de testes, onde fica evidente que a visualização de eventos, seja por categorias, proximidade, barra de pesquisa ou detalhes específicos, está completamente funcional. Além disso, o processo de confirmação de presença em eventos acontece de forma rápida e eficaz, onde os usuários podem registrar sua presença e essa informação é devidamente contabilizada para os produtores quase de imediato. Tendo em vista os pontos apresentados, é possível afirmar que a experiência do usuário (potencial participante) é simples, eficiente e funcional, o que com certeza é um grande ponto forte do nosso projeto.

Já os pontos fracos estão relacionados ao cadastro do produtor e a edição dos eventos já cadastrados, onde é possível identificar pequenas falhas que podem dificultar a experiência do produtor. Considerando que a nossa equipe está dedicada na resolução desses problemas, creio que será possível entregar um projeto sem falhas relevantes no funcionamento do site e na experiência do produtor, a qual é a nossa prioridade, para que seja possível tanto para o produtor quanto para o potencial participante ter uma boa experiência no uso do NaFaixa.


# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos três cenários, cada um baseado nas funções que seriam mais usadas do site para diferentes situações.

Foram convidadas três pessoas que os perfis se encaixassem potenciais usuários da plataforma, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja participar de um evento na cidade de São Paulo. Encontre no site um evento em São Paulo e veja detalhes do evento anunciado e confirme sua presença. |
| 2             | Você é uma pessoa que deseja participar de um evento online. Encontre no site um evento online e veja detalhes do evento anunciado e confirme sua presença. |
| 3             | Você é uma pessoa que deseja cadastrar um evento gratuito no site. Cadastre um evento presencial no site. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja participar de um evento na cidade de São Paulo. Encontre no site um evento em São Paulo e veja detalhes do evento anunciado e confirme sua presença.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 4                    | 45.22 segundos                  |
| 2       | SIM             | 5                    | 37.77 segundos                  |
| 3       | SIM             | 4                    | 28.53 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 4.33                | 37.17 segundos                           |
| **Especialista** | SIM | 5 | 20.99 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2: Você é uma pessoa que deseja participar de um evento online. Encontre no site um evento online e veja detalhes do evento anunciado e confirme sua presença.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 3                    | 61.49 segundos                          |
| 2       | SIM             | 4                    | 17.38 segundos                          |
| 3       | SIM             | 4                    | 32.26 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 3.7                | 37.04 segundos                           |
| **Especialista** | SIM | 5 | 13.18 segundos |


    Comentários dos usuários: O site poderia classificar eventos online de outra maneira e não como categoria pois fica confuso onde encontrar eventos online, uma vez que o evento online pode ser de qualquer outra categoria. 

Cenário 3: Você é uma pessoa que deseja cadastrar um evento gratuito no site. Cadastre um evento presencial no site.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 192.53 segundos                          |
| 2       | SIM             | 5                    | 129.37 segundos                          |
| 3       | SIM             | 5                    | 92.58 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 5                | 138.16 segundos                           |
| **Especialista** | SIM | 5 | 45.21 segundos |

## Avaliação dos Testes de Usabilidade

Os testes de usabilidade realizados com os usuários revelaram resultados positivos em termos de taxa de sucesso e satisfação subjetiva. Em todos os três cenários, os usuários conseguiram concluir as tarefas com sucesso, o que indica que a aplicação web é capaz de atender às necessidades dos usuários.

No cenário 1, os usuários encontraram e participaram de um evento em São Paulo com facilidade, com uma taxa de sucesso de 100% e uma satisfação subjetiva média de 4.33. Os comentários dos usuários indicam que o site é intuitivo e fácil de usar. Já no cenário 2, os usuários também encontraram e participaram de um evento online com sucesso, com uma taxa de sucesso de 100% e uma satisfação subjetiva média de 3.7, no entanto, os usuários sugeriram que o site poderia melhorar a classificação de eventos online para facilitar a busca. E no cenário 3, os usuários cadastraram um evento presencial com facilidade, com uma taxa de sucesso de 100% e uma satisfação subjetiva média de 5. O tempo mais longo deste cenário já era esperado devido à complexidade desta tarefa em comparação às outras.

Em geral, os resultados dos testes de usabilidade indicam que a aplicação web é fácil de usar e atende às necessidades dos usuários. No entanto, há oportunidades de melhoria, especialmente no tempo para conclusão de cada tarefa e na classificação de eventos online.
