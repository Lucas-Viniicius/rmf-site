# RMF — Empresas Parceiras

Acesse `parceiros.html` para visualizar a página de parceiros. A página inicial também exibe os primeiros três parceiros.

## Cadastrar empresas

Edite `data/parceiros.json` e inclua registros no array `parceiros`:

```json
{
  "parceiros": [
    {
      "nome": "NOME DA EMPRESA REAL",
      "segmento": "Indústria",
      "descricao": "Breve descrição autorizada pela empresa.",
      "logo": "assets/parceiros/logo.png",
      "foto": "assets/parceiros/fachada.jpg",
      "site": "https://exemplo.com.br",
      "informacoes": "Informações adicionais opcionais."
    }
  ]
}
```

Substitua os dados de exemplo pelos dados reais e imagens autorizadas. Crie `assets/parceiros/` para armazenar os arquivos. Os filtros são gerados automaticamente a partir dos segmentos cadastrados. Os mesmos dados alimentam a página de parceiros e a vitrine inicial.

**Atenção:** este projeto continua sendo um site estático. Não há painel administrativo nem autenticação. Para permitir cadastro via navegador com upload e persistência, será necessário configurar um backend ou CMS seguro. Não coloque senhas ou credenciais no JavaScript.

## Executar localmente

Na pasta do projeto, execute `python3 -m http.server 8000` e acesse `http://localhost:8000`. Abrir o HTML com `file://` impede o carregamento do JSON em muitos navegadores.

## Animação inicial

A abertura utiliza Canvas 2D com engrenagens vetoriais animadas, sem dependências externas. A animação revela marca, textos e botões em sequência e se dissolve automaticamente na página inicial após cerca de 6,5 segundos. Pode ser pulada imediatamente. É exibida uma vez por sessão e respeita `prefers-reduced-motion`. O Canvas original interativo da hero foi preservado.
