// Shared data (same in every language)
export const person = {
  name: 'Sabil Valdano',
  pronouns: 'He/Him',
  title: 'Technical Lead | Creative Problem-Solver | .NET Developer with 14+ Years Experience',
  linkedin: 'https://www.linkedin.com/in/sabilv',
  github: 'https://github.com/sabilv',
}
// Skills grouped by area. `items` is shown in English; `itemsId` (optional) replaces it in Indonesian.
export const skillGroups = [
  { en: 'Backend', id: 'Backend', items: ['C#', 'ASP.NET Core', 'MVC', 'Web API', 'Blazor', 'Entity Framework'] },
  { en: 'Data and reporting', id: 'Data dan pelaporan', items: ['SQL Server', 'SSRS', 'ETL', 'XBRL'] },
  { en: 'Cloud and DevOps', id: 'Cloud dan DevOps', items: ['Google Cloud Platform', 'CI/CD', 'Jenkins', 'SonarQube', 'Azure DevOps'] },
  { en: 'Integration', id: 'Integrasi', items: ['REST and SOAP APIs', 'Payment gateways', 'OTT integration', 'SAP BRIM and HANA'] },
  {
    en: 'Leadership', id: 'Kepemimpinan',
    items: ['Code review', 'Mentoring', 'Technical documentation', 'Project planning'],
    itemsId: ['Code review', 'Mentoring', 'Dokumentasi teknis', 'Perencanaan proyek'],
  },
]
export const skills = skillGroups.flatMap((g) => g.items)

// Leave a url empty to hide that icon. Add GitHub / email / Instagram links here.
export const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sabilv' },
  { name: 'GitHub', url: 'https://github.com/sabilv' },
  { name: 'Email', url: '' }, // optional, e.g. 'mailto:you@example.com'
]

// Add real recommendations: { quote: '...', name: '...', role: '...' }
export const recommendations = []

