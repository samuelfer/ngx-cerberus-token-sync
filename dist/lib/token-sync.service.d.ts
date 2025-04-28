import { Observable } from 'rxjs';
import { TokenPayload } from './token-payload.model';
import { TokenSyncConfig } from './token-sync.config';
export declare class TokenSyncService {
    private config?;
    constructor(config?: TokenSyncConfig);
    requestToken(): Observable<TokenPayload | null>;
}
