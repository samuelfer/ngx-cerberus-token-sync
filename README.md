# ngx-cerberus-token-sync

Uma biblioteca Angular para sincronização de tokens entre aplicações por meio de comunicação via `postMessage` e `iframe`. Ideal para cenários onde múltiplas aplicações compartilham o mesmo contexto de autenticação.

## ✅ Compatibilidade

- Angular `9.x` até versões mais recentes (`17+`)
- Suporte ao Ivy opcional (configurável para compatibilidade com versões antigas)
- Suporte ao RxJS `^6.0.0 || ^7.0.0`

---

## 📦 Instalação

> Configurar no .npmrc da sua aplicação para baixar a lib do GitLab a url do repositório de libs: @tcepb:registry=https://gitlab.tce.pb.gov.br/api/v4/projects/366/packages/npm/
//gitlab.tce.pb.gov.br/api/v4/projects/366/packages/npm/:_authToken=SEU_TOKEN_GERADO_NO_GIT_LAB

```bash
npm install ngx-cerberus-token-sync
```

> **Nota:** Essa biblioteca depende do Angular e RxJS. Eles devem estar instalados no projeto que irá consumi-la.

---

## 🚀 Como usar 
**Nota:** Essa configuração é feita apenas na aplicação que envia o token

### 📤 Aplicação que **envia o token**

Essa aplicação (geralmente a responsável pela autenticação) precisa responder ao evento `REQUEST_TOKEN` via `postMessage`.

```ts
window.addEventListener('message', (event) => {
  if (event.data?.type === 'REQUEST_TOKEN') {
    const token = sessionStorage.getItem('access_token');
    (event.source as Window)?.postMessage(
      { type: 'TOKEN_RESPONSE', token },
      event.origin
    );
  }
});
```

Cria uma rota como `/iframe.html` que carrega o Angular e mantém o listener disponível.

---

### 📥 Aplicação que **recebe o token**

Essa aplicação irá carregar o `iframe` de forma oculta, enviar uma solicitação de token e escutar a resposta.

#### 1. Importe o módulo da biblioteca em seu app.module.ts

```ts
import { TokenSyncService } from 'ngx-cerberus-token-sync';

providers: [
    {
      provide: TOKEN_SYNC_CONFIG,
      useValue: {
        iframeUrl: 'http://localhost:4209',        // URL da aplicação que envia o token
        trustedOrigin: 'http://localhost:4209'     // Origem confiável
      }
    },
    TokenSyncService,
];
```

#### 2. Utilize o serviço em seu componente - app.component.ts ou em um arquivo que seja executado antes do processo de pegar o token com a lib NgxCerberus

```ts
this.tokenSyncService.requestToken().subscribe((token) => {
    console.log('[ClientApp] Token recebido via postMessage:', token);
    sessionStorage.setItem('access_token', token);
});
```

---

## 🧪 API

### `TokenSyncService`

#### `requestToken(iframeUrl: string): Observable<string | null>`

Cria dinamicamente um `iframe` oculto, envia um evento `postMessage` solicitando o token, e aguarda uma resposta com um tempo limite de 3 segundos.

Parâmetros:
- `iframeUrl`: URL que será carregada no `iframe`, apontando para o app que contém o listener.

Retorno:
- Um `Observable<string | null>` com o token ou `null` em caso de falha ou timeout.
