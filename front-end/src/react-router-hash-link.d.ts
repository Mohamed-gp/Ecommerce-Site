declare module "react-router-hash-link" {
  import { LinkProps } from "react-router-dom";
  import { ComponentType } from "react";

  export interface HashLinkProps extends LinkProps {
    scroll?: (element: HTMLElement) => void;
    smooth?: boolean;
    timeout?: number;
  }

  export const HashLink: ComponentType<HashLinkProps>;
  export const NavHashLink: ComponentType<HashLinkProps>;
}
