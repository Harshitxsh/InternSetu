import { StudentPersona, PMInternship, SkillQuest, ProcessingStage } from '../types';

export const INITIAL_PERSONAS: StudentPersona[] = [
  {
    id: 'persona-1',
    name: 'Priya Sharma',
    tagline: 'Tier-3 Rural Engineering | 1st Gen Graduate | AI Aspirant',
    avatarSeed: 'Priya',
    initialEligibilityScore: 76,
    profile: {
      id: 'STU-2026-8819',
      fullName: 'Priya Sharma',
      email: 'priya.sharma@ruralpoly.ac.in',
      phone: '+91 98765 43210',
      gender: 'Female',
      socialCategory: 'OBC',
      annualIncome: 'Below ₹2.5 Lakhs/year (High Affirmative Weightage)',
      state: 'Madhya Pradesh',
      district: 'Vidisha (Aspirational District)',
      isAspirationalDistrict: true,
      isFirstGeneration: true,
      instituteName: 'Govt. Polytechnic & Engineering College, Vidisha',
      instituteType: 'Rural / Tier-3 Govt College (Priority +15%)',
      degree: 'B.Tech in Computer Science',
      branch: 'Computer Science & Engineering',
      cgpa: 8.42,
      graduationYear: 2026,
      skills: ['Python', 'SQL', 'Data Structures', 'FastAPI Basics', 'Hindi/English Translation'],
      resumeFileName: 'Priya_Sharma_Resume_MCA_PMIntern.pdf',
      resumeFileSize: '1.4 MB',
      resumeExtractSample: 'Academic Project: Smart Irrigation IoT Sensor using Arduino & LoRa. Built Python data collector script with 94% uptime. Active NSS volunteer in rural digital literacy.',
      credibilityIndex: 94,
    }
  },
  {
    id: 'persona-2',
    name: 'Rahul Verma',
    tagline: 'Tier-2 Commerce & Financial Analytics | PM Scheme Aspirant',
    avatarSeed: 'Rahul',
    initialEligibilityScore: 68,
    profile: {
      id: 'STU-2026-4412',
      fullName: 'Rahul Verma',
      email: 'rahul.verma@ststateuniv.edu.in',
      phone: '+91 94123 78901',
      gender: 'Male',
      socialCategory: 'EWS',
      annualIncome: '₹2.5L - ₹5.0 Lakhs/year (Medium Priority)',
      state: 'Uttar Pradesh',
      district: 'Gorakhpur',
      isAspirationalDistrict: false,
      isFirstGeneration: false,
      instituteName: 'Deen Dayal Upadhyaya University, Gorakhpur',
      instituteType: 'Tier-2 State Public University',
      degree: 'B.Com / Financial Analytics',
      branch: 'Commerce & Corporate Accounting',
      cgpa: 7.85,
      graduationYear: 2025,
      skills: ['Advanced Excel', 'Tally Prime', 'Financial Modeling', 'GST Compliance', 'MIS Reporting'],
      resumeFileName: 'Rahul_Verma_Commerce_PMIS.pdf',
      resumeFileSize: '880 KB',
      resumeExtractSample: 'Interned at local cooperative bank: Automated reconciliation sheets reducing monthly closing time by 3 days. Certified in NISM Basic Equity Modules.',
      credibilityIndex: 89,
    }
  },
  {
    id: 'persona-3',
    name: 'Ananya Deshmukh',
    tagline: 'Mechanical & EV Engineering | Green Tech Enthusiast',
    avatarSeed: 'Ananya',
    initialEligibilityScore: 82,
    profile: {
      id: 'STU-2026-7731',
      fullName: 'Ananya Deshmukh',
      email: 'ananya.deshmukh@nagpurgov.edu',
      phone: '+91 98220 11223',
      gender: 'Female',
      socialCategory: 'SC',
      annualIncome: 'Below ₹2.5 Lakhs/year (High Affirmative Weightage)',
      state: 'Maharashtra',
      district: 'Gadchiroli (Aspirational District)',
      isAspirationalDistrict: true,
      isFirstGeneration: true,
      instituteName: 'Government College of Engineering, Chandrapur',
      instituteType: 'Rural / Tier-3 Govt College (Priority +15%)',
      degree: 'B.E. Mechanical Engineering',
      branch: 'Mechanical & Automation',
      cgpa: 8.91,
      graduationYear: 2026,
      skills: ['SolidWorks', 'MATLAB Simulink', 'Thermal Analysis', 'Battery Management Systems', 'PLC Automation'],
      resumeFileName: 'Ananya_Deshmukh_EV_Research.pdf',
      resumeFileSize: '2.1 MB',
      resumeExtractSample: 'Lead Designer for Formula Student Hybrid Chassis. Published research paper on phase change materials in 2-wheeler lithium-ion battery thermal packs.',
      credibilityIndex: 97,
    }
  }
];

