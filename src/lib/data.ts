/* ------------------------------------------------------------------ */
/*  SahyogSetu — prototype mock data (SIH26089)                        */
/*  All data is fictional demo content. No real government/financial   */
/*  systems are connected.                                             */
/* ------------------------------------------------------------------ */

export const DEMO = {
  customerMobile: "9876543210",
  workerMobile: "9876543211",
  otp: "123456",
  adminEmail: "admin@sahyogsetu.demo",
  adminPassword: "coop2026",
} as const;

export const DEMO_WORKER_ID = "w1";

/* ----------------------------- services ---------------------------- */
export type ServiceSlug =
  | "electrical"
  | "plumbing"
  | "cleaning"
  | "carpentry"
  | "painting"
  | "caregiving"
  | "gardening"
  | "appliance-repair";

export interface Service {
  slug: ServiceSlug;
  name: string;
  hi: string;
  desc: string;
  base: number;
  unit: string;
}

export const SERVICES: Service[] = [
  { slug: "electrical", name: "Electrical", hi: "बिजली", desc: "Wiring, fittings, repairs", base: 500, unit: "per visit" },
  { slug: "plumbing", name: "Plumbing", hi: "प्लंबिंग", desc: "Taps, pipes, sanitary work", base: 450, unit: "per visit" },
  { slug: "cleaning", name: "Cleaning", hi: "सफाई", desc: "Home & deep cleaning", base: 350, unit: "per hour" },
  { slug: "carpentry", name: "Carpentry", hi: "बढ़ईगीरी", desc: "Furniture & fittings", base: 550, unit: "per visit" },
  { slug: "painting", name: "Painting", hi: "पेंटिंग", desc: "Rooms, walls, textures", base: 480, unit: "per room" },
  { slug: "caregiving", name: "Caregiving", hi: "देखभाल", desc: "Elder & patient care", base: 600, unit: "per day" },
  { slug: "gardening", name: "Gardening", hi: "बागवानी", desc: "Lawns, plants, upkeep", base: 300, unit: "per visit" },
  { slug: "appliance-repair", name: "Appliance Repair", hi: "अप्लायंस मरम्मत", desc: "AC, fridge, washing machine", base: 420, unit: "per visit" },
];

/* ----------------------------- workers ----------------------------- */
export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export interface Certificate {
  name: string;
  issuer: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  skill: string;
  skillSlug: ServiceSlug;
  rating: number;
  reviews: number;
  distance: number;
  experience: number;
  price: number;
  photo?: string;
  initials: string;
  color: string; // tailwind gradient classes for initial avatar
  availableToday: boolean;
  society: string;
  societyShort: string;
  membershipId: string;
  joined: string;
  area: string;
  city: string;
  languages: string[];
  skills: string[];
  certificates: Certificate[];
  about: string;
  reviewsList: Review[];
  completionRate: number;
  jobsDone: number;
}

const baseReviews = (a: Review, b: Review, c: Review): Review[] => [a, b, c];

