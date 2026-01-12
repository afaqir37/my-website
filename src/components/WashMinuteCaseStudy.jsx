import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import CodeBlock from './case-study/CodeBlock.tsx';
import SectionHeader from './case-study/SectionHeader.tsx';
import TechBadge from './case-study/TechBadge.tsx';
import TableOfContents from './case-study/TableOfContents.tsx';
import ScrollProgress from './case-study/ScrollProgress.tsx';
import GeolocationVisualizer from './case-study/GeolocationVisualizer.tsx';
import PerformanceChart from './case-study/PerformanceChart.tsx';

const WashMinuteCaseStudy = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible in the viewport
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio (most visible first)
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const mostVisible = visibleEntries[0];

          if (mostVisible.target.id) {
            setActiveSection(mostVisible.target.id);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-20% 0px -50% 0px'
      }
    );

    document.querySelectorAll('.case-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const techStack = [
    { category: 'Mobile', items: ['React Native', 'Expo', 'TypeScript', 'TanStack Query'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'Socket.IO'] },
    { category: 'Database', items: ['PostgreSQL', 'PostGIS'] },
    { category: 'Infrastructure', items: ['AWS Cognito', 'AWS S3', 'Firebase'] },
    { category: 'Payments', items: ['NAPS Gateway'] },
    { category: 'Real-time', items: ['WebSockets'] }
  ];

  const sections = [
    { id: 'auth', title: 'Authentication', number: '01' },
    { id: 'geolocation', title: 'Geolocation', number: '02' },
    { id: 'payments', title: 'Payments', number: '03' },
    { id: 'realtime', title: 'Real-time', number: '04' },
    { id: 'notifications', title: 'Notifications', number: '05' },
    { id: 'booking', title: 'Booking', number: '06' },
    { id: 'race-conditions', title: 'Race Conditions', number: '07' },
    { id: 'frontend', title: 'Frontend', number: '08' },
    { id: 'production', title: 'Production', number: '09' }
  ];

  // Code snippets
  const signUpCode = `// Sign-up with flexible verification (phone or email)
const handleSignUp = async () => {
  const username = useEmailVerification ? form.email : form.e164Format;

  const signUpResult = await Auth.signUp({
    username,
    password: form.password,
    attributes: {
      name: form.name,
      phone_number: form.e164Format,
      email: form.email,
    },
  });

  // Sync user to backend database
  await createOrUpdateUser({
    cognito_id: signUpResult.userSub,
    name: form.name,
    phone: form.e164Format,
    email: form.email,
  });
};`;

  const geoSchemaCode = `-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add geography columns for precise geospatial queries
ALTER TABLE washing_requests
  ADD COLUMN client_location geography(Point,4326);

ALTER TABLE washmen
  ADD COLUMN last_location geography(Point,4326),
  ADD COLUMN last_location_updated_at timestamptz;

-- Spatial indexes for sub-100ms query performance
CREATE INDEX washmen_last_loc_gix ON washmen USING GIST (last_location);`;

  const geoQueryCode = `async function getNearbyOnlineWashmen(longitude, latitude, radius = 5000) {
  let searchRadius = radius;
  const radiusLimit = 20000;

  const query = \`
    SELECT cognito_id,
      ST_Distance(
        ST_Transform(last_location::geometry, 3857),
        ST_Transform(ST_SetSRID(ST_MakePoint($1, $2), 4326), 3857)
      ) AS distance_meters
    FROM washmen
    WHERE status = 'online'
      AND last_location IS NOT NULL
      AND last_location_updated_at >= NOW() - INTERVAL '2 hours'
      AND ST_DWithin(
        ST_Transform(last_location::geometry, 3857),
        ST_Transform(ST_SetSRID(ST_MakePoint($1, $2), 4326), 3857),
        $3
      )
    ORDER BY distance_meters ASC
  \`;

  // Progressive expansion: 5km → 10km → 15km → 20km
  while (searchRadius <= radiusLimit) {
    const result = await sequelize.query(query, {
      replacements: [longitude, latitude, searchRadius],
      type: sequelize.QueryTypes.SELECT
    });
    if (result.length > 0) return result;
    searchRadius += 5000;
  }
  return [];
}`;

  const paymentCode = `exports.payOnline = async (req, res) => {
  const { amount, orderId, userCognitoId } = req.body;

  const securtoken24 = await getSecurToken24();
  const macValue = crypto.createHash('md5')
    .update(orderId + amount)
    .digest('hex');

  // Create payment context for idempotency tracking
  await PaymentContext.create({
    orderId,
    userCognitoId,
    status: 'initiated',
  });

  const paymentData = {
    capture: 'Y',
    transactiontype: '0',
    currency: '504', // MAD
    orderid: orderId,
    recurring: 'Y', // Enable card tokenization
    amount: amount,
    securtoken24: securtoken24,
    mac_value: macValue,
    merchantid: MERCHANT_ID,
    successURL: \`\${baseURL}/success\`,
    failURL: \`\${baseURL}/fail\`,
  };

  const response = await axios.post(\`\${NAPS_API_URL}linkpayment\`, paymentData);
  res.json({ linkacs: response.data.url, orderId });
};`;

  const idempotencyCode = `const handleSuccess = async (req, res) => {
  const { orderId, userCognitoId } = req.query;

  const context = await PaymentContext.findOne({
    where: { orderId, userCognitoId }
  });

  // Critical: prevent duplicate processing
  if (context.status === 'completed') {
    console.log('Duplicate callback detected, ignoring');
    return res.redirect(\`washminute://payment?status=success\`);
  }

  // Atomic update with optimistic locking
  const [rowsUpdated] = await PaymentContext.update(
    { status: "completed", completed_at: new Date() },
    {
      where: {
        orderId,
        userCognitoId,
        status: 'initiated' // Only update if still pending
      }
    }
  );

  if (rowsUpdated === 0) {
    // Another process already completed this payment
    return res.redirect(\`washminute://payment?status=success\`);
  }

  await Order.update(
    { status: "paid", payment_verified: true },
    { where: { id: orderId } }
  );

  return res.redirect(\`washminute://payment?status=success\`);
};`;

  const socketCode = `io.on('connection', (socket) => {
  socket.on('identify', (userId) => {
    addClient(userId, socket.id);
    socket.join(userId);
  });

  socket.on('join-chat', ({ chatId, agentId, agentName }) => {
    socket.join(\`chat-\${chatId}\`);

    if (!chatViewers.has(chatId)) {
      chatViewers.set(chatId, new Map());
    }

    chatViewers.get(chatId).set(socket.id, {
      agentId,
      agentName,
      joinedAt: new Date()
    });

    const viewers = Array.from(chatViewers.get(chatId).values());
    io.to(\`chat-\${chatId}\`).emit('chat-viewers-updated', { chatId, viewers });
  });

  // Critical: Cleanup on disconnect
  socket.on('disconnect', () => {
    chatViewers.forEach((viewers, chatId) => {
      if (viewers.has(socket.id)) {
        viewers.delete(socket.id);
        io.to(\`chat-\${chatId}\`).emit('chat-viewers-updated', {
          chatId,
          viewers: Array.from(viewers.values())
        });
        if (viewers.size === 0) chatViewers.delete(chatId);
      }
    });
  });
});`;

  const pushCode = `const sendPushNotification = async (cognitoIds, title, body, data = {}) => {
  let tokens = [];

  // Multi-device support
  for (let cognitoId of cognitoIds) {
    const userTokens = await getUserPushTokens(cognitoId);
    tokens = [...tokens, ...userTokens];
  }

  const messages = tokens
    .filter(token => Expo.isExpoPushToken(token))
    .map(pushToken => ({
      to: pushToken,
      title,
      body,
      data,
      priority: 'high',
      android: { priority: 'high', channelId: 'washman-requests' },
      ios: { priority: 10 },
    }));

  // Batch into chunks of 100 (Expo limit)
  let chunks = expo.chunkPushNotifications(messages);

  // Exponential backoff retry on 503 errors
  for (let chunk of chunks) {
    let attempts = 0;
    while (attempts < 3) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
        break;
      } catch (error) {
        if (error.statusCode === 503 && attempts < 2) {
          const delay = Math.pow(2, ++attempts) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        } else break;
      }
    }
  }
};`;

  const raceConditionCode = `exports.acceptRequest = async (req, res) => {
  const { requestId, washmanCognitoId } = req.body;

  const transaction = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
  });

  try {
    // Lock the row for update
    const request = await WashingRequest.findOne({
      where: { id: requestId, status: 'pending' },
      lock: transaction.LOCK.UPDATE,
      transaction
    });

    if (!request) {
      await transaction.rollback();
      return res.status(409).json({ error: 'Request already accepted' });
    }

    request.status = 'accepted';
    request.washmanCognitoId = washmanCognitoId;
    await request.save({ transaction });

    await transaction.commit();

    io.to(request.clientCognitoId).emit('washmanAssigned', {
      requestId,
      washmanId: washmanCognitoId,
    });

    res.json({ success: true, request });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: 'Failed to accept request' });
  }
};`;

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <nav className="border-b border-border bg-background">
        <div className="px-8 md:px-16 lg:px-24 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="font-serif text-sm text-foreground-muted">WashMinute</span>
        </div>
      </nav>

      {/* Table of Contents */}
      <TableOfContents 
        sections={sections} 
        activeSection={activeSection} 
        onSectionClick={scrollToSection} 
      />

      {/* Hero */}
      <header className="border-b border-border">
        <div className="px-8 md:px-16 lg:px-24 xl:pl-64 py-20 md:py-32 relative">
          <div className="max-w-5xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-xs text-accent uppercase tracking-widest mb-4 font-medium"
            >
              Case Study
            </motion.span>
            <div className="flex items-start justify-between gap-6 mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] flex-1"
              >
                WashMinute: Building a Production-Ready Two-Sided Marketplace
              </motion.h1>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                src="/assets/logo-dark.png"
                alt="WashMinute Logo"
                className="h-20 md:h-24 lg:h-32 object-contain flex-shrink-0"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-foreground-muted text-lg mb-2"
            >
              Full-Stack Engineer • React Native + Node.js + PostgreSQL/PostGIS
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-foreground-muted text-sm"
            >
              2024 – 2025
            </motion.p>
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="border-b border-border">
        <div className="px-8 md:px-16 lg:px-24 xl:pl-64 py-16">
          <p className="text-xl text-foreground-muted leading-relaxed mb-12 max-w-3xl italic border-l-2 border-accent pl-6">
            WashMinute is an on-demand car wash marketplace connecting customers with professional washmen across Morocco. Two-sided mobile application with real-time matching, payment infrastructure, and distributed state management.
          </p>

          {/* Tech Stack */}
          <div className="mb-12">
            <h3 className="text-xs text-foreground-muted uppercase tracking-widest mb-6 font-medium">
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {techStack.map((category, idx) => (
                <div key={idx}>
                  <div className="text-sm font-medium text-foreground mb-3">{category.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, i) => (
                      <TechBadge key={i}>{item}</TechBadge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <main className="px-8 md:px-16 lg:px-24 xl:pl-64 py-16">
        <div className="max-w-4xl">
        
        {/* Section 1: Authentication */}
        <section id="auth" className="case-section mb-24">
          <SectionHeader number="01" title="Authentication with AWS Cognito" />
          
          <p className="text-base text-foreground-muted leading-relaxed mb-8">
            Built a secure authentication system using AWS Cognito that supports both phone and email-based registration with traditional password authentication.
          </p>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Sign-up with flexible verification</h4>
            <CodeBlock code={signUpCode} language="typescript" />
          </div>

          <div className="bg-background-subtle border border-border rounded-lg p-6">
            <h4 className="text-xs text-accent uppercase tracking-wider mb-4 font-medium">Features</h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                Dual authentication methods (phone/email)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                Secure password policies enforced by Cognito
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                Automatic JWT token refresh
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                Multi-language support (Arabic, French, English)
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Geolocation */}
        <section id="geolocation" className="case-section mb-24">
          <SectionHeader number="02" title="Real-Time Geolocation with PostGIS" />

          <p className="text-base text-foreground-muted leading-relaxed mb-8">
            PostgreSQL's PostGIS extension enables spatial indexing for sub-100ms queries at scale.
            Server-side geospatial operations handle accurate distance calculations and proximity matching
            without client-side battery drain.
          </p>

          <div className="mt-8 mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Database Schema</h4>
            <CodeBlock code={geoSchemaCode} language="sql" />
          </div>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Smart Proximity Search with Progressive Radius</h4>
            <CodeBlock code={geoQueryCode} language="javascript" />
          </div>

          {/* Interactive Visualization */}
          <div className="mb-12">
            <GeolocationVisualizer />
          </div>

          <div className="mb-8">
            <h4 className="text-xs text-foreground-muted uppercase tracking-wider mb-4 font-medium">Technical Highlights</h4>
            <ul className="space-y-2 text-sm text-foreground-muted pl-5">
              <li className="relative before:content-['→'] before:absolute before:-left-5 before:text-accent before:opacity-70">
                ST_DWithin with GIST indexes for efficient radius filtering
              </li>
              <li className="relative before:content-['→'] before:absolute before:-left-5 before:text-accent before:opacity-70">
                Web Mercator projection (EPSG:3857) for accurate distances
              </li>
              <li className="relative before:content-['→'] before:absolute before:-left-5 before:text-accent before:opacity-70">
                Progressive radius expansion to maximize matches
              </li>
              <li className="relative before:content-['→'] before:absolute before:-left-5 before:text-accent before:opacity-70">
                Stale location filtering (2-hour threshold)
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-xs text-foreground-muted uppercase tracking-wider mb-4 font-medium">Results</h4>
            <ul className="space-y-2 text-sm pl-5">
              <li className="relative before:content-['→'] before:absolute before:-left-5 before:text-accent before:opacity-70">
                <span className="text-accent font-medium">95%</span> <span className="text-foreground-muted">reduction in query time</span>
              </li>
              <li className="relative before:content-['→'] before:absolute before:-left-5 before:text-accent before:opacity-70">
                <span className="text-accent font-medium">&lt;100ms</span> <span className="text-foreground-muted">response times</span>
              </li>
              <li className="relative before:content-['→'] before:absolute before:-left-5 before:text-accent before:opacity-70">
                <span className="text-accent font-medium">80%</span> <span className="text-foreground-muted">fewer API calls</span>
              </li>
            </ul>
          </div>

          {/* Performance Chart */}
          <div>
            <PerformanceChart />
          </div>
        </section>

        {/* Section 3: Payments */}
        <section id="payments" className="case-section mb-24">
          <SectionHeader number="03" title="Payment Integration with NAPS" />
          
          {/* <StoryBox icon="⚠️" variant="warning">
            Morocco's national payment processor (NAPS) integration required RSA-2048 encryption, OAuth-style token exchange with MD5 MAC signatures, and careful handling of payment callback edge cases.
          </StoryBox> */}

          <div className="mt-8 p-6 bg-background-subtle border border-border rounded-lg mb-8">
            <div className="text-xs text-destructive uppercase tracking-wider mb-2 font-medium">Critical Problem</div>
            <p className="text-foreground-muted text-sm">Payment callbacks can be triggered multiple times (network retries, user refreshes), risking double-charges.</p>
          </div>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Payment Initiation Flow</h4>
            <CodeBlock code={paymentCode} language="javascript" />
          </div>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Idempotency System (Preventing Double-Charges)</h4>
            <CodeBlock code={idempotencyCode} language="javascript" />
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
            <h4 className="text-xs text-accent uppercase tracking-wider mb-4 font-medium">Achievements</h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent-green">✓</span>
                Zero double-charges with database-level idempotency
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green">✓</span>
                Secure token management with 24-hour expiry
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green">✓</span>
                One-click payments via card tokenization
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green">✓</span>
                Graceful handling of network retries and race conditions
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Real-time Communication */}
        <section id="realtime" className="case-section mb-24">
          <SectionHeader number="04" title="Real-Time Communication with Socket.IO" />
          
          <p className="text-base text-foreground-muted leading-relaxed mb-8">
            Built a scalable real-time system for instant booking updates, live chat, and washman location tracking.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-background-subtle border border-border rounded-lg">
              <div className="text-xs text-destructive uppercase tracking-wider mb-2 font-medium">Initial Problem</div>
              <p className="text-foreground-muted text-sm">Long-running Socket connections leaked memory. After hours in production, server performance degraded significantly.</p>
            </div>
            <div className="p-5 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="text-xs text-accent uppercase tracking-wider mb-2 font-medium">Solution</div>
              <p className="text-foreground-muted text-sm">Proper room isolation, connection tracking, and automatic cleanup on disconnect.</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Socket.IO Architecture</h4>
            <CodeBlock code={socketCode} language="javascript" />
          </div>

          <div className="bg-background-subtle border border-border rounded-lg p-6">
            <h4 className="text-xs text-accent uppercase tracking-wider mb-4 font-medium">Features</h4>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Room-based message isolation per booking
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Real-time typing indicators
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Automatic reconnection with state persistence
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Memory-leak prevention via Map cleanup
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Push Notifications */}
        <section id="notifications" className="case-section mb-24">
          <SectionHeader number="05" title="Push Notifications with Expo & Firebase" />
          
          <p className="text-base text-foreground-muted leading-relaxed mb-8">
            Time-critical notifications (booking requests, washman assignments) must arrive reliably with multi-device support.
          </p>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Implementation with Retry Logic</h4>
            <CodeBlock code={pushCode} language="javascript" />
          </div>

          <div className="bg-background-subtle border border-border rounded-lg p-6">
            <h4 className="text-xs text-accent uppercase tracking-wider mb-4 font-medium">Features</h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Multi-device support per user
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Exponential backoff retry (1s → 2s → 4s)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Automatic batching (100 notifications per request)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Platform-specific configurations (Android/iOS)
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: Booking Workflow */}
        <section id="booking" className="case-section mb-24">
          <SectionHeader number="06" title="Complete Booking Workflow" />

          <p className="text-base text-foreground-muted leading-relaxed mb-8">
            When a customer creates a booking, the system orchestrates a multi-step workflow: creating the order, finding nearby washmen using PostGIS, notifying via Socket.IO and push notifications.
          </p>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Complete Order Creation Flow</h4>
            <CodeBlock code={`exports.createOrder = async (req, res) => {
  const {
    amount, name, clientCognitoId, payment_method,
    main_services, extra_services, total_price,
    location, latitude, longitude,
    reservation_type, reservation_date
  } = req.body;

  // 1. Create order in database
  const newOrder = await Order.create({
    id_commande: orderId,
    amount,
    name,
    clientCognitoId,
    payment_method,
    main_services,
    total_price,
    location,
    latitude,
    longitude,
    status: "pending",
  });

  // 2. Create washing request with geolocation
  const washingRequest = await insertWashingRequest({
    orderId: newOrder.id,
    clientCognitoId,
    clientName: name,
    mainServices: JSON.stringify(main_services),
    location,
    latitude,
    longitude,
    reservation_type,
  });

  // 3. Find nearby washmen using PostGIS
  const nearbyWashmen = await getNearbyOnlineWashmen(longitude, latitude);

  // 4. Notify washmen via Socket.IO
  for (const washman of nearbyWashmen) {
    req.io.to(washman.cognito_id).emit('newWashingRequest', {
      requestId: washingRequest.id,
      clientName: name,
      location,
      distance: washman.distance_meters,
    });
  }

  // 5. Send push notifications to nearby washmen
  const washmenIds = nearbyWashmen.map(w => w.cognito_id);
  await sendPushNotification(
    washmenIds,
    'New Washing Request',
    \`New request from \${name} nearby\`,
    { requestId: washingRequest.id },
    { priority: 'high' }
  );

  // 6. Notify customer
  await sendPushNotification(
    [clientCognitoId],
    'Booking Confirmed',
    'We\\'re finding a washman near you',
    { orderId: newOrder.id }
  );

  res.status(201).json({ order: newOrder, washingRequest });
};`} language="javascript" />
          </div>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Scheduled Reservations (30-Minute Advance Notification)</h4>
            <CodeBlock code={`const scheduleWashmanNotification = (washingRequest) => {
  const { reservation_date, latitude, longitude, id } = washingRequest;

  const notificationTime = moment(reservation_date)
    .subtract(30, 'minutes')
    .toDate();

  schedule.scheduleJob(notificationTime, async () => {
    const nearbyWashmen = await getNearbyOnlineWashmen(longitude, latitude);

    for (const washman of nearbyWashmen) {
      io.to(washman.cognito_id).emit('scheduledRequest', {
        requestId: id,
        startsIn: '30 minutes',
      });

      await sendPushNotification(
        [washman.cognito_id],
        'Upcoming Reservation',
        'A scheduled wash starts in 30 minutes',
        { requestId: id },
        { priority: 'high' }
      );
    }
  });
};`} language="javascript" />
          </div>

          <div className="bg-background-subtle border border-border rounded-lg p-6">
            <h4 className="text-base font-medium text-foreground mb-4">Workflow Steps</h4>
            <ol className="space-y-3 text-sm text-foreground-muted">
              <li className="flex gap-3">
                <span className="font-serif text-accent">1.</span>
                Create order in database with geolocation data
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-accent">2.</span>
                Create washing request with PostGIS geography point
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-accent">3.</span>
                Find nearby online washmen using spatial queries
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-accent">4.</span>
                Notify washmen via Socket.IO in real-time
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-accent">5.</span>
                Send push notifications to nearby washmen
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-accent">6.</span>
                Confirm booking to customer
              </li>
            </ol>
          </div>
        </section>

        {/* Section 7: Race Conditions */}
        <section id="race-conditions" className="case-section mb-24">
          <SectionHeader number="07" title="Race Condition Prevention" />
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-background-subtle border border-border rounded-lg">
              <div className="text-xs text-destructive uppercase tracking-wider mb-2 font-medium">Problem</div>
              <p className="text-foreground-muted text-sm">Multiple washmen could accept the same request simultaneously.</p>
            </div>
            <div className="p-5 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="text-xs text-accent uppercase tracking-wider mb-2 font-medium">Solution</div>
              <p className="text-foreground-muted text-sm">Database transactions with row-level locking (SERIALIZABLE isolation).</p>
            </div>
          </div>

          <CodeBlock code={raceConditionCode} language="javascript" />
        </section>

        {/* Section 8: Frontend Architecture */}
        <section id="frontend" className="case-section mb-24">
          <SectionHeader number="08" title="Frontend Architecture" />

          <p className="text-base text-foreground-muted leading-relaxed mb-8">
            React Native + TypeScript with domain-isolated contexts, TanStack Query for caching, and network connectivity monitoring.
          </p>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">State Management with React Context</h4>
            <CodeBlock code={`// Separate contexts for domain isolation
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [cart, setCart] = useState({ mainServices: [], extraServices: [] });

  const createBooking = async (bookingData) => {
    const response = await api.post('/orders', bookingData);
    setCurrentOrder(response.data.order);
  };

  return (
    <OrderContext.Provider value={{ currentOrder, cart, createBooking }}>
      {children}
    </OrderContext.Provider>
  );
};`} language="typescript" />
          </div>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">API Caching with TanStack Query</h4>
            <CodeBlock code={`import { useQuery } from '@tanstack/react-query';

export const useFetchServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get('/services');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};`} language="typescript" />
          </div>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Network Connectivity Monitoring</h4>
            <CodeBlock code={`import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);

      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your connection to continue',
          [{ text: 'OK' }]
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
};`} language="typescript" />
          </div>

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Push Notification Handling</h4>
            <CodeBlock code={`import * as Notifications from 'expo-notifications';

export const NotificationProvider = ({ children }) => {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const notificationListener = Notifications.addNotificationReceivedListener(
      notification => {
        console.log('Notification received:', notification);
      }
    );

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      response => {
        const { requestId } = response.notification.request.content.data;
        navigation.navigate('RequestDetails', { requestId });
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return <NotificationContext.Provider>{children}</NotificationContext.Provider>;
};`} language="typescript" />
          </div>
        </section>

        {/* Section 9: Production Features */}
        <section id="production" className="case-section mb-24">
          <SectionHeader number="09" title="Additional Production Features" />

          <div className="mb-8">
            <h4 className="text-base font-medium text-foreground mb-4">Over-The-Air Updates</h4>
            <CodeBlock code={`import * as Updates from 'expo-updates';

const checkForUpdates = async () => {
  const update = await Updates.checkForUpdateAsync();

  if (update.isAvailable) {
    await Updates.fetchUpdateAsync();
    Alert.alert(
      'Update Available',
      'Restart to apply the latest version?',
      [
        { text: 'Later', style: 'cancel' },
        { text: 'Restart', onPress: () => Updates.reloadAsync() }
      ]
    );
  }
};`} language="typescript" />
          </div>

          <div className="bg-background-subtle border border-border rounded-lg p-6">
            <h4 className="text-xs text-accent uppercase tracking-wider mb-4 font-medium">Additional Features</h4>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Cancellation & Automatic Refunds - Customers can cancel before assignment with automatic refund via NAPS API
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Multi-Language Support - Full i18n with RTL support for Arabic, French, and English
              </li>
            </ul>
          </div>
        </section>

        {/* Key Learnings */}
        <section className="mb-24 border-t border-border pt-16">
          <h2 className="font-serif text-2xl md:text-3xl font-normal tracking-tight mb-12">Key Learnings</h2>
          
          <div className="mb-12">
            <h3 className="text-base font-semibold text-accent mb-6 uppercase tracking-wider">What Worked</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-foreground mb-2">Server-side geospatial queries with PostGIS</h4>
                <p className="text-foreground-muted text-sm">Leveraging PostgreSQL's spatial indexing enabled sub-100ms performance at scale.</p>
              </div>
              <div>
                <h4 className="text-foreground mb-2">Payment idempotency is non-negotiable</h4>
                <p className="text-foreground-muted text-sm">Building idempotency from day one prevented costly double-charge issues.</p>
              </div>
              <div>
                <h4 className="text-foreground mb-2">Event-driven architecture enables easy additions</h4>
                <p className="text-foreground-muted text-sm">Adding email notifications and analytics was trivial because the booking flow emits events.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground-muted mb-6 uppercase tracking-wider">What I'd Improve</h3>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>• <strong className="text-foreground">Add structured logging earlier</strong> – Debugging production without proper logs was painful</li>
              <li>• <strong className="text-foreground">Write integration tests for payments</strong> – Unit tests didn't catch callback race conditions</li>
              <li>• <strong className="text-foreground">Implement better monitoring and alerting</strong> – Would have caught issues faster in production</li>
            </ul>
          </div>
        </section>

        {/* Technical Highlights */}
        <section className="border-t border-border pt-16 mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-normal tracking-tight mb-8">Technical Highlights</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-foreground-muted">
            <div className="flex items-start gap-2">
              <span className="text-accent-green">✓</span>
              AWS Cognito with phone/email authentication
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green">✓</span>
              PostgreSQL + PostGIS for spatial queries
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green">✓</span>
              NAPS payment with idempotency
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green">✓</span>
              Socket.IO with memory management
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green">✓</span>
              Expo Push with retry logic
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green">✓</span>
              React Native + TypeScript
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green">✓</span>
              Database transactions for race conditions
            </div>
            <div className="flex items-start gap-2">
              <span className="text-accent-green">✓</span>
              Multi-language with RTL support
            </div>
          </div>
        </section>

        {/* Closing */}
        <div className="text-center py-12 border-t border-border">
          <p className="font-serif text-xl text-foreground-muted italic">
            Every feature solves a real problem. Every optimization has a reason. Every line of code runs in production.
          </p>
        </div>
        </div>
      </main>

      {/* Footer CTA */}
     <footer className="border-t border-border bg-background-subtle">
        <div className="px-8 md:px-16 lg:px-24 py-20 flex justify-center">
          <div className="max-w-2xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight mb-4">
              Available for Full-Stack Roles
            </h2>
            <p className="text-foreground-muted mb-8">
              Specialized in marketplace platforms, real-time systems, and payment infrastructure.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link
                to="/#contact"
                className="px-6 py-3 flex items-center justify-center bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ textDecoration: 'none', backgroundImage: 'none' }}
              >
                Get in touch
              </Link>
              <Link
                to="/"
                className="px-6 py-3 flex items-center justify-center border border-border rounded-lg text-sm font-medium text-foreground hover:bg-background-subtle transition-colors"
                style={{ textDecoration: 'none', backgroundImage: 'none' }}
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WashMinuteCaseStudy;
