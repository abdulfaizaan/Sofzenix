import type * as React from "react";
import { NavbarMenu } from "./NavbarMenu";

/**
 * Public Navbar — server-rendered shell wrapping a single client island.
 */
export function Navbar(): React.JSX.Element {
  return <NavbarMenu />;
}