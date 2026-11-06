import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const NO_FOOTER_PATHS = ['/onboarding/quiz', '/invitation/preview'];

export default function PageLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-5 pt-[80px] md:p-8 md:pt-[96px]">
        <Suspense fallback={<div className="py-20 text-center text-sm text-text-muted">불러오는 중...</div>}>
          <Outlet />
        </Suspense>
      </main>
      {!NO_FOOTER_PATHS.includes(pathname) && <Footer />}
    </div>
  );
}