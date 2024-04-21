import React from "react";
import { CustomNavbar } from "../components/Navbar/CustomNavbar";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import "./Page.scss";

type AsPagePropTypes = {
  breadcrumbs: Array<object>;
};

// Mark the function as a generic using P (or whatever variable you want)
export function asPage<P extends AsPagePropTypes>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentAsPage = (props: P) => {
    const { breadcrumbs } = props;
    // At this point, the props being passed in are the original props the component expects.
    return (
      <div className="h-screen">
        <CustomNavbar />
        <Breadcrumbs pages={breadcrumbs} />
        <div className="flex page">
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
  return ComponentAsPage;
}
