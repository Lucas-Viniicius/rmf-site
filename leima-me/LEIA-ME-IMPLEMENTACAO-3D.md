# RMF — Entrega técnica

## Alterações desta versão
- Engrenagens 3D de geometria extrudada com Three.js, metal PBR, eixos, iluminação dinâmica, resposta ao mouse e rolagem.
- Integração WebGL na introdução e no elemento interativo da página inicial; mantém Canvas 2D original como fallback caso o módulo Three.js não carregue.
- Textos e ações aparecem progressivamente durante a introdução; transição automática ou botão de pular.
- Mantidas as demais páginas, a navegação, os formulários, os filtros e modais de parceiros e a estrutura JSON.

## Executar
No diretório que contém `index.html`, execute `python3 -m http.server 8000` e abra `http://localhost:8000`.

## Dependências e limites
O módulo Three.js é carregado por CDN (jsDelivr). A experiência 3D requer conexão à internet, navegador com WebGL e hardware compatível. Em caso de falha, a introdução Canvas 2D permanece disponível. Não foi possível testar a renderização em todos os dispositivos reais.

## Empresas parceiras
Os arquivos em `assets/logo-empresas/` não são prova de parceria. Para não apresentar relações comerciais não confirmadas, a lista pública permanece vazia até cadastro em `data/parceiros.json`. Veja `COMO-EDITAR-PARCEIROS.md`. Não há painel administrativo com backend; a atualização exige editar o JSON.

## Verificações
Verificação estática de sintaxe JavaScript e integridade do ZIP. A publicação final deve passar por teste de navegação, compatibilidade WebGL e revisão de conteúdo em navegador.
