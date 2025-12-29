export const personalInfo = {
  name: "Abdellah",
  email: "faqiirabdellah@gmail.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};

export const introText = {
  headline: `Hey, I'm Abdellah. <br>I write code that ships to production.`,
  description: `I spent three years at <strong>42</strong> learning to build everything from scratch —
    memory allocators, shells, game engines. Then I joined two startups as the sole engineer,
    turning ideas into shipped products with <strong>95,000+ lines of production code</strong>.`,
};

export const projects = [
{
  title: "WashMinute",
  meta: "On-demand car wash platform · Sole Engineer · 2023–2024",
  description: `A two-sided marketplace connecting customers with car washers in Morocco. 
    Users book washes at their location, washmen receive real-time requests based on proximity, 
    payments happen in-app. I built <strong>everything</strong> — both mobile apps, the backend, 
    the admin dashboard.`,
  stats: [
    { value: "95k", label: "Lines of code" },
    { value: "300+", label: "Files" },
    { value: "3", label: "Languages" },
  ],
  intro: `The hard part wasn't building features — it was making them work reliably when real people depend on them.`,
  challenges: [
    {
      title: "Geolocation that actually scales",
      text: `The first version calculated distances on the client — every washman's app constantly pinging the API, checking "am I close enough?" It worked in testing. In production, it drained batteries in two hours and burned through API quota in a day.

I rebuilt it with PostGIS on the server. <code>ST_DWithin</code> for radius filtering with GiST indexes, <code>ST_Distance</code> with Web Mercator projection for accurate meters, progressive radius expansion (5km → 10km → 15km → 20km). One spatial query figures out who's nearby, Socket.io pushes only to those devices.

The result: 95% reduction in query time (sub-100ms even with thousands of providers), 80% fewer API calls, and phones that last all day.`,
    },
    {
      title: "Payments with no room for error",
      text: `NAPS (Morocco's payment gateway) has minimal documentation and no sandbox. The integration required RSA-2048 encryption for payment data, MD5 MAC generation for request signing, OAuth-style token exchange, and deep linking back to the app.

The tricky part was preventing double-charges. Payment callbacks can hit multiple times, so I built idempotency checks on orderId, database-level unique constraints, and status verification before processing. The system also handles saved card tokenization for one-click payments and automatic subscription renewals with commission tracking.

It works. No failed payments, no double-charges, no angry customers.`,
    },
  ],
  tech: "Built with React Native, Expo, TypeScript, Node.js, PostgreSQL, PostGIS, Socket.io, AWS Cognito, S3, NAPS",
  caseStudyLink: "/washminute"
},
  {
    title: "Cardnd",
    meta: "Car rental mobile app · Sole Engineer · 2024",
    description: `Mobile application for a car rental startup. Complete technical build: 
      booking flows, authentication with Apple and Google, payment integration with NAPS, 
      push notifications via BullMQ and Redis, fleet management tools for operations.`,
    tech: "Built with React Native, Expo, Node.js, MongoDB, BullMQ, Redis",
  },
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
    I joined as the sole engineer and built everything — two mobile apps (customer + washman), 
    the backend, the admin dashboard.`,
  role: "Sole Engineer · 2023–2024",
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
    content: `The backend runs on Node.js with Express, PostgreSQL with PostGIS for geospatial queries, and Socket.IO for real-time communication. AWS Cognito handles authentication, S3 stores media, and NAPS processes payments.

The architecture is event-driven and modular — controllers, models, services separated cleanly. Database changes go through migrations, so schema is version-controlled. Cron jobs handle subscription expiration and notification campaigns.

- Stateless API servers for horizontal scaling
- Connection pooling for database efficiency
- Heavy assets offloaded to S3
- Event emitters for decoupled business logic`,
  },
  {
    id: "auth",
    title: "Passwordless Authentication",
    content: `Users sign in with just their phone number. No passwords to remember, no SMS codes to wait for.

The trick: AWS Cognito requires passwords internally, but users never see them. The backend generates a cryptographically secure password using <code>crypto.randomBytes(32)</code>, creates the Cognito user, and handles all token operations server-side.

- Lambda triggers auto-verify phone numbers without SMS
- JWT tokens with 15-minute access + 7-day refresh rotation
- Rate limiting: 5 attempts/15min (IP) + 3 attempts/hour (phone)

<strong>Result:</strong> Zero SMS costs. Low-barrier onboarding. Security that doesn't rely on users choosing good passwords.`,
  },
  {
    id: "geolocation",
    title: "Geolocation Matching",
    content: `The core feature: match customers with nearby washmen in real-time.

<strong>The first attempt</strong> calculated distances on the client. Every washman's app constantly pinged the API, checking "am I close enough to this request?" It worked in testing. In production, it drained batteries in two hours and burned through API quota in a day.

<strong>The fix</strong> was moving everything server-side with PostGIS:

- <code>ST_DWithin</code> for radius filtering with GiST spatial indexes
- <code>ST_Distance</code> with Web Mercator projection (EPSG:3857) for accurate meters
- Progressive radius expansion: 5km → 10km → 15km → 20km
- Generated geometry columns for KNN distance ordering
- Stale location filtering (only washmen active in last 2 hours)

One spatial query figures out who's nearby. Socket.IO pushes only to those devices.

<strong>Result:</strong> 95% reduction in query time. Sub-100ms responses even with thousands of providers. 80% fewer API calls. Phones that last all day.`,
  },
  {
    id: "payments",
    title: "Payment Integration",
    content: `NAPS is Morocco's payment gateway. Minimal documentation, no sandbox, and the integration requires serious cryptography.

<strong>The flow:</strong>

- RSA-2048 encryption for payment data using Node's crypto module
- MD5 MAC generation for request signing
- OAuth-style token exchange with 24-hour secure tokens
- WebView payment form in the app
- Deep linking back: <code>washminute://payment?status=success</code>

<strong>The hard part</strong> was preventing double-charges. Payment callbacks can hit multiple times (network retries, user refreshing). I built:

- Idempotency checks on orderId
- Database-level unique constraints
- Status verification before processing
- Retry mechanism with exponential backoff (3 attempts)

The system also handles saved card tokenization for one-click payments and automatic subscription renewals with washman commission tracking.

<strong>Result:</strong> No failed payments. No double-charges. Money flows correctly.`,
  },
  {
    id: "realtime",
    title: "Real-time Communication",
    content: `Bookings need instant updates. Chat needs to feel like WhatsApp. Washman locations need live tracking.

Socket.IO handles all of this with a custom room-based architecture:

- <code>identify</code> events map cognito_id → socket_id
- Room-based messaging isolates booking conversations
- Typing indicators with agent presence tracking
- Chat viewer awareness (who's looking at this conversation)
- Automatic reconnection with state persistence

<strong>The scaling problem:</strong> Long-running Socket connections were leaking memory. Fixed with proper disconnect handling, room cleanup on user departure, and socket ID mapping with automatic garbage collection.

<strong>Result:</strong> Handles hundreds of concurrent connections with efficient room isolation. Messages arrive instantly. No memory leaks.`,
  },
  {
    id: "notifications",
    title: "Push Notifications",
    content: `Time-critical notifications need to arrive. A washman missing a booking request costs real money.

The system uses Expo Push Notifications with:

- Multi-device support (one user can have multiple phones/tokens)
- Exponential backoff retry: 1s → 2s → 4s on 503 errors
- Batch chunking (100 per batch) to prevent rate limits
- High-priority delivery for time-sensitive notifications

Weekly reminder campaigns go out to all customers (Mon/Thu/Sat at 9 AM, Africa/Casablanca timezone). The scheduler is timezone-aware — it runs at the right local time regardless of server location.

<strong>Result:</strong> Reliable delivery to thousands of users. No missed booking requests.`,
  },
  {
    id: "database",
    title: "Database Design",
    content: `PostgreSQL with 23 models and proper relations:

- <strong>Users</strong> — clients and washmen with role-based fields
- <strong>Orders</strong> — booking lifecycle with status tracking
- <strong>Messages</strong> — chat history with image support
- <strong>Subscriptions</strong> — plan management with usage counters
- <strong>PaymentContexts</strong> — payment state machine
- <strong>PushTokens</strong> — multi-device notification delivery
- <strong>SavedCards</strong> — tokenized payment methods
- <strong>Washmen</strong> — provider data with geolocation columns

8 migrations handle schema evolution. PostGIS extension enables spatial queries. GiST indexes on geometry columns make location queries fast.

Denormalized where it matters: washman ratings are cached on the profile for O(1) reads instead of aggregating reviews on every request.`,
  },
  {
    id: "security",
    title: "Security",
    content: `Production systems need real security, not tutorial-level auth.

<strong>Authentication:</strong>
- AWS Cognito for identity management
- JWT with short-lived access tokens (15 min) + refresh rotation (7 days)
- Rate limiting on auth endpoints

<strong>Data protection:</strong>
- RSA encryption for payment data
- Environment variables for all secrets (base64 encoded private keys)
- SQL injection prevention via Sequelize parameterized queries
- Pre-signed S3 URLs (no AWS credentials exposed to clients)

<strong>API security:</strong>
- Input validation with express-validator
- Request logging for audit trails
- Error sanitization (no stack traces to clients)
- CORS whitelisting`,
  },
  {
    id: "lessons",
    title: "What I Learned",
    content: `<strong>Premature optimization is real, but so is premature non-optimization.</strong>
The client-side geolocation was "simpler" but created a scaling wall. Sometimes you need the complex solution from the start.

<strong>Payment integrations are always harder than documented.</strong>
NAPS documentation was incomplete. I had to reverse-engineer parts of the flow by testing with real (small) transactions. Build idempotency from day one.

<strong>Timezones will break your cron jobs.</strong>
Always be explicit. Store UTC, display local, configure schedulers with timezone strings.

<strong>Event-driven architecture pays off.</strong>
Adding email notifications, push notifications, and analytics tracking was easy because the booking flow emits events. New listeners don't touch core logic.

<strong>What I'd do differently:</strong>
- Add structured logging earlier (debugging production without it was painful)
- Build an admin dashboard sooner (too much time SSH'd into servers)
- Write more integration tests (unit tests didn't catch the callback race conditions)`,
  },
],
};