export const WORKERS: WorkerProfile[] = [
  {
    id: "w1",
    name: "Ramesh Kumar",
    skill: "Electrician",
    skillSlug: "electrical",
    rating: 4.9,
    reviews: 128,
    distance: 1.2,
    experience: 7,
    price: 500,
    photo: "/avatars/ramesh.jpg",
    initials: "RK",
    color: "from-forest-500 to-forest-700",
    availableToday: true,
    society: "Chandigarh Shramik Labour Cooperative Society",
    societyShort: "Chandigarh Shramik LCS",
    membershipId: "CSLCS-2017-0412",
    joined: "March 2017",
    area: "Sector 17",
    city: "Chandigarh",
    languages: ["Hindi", "Punjabi", "English"],
    skills: ["Electrical Installation", "Home Wiring", "Appliance Repair", "Safety Certified"],
    certificates: [
      { name: "ITI — Electrician Trade", issuer: "Govt. ITI Chandigarh" },
      { name: "Electrical Safety Certificate", issuer: "NSDC" },
      { name: "Home Wiring (Advanced)", issuer: "Skill India" },
    ],
    about:
      "ITI-trained electrician serving Chandigarh for 7 years. Specialises in home wiring, switchboard repair and appliance installation. Proud member of the Chandigarh Shramik Labour Cooperative since 2017.",
    reviewsList: baseReviews(
      { name: "Anita Verma", rating: 5, date: "2 Jan 2026", text: "Ramesh ji fixed our wiring fault in under an hour. Very professional, explained everything, and the pricing was completely transparent." },
      { name: "Harpreet Singh", rating: 5, date: "18 Dec 2025", text: "Installed three fans and a new MCB board. On time, tidy work, and carried all safety gear. Highly recommended." },
      { name: "Neha Gupta", rating: 4, date: "30 Nov 2025", text: "Good repair work on our geyser line. Arrived 10 minutes late but finished neatly and charged exactly the quoted price." }
    ),
    completionRate: 98,
    jobsDone: 412,
  },
  {
    id: "w2",
    name: "Sunita Devi",
    skill: "Cleaner",
    skillSlug: "cleaning",
    rating: 4.8,
    reviews: 96,
    distance: 0.8,
    experience: 5,
    price: 350,
    photo: "/avatars/sunita.jpg",
    initials: "SD",
    color: "from-leaf-400 to-forest-600",
    availableToday: true,
    society: "Chandigarh Shramik Labour Cooperative Society",
    societyShort: "Chandigarh Shramik LCS",
    membershipId: "CSLCS-2019-0874",
    joined: "June 2019",
    area: "Sector 22",
    city: "Chandigarh",
    languages: ["Hindi"],
    skills: ["Deep Cleaning", "Kitchen Cleaning", "Bathroom Sanitisation"],
    certificates: [{ name: "Housekeeping Professional", issuer: "NSDC" }],
    about: "Specialist in deep home cleaning with 5 years of experience across Chandigarh homes and offices.",
    reviewsList: baseReviews(
      { name: "Ritu Malhotra", rating: 5, date: "28 Dec 2025", text: "Sunita ji did a full deep clean before Diwali. The kitchen looks brand new. Wonderful work ethic." },
      { name: "Ajay Kapoor", rating: 5, date: "9 Dec 2025", text: "Punctual, thorough and very polite. Booking again next month." },
      { name: "Simran Kaur", rating: 4, date: "15 Nov 2025", text: "Very good bathroom cleaning. Would book again." }
    ),
    completionRate: 97,
    jobsDone: 289,
  },
  {
    id: "w3",
    name: "Amit Singh",
    skill: "Plumber",
    skillSlug: "plumbing",
    rating: 4.7,
    reviews: 112,
    distance: 2.0,
    experience: 9,
    price: 450,
    photo: "/avatars/amit.jpg",
    initials: "AS",
    color: "from-azure-500 to-azure-700",
    availableToday: true,
    society: "Gorakhpur Labour Cooperative Society",
    societyShort: "Gorakhpur Labour CS",
    membershipId: "GLCS-2016-0228",
    joined: "January 2016",
    area: "Sector 35",
    city: "Chandigarh",
    languages: ["Hindi", "English"],
    skills: ["Pipe Fitting", "Sanitary Installation", "Leakage Repair"],
    certificates: [{ name: "Plumbing — General", issuer: "Govt. ITI Gorakhpur" }],
    about: "9 years of plumbing experience — from new bathroom fittings to emergency leak repairs.",
    reviewsList: baseReviews(
      { name: "Mohit Bansal", rating: 5, date: "21 Dec 2025", text: "Fixed a hidden pipe leak two other plumbers couldn't find. Excellent diagnosis." },
      { name: "Pallavi Rao", rating: 4, date: "2 Dec 2025", text: "New mixer tap installed neatly. Good and quick." },
      { name: "Deepak Saini", rating: 5, date: "12 Nov 2025", text: "Very honest about what needed replacement and what didn't. Fair price." }
    ),
    completionRate: 96,
    jobsDone: 355,
  },
  {
    id: "w4",
    name: "Pooja Sharma",
    skill: "Caregiver",
    skillSlug: "caregiving",
    rating: 4.9,
    reviews: 74,
    distance: 1.5,
    experience: 4,
    price: 600,
    photo: "/avatars/pooja.jpg",
    initials: "PS",
    color: "from-violet-400 to-violet-600",
    availableToday: true,
    society: "Lucknow Majdoor Sahkari Samiti",
    societyShort: "Lucknow Majdoor SS",
    membershipId: "LMSS-2021-0520",
    joined: "August 2021",
    area: "Sector 8",
    city: "Chandigarh",
    languages: ["Hindi", "English"],
    skills: ["Elder Care", "Patient Attendant", "First Aid"],
    certificates: [
      { name: "Geriatric Care Aide", issuer: "NSDC" },
      { name: "First Aid & CPR", issuer: "St. John Ambulance" },
    ],
    about: "Certified caregiver for elders and recovering patients. Patient, gentle and dependable.",
    reviewsList: baseReviews(
      { name: "Vandana Joshi", rating: 5, date: "30 Dec 2025", text: "Pooja cared for my mother for two weeks post-surgery. Kind, attentive and completely trustworthy." },
      { name: "Rakesh Bedi", rating: 5, date: "11 Dec 2025", text: "Very dependable day-care for my father. Keeps us informed with updates." },
      { name: "Meenakshi Iyer", rating: 5, date: "22 Nov 2025", text: "Warm and professional. Highly recommend." }
    ),
    completionRate: 99,
    jobsDone: 168,
  },
  {
    id: "w5",
    name: "Vikram Das",
    skill: "Carpenter",
    skillSlug: "carpentry",
    rating: 4.8,
    reviews: 143,
    distance: 3.1,
    experience: 12,
    price: 550,
    photo: "/avatars/vikram.jpg",
    initials: "VD",
    color: "from-amber-500 to-amber-700",
    availableToday: false,
    society: "Mohali Workers Cooperative Federation",
    societyShort: "Mohali Workers CF",
    membershipId: "MWCF-2013-0091",
    joined: "February 2013",
    area: "Phase 7, Mohali",
    city: "Mohali",
    languages: ["Hindi", "Punjabi"],
    skills: ["Furniture Repair", "Modular Fittings", "Door & Window Work"],
    certificates: [{ name: "Carpentry Trade Certificate", issuer: "Govt. ITI Mohali" }],
    about: "Master carpenter with 12 years of experience in furniture and modular woodwork.",
    reviewsList: baseReviews(
      { name: "Gurpreet Gill", rating: 5, date: "24 Dec 2025", text: "Repaired our dining set and two wardrobes beautifully. Old-school craftsmanship." },
      { name: "Alka Sharma", rating: 5, date: "5 Dec 2025", text: "Kitchen cabinet hinges replaced perfectly. Fair and transparent pricing." },
      { name: "Nikhil Arora", rating: 4, date: "18 Nov 2025", text: "Solid work on a custom bookshelf. Took a little longer than estimated but quality is superb." }
    ),
    completionRate: 95,
    jobsDone: 431,
  },
  {
    id: "w6",
    name: "Meena Kumari",
    skill: "Painter",
    skillSlug: "painting",
    rating: 4.6,
    reviews: 58,
    distance: 2.4,
    experience: 6,
    price: 480,
    initials: "MK",
    color: "from-fuchsia-400 to-fuchsia-600",
    availableToday: true,
    society: "Chandigarh Shramik Labour Cooperative Society",
    societyShort: "Chandigarh Shramik LCS",
    membershipId: "CSLCS-2020-1103",
    joined: "October 2020",
    area: "Sector 45",
    city: "Chandigarh",
    languages: ["Hindi"],
    skills: ["Interior Painting", "Texture Finishes", "Waterproof Coating"],
    certificates: [{ name: "Painter & Decorator", issuer: "Skill India" }],
    about: "Interior and exterior painting specialist with a keen eye for finish and colour.",
    reviewsList: baseReviews(
      { name: "Sahil Trehan", rating: 5, date: "19 Dec 2025", text: "Two rooms repainted in a day and a half. Clean lines, no mess left behind." },
      { name: "Farah Khan", rating: 4, date: "28 Nov 2025", text: "Good texture work in the living room." },
      { name: "Rohit Puri", rating: 4, date: "9 Nov 2025", text: "Neat and punctual. Pleased with the result." }
    ),
    completionRate: 94,
    jobsDone: 197,
  },
  {
    id: "w7",
    name: "Suresh Yadav",
    skill: "Gardener",
    skillSlug: "gardening",
    rating: 4.7,
    reviews: 61,
    distance: 1.9,
    experience: 8,
    price: 300,
    initials: "SY",
    color: "from-emerald-400 to-emerald-600",
    availableToday: true,
    society: "Chandigarh Shramik Labour Cooperative Society",
    societyShort: "Chandigarh Shramik LCS",
    membershipId: "CSLCS-2018-0667",
    joined: "April 2018",
    area: "Sector 16",
    city: "Chandigarh",
    languages: ["Hindi"],
    skills: ["Lawn Care", "Plant Health", "Terrace Gardens"],
    certificates: [{ name: "Horticulture Basics", issuer: "CCSHAU" }],
    about: "Keeps Chandigarh's gardens green — lawns, hedges and terrace gardens.",
    reviewsList: baseReviews(
      { name: "Lt. Col. Raina", rating: 5, date: "26 Dec 2025", text: "Our lawn has never looked better. Suresh comes on schedule every week." },
      { name: "Bindu Nair", rating: 4, date: "7 Dec 2025", text: "Terrace garden set up nicely with good plant choices." },
      { name: "Vivek Anand", rating: 5, date: "14 Nov 2025", text: "Knowledgeable and hardworking." }
    ),
    completionRate: 96,
    jobsDone: 264,
  },
  {
    id: "w8",
    name: "Imran Khan",
    skill: "Appliance Repair",
    skillSlug: "appliance-repair",
    rating: 4.8,
    reviews: 89,
    distance: 2.7,
    experience: 10,
    price: 420,
    initials: "IK",
    color: "from-sky-400 to-sky-600",
    availableToday: true,
    society: "Lucknow Majdoor Sahkari Samiti",
    societyShort: "Lucknow Majdoor SS",
    membershipId: "LMSS-2015-0345",
    joined: "May 2015",
    area: "Sector 40",
    city: "Chandigarh",
    languages: ["Hindi", "English"],
    skills: ["AC Service", "Refrigerator Repair", "Washing Machine Repair"],
    certificates: [{ name: "Home Appliance Technician", issuer: "NSDC" }],
    about: "Certified appliance technician for ACs, refrigerators and washing machines.",
    reviewsList: baseReviews(
      { name: "Kunal Mehta", rating: 5, date: "29 Dec 2025", text: "AC serviced before summer rush. Quick and professional with genuine spares." },
      { name: "Shalini Das", rating: 5, date: "13 Dec 2025", text: "Fridge cooling issue fixed the same day. Honest billing." },
      { name: "Arjun Nanda", rating: 4, date: "1 Dec 2025", text: "Washing machine drum repair done well." }
    ),
    completionRate: 97,
    jobsDone: 342,
  },
  {
    id: "w9",
    name: "Kavita Joshi",
    skill: "Cleaner",
    skillSlug: "cleaning",
    rating: 4.5,
    reviews: 47,
    distance: 1.1,
    experience: 3,
    price: 320,
    initials: "KJ",
    color: "from-rose-400 to-rose-600",
    availableToday: true,
    society: "Mohali Workers Cooperative Federation",
    societyShort: "Mohali Workers CF",
    membershipId: "MWCF-2022-0410",
    joined: "July 2022",
    area: "Sector 21",
    city: "Chandigarh",
    languages: ["Hindi"],
    skills: ["Home Cleaning", "Sofa & Carpet", "Window Cleaning"],
    certificates: [{ name: "Domestic Housekeeping", issuer: "Skill India" }],
    about: "Detail-oriented home cleaning professional serving central Chandigarh.",
    reviewsList: baseReviews(
      { name: "Preeti Chawla", rating: 4, date: "20 Dec 2025", text: "Good sofa shampooing. Took her time to do it properly." },
      { name: "Manav Sethi", rating: 5, date: "4 Dec 2025", text: "Sparkling windows and balconies. Great value." },
      { name: "Jyoti Rani", rating: 4, date: "11 Nov 2025", text: "Reliable weekly cleaning." }
    ),
    completionRate: 93,
    jobsDone: 118,
  },
  {
    id: "w10",
    name: "Deepak Rawat",
    skill: "Electrician",
    skillSlug: "electrical",
    rating: 4.6,
    reviews: 66,
    distance: 2.2,
    experience: 5,
    price: 460,
    initials: "DR",
    color: "from-orange-400 to-orange-600",
    availableToday: true,
    society: "Chandigarh Shramik Labour Cooperative Society",
    societyShort: "Chandigarh Shramik LCS",
    membershipId: "CSLCS-2021-0832",
    joined: "September 2021",
    area: "Sector 27",
    city: "Chandigarh",
    languages: ["Hindi"],
    skills: ["Home Wiring", "Inverter Setup", "Lighting"],
    certificates: [{ name: "ITI — Electrician Trade", issuer: "Govt. ITI Chandigarh" }],
    about: "Electrician specialising in lighting design and inverter installations.",
    reviewsList: baseReviews(
      { name: "Tara Bhatt", rating: 5, date: "22 Dec 2025", text: "New inverter installed and load balanced perfectly." },
      { name: "Rahul Dev", rating: 4, date: "6 Dec 2025", text: "Good lighting work in the study room." },
      { name: "Ishita Bose", rating: 4, date: "19 Nov 2025", text: "Fixed flickering lights quickly." }
    ),
    completionRate: 95,
    jobsDone: 205,
  },
  {
    id: "w11",
    name: "Farida Bano",
    skill: "Caregiver",
    skillSlug: "caregiving",
    rating: 4.9,
    reviews: 52,
    distance: 3.4,
    experience: 7,
    price: 580,
    initials: "FB",
    color: "from-teal-400 to-teal-600",
    availableToday: false,
    society: "Gorakhpur Labour Cooperative Society",
    societyShort: "Gorakhpur Labour CS",
    membershipId: "GLCS-2018-0719",
    joined: "November 2018",
    area: "Sector 11",
    city: "Chandigarh",
    languages: ["Hindi", "Urdu"],
    skills: ["Elder Companionship", "Post-operative Care", "Medication Reminders"],
    certificates: [{ name: "General Duty Assistant", issuer: "NSDC" }],
    about: "Experienced caregiver known for patient, compassionate elder care.",
    reviewsList: baseReviews(
      { name: "Samir Wadhwa", rating: 5, date: "16 Dec 2025", text: "Farida ji looked after our grandfather with genuine warmth. We are grateful." },
      { name: "Lata Menon", rating: 5, date: "30 Nov 2025", text: "Extremely dependable and caring." },
      { name: "Zeeshan Ali", rating: 4, date: "8 Nov 2025", text: "Great support during my mother's recovery." }
    ),
    completionRate: 98,
    jobsDone: 176,
  },
  {
    id: "w12",
    name: "Manoj Tiwari",
    skill: "Plumber",
    skillSlug: "plumbing",
    rating: 4.4,
    reviews: 39,
    distance: 2.9,
    experience: 4,
    price: 400,
    initials: "MT",
    color: "from-slate-400 to-slate-600",
    availableToday: true,
    society: "Lucknow Majdoor Sahkari Samiti",
    societyShort: "Lucknow Majdoor SS",
    membershipId: "LMSS-2021-0988",
    joined: "March 2021",
    area: "Sector 48",
    city: "Chandigarh",
    languages: ["Hindi"],
    skills: ["Tap & Fitting Repair", "Bathroom Fittings", "Water Tank Cleaning"],
    certificates: [{ name: "Plumbing Assistant", issuer: "Skill India" }],
    about: "Reliable plumber for everyday repairs and bathroom fittings.",
    reviewsList: baseReviews(
      { name: "Kamlesh Rana", rating: 4, date: "15 Dec 2025", text: "Tap repairs done same day. Good service." },
      { name: "Devika Shah", rating: 5, date: "27 Nov 2025", text: "Polite and quick. Fixed our flush tank." },
      { name: "Sanjay Garg", rating: 4, date: "5 Nov 2025", text: "Water tank cleaning was thorough." }
    ),
    completionRate: 92,
    jobsDone: 124,
  },
];

