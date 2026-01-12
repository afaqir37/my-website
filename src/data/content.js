export const personalInfo = {
  name: "Abdellah Faqir",
  email: "faqiirabdellah@gmail.com",
  github: "https://github.com/afaqir37",
  linkedin: "https://www.linkedin.com/in/faqir-abdellah-a4300025b/",
};

export const introText = {
  headline: `Hey, I'm Abdellah. <br>I build <span class="highlight">production systems</span>.`,
  description: `Three years at <strong>42</strong> building from first principles: memory allocators, shells, game engines, networked applications.
    Then full-stack engineer at two marketplace startups, architecting real-time geolocation, payment infrastructure, and distributed state management.`,
};

export const projects = [
{
  title: "WashMinute",
  logo: "/assets/logo-dark.png",
  meta: "Two-sided marketplace · Morocco · In Production",
  description: `On-demand car wash platform connecting customers with service providers across Morocco.
    Two-sided mobile application handling customer bookings and provider workflows.
    Real-time matching, payment processing, and state synchronization at scale.`,
  intro: null,
  challenges: [
    {
      title: "Geolocation at scale",
      hook: "PostGIS spatial queries with progressive radius search. Sub-100ms matching with GIST indexes. Eliminated client-side battery drain from constant polling.",
    },
    {
      title: "Payment infrastructure",
      hook: "Integrated Morocco's NAPS payment gateway with RSA-2048 encryption and OAuth-style token exchange. WebView-based payment flow with deep linking for seamless return to the app.",
    },
    {
      title: "Real-time state management",
      hook: "WebSocket architecture for booking updates, live chat, and location tracking. Room-based isolation with automatic cleanup to prevent memory leaks.",
    },
  ],
  tech: "React Native · TypeScript · Node.js · PostgreSQL/PostGIS · Socket.IO · AWS Cognito · S3 · NAPS Gateway",
  caseStudyLink: "/washminute"
},
  // {
  //   title: "Cardnd",
  //   meta: "Car rental mobile app · Sole Engineer · 2024",
  //   description: `Mobile application for a car rental startup. Complete technical build: 
  //     booking flows, authentication with Apple and Google, payment integration with NAPS, 
  //     push notifications via BullMQ and Redis, fleet management tools for operations.`,
  //   tech: "Built with React Native, Expo, Node.js, MongoDB, BullMQ, Redis",
  // },
];

export const fortyTwoIntro = `I studied at 42 (1337 in Morocco) — a peer-to-peer programming school with no teachers, 
  no lectures, no textbooks. Just projects, deadlines, and code reviews from other students. 
  Three years of building everything from first principles.`;

