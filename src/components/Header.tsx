import { useState } from 'react';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';
import UserMenu from '@/components/auth/UserMenu';

const Header = () => {
  const { user, loading } = useAuthContext();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const openSignIn = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">GoalStays</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                Hotels
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                Apartments
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                Deals
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                About
              </a>
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              {loading ? (
                <div className="w-24 h-9 bg-primary-foreground/10 animate-pulse rounded-lg" />
              ) : user ? (
                <UserMenu />
              ) : (
                <>
                  <Button variant="glass" size="sm" onClick={openSignIn}>
                    Sign In
                  </Button>
                  <Button variant="hero" size="sm" onClick={openSignUp}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultMode={authMode}
      />
    </>
  );
};

export default Header;
