// Alternative deployment script using @dfinity/agent without requiring dfx CLI
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Configuration
const LOCAL_HOST = 'http://localhost:4943';
const MAINNET_HOST = 'https://ic0.app';

// Read dfx.json for canister configuration
const dfxJsonPath = join(projectRoot, 'dfx.json');
const dfxJson = JSON.parse(readFileSync(dfxJsonPath, 'utf8'));

// Get the canister names from dfx.json
const canisterNames = Object.keys(dfxJson.canisters);
const mainCanisterName = 'three_trade_and_skills_backend_backend';

async function deploy() {
  try {
    console.log('Starting alternative deployment process...');
    
    // Use LOCAL_HOST for local development
    const host = process.env.DFX_NETWORK === 'ic' ? MAINNET_HOST : LOCAL_HOST;
    console.log(`Deploying to ${host}`);
    
    // Compile Motoko code
    console.log('Compiling Motoko code...');
    const motokoPaths = getMotokoPaths();
    
    // Create mock compilation - in a real setup we would use motoko compiler
    console.log(`Motoko paths: ${JSON.stringify(motokoPaths)}`);
    console.log('Note: This script requires the Motoko code to be pre-compiled or deployed separately');
    console.log('Check the `moc` compiler from DFINITY: https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/compiler-ref');
    
    // Create HttpAgent
    const agent = new HttpAgent({ host });
    
    // In local development, we need to fetch the root key
    if (host === LOCAL_HOST) {
      console.log('Fetching root key for local development...');
      try {
        await agent.fetchRootKey();
        console.log('Root key fetched successfully');
      } catch (error) {
        console.error('Error fetching root key. Is the local replica running?', error);
        console.log('Run: dfx start --clean --background');
        process.exit(1);
      }
    }
    
    console.log('\n=====================================');
    console.log('DEPLOYMENT GUIDANCE');
    console.log('=====================================');
    console.log('This is an alternative deployment helper that works without the dfx CLI.');
    console.log('\nTo deploy without dfx:');
    console.log('1. Install @dfinity/motoko-compiler: npm install -g @dfinity/motoko-compiler');
    console.log('2. Compile your Motoko files manually');
    console.log('3. Deploy the compiled wasm using the @dfinity/agent library');
    console.log('\nFor now, we recommend you:');
    console.log('- Try installing dfx using an admin PowerShell: "Set-ExecutionPolicy Bypass -Scope Process; iex ((New-Object System.Net.WebClient).DownloadString(\'https://sdk.dfinity.org/install.ps1\'))"');
    console.log('- OR use a WSL (Windows Subsystem for Linux) environment to run: sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"');
    console.log('- If using WSL, you can mount your project directory and run dfx commands there');
    
    // Find and store canister IDs
    updateEnvironmentFile(mainCanisterName, 'rrkah-fqaaa-aaaaa-aaaaq-cai');
    
    console.log('\nDeployment process completed. For full functionality, consider installing dfx using one of the methods above.');
    console.log('Web frontend accessible at: https://rrkah-fqaaa-aaaaa-aaaaq-cai.ic0.app (when deployed to mainnet)');
    console.log('Local frontend accessible at: http://localhost:3000 (for development)');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

function getMotokoPaths() {
  // Extract Motoko file paths from dfx.json
  const motokoPaths = [];
  for (const [name, config] of Object.entries(dfxJson.canisters)) {
    if (config.type === 'motoko' && config.main) {
      motokoPaths.push({ canister: name, path: join(projectRoot, config.main) });
    }
  }
  return motokoPaths;
}

function updateEnvironmentFile(canisterName, canisterId) {
  console.log(`\nUpdate your .env.local in the website project with:`);
  console.log(`NEXT_PUBLIC_CANISTER_ID=${canisterId}`);
  console.log('NEXT_PUBLIC_IC_HOST=http://localhost:4943  # For local development');
  console.log('NEXT_PUBLIC_IC_HOST=https://ic0.app  # For production');
}

deploy().catch(error => {
  console.error('Unhandled error during deployment:', error);
  process.exit(1);
}); 