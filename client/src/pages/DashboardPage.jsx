import { Layout } from '../components/layout/Layout';
import { BottomBanner } from '../components/auth/BottomBanner';

export const DashboardPage = ({ children, user }) => {
  return (
    <>
      <Layout>
        {children}
      </Layout>
      {!user && <BottomBanner />}
    </>
  );
}