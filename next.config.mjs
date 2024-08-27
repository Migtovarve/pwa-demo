import withPWA from 'next-pwa';

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // Otras configuraciones de Next.js
});

export default config;