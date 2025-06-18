# 🧧 TrueWallet Angpao Redemption (TypeScript)

ไลบรารีสำหรับใช้แลกรับเงินจากรหัสอั่งเปา (Angpao) บน TrueWallet

## 🔧 ตัวอย่างการใช้งานทั่วไป

```ts
export async function exampleUsage() {
    const result = await clientRedeemAngpao('0891234567', 'ABC123DEF456');

    switch (result.status) {
        case 'SUCCESS':
            console.log(`รับเงินสำเร็จ: ${result.amount} บาท`);
            break;
        case 'CORS_ERROR':
            console.error('เกิดปัญหา CORS:', result.message);
            console.log('แนะนำให้ Dev:');
            console.log('1. ใช้ Proxy Server');
            console.log('2. ตั้งค่า CORS Policy ในเซิร์ฟเวอร์');
            console.log('3. ใช้ Browser Extension สำหรับ Disable CORS (เฉพาะ Development)');
            break;
        case 'FAIL':
            console.error('เกิดข้อผิดพลาด:', result.message);
            break;
    }
}



```


⚛️ ใช้ใน React Component (Custom Hook)
```ts
export function useAngpaoRedemption() {
    const redeemAngpao = async (phone: string, voucherCode: string) => {
        return await clientRedeemAngpao(phone, voucherCode);
    };

    return { redeemAngpao };
}
```
