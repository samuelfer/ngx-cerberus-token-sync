import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenPayload } from './token-payload.model';
import { TokenSyncConfig } from './token-sync.config';
import { TOKEN_SYNC_CONFIG } from './token-sync.tokens';

@Injectable({ providedIn: 'root' })
export class TokenSyncService {
  constructor(
    @Optional() @Inject(TOKEN_SYNC_CONFIG) private config?: TokenSyncConfig
  ) {}

  requestToken(): Observable<TokenPayload | null> {
    if (!this.config) {
      throw new Error('TokenSyncService requires TOKEN_SYNC_CONFIG to be provided.');
    }

    return new Observable((observer) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = this.config!.iframeUrl;
      document.body.appendChild(iframe);

      const handler = (event: MessageEvent) => {
        if (event.origin !== this.config!.trustedOrigin) return;

        if (event.data?.type === 'TOKEN_RESPONSE') {
          window.removeEventListener('message', handler);
          cleanup();
          observer.next({
            accessToken: event.data.accessToken,
            refreshToken: event.data.refreshToken
          });
          observer.complete();
        }
      };

      const cleanup = () => {
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
        window.removeEventListener('message', handler);
      };

      window.addEventListener('message', handler);

      iframe.onload = () => {
        iframe.contentWindow?.postMessage({ type: 'REQUEST_TOKEN' }, this.config!.trustedOrigin);
      };

      setTimeout(() => {
        cleanup();
        observer.next(null);
        observer.complete();
      }, 3000);
    });
  }
}