
// Mock emails data

export const mockEmails = [
  {
    id: "email-001",
    sender: "AXA Insurance",
    senderEmail: "quotes@axa-gulf.com",
    subject: "Motor Quote for Nissan Patrol – Urgent",
    receivedTime: "2h ago",
    detectedType: "Quote Request",
    clientMatch: "TITAN GROUP",
    suggestedAction: "Create a new motor quote enquiry for Nissan Patrol (2022) for TITAN GROUP",
    status: "Unlinked",
    unread: true,
    content: "Dear Broker,\n\nWe hope this email finds you well.\n\nWe are writing to request a motor insurance quote for a Nissan Patrol (2022) that we've recently acquired for our company fleet. We require comprehensive coverage with the following details:\n\n- Vehicle: Nissan Patrol XE 2022\n- Value: AED 270,000\n- Driver: Multiple company drivers\n- Coverage: Comprehensive\n- Start Date: July 1, 2023\n\nPlease provide us with your most competitive rates at your earliest convenience. We would appreciate receiving the quote within the next 24 hours as this is urgent.\n\nThank you for your assistance.\n\nBest regards,\nMohammed Al Mansoori\nFleet Manager, TITAN GROUP",
    attachments: [
      {
        name: "Nissan_Patrol_Registration.pdf",
        type: "application/pdf",
        size: "1.2 MB"
      },
      {
        name: "Driver_License_Scan.jpg",
        type: "image/jpeg",
        size: "842 KB"
      },
      {
        name: "Vehicle_Photos.zip",
        type: "application/zip",
        size: "5.7 MB"
      }
    ],
    aiSummary: "This email is a motor quote request for a corporate vehicle (Nissan Patrol 2022) with 3 documents attached. Client is linked to TITAN GROUP.",
    priority: "high"
  },
  {
    id: "email-002",
    sender: "Sarah Johnson",
    senderEmail: "sjohnson@gulfenterprises.ae",
    subject: "Renewal of Group Health Insurance Policy #MED-45892",
    receivedTime: "6h ago",
    detectedType: "Renewal",
    clientMatch: "Gulf Enterprises LLC",
    suggestedAction: "Process renewal for Policy #MED-45892 (Gulf Enterprises Group Medical)",
    status: "Unlinked",
    unread: true,
    content: "Hello,\n\nI hope you're doing well. I'm writing regarding our group health insurance policy (Policy #MED-45892) which is due for renewal next month.\n\nWe'd like to proceed with the renewal process but would appreciate if you could review our current coverage and advise if there are any enhancements available this year within the same budget range.\n\nOur team has grown by approximately 5% since last year, so we'll need to add a few new members to the policy as well.\n\nPlease let me know what information you need from our side to proceed with the renewal.\n\nThank you,\nSarah Johnson\nHR Director\nGulf Enterprises LLC",
    attachments: [
      {
        name: "Current_Policy_Summary.pdf",
        type: "application/pdf",
        size: "783 KB"
      },
      {
        name: "Updated_Employee_List.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: "256 KB"
      }
    ],
    aiSummary: "This is a renewal request for Gulf Enterprises' group health insurance policy #MED-45892. They've grown by 5% and want to review coverage enhancements within the same budget.",
    priority: "medium"
  },
  {
    id: "email-003",
    sender: "Rashid Al Maktoum",
    senderEmail: "rashid.almaktoum@beachresort-dubai.com",
    subject: "Water Damage Claim - Beach Resort Property",
    receivedTime: "Yesterday",
    detectedType: "Claim",
    clientMatch: "Dubai Beach Resorts LLC",
    suggestedAction: "Create new property damage claim for Dubai Beach Resorts LLC (Policy #PROP-789012)",
    status: "In Progress",
    unread: false,
    content: "Dear Insurance Team,\n\nI am writing to report water damage at our resort property covered under Policy #PROP-789012.\n\nYesterday evening, a pipe burst in the main building's east wing, causing significant water damage to 5 guest rooms and the adjacent corridor. We have temporarily closed this section of the resort and relocated affected guests.\n\nOur maintenance team has stopped the leak and begun drying out the affected areas. Initial assessment suggests damage to:\n- Carpeting and flooring\n- Wall coverings\n- Some furniture pieces\n- Electrical outlets in two rooms\n\nI've attached photos of the damage and our incident report. Please advise on next steps for our claim.\n\nRegards,\nRashid Al Maktoum\nOperations Manager\nDubai Beach Resort",
    attachments: [
      {
        name: "Water_Damage_Photos.zip",
        type: "application/zip",
        size: "6.8 MB"
      },
      {
        name: "Incident_Report.pdf",
        type: "application/pdf",
        size: "1.5 MB"
      },
      {
        name: "Repair_Estimate.pdf",
        type: "application/pdf",
        size: "2.3 MB"
      }
    ],
    aiSummary: "This is a property damage claim for Dubai Beach Resorts LLC due to a burst pipe causing water damage to 5 guest rooms. Initial assessment and photos are attached.",
    priority: "high"
  },
  {
    id: "email-004",
    sender: "Ahmed Al Falasi",
    senderEmail: "ahmed@falconlogistics.ae",
    subject: "Requesting Quote for Fleet Insurance",
    receivedTime: "1d ago",
    detectedType: "Quote Request",
    clientMatch: "Falcon Logistics",
    suggestedAction: "Create new commercial fleet quote for Falcon Logistics (10 vehicles)",
    status: "Unlinked",
    unread: true,
    content: "Hello,\n\nMy name is Ahmed Al Falasi, Fleet Manager at Falcon Logistics. We are looking to insure our commercial fleet of 10 vehicles and would like to request a quote.\n\nOur fleet consists of:\n- 6 Toyota Hiace Vans (2021-2022 models)\n- 3 Mitsubishi Canter Light Trucks (2021 models)\n- 1 Mercedes Sprinter (2022 model)\n\nWe require comprehensive coverage with roadside assistance and replacement vehicle options.\n\nPlease let me know what additional information you need to provide a quote.\n\nBest regards,\nAhmed Al Falasi\nFleet Manager\nFalcon Logistics",
    attachments: [
      {
        name: "Vehicle_List_Details.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: "342 KB"
      }
    ],
    aiSummary: "Fleet insurance quote request from Falcon Logistics for 10 commercial vehicles (6 vans, 3 light trucks, 1 sprinter) with comprehensive coverage requirements.",
    priority: "medium"
  },
  {
    id: "email-005",
    sender: "James Wilson",
    senderEmail: "jwilson@morningstar-investments.com",
    subject: "Complaint: Delayed Claim Settlement - Policy #LF-675432",
    receivedTime: "2d ago",
    detectedType: "Complaint",
    clientMatch: "Morningstar Investments",
    suggestedAction: "Escalate complaint regarding delayed life insurance claim settlement for policy #LF-675432",
    status: "Unlinked",
    unread: false,
    content: "To Whom It May Concern,\n\nI am writing to express my extreme dissatisfaction with the handling of our recent claim under Policy #LF-675432.\n\nIt has been over 60 days since we submitted all requested documentation for our employee's life insurance claim, and despite multiple follow-ups, we have received no clear explanation for the continued delay.\n\nThe deceased employee's family is facing financial hardship and this delay is causing significant distress. When we purchased this group policy, we were assured claims would be processed within 30 days maximum.\n\nI request immediate attention to this matter and expect the claim to be processed within the next 5 business days, along with an explanation for the extraordinary delay.\n\nSincerely,\nJames Wilson\nHR Director\nMorningstar Investments",
    attachments: [],
    aiSummary: "This is a complaint from Morningstar Investments regarding a 60+ day delay in processing a life insurance claim (Policy #LF-675432) for an employee's family facing financial hardship.",
    priority: "high"
  },
  {
    id: "email-006",
    sender: "Emirates Insurance Co.",
    senderEmail: "certificates@emiratesinsurance.ae",
    subject: "Motor Certificate of Insurance - Policy #MOT-982341",
    receivedTime: "2d ago",
    detectedType: "Unknown",
    clientMatch: null,
    suggestedAction: "Link to appropriate client and file insurance certificate",
    status: "Done",
    unread: false,
    content: "Dear Valued Partner,\n\nPlease find attached the Certificate of Insurance for Motor Policy #MOT-982341 issued on May 19, 2023.\n\nPolicy Details:\n- Policy Number: MOT-982341\n- Policyholder: Al Nasr General Trading\n- Vehicle: Toyota Land Cruiser (2022)\n- Policy Period: May 21, 2023 - May 20, 2024\n\nPlease forward this certificate to your client at your earliest convenience.\n\nThank you for your business.\n\nRegards,\nCertificates Department\nEmirates Insurance Co.",
    attachments: [
      {
        name: "Insurance_Certificate_MOT-982341.pdf",
        type: "application/pdf",
        size: "568 KB"
      }
    ],
    aiSummary: "This email contains a motor insurance certificate for Al Nasr General Trading's Toyota Land Cruiser (Policy #MOT-982341) with coverage from May 21, 2023 to May 20, 2024.",
    priority: "low"
  },
  {
    id: "email-007",
    sender: "Fatima Ali",
    senderEmail: "fatima@desertrose-investments.ae",
    subject: "NCD Certificate Request",
    receivedTime: "3d ago",
    detectedType: "Unknown",
    clientMatch: "Desert Rose Investments",
    suggestedAction: "Generate No Claims Discount Certificate for Fatima Ali (Desert Rose Investments)",
    status: "Done",
    unread: false,
    content: "Dear Broker,\n\nI hope this email finds you well.\n\nI am writing to request a No Claims Discount (NCD) Certificate for my motor insurance policy #MV-567890. I need this document as I'm considering switching insurers for my next renewal.\n\nMy policy details are:\n- Policy Number: MV-567890\n- Vehicle: BMW X5 (2020)\n- Policy Expiry: June 30, 2023\n\nI would appreciate if you could provide this certificate at your earliest convenience, preferably by email.\n\nThank you for your assistance.\n\nBest regards,\nFatima Ali\nFinance Director\nDesert Rose Investments",
    attachments: [],
    aiSummary: "This is a request from Fatima Ali (Desert Rose Investments) for a No Claims Discount Certificate for her BMW X5 motor insurance policy #MV-567890 expiring June 30, 2023.",
    priority: "low"
  }
];
