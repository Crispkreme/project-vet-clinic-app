import { FaChartBar } from 'react-icons/fa';

export const getLinks = (userType) => [
  {
    href: userType === 'admin' ? "/admin/dashboard" : "/user/dashboard", 
    icon: FaChartBar,
    text: "Users",
  },
];