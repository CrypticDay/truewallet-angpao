# 🧧 TrueWallet Angpao Redemption

[![npm version](https://badge.fury.io/js/truemoney-angpao.svg)](https://badge.fury.io/js/truemoney-angpao)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Downloads](https://img.shields.io/npm/dm/truemoney-angpao.svg)](https://www.npmjs.com/package/truemoney-angpao)

> 🎁 A lightweight TypeScript library for redeeming TrueMoney Angpao (red envelope) voucher codes with full CORS support

## ✨ Features

- 🚀 **TypeScript Support** - Full type safety with IntelliSense
- 🌐 **CORS Handling** - Both client-side and server-side implementations
- ⚡ **Zero Dependencies** - Minimal footprint (client version)
- 🔧 **Easy Integration** - React hooks and Express middleware included
- 📱 **Mobile Ready** - Works on all platforms
- 🛡️ **Error Handling** - Comprehensive error messages in Thai/English

## 🚀 Quick Start

### Installation

```bash
# npm
npm install truemoney-angpao

# yarn
yarn add truemoney-angpao

# pnpm
pnpm add truemoney-angpao

# bun
bun add truemoney-angpao
```

### Basic Usage (Server-side)

```ts
import { redeemAngpao } from 'truemoney-angpao';

async function example() {
  const result = await redeemAngpao('0891234567', 'ABC123DEF456');
  
  if (result.status === 'SUCCESS') {
    console.log(`💰 Redeemed ${result.amount} Baht!`);
  } else {
    console.error('❌', result.message);
  }
}
```

### Client-side Usage (Browser)

```ts
import { clientRedeemAngpao } from 'truemoney-angpao/client';

async function redeemInBrowser() {
  const result = await clientRedeemAngpao('0891234567', 'ABC123DEF456');
  
  switch (result.status) {
    case 'SUCCESS':
      console.log(`✅ Success: ${result.amount} Baht`);
      break;
    case 'CORS_ERROR':
      console.log('🚫 CORS Error - Use proxy server');
      break;
    case 'FAIL':
      console.error('❌', result.message);
      break;
  }
}
```

## 📚 Complete Examples

### 🖥️ Express Server Setup

```ts
import express from 'express';
import cors from 'cors';
import { redeemAngpao } from 'truemoney-angpao';

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Redemption endpoint
app.post('/api/redeem', async (req, res) => {
  const { phone, voucherCode } = req.body;

  // Validation
  if (!phone || !voucherCode) {
    return res.status(400).json({ 
      error: 'Phone and voucherCode are required' 
    });
  }

  try {
    const result = await redeemAngpao(phone, voucherCode);
    res.json(result);
  } catch (error) {
    console.error('Redemption error:', error);
    res.status(500).json({ 
      status: 'FAIL', 
      message: (error as Error).message 
    });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🧧 TrueMoney Angpao API Ready!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### ⚛️ React Hook Implementation

```tsx
// hooks/useAngpaoRedemption.ts
import { useState, useCallback } from 'react';
import { clientRedeemAngpao, ClientRedeemResult } from 'truemoney-angpao/client';

interface UseAngpaoRedemption {
  redeem: (phone: string, voucherCode: string) => Promise<ClientRedeemResult>;
  loading: boolean;
  error: string | null;
  result: ClientRedeemResult | null;
  reset: () => void;
}

export function useAngpaoRedemption(): UseAngpaoRedemption {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClientRedeemResult | null>(null);

  const redeem = useCallback(async (phone: string, voucherCode: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await clientRedeemAngpao(phone, voucherCode);
      setResult(response);
      
      if (response.status === 'FAIL') {
        setError(response.message || 'Redemption failed');
      }
      
      return response;
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      return { status: 'FAIL' as const, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setResult(null);
  }, []);

  return { redeem, loading, error, result, reset };
}
```

### 🎨 React Component Example

```tsx
// components/AngpaoRedeemer.tsx
import React, { useState } from 'react';
import { useAngpaoRedemption } from '../hooks/useAngpaoRedemption';

export function AngpaoRedeemer() {
  const [phone, setPhone] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const { redeem, loading, error, result, reset } = useAngpaoRedemption();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !voucherCode) {
      alert('กรุณากรอกเบอร์โทรและรหัสอั่งเปา');
      return;
    }

    const response = await redeem(phone, voucherCode);
    
    if (response.status === 'SUCCESS') {
      alert(`🎉 แลกสำเร็จ! ได้รับ ${response.amount} บาท`);
    } else if (response.status === 'CORS_ERROR') {
      alert('❌ ข้อผิดพลาด CORS - กรุณาใช้ Proxy Server');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
        🧧 แลกอั่งเปา TrueMoney
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="089xxxxxxx"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            maxLength={10}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            รหัสอั่งเปา
          </label>
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
            placeholder="ABC123DEF456"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '⏳ กำลังแลก...' : '🎁 แลกอั่งเปา'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">❌ {error}</p>
        </div>
      )}

      {result && result.status === 'SUCCESS' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 text-sm">
            ✅ แลกสำเร็จ! ได้รับ <strong>{result.amount} บาท</strong>
          </p>
        </div>
      )}

      {result && result.status === 'CORS_ERROR' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700 text-sm">
            ⚠️ CORS Error: กรุณาใช้ Proxy Server สำหรับการใช้งานจริง
          </p>
        </div>
      )}

      {(error || result) && (
        <button
          onClick={reset}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          ล้างข้อมูล
        </button>
      )}
    </div>
  );
}
```

## 📋 API Reference

### Server-side Functions

#### `redeemAngpao(phone: string, voucherCode: string): Promise<RedeemResult>`

Redeems an Angpao voucher using Node.js (no CORS issues).

**Parameters:**
- `phone`: Thai mobile number (e.g., `'0891234567'`)
- `voucherCode`: Angpao voucher code (e.g., `'ABC123DEF456'`)

**Returns:**
```ts
type RedeemResult = 
  | { status: 'SUCCESS'; amount: number }
  | { status: 'FAIL'; message: string };
