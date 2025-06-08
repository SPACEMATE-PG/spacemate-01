
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useMobileNavigation = (fallbackRoute: string = '/role-selection') => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const currentPath = window.location.pathname;
      console.log("Mobile back navigation on:", currentPath);
      
      // If we're at a root level, redirect to fallback instead of closing app
      if (currentPath === '/' || currentPath === '/role-selection') {
        event.preventDefault();
        window.history.pushState(null, "", fallbackRoute);
        navigate(fallbackRoute, { replace: true });
        return;
      }
    };

    // Add initial state to browser history
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, fallbackRoute]);
};

export default useMobileNavigation;
