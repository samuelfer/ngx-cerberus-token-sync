import { __decorate, __param } from 'tslib';
import { InjectionToken, Optional, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var TOKEN_SYNC_CONFIG = new InjectionToken('TOKEN_SYNC_CONFIG');

var TokenSyncService = /** @class */ (function () {
    function TokenSyncService(config) {
        this.config = config;
    }
    TokenSyncService.prototype.requestToken = function () {
        var _this = this;
        if (!this.config) {
            throw new Error('TokenSyncService requires TOKEN_SYNC_CONFIG to be provided.');
        }
        return new Observable(function (observer) {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = _this.config.iframeUrl;
            document.body.appendChild(iframe);
            var handler = function (event) {
                var _a;
                if (event.origin !== _this.config.trustedOrigin)
                    return;
                if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.type) === 'TOKEN_RESPONSE') {
                    window.removeEventListener('message', handler);
                    cleanup();
                    observer.next({
                        accessToken: event.data.accessToken,
                        refreshToken: event.data.refreshToken
                    });
                    observer.complete();
                }
            };
            var cleanup = function () {
                if (iframe && iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
                window.removeEventListener('message', handler);
            };
            window.addEventListener('message', handler);
            iframe.onload = function () {
                var _a;
                (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage({ type: 'REQUEST_TOKEN' }, _this.config.trustedOrigin);
            };
            setTimeout(function () {
                cleanup();
                observer.next(null);
                observer.complete();
            }, 3000);
        });
    };
    TokenSyncService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TOKEN_SYNC_CONFIG,] }] }
    ]; };
    TokenSyncService.ɵprov = ɵɵdefineInjectable({ factory: function TokenSyncService_Factory() { return new TokenSyncService(ɵɵinject(TOKEN_SYNC_CONFIG, 8)); }, token: TokenSyncService, providedIn: "root" });
    TokenSyncService = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Optional()), __param(0, Inject(TOKEN_SYNC_CONFIG))
    ], TokenSyncService);
    return TokenSyncService;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { TOKEN_SYNC_CONFIG, TokenSyncService };
//# sourceMappingURL=ngx-cerberus-token-sync.js.map
