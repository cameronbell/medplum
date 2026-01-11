import type { WS } from 'jest-websocket-mock';
import type { MedplumClient } from '../client';
export declare function sendHandshakeBundle(wsServer: WS, subscriptionId: string): void;
export declare function sendSubscriptionMessage(wsServer: WS, medplum: MedplumClient, subscriptionId: string, message: string): Promise<void>;
//# sourceMappingURL=test-utils.d.ts.map