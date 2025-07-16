import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { viewports, setViewport } from '../setup';

// Mock AuthContext values
vi.mock('@/contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    isAuthenticated: true,
    userRole: 'PG_GUEST',
    currentUser: {
      name: 'Test User',
      email: 'test@example.com',
      profileImage: null,
    },
    logout: vi.fn(),
  }),
}));

const renderLayout = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Layout Component', () => {
  describe('Mobile View', () => {
    beforeEach(() => {
      setViewport(viewports.mobile.width, viewports.mobile.height);
    });

    it('should show bottom navigation on mobile', () => {
      renderLayout();
      const bottomNav = screen.getByRole('navigation');
      expect(bottomNav).toBeInTheDocument();
      expect(bottomNav).toHaveClass('fixed bottom-0');
    });

    it('should hide desktop profile section on mobile', () => {
      renderLayout();
      const profileSection = screen.queryByText('Test User');
      expect(profileSection).not.toBeVisible();
    });
  });

  describe('Desktop View', () => {
    beforeEach(() => {
      setViewport(viewports.desktop.width, viewports.desktop.height);
    });

    it('should hide bottom navigation on desktop', () => {
      renderLayout();
      const bottomNav = screen.queryByRole('navigation');
      expect(bottomNav).not.toBeVisible();
    });

    it('should show profile section on desktop', () => {
      renderLayout();
      const profileSection = screen.getByText('Test User');
      expect(profileSection).toBeVisible();
    });
  });

  describe('Responsive Behavior', () => {
    it('should adjust layout based on screen size', () => {
      renderLayout();
      
      // Test mobile view
      setViewport(viewports.mobile.width, viewports.mobile.height);
      expect(screen.queryByRole('navigation')).toBeVisible();
      expect(screen.queryByText('Test User')).not.toBeVisible();

      // Test tablet view
      setViewport(viewports.tablet.width, viewports.tablet.height);
      expect(screen.queryByRole('navigation')).toBeVisible();
      expect(screen.queryByText('Test User')).not.toBeVisible();

      // Test desktop view
      setViewport(viewports.desktop.width, viewports.desktop.height);
      expect(screen.queryByRole('navigation')).not.toBeVisible();
      expect(screen.queryByText('Test User')).toBeVisible();
    });
  });
}); 