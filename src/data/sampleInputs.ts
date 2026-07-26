export interface SampleInput {
  id: string;
  title: string;
  category: 'Fake Check' | 'Predatory Contract' | 'Off-Platform' | 'Legitimate Offer';
  badge: 'Scam Sample' | 'Contract Sample' | 'Off-Platform' | 'Safe Sample';
  text: string;
}

export const SAMPLE_INPUTS: SampleInput[] = [
  {
    id: 'fake-check-sample',
    title: 'Fake Check & Equipment Scam',
    category: 'Fake Check',
    badge: 'Scam Sample',
    text: `Congratulations! We reviewed your resume and are pleased to hire you as our Remote Data Entry Specialist at $45/hour.

Before you begin work, our HR department will issue you a certified check for $3,800 to cover your home office equipment (MacBook Pro, dual monitors, and time-tracking software).

Once you receive the check, deposit it via mobile app right away and wire $3,200 to our approved IT vendor (via Zelle or Wire Transfer) so they can ship your pre-configured equipment today. Keep the remaining $600 as your sign-on bonus.`
  },
  {
    id: 'predatory-contract-sample',
    title: 'Predatory Contract Terms',
    category: 'Predatory Contract',
    badge: 'Contract Sample',
    text: `FREELANCE SERVICES AGREEMENT - SECTION 4 & 9

4.1 REVISIONS & ACCEPTANCE: Contractor agrees to provide unlimited revisions and alterations to all deliverables without additional compensation until Client expresses full written satisfaction. If Client is dissatisfied for any reason, Client reserves the right to terminate this agreement without making any milestone payments.

9.3 INTELLECTUAL PROPERTY & NON-COMPETE: All ideas, code, designs, and drafts created by Contractor belong exclusively to Client immediately upon creation, regardless of payment status. Contractor agrees not to provide design or development services to any company operating in the SaaS or software sector for 3 years following contract termination.`
  },
  {
    id: 'off-platform-sample',
    title: 'Off-Platform Telegram Redirect',
    category: 'Off-Platform',
    badge: 'Off-Platform',
    text: `Hi there! We saw your freelancing profile and have an urgent 20-page translation and formatting project paying $1,500.

Due to platform maintenance and high service fees, we do not communicate or pay here. Please immediately message our Hiring Manager on Telegram: @Global_Recruiter_HR to complete a quick text interview and receive your PDF contract.`
  },
  {
    id: 'legitimate-offer-sample',
    title: 'Legitimate Milestone Offer',
    category: 'Legitimate Offer',
    badge: 'Safe Sample',
    text: `Hi Alex, thanks for applying to our Senior React Frontend project.

We reviewed your portfolio and would like to start with a small, paid test milestone of $250 to refactor a single user profile component. We have created a funded Upwork escrow milestone for $250.

Once you review the Figma file and accept the contract on the platform, we can schedule a quick 15-minute video call on Google Meet to go over any questions. Payment will be released upon your pull request approval.`
  }
];
