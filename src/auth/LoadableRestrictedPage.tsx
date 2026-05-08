import LoadableComponent from '../shared-components/LoadableComponent';

export default LoadableComponent({
  loader: () => import(
    /* webpackChunkName: "restricted" */
    './RestrictedPage'
  ),
  webpackRequireWeakId: () => 0,
});
