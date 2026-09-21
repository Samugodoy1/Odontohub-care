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

O catálogo fica atrás de `CatalogPort` e lê a projeção pública, somente leitura, da API do
OdontoHub. Contas de dentistas com acesso aprovado aparecem automaticamente; o administrador pode
remover ou recolocar cada profissional no Care sem bloquear seu acesso ao sistema.

## Rodar

```bash
npm install
cp .env.example .env.local
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

Tema claro, clínico, no espírito das páginas de saúde da Apple: papel `#f5f5f7`, texto `#1d1d1f`, azul `#0071e3`, muito ar. A copy fala com quem procura um dentista — não com quem avalia software.
