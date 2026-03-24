export type Language = 'en' | 'ig';

export const languageOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'ig', label: 'Igbo' },
];

type TranslationItem = {
  title: string;
  date: string;
  detail: string;
};

type Translations = {
  common: {
    kicker: string;
    brandTagline: string;
  };
  nav: {
    home: string;
    about: string;
    events: string;
    projects: string;
    news: string;
    gallery: string;
    blog: string;
    contact: string;
    donate: string;
    quickPay: string;
  };
  footer: {
    description: string;
    explore: string;
    contact: string;
    donate: string;
    rightsPrefix: string;
  };
  home: {
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    stats: {
      members: string;
      projects: string;
      scholarships: string;
    };
    whoKicker: string;
    whoTitle: string;
    upcomingKicker: string;
    upcomingTitle: string;
    impactKicker: string;
    impactTitle: string;
  };
  about: {
    title: string;
    subtitle: string;
    purposeKicker: string;
    purposeTitle: string;
    leadershipKicker: string;
    leadershipTitle: string;
    leadership: { name: string; detail: string }[];
  };
  events: {
    title: string;
    subtitle: string;
    rsvp: string;
    items: TranslationItem[];
  };
  projects: {
    title: string;
    subtitle: string;
    items: { title: string; status: string; detail: string }[];
  };
  news: {
    title: string;
    subtitle: string;
    featured: string;
    items: TranslationItem[];
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    placeholder: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      send: string;
    };
    detailsTitle: string;
    responseTime: string;
  };
  donate: {
    title: string;
    subtitle: string;
    bankTitle: string;
    onlineTitle: string;
    accountName: string;
    bank: string;
    sortCode: string;
    accountNumber: string;
    onlineBody: string;
    onlineCta: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    backHome: string;
  };
  admin: {
    title: string;
    subtitle: string;
    themeLabel: string;
    languageLabel: string;
    blogTitle: string;
    galleryTitle: string;
    addPost: string;
    addGallery: string;
  };
};

