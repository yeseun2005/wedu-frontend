import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from './components';

// 첫 진입 페이지라 바로 불러옴 (lazy로 하면 랜딩을 그리기 전에 요청이 한 번 더 생겨서 LCP가 늦어짐)
import LandingPage from './pages/Landing/LandingPage';

const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const AuthCallbackPage = lazy(() => import('./pages/Login/AuthCallbackPage'));

const ShopPage = lazy(() => import('./pages/Shop/ShopPage'));
const ShopDetailPage = lazy(() => import('./pages/Shop/ShopDetailPage'));
const WishlistPage = lazy(() => import('./pages/Shop/WishlistPage'));
const CartPage = lazy(() => import('./pages/Shop/CartPage'));

const BuilderPage = lazy(() => import('./pages/Builder/BuilderPage'));
const BuilderStartPage = lazy(() => import('./pages/Builder/BuilderStartPage'));
const BuilderCartPage = lazy(() => import('./pages/Builder/BuilderCartPage'));

const ChecklistPage = lazy(() => import('./pages/Checklist/ChecklistPage'));
const SharedChecklistPage = lazy(() => import('./pages/Checklist/SharedChecklistPage'));
const CalendarPage = lazy(() => import('./pages/Calendar/CalendarPage'));
const BudgetPage = lazy(() => import('./pages/Budget/BudgetPage'));

const CommunityPage = lazy(() => import('./pages/Community/CommunityPage'));
const CommunityDetailPage = lazy(() => import('./pages/Community/CommunityDetailPage'));
const CommunityWritePage = lazy(() => import('./pages/Community/CommunityWritePage'));

const MypagePage = lazy(() => import('./pages/Mypage/MypagePage'));
const MypageEditPage = lazy(() => import('./pages/Mypage/MypageEditPage'));
const DashboardSection = lazy(() => import('./pages/Mypage/components/DashboardSection'));

const DDayPage = lazy(() => import('./pages/Dashboard/DDayPage'));

const OnboardingStartPage = lazy(() => import('./pages/Onboarding/OnboardingStartPage'));
const OnboardingIntroPage = lazy(() => import('./pages/Onboarding/OnboardingIntroPage'));
const QuizPage = lazy(() => import('./pages/Onboarding/QuizPage'));
const PartnerMbtiPage = lazy(() => import('./pages/Onboarding/PartnerMbtiPage'));
const ResultPage = lazy(() => import('./pages/Onboarding/ResultPage'));
import { OnboardingProvider } from './pages/Onboarding/OnboardingContext';

const WeddingShopPage = lazy(() => import('./pages/WeddingShop/WeddingShopPage'));
const WeddingShopDetailPage = lazy(() => import('./pages/WeddingShop/WeddingShopDetailPage'));
const WeddingEstimatePage = lazy(() => import('./pages/WeddingEstimate/WeddingEstimatePage'));

const InvitationPage = lazy(() => import('./pages/invitation/InvitationPage'));
const InvitationCreatePage = lazy(() => import('./pages/invitation/InvitationCreatePage'));
const InvitationDetailPage = lazy(() => import('./pages/invitation/InvitationDetailPage'));
const InvitationPublicViewPage = lazy(() => import('./pages/invitation/InvitationPublicViewPage'));

const ConnectPage = lazy(() => import('./pages/Partner/ConnectPage'));
const WeddingMagazinePage = lazy(() => import('./pages/WeddingMagazine/WeddingMagazinePage'));
const WeddingMagazineDetailPage = lazy(() => import('./pages/WeddingMagazine/WeddingMagazineDetailPage'));
const SharePage = lazy(() => import('./pages/Share/SharePage'));

import { DDayProvider } from './contexts/DDayContext';
import { BudgetProvider } from './pages/Budget/hooks/useBudget';
import { ChecklistProvider } from './pages/Checklist/hooks/useChecklist';
import { ScheduleProvider } from './pages/Calendar/hooks/useSchedules';
import { BuilderProvider } from './pages/Builder/BuilderContext';
import { CommunityProvider } from './pages/Community/CommunityContext';
import { WishlistProvider } from './pages/Shop/WishlistContext';
import { CartProvider } from './pages/Shop/CartContext';

import ScrollToTop from './components/ScrollToTop';
const SharedBudgetPage = lazy(() => import('./pages/Budget/SharedBudgetPage'));
const SharedCalendarPage = lazy(() => import('./pages/Calendar/SharedCalendarPage'));
const SharedDDayPage = lazy(() => import('./pages/Dashboard/SharedDDayPage'));

