import { PolicyDocument } from '../types';

export const SAMPLE_POLICIES: PolicyDocument[] = [
  {
    id: 'mit-financial-aid-2026',
    title: 'MIT Undergraduate Financial Aid Policy 2026',
    category: 'Higher Education & Grants',
    createdAt: '2026-06-01',
    summary: 'Comprehensive financial aid framework governing FAFSA/CSS Profile Feb-15 priority deadlines, Satisfactory Academic Progress (SAP) 2.0 GPA maintenance, $10,000 work-study earnings cap, and sibling enrollment verification mandates.',
    rawText: `Paragraph 1: Section 1.1: Annual Financial Aid Application Deadlines. All returning and prospective undergraduate students seeking need-based MIT Scholarship grants must submit both the Free Application for Federal Student Aid (FAFSA) and the CSS Profile no later than February 15th at 11:59 PM EST. Submissions received after February 15th will incur an automatic 15% reduction in institutional grant allocations and may result in total loss of MIT scholarship funding for the academic year.

Paragraph 2: Section 2.1: Satisfactory Academic Progress (SAP) & GPA Standards. To maintain eligibility for MIT undergraduate grants, students must maintain a cumulative Grade Point Average (GPA) of at least 2.0 on a 4.0 scale and complete a minimum of 75% of attempted credit units each semester. Falling below the 2.0 GPA threshold places the student on financial aid probation for one term; failure to rectify the GPA within one term results in total cancellation of institutional aid.

Paragraph 3: Section 3.2: Family Income Verification & Sibling Enrollment Audits. Families reporting an annual household income below $140,000 qualify for full tuition grant coverage. However, families claiming multiple dependent siblings enrolled in concurrent undergraduate programs must provide official registrar enrollment verification certificates by October 1st. Failure to submit sibling enrollment verification by October 1st will trigger an immediate aid recalculation and a retroactive $8,500 tuition surcharge.

Paragraph 4: Section 4.3: Federal Work-Study & Outside Scholarship Offsets. Students participating in Federal Work-Study programs are limited to a maximum earnings cap of $10,000 per academic year. Additionally, outside scholarships exceeding $2,000 must be declared to the Student Financial Services office within 14 days of receipt; failure to declare outside aid incurs a $500 compliance administrative fee.

Paragraph 5: Section 5.1: Appeal Deadlines & Special Circumstances Reviews. Students experiencing sudden family financial hardship, medical emergencies, or parental loss may submit a Financial Aid Appeal Form prior to November 30th for fall semester aid or April 30th for spring semester aid. Late appeals submitted past these cutoff dates cannot be processed for retrofitted grant adjustments.`,
    paragraphs: [
      {
        paragraphNumber: 1,
        text: 'Section 1.1: Annual Financial Aid Application Deadlines. All returning and prospective undergraduate students seeking need-based MIT Scholarship grants must submit both the Free Application for Federal Student Aid (FAFSA) and the CSS Profile no later than February 15th at 11:59 PM EST. Submissions received after February 15th will incur an automatic 15% reduction in institutional grant allocations and may result in total loss of MIT scholarship funding for the academic year.',
        simplifiedText: 'CRITICAL DEADLINE: Submit FAFSA and CSS Profile by February 15th at 11:59 PM EST. Submitting late costs 15% of your grant or risks complete loss of scholarship funding.',
        referenceCount: 38,
        topics: ['Feb 15 Deadline', 'FAFSA & CSS Profile', '15% Late Grant Penalty']
      },
      {
        paragraphNumber: 2,
        text: 'Section 2.1: Satisfactory Academic Progress (SAP) & GPA Standards. To maintain eligibility for MIT undergraduate grants, students must maintain a cumulative Grade Point Average (GPA) of at least 2.0 on a 4.0 scale and complete a minimum of 75% of attempted credit units each semester. Falling below the 2.0 GPA threshold places the student on financial aid probation for one term; failure to rectify the GPA within one term results in total cancellation of institutional aid.',
        simplifiedText: 'You must maintain at least a 2.0 GPA and pass 75% of your courses. Dropping below 2.0 triggers aid probation, and staying below 2.0 cancels your financial aid completely.',
        referenceCount: 24,
        topics: ['2.0 GPA Minimum', '75% Unit Completion', 'Financial Aid Cancellation']
      },
      {
        paragraphNumber: 3,
        text: 'Section 3.2: Family Income Verification & Sibling Enrollment Audits. Families reporting an annual household income below $140,000 qualify for full tuition grant coverage. However, families claiming multiple dependent siblings enrolled in concurrent undergraduate programs must provide official registrar enrollment verification certificates by October 1st. Failure to submit sibling enrollment verification by October 1st will trigger an immediate aid recalculation and a retroactive $8,500 tuition surcharge.',
        simplifiedText: 'Families making under $140k get full tuition grants. If claiming siblings in college, submit proof by October 1st or pay an unexpected $8,500 tuition bill.',
        referenceCount: 19,
        topics: ['Full Tuition Threshold', 'Oct 1 Sibling Audit', '$8,500 Retroactive Fee']
      },
      {
        paragraphNumber: 4,
        text: 'Section 4.3: Federal Work-Study & Outside Scholarship Offsets. Students participating in Federal Work-Study programs are limited to a maximum earnings cap of $10,000 per academic year. Additionally, outside scholarships exceeding $2,000 must be declared to the Student Financial Services office within 14 days of receipt; failure to declare outside aid incurs a $500 compliance administrative fee.',
        simplifiedText: 'Work-study earnings are capped at $10,000/yr. Report outside scholarships over $2,000 within 14 days to avoid a $500 fine.',
        referenceCount: 15,
        topics: ['$10,000 Work-Study Cap', '14-Day Aid Disclosure', '$500 Compliance Fine']
      },
      {
        paragraphNumber: 5,
        text: 'Section 5.1: Appeal Deadlines & Special Circumstances Reviews. Students experiencing sudden family financial hardship, medical emergencies, or parental loss may submit a Financial Aid Appeal Form prior to November 30th for fall semester aid or April 30th for spring semester aid. Late appeals submitted past these cutoff dates cannot be processed for retrofitted grant adjustments.',
        simplifiedText: 'For financial appeals, apply by Nov 30 (Fall) or April 30 (Spring). Late appeals cannot be processed for retroactive grants.',
        referenceCount: 12,
        topics: ['Nov 30 / April 30 Appeals', 'Hardship Aid Review', 'Strict Appeal Cutoff']
      }
    ],
    risks: [
      {
        id: 'mit-r1',
        title: 'February 15th FAFSA & CSS Profile Priority Cutoff',
        category: 'Critical Deadlines',
        severity: 'critical',
        explanation: 'Filing FAFSA or CSS Profile after Feb 15 results in an automatic 15% reduction in MIT scholarship grants and risks total aid loss.',
        quote: 'All returning and prospective undergraduate students seeking need-based MIT Scholarship grants must submit both the Free Application for Federal Student Aid (FAFSA) and the CSS Profile no later than February 15th at 11:59 PM EST.',
        paragraphNumber: 1,
        confidenceLevel: 'High'
      },
      {
        id: 'mit-r2',
        title: 'October 1st Sibling Verification & $8,500 Penalty',
        category: 'Financial Penalties',
        severity: 'critical',
        explanation: 'Failing to submit registrar sibling enrollment proof by October 1st triggers an immediate aid recalculation and retroactive $8,500 charge.',
        quote: 'Failure to submit sibling enrollment verification by October 1st will trigger an immediate aid recalculation and a retroactive $8,500 tuition surcharge.',
        paragraphNumber: 3,
        confidenceLevel: 'High'
      },
      {
        id: 'mit-r3',
        title: '2.0 GPA Minimum & Aid Cancellation',
        category: 'Eligibility Loss Conditions',
        severity: 'critical',
        explanation: 'Falling below a 2.0 GPA or 75% course completion triggers aid probation, and failure to raise GPA cancels MIT grants entirely.',
        quote: 'Falling below the 2.0 GPA threshold places the student on financial aid probation for one term; failure to rectify the GPA within one term results in total cancellation of institutional aid.',
        paragraphNumber: 2,
        confidenceLevel: 'High'
      },
      {
        id: 'mit-r4',
        title: '14-Day Outside Aid Reporting & $500 Fine',
        category: 'Mandatory Actions',
        severity: 'warning',
        explanation: 'Outside scholarships exceeding $2,000 must be reported within 14 days to prevent a $500 compliance penalty.',
        quote: 'outside scholarships exceeding $2,000 must be declared to the Student Financial Services office within 14 days of receipt; failure to declare outside aid incurs a $500 compliance administrative fee.',
        paragraphNumber: 4,
        confidenceLevel: 'High'
      },
      {
        id: 'mit-r5',
        title: 'Nov 30 / April 30 Hardship Appeal Cutoffs',
        category: 'Application Cutoff Dates',
        severity: 'warning',
        explanation: 'Financial hardship appeals must be received before Nov 30 (Fall) or April 30 (Spring); late appeals are strictly rejected.',
        quote: 'Late appeals submitted past these cutoff dates cannot be processed for retrofitted grant adjustments.',
        paragraphNumber: 5,
        confidenceLevel: 'High'
      }
    ],
    insights: {
      estimatedReadingTimeMinutes: 3,
      originalDifficultyScore: 'Grade 14.8 (University Standard)',
      simplifiedDifficultyScore: 'Grade 7.2 (Middle School Plain English)',
      percentageSimplification: 66,
      policyComplexityRating: 'Medium',
      totalPages: 1,
      totalParagraphs: 5,
      totalDeadlinesFound: 3,
      totalEligibilityRules: 4,
      totalRequiredDocuments: 3,
      totalPenalties: 2,
      totalExceptions: 1,
      totalBenefits: 2,
      top5ImportantPoints: [
        {
          rank: 1,
          title: 'Submit FAFSA & CSS Profile Before Feb 15',
          explanation: 'Late submissions incur an automatic 15% grant penalty or total scholarship forfeiture.',
          paragraphNumber: 1,
          impactScore: 99
        },
        {
          rank: 2,
          title: 'Maintain 2.0 Cumulative GPA for Grant Aid',
          explanation: 'GPA below 2.0 triggers aid probation and eventual cancellation of MIT grants.',
          paragraphNumber: 2,
          impactScore: 94
        },
        {
          rank: 3,
          title: 'Submit Sibling Verification by Oct 1',
          explanation: 'Prevents an unexpected $8,500 retroactive tuition surcharge.',
          paragraphNumber: 3,
          impactScore: 91
        },
        {
          rank: 4,
          title: 'Report Outside Aid Within 14 Days',
          explanation: 'Avoids $500 compliance fee for undeclared external grants over $2,000.',
          paragraphNumber: 4,
          impactScore: 84
        },
        {
          rank: 5,
          title: 'Observe Nov 30 / April 30 Appeal Cutoffs',
          explanation: 'Financial hardship reviews cannot be retroactively adjusted after semester deadlines.',
          paragraphNumber: 5,
          impactScore: 78
        }
      ]
    },
    eligibilityQuestions: [
      {
        id: 'mit-q1',
        question: 'Have you submitted both your FAFSA and CSS Profile prior to the February 15th 11:59 PM deadline?',
        options: [
          { label: 'Yes, submitted before Feb 15th', value: 'yes', isEligible: true },
          { label: 'No, submitted after Feb 15th or pending', value: 'no', isEligible: false, note: 'Incurs automatic 15% grant reduction and risks total aid loss (Para 1).' }
        ],
        paragraphCitation: 1,
        explanation: 'Feb 15 is the strict priority deadline for MIT scholarship grant funding.'
      },
      {
        id: 'mit-q2',
        question: 'Is your current cumulative Grade Point Average (GPA) at or above 2.0?',
        options: [
          { label: 'Yes, 2.0 GPA or higher', value: 'gpa_ok', isEligible: true },
          { label: 'No, below 2.0 GPA', value: 'gpa_low', isEligible: false, note: 'Triggers financial aid probation and potential grant cancellation (Para 2).' }
        ],
        paragraphCitation: 2,
        explanation: 'Satisfactory Academic Progress requires a minimum 2.0 GPA.'
      },
      {
        id: 'mit-q3',
        question: 'If claiming college siblings, did you submit registrar enrollment verification by October 1st?',
        options: [
          { label: 'Yes / Not applicable (no siblings in college)', value: 'sib_ok', isEligible: true },
          { label: 'No, missed October 1st sibling proof deadline', value: 'sib_late', isEligible: false, note: 'Triggers retroactive $8,500 tuition bill (Para 3).' }
        ],
        paragraphCitation: 3,
        explanation: 'October 1st is mandatory for verifying multi-student household aid discounts.'
      }
    ]
  },
  {
    id: 'student-visa-pgwp',
    title: 'International Student Visa & PGWP Regulations 2026',
    category: 'Immigration & Study Permits',
    createdAt: '2026-05-15',
    summary: 'Comprehensive regulatory framework governing full-time study requirements, off-campus work hour limits, mandatory 90-day PGWP application cutoffs, and visa status loss rules.',
    rawText: `Paragraph 1: Section 1.1: Enrollment Status & Full-Time Requirement. All foreign nationals holding an International Study Permit must maintain full-time enrollment status at a Designated Learning Institution (DLI) during every academic term. Failure to maintain full-time registration will result in immediate loss of legal status in the host country and potential deportation.

Paragraph 2: Section 2.4: Off-Campus Employment & Work Hour Limitations. International students are permitted to work up to 24 hours per week off-campus during regular academic semesters. During scheduled academic breaks, such as winter or summer vacations, students may work full-time up to 40 hours per week. Working in excess of 24 hours per week during academic terms constitutes an illegal employment violation incurring a $5,000 financial penalty and eligibility loss for post-graduation permits.

Paragraph 3: Section 3.1: Post-Graduation Work Permit (PGWP) Cutoff. Students must apply for a Post-Graduation Work Permit (PGWP) within exactly 90 days of receiving their final transcript or official graduation letter. Applications submitted past the 90-day cutoff date will be automatically rejected with no option for appeal, requiring the applicant to exit the country immediately.

Paragraph 4: Section 4.2: Unauthorized Absences & Medical Exceptions. To remain eligible for a PGWP, students must never take unauthorized leaves of absence exceeding 15 consecutive days. Any authorized medical leave must be formally documented with a licensed medical practitioner's signature and approved by the university registrar prior to the leave commencement.

Paragraph 5: Section 5.3: Mandatory Medical Insurance Coverage. International students must hold valid comprehensive health insurance coverage for the entire duration of their stay. Lapses in medical coverage exceeding 7 days will result in a $1,200 administrative compliance fine and mandatory suspension of off-campus work authorization.`,
    paragraphs: [
      {
        paragraphNumber: 1,
        text: 'Section 1.1: Enrollment Status & Full-Time Requirement. All foreign nationals holding an International Study Permit must maintain full-time enrollment status at a Designated Learning Institution (DLI) during every academic term. Failure to maintain full-time registration will result in immediate loss of legal status in the host country and potential deportation.',
        simplifiedText: 'You must stay enrolled as a full-time student at an approved school. Dropping to part-time status invalidates your visa.',
        referenceCount: 14,
        topics: ['Full-Time Status', 'Visa Revocation', 'Legal Status Mandate']
      },
      {
        paragraphNumber: 2,
        text: 'Section 2.4: Off-Campus Employment & Work Hour Limitations. International students are permitted to work up to 24 hours per week off-campus during regular academic semesters. During scheduled academic breaks, such as winter or summer vacations, students may work full-time up to 40 hours per week. Working in excess of 24 hours per week during academic terms constitutes an illegal employment violation incurring a $5,000 financial penalty and eligibility loss for post-graduation permits.',
        simplifiedText: 'Work limit is 24 hrs/week during classes and 40 hrs during official breaks. Working over 24 hrs during terms carries a $5,000 fine and bans your PGWP.',
        referenceCount: 22,
        topics: ['24-Hour Work Cap', '$5,000 Penalty', 'PGWP Disqualification']
      },
      {
        paragraphNumber: 3,
        text: 'Section 3.1: Post-Graduation Work Permit (PGWP) Cutoff. Students must apply for a Post-Graduation Work Permit (PGWP) within exactly 90 days of receiving their final transcript or official graduation letter. Applications submitted past the 90-day cutoff date will be automatically rejected with no option for appeal, requiring the applicant to exit the country immediately.',
        simplifiedText: 'CRITICAL DEADLINE: You have 90 days from receiving your final graduation letter to apply for your PGWP. Late applications are rejected without appeal.',
        referenceCount: 31,
        topics: ['90-Day Cutoff', 'PGWP Deadline', 'No Appeal Rule']
      },
      {
        paragraphNumber: 4,
        text: 'Section 4.2: Unauthorized Absences & Medical Exceptions. To remain eligible for a PGWP, students must never take unauthorized leaves of absence exceeding 15 consecutive days. Any authorized medical leave must be formally documented with a licensed medical practitioner\'s signature and approved by the university registrar prior to the leave commencement.',
        simplifiedText: 'Do not take unapproved breaks longer than 15 days. Medical leaves require a doctor\'s signature and registrar approval prior to taking leave.',
        referenceCount: 9,
        topics: ['15-Day Leave Cap', 'Medical Leave Authorization']
      },
      {
        paragraphNumber: 5,
        text: 'Section 5.3: Mandatory Medical Insurance Coverage. International students must hold valid comprehensive health insurance coverage for the entire duration of their stay. Lapses in medical coverage exceeding 7 days will result in a $1,200 administrative compliance fine and mandatory suspension of off-campus work authorization.',
        simplifiedText: 'Maintain continuous health insurance. Coverage gaps over 7 days trigger a $1,200 fine and work authorization suspension.',
        referenceCount: 11,
        topics: ['Health Insurance', '$1,200 Fine', 'Work Permit Suspension']
      }
    ],
    risks: [
      {
        id: 'r1',
        title: 'Strict 90-Day PGWP Application Cutoff',
        category: 'Application Cutoff Dates',
        severity: 'critical',
        explanation: 'You must submit your Post-Graduation Work Permit application within 90 days of receiving your final graduation letter. Late applications are automatically rejected without appeal.',
        quote: 'Students must apply for a Post-Graduation Work Permit (PGWP) within exactly 90 days of receiving their final transcript or official graduation letter.',
        paragraphNumber: 3,
        confidenceLevel: 'High'
      },
      {
        id: 'r2',
        title: 'Off-Campus Work Limit & $5,000 Penalty',
        category: 'Financial Penalties',
        severity: 'critical',
        explanation: 'Working over 24 hours per week during academic semesters triggers an immediate $5,000 fine and permanently disqualifies you from post-grad work permits.',
        quote: 'Working in excess of 24 hours per week during academic terms constitutes an illegal employment violation incurring a $5,000 financial penalty.',
        paragraphNumber: 2,
        confidenceLevel: 'High'
      },
      {
        id: 'r3',
        title: 'Full-Time Status Loss & Deportation Risk',
        category: 'Eligibility Loss Conditions',
        severity: 'critical',
        explanation: 'Dropping below full-time course load without prior authorization causes instant loss of legal visa status.',
        quote: 'Failure to maintain full-time registration will result in immediate loss of legal status in the host country and potential deportation.',
        paragraphNumber: 1,
        confidenceLevel: 'High'
      }
    ],
    insights: {
      estimatedReadingTimeMinutes: 3,
      originalDifficultyScore: 'Grade 15.1 (University Standard)',
      simplifiedDifficultyScore: 'Grade 7.8 (Middle School Plain English)',
      percentageSimplification: 64,
      policyComplexityRating: 'Hard',
      totalPages: 1,
      totalParagraphs: 5,
      totalDeadlinesFound: 3,
      totalEligibilityRules: 4,
      totalRequiredDocuments: 2,
      totalPenalties: 2,
      totalExceptions: 1,
      totalBenefits: 2,
      top5ImportantPoints: [
        {
          rank: 1,
          title: 'Do Not Miss the 90-Day PGWP Cutoff',
          explanation: 'Applying even 1 day late forfeits all post-graduation work rights.',
          paragraphNumber: 3,
          impactScore: 98
        },
        {
          rank: 2,
          title: 'Cap Semester Work at 24 Hours',
          explanation: 'Working over 24 hours triggers a $5,000 fine and disqualifies you from work permits.',
          paragraphNumber: 2,
          impactScore: 95
        },
        {
          rank: 3,
          title: 'Maintain Uninterrupted Full-Time Status',
          explanation: 'Part-time enrollment invalidates your student visa.',
          paragraphNumber: 1,
          impactScore: 92
        }
      ]
    },
    eligibilityQuestions: [
      {
        id: 'q1',
        question: 'Are you currently enrolled full-time in an approved DLI university/college program?',
        options: [
          { label: 'Yes, full-time student', value: 'yes', isEligible: true },
          { label: 'No, part-time status', value: 'no', isEligible: false, note: 'Violates full-time registration requirement (Para 1).' }
        ],
        paragraphCitation: 1,
        explanation: 'Full-time status is mandatory for maintaining valid visa status and PGWP eligibility.'
      },
      {
        id: 'q2',
        question: 'How many hours per week do you work off-campus during regular academic terms?',
        options: [
          { label: '24 hours or fewer', value: 'le24', isEligible: true },
          { label: 'Over 24 hours per week', value: 'gt24', isEligible: false, note: 'Exceeds legal 24hr semester cap (Para 2).' }
        ],
        paragraphCitation: 2,
        explanation: 'Working over 24 hours during class terms results in fines and disqualification.'
      }
    ]
  },
  {
    id: 'residential-tenant-lease',
    title: 'Residential Tenancy & Lease Agreement Standards 2026',
    category: 'Housing & Property Management',
    createdAt: '2026-03-10',
    summary: 'Standard residential lease agreement detailing rent payment cutoff dates, late payment interest fees, security deposit return timelines, pet deposit policies, and 60-day lease termination notice mandates.',
    rawText: `Paragraph 1: Section 1.1: Monthly Rent Due Date & Grace Period. Rent is strictly due on or before the 1st day of each calendar month. A grace period is provided until the 3rd of the month at 11:59 PM. Rent received after the 3rd will incur a late payment penalty of $75 plus 1.5% compounding daily interest until fully paid.

Paragraph 2: Section 2.2: Lease Termination & 60-Day Notice Mandate. Tenants must provide a minimum of 60 days written notice prior to the end of the fixed-term lease to vacate or non-renew. Verbal notice or written notice given fewer than 60 days in advance will trigger automatic lease rollover into a month-to-month tenancy with a 15% rent rate surcharge.

Paragraph 3: Section 3.1: Security Deposit Return Statutory Deadline. Landlords must return security deposits within 30 days of lease termination and possession return, accompanied by an itemized deduction ledger. Unjustified retention of deposits past 30 days entitles the tenant to double deposit recovery under state statutory law.`,
    paragraphs: [
      {
        paragraphNumber: 1,
        text: 'Section 1.1: Monthly Rent Due Date & Grace Period. Rent is strictly due on or before the 1st day of each calendar month. A grace period is provided until the 3rd of the month at 11:59 PM. Rent received after the 3rd will incur a late payment penalty of $75 plus 1.5% compounding daily interest until fully paid.',
        simplifiedText: 'Rent is due on the 1st. You have until the 3rd at 11:59 PM. After the 3rd, you pay a $75 fine plus 1.5% daily compounding interest.',
        referenceCount: 19,
        topics: ['Rent Due Date', '$75 Late Fee', '11:59 PM Grace Cutoff']
      },
      {
        paragraphNumber: 2,
        text: 'Section 2.2: Lease Termination & 60-Day Notice Mandate. Tenants must provide a minimum of 60 days written notice prior to the end of the fixed-term lease to vacate or non-renew. Verbal notice or written notice given fewer than 60 days in advance will trigger automatic lease rollover into a month-to-month tenancy with a 15% rent rate surcharge.',
        simplifiedText: '60-DAY NOTICE DEADLINE: Provide 60 days written notice before moving out. Otherwise your lease auto-renews at a 15% higher rent rate.',
        referenceCount: 28,
        topics: ['60-Day Written Notice', 'Auto-Renewal', '15% Surcharge']
      },
      {
        paragraphNumber: 3,
        text: 'Section 3.1: Security Deposit Return Statutory Deadline. Landlords must return security deposits within 30 days of lease termination and possession return, accompanied by an itemized deduction ledger. Unjustified retention of deposits past 30 days entitles the tenant to double deposit recovery under state statutory law.',
        simplifiedText: 'Landlords must return your deposit within 30 days with receipts. Late returns without cause entitle you to double the deposit.',
        referenceCount: 15,
        topics: ['30-Day Deposit Return', 'Double Deposit Recovery']
      }
    ],
    risks: [
      {
        id: 'tr1',
        title: '60-Day Written Move-Out Notice Cutoff',
        category: 'Application Cutoff Dates',
        severity: 'critical',
        explanation: 'Failing to give 60 days written notice triggers automatic month-to-month rollover with a 15% rent hike.',
        quote: 'Tenants must provide a minimum of 60 days written notice prior to the end of the fixed-term lease to vacate or non-renew.',
        paragraphNumber: 2,
        confidenceLevel: 'High'
      },
      {
        id: 'tr2',
        title: 'Rent Grace Period & $75 Late Fee',
        category: 'Financial Penalties',
        severity: 'warning',
        explanation: 'Rent paid after 11:59 PM on the 3rd incurs $75 plus 1.5% daily compounding fee.',
        quote: 'Rent received after the 3rd will incur a late payment penalty of $75 plus 1.5% compounding daily interest until fully paid.',
        paragraphNumber: 1,
        confidenceLevel: 'High'
      }
    ],
    insights: {
      estimatedReadingTimeMinutes: 2,
      originalDifficultyScore: 'Grade 13.2 (College Freshman)',
      simplifiedDifficultyScore: 'Grade 6.9 (Middle School)',
      percentageSimplification: 58,
      policyComplexityRating: 'Medium',
      totalPages: 1,
      totalParagraphs: 3,
      totalDeadlinesFound: 2,
      totalEligibilityRules: 2,
      totalRequiredDocuments: 1,
      totalPenalties: 2,
      totalExceptions: 1,
      totalBenefits: 1,
      top5ImportantPoints: [
        {
          rank: 1,
          title: 'Give 60 Days Written Move-Out Notice',
          explanation: 'Verbal or short notice auto-renews your lease at 15% higher rent.',
          paragraphNumber: 2,
          impactScore: 96
        }
      ]
    },
    eligibilityQuestions: [
      {
        id: 'tq1',
        question: 'How many days before your lease end date will you provide written move-out notice?',
        options: [
          { label: '60 days or more in writing', value: 'm60', isEligible: true },
          { label: 'Fewer than 60 days', value: 'l60', isEligible: false, note: 'Triggers 15% rate surcharge and auto-renewal (Para 2).' }
        ],
        paragraphCitation: 2,
        explanation: 'Must submit formal written notice 60 days prior.'
      }
    ]
  }
];
