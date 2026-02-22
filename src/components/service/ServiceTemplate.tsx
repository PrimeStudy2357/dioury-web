import type { PropsWithChildren } from 'react';
import GNB from '../navigation/GNB';

export const ServiceTemplate = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GNB />
      <main>{children}</main>
    </>
  );
};
