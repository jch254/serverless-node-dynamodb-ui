import LoadableComponent from '../shared-components/LoadableComponent';

export default LoadableComponent({
  loader: () => import(
    /* webpackChunkName: "items" */
    './ItemsPage',
  ),
  webpackRequireWeakId: () => require.resolveWeak('./ItemsPage'),
});
