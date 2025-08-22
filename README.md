# Projeto

Este é um projeto feito para demonstrar o funcionamento do `onoper` uma linguagem de marcação que transforma listas em uma interface de visual.

## Acesso

Você pode acessar o projeto através do seguinte link: [onoper](https://onoper-preview.vercel.app)

## Como usar

Existem alguns metacaracteres que você pode usar para construir sua interface:

```
- [<id>] <name>: Define um item da lista (o metacaractere `-` é opcional).

! <name>: Define um problema, ele necessáriamente precisa ser filho de um item.

# <name>: Define um comentário e ele deve ser filho de um item.

> <id>: Define um link para o item com o ID especificado, ele deve ser filho de um item.
```

## Links 

- [Repositório do onoper](https://github.com/onoper-lang/core)
- [Documentação do onoper](https://github.com/onoper-lang/core/blob/main/docs/)