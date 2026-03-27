import type { Language } from './translations';
import type { ThemeName } from './themes';

export type BlogPost = {
  title: string;
  date: string;
  detail: string;
  body?: string;
  imageUrl?: string;
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

const UNS = 'https://images.unsplash.com/photo-';
const Q = '?auto=format&fit=crop&w=900&q=80';

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
      imageUrl: `${UNS}1529156069898-49953e39b3ac${Q}`,
      body: 'The Nenwe Progressive Association UK has long championed the cause of keeping Ndi Nenwe in the diaspora connected to their roots. Through cultural events, community meetings, and digital platforms, we are creating a vibrant network that spans continents.\n\nOur members in the UK maintain strong ties with families back home in Nenwe, Enugu State, Nigeria. From funding community boreholes to sponsoring secondary school students, the impact of our diaspora engagement is felt in every ward of Nenwe.\n\nThis is just the beginning. As our membership grows, so does our ability to invest in the future of our community.',
    },
    {
      title: 'Mentorship that Matters',
      date: 'February 10, 2026',
      detail: 'Stories from youth mentorship sessions across borders.',
      imageUrl: `${UNS}1523050854058-8df90110c9f1${Q}`,
      body: 'Every month, volunteer mentors from the Nenwe Progressive Association UK connect with young people in Nenwe via video calls, sharing career advice, industry insights, and encouragement.\n\nThese sessions cover STEM careers, healthcare, law, finance, and entrepreneurship. Many of our mentors were themselves beneficiaries of community support when they first arrived in the UK, and now they give back.\n\nThe programme has already helped several students secure university placements and internships. We are expanding the programme in 2026 — if you would like to volunteer as a mentor, get in touch.',
    },
    {
      title: 'Building Sustainable Projects',
      date: 'January 8, 2026',
      detail: 'A look at how we design community-first initiatives.',
      imageUrl: `${UNS}1488521787991-ed7bbaae773c${Q}`,
      body: 'Sustainability is at the heart of every project the Nenwe Progressive Association UK undertakes. We do not believe in one-off donations that create dependency — instead, we invest in infrastructure and capacity that lasts.\n\nOur Rural Water Access project trained local technicians in Nenwe to maintain the boreholes after installation. Our STEM Mentorship programme is designed to be handed over to local teachers over time.\n\nWe use a community-first model: every project starts with a conversation with the people it will serve.',
    },
    {
      title: 'Women in Enterprise: First Year Update',
      date: 'December 5, 2025',
      detail: 'Six months in, the Women in Enterprise Fund has already backed 14 women-owned businesses.',
      imageUrl: `${UNS}1573496359142-b8d87734a5a2${Q}`,
      body: 'When we launched the Women in Enterprise Fund in mid-2025, we set a modest goal: support 10 women-owned small businesses in Nenwe with micro-grants and business coaching.\n\nWe exceeded that goal. Fourteen businesses have now received funding, ranging from fabric and tailoring shops to agricultural produce businesses. Each recipient also received six months of coaching from UK-based volunteers with business backgrounds.\n\nThe results have been encouraging. Average revenue among supported businesses grew by 38% in the first six months. Three businesses have already hired their first employee. We are proud of these women and committed to expanding the fund in 2026.',
    },
    {
      title: 'Health Outreach 2025: Over 500 Screened',
      date: 'November 20, 2025',
      detail: 'Our annual health mission brought free screenings and maternal care support to Nenwe.',
      imageUrl: `${UNS}1576091160399-112ba8d25d1d${Q}`,
      body: 'In October 2025, a team of fifteen volunteers — including four UK-based Nigerian doctors and six nurses — traveled to Nenwe for our annual Health Outreach Mission.\n\nOver three days, the team screened 517 community members for blood pressure, diabetes, malaria, and other conditions. 63 individuals were referred for further treatment and provided with transport assistance to reach specialist care.\n\nThe maternal health component of the mission provided antenatal and postnatal checks to 78 mothers. The feedback from the community was overwhelming — many had never had access to free specialist care before.\n\nPlanning is already underway for the 2026 mission, which will be larger and will include a dental care component.',
    },
    {
      title: 'Scholarship Winners 2025: Their Stories',
      date: 'September 8, 2025',
      detail: 'Meet the eight students who received NPA UK scholarships this year.',
      imageUrl: `${UNS}1523240795612-9a054b0db644${Q}`,
      body: 'Each year, the Nenwe Progressive Association UK awards scholarships to exceptional secondary school students in Nenwe who demonstrate both academic excellence and community spirit.\n\nThis year, eight students received scholarships covering school fees, books, and uniforms for the coming academic year. Their stories reflect the diversity and talent of the next generation of Ndi Nenwe.\n\nChisom Okeke, 14, hopes to become an engineer. Adaeze Eze, 16, wants to study medicine. Ikenna Nwosu, 15, is passionate about agriculture and food security. Their dreams remind us exactly why we do what we do.\n\nApplications for 2026 scholarships will open in February. Spread the word.',
    },
    {
      title: 'A Message from the President',
      date: 'August 1, 2025',
      detail: 'Reflections on our community\'s growth and what the next chapter holds.',
      imageUrl: `${UNS}1560250097-0b93528c311a${Q}`,
      body: 'Dear members and friends of the Nenwe Progressive Association UK,\n\nAs we mark another year of service, I want to take a moment to reflect on how far we have come — and to look ahead with excitement at what is still possible.\n\nWhen this association was founded, we started with a small group of Ndi Nenwe in London who simply wanted to stay connected to home. Today, we span cities across the UK, we run development projects in Nenwe, and we are mentoring the next generation of our community\'s leaders.\n\nNone of this happens without you. Every member who pays their dues, every volunteer who gives their time, every donor who contributes to our funds — you are the association. I am merely your servant.\n\nThe years ahead are full of promise. Let us continue to build, together.\n\nWith gratitude and pride,\nCommunity President, NPA UK',
    },
    {
      title: 'Looking Ahead: Our 2026 Roadmap',
      date: 'January 15, 2026',
      detail: 'What to expect from the Nenwe Progressive Association UK this year.',
      imageUrl: `${UNS}1517048676732-d65bc937f952${Q}`,
      body: 'The Nenwe Progressive Association UK enters 2026 with its most ambitious roadmap yet. Here is a preview of what we have planned.\n\nIn the first quarter, we will launch the open call for community development fund proposals — any Nenwe community group can apply for project support. In the second quarter, our annual Cultural Showcase returns to London, bigger than ever.\n\nThe third quarter will see the expansion of our STEM Mentorship programme to reach students in three additional secondary schools. And in the final quarter, we will hold our biggest fundraising dinner yet, with all proceeds going directly to Nenwe projects.\n\nWe are also exploring partnerships with other Nigerian diaspora organisations in the UK to amplify our collective impact. More on that soon.\n\nStay connected, stay involved, and as always — Nenwe first.',
    },
  ],

  galleryItems: [
    { title: 'Community Outreach in Nenwe' },
    { title: 'Cultural Night in London' },
    { title: 'Youth Mentorship Session' },
    { title: 'Diaspora Business Meetup' },
    { title: 'Health Outreach Mission' },
    { title: 'Scholarship Award Ceremony' },
    { title: 'Annual General Meeting 2025' },
    { title: 'School Outreach Day' },
    { title: "Women's Enterprise Workshop" },
    { title: 'Health Fair 2025' },
    { title: 'Community Clean-Up Drive' },
    { title: 'Youth Sports Day' },
    { title: "Elders' Recognition Ceremony" },
    { title: 'Food Bank Initiative' },
    { title: 'Digital Skills Workshop' },
    { title: 'Cultural Dance Performance' },
    { title: 'Thanksgiving Service' },
    { title: 'NPA UK Annual Dinner' },
  ],
};
