import { ADMIN_DASHBOARD, DOCTOR_DASHBOARD, USER_DASHBOARD } from "./routes";

export type LinkType = {
  id: number;
  link: string;
  text: string;
};

export type SideBarLinkType = {
  base:
    | "/dashboard"
    | typeof USER_DASHBOARD
    | typeof DOCTOR_DASHBOARD
    | typeof ADMIN_DASHBOARD;
  links: LinkType[];
};
