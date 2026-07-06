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
  dataVersion?: number;
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
  theme: 'coastal',
  language: 'en',
  dataVersion: 1,

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
      id: '4',
      name: 'Dr Ugochukwu Innocent Nweke',
      title: 'Chairman',
      bio: 'Dr. Innocent Ugochukwu Nweke (PhD, RNLD) is the Chairman and Managing Director of Social Work Innovations Ltd, specialists in Child Protection, Corporate Parenting & Family Safeguarding consultancy services.\n\nDr. Nweke is a distinguished consultant social worker with expertise in dysfunctional family safeguarding, child protection services, and corporate parenting. He works across the United Kingdom and is currently working on contracts with a Local Authority in West Midlands.\n\nDr. Nweke earned a First Class bachelor\'s degree in social work and nursing practices from London South Bank University, followed by a Master\'s degree with Merit from London Metropolitan University. He later completed his PhD in Social Work at the University of Kent, Canterbury.\n\nOriginally from Enugunato Uhueze Nenwe, Dr. Nweke was born to Late Matthew Igbokwe Nweke and late Mrs Justina Nwakaego Nweke, and raised in Jos, Plateau State, Nigeria. He has remained deeply connected to his roots and currently serves as the Chairman of the Nenwe Progressive Association United Kingdom (NPAUK), a role he has held since its founding in 2009. He is also the Assistant Chairman of Nenwe in Diaspora (NiDA).\n\nDr. Nweke is a Board of Trustees member of the Coalition for the Protection of Democracy (COPDEM), a diaspora-based policy-focused think tank committed to restoring true democratic values in Nigeria. He is also the Secretary of the Nigeria Democratic Congress (NDC) in the United Kingdom.\n\nHe is married to Mrs Queen Esther Ugo-Nweke and they have three children together.',
      imageUrl: '/member/IMG_8193%20-%20Innocent%20Nweke.jpeg',
    },
    {
      id: '17',
      name: 'Mr/Mrs Daniel & Ijeoma Dike',
      title: 'Vice Chairman',
      bio: 'Pioneer member of the Nenwe Progressive Association UK.',
      imageUrl: '/img17.jpg',
    },
    {
      id: '2',
      name: 'Kenneth Ejim',
      title: 'General Secretary',
      bio: 'Kenneth Kenechukwu Ejim is a native of Umuagom-Ngwokeleze, Enugunato, Uhueze, Nenwe in Aninri LGA of Enugu State, Nigeria. He lives in Manchester, United Kingdom with his family.\n\nKen Ejim is the Inaugural General Secretary of the Association and one of the founding members of NPA UK. He is a Lawyer by training, but currently works in a UK civil service department.',
      imageUrl: '/member/IMG_1328-81%20-%20Kenneth%20K.%20Ejim.jpg.jpeg',
    },
    {
      id: '18',
      name: 'Millar Gloria Adaobi',
      title: 'Assistant Secretary',
      bio: 'My name is Mrs Millar Gloria Adaobi, from Emulemoke Agbada Nenwe in Aninri Local Government Area of Enugu State. Presently I live in the UK and I am a full member of the NPA.',
      imageUrl: '/member/20260104_145512%20-%20ODIUKO%20NA%20MBA%20ADAOBI%20(1).jpg',
    },
    {
      id: '11',
      name: 'Dr Chibuzor Christian Ndubuisi',
      title: 'Publicity Secretary',
      bio: 'I live in the North East of England. I am from Umuewo Uhueze Nenwe.',
      imageUrl: '/member/IMG-20250713-WA0008%20-%20Christian%20Ndubuisi.jpg.jpeg',
    },
    {
      id: '3',
      name: 'Mr Donatus Okoronkwo',
      title: 'Member',
      bio: 'I am from Umuekwengele, Emudo Nenwe. Married with children. Currently living in the United Kingdom.',
      imageUrl: '/member/temp_image_BC900FE0-4FEC-4502-BD62-457508B19DD5%20-%20DONATUS%20NDUBUISI%20OKORONKWO.webp',
    },
    {
      id: '5',
      name: 'Ernest Ikechukwu Chukwu',
      title: 'Member',
      bio: 'Name: Ernest Ikechukwu Chukwu\nVillage: Emudo Nenwe\nResidence: Manchester',
      imageUrl: '/member/IMG20260510172043%20-%20Ernest%20Ikechukwu.jpg.jpeg',
    },
    {
      id: '6',
      name: 'Timothy Nnamdi Ejim',
      title: 'Member',
      bio: 'A native of Umuagom Ngwokeleze, Elugwulato Uhueze Nenwe. Lives in the East Midlands of England, UK.',
      imageUrl: '/member/20251230_153826%20-%20Timothy%20Ejim.jpg.jpeg',
    },
    {
      id: '7',
      name: 'Chidiebere Christian Akpa',
      title: 'Member',
      bio: 'Chidiebere Christian Akpa is from Obeagu Uhueze Nenwe in Aninri Local Government Area of Enugu State. He lives in Manchester, United Kingdom.',
      imageUrl: '/member/1782569384785%20-%20Masterpress%20Chris%20chidi.jpg.jpeg',
    },
    {
      id: '8',
      name: 'Alexander Ifeanyi Chukwu',
      title: 'Member',
      bio: 'Alexander is from Ugwu-Okpa, Umuekuma, Emudo Nenwe. A Licensed Practicing Pharmacist for over a decade in Nigeria before moving to the UK. He holds a Master\'s degree in Drug Discovery and Development and is presently working with NHS England. A Christian passionate about service and worship of God.',
      imageUrl: '/member/IMG_20250613_102505_103332%20-%20Alexander%20Ifeanyi%20Chukwu.jpg.jpeg',
    },
    {
      id: '9',
      name: 'Pius Kenechukwu Onwe',
      title: 'Member',
      bio: 'My name is Pius Kenechukwu Onwe, mostly known as KC Onwe. I am a father of three — two girls and a boy — married to my lovely wife Emma, who is originally from Scotland. I am from Eziecho Uhueze Nenwe, and live in Edinburgh, Scotland, United Kingdom.\n\nI work in a bank as a Project Manager and also run property management services as a side business.',
      imageUrl: '/member/20251223_193336%20-%20KC%20Pius%20Onwe.jpg.jpeg',
    },
    {
      id: '10',
      name: 'Gregory Patrick Udeh',
      title: 'Member',
      bio: 'I am an Accountant and a Registered MHN. I hail from Eziecho, Uhueze, Nenwe and reside in London, United Kingdom.',
      imageUrl: '/member/20240207_142533%20-%20Gregory%20Patrick%20Udeh.jpg.jpeg',
    },
    {
      id: '12',
      name: 'Chukwumba Johnbosco Ugochukwu',
      title: 'Member',
      bio: 'My name is Johnbosco Ugochukwu Chukwumba (Ogbuevi Ugonabuo), from Umuchoke Umudibo, Amoji Nenwe. I currently reside in Portsmouth, Hampshire, United Kingdom, where I work as a Prison Officer and Mental Health Support Worker. I also hold the office of Immigration Officer in Nigeria and remain available to assist with any related services.\n\nI am married to Barr. (Mrs.) Ifeatu Chukwumba, a social worker, and together we are blessed with three children. I am deeply passionate about the growth and development of Nenwe, and my intention has always been to contribute my quota towards lifting our community — promoting peace, love, and unity in all matters affecting Nenwe. I remain committed to supporting initiatives that drive progress and unity for our people.',
      imageUrl: '/member/20260627_112256%20-%20JOHNBOSCO%20CHUKWUMBA.jpg.jpeg',
    },
    {
      id: '13',
      name: 'Casmir Chukwunta',
      title: 'Member',
      bio: 'A committed member dedicated to promoting unity, community development, and the welfare of our people. Passionate about working with others to preserve our heritage and contribute to the growth and progress of our town.',
      imageUrl: '/member/20251220_222942%20-%20cas%20Chukwunta.jpg',
    },
    {
      id: '14',
      name: 'Chinedu Peter Anieze',
      title: 'Member',
      bio: 'Chinedu Anieze is a Social Support Worker based in Edinburgh, United Kingdom, with a longstanding commitment to community service, charitable initiatives, and humanitarian support. He has dedicated many years to serving and empowering individuals, families, and communities through compassionate leadership, advocacy, and voluntary service.\n\nHe has held several notable leadership positions, including Vice President and General Secretary of the Nigeria Community in Edinburgh (NCIE-UK), Chairman of Eziecho Community Abroad, and Chairman of the Umungele Clan of Eziecho Community. In these capacities, he has championed community development, promoted unity and cultural values, and supported initiatives that improve the welfare of community members.\n\nHaving travelled extensively, Chinedu brings a broad international perspective to his work and values collaboration across diverse cultures and backgrounds. He is widely recognised as a trusted mentor and guide to numerous individuals, relatives, and families.\n\nA devoted husband and proud father of two, Chinedu believes that strong families and compassionate leadership are the foundation of vibrant communities. He remains committed to advancing charitable causes, fostering social inclusion, and making a meaningful and lasting contribution to society through integrity, service, and selfless leadership.',
      imageUrl: '/member/IMG_1920%20-%20Chinedu%20Anieze.jpeg',
    },
    {
      id: '15',
      name: 'Pascal Ofobuike Okereke',
      title: 'Member',
      bio: 'A dedicated healthcare professional with a background in Chemical Engineering and a passion for improving lives through patient care.\n\nA UK Registered Nurse committed to delivering compassionate, evidence-based healthcare with professionalism and integrity.\n\nDriven by continuous learning, excellence, and a desire to make a meaningful impact in both healthcare and beyond.',
      imageUrl: '/member/IMG-20260604-WA0001%20-%20Pascal%20Ofobuike.jpg.jpeg',
    },
    {
      id: '16',
      name: 'Mr Celestine Eze',
      title: 'Member',
      bio: 'From Amoji Nenwe.',
      imageUrl: '/member/20230723_134852%20-%20Celetrancy%20Johnsonwax.jpg.jpeg',
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
    { title: 'NPA UK get-together party in November 2025 in Manchester',                           imageUrl: '/unnamed.jpg' },
    { title: 'Get together / meeting in Colchester hosted by Dr & Mrs Matthew Ọnụ',               imageUrl: '/unnamed%20(1).jpg' },
    { title: 'Our meeting / family get together hosted by Dr & Mrs Celestine Udenta in Aylesbury', imageUrl: '/unnamed%20(2).jpg' },
    { title: 'Our family holiday in Stirling, Scotland',                                           imageUrl: '/unnamed%20(3).jpg' },
    { title: 'NPA-UK meeting / family get-together hosted by Mr. Casmir',                         imageUrl: '/unnamed%20(4).jpg' },
    { title: 'NPA-UK meeting / family get-together hosted by Chief Dan Dike',                     imageUrl: '/unnamed%20(5).jpg' },
    { title: 'NPA-UK meeting / family get-together hosted by Hon Chidi Nweke in Essex',           imageUrl: '/unnamed%20(6).jpg' },
    { title: 'NPA-UK meeting / family get-together hosted by Pascal Okereke in Manchester',       imageUrl: '/unnamed%20(7).jpg' },
    { title: 'NPA-UK meeting / family get-together hosted by Dr Christian Ndubuisi',              imageUrl: '/unnamed%20(8).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(9).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(10).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(11).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(12).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(13).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(14).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(15).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(16).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(17).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(18).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(19).jpg' },
    { title: 'NPA UK Event',  imageUrl: '/unnamed%20(20).jpg' },
    { title: 'Association Gathering', imageUrl: '/IMG_6758%20(1).jpeg' },
    { title: 'NPA UK Members',        imageUrl: '/IMG_6759%20(1).jpeg' },
  ],
};