/* ----------------------------- bookings ---------------------------- */
export type BookingStatus = "requested" | "accepted" | "started" | "completed" | "cancelled" | "scheduled";

export interface Booking {
  id: string;
  customerId: string; // "c-demo" for the demo customer, or names for worker-side seeds
  customerName: string;
  workerId: string;
  workerName: string;
  serviceSlug: ServiceSlug;
  service: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
  distanceKm?: number;
  amount: number;
  status: BookingStatus;
  paymentMethod?: string;
  createdAt: string;
  rating?: number;
  reviewText?: string;
}

export const SEED_BOOKINGS: Booking[] = [
  // --- demo customer's history ---
  {
    id: "2301", customerId: "c-demo", customerName: "Rahul Sharma", workerId: "w2", workerName: "Sunita Devi",
    serviceSlug: "cleaning", service: "Cleaning", date: "Sat, 4 Jan 2026", time: "10:30 AM",
    address: "H.No. 1247, Sector 17, Chandigarh", amount: 350, status: "completed",
    paymentMethod: "UPI", createdAt: "3 Jan 2026", rating: 5, reviewText: "Excellent deep clean before the weekend.",
  },
  {
    id: "2315", customerId: "c-demo", customerName: "Rahul Sharma", workerId: "w7", workerName: "Suresh Yadav",
    serviceSlug: "gardening", service: "Gardening", date: "Tomorrow", time: "9:00 AM",
    address: "H.No. 1247, Sector 17, Chandigarh", amount: 300, status: "scheduled",
    paymentMethod: "UPI", createdAt: "7 Jan 2026",
  },
  // --- demo worker's queue & history ---
  {
    id: "2321", customerId: "c-x1", customerName: "Anita Verma", workerId: DEMO_WORKER_ID, workerName: "Ramesh Kumar",
    serviceSlug: "electrical", service: "Electrical Repair", date: "Today", time: "4:30 PM",
    address: "H.No. 822, Sector 17, Chandigarh", notes: "Switchboard sparking in the kitchen.", distanceKm: 2.4,
    amount: 500, status: "requested", createdAt: "This morning",
  },
  {
    id: "2322", customerId: "c-x2", customerName: "Rohit Malhotra", workerId: DEMO_WORKER_ID, workerName: "Ramesh Kumar",
    serviceSlug: "electrical", service: "Fan Installation", date: "Today", time: "6:00 PM",
    address: "Flat 304, Sector 22, Chandigarh", notes: "Two ceiling fans, boxes available.", distanceKm: 1.6,
    amount: 400, status: "requested", createdAt: "This morning",
  },
  {
    id: "2318", customerId: "c-x3", customerName: "Kavita Singh", workerId: DEMO_WORKER_ID, workerName: "Ramesh Kumar",
    serviceSlug: "electrical", service: "MCB Board Replacement", date: "Tomorrow", time: "10:30 AM",
    address: "H.No. 551, Sector 19, Chandigarh", distanceKm: 3.0,
    amount: 450, status: "accepted", createdAt: "Yesterday",
  },
  {
    id: "2309", customerId: "c-x4", customerName: "Harpreet Singh", workerId: DEMO_WORKER_ID, workerName: "Ramesh Kumar",
    serviceSlug: "electrical", service: "Home Wiring Check", date: "Mon, 6 Jan 2026", time: "11:00 AM",
    address: "Sector 15, Chandigarh", amount: 500, status: "completed", paymentMethod: "UPI", createdAt: "5 Jan 2026", rating: 5,
  },
  {
    id: "2304", customerId: "c-x5", customerName: "Neha Gupta", workerId: DEMO_WORKER_ID, workerName: "Ramesh Kumar",
    serviceSlug: "appliance-repair", service: "Geyser Line Repair", date: "Sun, 5 Jan 2026", time: "3:30 PM",
    address: "Sector 20, Chandigarh", amount: 450, status: "completed", paymentMethod: "Card", createdAt: "4 Jan 2026", rating: 4,
  },
  {
    id: "2298", customerId: "c-x6", customerName: "Ajay Kapoor", workerId: DEMO_WORKER_ID, workerName: "Ramesh Kumar",
    serviceSlug: "electrical", service: "Inverter Setup", date: "Sat, 4 Jan 2026", time: "5:00 PM",
    address: "Sector 33, Chandigarh", amount: 500, status: "completed", paymentMethod: "UPI", createdAt: "3 Jan 2026", rating: 5,
  },
];

