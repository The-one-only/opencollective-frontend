import nextRoutes from 'next-routes';

const pages = nextRoutes();

pages
  .add('home', '/', 'index')
  .add('static', '/:pageSlug(widgets|tos|privacypolicy|support)', 'staticPage')
  .add('redeem', '/redeem/:code?')
  .add('redeemed', '/redeemed/:code?')
  .add('signinLinkSent', '/signin/sent')
  .add('confirmCollectiveDeletion', '/deleteCollective/confirmed')
  .add('signin', '/signin/:token?')
  .add('confirmEmail', '/confirm/email/:token')
  .add('unsubscribeEmail', '/email/unsubscribe/:email/:slug/:type/:token')
  .add('create-account', '/:form(create-account)', 'signin')
  .add('subscriptions_redirect', '/subscriptions', 'subscriptions-redirect')
  .add('search', '/search')
  .add('hosts', '/hosts')
  .add('button', '/:collectiveSlug/:verb(contribute|donate)/button')
  .add('createEvent', '/:parentCollectiveSlug/events/(new|create)')
  .add('openSourceApply', '/opensource/(apply|create)')
  .add('createCollective', '/:hostCollectiveSlug?/(apply|create)')
  .add('createOrganization', '/organizations/new')
  .add('events-iframe', '/:collectiveSlug/events.html')
  .add('collectives-iframe', '/:collectiveSlug/(collectives|widget).html')
  .add('banner-iframe', '/:collectiveSlug/banner.html')
  .add('event', '/:parentCollectiveSlug/events/:eventSlug')
  .add('editEvent', '/:parentCollectiveSlug/events/:eventSlug/edit')
  .add('editCollective', '/:slug/edit/:section?')
  .add('events', '/:collectiveSlug/events')
  .add('subscriptions', '/:collectiveSlug/subscriptions')
  .add('tiers-iframe', '/:collectiveSlug/tiers/iframe')
  .add('host.expenses', '/:hostCollectiveSlug/collectives/expenses', 'host.dashboard')
  .add('host.dashboard', '/:hostCollectiveSlug/dashboard/:view(pending-applications)?', 'host.dashboard')
  .add(
    'host.expenses.approve',
    '/:parentCollectiveSlug?/:collectiveType(events)?/:collectiveSlug/:table(expenses)/:id/:action(approve|reject)',
    'action',
  )
  .add('host.collectives.approve', '/:hostCollectiveSlug/:table(collectives)/:id/:action(approve)', 'action')
  .add('transactions', '/:parentCollectiveSlug?/:collectiveType(events)?/:collectiveSlug/transactions')
  .add('createUpdate', '/:collectiveSlug/updates/new')
  .add('updates', '/:collectiveSlug/updates')
  .add('update', '/:collectiveSlug/updates/:updateSlug')
  .add('createExpense', '/:parentCollectiveSlug?/:type(events)?/:collectiveSlug/expenses/new')
  .add('expense', '/:parentCollectiveSlug?/:collectiveType(events)?/:collectiveSlug/expenses/:ExpenseId([0-9]+)')
  .add(
    'expenses',
    '/:parentCollectiveSlug?/:collectiveType(events)?/:collectiveSlug/expenses/:filter(categories|recipients)?/:value?',
  )
  .add('orders', '/:parentCollectiveSlug?/:collectiveType(events)?/:collectiveSlug/orders')
  .add('order', '/:parentCollectiveSlug?/:collectiveType(events)?/:collectiveSlug/orders/:OrderId([0-9]+)')
  .add('discover', '/discover');

// Tier page
// ---------------
pages.add('tiers', '/:collectiveSlug/:verb(tiers|contribute)');
pages.add('tier', '/:collectiveSlug/:verb(tiers|contribute)/:tierSlug?-:tierId([0-9]+)');

// Contribute Flow
// ---------------

// Legacy create order route. Deprectated on 2019-02-12
pages.add(
  'orderCollectiveTier',
  '/:collectiveSlug/:verb(order)/:tierId/:amount(\\d+)?/:interval(month|monthly|year|yearly)?',
  'createOrder',
);

// Legacy tier route. Deprectated on 2019-06-07
pages
  .add(
    'orderCollectiveTierLegacy',
    '/:collectiveSlug/:verb(donate|pay|contribute|order|events)/tier/:tierId-:tierSlug?/:step(contributeAs|details|payment|summary)?',
    'createOrder',
  )
  .add(
    'orderCollectiveTierLegacySuccess',
    '/:collectiveSlug/:verb(donate|pay|contribute|order|events)/tier/:tierId-:tierSlug?/:step(success)',
    'orderSuccess',
  );

// New Routes -> New flow
pages
  .add(
    'orderCollectiveNew',
    '/:collectiveSlug/:verb(donate|pay|order|events)/:step(contributeAs|details|payment|summary)?',
    'createOrder',
  )
  .add(
    'orderCollectiveTierNew',
    '/:collectiveSlug/:verb(contribute)/:tierSlug?-:tierId([0-9]+)/checkout/:step(contributeAs|details|payment|summary)?',
    'createOrder',
  )
  .add('orderCollectiveNewSuccess', '/:collectiveSlug/:verb(donate|pay|order|events)/:step(success)', 'orderSuccess')
  .add(
    'orderCollectiveTierNewSuccess',
    '/:collectiveSlug/:verb(contribute)/:tierSlug?-:tierId([0-9]+)/checkout/:step(success)',
    'orderSuccess',
  );

// Generic Route
pages.add(
  'orderCollective',
  '/:collectiveSlug/:verb(donate|pay|order|events)/:amount(\\d+)?/:interval(month|monthly|year|yearly)?/:description?',
  'createOrder',
);

// Events
pages.add(
  'orderEventTier',
  '/:collectiveSlug/:verb(events)/:eventSlug/order/:tierId/:step(contributeAs|details|payment|summary)?',
  'createOrder',
);

// Events
pages.add(
  'orderEventTierSuccess',
  '/:collectiveSlug/:verb(events)/:eventSlug/order/:tierId/:step(success)',
  'orderSuccess',
);

// Pledges
// -------

pages
  .add('createPledge', '/pledges/new')
  .add('createCollectivePledge', '/:slug/pledges/new', 'createPledge')
  .add('completePledge', '/pledges/:id')
  .add('claimCollective', '/:collectiveSlug/claim');

// Application management
// ----------------------

pages.add('applications', '/applications');

// Marketing Pages
// ---------------

pages.add(
  'marketing',
  '/:pageSlug(become-a-sponsor|how-it-works|gift-of-giving|gift-cards|pricing|become-a-fiscal-host)',
  'marketingPage',
);

// Collective
// ----------

// New collective page
pages.add('new-collective-page', '/:slug/v2');

pages.add('collective', '/:slug');

export default pages;

export const { Link, Router } = pages;