// ---------- English ----------
const en = {
  meta: {
    title: 'Sabil Valdano | Technical Lead and .NET Developer in Jakarta',
    description: 'Sabil Valdano is a Technical Lead and .NET developer in Jakarta with 14+ years of experience. Leads a team of 4 developers, with 10+ projects delivered and 99% uptime.',
  },
  ui: {
    nav: { about: 'About', experience: 'Experience', services: 'Services', together: 'Work together', contact: 'Contact' },
    lead: person.title,
    getInTouch: 'Get in touch', seeExperience: 'See experience',
    titles: { about: 'About', experience: 'Experience', services: 'What I do', together: 'Ways to work together', kind: 'Kind words' },
    goodFit: 'Good fit:', discuss: 'Discuss this',
    contactTitle: 'Open to new opportunities, collaboration and knowledge-sharing.',
    contactText: '.NET development, backend engineering, cloud integration and technical leadership.',
    linkedin: 'Message me on LinkedIn', github: 'See my code on GitHub',
    theme: 'Theme', auto: 'Auto', light: 'Light', dark: 'Dark', language: 'Language', social: 'Social links', main: 'Main',
  },
  about: [
    'Experienced Technical Lead and .NET developer with 14+ years of expertise in designing, developing, and delivering scalable web applications, RESTful APIs, and enterprise software solutions. Skilled in C#, ASP.NET Core, MVC, Web API, Entity Framework, SQL Server, and Google Cloud Platform (GCP).',
    'Strong background in software architecture, database design, cloud deployment, and performance optimization. Proven ability to lead development teams, manage technical projects, and deliver reliable software that meets business goals.',
    'Passionate about problem-solving, DevOps, CI/CD pipelines, and modern backend development. Experienced in mentoring developers, collaborating with stakeholders, and driving technology adoption.',
  ],
  facts: [
    { kicker: 'Now', title: 'Technical Lead', text: 'At NawaData, leading a team of 4 developers.' },
    { kicker: 'Domains', title: 'Telecom, banking, payments, logistics', text: '10+ years in telecom, plus regulatory reporting for Bank Indonesia and logistics systems.' },
    { kicker: 'Integrations', title: 'SAP, payments, OTT', text: 'SAP BRIM and HANA, Indonesian payment gateways (banks, e-commerce, e-wallets, minimarkets) and major OTT players.' },
  ],
  services: [
    { title: 'Web applications and APIs', text: 'ASP.NET Core, MVC, Blazor and Web API, with Entity Framework and SQL Server behind them.' },
    { title: 'Payment, partner and SAP integration', text: 'Connecting Indonesian payment gateways, major OTT players and SAP BRIM and HANA through secure APIs.' },
    { title: 'Architecture and database design', text: 'Structuring systems and data so they stay fast and maintainable as they grow.' },
    { title: 'Cloud and delivery', text: 'Deployment on Google Cloud Platform with automated CI/CD pipelines.' },
    { title: 'Team leadership', text: 'Code reviews, mentoring, technical documentation and timeline planning with project managers.' },
  ],
  experience: [
    {
      role: 'Technical Lead', company: 'NawaData', period: 'Oct 2023 – Present', place: 'Jakarta · Hybrid',
      summary: 'Leading a team of 4 developers and keeping delivery reliable, from code review to automated deployment.',
      highlights: [
        { value: '4', label: 'developers led' },
        { value: '10+', label: 'projects delivered' },
        { value: '99%', label: 'uptime' },
        { value: '~3M', label: 'records generated in 24 hours for a private bank in Indonesia' },
      ],
      points: [
        'Conduct code reviews to ensure quality and adherence to development standards.',
        'Manage the automated CI/CD deployment workflow with Jenkins, SonarQube and Azure DevOps for smooth, efficient application delivery.',
        'Work with the Project Manager on tasks and timelines so targets are met on schedule.',
        'Draft, update and maintain technical documentation (TSD) for the team.',
        'Engage customers directly to understand their needs and deliver the right technical solution.',
        'Mentor the team and guide them toward best practices.',
        'Design software architecture and database structures, and deploy applications on Google Cloud Platform.',
        'Optimize performance for high-volume workloads, including a private bank system generating about 3 million records in 24 hours.',
        'Troubleshoot and resolve technical issues to keep systems at 99% uptime.',
        'Consider security in architecture decisions and code reviews.',
        'Stay hands-on in the code, building and debugging alongside the team.',
      ],
    },
    {
      role: '.NET Developer and Junior System Analyst', company: 'PT Infra Solusi Indonesia · assigned to PT Link Net Tbk', period: 'May 2021 – Oct 2023', place: 'Tangerang · Hybrid',
      summary: 'Secure integrations with multiple Indonesian payment gateways (banks, e-commerce, e-wallets, minimarkets), major OTT players and SAP BRIM and HANA, plus web applications, technical documentation and task planning.',
      points: [
        'Built interactive web applications with Blazor and web APIs with .NET Core.',
        'Integrated multiple well-known Indonesian payment gateways through secure APIs, spanning private and national banks, e-commerce, e-wallets and minimarkets, ensuring safe transaction processing.',
        'Built API integrations with major OTT players in Indonesia.',
        'Integrated systems with SAP BRIM and SAP HANA APIs for better data synchronization and automation.',
        'Wrote technical documentation from Business Requirements Documents (BRD).',
        'Delegated tasks and tracked project timelines in Azure DevOps.',
        'Reviewed code and approved pull requests.',
      ],
    },
    {
      role: 'IT Application Developer', company: 'PT Link Net Tbk', period: 'Apr 2013 – Apr 2021', place: 'Greater Jakarta · Hybrid',
      summary: 'Eight years building ASP web applications in VB and C#.',
      points: [
        'Created user interfaces with DevExpress for .NET.',
        'Developed SOAP and REST APIs with .NET WebAPI for third-party integrations.',
        'Produced data-driven reports with Microsoft SQL Server Reporting Services (SSRS).',
      ],
    },
    {
      role: 'Software Developer', company: 'PT Ebiz Cipta Solusi · Bank Indonesia project', period: 'Jan 2013 – Apr 2013', place: 'Jakarta · On-site',
      summary: 'LBUS, the Sharia General Bank Report system for Bank Indonesia.',
      points: [
        'Developed the backend process for XBRL processing in line with Bank Indonesia standards.',
        'Optimized ETL processes for faster, more reliable report generation.',
        'Tested and debugged backend processes, and documented the XBRL implementation.',
      ],
    },
    {
      role: 'Junior .NET Developer', company: 'PT Devenlab Semartech · Ceva Logistics Indonesia', period: 'Mar 2012 – Sep 2012', place: 'Jakarta · On-site',
      summary: 'TMS Dashboard and Warehouse Management System (WMS) for Ceva Logistics and Ericsson Indonesia.',
      points: [
        'Built the TMS Dashboard for route management and tracking with .NET, SQL Server, LINQ, Entity Framework and Ext JS.',
        'Contributed to the WMS Lexy for warehouse operations and inventory management.',
      ],
    },
  ],
  ways: [
    { title: 'Technical leadership', text: 'Lead a development team, review code, set standards and keep delivery on schedule.', fit: 'Product teams that need a hands-on lead' },
    { title: 'Backend and API development', text: 'Design and build RESTful APIs and enterprise back ends in C# and ASP.NET Core.', fit: 'New services or integrations' },
    { title: 'Cloud and CI/CD setup', text: 'Move deployments to GCP and automate build, test and release.', fit: 'Teams still deploying by hand' },
  ],
}

