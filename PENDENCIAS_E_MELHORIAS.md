# PENDENCIAS E MELHORIAS - Frontend (SecurityOn)

> Revisado por: Engenheiro Staff+ | Data: 2026-03-25

---

## 🔴 CRITICO

### 1. Problema de N+1 queries no componente Post

**Descricao:** Cada componente `Post` faz uma chamada individual `useGetUser(userId)` para buscar os dados do usuario. Em uma lista de 20 posts, isso gera 20 requests HTTP separados ao backend.

**Por que e um problema:**
- Performance desastrosa — a quantidade de requests escala linearmente com os posts
- Cada post mostra um skeleton ate o request individual completar, causando "flickering" na UI
- O backend recebe uma enxurrada de requests identicos (muitos posts sao do mesmo usuario)
- Isso e o classico problema N+1, um dos anti-patterns mais conhecidos de performance

**Como corrigir:**
- O backend deveria retornar os dados do usuario junto com o post (populate/include no Prisma)
- Alternativa no front: criar um cache de usuarios no React Query e fazer batch das requests
- O ideal e mudar a API: `prisma.post.findMany({ include: { user: { select: { name: true, avatarUrl: true } } } })`

---

### 2. Hook useUpdatePost com bug de design

**Descricao:** O `useUpdatePost(id, data)` recebe os dados na criacao do hook, nao na chamada da mutation. A `mutationFn` captura `data` por closure em vez de receber como argumento.

**Por que e um problema:**
- O `data` e fixado no momento em que o hook e criado — se o formulario mudar depois, a mutation usa dados stale
- Vai contra o padrao do React Query onde `mutationFn` recebe os dados no momento do `mutate(data)`
- O mesmo bug existe em `useUpdateArticle` e `useUpdateComplaint`

**Como corrigir:**
- Remover `data` dos parametros do hook
- Passar `data` como argumento da `mutationFn`: `mutationFn: (data: UpdatePost) => updatePostService(id, data)`
- Chamar via `mutate(formData)` em vez de `mutate()`

---

### 3. CreateArticlePage sem validacao de formulario

**Descricao:** A pagina de criacao de artigo usa `useState` manual para cada campo, sem react-hook-form e sem schema Zod — ao contrario de TODOS os outros formularios do projeto.

**Por que e um problema:**
- Inconsistencia grave dentro do mesmo projeto — o dev usou react-hook-form + Zod em login, signup e complaints, mas abandonou o padrao em articles
- Sem validacao de schema, dados invalidos podem ser enviados ao backend
- Sem feedback de erro no formulario para o usuario
- O backend rejeita, mas o usuario nao sabe por que

**Como corrigir:**
- Criar um schema Zod para `CreateArticle` (como ja existe para `CreateComplaint`)
- Usar `useForm` com `zodResolver` como nos outros formularios
- Adicionar exibicao de erros de validacao

---

### 4. Rotas protegidas sem guard de autenticacao

**Descricao:** Rotas como `/create-complaint`, `/create-article`, `/profile/:id` nao verificam se o usuario esta autenticado antes de renderizar.

**Por que e um problema:**
- Um usuario nao autenticado pode acessar paginas de criacao
- O formulario renderiza normalmente, e so falha quando tenta submeter (erro 401 do backend)
- Experiencia de usuario ruim e potencial exposicao de UI interna

**Como corrigir:**
- Criar um componente `ProtectedRoute` que verifica autenticacao e redireciona para `/login`
- Envolver as rotas que exigem auth com esse componente
- Mostrar loading enquanto verifica o estado de auth

---

### 5. Sem tratamento de 401 (token expirado)

**Descricao:** O interceptor do Axios so trata status 403 (forbidden), redirecionando para login. Nao trata 401 (unauthorized/token expirado).

**Por que e um problema:**
- Quando o JWT expira (24h), o usuario recebe erros silenciosos em vez de ser redirecionado
- Nao existe refresh token — a sessao simplesmente quebra
- O usuario fica preso em uma UI quebrada sem saber que precisa logar de novo

**Como corrigir:**
- Adicionar tratamento de 401 no interceptor, redirecionando para login
- Implementar refresh token rotation no backend e interceptor de retry no front
- Limpar o estado do usuario (context) quando receber 401

---

## 🟡 MEDIO

### 6. Duplicacao massiva de services e hooks

**Descricao:** Os arquivos de service (`createPostService`, `findAllPostService`, etc.) e hooks (`useCreatePost`, `useFindAllPosts`, etc.) seguem o mesmo padrao copy-paste em 3 modulos (posts, complaints, articles). Sao ~18 arquivos com estrutura identica.

**Por que e um problema:**
- Viola DRY severamente
- Qualquer mudanca no padrao (ex: adicionar tratamento de erro) precisa ser feita em 18 arquivos
- A logica de infinite query com cursor e identica em 3 hooks

**Como corrigir:**
- Criar funcoes factory genericas: `createCrudService<T>(endpoint)` e `useCrudMutation<T>(service, queryKey)`
- Criar um hook generico de paginacao: `useInfinitePagination(queryKey, fetchFn)`
- Manter os tipos especificos, mas reutilizar a logica

---

### 7. 30 arquivos com import desnecessario de React

**Descricao:** Encontrei 30 arquivos com `import React from 'react'` — desnecessario desde React 17+ com o novo JSX transform.

**Por que e um problema:**
- Codigo morto em 30 arquivos
- Gera warnings de TypeScript (`declared but never read`)
- Ja causou erro de build (o fix que fizemos no inicio da conversa)

**Como corrigir:**
- Remover `import React from 'react'` de todos os 30 arquivos
- Manter apenas quando `React` e usado diretamente (ex: `React.FC`, `React.useState`) — mas nesses casos, preferir import nomeado

