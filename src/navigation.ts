import { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction | undefined;

export const setNavigator = (nextNavigate: NavigateFunction | undefined) => {
  navigate = nextNavigate;
};

export const navigateTo = (path: string) => {
  if (navigate !== undefined) {
    navigate(path);
  } else {
    window.history.pushState({}, '', path);
  }
};
