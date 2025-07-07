# Estrutura do Código Fonte

Este diretório contém o código fonte da biblioteca MutterCorpService.

## Arquivos Principais

- `index.js` - Ponto de entrada da biblioteca, exporta a API pública
- `MutterCorpService.js` - Implementação da classe principal do serviço
- `constants.js` - Constantes utilizadas em toda a biblioteca

## Diretório `utils`

- `request.js` - Funções utilitárias para construção de URLs e requisições
- `error-handling.js` - Classes e funções para tratamento de erros

## Fluxo de Execução

1. O usuário importa `MutterCorpService` ou `MutterCorpServiceFactory` de `index.js`
2. Cria uma instância do serviço usando a factory ou diretamente
3. Utiliza os métodos da instância para interagir com a API MutterCorp
4. Internamente, os métodos utilizam `makeRequest` para fazer requisições HTTP
5. As requisições são processadas e os erros são tratados adequadamente

## Extensão

Para adicionar novos endpoints ou funcionalidades:

1. Adicione novos métodos à classe `MutterCorpService`
2. Se necessário, adicione novas constantes em `constants.js`
3. Se necessário, adicione novas funções utilitárias em `utils/`