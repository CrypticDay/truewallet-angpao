🧧 TrueWallet Angpao Redemption (TypeScript)
A TypeScript library for redeeming money from Angpao (red envelope) codes on TrueWallet.
🔧 Installation
Install the library using npm:
npm install truemoney-angpao

📖 Usage
Basic Usage
Here's how to use the library to redeem an Angpao voucher:
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

Using in a Server Environment
To handle CORS issues and improve security, you can set up a server to proxy requests to the TrueWallet API. Below is an example using Node.js with Express:
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

To run the server:

Install dependencies:

npm install express truemoney-angpao


Save the code above as server.ts and compile/run it:

tsc server.ts
node server.js


Make a POST request to the server:

curl -X POST http://localhost:3000/redeem \
-H "Content-Type: application/json" \
-d '{"phone":"0891234567","voucherCode":"ABC123DEF456"}'

Handling CORS in Development
If you encounter CORS issues during development, consider the following solutions:

Use a Proxy Server: Set up a server (like the one above) to handle requests and bypass CORS restrictions.
Configure CORS Policy: If you control the server, configure it to allow CORS from your frontend's origin.
Browser Extensions: Use a browser extension to disable CORS for development purposes only (e.g., "CORS Unblock" for Chrome).

Note: Disabling CORS in the browser is not recommended for production environments.
⚛️ Using in React (Custom Hook)
You can create a custom hook to integrate the redemption functionality into a React application:
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
            setError((err as Error).message);
            return { status: 'FAIL', message: (err as Error).message };
        } finally {
            setLoading(false);
        }
    };

    return { redeem, loading, error, result };
}

Usage in a React component:
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

🛠️ API Reference
redeemAngpao(phone: string, voucherCode: string): Promise<RedeemResult>
Redeems an Angpao voucher for the specified phone number.

Parameters:

phone: The phone number to redeem the voucher for (e.g., '0891234567').
voucherCode: The Angpao voucher code (e.g., 'ABC123DEF456').


Returns: A Promise<RedeemResult> with the following structure:

status: 'SUCCESS' or 'FAIL'.
amount?: The redeemed amount in Baht (only if status is 'SUCCESS').
message?: Error message (only if status is 'FAIL').



⚠️ Notes

Ensure the phone number and voucher code are valid before making a request.
The library uses node-fetch for HTTP requests. Make sure it is installed in your project.
For production use, always handle CORS properly using a proxy server or appropriate CORS configuration.

