import * as React from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children?: any;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const location = useLocation();

  React.useEffect(() => {
    // TODO: Restore scroll position on browser back button etc.
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

export default ScrollToTop;
