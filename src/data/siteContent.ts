import type { Language } from './translations';
import type { ThemeName } from './themes';

export type BlogPost = {
  title: string;
  date: string;
  detail: string;
};

export type GalleryItem = {
  title: string;
};

export type SiteContent = {
  heroHeadline: string;
  heroSubheadline: string;
  mission: string;
  vision: string;
  values: string[];
  contactEmail: string;
  contactPhone: string;
  location: string;
  donationLink: string;
  announcement: string;
  theme: ThemeName;
  language: Language;
  blogPosts: BlogPost[];
  galleryItems: GalleryItem[];
};

export const defaultContent: SiteContent = {
  heroHeadline: 'NPA UK Community',
  heroSubheadline:
    'A connected diaspora community honoring Igbo heritage, supporting families, and investing in Enugu.',
  mission:
    'To strengthen the bonds of Ndi Enugu in the UK through culture, service, education, and economic empowerment.',
  vision:
    'A thriving, united community that uplifts our people and elevates Enugu globally.',
  values: ['Unity', 'Integrity', 'Service', 'Heritage', 'Excellence'],
  contactEmail: 'info@npa-uk.org',
  contactPhone: '+44 000 000 0000',
  location: 'Enugu / United Kingdom',
  donationLink: 'https://example.com/donate',
  announcement:
    'March 2026: Community development fund now open for project proposals. Submit your idea before April 30, 2026.',
  theme: 'heritage',
  language: 'en',
  blogPosts: [
    {
      title: 'Reconnecting the Igbo Diaspora',
      date: 'March 3, 2026',
      detail: 'How NPA UK is building bridges between Enugu and the UK.',
    },
    {
      title: 'Mentorship that Matters',
      date: 'February 10, 2026',
      detail: 'Stories from youth mentorship sessions across borders.',
    },
    {
      title: 'Building Sustainable Projects',
      date: 'January 8, 2026',
      detail: 'A look at how we design community-first initiatives.',
    },
  ],
  galleryItems: [
    { title: 'Community Outreach in Enugu' },
    { title: 'Cultural Night in London' },
    { title: 'Youth Mentorship Session' },
    { title: 'Diaspora Business Meetup' },
    { title: 'Health Outreach Mission' },
    { title: 'Scholarship Award Ceremony' },
  ],
};
