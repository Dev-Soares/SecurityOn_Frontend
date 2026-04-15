# SecurityOn — Frontend

Interface do **SecurityOn**, uma plataforma comunitária de segurança digital. Permite que usuários façam posts na comunidade, publiquem denúncias de golpes/fraudes e escrevam artigos informativos.

Construído com **React 19**, **TypeScript**, **Tailwind CSS v4** e **TanStack Query**.

> A API que alimenta este frontend está em [SecurityOn_Backend](../SecurityOn_Backend/).

---

## Sumário

- [Estrutura do projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rodando o projeto](#rodando-o-projeto)
- [Páginas e funcionalidades](#páginas-e-funcionalidades)
- [Arquitetura frontend](#arquitetura-frontend)

---

## Estrutura do projeto

```
src/
├── api/
│   ├── axios.ts                     # Instância axios configurada
│   └── interceptors/
│       └── forbidden-interceptor.ts # Redireciona ao login em 401/403
│
├── modules/
│   ├── auth/                        # Login, cadastro, logout, auto-login
│   │   ├── components/              # LoginForm, SignupForm
│   │   ├── hooks/                   # useSignIn, useSignUp, useLogout, useAutoLogin
│   │   ├── service/
│   │   ├── skeletons/               # LoginSkeleton, SignupSkeleton
│   │   └── types/
│   ├── articles/                    # Artigos informativos
│   │   ├── components/              # ArticleCard
│   │   ├── hooks/                   # useFindAllArticles, useGetArticle, useCreateArticle, ...
│   │   ├── service/
│   │   ├── skeletons/               # ArticleCardSkeleton, ArticleDetailSkeleton
│   │   └── types/
│   ├── community/                   # Posts da comunidade
│   │   ├── components/              # Post, CreatePostForm, ModalPost
│   │   ├── contexts/                # modalPostContext
│   │   ├── hooks/                   # useFindAllPosts, useCreatePost, useDeletePost, ...
│   │   ├── service/
│   │   ├── skeletons/               # PostSkeleton
│   │   └── types/
│   ├── complaints/                  # Denúncias de golpes e fraudes
│   │   ├── components/              # ComplaintCard, ComplaintContent, CreateComplaintForm, SelectDanger
│   │   ├── config/                  # dangerConfig.ts — níveis de perigo
│   │   ├── hooks/                   # useFindAllComplaints, useCreateComplaint, ...
│   │   ├── service/
│   │   ├── skeletons/               # ComplaintCardSkeleton
│   │   └── types/
│   └── profile/                     # Perfil do usuário
│       ├── components/              # ProfileBanner, ProfileInfo, ProfilePosts, ProfileComplaints, ProfileArticles
│       ├── hooks/                   # useGetUser, useUpdateUser, useDeleteUser
│       ├── service/
│       ├── skeletons/               # ProfileSkeleton
│       └── types/
│
├── shared/
│   ├── components/                  # Input, Spinner, Toast, SearchBar, ProfileCard, ToggleTheme, ...
│   ├── contexts/                    # userContext, themeContext
│   ├── hooks/                       # useFindMe, useNavigateTo, useInfiniteScroll
│   ├── layouts/                     # Header, Sidebar, BottomNav, Content
│   └── utils/                       # scrollToTop.ts, shareLink.ts
│
└── pages/
    ├── MainPage.tsx
    ├── LoginPage.tsx
    ├── SignupPage.tsx
    ├── CommunityPage.tsx
    ├── ComplaintsPage.tsx
    ├── CreateComplaintPage.tsx
    ├── ArticlesPage.tsx
    ├── ArticleDetailPage.tsx
    ├── CreateArticlePage.tsx
    └── ProfilePage.tsx
```

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | UI |
| TypeScript | Tipagem |
| Tailwind CSS v4 | Estilização |
| TanStack Query v5 | Cache e server state |
| React Hook Form v7 + Zod v4 | Formulários com validação |
| Axios | HTTP client |
| React Hot Toast | Notificações |
| Phosphor Icons | Ícones |
| React Router v7 | Roteamento |

---

## Pré-requisitos

- Node.js >= 20
- npm ou pnpm
- [SecurityOn_Backend](../SecurityOn_Backend/) rodando

---

## Instalação

```bash
git clone <url-do-repositorio>
cd SecurityOn_Frontend
npm install
# ou
pnpm install
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# URL base da API (SecurityOn_Backend)
VITE_SERVER_URL=http://localhost:3000
```

> Ajuste a porta conforme a `PORT` configurada no backend (padrão `3333`).

---

## Rodando o projeto

> **Antes de iniciar o frontend**, certifique-se de que o [SecurityOn_Backend](../SecurityOn_Backend/) está rodando e acessível na URL configurada em `VITE_SERVER_URL`.

```bash
# Desenvolvimento
npm run dev
# ou
pnpm dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

O frontend sobe em `http://localhost:5173`.

---

## Páginas e funcionalidades

| Página | Rota | Acesso | Descrição |
|---|---|---|---|
| Main | `/` | Público | Landing page da plataforma |
| Login | `/login` | Público | Autenticação |
| Cadastro | `/signup` | Público | Criação de conta |
| Comunidade | `/community` | Público | Feed de posts com scroll infinito |
| Denúncias | `/complaints` | Público | Lista de denúncias com scroll infinito |
| Nova Denúncia | `/complaints/create` | Autenticado | Formulário de denúncia |
| Artigos | `/articles` | Público | Lista de artigos |
| Artigo | `/articles/:id` | Público | Leitura de artigo completo |
| Novo Artigo | `/articles/create` | Autenticado | Editor de artigo |
| Perfil | `/profile/:id` | Público | Posts, denúncias e artigos do usuário |

### Funcionalidades principais

- **Comunidade** — posts com texto e imagem opcional; criação, edição e exclusão pelo autor
- **Denúncias** — título, descrição, nível de perigo (`aviso`, `perigo`, `crítico`), loja e link opcionais
- **Artigos** — título, conteúdo e imagem de capa
- **Scroll infinito** — paginação por cursor em todos os feeds (`useInfiniteScroll`)
- **Perfil** — exibe posts, denúncias e artigos do usuário com abas; edição de nome e exclusão de conta
- **Tema** — dark/light mode com persistência no localStorage
- **Compartilhamento** — `shareLink.ts` usa a Web Share API para compartilhar conteúdo

---

## Arquitetura frontend

O projeto segue uma arquitetura modular:

```
Page → Module Hook → Service → api/axios → Backend
              ↓
           shared/
```

- **Pages** — apenas composição e roteamento, sem lógica
- **modules/`<feature>`/** — toda lógica encapsulada em hooks TanStack Query
- **service/** — funções puras para chamadas de API (singular, nunca `services/`)
- **types/** — tipos TypeScript + schemas Zod (nunca `schemas/` separado)
- **skeletons/** — loading states com `animate-pulse` para cada componente assíncrono
- **shared/** — componentes e hooks reutilizáveis em 2+ módulos

Estado de servidor → `useQuery` / `useMutation`. Estado de UI → `useState`. Estado global (auth, tema) → React Context.