export const fortyTwoProjects = [
  {
    num: "00",
    name: "The Beginning",
    phase: "Piscine",
    status: "✓ Survived",
    description: "26 days of intensive C. 14-hour days. Weekly exams. The filter.",
    skills: [],
    outcome: "→ Admitted to 42",
    type: "start",
  },
  {
    num: "01",
    name: "Libft",
    phase: "Phase 1",
    status: "✓ 125/100",
    description: "Rebuilt the C standard library from scratch.",
    skills: ["C", "Memory", "Data Structures"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/libft/en.subject.pdf",
  },
  {
    num: "02",
    name: "ft_printf",
    phase: "Phase 1",
    status: "✓ 100/100",
    description: "Recreated printf with variadic functions.",
    skills: ["Variadic Args", "Parsing"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/ft_printf/en.subject.pdf",
  },
  {
    num: "03",
    name: "get_next_line",
    phase: "Phase 1",
    status: "✓ 125/100",
    description: "Read files line by line with one static variable.",
    skills: ["File I/O", "Buffers"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/get_next_line/en.subject.pdf",
  },
  {
    num: "04",
    name: "Born2beroot",
    phase: "Phase 1",
    status: "✓ 100/100",
    description: "Linux server from scratch. SSH, firewalls, policies.",
    skills: ["Linux", "Sysadmin"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/Born2beroot/en.subject.pdf",
  },
  {
    num: "05",
    name: "push_swap",
    phase: "Phase 2",
    status: "✓ 100/100",
    description: "Sort a stack with limited operations in minimal moves.",
    skills: ["Algorithms", "Optimization"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/push_swap/en.subject.pdf",
  },
  {
    num: "06",
    name: "minitalk",
    phase: "Phase 2",
    status: "✓ 125/100",
    description: "Client-server using only UNIX signals.",
    skills: ["Signals", "Bitwise"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/minitalk/en.subject.pdf",
  },
  {
    num: "07",
    name: "so_long",
    phase: "Phase 2",
    status: "✓ 100/100",
    description: "2D game with MiniLibX. Sprites and movement.",
    skills: ["Graphics", "Game Dev"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/so_long/en.subject.pdf",
  },
  {
    num: "08",
    name: "Philosophers",
    phase: "Phase 3",
    status: "✓ 100/100",
    description: "Dining philosophers. Threads, mutexes, deadlocks.",
    skills: ["Threading", "Concurrency"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/philosophers/en.subject.pdf",
  },
  {
    num: "09",
    name: "minishell",
    phase: "Phase 3",
    status: "✓ 101/100",
    description: "Bash from scratch. Lexer, parser, pipes, redirections, signals.",
    skills: ["Parsing", "Processes", "Signals"],
    type: "major",
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/minishell/en.subject.pdf",
  },
  {
    num: "10",
    name: "NetPractice",
    phase: "Phase 3",
    status: "✓ 100/100",
    description: "IP addressing, subnetting, routing tables.",
    skills: ["TCP/IP", "Networking"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/NetPractice/en.subject.pdf",
  },
  {
    num: "11",
    name: "cub3D",
    phase: "Phase 4",
    status: "✓ 105/100",
    description: "Wolfenstein-style raycaster. Game engine in pure C.",
    skills: ["Raycasting", "Math", "Graphics"],
    type: "major",
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/cub3d/en.subject.pdf",
  },
  {
    num: "12",
    name: "CPP 00-09",
    phase: "Phase 4",
    status: "✓ 100/100",
    description: "C++ from zero. OOP, templates, STL. Ten modules.",
    skills: ["C++", "OOP", "Templates"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/CPP_Modules/CPP00/en.subject.pdf",
  },
  {
    num: "13",
    name: "Inception",
    phase: "Phase 4",
    status: "✓ 100/100",
    description: "Docker infrastructure. NGINX, WordPress, MariaDB.",
    skills: ["Docker", "DevOps"],
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/inception/en.subject.pdf",
  },
  {
    num: "14",
    name: "ft_transcendence",
    phase: "Final Project",
    status: "✓ 100/100",
    description: "Full-stack web app. Real-time multiplayer Pong with auth, chat, matchmaking.",
    skills: ["TypeScript", "NestJS", "WebSockets", "PostgreSQL"],
    type: "final",
    subjectPdf: "https://cdn.jsdelivr.net/gh/Ian-Orwel/42-Cursus-Subjects@main/Cursus/ft_transcendence/en.subject.pdf",
  },
  {
    num: "∞",
    name: "Common Core Complete",
    phase: "",
    status: "",
    description: "Ready to build real products.",
    skills: [],
    outcome: "→ WashMinute & Cardnd",
    type: "end",
  },
];

export const fortyTwoStats = [
  { value: "14", label: "Projects" },
  { value: "6", label: "Exams" },
  { value: "3", label: "Years" },
];

export const caseStudy = {
  title: "WashMinute",
  subtitle: "Building a production marketplace from scratch",
  intro: `WashMinute is an on-demand car wash platform for Morocco. Customers book washes at their location,
    washmen get matched based on proximity and availability, payments happen in-app or on delivery.
    Two-sided mobile application with separate customer and provider workflows, backed by real-time infrastructure.`,
  role: "Full-Stack Engineer · 2023–2024",
  stats: [
    { value: "8,348", label: "Lines of backend code" },
    { value: "123", label: "Custom JS files" },
    { value: "23", label: "Database models" },
    { value: "27", label: "API endpoint groups" },
  ],
  sections: [
    {
      id: "architecture",
      title: "Architecture",
      intro: "The backend runs on Node.js with Express, PostgreSQL with PostGIS for geospatial queries, and Socket.IO for real-time communication. AWS Cognito handles authentication, S3 stores media, and NAPS processes payments.",
      description: "The architecture is event-driven and modular — controllers, models, services separated cleanly. Database changes go through migrations, so schema is version-controlled. Cron jobs handle subscription expiration and notification campaigns.",
      highlights: [
        "Stateless API servers for horizontal scaling",
        "Connection pooling for database efficiency",
        "Heavy assets offloaded to S3",
        "Event emitters for decoupled business logic"
      ]
    },
    {
      id: "auth",
      title: "Passwordless Authentication",
      intro: "Users sign in with just their phone number. No passwords to remember, no SMS codes to wait for.",
      approach: "AWS Cognito requires passwords internally, but users never see them. The backend generates a cryptographically secure password using crypto.randomBytes(32), creates the Cognito user, and handles all token operations server-side.",
      highlights: [
        "Lambda triggers auto-verify phone numbers without SMS",
        "JWT tokens with 15-minute access + 7-day refresh rotation",
        "Rate limiting: 5 attempts/15min (IP) + 3 attempts/hour (phone)"
      ],
      result: "Zero SMS costs. Low-barrier onboarding. Security that doesn't rely on users choosing good passwords."
    },
    {
      id: "geolocation",
      title: "Geolocation Matching",
      intro: "The core feature: match customers with nearby washmen in real-time.",
      problem: "The first attempt calculated distances on the client. Every washman's app constantly pinged the API, checking 'am I close enough to this request?' It worked in testing. In production, it drained batteries in two hours and burned through API quota in a day.",
      solution: "Moving everything server-side with PostGIS",
      highlights: [
        "ST_DWithin for radius filtering with GiST spatial indexes",
        "ST_Distance with Web Mercator projection (EPSG:3857) for accurate meters",
        "Progressive radius expansion: 5km → 10km → 15km → 20km",
        "Generated geometry columns for KNN distance ordering",
        "Stale location filtering (only washmen active in last 2 hours)"
      ],
      description: "One spatial query figures out who's nearby. Socket.IO pushes only to those devices.",
      result: "95% reduction in query time. Sub-100ms responses even with thousands of providers. 80% fewer API calls. Phones that last all day."
    },
    {
      id: "payments",
      title: "Payment Integration",
      intro: "NAPS is Morocco's national payment gateway. Integration requires RSA-2048 encryption for secure payment data transmission and OAuth-style token exchange.",
      highlights: [
        "RSA-2048 encryption for payment data using Node's crypto module",
        "MD5 MAC generation for request signing",
        "OAuth-style token exchange with 24-hour secure tokens",
        "WebView payment form embedded in the app",
        "Deep linking for seamless return: washminute://payment?status=success"
      ],
      problem: "Integrating a secure payment flow within a React Native app while maintaining smooth UX.",
      solution: "WebView-based approach with cryptographic security",
      solutionDetails: [
        "RSA public key encryption before transmission",
        "MD5 MAC signatures for request authentication",
        "Secure token management with 24-hour expiry",
        "Deep link handlers for payment completion callbacks"
      ],
      description: "The system handles saved card tokenization for one-click payments and automatic subscription renewals with washman commission tracking.",
      result: "Seamless payment flow with enterprise-grade security. Users can save cards for future bookings."
    },
    {
      id: "realtime",
      title: "Real-time Communication",
      intro: "Bookings need instant updates. Chat needs to feel like WhatsApp. Washman locations need live tracking.",
      solution: "Socket.IO with a custom room-based architecture",
      highlights: [
        "identify events map cognito_id → socket_id",
        "Room-based messaging isolates booking conversations",
        "Typing indicators with agent presence tracking",
        "Chat viewer awareness (who's looking at this conversation)",
        "Automatic reconnection with state persistence"
      ],
      problem: "Long-running Socket connections were leaking memory.",
      fix: "Proper disconnect handling, room cleanup on user departure, and socket ID mapping with automatic garbage collection.",
      result: "Handles hundreds of concurrent connections with efficient room isolation. Messages arrive instantly. No memory leaks."
    },
    {
      id: "notifications",
      title: "Push Notifications",
      intro: "Time-critical notifications need to arrive. A washman missing a booking request costs real money.",
      solution: "Expo Push Notifications",
      highlights: [
        "Multi-device support (one user can have multiple phones/tokens)",
        "Exponential backoff retry: 1s → 2s → 4s on 503 errors",
        "Batch chunking (100 per batch) to prevent rate limits",
        "High-priority delivery for time-sensitive notifications"
      ],
      description: "Weekly reminder campaigns go out to all customers (Mon/Thu/Sat at 9 AM, Africa/Casablanca timezone). The scheduler is timezone-aware — it runs at the right local time regardless of server location.",
      result: "Reliable delivery to thousands of users. No missed booking requests."
    },
    {
      id: "database",
      title: "Database Design",
      intro: "PostgreSQL with 23 models and proper relations",
      models: [
        { name: "Users", description: "clients and washmen with role-based fields" },
        { name: "Orders", description: "booking lifecycle with status tracking" },
        { name: "Messages", description: "chat history with image support" },
        { name: "Subscriptions", description: "plan management with usage counters" },
        { name: "PaymentContexts", description: "payment state machine" },
        { name: "PushTokens", description: "multi-device notification delivery" },
        { name: "SavedCards", description: "tokenized payment methods" },
        { name: "Washmen", description: "provider data with geolocation columns" }
      ],
      description: "8 migrations handle schema evolution. PostGIS extension enables spatial queries. GiST indexes on geometry columns make location queries fast.",
      note: "Denormalized where it matters: washman ratings are cached on the profile for O(1) reads instead of aggregating reviews on every request."
    },
    {
      id: "security",
      title: "Security",
      intro: "Production systems need real security, not tutorial-level auth.",
      categories: [
        {
          name: "Authentication",
          items: [
            "AWS Cognito for identity management",
            "JWT with short-lived access tokens (15 min) + refresh rotation (7 days)",
            "Rate limiting on auth endpoints"
          ]
        },
        {
          name: "Data protection",
          items: [
            "RSA encryption for payment data",
            "Environment variables for all secrets (base64 encoded private keys)",
            "SQL injection prevention via Sequelize parameterized queries",
            "Pre-signed S3 URLs (no AWS credentials exposed to clients)"
          ]
        },
        {
          name: "API security",
          items: [
            "Input validation with express-validator",
            "Request logging for audit trails",
            "Error sanitization (no stack traces to clients)",
            "CORS whitelisting"
          ]
        }
      ]
    },
    {
      id: "lessons",
      title: "What I Learned",
      lessons: [
        {
          takeaway: "Premature optimization is real, but so is premature non-optimization.",
          detail: "The client-side geolocation was 'simpler' but created a scaling wall. Sometimes you need the complex solution from the start."
        },
        {
          takeaway: "Payment integrations require careful security implementation.",
          detail: "Cryptographic requirements like RSA-2048 encryption and OAuth-style flows need thorough understanding. WebView integration with deep linking requires careful state management."
        },
        {
          takeaway: "Timezones will break your cron jobs.",
          detail: "Always be explicit. Store UTC, display local, configure schedulers with timezone strings."
        },
        {
          takeaway: "Event-driven architecture pays off.",
          detail: "Adding email notifications, push notifications, and analytics tracking was easy because the booking flow emits events. New listeners don't touch core logic."
        }
      ],
      improvements: [
        "Add structured logging earlier (debugging production without it was painful)",
        "Write more integration tests (unit tests didn't catch the callback race conditions)",
        "Implement better monitoring and alerting from the start"
      ]
    }
  ]
};