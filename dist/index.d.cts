interface RedeemResult {
    status: 'SUCCESS' | 'FAIL';
    amount?: number;
    message?: string;
}
declare function redeemAngpao(phone: string, voucherCode: string): Promise<RedeemResult>;

interface ClientRedeemResult {
    status: 'SUCCESS' | 'FAIL' | 'CORS_ERROR';
    amount?: number;
    message?: string;
}
declare function clientRedeemAngpao(phone: string, voucherCode: string): Promise<ClientRedeemResult>;

export { type ClientRedeemResult, type RedeemResult, clientRedeemAngpao, redeemAngpao };
