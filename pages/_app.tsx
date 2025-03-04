// pages/_app.tsx
import '../node_modules/antd/dist/reset.css';
// console.log('If this logs, the import works.');
import '../styles/globals.css';  // Adjust the path based on your structure
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // You can include any global providers or layout components that will wrap your application
    <Component {...pageProps} />
  );
}

export default MyApp;