// ---------- Bahasa Indonesia ----------
const idExperience = [
  {
    role: 'Technical Lead', period: 'Okt 2023 – Sekarang',
    summary: 'Memimpin tim beranggotakan 4 developer dan menjaga pengiriman tetap andal, dari code review hingga deployment otomatis.',
    highlights: [
      { value: '4', label: 'developer dipimpin' },
      { value: '10+', label: 'proyek terselesaikan' },
      { value: '99%', label: 'uptime' },
      { value: '~3M', label: 'record data dihasilkan dalam 24 jam untuk sebuah bank swasta di Indonesia' },
    ],
    points: [
      'Melakukan code review untuk menjaga kualitas dan kepatuhan pada standar pengembangan.',
      'Mengelola alur deployment CI/CD otomatis dengan Jenkins, SonarQube, dan Azure DevOps agar pengiriman aplikasi berjalan lancar dan efisien.',
      'Bekerja sama dengan Project Manager dalam mengatur tugas dan timeline agar target tercapai tepat waktu.',
      'Menyusun, memperbarui, dan memelihara dokumentasi teknis (TSD) sebagai panduan tim.',
      'Berinteraksi langsung dengan pelanggan untuk memahami kebutuhan dan memberikan solusi teknis yang tepat.',
      'Membimbing tim dan memberikan arahan teknis agar praktik terbaik diterapkan.',
      'Merancang arsitektur software dan struktur database, serta men-deploy aplikasi di Google Cloud Platform.',
      'Mengoptimalkan performa untuk beban kerja berskala besar, termasuk sistem bank swasta yang menghasilkan sekitar 3 juta record data dalam 24 jam.',
      'Menangani dan menyelesaikan masalah teknis agar sistem tetap berjalan dengan uptime 99%.',
      'Mempertimbangkan aspek keamanan dalam keputusan arsitektur dan code review.',
      'Tetap terlibat langsung dalam kode, membangun dan men-debug bersama tim.',
    ],
  },
  {
    role: '.NET Developer dan Junior System Analyst', company: 'PT Infra Solusi Indonesia · ditempatkan di PT Link Net Tbk', period: 'Mei 2021 – Okt 2023',
    summary: 'Integrasi aman dengan beberapa payment gateway ternama di Indonesia (bank, e-commerce, e-wallet, minimarket), pemain OTT besar, serta SAP BRIM dan HANA, ditambah aplikasi web, dokumentasi teknis, dan perencanaan tugas.',
    points: [
      'Membangun aplikasi web interaktif dengan Blazor dan web API dengan .NET Core.',
      'Mengintegrasikan beberapa payment gateway ternama di Indonesia lewat API aman, mencakup bank swasta dan nasional, e-commerce, e-wallet, dan minimarket, agar pemrosesan transaksi tetap aman.',
      'Membangun integrasi API dengan pemain OTT besar di Indonesia.',
      'Mengintegrasikan sistem dengan API SAP BRIM dan SAP HANA untuk sinkronisasi data dan otomatisasi yang lebih baik.',
      'Menyusun dokumentasi teknis berdasarkan Business Requirements Document (BRD).',
      'Mendelegasikan tugas dan memantau timeline proyek di Azure DevOps.',
      'Melakukan code review dan menyetujui pull request.',
    ],
  },
  {
    role: 'IT Application Developer', period: 'Apr 2013 – Apr 2021',
    summary: 'Delapan tahun membangun aplikasi web ASP dengan VB dan C#.',
    points: [
      'Membuat antarmuka pengguna dengan DevExpress for .NET.',
      'Mengembangkan API SOAP dan REST dengan .NET WebAPI untuk integrasi pihak ketiga.',
      'Membuat laporan berbasis data dengan Microsoft SQL Server Reporting Services (SSRS).',
    ],
  },
  {
    role: 'Software Developer', period: 'Jan 2013 – Apr 2013',
    summary: 'LBUS, sistem Laporan Bank Umum Syariah untuk Bank Indonesia.',
    points: [
      'Mengembangkan proses backend untuk pengolahan XBRL sesuai standar Bank Indonesia.',
      'Mengoptimalkan proses ETL agar pembuatan laporan lebih cepat dan andal.',
      'Menguji dan men-debug proses backend, serta mendokumentasikan implementasi XBRL.',
    ],
  },
  {
    role: 'Junior .NET Developer', period: 'Mar 2012 – Sep 2012',
    summary: 'TMS Dashboard dan Warehouse Management System (WMS) untuk Ceva Logistics dan Ericsson Indonesia.',
    points: [
      'Membangun TMS Dashboard untuk manajemen rute dan pelacakan dengan .NET, SQL Server, LINQ, Entity Framework, dan Ext JS.',
      'Berkontribusi pada WMS Lexy untuk operasional gudang dan manajemen inventori.',
    ],
  },
]

