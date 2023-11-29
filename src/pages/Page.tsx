import React from 'react';
import { CustomNavbar } from '../components/Navbar/CustomNavbar';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import './Page.scss';

// Mark the function as a generic using P (or whatever variable you want)
export function asPage<P extends JSX.IntrinsicAttributes>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts
  WrappedComponent: React.ComponentType<P>,
) {
  const ComponentAsPage = (props: P) => {
    // At this point, the props being passed in are the original props the component expects.
    return (
      <>
        <CustomNavbar />
        <Breadcrumbs />
        <div className="page d-flex align-items-center justify-content-center">
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };
  return ComponentAsPage;
}
