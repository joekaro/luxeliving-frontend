// Suppress Node.js deprecation warnings
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('url.parse')) {
    return; // Ignore this specific warning
  }
  console.warn(warning.name, warning.message);
});

// Start Next.js
require('next/dist/bin/next');