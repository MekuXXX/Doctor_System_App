export type LinkType = {
  id: number;
  link: string;
  text: string;
};

export type SideBarLinkType = {
  base: "dashboard" | "dr-dashboard" | "protect/ad-dashboard";
  links: LinkType[];
};
