import { ScamPatternItem } from '../types';

export const SCAM_PATTERNS: ScamPatternItem[] = [
  {
    id: 'fake-check',
    title: 'Fake Check & Equipment Purchase Scam',
    category: 'Payment Scams',
    riskLevel: 'Extreme',
    summary: 'The client sends a fraudulent check (or mobile deposit photo) for "home office equipment" and asks you to deposit it and transfer funds to their "certified vendor."',
    howItWorks: [
      'Client hires you immediately without an interview or contract negotiation.',
      'Sends a check (often $2,000–$5,000) meant for buying laptops/software from "their supplier."',
      'Asks you to deposit the check into your bank account and wire/Zelle the money to the vendor right away.',
      'A few days later, your bank discovers the check was stolen/fake and reverses the entire deposit, leaving you liable for the money sent.'
    ],
    realWorldExample: '"We will email you a check for $3,500 to purchase your home office setup from our authorized IT vendor. Deposit it via mobile app and send $3,000 via Zelle immediately so they ship your equipment."',
    redFlags: [
      'Sending a check before any work starts',
      'Insisting you use Zelle, Wire, or gift cards to buy equipment',
      'Overpaying and asking for funds sent back',
      'Urgency to transfer money before the check clears'
    ],
    howToProtect: [
      'Never accept a check to purchase equipment for a job.',
      'Legitimate employers supply hardware directly or pay through official escrow/payroll.',
      'Remember that bank availability of check funds does NOT mean the check has cleared.'
    ]
  },
  {
    id: 'off-platform-redirect',
    title: 'Off-Platform Redirect & Escrow Bypass',
    category: 'Off-Platform Fraud',
    riskLevel: 'High',
    summary: 'A client on Upwork, Fiverr, or LinkedIn urges you to move communication and payments immediately to Telegram, WhatsApp, or Google Chat to avoid platform fees.',
    howItWorks: [
      'Client reaches out on a freelancing marketplace or LinkedIn.',
      'Quickly demands moving to Telegram/WhatsApp for "faster processing" or "HR interview."',
      'Bypasses platform escrow, terms of service, and dispute resolution protections.',
      'Once off-platform, they deliver fake payment proofs or vanish without paying.'
    ],
    realWorldExample: '"Kindly contact our HR Manager Mr. David on Telegram (@HR_David_Global) right now for your project onboarding and salary payment details. Do not reply here."',
    redFlags: [
      'Immediate push to leave platform before contract start',
      'Use of anonymous handles on Telegram or WhatsApp',
      'Refusal to create a funded milestone on Upwork/Fiverr'
    ],
    howToProtect: [
      'Keep all communications and contracts on the original platform until a verified contract is active.',
      'Never accept payment outside platform escrow unless working under a direct written agreement with verified corporate credentials.'
    ]
  },
  {
    id: 'unpaid-test-task',
    title: 'Unpaid "Test Task" & Spec Work Exploitation',
    category: 'Work Exploitation',
    riskLevel: 'High',
    summary: 'The client asks you to complete a large, finished piece of work (like writing a 2,000-word article, designing a full logo set, or coding a full feature) as a "free test" before hiring.',
    howItWorks: [
      'Client posts a listing with vague requirements.',
      'Requests full, production-ready deliverables as a "qualification test."',
      'Collects finished work from dozens of applicants without paying anyone.',
      'Ghosts applicants or claims their test "didn\'t pass criteria."'
    ],
    realWorldExample: '"To qualify for this $5,000 web design contract, please design the complete 5-page homepage, pricing, and dashboard mockups for our site as a trial task. Submissions due in 24 hours."',
    redFlags: [
      'Unpaid test tasks exceeding 15–30 minutes of effort',
      'Demanding full ownership of test task assets',
      'Identical test task assigned to multiple freelancers'
    ],
    howToProtect: [
      'Offer paid test tasks or point to your existing portfolio/case studies.',
      'Watermark sample designs or submit static screenshots/previews instead of full source files.'
    ]
  },
  {
    id: 'upfront-fee',
    title: 'Upfront Fee & "Security Deposit" Request',
    category: 'Payment Scams',
    riskLevel: 'Extreme',
    summary: 'The client claims you must pay an "insurance fee," "software license fee," "ID verification fee," or "security deposit" before they release your contract or payment.',
    howItWorks: [
      'You get hired for a high-paying data entry, translation, or virtual assistant job.',
      'Before starting or receiving your first check, they demand a $50–$250 payment.',
      'They claim the fee is fully refundable with your first paycheck.',
      'After you pay, they disappear or ask for additional fees (e.g. tax release fees).'
    ],
    realWorldExample: '"Congratulations, you are selected! Before we send your contract and $1,200 advance, send a $100 security deposit via Crypto/CashApp to register your employee ID in our system."',
    redFlags: [
      'Asking the freelancer to pay money to get a job',
      'Vague refundable fee claims',
      'Demanding payment via non-reversible methods (Crypto, Gift Cards, Venmo)'
    ],
    howToProtect: [
      'NEVER pay money to work. Legitimate clients pay you, not the other way around.',
      'Any upfront fee requirement is 100% a scam.'
    ]
  },
  {
    id: 'phishing-personal-info',
    title: 'Phishing for Sensitive Personal Information',
    category: 'Identity & Phishing',
    riskLevel: 'Extreme',
    summary: 'Client requests sensitive personal data — SSN, driver\'s license photo, passport copy, bank login, or credit card details — under the guise of background checks.',
    howItWorks: [
      'Client presents a realistic job offer with attractive pay.',
      'Sends a form or link requesting your Social Security Number, photo of your ID, or banking info.',
      'Uses your identity documents to commit identity theft, open fraudulent loans, or compromise your accounts.'
    ],
    realWorldExample: '"Fill out our online onboarding portal link [unfamiliar-domain.net] with your full SSN, birthdate, and driver\'s license upload before we schedule your introduction call."',
    redFlags: [
      'Requesting SSN or passport copy before signing a formal contract or official tax form (W-9/W-8BEN)',
      'Links to third-party form builders or suspicious domains',
      'Demanding bank account login credentials instead of routing info'
    ],
    howToProtect: [
      'Never share SSN or official government IDs until verifying company credentials and using secure HR platforms (e.g., Gusto, Rippling, Deel).',
      'Never share bank passwords, PINs, or 2FA codes.'
    ]
  },
  {
    id: 'predatory-contract',
    title: 'Predatory Contract Terms & Unlimited Revisions Trap',
    category: 'Contract Hazards',
    riskLevel: 'Caution',
    summary: 'A contract containing hidden clauses that trap freelancers in indefinite unpaid labor, vague payment terms, or excessive non-compete restrictions.',
    howItWorks: [
      'Client provides a legal agreement packed with dense boilerplates.',
      'Includes clauses like "Client may request unlimited revisions until satisfied without additional pay."',
      'Includes "Payment payable within 120 days after client approval" or "Client owns all IP upon drafting (before payment)."',
      'Enforces broad non-competes preventing you from working with any client in the same industry.'
    ],
    realWorldExample: '"Contractor agrees to provide unlimited revisions at no extra cost until Client approves final deliverable. Payment will be processed 90 days following Client final sign-off."',
    redFlags: [
      'Unlimited revisions clause without scope caps',
      'Payment terms longer than Net-30 or tied to subjective approval',
      'IP transfer occurring prior to full payment',
      'Unilateral termination penalties against the freelancer'
    ],
    howToProtect: [
      'Specify exact revision limits (e.g., 2 rounds included; additional at $XX/hr).',
      'Ensure contract states IP remains with contractor until invoice is paid in full.'
    ]
  },
  {
    id: 'fake-company-identity',
    title: 'Fake Recruiter & Executive Impersonation',
    category: 'Identity & Phishing',
    riskLevel: 'High',
    summary: 'Scammers create fake profiles impersonating real executives or recruiters from well-known companies (e.g. Microsoft, Canva, Spotify) using lookalike domain names.',
    howItWorks: [
      'Scammer sends an email or message claiming to represent a famous brand.',
      'Uses domain names with minor typos (e.g., `@careers-canva.co` instead of `@canva.com`).',
      'Conducts brief text-only interviews via Microsoft Teams or Skype.',
      'Presents a fake offer letter and transitions to Fake Check or Upfront Fee scams.'
    ],
    realWorldExample: '"Hello, I am Sarah Jenkins, VP of HR at Stripe. We reviewed your resume on LinkedIn and want to offer you a remote Project Manager position at $65/hr. Please message our hiring bot on Skype."',
    redFlags: [
      'Email address from free webmail (gmail/yahoo) or lookalike domain',
      'Interview conducted solely via text message/chat without video or phone',
      'Job offer made extraordinarily fast without technical evaluation'
    ],
    howToProtect: [
      'Check email domain carefully against the company\'s official website.',
      'Reach out directly to the company\'s HR department or verified recruiters on LinkedIn to verify job openings.'
    ]
  },
  {
    id: 'crypto-telegram-job',
    title: 'Crypto Rating & Telegram Task Scam',
    category: 'Payment Scams',
    riskLevel: 'High',
    summary: 'Offers simple high-paying tasks like "liking YouTube videos," "rating app store listings," or "crypto optimization" managed via Telegram groups.',
    howItWorks: [
      'You are invited to join a Telegram group promising $200–$500 per day for 30 minutes of simple tasks.',
      'Initial small payouts ($10–$20 in crypto) are sent to build trust.',
      'You are then required to deposit funds into a "combination task" or "VIP level" to unlock higher earnings.',
      'Once you deposit larger sums, your funds are frozen and the admin demands more payments to unlock it.'
    ],
    realWorldExample: '"Earn $300 daily rating mobile apps for 1 hour! Complete 30 rating tasks in our portal. To unlock Tier 2 earnings, deposit 0.05 BTC to your account balance."',
    redFlags: [
      'Unusually high pay for unskilled repetitive tasks',
      'Mandatory deposits required to unlock work or payouts',
      'Task management operated exclusively through Telegram channels'
    ],
    howToProtect: [
      'Avoid any job that requires depositing money or purchasing crypto to earn income.',
      'Real jobs pay for work done; they do not require "pre-funding" task queues.'
    ]
  }
];
