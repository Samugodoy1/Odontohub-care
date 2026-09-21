# OdontoHub Care

Patient discovery for the OdontoHub ecosystem.

Planned domain: [care.odontohub.app.br](https://care.odontohub.app.br)

## Product

OdontoHub is a clinic operations OS. It reduces operational chaos for dentists: patients, schedule, follow-up, the mental load of the day.

**OdontoHub Care** is the patient-facing discovery layer of the same family. It is not a generic dental marketplace.

The patient does not need to know the specialty. They describe the problem in Brazilian Portuguese:

- “Meu dente quebrou”
- “Estou com dor de dente”
- “Preciso tirar o siso”

Care maps that need to compatible professionals in the region.

| Surface | Who it is for |
| --- | --- |
| Academy | Student, the box |
| Hub | Dentist, the consultório |
| Presença | Existing patient |
| Care | Person who does not yet have a dentist |

Dentists who already run the clinic on OdontoHub can appear in Care. The OS also puts the practice in front of people looking for that kind of care.

Care is not a ranking, a coupon wall, or a filter-first doctor catalog. Search starts from the human problem.

## Architecture

```
src/
  app/                 App Router pages, SEO, interest API
  components/care/     Product UI
  components/ui/       shadcn primitives
  lib/intent/          Taxonomy + PT-BR matcher (unit-tested)
  lib/catalog/         Typed models, Brazilian seed, CatalogPort
  lib/design/          Tokens documented in code
  lib/search.ts        Intent + location + catalog orchestration
```

The catalog sits behind `CatalogPort`. Today it is a local seed. Later it can read a projection of OdontoHub (`users.specialty`, `clinic_name`, `cro`, `bio`) without Care writing to Hub.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test          # intent matcher
npm run lint
npm run typecheck
npm run build
```

## Design

Care converses with OdontoHub without cloning the Hub dashboard.

- Heritage: Inter, ink `#1d1d1f`, surface `#f5f5f7`, muted `#86868b`, Apple-like tracking and whitespace.
- Care accent: clinical green `#1F6B57` (already in the Hub brand kit). Hub launches in black and Apple blue; Care stays on paper.
- Language: Brazilian Portuguese. Short sentences. No SaaS feature soup.

Tokens live in `src/lib/design/tokens.ts` and `src/app/globals.css`.

## Intentionally deferred

- Live sync from odontohub-api
- Payments, CRM, full appointment booking
- LLM matcher (taxonomy is the source of truth; an LLM can sit on top later)
- Production lead delivery into Hub

## Publicar no GitHub

O histórico local está limpo na branch `cursor/odontohub-care-mvp-5e34` (product) sobre `main` (scaffold do Create Next App). O token desta sessão é um GitHub App (`ghs_`) instalado só em `lpodontohub`, `odontohub-api`, `academy` e `Drsamuelgodoy`. Ele **não** pode criar repositórios (`createRepository` → `Resource not accessible by integration`).

Como Samugodoy1, com um PAT `repo` ou no browser:

```bash
# 1. Criar o repositório vazio (sem README)
gh auth login
gh repo create Samugodoy1/odontohub-care --private \
  --description "OdontoHub Care — descoberta do paciente no ecossistema OdontoHub"

# 2. Autorizar o GitHub App da Cursor no repo novo
#    GitHub → Settings → Applications → Cursor → Repository access → Add odontohub-care

# 3. Publicar as branches (main = base, feature = MVP)
cd /agent/repos/odontohub-care
git remote add origin https://github.com/Samugodoy1/odontohub-care.git
git push -u origin main
git push -u origin cursor/odontohub-care-mvp-5e34

# 4. Abrir o PR (draft) para main
gh pr create --draft --base main --head cursor/odontohub-care-mvp-5e34 \
  --title "OdontoHub Care — MVP de descoberta do paciente" \
  --body-file - <<'EOF'
OdontoHub é o sistema do consultório. Care é a camada de descoberta do paciente no mesmo ecossistema: a pessoa descreve o que sente em português, o motor de intenção mapeia especialidade e região, e aparecem profissionais da rede OdontoHub.

Não é um marketplace. Sem ranking pago.

Stack: Next.js App Router, TypeScript, Tailwind, shadcn. Código em `/src/lib/intent` (taxonomia + matcher testado) e `/src/lib/catalog` (modelos + seed BR, porta para sync futuro).

Como rodar: `npm install && npm run dev`. Testes: `npm test`.
EOF
```
