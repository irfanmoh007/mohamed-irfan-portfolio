export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  score?: string;
  badge: string;
  image?: string;
  status?: string;
  credentialUrl?: string;
  telemetryTitle: string;
  telemetryDescription: string;
  codeSnippet: string;
}

// EXACT PRESERVED SEQUENCE — TELLING THE STORY OF MOHAMED IRFAN'S CYBERSECURITY JOURNEY
export const CERTIFICATES: CertificateItem[] = [
  // 1. Foundation: TryHackMe – Pre Security
  {
    id: 'thm-pre-security',
    title: 'TryHackMe – Pre Security',
    issuer: 'TryHackMe',
    year: '2025',
    score: '7h 38m • Fundamentals',
    badge: 'DEFENSIVE FOUNDATIONS',
    image: '/certificates/thm-pre-security.png',
    status: 'COMPLETED',
    credentialUrl: 'https://tryhackme.com/p/MohamedIrfan',
    telemetryTitle: 'Pre Security Learning Path',
    telemetryDescription: 'Foundation in networking, Linux terminal operations, web fundamentals, HTTP protocol mechanics, and cybersecurity basics.',
    codeSnippet: 'THM-PRESEC // VERIFIED COMPLETION (CODE: THM-7MQDDH2EKZ)',
  },

  // 2. Core Concepts: TryHackMe – Cyber Security 101
  {
    id: 'thm-cyber-security-101',
    title: 'TryHackMe – Cyber Security 101',
    issuer: 'TryHackMe',
    year: '2026',
    score: '45h 23m • Core Defense',
    badge: 'SECURITY FOUNDATIONS',
    image: '/certificates/thm-cyber-security-101.png',
    status: 'COMPLETED',
    credentialUrl: 'https://tryhackme.com/p/MohamedIrfan',
    telemetryTitle: 'Cyber Security 101 Learning Path',
    telemetryDescription: 'Core cybersecurity concepts, Linux privilege escalation, defensive security principles, Web exploitation basics, and cryptography.',
    codeSnippet: 'THM-CS101 // VERIFIED COMPLETION (CODE: THM-IZOUVSPLWF)',
  },

  // 3. Infrastructure: Cisco – Networking Basics
  {
    id: 'cisco-networking-basics',
    title: 'Cisco – Networking Basics',
    issuer: 'Cisco Networking Academy',
    year: '2026',
    score: 'Verified Cisco Credential',
    badge: 'NETWORKING ARCHITECTURE',
    image: '/certificates/cisco-networking-basics.png',
    status: 'COMPLETED',
    credentialUrl: 'https://www.netacad.com/',
    telemetryTitle: 'Cisco Networking Fundamentals',
    telemetryDescription: 'Networking fundamentals, OSI 7-layer architecture, TCP/IP protocols, IPv4/IPv6 subnetting, VLAN routing, and network infrastructure security.',
    codeSnippet: 'CISCO-NET // VERIFIED CERT (ID: 67c1abe0-055f-41c1)',
  },

  // 4. Blue Team Operations: TryHackMe – SOC Level 1
  {
    id: 'thm-soc-1',
    title: 'TryHackMe – SOC Level 1',
    issuer: 'TryHackMe',
    year: '2026',
    score: '65h 29m • Top 1% Global',
    badge: 'BLUE TEAM ARCHITECT',
    image: '/certificates/thm-soc-level-1.png',
    status: 'COMPLETED',
    credentialUrl: 'https://tryhackme.com/p/MohamedIrfan',
    telemetryTitle: 'SOC Level 1 Learning Path Completion',
    telemetryDescription: 'Security Operations, SIEM monitoring (Splunk/Wazuh), network forensic packet analysis (Wireshark), process auditing (Sysmon), and blue-team incident response.',
    codeSnippet: 'THM-SOC1 // VERIFIED COMPLETION (CODE: THM-WQXQMUICHJ)',
  },

  // 5. Cloud Security: Microsoft SC-900
  {
    id: 'microsoft-sc900',
    title: 'Microsoft SC-900',
    issuer: 'Microsoft Certified',
    year: '2026',
    score: 'Score: 945 / 1000',
    badge: 'SECURITY & COMPLIANCE',
    image: '/certificates/microsoft-sc900.png',
    status: 'COMPLETED',
    credentialUrl: 'https://learn.microsoft.com/en-us/users/mohamedirfan/credentials/sc-900',
    telemetryTitle: 'Microsoft Security, Compliance, & Identity',
    telemetryDescription: 'Microsoft Certified: Security, Compliance & Identity Fundamentals. Score: 945/1000 across cloud security posture, IAM principles, Entra ID governance, and threat protection.',
    codeSnippet: 'MSFT-CERT // SC-900 VERIFIED (CRED: 2AE836D01F872F1D)',
  },

  // 6. Advanced Offensive Security: Certified Ethical Hacker (CEH)
  {
    id: 'ceh-in-progress',
    title: 'Certified Ethical Hacker (CEH v12)',
    issuer: 'EC-Council',
    year: '2026',
    score: 'Status: In Progress',
    badge: 'OFFENSIVE RECON',
    status: 'IN PROGRESS',
    telemetryTitle: 'Certified Ethical Hacker (CEH v12)',
    telemetryDescription: 'Currently completing EC-Council Certified Ethical Hacker v12 curriculum covering advanced threat vector recon, penetration testing methodologies, web app security, and vulnerability exploitation.',
    codeSnippet: 'EC-COUNCIL // CEH v12 (STATUS: IN PROGRESS)',
  },
];
