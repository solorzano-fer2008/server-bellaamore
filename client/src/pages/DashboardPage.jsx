import { Layout } from '../components/layout/Layout';
import { BottomBanner } from '../components/auth/BottomBanner';

export const DashboardPage = ({ children, user }) => {
  return (
    <>
      <Layout user={user}>
        {typeof children === 'function' ? children(user) : children}
      </Layout>
      {!user && <BottomBanner />}
    </>
  );
}