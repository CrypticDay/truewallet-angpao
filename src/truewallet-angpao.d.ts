declare module 'truewallet-angpao' {
    interface RedeemResult {
        status: 'SUCCESS' | 'FAILED' | 'CORS_ERROR' | string;
        amount?: number;
        message?: string;
    }

    export function clientRedeemAngpao(phone: string, code: string): Promise<RedeemResult>;
}