```

### Client-side Functions

#### `clientRedeemAngpao(phone: string, voucherCode: string): Promise<ClientRedeemResult>`

Redeems an Angpao voucher in the browser (may have CORS issues).

**Returns:**
```ts
type ClientRedeemResult = 
  | { status: 'SUCCESS'; amount: number }
  | { status: 'FAIL'; message: string }
  | { status: 'CORS_ERROR'; message: string };
```

## 🔧 Configuration

### Environment Variables

```bash
# Optional: Set custom API endpoint
TRUEMONEY_API_URL=https://gift.truemoney.com

# Server port
PORT=3000
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 🛡️ Error Handling

The library provides detailed error messages for common scenarios:

| Error Type | Description | Solution |
|------------|-------------|----------|
| `CORS_ERROR` | Cross-origin request blocked | Use server-side proxy |
| `INVALID_VOUCHER` | Invalid voucher code format | Check code format |
| `EXPIRED_VOUCHER` | Voucher has expired | Use valid voucher |
| `ALREADY_REDEEMED` | Voucher already used | Use new voucher |
| `NETWORK_ERROR` | Connection failed | Check internet connection |

## 🚀 Deployment

### Vercel

```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node"
    }
  }
}
```

### Netlify

```toml
[build]
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Railway

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Install dev dependencies
npm install -D jest @types/jest ts-jest

# Run tests
npm test

# Run with coverage
npm run test:coverage
```

Example test:

```ts
import { redeemAngpao } from '../src/redeemAngpao';

describe('redeemAngpao', () => {
  it('should handle successful redemption', async () => {
    const result = await redeemAngpao('0891234567', 'VALID_CODE');
    expect(result.status).toBe('SUCCESS');
    expect(result.amount).toBeGreaterThan(0);
  });

  it('should handle invalid voucher', async () => {
    const result = await redeemAngpao('0891234567', 'INVALID_CODE');
    expect(result.status).toBe('FAIL');
    expect(result.message).toContain('invalid');
  });
});
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repo
git clone https://github.com/CrypticDay/truemoney-angpao.git
cd truemoney-angpao

# Install dependencies
npm install

# Start development
npm run dev

# Build
npm run build

# Test
npm test
```

## 📈 Roadmap

- [x] ✅ TypeScript support
- [x] ✅ CORS handling
- [x] ✅ React hooks
- [x] ✅ Express middleware
- [ ] 🔄 CLI tool
- [ ] 🔄 Batch redemption
- [ ] 🔄 Rate limiting
- [ ] 🔄 Webhook support
- [ ] 🔄 Mobile app SDK

## 📄 License

MIT © 2025 - See [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TrueMoney team for providing the API
- Thai developer community for feedback and suggestions
- Contributors who helped improve this library

---

<div align="center">

**Made with ❤️ for the Thai developer community**

[📖 Documentation](https://github.com/CrypticDay/truemoney-angpao#readme) •
[🐛 Report Bug](https://github.com/CrypticDay/truemoney-angpao/issues) •
[✨ Request Feature](https://github.com/CrypticDay/truemoney-angpao/issues)