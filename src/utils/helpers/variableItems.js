import { TbApps } from "react-icons/tb";
import { HiOutlineUsers, HiOutlineCog8Tooth, HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdOutlinePayments, MdOutlineInsertChart, MdOutlineCardGiftcard, MdOutlineBugReport, MdOutlineSwitchAccount } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { GoHome } from "react-icons/go";

const APPS_ITEMS = [
  {
    label: "Link in Bio",
    description: "Mange your Link in Bio",
    icon: HiOutlineCog8Tooth,
  },
  {
    label: "Store",
    description: "Mange your Store activities",
    icon: HiOutlineCog8Tooth,
  },
  {
    label: "Media Kit",
    description: "Mange your Media Kit",
    icon: HiOutlineCog8Tooth,
  },
  {
    label: "Invoicing",
    description: "Mange your Invoicing",
    icon: HiOutlineCog8Tooth,
  },
  {
    label: "Bookings",
    description: "Mange your Bookings",
    icon: HiOutlineCog8Tooth,
  },
];

const MENU_ITEMS = [
  { label: "Settings", icon: <HiOutlineCog8Tooth /> },
  { label: "Purchase History", icon: <IoReceiptOutline /> },
  { label: "Refer and Earn", icon: <MdOutlineCardGiftcard /> },
  { label: "Integrations", icon: <HiOutlineSquares2X2 /> },
  { label: "Report Bugs", icon: <MdOutlineBugReport /> },
  { label: "Switch Account", icon: <MdOutlineSwitchAccount /> },
  { label: "Sign out", icon: <PiSignOut /> },
];

const BUTTONS_ITEMS = [
  { label: "Home", icon: <GoHome size={18} /> },
  { label: "Analytics", icon: <MdOutlineInsertChart size={18} /> },
  {
    label: "Revenue",
    icon: <MdOutlinePayments size={18} />,
    isRevenue: true,
  },
  { label: "CRM", icon: <HiOutlineUsers size={18} /> },
  { label: "Apps", icon: <TbApps size={18} />, isApps: true },
];

const TYPE_OPTIONS = [
  "Store Transactions",
  "Get Tipped",
  "Withdrawal",
  "Deposit",
  "Chargebacks",
];
const STATUS_OPTIONS = ["Successful", "Pending", "Failed"];

export { APPS_ITEMS, MENU_ITEMS, BUTTONS_ITEMS, TYPE_OPTIONS, STATUS_OPTIONS };
