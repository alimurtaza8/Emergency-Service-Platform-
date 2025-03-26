# Three Trades and Skills Emergency Service Platform

This is the frontend website for the Three Trades and Skills Emergency Service Platform, integrated with Internet Computer (ICP) backend canisters and Square Payment.

## Features

- User registration and account management
- Subscription plans (residential and business)
- Payment processing through Square
- Emergency service requests
- Real-time technician tracking
- Admin dashboard for service providers and system monitoring

## Setup and Installation

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- DFINITY Canister SDK (dfx) - for canister deployment and development

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-org/three-trades-and-skills-website.git
   cd three-trades-and-skills-website
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Copy the environment variables file and configure it:
   ```
   cp .env.local.example .env.local
   ```

4. Edit `.env.local` to set your environment-specific variables.

5. Start the development server:
   ```
npm run dev
   ```

## Canister Integration

The website is designed to integrate with the Three Trades and Skills backend canister deployed on the Internet Computer.

### Local Development with Canister

1. Start a local Internet Computer replica in another terminal:
   ```
   cd ../three_trade_and_skills_backend
   dfx start --clean --background
   ```

2. Deploy the canister locally:
   ```
   dfx deploy
   ```

3. Update your `.env.local` file with the local canister ID:
   ```
   NEXT_PUBLIC_CANISTER_ID=<your-local-canister-id>
   NEXT_PUBLIC_IC_HOST=http://localhost:4943
   ```

### Production Deployment with Canister

1. Deploy the canister to the Internet Computer mainnet:
   ```
   cd ../three_trade_and_skills_backend
   dfx deploy --network ic
   ```

2. Update your `.env.local` file with the production canister ID:
   ```
   NEXT_PUBLIC_CANISTER_ID=<your-production-canister-id>
   NEXT_PUBLIC_IC_HOST=https://ic0.app
   ```

## Square Payment Integration

The platform uses Square for payment processing. You'll need to set up a Square Developer account to get the required credentials.

### Setting up Square

1. Create a Square Developer account at [https://developer.squareup.com/](https://developer.squareup.com/)

2. Create a new application in the Square Developer Dashboard

3. Get your Square credentials:
   - Application ID
   - Location ID
   - Access Token

4. Add these credentials to your `.env.local` file:
   ```
   NEXT_PUBLIC_SQUARE_APP_ID=your_square_app_id
   NEXT_PUBLIC_SQUARE_LOCATION_ID=your_square_location_id
   SQUARE_ACCESS_TOKEN=your_square_access_token
   ```

### Testing Square Payments

Square provides a sandbox environment for testing payments without processing real transactions:

1. Set the sandbox mode in your `.env.local`:
   ```
   NEXT_PUBLIC_SQUARE_SANDBOX=true
   ```

2. Use the following test card details for payments:
   - Card Number: `4111 1111 1111 1111`
   - Expiration: Any future date
   - CVV: Any 3 digits
   - ZIP Code: Any 5 digits

3. When ready for production, update your `.env.local`:
   ```
   NEXT_PUBLIC_SQUARE_SANDBOX=false
   ```

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository

2. Connect your repository to Vercel: [https://vercel.com/import](https://vercel.com/import)

3. Configure the environment variables in the Vercel dashboard

4. Deploy the application

### Building for Production

To build the application for production deployment:

```
npm run build
```

The built application will be in the `.next` folder.

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and shared code
  - `/lib/canister` - Internet Computer canister client and interface definitions
  - `/lib/square-payments` - Square payment integration utilities
  - `/lib/auth` - Authentication utilities

## Testing

Run the tests with:

```
npm test
```

## License

[MIT](LICENSE)

## Support

For support or inquiries, please contact [support@threetrades.com](mailto:support@threetrades.com).
