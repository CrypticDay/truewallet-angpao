// src/clientRedeemAngpao.ts

export interface ClientRedeemResult {
    status: 'SUCCESS' | 'FAIL' | 'CORS_ERROR';
    amount?: number;
    message?: string;
}

export async function clientRedeemAngpao(phone: string, voucherCode: string): Promise<ClientRedeemResult> {
    try {
        const url = `https://gift.truemoney.com/campaign/vouchers/${voucherCode}/redeem`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
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
        const errorMessage = (error as Error).message;


        if (errorMessage.includes('CORS') ||
            errorMessage.includes('Cross-Origin') ||
            errorMessage.includes('blocked')) {
            return {
                status: 'CORS_ERROR',
                message: 'CORS Error: ต้องแก้ไขการตั้งค่า CORS หรือใช้ Proxy Server',
            };
        }

        return {
            status: 'FAIL',
            message: errorMessage,
        };
    }
}