export const MOCK_INTERNSHIPS: PMInternship[] = [
  {
    id: 'PMI-2026-001',
    companyName: 'Tata Motors Passenger Vehicles',
    companyCategory: 'Fortune India 500',
    roleTitle: 'EV Telematics & Battery Analytics Intern',
    domain: 'Core Engineering & EV',
    location: 'Pune / Sanand (Hybrid with accommodation allowance)',
    stipendGovt: 5000,
    stipendCompany: 1500,
    matchScore: 92,
    requiredSkills: ['Battery Management Systems', 'Python', 'MATLAB', 'IoT Sensors'],
    affirmativeActionMatch: true,
    openings: 24,
    description: 'Under the PM Internship Scheme, work directly with Tata EV powertrain specialists on real-world battery degradation models and smart battery charging telemetry.',
    locationPreferenceMatch: true,
    mentorAssigned: 'Dr. S. K. Kulkarni (Principal Engineer, EV Powertrains)'
  },
  {
    id: 'PMI-2026-002',
    companyName: 'Larsen & Toubro (L&T Technology Services)',
    companyCategory: 'Fortune India 500',
    roleTitle: 'Industrial IoT & Smart Factory Trainee',
    domain: 'AI & Data Science',
    location: 'Vadodara / Chennai',
    stipendGovt: 5000,
    stipendCompany: 2000,
    matchScore: 88,
    requiredSkills: ['Python', 'SQL', 'LoRa/MQTT Protocols', 'Industrial Automation'],
    affirmativeActionMatch: true,
    openings: 45,
    description: 'Participate in Industry 4.0 digital twin deployments across smart manufacturing units. Hands-on experience in edge computing and sensor integration.',
    locationPreferenceMatch: true,
    mentorAssigned: 'K. Rajasekaran (General Manager, Smart Automation)'
  },
  {
    id: 'PMI-2026-003',
    companyName: 'Infosys Springboard (Govt Enterprise Division)',
    companyCategory: 'Leading Enterprise Partner',
    roleTitle: 'AI-Enabled Public Service Application Developer',
    domain: 'AI & Data Science',
    location: 'Bhopal / Indore / Bangalore (Direct State Quota)',
    stipendGovt: 5000,
    stipendCompany: 1000,
    matchScore: 85,
    requiredSkills: ['Python', 'FastAPI Basics', 'REST APIs', 'SQL Database'],
    affirmativeActionMatch: true,
    openings: 80,
    description: 'Build citizen-scale multilingual digital service pipelines. Mentored by Infosys Enterprise Architects with certification upon completion.',
    locationPreferenceMatch: true,
    mentorAssigned: 'Vandana Nambiar (Senior Delivery Manager)'
  },
  {
    id: 'PMI-2026-004',
    companyName: 'Reliance Industries (Jio Platforms Digital)',
    companyCategory: 'Fortune India 500',
    roleTitle: '5G Edge Compute & AI Infrastructure Intern',
    domain: 'AI & Data Science',
    location: 'Navi Mumbai / Remote Regional Hub',
    stipendGovt: 5000,
    stipendCompany: 2500,
    matchScore: 81,
    requiredSkills: ['Linux System Internals', 'Python', 'Cloud Basics', 'Network Telemetry'],
    affirmativeActionMatch: false,
    openings: 30,
    description: 'Contribute to indigenous 5G telecom stack monitoring, automated anomaly detection, and distributed microservices analytics.',
    locationPreferenceMatch: false,
    mentorAssigned: 'Amol Shrivastava (VP, Core Networks Infrastructure)'
  },
  {
    id: 'PMI-2026-005',
    companyName: 'HDFC Bank Corporate Office',
    companyCategory: 'Top PSU / Navratna',
    roleTitle: 'Financial Inclusion & Rural Credit Analytics Intern',
    domain: 'Finance & Supply Chain',
    location: 'Lucknow / Mumbai',
    stipendGovt: 5000,
    stipendCompany: 1200,
    matchScore: 78,
    requiredSkills: ['Financial Modeling', 'Advanced Excel', 'MIS Reporting', 'SQL'],
    affirmativeActionMatch: true,
    openings: 50,
    description: 'Analyze grassroots credit penetration data, automate regional district branch dashboards, and evaluate credit score modeling for MSMEs.',
    locationPreferenceMatch: true,
    mentorAssigned: 'Preeti Deshpande (Head of Priority Sector Lending)'
  }
];