function OnboardingRoutes() {
  return (
    <OnboardingProvider>
      <PageLayout />
    </OnboardingProvider>
  );
}

export default function App() {
  return (
    <DDayProvider>
      <BudgetProvider>
        <ChecklistProvider>
          <ScheduleProvider>
            <CommunityProvider>
              <WishlistProvider>
                <CartProvider>
                  <ScrollToTop />
                  <Suspense fallback={null}>
                    <Routes>
                      <Route path="/" element={<Navigate to="/home" replace />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/auth/callback" element={<AuthCallbackPage />} />
                      <Route
                        path="/oauth2/authorization/google"
                        element={<AuthCallbackPage />}
                      />
                      <Route
                        path="/oauth2/authorization/kakao"
                        element={<AuthCallbackPage />}
                      />
                      <Route path="/share/:token" element={<SharePage />} />
                      {/* 헤더/네비게이션 없는 조회 전용 청첩장 공유 페이지 (로그인 여부와 무관하게 접근 가능) */}
                      <Route path="/invitation/view/:id" element={<InvitationPublicViewPage />} />

                      <Route element={<OnboardingRoutes />}>
                        <Route path="/onboarding" element={<OnboardingStartPage />} />
                        <Route path="/onboarding/intro" element={<OnboardingIntroPage />} />
                        <Route path="/onboarding/quiz" element={<QuizPage />} />
                        <Route path="/onboarding/partner" element={<PartnerMbtiPage />} />
                        <Route path="/onboarding/result" element={<ResultPage />} />
                      </Route>

                      <Route element={<PageLayout />}>
                        <Route path="/home" element={<LandingPage />} />
                        <Route path="/dday" element={<DDayPage />} />
                        <Route
                          path="/shared/dday/:token"
                          element={<SharedDDayPage />}
                        />

                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/shop/:id" element={<ShopDetailPage />} />
                        <Route path="/shop/wishlist" element={<WishlistPage />} />
                        <Route path="/shop/cart" element={<CartPage />} />

                        <Route path="/wedding-shop" element={<WeddingShopPage />} />
                        <Route
                          path="/wedding-shop/:id"
                          element={<WeddingShopDetailPage />}
                        />
                        <Route
                          path="/wedding-estimate"
                          element={<WeddingEstimatePage />}
                        />

                        <Route
                          path="/builder-start"
                          element={
                            <BuilderProvider>
                              <BuilderStartPage />
                            </BuilderProvider>
                          }
                        />
                        <Route
                          path="/builder"
                          element={
                            <BuilderProvider>
                              <BuilderPage />
                            </BuilderProvider>
                          }
                        />
                        <Route
                          path="/builder/cart"
                          element={
                            <BuilderProvider>
                              <BuilderCartPage />
                            </BuilderProvider>
                          }
                        />

                        <Route path="/checklist" element={<ChecklistPage />} />
                        <Route
                          path="/shared/checklist/:token"
                          element={<SharedChecklistPage />}
                        />
                        <Route path="/calendar" element={<CalendarPage />} />
                        <Route
                          path="/shared/calendar/:token"
                          element={<SharedCalendarPage />}
                        />
                        <Route path="/budget" element={<BudgetPage />} />
                        <Route
                          path="/shared/budget/:token"
                          element={<SharedBudgetPage />}
                        />

                        <Route path="/community" element={<CommunityPage />} />
                        <Route
                          path="/community/:id"
                          element={<CommunityDetailPage />}
                        />
                        <Route
                          path="/community/write"
                          element={<CommunityWritePage />}
                        />

                        <Route path="/mypage" element={<MypagePage />} />
                        <Route
                          path="/mypage/dashboard"
                          element={<DashboardSection />}
                        />
                        <Route
                          path="/mypage/edit"
                          element={<MypageEditPage />}
                        />

                        <Route path="/connect" element={<ConnectPage />} />
                        <Route path="/magazine" element={<WeddingMagazinePage />} />
                        <Route path="/magazine/:id" element={<WeddingMagazineDetailPage />} />

                        <Route path="/invitation" element={<InvitationPage />} />
                        <Route
                          path="/invitation/create"
                          element={<InvitationCreatePage />}
                        />
                        <Route
                          path="/invitation/preview"
                          element={<InvitationDetailPage />}
                        />
                        <Route
                          path="/invitation/:id"
                          element={<InvitationDetailPage />}
                        />
                      </Route>
                    </Routes>
                  </Suspense>
                </CartProvider>
              </WishlistProvider>
            </CommunityProvider>
          </ScheduleProvider>
        </ChecklistProvider>
      </BudgetProvider>
    </DDayProvider>
  );
}
