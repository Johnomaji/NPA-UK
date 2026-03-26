import type { Language } from './translations';
import type { ThemeName } from './themes';

export type BlogPost = {
  title: string;
  date: string;
  detail: string;
  body?: string;
};

export type GalleryItem = {
  title: string;
  imageUrl?: string;
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
    'A connected diaspora community honoring Igbo heritage, supporting families, and investing in Nenwe.',
  mission:
    'To strengthen the bonds of Ndi Nenwe in the UK through culture, service, education, and economic empowerment.',
  vision:
    'A thriving, united community that uplifts our people and elevates Nenwe globally.',
  values: ['Unity', 'Integrity', 'Service', 'Heritage', 'Excellence'],
  contactEmail: 'info@npa-uk.org',
  contactPhone: '+44 000 000 0000',
  location: 'Nenwe / United Kingdom',
  donationLink: 'https://example.com/donate',
  announcement:
    'March 2026: Community development fund now open for project proposals. Submit your idea before April 30, 2026.',
  theme: 'heritage',
  language: 'en',
  blogPosts: [
    {
      title: 'Reconnecting the Igbo Diaspora',
      date: 'March 3, 2026',
      detail: 'How the Nenwe Progressive Association UK is building bridges between Nenwe and the UK.',
      body: 'The Nenwe Progressive Association UK has long championed the cause of keeping Ndi Nenwe in the diaspora connected to their roots. Through cultural events, community meetings, and digital platforms, we are creating a vibrant network that spans continents.\n\nOur members in the UK maintain strong ties with families back home in Nenwe, Enugu State, Nigeria. From funding community boreholes to sponsoring secondary school students, the impact of our diaspora engagement is felt in every ward of Nenwe.\n\nThis is just the beginning. As our membership grows, so does our ability to invest in the future of our community.',
    },
    {
      title: 'Mentorship that Matters',
      date: 'February 10, 2026',
      detail: 'Stories from youth mentorship sessions across borders.',
      body: 'Every month, volunteer mentors from the Nenwe Progressive Association UK connect with young people in Nenwe via video calls, sharing career advice, industry insights, and encouragement.\n\nThese sessions cover STEM careers, healthcare, law, finance, and entrepreneurship. Many of our mentors were themselves beneficiaries of community support when they first arrived in the UK, and now they give back.\n\nThe programme has already helped several students secure university placements and internships. We are expanding the programme in 2026 — if you would like to volunteer as a mentor, get in touch.',
    },
    {
      title: 'Building Sustainable Projects',
      date: 'January 8, 2026',
      detail: 'A look at how we design community-first initiatives.',
      body: 'Sustainability is at the heart of every project the Nenwe Progressive Association UK undertakes. We do not believe in one-off donations that create dependency — instead, we invest in infrastructure and capacity that lasts.\n\nOur Rural Water Access project, for example, trained local technicians in Nenwe to maintain the boreholes after installation. Our STEM Mentorship programme is designed to be handed over to local teachers over time.\n\nWe use a community-first model: every project starts with a conversation with the people it will serve. What do they need? What do they already have? How can we add value without creating new problems? This approach takes longer, but the results speak for themselves.',
    },
  ],
  galleryItems: [
    { title: 'Community Outreach in Nenwe' },
    { title: 'Cultural Night in London' },
    { title: 'Youth Mentorship Session' },
    { title: 'Diaspora Business Meetup' },
    { title: 'Health Outreach Mission' },
    { title: 'Scholarship Award Ceremony' },
  ],
};