/* --------------------------- notifications ------------------------- */
export interface AppNotification {
  id: string;
  role: "customer" | "worker";
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "booking" | "payment" | "verify" | "info";
}

export const SEED_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", role: "customer", title: "Gardening visit scheduled", body: "Suresh Yadav will arrive tomorrow at 9:00 AM.", time: "2h ago", read: false, kind: "booking" },
  { id: "n2", role: "customer", title: "Payment successful", body: "₹350 paid to Sunita Devi via UPI. Worker received ₹298.", time: "3 days ago", read: true, kind: "payment" },
  { id: "n3", role: "customer", title: "Rate your experience", body: "How was the cleaning service by Sunita Devi?", time: "3 days ago", read: false, kind: "info" },
  { id: "n4", role: "worker", title: "New job request", body: "Anita Verma needs electrical repair in Sector 17 · Today 4:30 PM.", time: "25 min ago", read: false, kind: "booking" },
  { id: "n5", role: "worker", title: "₹425 credited", body: "Payment for job SS-2309 settled to your UPI.", time: "2 days ago", read: true, kind: "payment" },
  { id: "n6", role: "worker", title: "Certificate approved", body: "Your Electrical Safety Certificate was verified by the cooperative.", time: "5 days ago", read: true, kind: "verify" },
];

