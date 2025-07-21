import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AdminSideBarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  expanded: boolean;
}

const AdminSideBarLink: React.FC<AdminSideBarLinkProps> = ({
  to,
  icon,
  text,
  active,
  expanded,
}) => {
  // Animation variants for text
  const textVariants = {
    expanded: {
      opacity: 1,
      display: "block",
      transition: {
        delay: 0.1,
        duration: 0.2,
      },
    },
    collapsed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2.5 mb-1 rounded-lg transition-all ${
        active
          ? "bg-mainColor/10 text-mainColor font-medium"
          : "text-gray-600 hover:bg-gray-100"
      } ${expanded ? "" : "justify-center"}`}
    >
      <div className={`text-xl min-w-[24px] ${active ? "text-mainColor" : ""}`}>
        {icon}
      </div>

      <motion.span
        variants={textVariants}
        animate={expanded ? "expanded" : "collapsed"}
        className={`text-sm ml-3 ${active ? "font-medium" : ""}`}
      >
        {text}
      </motion.span>

      {active && expanded && (
        <motion.div
          layoutId="activeIndicator"
          className="ml-auto w-1.5 h-5 bg-mainColor rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
};

export default AdminSideBarLink;
