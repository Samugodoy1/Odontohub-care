# OdontoHub Care

Dossiê de dentistas verificados da rede OdontoHub.

Domínio planejado: [care.odontohub.app.br](https://care.odontohub.app.br)

## O que é

OdontoHub é o sistema da clínica. **OdontoHub Care** é o portal onde o paciente encontra os dentistas que usam esse sistema — um dossiê de qualidade, específico para o caso.

A pessoa pesquisa no Google:

- “dentista em Taubaté”
- “dentista para limpeza”
- “dentista para extração”

O Care deve aparecer no topo com os profissionais certos. Quem usa o OdontoHub tem o direito de aparecer. Má qualidade ou volume sério de reclamações: desligado do sistema — e fora do Care.

Não é ranking pago, cupom nem marketplace genérico.

| Superfície | Para quem |
| --- | --- |
| Hub | O dentista, o consultório |
| Care | Quem ainda não tem dentista |

## Arquitetura

```
src/
  app/                 Páginas, SEO de cidade/caso, API de interesse
  components/care/     UI do produto
  lib/intent/          Taxonomia + matcher PT-BR
  lib/catalog/         Modelos, seed BR, CatalogPort
  lib/seo/             Casos e slugs de cidade
```

O catálogo fica atrás de `CatalogPort`. Hoje é seed local. Depois pode ler uma projeção do Hub sem o Care escrever no Hub.

## Rodar

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Design

Referência: [Apple Fitness+](https://www.apple.com/br/apple-fitness-plus/) — canvas preto, tipo grande, galerias horizontais, CTA azul, FAQ em escala de produto.

Care fala com o paciente. Hub fala com o dentista. Os dois são a mesma família.