/* ------------------------------ admin ------------------------------ */
export const ADMIN_KPIS = {
  activeWorkers: 1248,
  bookingsToday: 186,
  workerEarningsToday: 84500,
  pendingVerification: 32,
};

export const BOOKING_TREND = [
  { day: "Mon", bookings: 142 },
  { day: "Tue", bookings: 158 },
  { day: "Wed", bookings: 149 },
  { day: "Thu", bookings: 171 },
  { day: "Fri", bookings: 186 },
  { day: "Sat", bookings: 214 },
  { day: "Sun", bookings: 198 },
];

export const SERVICE_DEMAND = [
  { service: "Electrical", bookings: 392 },
  { service: "Plumbing", bookings: 318 },
  { service: "Cleaning", bookings: 356 },
  { service: "Carpentry", bookings: 187 },
  { service: "Painting", bookings: 154 },
  { service: "Caregiving", bookings: 121 },
];

export const WORKER_DISTRIBUTION = [
  { area: "Sector 17–22", workers: 286 },
  { area: "Sector 34–40", workers: 238 },
  { area: "Mohali", workers: 312 },
  { area: "Panchkula", workers: 196 },
  { area: "Manimajra", workers: 216 },
];

export const DEMAND_FORECAST = [
  { service: "Electrical", change: 24, note: "Post-winter geyser & heater faults expected", tomorrow: 64 },
  { service: "Plumbing", change: 15, note: "Pipe-burst calls usually rise in cold weeks", tomorrow: 52 },
  { service: "Cleaning", change: 0, note: "Stable weekend demand", tomorrow: 47 },
  { service: "Appliance Repair", change: 18, note: "Seasonal AC/heater servicing window", tomorrow: 31 },
];

