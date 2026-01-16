import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.css';

export const metadata = {
  title: 'AST PAY Dashboard',
  description: 'Panel Marketing Internal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
