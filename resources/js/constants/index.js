import { GoGoal } from "react-icons/go";
import { GrPlan } from "react-icons/gr";
import { LuCalendarDays } from "react-icons/lu";
import { PiWechatLogo, PiUsersThreeBold } from "react-icons/pi";
import { BiCustomize } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaRegHospital } from "react-icons/fa6";
import { TbUserShield } from "react-icons/tb";
import {
  IoIosStats,
  IoIosSettings,
  IoIosPerson,
  IoIosPersonAdd,
  IoIosEyeOff
} from "react-icons/io";
import {
  FaChartBar, FaUsersCog,
  FaListAlt
} from "react-icons/fa";
import { MdOutlinePets, MdPayment } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";

const user01 = `${window.location.origin}/assets/user01.png`;
const user02 = `${window.location.origin}/assets/user02.png`;
const user03 = `${window.location.origin}/assets/user03.png`;

export const links = [
  {
    href: "/user/dashboard",
    icon: FaChartBar,
    text: "Dashboard",
  },
  {
    href: "/user/appointment",
    icon: LuCalendarDays,
    text: "Appointment",
    badge: {
      color: "bg-gray-100 text-gray-800",
      darkColor: "dark:bg-gray-700 dark:text-gray-300",
    },
  },
  {
    href: "#",
    icon: PiWechatLogo,
    text: "Message",
    badge: {
      color: "bg-blue-100 text-blue-800",
      darkColor: "dark:bg-blue-900 dark:text-blue-300",
    },
  },
  {
    href: "#",
    icon: FaUsersCog,
    text: "Users",
  },
  {
    href: "#",
    icon: FaListAlt,
    text: "Products",
  },
];

export const getLinks = (userType) => {
  const links = [
    {
      href: userType === 'admin' ? "/admin/dashboard" : "/user/dashboard",
      icon: BiCustomize,
      text: "Dashboard",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    },
    {
      href: userType === 'admin' ? "/admin/petlist" : "/user/petlist",
      icon: MdOutlinePets,
      text: "Pet",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    },
    {
      href: userType === 'admin' ? "/admin/calendar" : "/user/calendar",
      icon: LuCalendarDays,
      text: "Calendar",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    },
    {
      href: userType === 'admin' ? "/admin/payment" : "/user/payment",
      icon: MdPayment,
      text: "Payment",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    },
    {
      href: userType === 'admin' ? "/admin/message" : "/user/message",
      icon: LuMessagesSquare,
      text: "Message",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    }
  ];

  if (userType === 'admin') {

    links.push({
      href: "/admin/client/doctor",
      icon: PiUsersThreeBold,
      text: "Clients",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    });

    links.push({
      href: "/admin/appointment",
      icon: AiOutlineFileDone,
      text: "Appointments",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    });

    links.push({
      href: "/admin/prescription",
      icon: FaRegHospital,
      text: "Admission",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    });
  }

  if (userType === 'user') {
    links.push({
      href: "/user/doctor",
      icon: TbUserShield,
      text: "Doctors",
      badge: {
        color: "bg-gray-100 text-gray-800",
        darkColor: "dark:bg-gray-700 dark:text-gray-300",
      },
    });
  }

  return links;
};

export const empolyeesData = [
  {
    title: "Total Empolyees",
    icon: IoIosPerson,
    count: 200,
    bgColor: "bg-gray-100",
  },
  {
    title: "On Leave",
    icon: IoIosEyeOff,
    count: 15,
    bgColor: "bg-blue-100",
  },
  {
    title: "New Joinee",
    icon: IoIosPersonAdd,
    count: 25,
    bgColor: "bg-yellow-100",
  },
];

export const shortcutLink = [
  {
    title: "Goals",
    icon: GoGoal,
  },
  {
    title: "Plan",
    icon: GrPlan,
  },
  {
    title: "Stats",
    icon: IoIosStats,
  },
  {
    title: "Setting",
    icon: IoIosSettings,
  },
];

export const users = [
  {
    name: "Robert Fox",
    country: "USA",
    role: "Python Developer",
    image: user01,
    bgColor: "bg-yellow-100",
  },
  {
    name: "Jane Doe",
    country: "UK",
    role: "Frontend Developer",
    image: user02,
    bgColor: "bg-blue-100",
  },
  {
    name: "John Smith",
    country: "Canada",
    role: "Backend Developer",
    image: user03,
    bgColor: "bg-gray-100",
  },
  {
    name: "Alice Johnson",
    country: "Australia",
    role: "Full Stack Developer",
    image: user01,
    bgColor: "bg-slate-100",
  },
];

export const events = [
  {
    date: "01 Aug",
    title: "Upcoming Event",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    date: "15 Sept",
    title: "Annual Conference",
    description: "Join us for our annual conference.",
  },
  {
    date: "20 Sept",
    title: "Networking Meetup",
    description: "Connect with professionals in your field.",
  },
];