export const DEMAND_BY_TIME = [
  { slot: "6–9 AM", requests: 22 },
  { slot: "9–12 PM", requests: 58 },
  { slot: "12–3 PM", requests: 44 },
  { slot: "3–6 PM", requests: 71 },
  { slot: "6–9 PM", requests: 63 },
];

export const DEMAND_BY_AREA = [
  { area: "Sector 17", requests: 88 },
  { area: "Sector 22", requests: 74 },
  { area: "Mohali Ph-7", requests: 69 },
  { area: "Sector 35", requests: 52 },
  { area: "Panchkula", requests: 41 },
];

export const COOPERATIVES = [
  { name: "Chandigarh Shramik Labour Cooperative Society", short: "CSLCS", regNo: "REG/CHD/2009/118", members: 418, area: "Chandigarh (Central)", rating: 4.8, contact: "office@cslcs.coop" },
  { name: "Mohali Workers Cooperative Federation", short: "MWCF", regNo: "REG/PUN/2011/074", members: 352, area: "Mohali & Phase sectors", rating: 4.7, contact: "help@mwcf.coop" },
  { name: "Lucknow Majdoor Sahkari Samiti", short: "LMSS", regNo: "REG/UP/2008/341", members: 265, area: "Lucknow + NCR partners", rating: 4.6, contact: "contact@lmss.coop" },
  { name: "Gorakhpur Labour Cooperative Society", short: "GLCS", regNo: "REG/UP/2010/209", members: 213, area: "Gorakhpur region", rating: 4.6, contact: "admin@glcs.coop" },
];

