import { NavLink } from "react-router-dom";
import { ReactElement } from "react";

interface AdminSideBarLinkProps {
  link: string;
  icon: ReactElement;
}

const AdminSideBarLink = ({ link, icon }: AdminSideBarLinkProps) => {
  return (
    <NavLink
      to={`/admin/${link}`}
      className="flex lg:flex lg:justify-normal justify-center lg:gap-1 p-2 admin-nav-link items-center lg:rounded-r-none rounded-xl"
    > 
      {icon}
      <span className="hidden lg:inline">{link}</span>
    </NavLink>
  );
};
export default AdminSideBarLink;
