export type LinkType = {
  id: number;
  link: string;
  text: string;
};

export type SideBarLinkType = {
  base: "/dashboard" | "/dr-dashboard" | "/protected/ad-dashboard";
  links: LinkType[];
};
