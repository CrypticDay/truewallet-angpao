// src/redeemAngpao.ts
import fetch from 'node-fetch'

export interface RedeemResult {
    status: 'SUCCESS' | 'FAIL';
    amount?: number;
    message?: string;
}

export async function redeemAngpao(phone: string, voucherCode: string): Promise<RedeemResult> {
    try {
        const url = `https://gift.truemoney.com/campaign/vouchers/${voucherCode}/redeem`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: phone,
                voucher_hash: voucherCode
            })
        });

        const data: any = await response.json();

        if (data.status.code === 'SUCCESS') {
            return {
                status: 'SUCCESS',
                amount: data.data.amount_baht,
            };
        } else {
            return {
                status: 'FAIL',
                message: data.status.message || 'Unknown error',
            };
        }
    } catch (error) {
        return {
            status: 'FAIL',
            message: (error as Error).message,
        };
    }
}
