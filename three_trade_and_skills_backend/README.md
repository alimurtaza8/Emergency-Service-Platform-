# Three Trades and Skills Emergency Service Platform - Backend

This repository contains the Internet Computer canister (smart contract) backend for the Three Trades and Skills Emergency Service Platform.

## Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)
- DFINITY Canister SDK (DFX) - Installation instructions below

## Installing the DFINITY Canister SDK

### Windows
1. Download the installer from the official DFINITY website: https://sdk.dfinity.org/
2. If you encounter script execution policy restrictions, you can:
   - Download the latest release from GitHub: https://github.com/dfinity/sdk/releases
   - Extract the contents to a folder on your computer
   - Add the folder path to your system PATH

### macOS and Linux
```bash
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

## Setup

1. Ensure the DFINITY Canister SDK is installed:
```bash
dfx --version
```

2. If you haven't already cloned the repository:
```bash
git clone <repository-url>
cd three_trade_and_skills_backend
```

3. Install dependencies:
```bash
npm install
```

## Local Development

1. Start a local Internet Computer replica:
```bash
dfx start --clean --background
```

2. Deploy the canisters to the local replica:
```bash
dfx deploy
```

3. Note the canister ID for integration with the frontend:
```bash
dfx canister id three_trade_and_skills_backend_backend
```

## Production Deployment

1. Ensure you have sufficient cycles in your wallet for deployment.

2. Deploy to the Internet Computer mainnet:
```bash
dfx deploy --network ic
```

3. Note the canister ID for integration with the frontend:
```bash
dfx canister id three_trade_and_skills_backend_backend --network ic
```

## Integration with the Website

1. In the website directory, update the `.env.local` file with the canister ID:
```
NEXT_PUBLIC_BACKEND_CANISTER_ID=<your-canister-id>
```

2. Ensure the necessary packages are installed in the frontend project:
```bash
npm install @dfinity/agent @dfinity/candid @dfinity/principal
```

## Smart Contract API

The backend canister provides the following API functionalities:

### User Management
- `createUser`: Create a new user profile
- `updateUserProfile`: Update an existing user profile
- `getUserProfile`: Retrieve a user's profile information
- `deleteUser`: Delete a user profile

### Payment Methods
- `addPaymentMethod`: Add a payment method for a user
- `getUserPaymentMethods`: Retrieve a user's payment methods
- `deletePaymentMethod`: Remove a payment method

### Emergency Calls
- `initiateEmergencyCall`: Start a new emergency service call
- `updateEmergencyCallStatus`: Update the status of an emergency call
- `getEmergencyCallDetails`: Get details of a specific emergency call
- `getUserEmergencyCalls`: Get all emergency calls for a specific user
- `getAllEmergencyCalls`: Get all emergency calls in the system

### Service Providers
- `registerServiceProvider`: Register a new service provider
- `updateServiceProvider`: Update an existing service provider's information
- `getServiceProviders`: Get all service providers, optionally filtered by trade
- `assignServiceProviderToCall`: Assign a service provider to an emergency call

### System Stats
- `getSystemStats`: Get system-wide statistics

## Alternative Deployment (Without DFX)

If you're unable to install the DFINITY Canister SDK, you can use the project's existing build configurations:

1. Build the project using npm:
```bash
npm run build
```

2. For deploying to IC without dfx, you can use the IC Deployment JS library:
```bash
npm install -g @dfinity/ic-deploy
ic-deploy deploy ./src/three_trade_and_skills_backend_backend/main.mo
```

## Troubleshooting

- **Error: The replica is not running**: Make sure you've started the local replica with `dfx start --clean --background`
- **Error: Cannot find canister ID**: Ensure you've deployed the canister first with `dfx deploy`
- **Error: Failed to deploy**: Check your cycles balance if deploying to mainnet, or ensure your local replica is running

## Additional Resources

- [DFINITY SDK Documentation](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove)
- [Motoko Language Reference](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/)
- [Internet Computer Dashboard](https://dashboard.internetcomputer.org/)

Welcome to your new `three_trade_and_skills_backend` project and to the Internet Computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with `three_trade_and_skills_backend`, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd three_trade_and_skills_backend/
dfx help
dfx canister --help
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
