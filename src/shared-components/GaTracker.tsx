import * as React from 'react';
import * as ga from 'react-ga';
import { useLocation } from 'react-router-dom';

interface GaTrackerProps {
  children?: any;
}

const shouldTrack = () => process.env.NODE_ENV === 'production' && process.env.GA_ID !== undefined;

const GaTracker: React.FC<GaTrackerProps> = ({ children }) => {
  const location = useLocation();
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (shouldTrack() && !initialized.current) {
      ga.initialize(process.env.GA_ID as string);
      initialized.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (shouldTrack()) {
      ga.pageview(window.location.pathname);
    }
  }, [location]);

  return children;
};

export default GaTracker;
