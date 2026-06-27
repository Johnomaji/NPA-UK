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

export type CommunityMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
};

export type EventItem = {
  title: string;
  date: string;
  location: string;
  detail: string;
};

export type ProjectItem = {
  title: string;
  status: 'Active' | 'Ongoing' | 'Funding' | 'Planning';
  detail: string;
};

export type NewsItem = {
  title: string;
  date: string;
  detail: string;
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
  members: CommunityMember[];
  events: EventItem[];
  projects: ProjectItem[];
  newsItems: NewsItem[];
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

  members: [
    {
      id: '1',
      name: 'Chukwuemeka Obi',
      title: 'Community Secretary',
      bio: 'Chukwuemeka Obi has served as Community Secretary for the Nenwe Progressive Association UK since 2022. Born in Nenwe, Enugu State, he moved to the United Kingdom in 2010 and has been a driving force in diaspora engagement ever since.\n\nWith a background in public administration, Chukwuemeka manages the association\'s records, correspondence, and membership affairs with meticulous care. He is passionate about transparency and accountability within community organisations.\n\nOutside of his role in the association, he mentors young Igbo professionals navigating UK career pathways and serves as a school governor in his local authority.',
      imageUrl: '/img1.jpg',
    },
    {
      id: '2',
      name: 'Adaora Nwosu',
      title: 'Youth Coordinator',
      bio: 'Adaora Nwosu brings energy, creativity, and a deep love for Nenwe culture to her role as Youth Coordinator. She leads all youth-facing programmes for the NPA UK, including the STEM Mentorship initiative and the Cultural Exchange Summer School.\n\nAdaora grew up between Nenwe and London, giving her a unique perspective on the challenges and opportunities facing second-generation diaspora youth. She holds a degree in Education Studies and works as a secondary school teacher.\n\nHer vision is a generation of young Ndi Nenwe who are proud of their heritage, equipped for the modern world, and connected to their community on both sides of the Atlantic.',
      imageUrl: '/img2.jpg',
    },
    {
      id: '3',
      name: 'Ifeanyi Eze',
      title: 'Cultural Director',
      bio: 'Ifeanyi Eze is the keeper of culture within the NPA UK. As Cultural Director, he oversees the association\'s annual Cultural Showcase, traditional festivals, and heritage preservation efforts — including an ongoing oral history project documenting the stories of Nenwe elders.\n\nA trained historian and storyteller, Ifeanyi has spent over a decade researching Igbo oral traditions, folklore, and the social history of Nenwe. He regularly lectures at UK universities on diaspora identity and cultural continuity.\n\nIfeanyi believes that a community\'s strength is rooted in its culture, and that diaspora communities have a special responsibility to carry that culture forward for generations to come.',
      imageUrl: '/img3.jpg',
    },
    {
      id: '4',
      name: 'Ngozi Okeke',
      title: 'Welfare Officer',
      bio: 'Ngozi Okeke is the heart of the NPA UK\'s welfare work. As Welfare Officer, she coordinates support for members going through difficult times — whether navigating the UK immigration system, dealing with bereavement, or facing financial hardship.\n\nA qualified social worker with over fifteen years of experience in the NHS and local authority settings, Ngozi brings professional expertise and compassionate humanity to everything she does. She has helped dozens of Nenwe families access the support they need.\n\nNgozi is also a co-founder of the association\'s Women\'s Support Circle, a safe space for Nenwe women in the UK to share experiences and build resilience together.',
      imageUrl: '/img4.jpg',
    },
    {
      id: '5',
      name: 'Obinna Ugwu',
      title: 'Events Coordinator',
      bio: 'Obinna Ugwu is the architect of the NPA UK\'s vibrant calendar of events. From intimate community dinners to the flagship Annual Fundraising Gala, Obinna ensures that every gathering is memorable, well-organised, and true to the spirit of Ndi Nenwe.\n\nWith a professional background in event management and hospitality, Obinna worked across sectors in London before bringing his skills to community service. He joined the association in 2019 and has grown the events programme significantly since then.\n\nObinna\'s philosophy: every event should leave attendees feeling more connected — to each other, to Nenwe, and to what the association stands for.',
      imageUrl: '/img5.jpg',
    },
  ],

  events: [
    {
      title: 'Nenwe Cultural Showcase',
      date: 'June 14, 2026',
      location: 'London, UK',
      detail: 'An evening of music, dance, and Igbo storytelling.',
    },
    {
      title: 'Community Town Hall',
      date: 'July 5, 2026',
      location: 'Virtual',
      detail: 'Strategy updates, member feedback, and project planning.',
    },
    {
      title: 'Youth Leadership Retreat',
      date: 'August 20, 2026',
      location: 'Nenwe',
      detail: 'Leadership, mentorship, and career development workshops.',
    },
  ],

  projects: [
    {
      title: 'Rural Water Access',
      status: 'Active',
      detail: 'Borehole installations and hygiene education across three Nenwe communities.',
    },
    {
      title: 'STEM Mentorship',
      status: 'Ongoing',
      detail: 'Volunteer mentors guide students in coding, robotics, and career pathways.',
    },
    {
      title: 'Women in Enterprise Fund',
      status: 'Funding',
      detail: 'Micro-grants and coaching for women-owned businesses.',
    },
    {
      title: 'Health Outreach Mission',
      status: 'Planning',
      detail: 'Quarterly health screenings and maternal support programs.',
    },
  ],

  newsItems: [
    {
      title: 'Scholarship Applications Open',
      date: 'March 12, 2026',
      detail: 'Applications are open for Nenwe secondary school scholarships.',
    },
    {
      title: 'Diaspora Business Network',
      date: 'February 28, 2026',
      detail: 'Launching a network to connect Nenwe entrepreneurs globally.',
    },
    {
      title: 'Volunteer Drive',
      date: 'January 18, 2026',
      detail: 'We are recruiting volunteers for mentorship and outreach.',
    },
  ],

  galleryItems: [
    { title: 'Community Outreach in Nenwe',    imageUrl: '/unnamed.jpg' },
    { title: 'Cultural Night in London',        imageUrl: '/unnamed%20(1).jpg' },
    { title: 'Youth Mentorship Session',        imageUrl: '/unnamed%20(2).jpg' },
    { title: 'Diaspora Business Meetup',        imageUrl: '/unnamed%20(3).jpg' },
    { title: 'Health Outreach Mission',         imageUrl: '/unnamed%20(4).jpg' },
    { title: 'Scholarship Award Ceremony',      imageUrl: '/unnamed%20(5).jpg' },
    { title: 'Annual General Meeting 2025',     imageUrl: '/unnamed%20(6).jpg' },
    { title: 'School Outreach Day',             imageUrl: '/unnamed%20(7).jpg' },
    { title: "Women's Enterprise Workshop",     imageUrl: '/unnamed%20(8).jpg' },
    { title: 'Health Fair 2025',               imageUrl: '/unnamed%20(9).jpg' },
    { title: 'Community Clean-Up Drive',        imageUrl: '/unnamed%20(10).jpg' },
    { title: 'Youth Sports Day',               imageUrl: '/unnamed%20(11).jpg' },
    { title: "Elders' Recognition Ceremony",   imageUrl: '/unnamed%20(12).jpg' },
    { title: 'Food Bank Initiative',           imageUrl: '/unnamed%20(13).jpg' },
    { title: 'Digital Skills Workshop',        imageUrl: '/unnamed%20(14).jpg' },
    { title: 'Cultural Dance Performance',     imageUrl: '/unnamed%20(15).jpg' },
    { title: 'Thanksgiving Service',           imageUrl: '/unnamed%20(16).jpg' },
    { title: 'NPA UK Annual Dinner',           imageUrl: '/unnamed%20(17).jpg' },
    { title: 'Community Meeting 2025',         imageUrl: '/unnamed%20(18).jpg' },
    { title: 'Fundraising Gala',               imageUrl: '/unnamed%20(19).jpg' },
    { title: 'Heritage Day Celebration',       imageUrl: '/unnamed%20(20).jpg' },
    { title: 'Association Gathering',          imageUrl: '/IMG_6758%20(1).jpeg' },
    { title: 'NPA UK Members',                imageUrl: '/IMG_6759%20(1).jpeg' },
  ],
};
