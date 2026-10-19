/**
 * Navigation & Header / Footer Type Definitions
 * 
 * Simple data structures for site menus, subcategories, top announcements,
 * footer link clusters, and social channels.
 */

export interface SubCategoryItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface SubCategoryGroup {
  title: string;
  items: SubCategoryItem[];
}

export interface NavFeaturedBanner {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  isHighlight?: boolean;
  subCategoryGroups?: SubCategoryGroup[];
  featuredBanner?: NavFeaturedBanner;
}

export interface AnnouncementItem {
  id: string;
  message: string;
  highlight?: string;
  href?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
}
