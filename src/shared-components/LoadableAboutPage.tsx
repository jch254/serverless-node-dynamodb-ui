import LoadableComponent from './LoadableComponent';

export default LoadableComponent({
  loader: () => import(
    /* webpackChunkName: "about" */
    './AboutPage',
  ),
  webpackRequireWeakId: () => require.resolveWeak('./AboutPage'),
});
