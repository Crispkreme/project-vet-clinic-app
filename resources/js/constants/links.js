import { FaUsersCog, FaListAlt } from 'react-icons/fa';

export const getLinks = (userType) => [
  {
    href: userType === 'admin' ? "/admin/users" : "/user/users", 
    icon: FaUsersCog,
    text: "Users",
  },
  {
    href: userType === 'admin' ? "/admin/products" : "/user/products", 
    icon: FaListAlt,
    text: "Products",
  },
];