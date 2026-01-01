import MainLayout from '@/components/Layout/MainLayout';
import './globals.css';

export const metadata = {
  title: 'AST PAY Dashboard',
  description: 'Panel Marketing Internal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