---

### 8. Dependencia `styled-components` instalada e nao utilizada

**Descricao:** O `package.json` lista `styled-components` como dependencia, mas nenhum arquivo do projeto a utiliza. O projeto usa Tailwind CSS.

**Por que e um problema:**
- Aumenta o bundle desnecessariamente
- Aumenta o tempo de install
- Confunde outros devs sobre qual abordagem de CSS o projeto usa

**Como corrigir:**
- `pnpm remove styled-components`

---

### 9. Hook useNavigateTo e uma abstracao desnecessaria

**Descricao:** O hook `useNavigateTo` apenas encapsula `useNavigate` retornando a mesma funcao. Zero logica adicional.

**Por que e um problema:**
- Viola YAGNI — nao adiciona valor
- Adiciona uma camada de indirection sem motivo
- Outros devs precisam abrir o arquivo para descobrir que e so um wrapper

**Como corrigir:**
- Remover o hook e usar `useNavigate()` diretamente
- Se precisar de logica adicional no futuro (analytics, confirmacao), ai sim justifica um wrapper

---

### 10. ThemeProvider usa `children: any`

**Descricao:** Em `themeContext.tsx`, o tipo de `children` e `any` em vez de `React.ReactNode`.

**Por que e um problema:**
- Perde type-safety — qualquer valor e aceito, incluindo tipos invalidos
- Viola a boa pratica de tipagem forte do TypeScript

**Como corrigir:**
- Trocar `{ children: any }` por `{ children: React.ReactNode }`

---

### 11. LogoIcon usa useEffect + useState desnecessariamente

**Descricao:** O componente `LogoIcon` usa `useState` e `useEffect` para definir qual logo mostrar baseado no tema, quando isso poderia ser feito com renderizacao condicional direta.

**Por que e um problema:**
- useEffect para derivar dados de props/context e um anti-pattern no React
- Causa uma renderizacao extra desnecessaria (render inicial + effect update)
- Adiciona complexidade sem motivo

**Como corrigir:**
- Remover o state e o effect
- Derivar o logo diretamente: `const logo = theme === 'dark' ? darkLogo : lightLogo`
- Ou usar renderizacao condicional no JSX

---

### 12. Mensagens de erro genericas nos mutations

**Descricao:** Todos os `onError` dos hooks de mutation mostram mensagens genericas como "Erro ao fazer login", sem incluir detalhes do erro do servidor.

**Por que e um problema:**
- O usuario nao sabe o que errou (senha incorreta? email nao existe? servidor fora?)
- O backend pode estar retornando mensagens uteis que sao ignoradas

**Como corrigir:**
- Acessar `error.response.data.message` no callback `onError`
- Mostrar a mensagem do servidor quando disponivel, com fallback generico

---

### 13. Componentes Skeleton duplicados

**Descricao:** `PostSkeleton`, `ArticleCardSkeleton`, `ComplaintCardSkeleton` seguem o mesmo padrao com pequenas variacoes.

**Como corrigir:**
- Criar um componente `SkeletonBlock` generico com props de layout
- Compor os skeletons especificos a partir do generico

---

## 🟢 MELHORIAS FUTURAS

### 14. Sem Error Boundaries

**Descricao:** Nao ha Error Boundaries no projeto. Se um componente quebrar, a pagina inteira cai.

**Como corrigir:**
- Adicionar Error Boundaries nas rotas principais
- Mostrar uma UI de fallback amigavel em vez de tela branca

---

### 15. Sem lazy loading de imagens

**Descricao:** Imagens de posts e artigos carregam todas de uma vez, sem `loading="lazy"`.

**Como corrigir:**
- Adicionar `loading="lazy"` nas tags `<img>`
- Considerar `Intersection Observer` para carregamento sob demanda

---

### 16. Sem memoizacao em componentes de lista

**Descricao:** Componentes como `Post`, `ArticleCard`, `ComplaintCard` nao usam `React.memo`. Em listas longas com infinite scroll, todos re-renderizam quando novos itens sao adicionados.

**Como corrigir:**
- Envolver componentes de lista com `React.memo`
- Usar `useCallback` para funcoes passadas como props

---

### 17. Falta de barrel exports (index.ts)

**Descricao:** Nenhum modulo tem arquivo `index.ts` para re-exportar seus componentes/hooks/types.

**Como corrigir:**
- Criar `index.ts` em cada modulo exportando as partes publicas
- Simplifica os imports: `from '@/modules/community'` em vez de paths longos

---

### 18. Cores hardcoded no Tailwind

**Descricao:** Cores como `blue-500`, `gray-900`, `gray-200` sao repetidas em dezenas de componentes sem usar o sistema de design tokens do Tailwind.

**Como corrigir:**
- Definir cores semanticas no `tailwind.config` (ex: `primary`, `surface`, `on-surface`)
- Usar as cores semanticas nos componentes
- Facilita mudancas futuras de tema

---

### 19. SelectDanger duplica configuracao de niveis de perigo

**Descricao:** O componente `SelectDanger` define os niveis de perigo localmente, mas ja existe um `dangerConfig.ts` com a mesma informacao.

**Como corrigir:**
- Importar a configuracao de `dangerConfig.ts` em vez de redefinir localmente
- Single source of truth

---

### 20. Sem configuracao de staleTime no React Query

**Descricao:** Nenhuma query configura `staleTime`, fazendo com que todas as queries sejam refetched agressivamente.

**Como corrigir:**
- Configurar `staleTime` global no `QueryClient` (ex: 5 minutos para dados que mudam pouco)
- Configurar por query quando necessario (ex: dados de usuario podem ter staleTime maior)
