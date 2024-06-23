import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import Settings from './[locale]/components/Settings';
import UserDashboard from './[locale]/components/UserDashboard';
import Intro from './[locale]/components/Intro';
import MainContent from './[locale]/components/MainContent';
import './[locale]/styles/globals.css';

interface ExamConfig {
  questions: any[];
  results?: any;
}

const AppContent: FC = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [examConfig, setExamConfig] = useState<ExamConfig | null>(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url !== '/' && !introComplete) {
        router.push('/');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [introComplete, router]);

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleOpenUserDashboard = () => {
    setShowUserDashboard(true);
  };

  const handleCloseUserDashboard = () => {
    setShowUserDashboard(false);
  };

  if (!introComplete) {
    return <Intro onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <div className="App flex relative">
      <div className={`flex flex-1 ${showSettings || showUserDashboard ? 'blur-background' : ''}`}>
        <div className={`flex-1 ${showSettings || showUserDashboard ? 'blur-content' : ''}`}>
          <MainContent />
        </div>
      </div>
      {showSettings && <Settings onClose={handleCloseSettings} />}
      {showUserDashboard && <UserDashboard user={user} onClose={handleCloseUserDashboard} examData={examConfig?.results || []} />}
    </div>
  );
};

const MyApp = ({ Component, pageProps }: { Component: FC; pageProps: any }) => {
  return (
    <UserProvider>
      <AppContent />
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