const translations: Record<Language, Translations> = {
  en: {
    common: {
      kicker: 'NPA UK Community',
      brandTagline: 'NPA UK Community',
    },
    nav: {
      home: 'Home',
      about: 'About Us',
      events: 'Events',
      projects: 'Projects',
      news: 'News',
      gallery: 'Gallery',
      blog: 'Blog',
      contact: 'Contact',
      donate: 'Donate',
      quickPay: 'Quick Pay',
    },
    footer: {
      description:
        'Building a vibrant Igbo diaspora community that supports people, projects, and progress in Enugu.',
      explore: 'Explore',
      contact: 'Contact',
      donate: 'Donate',
      rightsPrefix: 'NPA UK Community',
    },
    home: {
      heroPrimaryCta: 'Explore Projects',
      heroSecondaryCta: 'Support the Mission',
      stats: {
        members: 'Active Members',
        projects: 'Projects Delivered',
        scholarships: 'Scholarships Awarded',
      },
      whoKicker: 'Who We Are',
      whoTitle: 'Rooted in Igbo heritage, focused on impact',
      upcomingKicker: 'Upcoming',
      upcomingTitle: 'Events that bring us together',
      impactKicker: 'Impact',
      impactTitle: 'Projects shaping Enugu',
    },
    about: {
      title: 'About Us',
      subtitle:
        'NPA UK is a network of Ndi Enugu in the United Kingdom committed to service, heritage, and community prosperity.',
      purposeKicker: 'Purpose',
      purposeTitle: 'Our Mission & Vision',
      leadershipKicker: 'Leadership',
      leadershipTitle: 'Community Leadership',
      leadership: [
        { name: 'Community President', detail: 'Guides vision and partnerships.' },
        { name: 'Program Director', detail: 'Leads youth, culture, and education initiatives.' },
        { name: 'Finance Lead', detail: 'Oversees funds, grants, and accountability.' },
      ],
    },
    events: {
      title: 'Events',
      subtitle: 'Gatherings that strengthen our diaspora ties and deepen our impact in Enugu.',
      rsvp: 'RSVP',
      items: [
        {
          title: 'Enugu Cultural Showcase',
          date: 'June 14, 2026',
          detail: 'An evening of music, dance, and Igbo storytelling.',
        },
        {
          title: 'Community Town Hall',
          date: 'July 5, 2026',
          detail: 'Strategy updates, member feedback, and project planning.',
        },
        {
          title: 'Youth Leadership Retreat',
          date: 'August 20, 2026',
          detail: 'Leadership, mentorship, and career development workshops.',
        },
      ],
    },
    projects: {
      title: 'Projects',
      subtitle: 'Community-driven initiatives that deliver real, measurable impact in Enugu.',
      items: [
        {
          title: 'Rural Water Access',
          status: 'Active',
          detail: 'Borehole installations and hygiene education across three Enugu communities.',
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
    },
    news: {
      title: 'News & Announcements',
      subtitle: 'Updates, community news, and opportunities to get involved.',
      featured: 'Featured Announcement',
      items: [
        {
          title: 'Scholarship Applications Open',
          date: 'March 12, 2026',
          detail: 'Applications are open for Enugu secondary school scholarships.',
        },
        {
          title: 'Diaspora Business Network',
          date: 'February 28, 2026',
          detail: 'Launching a network to connect Enugu entrepreneurs globally.',
        },
        {
          title: 'Volunteer Drive',
          date: 'January 18, 2026',
          detail: 'We are recruiting volunteers for mentorship and outreach.',
        },
      ],
    },
    blog: {
      title: 'Blog',
      subtitle: 'Insights, stories, and perspectives from the NPA UK community.',
      readMore: 'Read more',
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'Moments from our events, outreach missions, and community gatherings.',
      placeholder: 'Image Placeholder',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Reach out to the leadership team or request collaboration on community projects.',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'you@email.com',
        messagePlaceholder: 'Tell us how we can help',
        send: 'Send Message',
      },
      detailsTitle: 'Contact Details',
      responseTime: 'We respond within 72 hours.',
    },
    donate: {
      title: 'Donate',
      subtitle:
        'Support projects that improve lives across Enugu. Every contribution powers education, health, and infrastructure.',
      bankTitle: 'Bank Transfer',
      onlineTitle: 'Online Donation',
      accountName: 'Account Name: NPA UK Community',
      bank: 'Bank: Placeholder Bank',
      sortCode: 'Sort Code: 00-00-00',
      accountNumber: 'Account Number: 00000000',
      onlineBody: 'Use our secure online donation link for card and mobile transfers.',
      onlineCta: 'Donate Online',
    },
    notFound: {
      title: 'Page Not Found',
      subtitle: 'We could not find what you are looking for.',
      backHome: 'Back to Home',
    },
    admin: {
      title: 'Admin',
      subtitle: 'Update key sections of the site. Changes save locally in the browser storage.',
      themeLabel: 'Theme',
      languageLabel: 'Language',
      blogTitle: 'Blog Posts',
      galleryTitle: 'Gallery Items',
      addPost: 'Add Post',
      addGallery: 'Add Gallery Item',
    },
  },
  ig: {
    common: {
      kicker: 'NPA UK Community',
      brandTagline: 'NPA UK Community',
    },
    nav: {
      home: 'Ụlọ',
      about: 'Banyere Anyị',
      events: 'Ihe Omume',
      projects: 'Ọrụ',
      news: 'Akụkọ',
      gallery: 'Ọbá Foto',
      blog: 'Blọgụ',
      contact: 'Kpọtụrụ Anyị',
      donate: 'Nye Onyinye',
      quickPay: 'Nkwụ Ụgwọ Ngwa Ngwa',
    },
    footer: {
      description:
        'Ịrụ obodo Ndi Igbo diaspora nke na-akwado mmadụ, ọrụ, na mmepe n’ime Enugu.',
      explore: 'Nyochaa',
      contact: 'Kpọtụrụ',
      donate: 'Nye Onyinye',
      rightsPrefix: 'NPA UK Community',
    },
    home: {
      heroPrimaryCta: 'Lelee Ọrụ',
      heroSecondaryCta: 'Kwado Ebumnuche',
      stats: {
        members: 'Ndị Otu Na-arụsi Ọrụ',
        projects: 'Ọrụ Emere',
        scholarships: 'Mmemme Scholarship',
      },
      whoKicker: 'Onye Anyị Bụ',
      whoTitle: 'Jikọrọ na omenala Igbo, lekwasịrị anya na mmetụta',
      upcomingKicker: 'Na-abịa',
      upcomingTitle: 'Ihe omume na-eme ka anyị jikọta ọnụ',
      impactKicker: 'Mmetụta',
      impactTitle: 'Ọrụ na-eme Enugu ka mma',
    },
    about: {
      title: 'Banyere Anyị',
      subtitle:
        'NPA UK bụ netwọk Ndi Enugu nọ na United Kingdom nwere ebumnuche ọrụ, omenala, na mmepe obodo.',
      purposeKicker: 'Ebumnuche',
      purposeTitle: 'Ebumnuche & Okwu Anyị',
      leadershipKicker: 'Ndu',
      leadershipTitle: 'Ndu Ụlọ Ọgbakọ',
      leadership: [
        { name: 'Onye Isi Ụlọ Ọgbakọ', detail: 'Na-eduga ọhụụ na mmekọrịta.' },
        { name: 'Onye Nlekọta Mmemme', detail: 'Na-edu ndị ntorobịa, omenala, na agụmakwụkwọ.' },
        { name: 'Onye Nlekọta Ego', detail: 'Na-elekọta ego, grants, na ịkọwa ọrụ.' },
      ],
    },
    events: {
      title: 'Ihe Omume',
      subtitle: 'Nzụkọ na-eme ka anyị jikọta ọnụ ma welite mmetụta anyị na Enugu.',
      rsvp: 'RSVP',
      items: [
        {
          title: 'Ngosi Omenala Enugu',
          date: 'June 14, 2026',
          detail: 'An evening of music, dance, and Igbo storytelling.',
        },
        {
          title: 'Ọgbakọ Ndị Obodo',
          date: 'July 5, 2026',
          detail: 'Strategy updates, member feedback, and project planning.',
        },
        {
          title: 'Nzukọ Ndu Ndị Ntọrịa',
          date: 'August 20, 2026',
          detail: 'Leadership, mentorship, and career development workshops.',
        },
      ],
    },
    projects: {
      title: 'Ọrụ',
      subtitle: 'Mmemme obodo na-eweta ezigbo mmetụta na Enugu.',
      items: [
        {
          title: 'Mmiri N’ime Ụlọ Ọrụ',
          status: 'Na-arụsi Ọrụ',
          detail: 'Borehole installations and hygiene education across three Enugu communities.',
        },
        {
          title: 'Nduzi STEM',
          status: 'Na-aga n’ihu',
          detail: 'Volunteer mentors guide students in coding, robotics, and career pathways.',
        },
        {
          title: 'Ọrụ Ndị Ụmụnwaanyị Na-azụ Ahịa',
          status: 'Nkwado Ego',
          detail: 'Micro-grants and coaching for women-owned businesses.',
        },
        {
          title: 'Ọrụ Nlekọta Ahụ Ike',
          status: 'Na-eme atụmatụ',
          detail: 'Quarterly health screenings and maternal support programs.',
        },
      ],
    },
    news: {
      title: 'Akụkọ & Mgbasa Ozi',
      subtitle: 'Mmelite, akụkọ obodo, na ohere isonye.',
      featured: 'Mgbasa Ozi Pụrụ Iche',
      items: [
        {
          title: 'Nnabata Scholarship Meghere',
          date: 'March 12, 2026',
          detail: 'Applications are open for Enugu secondary school scholarships.',
        },
        {
          title: 'Netwọk Azụmahịa Diaspora',
          date: 'February 28, 2026',
          detail: 'Launching a network to connect Enugu entrepreneurs globally.',
        },
        {
          title: 'Mgbalị Ndị Ọrụ Ọhaneze',
          date: 'January 18, 2026',
          detail: 'We are recruiting volunteers for mentorship and outreach.',
        },
      ],
    },
    blog: {
      title: 'Blọgụ',
      subtitle: 'Akụkọ, echiche, na echiche sitere na obodo NPA UK.',
      readMore: 'Gụọ ọzọ',
    },
    gallery: {
      title: 'Ọbá Foto',
      subtitle: 'Oge ndị anyị nọrọ ọnụ n’ime ihe omume, ọrụ, na nnọkọ obodo.',
      placeholder: 'Nlele Foto',
    },
    contact: {
      title: 'Kpọtụrụ Anyị',
      subtitle: 'Kpọtụrụ ndị ndu ma ọ bụ rịọ mmekọrịta na ọrụ obodo.',
      form: {
        name: 'Aha',
        email: 'Email',
        message: 'Ozi',
        namePlaceholder: 'Aha gị',
        emailPlaceholder: 'you@email.com',
        messagePlaceholder: 'Gwa anyị otu anyị ga-esi nyere aka',
        send: 'Ziga Ozi',
      },
      detailsTitle: 'Nkọwa Kpọtụrụ',
      responseTime: 'Anyị na-aza n’ime awa 72.',
    },
    donate: {
      title: 'Nye Onyinye',
      subtitle:
        'Kwado ọrụ na-eme ka ndụ ndị mmadụ ka mma n’ime Enugu. Onyinye ọ bụla na-akwado agụmakwụkwọ, ahụ ike, na mmepe.',
      bankTitle: 'Nkwụ Ụgwọ Bank',
      onlineTitle: 'Nye Onyinye Online',
      accountName: 'Aha Akaụntụ: NPA UK Community',
      bank: 'Bank: Placeholder Bank',
      sortCode: 'Sort Code: 00-00-00',
      accountNumber: 'Nọmba Akaụntụ: 00000000',
      onlineBody: 'Jiri njikọ onyinye anyị dị nchebe maka kaadị na mobile.',
      onlineCta: 'Nye Onyinye Online',
    },
    notFound: {
      title: 'A hụbeghị ibe a',
      subtitle: 'Anyị enweghị ike ịchọta ihe ị na-achọ.',
      backHome: 'Laghachi Ụlọ',
    },
    admin: {
      title: 'Admin',
      subtitle: 'Gbanwee akụkụ ndị bụ isi. A na-echekwa mgbanwe na nchekwa local.',
      themeLabel: 'Ụdị',
      languageLabel: 'Asụsụ',
      blogTitle: 'Edemede Blọgụ',
      galleryTitle: 'Ihe N’ọbá Foto',
      addPost: 'Tinye Edemede',
      addGallery: 'Tinye Ihe N’ọbá Foto',
    },
  },
};

export const getTranslations = (language: string): Translations =>
  translations[language as Language] ?? translations.en;