export const INITIAL_SKILL_QUESTS: SkillQuest[] = [
  {
    id: 'quest-1',
    title: 'Industrial IoT & MQTT Protocol Mastery',
    category: 'Core Engineering',
    icon: 'Cpu',
    duration: '3 Days Sprint (6 hrs total)',
    level: 'Fast Sprint (2 Days)',
    eligibilityBoost: 8,
    description: 'Bridge the critical gap for Smart Manufacturing roles at L&T and Tata Motors. Learn edge data telemetry, payload serialization, and broker integration.',
    syllabus: [
      'MQTT Architecture & QoS levels',
      'Publish-Subscribe edge sensor streams in Python',
      'Handling flaky rural 4G/LoRa connections with local caching',
      'Capstone: Telemetry logger for solar battery banks'
    ],
    sponsorCompany: 'L&T Technology Services',
    isAccepted: false,
    isCompleted: false,
    xpReward: 350,
    badgeName: 'IoT Certified Cadet'
  },
  {
    id: 'quest-2',
    title: 'Enterprise Python & FastAPI Microservices',
    category: 'AI & Data',
    icon: 'Code2',
    duration: '5 Days (12 hrs total)',
    level: 'Essential (5 Days)',
    eligibilityBoost: 11,
    description: 'Accelerate your match for top tech enterprise positions. Build asynchronous, high-throughput backend services with automatic OpenAPI documentation.',
    syllabus: [
      'Pydantic v2 data validation & schemas',
      'Async/await concurrency for enterprise pipelines',
      'JWT Authentication & Role-Based Access Control (RBAC)',
      'Deploying lightweight container on GovCloud sandbox'
    ],
    sponsorCompany: 'Infosys Springboard',
    isAccepted: false,
    isCompleted: false,
    xpReward: 500,
    badgeName: 'FastAPI Architect'
  },
  {
    id: 'quest-3',
    title: 'Automated Financial Reconciliation & PowerBI',
    category: 'Finance & Analytics',
    icon: 'TrendingUp',
    duration: '4 Days (8 hrs total)',
    level: 'Essential (5 Days)',
    eligibilityBoost: 9,
    description: 'Crucial for Banking & PSUs. Master high-volume multi-bank ledger reconciliation, DAX expressions, and interactive interactive fiscal reports.',
    syllabus: [
      'Power Query M-code transformations for legacy CSVs',
      'DAX measures: YoY Growth, Moving Average & Variance',
      'Building Executive KPI Cockpit for District Treasuries',
      'Audit trail verification and GST invoice pairing'
    ],
    sponsorCompany: 'HDFC Bank Corp',
    isAccepted: false,
    isCompleted: false,
    xpReward: 420,
    badgeName: 'Fiscal Analytics Lead'
  },
  {
    id: 'quest-4',
    title: 'Battery Management Systems (BMS) Modeling',
    category: 'Core Engineering',
    icon: 'Zap',
    duration: '7 Days (18 hrs total)',
    level: 'Deep Dive (10 Days)',
    eligibilityBoost: 14,
    description: 'High-demand qualification for India EV Mission. Learn State of Charge (SoC) estimation, thermal runaway prevention, and CAN-bus protocol.',
    syllabus: [
      'Equivalent circuit modeling of LiFePO4 cells',
      'Extended Kalman Filter for SoC & SoH estimation',
      'Cell balancing algorithms (Active vs Passive)',
      'Hardware-in-the-loop (HIL) safety testing simulation'
    ],
    sponsorCompany: 'Tata Motors EV Division',
    isAccepted: false,
    isCompleted: false,
    xpReward: 750,
    badgeName: 'EV Powertrain Pioneer'
  },
  {
    id: 'quest-5',
    title: 'Cloud Native Telemetry & Linux Troubleshooting',
    category: 'Cloud & Systems',
    icon: 'Server',
    duration: '3 Days (7 hrs total)',
    level: 'Fast Sprint (2 Days)',
    eligibilityBoost: 7,
    description: 'Equip yourself for Telecom 5G & Cloud Ops roles at Jio Platforms. Master Linux bash scripting, systemd, and Prometheus metric exporters.',
    syllabus: [
      'Linux process internals, memory profiling, top/htop/strace',
      'Log parsing with ripgrep, awk, and jq pipelines',
      'Setting up Prometheus exporters and alert thresholds',
      'Container orchestration fundamentals on K3s'
    ],
    sponsorCompany: 'Reliance Jio Digital',
    isAccepted: false,
    isCompleted: false,
    xpReward: 380,
    badgeName: 'Cloud Telemetry Specialist'
  },
  {
    id: 'quest-6',
    title: 'Corporate Communication & Public Scheme Ethics',
    category: 'Communication & Soft Skills',
    icon: 'Award',
    duration: '2 Days (4 hrs total)',
    level: 'Fast Sprint (2 Days)',
    eligibilityBoost: 5,
    description: 'Essential professional readiness: workplace accountability, public sector integrity protocols, executive memo writing, and cross-functional team etiquette.',
    syllabus: [
      'Writing concise executive status reports & briefers',
      'Conflict resolution and structured empathetic communication',
      'Ethical data governance and citizen privacy guidelines',
      'Presenting project outcomes to senior enterprise directors'
    ],
    sponsorCompany: 'Ministry of Corporate Affairs',
    isAccepted: false,
    isCompleted: false,
    xpReward: 250,
    badgeName: 'Govt Enterprise Readiness'
  }
];

