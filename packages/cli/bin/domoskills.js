#!/usr/bin/env node

import('../dist/index.js').catch((err) => {
  console.error('Failed to execute domoskills CLI:', err);
  process.exit(1);
});
