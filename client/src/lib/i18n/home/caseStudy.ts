import type { Dict } from "../useDict";

/**
 * Copy for CaseStudyFeatureSection — the pinned card-stack "Selected work"
 * chapter. Client/brand names (`name`), domains, and technology proper nouns
 * (Next.js, Photoshop, cPanel) stay identical in both locales; only
 * subtitle/description/tags/UI chrome are localized. `label` ("P.01") and
 * `progress` ("04 / 06") are position indicators, not language content.
 */
const en = {
  progress: "04 / 06",
  headingLine1: "Selected work shaped",
  headingLine2: "from strategy to launch.",
  description:
    "A closer look at websites and digital systems we designed, developed, optimized, and launched across export brands, e-commerce platforms, and business-focused experiences.",
  viewProject: "View Project",
  openLiveWebsite: "Open live website",
  openLiveWebsiteAriaLabel: (name: string) => `Open ${name} live website in a new tab`,
  websitePreviewTitle: (name: string) => `${name} website preview`,
  projects: [
    {
      label: "P.01",
      subtitle: "Agriculture export company",
      description:
        "We rebuilt Houd El Nile's digital presence from an outdated WordPress website into a premium multilingual Next.js experience that better reflects the company's farms, factories, export business, and product quality.",
      tags: ["Website Redesign", "Next.js", "Photography", "7 Languages", "SEO & Performance"],
    },
    {
      label: "P.02",
      subtitle: "Dental supplies e-commerce platform",
      description:
        "We designed and built X Dental as a complete e-commerce platform for doctors and clinics. The project included UI/UX design, product flows, cart and checkout, frontend and backend development, and product image editing.",
      tags: ["E-commerce", "UI/UX Design", "Frontend", "Backend", "Photoshop"],
    },
    {
      label: "P.03",
      subtitle: "Saudi beverage distribution e-commerce",
      description:
        "We created a complete online shopping platform for Al Nours, a Saudi company with distribution rights for Domty juices. The project included logo creation, brand color direction, full-stack development, and deployment.",
      tags: ["E-commerce", "Frontend", "Backend", "Logo Design", "Brand Direction"],
    },
    {
      label: "P.04",
      subtitle: "Olive export company",
      description:
        "We transformed Al Baraka Olives from an outdated website into a cleaner, more premium export-brand experience through full visual redesign, frontend development, photography direction, and cPanel deployment.",
      tags: ["Website Redesign", "Frontend", "Export Brand", "Photography", "cPanel Deployment"],
    },
  ],
};

const ar: typeof en = {
  progress: "04 / 06",
  headingLine1: "أعمال مختارة صيغت",
  headingLine2: "من الاستراتيجية إلى الإطلاق.",
  description:
    "نظرة أقرب على المواقع والأنظمة الرقمية التي صممناها وطورناها وحسّناها وأطلقناها عبر علامات تصدير ومنصات تجارة إلكترونية وتجارب موجهة للأعمال.",
  viewProject: "عرض المشروع",
  openLiveWebsite: "فتح الموقع المباشر",
  openLiveWebsiteAriaLabel: (name: string) => `فتح موقع ${name} المباشر في علامة تبويب جديدة`,
  websitePreviewTitle: (name: string) => `معاينة موقع ${name}`,
  projects: [
    {
      label: "P.01",
      subtitle: "شركة تصدير زراعي",
      description:
        "أعدنا بناء الحضور الرقمي لشركة Houd El Nile من موقع ووردبريس قديم إلى تجربة فاخرة متعددة اللغات مبنية على Next.js، تعكس بشكل أفضل مزارع الشركة ومصانعها وأعمال التصدير وجودة منتجاتها.",
      tags: ["إعادة تصميم الموقع", "Next.js", "تصوير فوتوغرافي", "7 لغات", "تحسين محركات البحث والأداء"],
    },
    {
      label: "P.02",
      subtitle: "منصة تجارة إلكترونية لمستلزمات طب الأسنان",
      description:
        "صممنا وطوّرنا X Dental كمنصة تجارة إلكترونية متكاملة للأطباء والعيادات. شمل المشروع تصميم واجهات وتجربة المستخدم، ومسارات المنتجات، وسلة الشراء وإتمام الطلب، وتطوير الواجهة الأمامية والخلفية، وتحرير صور المنتجات.",
      tags: ["تجارة إلكترونية", "تصميم واجهات وتجربة المستخدم", "الواجهة الأمامية", "الواجهة الخلفية", "Photoshop"],
    },
    {
      label: "P.03",
      subtitle: "تجارة إلكترونية لتوزيع المشروبات في السعودية",
      description:
        "أنشأنا منصة تسوق إلكتروني متكاملة لشركة Al Nours، وهي شركة سعودية تملك حقوق توزيع عصائر Domty. شمل المشروع تصميم الشعار وتوجيه ألوان العلامة والتطوير الكامل والنشر.",
      tags: ["تجارة إلكترونية", "الواجهة الأمامية", "الواجهة الخلفية", "تصميم الشعار", "التوجه البصري للعلامة"],
    },
    {
      label: "P.04",
      subtitle: "شركة تصدير زيتون",
      description:
        "حوّلنا Al Baraka Olives من موقع قديم إلى تجربة أكثر نظافة وفخامة لعلامة تصدير، من خلال إعادة تصميم بصري كامل وتطوير الواجهة الأمامية وتوجيه التصوير الفوتوغرافي والنشر عبر cPanel.",
      tags: ["إعادة تصميم الموقع", "الواجهة الأمامية", "علامة تصدير", "تصوير فوتوغرافي", "نشر عبر cPanel"],
    },
  ],
};

export const caseStudyDict: Dict<typeof en> = { en, ar };
