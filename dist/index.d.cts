interface RedeemResult {
    status: 'SUCCESS' | 'FAIL';
    amount?: number;
    message?: string;
}
declare function redeemAngpao(phone: string, voucherCode: string): Promise<RedeemResult>;

export { type RedeemResult, redeemAngpao };
