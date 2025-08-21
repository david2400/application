#!/usr/bin/env node

/**
 * Test Runner Script for NestJS Application
 * 
 * This script provides a convenient way to run all tests or specific test suites
 * with proper configuration and reporting.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Test configuration
const TEST_CONFIG = {
  // Jest configuration file
  jestConfig: 'jest.config.js',
  
  // Test patterns
  patterns: {
    all: '**/*.spec.ts',
    services: '**/services/**/*.spec.ts',
    resolvers: '**/resolvers/**/*.spec.ts',
    unit: '**/*.spec.ts',
    e2e: 'test/**/*.e2e-spec.ts'
  },
  
  // Coverage thresholds
  coverage: {
    statements: 80,
    branches: 80,
    functions: 80,
    lines: 80
  }
};

// Available test commands
const COMMANDS = {
  'test': 'Run all tests',
  'test:watch': 'Run all tests in watch mode',
  'test:cov': 'Run tests with coverage',
  'test:debug': 'Run tests in debug mode',
  'test:e2e': 'Run end-to-end tests',
  'test:services': 'Run only service tests',
  'test:resolvers': 'Run only resolver tests',
  'test:unit': 'Run only unit tests',
  'test:generate': 'Generate test coverage report'
};

// Colors for console output
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Print colored output
 */
function print(color, message) {
  console.log(`${color}${message}${COLORS.reset}`);
}

/**
 * Print header
 */
function printHeader() {
  print(COLORS.cyan, '='.repeat(60));
  print(COLORS.bright + COLORS.blue, '🧪 NestJS Test Runner');
  print(COLORS.cyan, '='.repeat(60));
}

/**
 * Print available commands
 */
function printHelp() {
  print(COLORS.yellow, '\nAvailable Commands:');
  Object.entries(COMMANDS).forEach(([cmd, desc]) => {
    print(COLORS.green, `  ${cmd.padEnd(15)} ${desc}`);
  });
  print(COLORS.yellow, '\nExamples:');
  print(COLORS.white, '  node test-runner.js test');
  print(COLORS.white, '  node test-runner.js test:cov');
  print(COLORS.white, '  node test-runner.js test:services');
}

/**
 * Check if Jest is available
 */
function checkJest() {
  try {
    require.resolve('jest');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Check if package.json exists and has test scripts
 */
function checkPackageJson() {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packagePath)) {
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      return pkg.scripts && pkg.scripts.test;
    }
  } catch (e) {
    // Ignore errors
  }
  return false;
}

/**
 * Execute Jest command
 */
function runJest(args) {
  return new Promise((resolve, reject) => {
    const jestProcess = spawn('npx', ['jest', ...args], {
      stdio: 'inherit',
      shell: true
    });

    jestProcess.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Jest process exited with code ${code}`));
      }
    });

    jestProcess.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Execute npm test command
 */
function runNpmTest(args) {
  return new Promise((resolve, reject) => {
    const npmProcess = spawn('npm', ['test', ...args], {
      stdio: 'inherit',
      shell: true
    });

    npmProcess.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`npm test process exited with code ${code}`));
      }
    });

    npmProcess.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Main function
 */
async function main() {
  const command = process.argv[2];

  printHeader();

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  // Check prerequisites
  if (!checkJest()) {
    print(COLORS.red, '❌ Jest is not installed. Please install it first:');
    print(COLORS.white, '   npm install --save-dev jest @types/jest');
    process.exit(1);
  }

  if (!checkPackageJson()) {
    print(COLORS.red, '❌ package.json not found or missing test scripts.');
    process.exit(1);
  }

  try {
    print(COLORS.yellow, `\n🚀 Running: ${command}`);
    print(COLORS.cyan, '-'.repeat(40));

    let args = [];

    switch (command) {
      case 'test':
        // Run all tests
        break;

      case 'test:watch':
        args = ['--watch'];
        break;

      case 'test:cov':
        args = ['--coverage'];
        break;

      case 'test:debug':
        args = ['--runInBand', '--detectOpenHandles'];
        break;

      case 'test:e2e':
        args = ['--config', 'test/jest-e2e.json'];
        break;

      case 'test:services':
        args = ['--testPathPattern', TEST_CONFIG.patterns.services];
        break;

      case 'test:resolvers':
        args = ['--testPathPattern', TEST_CONFIG.patterns.resolvers];
        break;

      case 'test:unit':
        args = ['--testPathPattern', TEST_CONFIG.patterns.unit];
        break;

      case 'test:generate':
        args = ['--coverage', '--coverageReporters', 'html', '--coverageReporters', 'text'];
        break;

      default:
        print(COLORS.red, `❌ Unknown command: ${command}`);
        printHelp();
        process.exit(1);
    }

    // Try to run with Jest first, fallback to npm test
    try {
      await runJest(args);
      print(COLORS.green, '\n✅ Tests completed successfully!');
    } catch (error) {
      print(COLORS.yellow, '\n⚠️  Jest failed, trying npm test...');
      try {
        await runNpmTest(args);
        print(COLORS.green, '\n✅ Tests completed successfully!');
      } catch (npmError) {
        print(COLORS.red, '\n❌ All test execution methods failed.');
        print(COLORS.red, `Jest error: ${error.message}`);
        print(COLORS.red, `npm test error: ${npmError.message}`);
        process.exit(1);
      }
    }

  } catch (error) {
    print(COLORS.red, `\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    print(COLORS.red, `\n❌ Fatal error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { runJest, runNpmTest, TEST_CONFIG };
