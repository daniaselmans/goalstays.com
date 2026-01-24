import { Link } from 'react-router-dom';
import { Plane, MapPin, Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchHeader = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
              <Plane className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">GoalStays</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">Help</Button>
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="default" size="sm">Get Started</Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="py-4">
          <div className="flex flex-wrap items-center gap-3 p-3 bg-secondary rounded-xl">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                defaultValue="Paris, France"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            
            <div className="h-8 w-px bg-border hidden sm:block" />
            
            <div className="flex items-center gap-2 flex-1 min-w-[140px]">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-foreground">Jan 25 - Jan 28</span>
            </div>
            
            <div className="h-8 w-px bg-border hidden sm:block" />
            
            <div className="flex items-center gap-2 flex-1 min-w-[100px]">
              <Users className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-foreground">2 guests</span>
            </div>
            
            <Button variant="hero" size="default" className="shrink-0">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
