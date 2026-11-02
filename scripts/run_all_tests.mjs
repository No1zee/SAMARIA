import { spawn } from 'child_process';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, timeout = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch (e) {}
    await sleep(500);
  }
  throw new Error(`Server did not start within ${timeout}ms`);
}

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    console.log(`\n================ RUNNING: ${scriptPath} ================`);
    const proc = spawn('node', [scriptPath], { stdio: 'inherit', shell: true });
    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`[PASS] ${scriptPath}`);
        resolve();
      } else {
        reject(new Error(`Test failed with exit code ${code}: ${scriptPath}`));
      }
    });
  });
}

async function main() {
  console.log(`Starting Next.js production server on port ${PORT}...`);
  const nextProc = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    stdio: 'inherit',
    shell: true,
  });

  try {
    await waitForServer(BASE_URL);
    console.log(`Server running at ${BASE_URL}!`);

    // Run existing test suites
    await runScript('tests/verify_all_routes.mjs');
    await runScript('tests/verify_edge_cases.mjs');
    await runScript('tests/verify_mecha_clone.mjs');

    console.log('\n🎉 ALL PROJECT TEST SUITES PASSED FLAWLESSLY WITH 0 ERRORS!');
  } finally {
    console.log('Terminating Next.js server on port 3000...');
    nextProc.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('\nFAILED TEST RUNNER:', err);
  process.exit(1);
});
