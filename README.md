
````markdown
# 🧧 TrueWallet Angpao Redemption (TypeScript)

A lightweight TypeScript library for redeeming TrueMoney Angpao (red envelope) voucher codes.

## 🔧 Installation

Install via npm:

```bash
npm install truemoney-angpao
````

## 📖 Usage

### 🔹 Basic Usage

```ts
import { redeemAngpao } from 'truemoney-angpao';

async function exampleUsage() {
  const result = await redeemAngpao('0891234567', 'ABC123DEF456');

  switch (result.status) {
    case 'SUCCESS':
      console.log(`Redemption successful: ${result.amount} Baht`);
      break;
    case 'FAIL':
      console.error('Redemption failed:', result.message);
      break;
  }
}
```

---

### 🖥️ Using in a Server (CORS-safe)

You can set up an Express server to handle redemption securely:

```ts
import express from 'express';
import { redeemAngpao } from 'truemoney-angpao';

const app = express();
app.use(express.json());

app.post('/redeem', async (req, res) => {
  const { phone, voucherCode } = req.body;

  if (!phone || !voucherCode) {
    return res.status(400).json({ error: 'Phone and voucherCode are required' });
  }

  try {
    const result = await redeemAngpao(phone, voucherCode);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: 'FAIL', message: (error as Error).message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### ▶️ Run the server

```bash
npm install express truemoney-angpao
tsc server.ts
node server.js
```

### 🔁 Test it

```bash
curl -X POST http://localhost:3000/redeem \
-H "Content-Type: application/json" \
-d '{"phone":"0891234567","voucherCode":"ABC123DEF456"}'
```

---

## ⚛️ React Integration with Custom Hook

### `useAngpaoRedemption.ts`

```ts
import { useState } from 'react';
import { redeemAngpao } from 'truemoney-angpao';

export function useAngpaoRedemption() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RedeemResult | null>(null);

  const redeem = async (phone: string, voucherCode: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await redeemAngpao(phone, voucherCode);
      setResult(response);
      return response;
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      return { status: 'FAIL', message };
    } finally {
      setLoading(false);
    }
  };

  return { redeem, loading, error, result };
}
```

### Example Component

```tsx
import { useAngpaoRedemption } from './useAngpaoRedemption';

function RedeemComponent() {
  const { redeem, loading, error, result } = useAngpaoRedemption();

  const handleRedeem = async () => {
    const response = await redeem('0891234567', 'ABC123DEF456');
    if (response.status === 'SUCCESS') {
      alert(`Success! Redeemed ${response.amount} Baht`);
    } else {
      alert(`Failed: ${response.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleRedeem} disabled={loading}>
        {loading ? 'Redeeming...' : 'Redeem Angpao'}
      </button>
      {error && <p>Error: {error}</p>}
      {result && result.status === 'SUCCESS' && (
        <p>Success! Redeemed {result.amount} Baht</p>
      )}
    </div>
  );
}
```

---

## 📘 API Reference

### `redeemAngpao(phone: string, voucherCode: string): Promise<RedeemResult>`

Redeems an Angpao voucher for the specified phone number.

#### Parameters:

* `phone`: Phone number (e.g., `'0891234567'`)
* `voucherCode`: Voucher code (e.g., `'ABC123DEF456'`)

#### Returns:

```ts
type RedeemResult =
  | { status: 'SUCCESS'; amount: number }
  | { status: 'FAIL'; message: string };
```

---

## 🚧 Development Notes

* Requires `node-fetch` for HTTP requests (installed automatically).
* Set up a server-side proxy to avoid CORS issues in production.
* **Do not** disable CORS in browsers for production use.

---

## 🔐 Security Tips

* Always validate input before redemption.
* Do not expose internal APIs or secrets in frontend code.
* Log only necessary information.

---

## 🧪 Coming Soon

* ✅ Unit tests
* 🌐 CLI redemption
* 📱 Mobile support

---

## 📜 License

MIT © 2025

---

Let me know if you'd like this README in **Thai**, or with badge icons (like build passing, npm version, etc.) as well.


````