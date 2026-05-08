import createAuth0Client, {
  getIdTokenClaimsOptions,
  Auth0Client,
  Auth0ClientOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
} from '@auth0/auth0-spa-js';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth0Client } from './reducer';
import { getAuth0Client } from './selectors';

export interface Auth0Context {
  isAuthenticated: boolean;
  user?: any;
  isLoggingIn: boolean;
  isPopupOpen: boolean;
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;
  getIdTokenClaims: (options?: getIdTokenClaimsOptions) => Promise<IdToken | undefined>;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  getTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<any>;
  getTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string>;
  logout: (options?: LogoutOptions) => void;
}

export const Auth0Context = React.createContext<Auth0Context>({} as Auth0Context);

export const useAuth0 = () => React.useContext(Auth0Context);

interface Auth0ProviderProps extends Auth0ClientOptions {
  children: any;
}

export const Auth0Provider = ({
  children,
  ...auth0Options
}: Auth0ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<any>();
  const [isLoggingIn, setIsLoggingIn] = React.useState(true);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const auth0Client = useSelector(getAuth0Client);
  const initRef = React.useRef(false);

  React.useEffect(
    () => {
      // Guard against double-init: handleRedirectCallback consumes the stored
      // transaction, so a second invocation throws "Invalid state".
      if (initRef.current) {
        return;
      }
      initRef.current = true;

      const initAuth0 = async () => {
        try {
          const client = await createAuth0Client(auth0Options as Auth0ClientOptions);

          dispatch(setAuth0Client(client));

          if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
            let targetUrl = '/';

            try {
              const { appState } = await client.handleRedirectCallback();

              if (appState && appState.targetUrl) {
                targetUrl = appState.targetUrl;
              }
            } catch (callbackError) {
              console.warn('Auth0 redirect callback failed:', callbackError);
            }

            // Scrub the code/state params so a hot reload or back-nav can't
            // re-enter the callback path.
            navigate(targetUrl, { replace: true });
          }

          const authed = await client.isAuthenticated();

          setIsAuthenticated(authed);

          if (authed) {
            const profile = await client.getUser();

            setUser(profile);
          }
        } catch (error) {
          console.error('Auth0 initialization failed:', error);
        } finally {
          setIsLoggingIn(false);
        }
      };

      initAuth0();
    },
    [],
  );

  const loginWithPopup = async (options?: PopupLoginOptions) => {
    setIsPopupOpen(true);

    try {
      await (auth0Client as Auth0Client).loginWithPopup(options);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPopupOpen(false);
    }

    const profile = await (auth0Client as Auth0Client).getUser();

    setUser(profile);
    setIsAuthenticated(true);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoggingIn,
        isPopupOpen,
        loginWithPopup,
        getIdTokenClaims: (options?: getIdTokenClaimsOptions) => (auth0Client as Auth0Client).getIdTokenClaims(options),
        loginWithRedirect: (options?: RedirectLoginOptions) => (auth0Client as Auth0Client).loginWithRedirect(options),
        getTokenSilently: (options?: GetTokenSilentlyOptions) => (auth0Client as Auth0Client).getTokenSilently(options),
        getTokenWithPopup: (options?: GetTokenWithPopupOptions) => (auth0Client as Auth0Client).getTokenWithPopup(options),
        logout: (options?: LogoutOptions) => (auth0Client as Auth0Client).logout(options),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