export const INITIAL_PROCESSING_STAGES: ProcessingStage[] = [
  {
    id: 1,
    name: 'OCR & Semantic Entity Extraction',
    description: 'Extracting academic credentials, projects, certifications, and technical proficiencies from uploaded PDF.',
    techLabel: 'PyMuPDF + LayoutLMv3',
    status: 'waiting',
    progress: 0,
    logs: [
      'Document binary received (1.42 MB)',
      'Parsing multi-column PDF layout structure...',
      'Detected Sections: Education, Technical Stack, Capstone Projects',
      'Extracted 6 validated technical keywords and 1 verified research project'
    ],
    metricLabel: 'OCR Confidence',
    metricValue: '99.4%',
    badge: '100% Text Extracted'
  },
  {
    id: 2,
    name: 'Anti-Fluff & Authenticity Engine',
    description: 'Verifying realism of claims, detecting AI-generated keyword stuffing, and benchmarking project specificity.',
    techLabel: 'Anti-Hallucination Credibility Model',
    status: 'waiting',
    progress: 0,
    logs: [
      'Scanning for generic GPT template syntaxes...',
      'Evaluating project claim specificity against Github/Git commit patterns...',
      'Cross-referencing technical keywords with contextual project descriptions...',
      'Authenticity Verified: Genuine hands-on project artifacts confirmed'
    ],
    metricLabel: 'Credibility Score',
    metricValue: '94 / 100',
    badge: 'Genuine Human Output'
  },
  {
    id: 3,
    name: 'PM Scheme Affirmative Equity Weightage',
    description: 'Applying equity multipliers for Tier-3/Rural colleges, First-Generation learners, and Aspirational Districts.',
    techLabel: 'MCA Affirmative Allocation Rule-Engine v2.4',
    status: 'waiting',
    progress: 0,
    logs: [
      'Validating Institute Tier: Vidisha Polytechnic (Tier-3 Rural Govt College) -> +15% Weightage applied',
      'Validating Social Equity: OBC + Family Income < ₹2.5 LPA -> Maximum Affirmative Points',
      'Validating Aspirational District: Vidisha, MP -> Regional Diversity Index Bonus applied',
      'First-Generation College Student validation -> Equity Multiplier active'
    ],
    metricLabel: 'Affirmative Multiplier',
    metricValue: '+18.5 Pts',
    badge: 'High Equity Priority'
  },
  {
    id: 4,
    name: 'Dense Embeddings Role Matching (500+ Top Corporates)',
    description: 'Comparing multidimensional candidate vectors against live job descriptions of PM Internship Scheme partners.',
    techLabel: 'Vector Cosine Similarity (dim=1536)',
    status: 'waiting',
    progress: 0,
    logs: [
      'Generated 1536-dimensional candidate competency embedding',
      'Querying Vector DB against 12,400+ PM Scheme enterprise vacancies...',
      'High-affinity clusters identified: IoT Hardware (92%), Backend Systems (85%), Smart Manufacturing (88%)',
      'Calculated geographic distance penalty & relocation viability index'
    ],
    metricLabel: 'Top Match Fit',
    metricValue: '92% Vector Match',
    badge: '5 Top Matches Found'
  },
  {
    id: 5,
    name: 'Composite 100-Point Allocation & Skill Gap Mapping',
    description: 'Synthesizing final eligibility score, explainability breakdown, and personalized gamified Skill Quests.',
    techLabel: 'Explainable AI Composite Scorer',
    status: 'waiting',
    progress: 0,
    logs: [
      'Aggregating Demographics (23/25) + Academic (21/25) + Skills (18/25) + Authenticity (24/25)',
      'Overall Composite Allocation Index: 76/100 (Tier 1 Priority Pool)',
      'Identified high-leverage skill gaps: MQTT Protocols (+8%), FastAPI Microservices (+11%)',
      'Compiled dynamic Gamified Quests roadmap'
    ],
    metricLabel: 'Calculated Score',
    metricValue: '76 / 100',
    badge: 'Ready for Allocation'
  }
];
