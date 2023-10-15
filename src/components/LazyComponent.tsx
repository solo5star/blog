import React, { Suspense } from 'react';

type LazyComponentProps = {
  component: Parameters<typeof React.lazy>[0];
};

const LazyComponent = ({ component }: LazyComponentProps) => {
  const Component = React.lazy(component);

  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default LazyComponent;
