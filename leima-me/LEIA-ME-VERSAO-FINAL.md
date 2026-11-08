# RMF Soluções Prediais — pacote atualizado

Abra o projeto por um servidor HTTP (ex.: `python3 -m http.server 8000`) e acesse `http://localhost:8000`.

## Entregas
- Abertura industrial Canvas 2D com revelação progressiva e opção de pular.
- Indicador de progresso da apresentação (não é progresso de download).
- Continuidade visual e animações de entrada durante a rolagem.
- Identidade escura laranja/grafite padronizada.
- Página de parceiros com filtros, busca e modal; fonte `data/parceiros.json`.
- Imagens de empresas existentes inventariadas em `ASSETS-PARA-CONFERIR.md`, sem atribuição de parceria não comprovada.

## Limitações importantes
A abertura é Canvas 2D, não Three.js/WebGL 3D real. Não existe backend administrativo nem autenticação; editar `data/parceiros.json` e adicionar imagens à pasta assets exige acesso aos arquivos. Testes visuais em navegadores e testes ponta a ponta não foram executados neste ambiente.
