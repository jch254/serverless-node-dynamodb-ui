import LoadableComponent from './LoadableComponent';

export default LoadableComponent({
  loader: () => import(
    /* webpackChunkName: "not-found" */
    './NotFoundPage'
  ),
  webpackRequireWeakId: () => 0,
});