export interface AdminWorkerRow {
  id: string;
  name: string;
  skill: string;
  society: string;
  idStatus: "verified" | "pending";
  certStatus: "verified" | "pending";
  applied: string;
}

export const VERIFICATION_QUEUE: AdminWorkerRow[] = [
  { id: "w1", name: "Ramesh Kumar", skill: "Electrician", society: "Chandigarh Shramik LCS", idStatus: "verified", certStatus: "verified", applied: "8 Jan 2026" },
  { id: "w3", name: "Amit Singh", skill: "Plumber", society: "Gorakhpur Labour CS", idStatus: "verified", certStatus: "pending", applied: "8 Jan 2026" },
  { id: "w6", name: "Meena Kumari", skill: "Painter", society: "Chandigarh Shramik LCS", idStatus: "pending", certStatus: "pending", applied: "7 Jan 2026" },
  { id: "w9", name: "Kavita Joshi", skill: "Cleaner", society: "Mohali Workers CF", idStatus: "verified", certStatus: "verified", applied: "7 Jan 2026" },
  { id: "w12", name: "Manoj Tiwari", skill: "Plumber", society: "Lucknow Majdoor SS", idStatus: "pending", certStatus: "verified", applied: "6 Jan 2026" },
];

export const SETTLEMENTS = [
  { id: "STL-8841", society: "Chandigarh Shramik LCS", period: "1–7 Jan 2026", jobs: 312, gross: 168400, welfare: 25260, workers: 143140, status: "settled" },
  { id: "STL-8840", society: "Mohali Workers CF", period: "1–7 Jan 2026", jobs: 264, gross: 139200, welfare: 20880, workers: 118320, status: "settled" },
  { id: "STL-8839", society: "Lucknow Majdoor SS", period: "1–7 Jan 2026", jobs: 201, gross: 104600, welfare: 15690, workers: 88910, status: "processing" },
  { id: "STL-8838", society: "Gorakhpur Labour CS", period: "1–7 Jan 2026", jobs: 158, gross: 82300, welfare: 12345, workers: 69955, status: "processing" },
];

/* ------------------------- worker earnings ------------------------- */
export const WEEKLY_EARNINGS = [
  { day: "Mon", amount: 900 },
  { day: "Tue", amount: 1275 },
  { day: "Wed", amount: 850 },
  { day: "Thu", amount: 1100 },
  { day: "Fri", amount: 1450 },
  { day: "Sat", amount: 1600 },
  { day: "Sun", amount: 1275 },
];

export const WELFARE = {
  insurance: { status: "Active", provider: "Sahkari Suraksha Bima (demo)", cover: "₹2,00,000 accident cover", premium: "Paid via welfare fund" },
  contribution: 1250,
  courses: [
    { name: "Advanced Home Wiring", provider: "Skill India", status: "Completed", year: "2025" },
    { name: "Customer Communication", provider: "Cooperative Academy", status: "Completed", year: "2025" },
    { name: "Smart Meter Installation", provider: "NSDC", status: "In progress", year: "2026" },
  ],
  benefits: [
    "Accident insurance funded by the 15% welfare pool",
    "Free skill-upgradation courses every quarter",
    "Annual health check-up camp",
    "Emergency loan facility via the cooperative",
    "Festival advance & savings scheme",
  ],
};
