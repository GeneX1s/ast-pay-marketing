import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'AST PAY Dashboard',
  description: 'Panel Marketing Internal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