const id = {
  ...en,
  meta: {
    title: 'Sabil Valdano | Technical Lead dan Developer .NET di Jakarta',
    description: 'Sabil Valdano adalah Technical Lead dan developer .NET di Jakarta dengan pengalaman 14+ tahun. Memimpin 4 developer, 10+ proyek terselesaikan, uptime 99%.',
  },
  ui: {
    nav: { about: 'Tentang', experience: 'Pengalaman', services: 'Layanan', together: 'Kerja sama', contact: 'Kontak' },
    lead: 'Technical Lead | Creative Problem-Solver | Developer .NET dengan Pengalaman 14+ Tahun',
    getInTouch: 'Hubungi saya', seeExperience: 'Lihat pengalaman',
    titles: { about: 'Tentang', experience: 'Pengalaman', services: 'Yang saya kerjakan', together: 'Cara bekerja sama', kind: 'Testimoni' },
    goodFit: 'Cocok untuk:', discuss: 'Diskusikan',
    contactTitle: 'Terbuka untuk peluang baru, kolaborasi, dan berbagi pengetahuan.',
    contactText: 'Pengembangan .NET, backend engineering, integrasi cloud, dan kepemimpinan teknis.',
    linkedin: 'Kirim pesan di LinkedIn', github: 'Lihat kode saya di GitHub',
    theme: 'Tema', auto: 'Otomatis', light: 'Terang', dark: 'Gelap', language: 'Bahasa', social: 'Tautan sosial', main: 'Utama',
  },
  about: [
    'Technical Lead dan developer .NET berpengalaman dengan lebih dari 14 tahun keahlian dalam merancang, mengembangkan, dan mengirimkan aplikasi web yang skalabel, RESTful API, dan solusi software enterprise. Mahir di C#, ASP.NET Core, MVC, Web API, Entity Framework, SQL Server, dan Google Cloud Platform (GCP).',
    'Memiliki latar belakang kuat di arsitektur software, desain database, deployment cloud, dan optimasi performa. Terbukti mampu memimpin tim developer, mengelola proyek teknis, dan menghasilkan software andal yang sesuai tujuan bisnis.',
    'Bersemangat dalam pemecahan masalah, DevOps, pipeline CI/CD, dan pengembangan backend modern. Berpengalaman membimbing developer, berkolaborasi dengan stakeholder, dan mendorong adopsi teknologi.',
  ],
  facts: [
    { kicker: 'Saat ini', title: 'Technical Lead', text: 'Di NawaData, memimpin tim beranggotakan 4 developer.' },
    { kicker: 'Domain', title: 'Telekomunikasi, perbankan, pembayaran, logistik', text: '10+ tahun di telekomunikasi, plus pelaporan regulasi untuk Bank Indonesia dan sistem logistik.' },
    { kicker: 'Integrasi', title: 'SAP, pembayaran, OTT', text: 'SAP BRIM dan HANA, payment gateway Indonesia (bank, e-commerce, e-wallet, minimarket), dan pemain OTT besar.' },
  ],
  services: [
    { title: 'Aplikasi web dan API', text: 'ASP.NET Core, MVC, Blazor, dan Web API, dengan Entity Framework dan SQL Server di baliknya.' },
    { title: 'Integrasi pembayaran, mitra, dan SAP', text: 'Menghubungkan payment gateway Indonesia, pemain OTT besar, serta SAP BRIM dan HANA lewat API yang aman.' },
    { title: 'Arsitektur dan desain database', text: 'Menyusun sistem dan data agar tetap cepat dan mudah dirawat seiring pertumbuhan.' },
    { title: 'Cloud dan delivery', text: 'Deployment di Google Cloud Platform dengan pipeline CI/CD otomatis.' },
    { title: 'Kepemimpinan tim', text: 'Code review, mentoring, dokumentasi teknis, dan perencanaan timeline bersama project manager.' },
  ],
  experience: en.experience.map((e, i) => ({ ...e, ...idExperience[i] })),
  ways: [
    { title: 'Kepemimpinan teknis', text: 'Memimpin tim developer, melakukan code review, menetapkan standar, dan menjaga pengiriman tepat waktu.', fit: 'Tim produk yang butuh lead yang terjun langsung' },
    { title: 'Pengembangan backend dan API', text: 'Merancang dan membangun RESTful API dan backend enterprise dengan C# dan ASP.NET Core.', fit: 'Layanan atau integrasi baru' },
    { title: 'Setup cloud dan CI/CD', text: 'Memindahkan deployment ke GCP dan mengotomatiskan build, test, dan rilis.', fit: 'Tim yang masih deploy secara manual' },
  ],
}

export const content = { en, id }

// Everything that can be edited from the admin page, as one object.
export const defaultSite = { person, skillGroups, socials, recommendations, content }
