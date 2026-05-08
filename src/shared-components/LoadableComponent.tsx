import * as React from 'react';

import ComponentLoader from './ComponentLoader';

interface LoadableComponentOptions<P> {
  loader: () => Promise<{ default: React.ComponentType<P> }>;
  webpackRequireWeakId: () => number;
}

export default function LoadableComponent<P extends object>(options: LoadableComponentOptions<P>): React.ComponentType<P> {
  const LazyComponent = React.lazy(options.loader);
  const Component = LazyComponent as unknown as React.ComponentType<P>;

  return (props: P) => (
    <React.Suspense fallback={<ComponentLoader isLoading pastDelay />}>
      <Component {...props} />
    </React.Suspense>
  );
}
