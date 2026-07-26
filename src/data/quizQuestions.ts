import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'You receive a message from a client on LinkedIn offering a remote Copywriter role at $75/hr. They ask you to connect on Telegram with their HR Director immediately to finalize your contract.',
    contextType: 'Client Message',
    submittedTextSnippet: '"Great work on your profile! We are hiring remote copywriters at $75/hr. Please message @HR_Global_David on Telegram right now to complete your quick text interview and receive your contract."',
    options: [
      { label: 'Scam — High Risk', verdict: 'scam' },
      { label: 'Legitimate Offer', verdict: 'legitimate' },
      { label: 'Needs More Info', verdict: 'caution' }
    ],
    correctVerdict: 'scam',
    explanation: 'Moving off-platform immediately to Telegram for text-only interviews is a classic red flag for recruiter impersonation and fake check scams.',
    keyTakeaway: 'Always keep communication on legitimate professional channels or verified corporate video calls. Never conduct interviews exclusively on Telegram handles.'
  },
  {
    id: 2,
    scenario: 'An agency offers you a $2,500 web development contract. Their agreement states: "Payment shall be issued within 15 business days following delivery of milestones. IP transfers upon final payment receipt."',
    contextType: 'Contract Clause',
    submittedTextSnippet: '"Clause 4.2: Contractor retains all intellectual property rights in the Work Deliverables until Client issues full payment of agreed milestone fees ($2,500) as set forth in Net-15 schedule."',
    options: [
      { label: 'Scam — High Risk', verdict: 'scam' },
      { label: 'Legitimate & Fair Clause', verdict: 'legitimate' },
      { label: 'Needs More Info', verdict: 'caution' }
    ],
    correctVerdict: 'legitimate',
    explanation: 'This is a standard, fair clause! It provides a reasonable payment timeline (Net-15) and protects the freelancer by retaining IP ownership until payment is received.',
    keyTakeaway: 'Fair contracts explicitly protect freelancer IP until payment clears.'
  },
  {
    id: 3,
    scenario: 'After being hired for a virtual assistant job, the employer sends an electronic check for $3,800 and instructs you to buy a specific Apple MacBook from their designated IT supplier via Zelle.',
    contextType: 'Payment Request',
    submittedTextSnippet: '"We have emailed your onboarding equipment check of $3,800. Deposit this via mobile deposit and immediately Zelle $3,200 to our vendor at orders@tech-vendor-supplies.net to dispatch your laptop today."',
    options: [
      { label: 'Scam — Extreme Risk', verdict: 'scam' },
      { label: 'Legitimate Onboarding', verdict: 'legitimate' },
      { label: 'Needs More Info', verdict: 'caution' }
    ],
    correctVerdict: 'scam',
    explanation: 'This is a classic Fake Check & Equipment Purchase Scam. The check will bounce in a few days, and any money Zelled to the fake vendor will be lost permanently from your account.',
    keyTakeaway: 'Legitimate employers ship equipment directly or buy hardware themselves. Never deposit checks to wire money back.'
  },
  {
    id: 4,
    scenario: 'A prospect asks you to write a 3,000-word article on a specific topic as a "free skill test" before discussing payment terms or signing a agreement.',
    contextType: 'Job Post',
    submittedTextSnippet: '"To test candidate writing quality, applicants must submit a complete 3,000-word article on \'Top Cloud Security Practices in 2026\'. Only applicants who complete the test will be considered for paid work."',
    options: [
      { label: 'Scam / Spec Work Exploitation', verdict: 'scam' },
      { label: 'Legitimate Hiring Process', verdict: 'legitimate' },
      { label: 'Needs More Info', verdict: 'caution' }
    ],
    correctVerdict: 'scam',
    explanation: 'Demanding extensive finished work for free is spec work exploitation. They are likely harvesting completed articles from multiple applicants without paying.',
    keyTakeaway: 'Unpaid test tasks should take no longer than 15-30 minutes, or be paid at your standard rate.'
  },
  {
    id: 5,
    scenario: 'A client sends a contract with this clause: "Contractor agrees to provide unlimited revisions at no additional charge until Client is 100% satisfied. Payment is contingent upon Client written sign-off."',
    contextType: 'Contract Clause',
    submittedTextSnippet: '"Clause 8.1: Client shall have the right to request unlimited revisions and edits without additional compensation until final satisfaction is achieved. No fees shall be due if Client terminates prior to sign-off."',
    options: [
      { label: 'Scam / Predatory Clause', verdict: 'scam' },
      { label: 'Legitimate Contract', verdict: 'legitimate' },
      { label: 'Needs More Info', verdict: 'caution' }
    ],
    correctVerdict: 'scam',
    explanation: 'This is a highly predatory clause! Unlimited revisions with subjective approval mean the client can demand endless free work or refuse payment indefinitely.',
    keyTakeaway: 'Always cap revisions (e.g. 2 rounds included) and define objective acceptance criteria.'
  },
  {
    id: 6,
    scenario: 'A recruiter from an established company contacts you from `@careers-acme-corp.co` (while the official company website is `acmecorp.com`) offering an immediate job offer without a video interview.',
    contextType: 'Job Post',
    submittedTextSnippet: '"Dear Applicant, Acme Corp has approved your application for Senior Designer. Please review your offer letter attached and reply with your SSN and passport scan to finalize payroll."',
    options: [
      { label: 'Scam — Phishing & Impersonation', verdict: 'scam' },
      { label: 'Legitimate Fast Hiring', verdict: 'legitimate' },
      { label: 'Needs More Info', verdict: 'caution' }
    ],
    correctVerdict: 'scam',
    explanation: 'The mismatched domain name (`@careers-acme-corp.co`), absence of an interview, and immediate request for SSN and passport scans are major phishing signals.',
    keyTakeaway: 'Inspect sender email domain names character-by-character and verify openings directly on official company sites.'
  },
  {
    id: 7,
    scenario: 'An Upwork client asks if you can do a quick 10-minute paid test task funded via an active $50 Upwork milestone with clear instructions.',
    contextType: 'Job Post',
    submittedTextSnippet: '"We have set up an escrow milestone of $50 for a 1-page sample audit. If the audit meets our guidelines, we will release the $50 and extend the full $2,000 contract."',
    options: [
      { label: 'Scam — High Risk', verdict: 'scam' },
      { label: 'Legitimate Paid Milestone', verdict: 'legitimate' },
      { label: 'Needs More Info', verdict: 'caution' }
    ],
    correctVerdict: 'legitimate',
    explanation: 'This is legitimate practice! The client funded escrow upfront for a small paid trial task, protecting your time and setting clear milestones.',
    keyTakeaway: 'Funded escrow milestones for small sample tasks are a safe, professional way to test working chemistry.'
  },
  {
    id: 8,
    scenario: 'A company selects you for a translation job but states you must pay a $75 "ID Verification & Software Licensing Fee" before they issue your first paycheck.',
    contextType: 'Payment Request',
    submittedTextSnippet: '"Congratulations on your selection. To activate your employee profile in our portal, please pay a refundable $75 processing fee via Crypto or CashApp."',
    options: [
      { label: 'Scam — Upfront Fee Request', verdict: 'scam' },
      { label: 'Legitimate Processing Fee', verdict: 'legitimate' },
      { label: 'Needs More Info', verdict: 'caution' }
    ],
    correctVerdict: 'scam',
    explanation: 'Any requirement to pay money to get a job or release wages is 100% a scam. Legitimate employers never charge workers onboarding fees.',
    keyTakeaway: 'Never pay money to receive work or get paid.'
  }
];
