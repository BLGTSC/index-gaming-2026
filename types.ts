import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  colorClass: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}