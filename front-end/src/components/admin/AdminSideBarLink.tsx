import { NavLink } from "react-router-dom";
import { ReactElement } from "react";

interface AdminSideBarLinkProps {
  link: string;
  icon: ReactElement;
}

const AdminSideBarLink = ({ link, icon }: AdminSideBarLinkProps) => {
  return (
    <NavLink to={`/admin/${link}`} className="flex gap-1 p-2 admin-nav-link items-center">
      {icon}
      {link}
    </NavLink>
  );
};
export default AdminSideBarLink;
