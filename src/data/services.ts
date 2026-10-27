import type { Service, ServiceId, ServicePricing } from "@/types/content";

/**
 * SERVICES
 * ------------------------------------------------------------------
 * The seven consultations offered by Aligned by Pranav. Every service
 * page, landing page, card and menu item is generated from this file.
 *
 * Writing rules (please keep when editing):
 *  - Describe what is explored; never promise outcomes (success, wealth,
 *    healing, luck, personality prediction or transformation).
 *  - Do not describe graphology or symbolic practice as scientific,
 *    medical or psychological assessment.
 *  - Only add prices, durations, formats and deliverables Pranav has confirmed.
 */

/** Pricing starts fully unconfirmed. Replace `null` values once Pranav confirms them. */
const unconfirmedPricing: ServicePricing = {
  startingPriceINR: null,
  startingPriceEUR: null,
  format: null,
  duration: null,
  deliverables: null,
  notes: null,
};

export const services: Service[] = [
  {
    id: "signature-handwriting-analysis",
    slug: "signature-handwriting-analysis",
    number: "01",
    title: "Signature & Handwriting Analysis",
    shortTitle: "Signature Analysis",
    oneLiner: "A personal look at how you sign and write, and what your writing expresses.",
    intro:
      "Your signature is one of the few marks you make almost every day. In this consultation, Pranav studies your signature and handwriting with you, looking at their forms, rhythm and spacing, and discusses what they may express from a graphologist’s perspective. Where you wish, the conversation can move on to refining your signature.",
    pullQuote:
      "A signature is a small, habitual act of self-expression. Looking at it closely is a way of looking at how you present yourself.",
    whyChoose: [
      "You are curious about what your handwriting and signature may express.",
      "You are considering refining or redesigning the way you sign.",
      "You would like a personal, graphology-based perspective rather than a generic online quiz.",
      "There are writing habits you would like to understand, or change.",
    ],
    explores: [
      {
        title: "Signature analysis",
        description: "A close look at your current signature: its letterforms, direction, size and overall flow.",
      },
      {
        title: "Handwriting analysis",
        description: "The characteristics of your everyday writing, such as slant, spacing, margins and rhythm.",
      },
      {
        title: "Signature refinement and correction",
        description: "If you ask for it, considered suggestions for refining or reworking your signature.",
      },
      {
        title: "Writing characteristics",
        description: "The individual habits that make your handwriting recognisably yours.",
      },
      {
        title: "Personal expression through writing",
        description: "A conversation about how the way you write relates to how you present yourself.",
      },
      {
        title: "Personalised handwriting guidance",
        description: "Individual pointers you can apply to your own writing, at your own pace.",
      },
    ],
    relevantFor: [
      "Individuals curious about their handwriting",
      "Professionals who sign documents every day",
      "Anyone designing or changing a signature",
      "People who enjoy reflective, self-awareness conversations",
    ],
    process: [
      {
        title: "Tell Pranav what interests you",
        description: "Send a short WhatsApp message saying whether you are interested in your signature, your handwriting, or both.",
      },
      {
        title: "Wait for guidance before sharing samples",
        description: "Pranav will explain what he needs from you and how it will be used. Please don’t send signed documents.",
      },
      {
        title: "Consult with Pranav",
        description: "Pranav talks you through his observations and answers your questions.",
      },
    ],
    preparation: null,
    pricing: unconfirmedPricing,
    faqs: [
      {
        question: "Is graphology a scientific or psychological test?",
        answer:
          "No. Graphology is an interpretive practice. Pranav’s observations are offered as a perspective for reflection. They are not a scientific measurement, a psychological assessment or a diagnosis.",
        reviewedByPranav: false,
      },
      {
        question: "Can Pranav help me change my signature?",
        answer:
          "Signature refinement and correction is one of the areas Pranav consults on. Whether, and how, you change your signature is always your own decision.",
        reviewedByPranav: false,
      },
      {
        question: "Should I send my signature straight away on WhatsApp?",
        answer:
          "Please begin with a short message. Pranav will explain what he needs and how it will be handled before you share anything. Never send signed documents, cheques, or anything showing account or ID numbers.",
        reviewedByPranav: false,
      },
    ],
    related: ["business-logo-analysis", "vision-board-alignment", "phone-number-alignment"],
    illustration: "signature",
    image: null,
    careNote: null,
    seo: {
      title: "Signature & Handwriting Analysis Consultation",
      description:
        "A personalised graphology consultation with Pranav Vibhute: signature analysis, handwriting analysis and signature refinement. Enquire on WhatsApp from India or Europe.",
    },
  },
  {
    id: "business-logo-analysis",
    slug: "business-logo-analysis",
    number: "02",
    title: "Business Logo Analysis & Design",
    shortTitle: "Logo Analysis",
    oneLiner: "A considered review of your logo’s colours, shapes, symbols and balance.",
    intro:
      "A logo is often the first thing people see of a business. Pranav looks at your existing logo, including its colours, composition, shapes and symbols, and discusses both its visual balance and its symbolic reading. If you are looking for change, the consultation can extend to corrective design and refinement.",
    pullQuote:
      "Every mark a business chooses carries colour, form and symbol. This consultation looks at all three together.",
    whyChoose: [
      "You are launching a business and want a second look at your logo before it goes to print.",
      "Your current logo feels slightly out of balance and you would like to understand why.",
      "You want a symbolic perspective alongside a visual one.",
      "You are considering a refinement that keeps what people already recognise.",
    ],
    explores: [
      {
        title: "Existing logo review",
        description: "An overall reading of your current logo as it is used today.",
      },
      {
        title: "Colour and composition",
        description: "How the colours relate to one another and how the elements are arranged.",
      },
      {
        title: "Shapes and symbols",
        description: "The forms within your logo and the symbolic associations they carry.",
      },
      {
        title: "Visual balance",
        description: "Weight, spacing and proportion, and how steady the logo feels at a glance.",
      },
      {
        title: "Symbolic interpretation",
        description: "Pranav’s interpretation of what the logo communicates as a whole.",
      },
      {
        title: "Corrective design and refinement",
        description: "Where appropriate, suggestions for correcting or refining the existing design.",
      },
    ],
    relevantFor: [
      "Founders and business owners",
      "New ventures finalising their identity",
      "Established businesses considering a refresh",
      "Teams who want a symbolic perspective on their brand mark",
    ],
    process: [
      {
        title: "Introduce your business",
        description: "Send a WhatsApp message with your business name and what you would like reviewed.",
      },
      {
        title: "Share your logo when asked",
        description: "Pranav will let you know which version or file of your logo is most useful.",
      },
      {
        title: "Review and recommendations",
        description: "Pranav discusses his observations. If you choose corrective design or refinement, the scope is agreed with you first.",
      },
    ],
    preparation: null,
    pricing: unconfirmedPricing,
    faqs: [
      {
        question: "Will a corrected logo guarantee better business results?",
        answer:
          "No. A logo can be reviewed for its visual and symbolic qualities, but no design can guarantee commercial outcomes. Business results depend on many factors beyond a logo.",
        reviewedByPranav: false,
      },
      {
        question: "What does the logo consultation cover?",
        answer:
          "It covers the review of an existing logo (colour, composition, shapes, symbols and visual balance), its symbolic interpretation, and corrective design or refinement. If you need something different, ask Pranav on WhatsApp.",
        reviewedByPranav: false,
      },
      {
        question: "What should I send first?",
        answer:
          "Begin with a short message describing your business. Pranav will tell you what to send and in which format.",
        reviewedByPranav: false,
      },
    ],
    related: ["signature-handwriting-analysis", "business-office-clock-alignment", "phone-number-alignment"],
    illustration: "logo",
    image: null,
    careNote: null,
    seo: {
      title: "Business Logo Analysis & Corrective Logo Design",
      description:
        "Business logo analysis with Pranav Vibhute: colour, composition, shapes, symbols and visual balance, with corrective logo design and refinement. Enquire on WhatsApp.",
    },
  },
  {
    id: "wristwatch-clock-alignment",
    slug: "wristwatch-clock-alignment",
    number: "03",
    title: "Wristwatch & Clock Alignment",
    shortTitle: "Wristwatch Alignment",
    oneLiner: "Personal recommendations on choosing a wristwatch, and on everyday clocks.",
    intro:
      "A wristwatch is one of the few objects many people wear every day. This consultation offers Pranav’s personal recommendations on selecting a watch and its characteristics, alongside your everyday preferences around clocks, all viewed through his symbolic alignment approach.",
    pullQuote: "The objects we wear every day can be chosen with intention, not only habit.",
    whyChoose: [
      "You are about to choose a new watch and would value a considered perspective.",
      "You are curious about the symbolic side of the watches you wear.",
      "You prefer individual recommendations to trends and advertising.",
      "You would like the objects you use every day to feel more intentional.",
    ],
    explores: [
      {
        title: "Personal wristwatch selection",
        description: "Thinking through the choice of a watch that is right for you.",
      },
      {
        title: "Watch characteristics",
        description: "Features you might weigh up, such as shape, dial, colour and strap.",
      },
      {
        title: "Everyday clock preferences",
        description: "The clocks you live with day to day, and your preferences around them.",
      },
      {
        title: "Personal alignment consultation",
        description: "A conversation about how these choices sit with your own intentions.",
      },
      {
        title: "Individual recommendations",
        description: "Pranav’s recommendations, given for you rather than for everyone.",
      },
    ],
    relevantFor: [
      "People choosing a watch for themselves",
      "Watch wearers curious about a symbolic perspective",
      "Anyone reconsidering everyday clocks at home",
    ],
    process: [
      {
        title: "Describe what you are deciding",
        description: "Tell Pranav whether you are choosing a new watch, thinking about everyday clocks, or both.",
      },
      {
        title: "Answer a few questions",
        description: "Pranav will ask for the details he needs to understand your preferences.",
      },
      {
        title: "Receive personal recommendations",
        description: "Pranav shares his individual recommendations and the reasoning behind them.",
      },
    ],
    preparation: null,
    pricing: unconfirmedPricing,
    faqs: [
      {
        question: "Will a particular watch bring luck or success?",
        answer:
          "No such promise is made. Recommendations offer a symbolic, personal perspective to help you choose with intention. They are not predictions.",
        reviewedByPranav: false,
      },
      {
        question: "Does Aligned by Pranav sell watches or clocks?",
        answer:
          "No products are sold through this website. The consultation offers guidance; any purchase decision is entirely yours.",
        reviewedByPranav: false,
      },
      {
        question: "Can we talk about watches I already own?",
        answer:
          "Mention them in your first message. Pranav will explain how the consultation can take your existing watches into account.",
        reviewedByPranav: false,
      },
    ],
    related: ["business-office-clock-alignment", "phone-number-alignment", "vision-board-alignment"],
    illustration: "wristwatch",
    image: null,
    careNote: null,
    seo: {
      title: "Wristwatch Alignment & Watch Selection Consultation",
      description:
        "Personal wristwatch selection and everyday clock preferences, explored through Pranav Vibhute’s symbolic alignment approach. Individual recommendations via WhatsApp.",
    },
  },
  {
    id: "business-office-clock-alignment",
    slug: "business-office-clock-alignment",
    number: "04",
    title: "Business & Office Clock Alignment",
    shortTitle: "Office Clock Alignment",
    oneLiner: "Thoughtful selection and placement of clocks in your workplace.",
    intro:
      "In many workplaces a clock hangs on the wall for years without a second thought. This consultation looks at office and workplace clocks, including which clocks are chosen, where they are placed and how they sit within the wider workspace, through Pranav’s symbolic alignment approach.",
    pullQuote:
      "A workplace is shaped by many small decisions. The clock on the wall is one worth making deliberately.",
    whyChoose: [
      "You are setting up, moving or refitting an office.",
      "You are rearranging a workspace and want to place clocks thoughtfully.",
      "You would like symbolic considerations to be part of your fit-out decisions.",
      "You are unsure which clock suits the space you work in.",
    ],
    explores: [
      {
        title: "Office clocks",
        description: "The clocks currently used across your workplace.",
      },
      {
        title: "Workplace clock selection",
        description: "Considerations for choosing clocks suited to your space.",
      },
      {
        title: "Clock positioning",
        description: "Where clocks are placed, and how that placement sits within the room.",
      },
      {
        title: "Workspace considerations",
        description: "The layout and character of the workspace around them.",
      },
      {
        title: "Symbolic alignment of office environments",
        description: "Pranav’s symbolic reading of the workspace as a whole.",
      },
    ],
    relevantFor: [
      "Business owners opening or moving premises",
      "Office and facilities managers",
      "Studios, shops and practices arranging a workspace",
      "Professionals with a dedicated home office",
    ],
    process: [
      {
        title: "Tell Pranav about your workspace",
        description: "A short WhatsApp message describing the type of workplace and what you would like reviewed.",
      },
      {
        title: "Share what Pranav asks for",
        description: "Pranav will let you know which details about the space are helpful.",
      },
      {
        title: "Discuss recommendations",
        description: "Pranav talks you through clock selection and positioning for your workspace.",
      },
    ],
    preparation: null,
    pricing: unconfirmedPricing,
    faqs: [
      {
        question: "Will clock alignment improve productivity or revenue?",
        answer:
          "No measurable business outcome is promised. The consultation offers a symbolic perspective on clock choice and placement as part of arranging your workspace thoughtfully.",
        reviewedByPranav: false,
      },
      {
        question: "Does Pranav visit the workplace?",
        answer:
          "Consultation format varies by service and location. Ask on WhatsApp which format is possible for your workplace.",
        reviewedByPranav: false,
      },
    ],
    related: ["wristwatch-clock-alignment", "business-logo-analysis", "phone-number-alignment"],
    illustration: "office-clock",
    image: null,
    careNote: null,
    seo: {
      title: "Office Clock Alignment for Businesses & Workspaces",
      description:
        "Business and office clock alignment with Pranav Vibhute: workplace clock selection, clock positioning and the symbolic alignment of office environments.",
    },
  },
  {
    id: "phone-number-alignment",
    slug: "phone-number-alignment",
    number: "05",
    title: "Phone Number Selection & Alignment",
    shortTitle: "Phone Number Alignment",
    oneLiner: "Perspective on choosing or reviewing personal and business phone numbers.",
    intro:
      "Phone numbers are chosen once and then shared for years. Pranav reviews numbers you already use, or helps you consider new ones, by looking at their patterns and offering personalised recommendations, for personal mobiles and business lines alike.",
    pullQuote: "A number you will share for years deserves a moment of consideration before you choose it.",
    whyChoose: [
      "You are choosing between several available numbers.",
      "You are setting up a dedicated business line.",
      "You are curious about the patterns in a number you already use.",
      "You would like a personal recommendation rather than a generic calculator.",
    ],
    explores: [
      {
        title: "Personal mobile numbers",
        description: "Numbers you use personally, now or in future.",
      },
      {
        title: "Business phone numbers",
        description: "Lines your customers, clients or suppliers will call.",
      },
      {
        title: "Existing number analysis",
        description: "A considered look at a number you already have.",
      },
      {
        title: "Number selection",
        description: "Comparing the options available to you before you commit.",
      },
      {
        title: "Number patterns",
        description: "The sequences and repetitions within a number.",
      },
      {
        title: "Personalised recommendations",
        description: "Pranav’s recommendation, made for your circumstances.",
      },
    ],
    relevantFor: [
      "Individuals choosing a new mobile number",
      "Business owners setting up a customer line",
      "Anyone weighing several available numbers",
    ],
    process: [
      {
        title: "Say whether it is personal or business",
        description: "Tell Pranav whether you are reviewing an existing number or choosing a new one.",
      },
      {
        title: "Share options when asked",
        description: "Pranav will tell you what to send. Share numbers only within your conversation with him.",
      },
      {
        title: "Talk through the recommendation",
        description: "Pranav explains the patterns he observes and his personalised recommendation.",
      },
    ],
    preparation: null,
    pricing: unconfirmedPricing,
    faqs: [
      {
        question: "Can a phone number make me more successful?",
        answer:
          "No such claim is made. The consultation offers a symbolic and personal perspective on number patterns. It does not predict or guarantee personal, financial or business outcomes.",
        reviewedByPranav: false,
      },
      {
        question: "Can Pranav obtain a specific number for me?",
        answer:
          "No. Phone numbers are issued by telecom providers. Pranav can consider the options that are available to you.",
        reviewedByPranav: false,
      },
      {
        question: "Does this website record my number or message?",
        answer:
          "No. The website has no forms. When you tap a WhatsApp button, your message is written and sent by you inside WhatsApp, and the website’s analytics (if you allow it) never sees the content of that conversation.",
        reviewedByPranav: false,
      },
    ],
    related: ["wristwatch-clock-alignment", "business-logo-analysis", "signature-handwriting-analysis"],
    illustration: "phone-number",
    image: null,
    careNote: null,
    seo: {
      title: "Phone Number Selection & Alignment Consultation",
      description:
        "Personal and business phone number selection with Pranav Vibhute: existing number analysis, number patterns and personalised recommendations. Enquire on WhatsApp.",
    },
  },
  {
    id: "drawing-analysis",
    slug: "drawing-analysis",
    number: "06",
    title: "Drawing Analysis",
    shortTitle: "Drawing Analysis",
    oneLiner: "A reflective conversation about drawings, including children’s drawings.",
    intro:
      "Drawings can open conversations that words sometimes do not. Pranav looks at drawings by individuals and families, including children’s drawings, and discusses the visual patterns he observes as a starting point for reflection and for conversations between parents and children.",
    pullQuote: "A drawing is an invitation to talk, not a test to pass.",
    whyChoose: [
      "You love your child’s drawings and want new ways to talk about them together.",
      "You are looking for a creative, shared activity as a family.",
      "You draw yourself and are curious about your own creative expression.",
      "You would like a gentle, reflective perspective rather than a verdict.",
    ],
    explores: [
      {
        title: "Drawings from individuals and families",
        description: "Drawings by adults, children or a whole family.",
      },
      {
        title: "Children’s drawings",
        description: "A gentle look at drawings made by children, shared by a parent or caregiver.",
      },
      {
        title: "Creative expression",
        description: "Colour, line, scale and the choices made on the page.",
      },
      {
        title: "Reflective interpretation",
        description: "Pranav’s interpretation, offered as something to reflect on rather than a conclusion.",
      },
      {
        title: "Parent–child discussion",
        description: "Ideas for opening relaxed conversations with your child about what they made.",
      },
      {
        title: "Observed visual patterns",
        description: "Recurring shapes, colours and themes across a drawing or a set of drawings.",
      },
    ],
    relevantFor: [
      "Parents and caregivers",
      "Families looking for a shared creative conversation",
      "Adults interested in their own drawings",
    ],
    process: [
      {
        title: "Start with a short message",
        description: "Tell Pranav whose drawings you would like to discuss. Please don’t send any drawings yet.",
      },
      {
        title: "Agree how drawings will be shared",
        description: "Pranav will explain what he needs, how it will be used and how it will be kept private.",
      },
      {
        title: "A reflective conversation",
        description: "Pranav shares his observations as prompts for reflection and discussion.",
      },
    ],
    preparation: null,
    pricing: unconfirmedPricing,
    faqs: [
      {
        question: "Can drawing analysis tell me whether something is wrong with my child?",
        answer:
          "No. Drawing analysis cannot diagnose or assess a child’s mental health, development or wellbeing. If you have any concern about a child, please speak to a qualified professional such as a paediatrician, child psychologist or counsellor.",
        reviewedByPranav: false,
      },
      {
        question: "How should I share my child’s drawing?",
        answer:
          "Only after Pranav has explained how it will be used and kept. Avoid including your child’s full name, school, photographs or other identifying details. This website does not collect drawings.",
        reviewedByPranav: false,
      },
    ],
    related: ["vision-board-alignment", "signature-handwriting-analysis", "business-logo-analysis"],
    illustration: "drawing",
    image: null,
    careNote:
      "Drawing analysis is reflective and interpretive. It is not a psychological assessment and cannot diagnose or rule out any developmental, emotional or mental-health condition. If you are concerned about a child’s wellbeing, please consult a qualified professional. Please do not send a child’s drawing or any identifying details until Pranav has explained how they will be used and kept private.",
    seo: {
      title: "Drawing Analysis Consultation, Including Children’s Drawings",
      description:
        "A reflective drawing analysis consultation with Pranav Vibhute for individuals and families, including children’s drawings. Interpretive, not diagnostic.",
    },
  },
  {
    id: "vision-board-alignment",
    slug: "vision-board-alignment",
    number: "07",
    title: "Vision Board Alignment",
    shortTitle: "Vision Board Alignment",
    oneLiner: "Create or revisit a vision board around your goals and priorities.",
    intro:
      "A vision board gathers images and words around the things you want to move towards. Pranav works with you to create a new vision board or review an existing one, looking at your goals and priorities, its symbolic elements, and how the board as a whole reflects your intentions.",
    pullQuote: "The point of a vision board is not the board. It is the clarity you find while making it.",
    whyChoose: [
      "You are beginning a new year, role or chapter.",
      "Your existing board no longer feels like yours.",
      "You would like guided reflection rather than doing it alone.",
      "You are curious about the symbolism of the images you are drawn to.",
    ],
    explores: [
      {
        title: "Vision-board creation",
        description: "Building a new board, from first ideas to a finished arrangement.",
      },
      {
        title: "Review of existing vision boards",
        description: "Looking again at a board you have already made.",
      },
      {
        title: "Goals and intentions",
        description: "Clarifying what you would like the board to hold.",
      },
      {
        title: "Personal priorities",
        description: "Deciding what matters most, and what can wait.",
      },
      {
        title: "Symbolic alignment",
        description: "How the images, colours and words on the board work together.",
      },
      {
        title: "Guided reflection",
        description: "Questions and prompts to help you think it through.",
      },
    ],
    relevantFor: [
      "Anyone starting a new chapter",
      "People who already keep a vision board",
      "Those who prefer to reflect with guidance",
    ],
    process: [
      {
        title: "Share where you are starting from",
        description: "Tell Pranav whether you want to create a new board or review an existing one.",
      },
      {
        title: "Gather your thoughts",
        description: "Pranav will let you know anything that would be useful to have ready.",
      },
      {
        title: "Reflect together",
        description: "A guided conversation around your goals, priorities and the board itself.",
      },
    ],
    preparation: null,
    pricing: unconfirmedPricing,
    faqs: [
      {
        question: "Will a vision board make my goals happen?",
        answer:
          "No. A vision board is a tool for reflection and focus. The consultation does not promise that any goal will be achieved.",
        reviewedByPranav: false,
      },
      {
        question: "Do I need to make a board before the consultation?",
        answer:
          "No. The consultation covers both creating a new vision board and reviewing one you already have.",
        reviewedByPranav: false,
      },
    ],
    related: ["drawing-analysis", "signature-handwriting-analysis", "wristwatch-clock-alignment"],
    illustration: "vision-board",
    image: null,
    careNote: null,
    seo: {
      title: "Vision Board Alignment Consultation",
      description:
        "Create a new vision board or review an existing one with Pranav Vibhute: goals, intentions, personal priorities and symbolic alignment through guided reflection.",
    },
  },
];

export function getService(id: string): Service | undefined {
  return services.find((service) => service.slug === id);
}

export function getServiceOrThrow(id: ServiceId): Service {
  const service = getService(id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}

export function getRelatedServices(service: Service): Service[] {
  return service.related.map(getServiceOrThrow);
}
