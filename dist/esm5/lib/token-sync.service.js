import { __decorate, __param } from "tslib";
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN_SYNC_CONFIG } from './token-sync.tokens';
import * as i0 from "@angular/core";
import * as i1 from "./token-sync.tokens";
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
    TokenSyncService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TokenSyncService_Factory() { return new TokenSyncService(i0.ɵɵinject(i1.TOKEN_SYNC_CONFIG, 8)); }, token: TokenSyncService, providedIn: "root" });
    TokenSyncService = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Optional()), __param(0, Inject(TOKEN_SYNC_CONFIG))
    ], TokenSyncService);
    return TokenSyncService;
}());
export { TokenSyncService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4tc3luYy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNlcmJlcnVzLXRva2VuLXN5bmMvIiwic291cmNlcyI6WyJsaWIvdG9rZW4tc3luYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBR3hEO0lBQ0UsMEJBQ2lELE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQ3RFLENBQUM7SUFFSix1Q0FBWSxHQUFaO1FBQUEsaUJBNENDO1FBM0NDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQztTQUNoRjtRQUVELE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBQyxRQUFRO1lBQzdCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLE1BQU8sQ0FBQyxTQUFTLENBQUM7WUFDcEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbEMsSUFBTSxPQUFPLEdBQUcsVUFBQyxLQUFtQjs7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFJLENBQUMsTUFBTyxDQUFDLGFBQWE7b0JBQUUsT0FBTztnQkFFeEQsSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLDBDQUFFLElBQUksTUFBSyxnQkFBZ0IsRUFBRTtvQkFDekMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDL0MsT0FBTyxFQUFFLENBQUM7b0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDWixXQUFXLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXO3dCQUNuQyxZQUFZLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZO3FCQUN0QyxDQUFDLENBQUM7b0JBQ0gsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQztZQUVGLElBQU0sT0FBTyxHQUFHO2dCQUNkLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7b0JBQy9CLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN2QztnQkFDRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQztZQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFNUMsTUFBTSxDQUFDLE1BQU0sR0FBRzs7Z0JBQ2QsTUFBQSxNQUFNLENBQUMsYUFBYSwwQ0FBRSxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsS0FBSSxDQUFDLE1BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDM0YsQ0FBQyxDQUFDO1lBRUYsVUFBVSxDQUFDO2dCQUNULE9BQU8sRUFBRSxDQUFDO2dCQUNWLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dEQS9DRSxRQUFRLFlBQUksTUFBTSxTQUFDLGlCQUFpQjs7O0lBRjVCLGdCQUFnQjtRQUQ1QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFHOUIsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUE7T0FGN0IsZ0JBQWdCLENBa0Q1QjsyQkF6REQ7Q0F5REMsQUFsREQsSUFrREM7U0FsRFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVG9rZW5QYXlsb2FkIH0gZnJvbSAnLi90b2tlbi1wYXlsb2FkLm1vZGVsJztcbmltcG9ydCB7IFRva2VuU3luY0NvbmZpZyB9IGZyb20gJy4vdG9rZW4tc3luYy5jb25maWcnO1xuaW1wb3J0IHsgVE9LRU5fU1lOQ19DT05GSUcgfSBmcm9tICcuL3Rva2VuLXN5bmMudG9rZW5zJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBUb2tlblN5bmNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChUT0tFTl9TWU5DX0NPTkZJRykgcHJpdmF0ZSBjb25maWc/OiBUb2tlblN5bmNDb25maWdcbiAgKSB7fVxuXG4gIHJlcXVlc3RUb2tlbigpOiBPYnNlcnZhYmxlPFRva2VuUGF5bG9hZCB8IG51bGw+IHtcbiAgICBpZiAoIXRoaXMuY29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rva2VuU3luY1NlcnZpY2UgcmVxdWlyZXMgVE9LRU5fU1lOQ19DT05GSUcgdG8gYmUgcHJvdmlkZWQuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGlmcmFtZS5zcmMgPSB0aGlzLmNvbmZpZyEuaWZyYW1lVXJsO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuXG4gICAgICBjb25zdCBoYW5kbGVyID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbiAhPT0gdGhpcy5jb25maWchLnRydXN0ZWRPcmlnaW4pIHJldHVybjtcblxuICAgICAgICBpZiAoZXZlbnQuZGF0YT8udHlwZSA9PT0gJ1RPS0VOX1JFU1BPTlNFJykge1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlcik7XG4gICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoe1xuICAgICAgICAgICAgYWNjZXNzVG9rZW46IGV2ZW50LmRhdGEuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICByZWZyZXNoVG9rZW46IGV2ZW50LmRhdGEucmVmcmVzaFRva2VuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlmcmFtZSAmJiBpZnJhbWUucGFyZW50Tm9kZSkge1xuICAgICAgICAgIGlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVyKTtcbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlcik7XG5cbiAgICAgIGlmcmFtZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93Py5wb3N0TWVzc2FnZSh7IHR5cGU6ICdSRVFVRVNUX1RPS0VOJyB9LCB0aGlzLmNvbmZpZyEudHJ1c3RlZE9yaWdpbik7XG4gICAgICB9O1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICBvYnNlcnZlci5uZXh0KG51bGwpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfSwgMzAwMCk7XG4gICAgfSk7XG4gIH1cbn0iXX0=