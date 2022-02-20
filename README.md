# Cadastro de carros

**RF**
[ok]Deve ser possível cadastrar um novo carro.

**RN**
[ok]Não deve ser possível cadastrar um carro com placa já existente.
[ok]O carro deve estar disponível por padrão.
[ok]O usuário responsável pelo cadastro deve ser um administrador.

# Listagem de carros

**RF**
[ok]Deve ser possível listar todos os carros disponíveis.
[ok]Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
[ok]Deve ser possível listar todos os carros disponíveis pelo nome da marca.
[ok]Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
[]O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
[ok]Deve ser possível cadastrar uma especificação para um carro.
[]Deve ser possível listar todas as especificações.
[ok]Deve ser possível listar todos os carros.

**RN**
[]Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[]Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[ok]O usuário responsável pelo cadastro deve ser um administrador.

# Cadastro de imagens do carro

**RF**
[ok]Deve ser possível cadastrar a imagem do carro.

**RNF**
[ok]Utilizar o multer para upload de arquivos.

**RN**
[ok]O usuário pode cadastrar mais de uma imagem para o mesmo carro.
[ok]O usuário responsável pelo cadastro deve ser um administrador.

# Aluguel de carro

**RF**
[ok]Deve ser possível cadastrar um aluguel

**RN**
[]O aluguel deve ter duração mínima de 24h.
[ok]Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario.
[ok]Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
[ok] O usuário deve estar logado na aplicação
[ok] Ao realizar o aluguel de um carro o status deverá ser alterado para indisponível.

# Aluguel de carro

**RF**
[ok]Deve ser possível realizar a devolução de um carro

**RN**
[ok] Se o carro for devolvido com menos de 24h, deverá ser cobrado diária completa.
[ok] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
[ok] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
[ok] Ao realizar a devolução, deverá ser calculado o total do aluguel.
[ok] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
[ok] Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de alugueis para usuário

**RF**
[ok] Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
[ok] O usuário deve estar logado na aplicação.

# Recuperar senha

**RF**
[] Deve ser possível o usuário recuperar senha usando o e-mail.
[] O usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
[] O usuário deve conseguir inserir uma nova senha.

**RN**
[] O usuário precisa informar uma nova senha.
[] O link enviado para a recuperação deve expirar em 3 horas.
