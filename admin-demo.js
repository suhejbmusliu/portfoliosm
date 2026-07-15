/* ============================================================
   Zendo Admin Console — interactive simulation
   A working, client-side model of the back office built for
   zendo.mk: live orders, per-vendor commission rates, supplier
   balances, payout runs and role-based access control (RBAC).
   ============================================================ */

(() => {
  const frame = document.querySelector(".zendo-demo-frame");
  if (!frame) return;

  /* ---------------- data ---------------- */
  const VENDORS = [
    { id: "v1", name: "TechShop Skopje", cat: "Electronics", rate: 0.10 },
    { id: "v2", name: "Casa Dekor", cat: "Home & Living", rate: 0.12 },
    { id: "v3", name: "Moda Line", cat: "Fashion", rate: 0.10 },
    { id: "v4", name: "GreenMarket", cat: "Organic food", rate: 0.08 },
  ];

  const CUSTOMERS = [
    "A. Stojanovski", "E. Berisha", "M. Petrovska", "L. Rexhepi", "S. Dimitrov",
    "B. Hoxha", "N. Ivanova", "D. Krasniqi", "V. Trajkovski", "F. Zeqiri",
  ];

  const o = (id, customer, v, total, status) => ({ id, customer, v, total, status, fresh: false });

  const state = {
    role: "admin", /* admin | vendor (vendor mode = signed in as TechShop Skopje) */
    page: "overview",
    mode: "console", /* console | live */
    filter: "All",
    live: true,
    visible: false,
    orderSeq: 1037,
    payoutSeq: 1046,
    weeks: [34, 42, 38, 55, 49, 63, 58, 72, 66, 81, 77, 92],
    orders: [
      o(1037, "V. Trajkovski", "v4", 940, "New"),
      o(1036, "E. Berisha", "v3", 5670, "New"),
      o(1035, "D. Krasniqi", "v1", 3490, "Shipped"),
      o(1034, "A. Stojanovski", "v2", 8240, "Shipped"),
      o(1033, "L. Rexhepi", "v4", 1560, "Delivered"),
      o(1032, "N. Ivanova", "v1", 4990, "Delivered"),
      o(1031, "S. Dimitrov", "v3", 2890, "Paid"),
      o(1030, "B. Hoxha", "v1", 12400, "Paid"),
      o(1029, "M. Petrovska", "v2", 6480, "Paid"),
    ],
    payouts: [
      { ref: "PO-1045", v: "v3", amount: 2601, orders: 1, when: "13 Jul" },
      { ref: "PO-1044", v: "v1", amount: 11160, orders: 1, when: "12 Jul" },
      { ref: "PO-1043", v: "v2", amount: 5702, orders: 1, when: "11 Jul" },
    ],
  };

  const MY_VENDOR = "v1"; /* the company you act as in vendor mode */

  /* ---------------- helpers ---------------- */
  const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const mkd = (n) => fmt(n) + " ден";
  const vendorOf = (ord) => VENDORS.find((v) => v.id === ord.v);
  const commOf = (ord) => Math.round(ord.total * vendorOf(ord).rate);
  const earnOf = (ord) => ord.total - commOf(ord);
  const scoped = () => (state.role === "vendor" ? state.orders.filter((x) => x.v === MY_VENDOR) : state.orders);
  const payableFor = (vid) =>
    state.orders.filter((x) => x.v === vid && x.status === "Delivered").reduce((s, x) => s + earnOf(x), 0);

  /* ---------------- dom ---------------- */
  const els = {
    url: document.getElementById("demoUrl"),
    mode: document.getElementById("demoMode"),
    shell: document.getElementById("adminShell"),
    side: document.getElementById("adminSide"),
    topbar: document.getElementById("adminTopbar"),
    page: document.getElementById("adminPage"),
    live: document.getElementById("view-live"),
    toast: document.getElementById("demoToast"),
  };

  let toastTimer;
  const toast = (msg) => {
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 3400);
  };

  /* ---------------- sidebar ---------------- */
  const icon = {
    overview: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>',
    orders: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 4h14v16l-2.3-1.5L14.4 20l-2.4-1.5L9.6 20l-2.3-1.5L5 20z"/><path d="M9 9h6M9 13h4"/></svg>',
    vendors: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 9 5.5 4h13L20 9M4 9v10h16V9M4 9h16M10 19v-6h4v6"/></svg>',
    payouts: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/></svg>',
    access: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9.5 12 2 2 3.5-4"/></svg>',
    about: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r="0.5" fill="currentColor"/></svg>',
  };

  const NAV = [
    { id: "overview", label: "Overview", vendor: true },
    { id: "orders", label: "Orders", vendor: true },
    { id: "vendors", label: "Vendors", vendor: false },
    { id: "payouts", label: "Payouts", vendor: true },
    { id: "access", label: "Access & roles", vendor: false },
    { id: "about", label: "About Zendo", vendor: true },
  ];

  function renderSide() {
    els.side.innerHTML = `
      <div class="admin-logo"><i>Z</i><span class="logo-word">zendo</span></div>
      <nav class="admin-nav">
        ${NAV.map((n) => {
          const locked = state.role === "vendor" && !n.vendor;
          return `<button type="button" data-nav="${n.id}"
            class="${state.page === n.id ? "active" : ""} ${locked ? "locked" : ""}">
            ${icon[n.id]}<span class="nav-label">${n.label}</span>${locked ? '<span class="lock">🔒</span>' : ""}
          </button>`;
        }).join("")}
      </nav>
      <div class="admin-side-foot">
        ${state.role === "admin"
          ? "<b>admin@zendo.mk</b>Platform administrator"
          : "<b>TechShop Skopje</b>Vendor account"}
      </div>`;
  }

  /* ---------------- topbar ---------------- */
  const TITLES = {
    overview: "Overview",
    orders: "Orders",
    vendors: "Vendors & balances",
    payouts: "Payout management",
    access: "Access & roles",
    about: "About Zendo",
  };

  function renderTopbar() {
    els.topbar.innerHTML = `
      <h4 class="admin-title">${TITLES[state.page]}</h4>
      <button type="button" class="live-pill ${state.live ? "" : "paused"}" data-action="toggle-live"
        title="Simulated order traffic">
        <span class="pulse-dot"></span>${state.live ? "Live orders" : "Paused"}
      </button>
      <div class="role-switch" title="Role-based access control demo">
        <button type="button" data-role="admin" class="${state.role === "admin" ? "active" : ""}">Admin</button>
        <button type="button" data-role="vendor" class="${state.role === "vendor" ? "active" : ""}">Vendor</button>
      </div>`;
  }

  /* ---------------- pages ---------------- */
  const statusPill = (s) => `<span class="pill pill-${s.toLowerCase()}">${s}</span>`;

  const actionBtn = (ord) => {
    if (ord.status === "New") return `<button type="button" class="demo-mini" data-action="advance" data-id="${ord.id}">Ship →</button>`;
    if (ord.status === "Shipped") return `<button type="button" class="demo-mini" data-action="advance" data-id="${ord.id}">Deliver →</button>`;
    return "";
  };

  function kpi(label, val, { hot = false, money = true, suffix = "" } = {}) {
    return `<div class="kpi ${hot ? "kpi-hot" : ""}">
      <b data-kpi data-val="${val}" data-money="${money ? 1 : 0}">${money ? mkd(val) : fmt(val)}${suffix}</b>
      <span>${label}</span>
    </div>`;
  }

  function chart(scale = 1) {
    const max = Math.max(...state.weeks);
    return `<div class="chart-card">
      <div class="chart-head"><span>${state.role === "admin" ? "Platform revenue" : "Your sales"} · last 12 weeks</span><span>ден</span></div>
      <div class="chart-bars">
        ${state.weeks.map((w, i) =>
          `<i style="height:${Math.max(6, Math.round((w * scale) / max / scale * 84))}px; animation-delay:${i * 35}ms"
             title="Week ${i + 1}"></i>`).join("")}
      </div>
    </div>`;
  }

  function miniOrdersTable(rows) {
    const isAdmin = state.role === "admin";
    return `<div class="demo-tablewrap">
      <table class="demo-table">
        <thead><tr>
          <th>Order</th><th>Customer</th>${isAdmin ? "<th>Vendor</th>" : ""}
          <th class="num">Total</th><th>Status</th>
        </tr></thead>
        <tbody>
          ${rows.map((ord) => `
            <tr class="${ord.fresh ? "row-new" : ""}">
              <td>#${ord.id}</td><td>${ord.customer}</td>
              ${isAdmin ? `<td>${vendorOf(ord).name}</td>` : ""}
              <td class="num">${mkd(ord.total)}</td><td>${statusPill(ord.status)}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
  }

  function pageOverview() {
    if (state.role === "admin") {
      const gmv = state.orders.reduce((s, x) => s + x.total, 0);
      const commission = state.orders.reduce((s, x) => s + commOf(x), 0);
      const pendingPayouts = VENDORS.reduce((s, v) => s + payableFor(v.id), 0);
      return `
        <div class="kpi-grid">
          ${kpi("Marketplace GMV", gmv)}
          ${kpi("Commission revenue", commission, { hot: true })}
          ${kpi("Pending payouts", pendingPayouts)}
          ${kpi("Orders", state.orders.length, { money: false })}
        </div>
        ${chart()}
        ${miniOrdersTable(state.orders.slice(0, 5))}`;
    }
    /* vendor view — same console, data scoped by RBAC */
    const mine = scoped();
    const gross = mine.reduce((s, x) => s + x.total, 0);
    const earnings = mine.reduce((s, x) => s + earnOf(x), 0);
    return `
      <div class="kpi-grid">
        ${kpi("Gross sales", gross)}
        ${kpi("Your earnings (after 10%)", earnings)}
        ${kpi("Payable balance", payableFor(MY_VENDOR), { hot: true })}
        ${kpi("Your orders", mine.length, { money: false })}
      </div>
      ${chart(0.38)}
      ${miniOrdersTable(mine.slice(0, 5))}`;
  }

  function pageOrders() {
    const isAdmin = state.role === "admin";
    const base = scoped();
    const filters = ["All", "New", "Shipped", "Delivered", "Paid"];
    const rows = state.filter === "All" ? base : base.filter((x) => x.status === state.filter);

    const table = rows.length === 0
      ? `<div class="demo-empty">No ${state.filter.toLowerCase()} orders right now.</div>`
      : `<div class="demo-tablewrap">
          <table class="demo-table">
            <thead><tr>
              <th>Order</th><th>Customer</th>${isAdmin ? "<th>Vendor</th>" : ""}
              <th class="num">Total</th>
              <th class="num">${isAdmin ? "Commission" : "Your cut"}</th>
              <th>Status</th><th></th>
            </tr></thead>
            <tbody>
              ${rows.map((ord) => `
                <tr class="${ord.fresh ? "row-new" : ""}">
                  <td>#${ord.id}</td>
                  <td>${ord.customer}</td>
                  ${isAdmin ? `<td>${vendorOf(ord).name}</td>` : ""}
                  <td class="num">${mkd(ord.total)}</td>
                  <td class="num">${mkd(isAdmin ? commOf(ord) : earnOf(ord))}</td>
                  <td>${statusPill(ord.status)}</td>
                  <td>${actionBtn(ord)}</td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>`;

    return `
      <div class="filter-row">
        ${filters.map((f) =>
          `<button type="button" data-filter="${f}" class="${state.filter === f ? "active" : ""}">${f}</button>`).join("")}
      </div>
      ${table}`;
  }

  function pageVendors() {
    return `
      <div class="demo-tablewrap">
        <table class="demo-table">
          <thead><tr>
            <th>Vendor</th><th>Category</th><th class="num">Rate</th><th class="num">Orders</th>
            <th class="num">Gross sales</th><th class="num">Commission kept</th><th class="num">Unpaid balance</th>
          </tr></thead>
          <tbody>
            ${VENDORS.map((v) => {
              const theirs = state.orders.filter((x) => x.v === v.id);
              const gross = theirs.reduce((s, x) => s + x.total, 0);
              const kept = theirs.reduce((s, x) => s + commOf(x), 0);
              return `<tr>
                <td>${v.name}</td><td>${v.cat}</td>
                <td class="num">${Math.round(v.rate * 100)}%</td>
                <td class="num">${theirs.length}</td>
                <td class="num">${mkd(gross)}</td>
                <td class="num">${mkd(kept)}</td>
                <td class="num"><strong>${mkd(payableFor(v.id))}</strong></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
      <p class="section-note">Commission rates are configured per vendor — the engine computes platform
        commission, vendor earnings and unpaid balances per order, exactly like the production data model
        (users, companies, products, orders, commissions, payouts, permissions).</p>`;
  }

  function pagePayouts() {
    if (state.role === "admin") {
      const due = VENDORS.map((v) => ({ v, amount: payableFor(v.id), count: state.orders.filter((x) => x.v === v.id && x.status === "Delivered").length }))
        .filter((d) => d.amount > 0);

      const cards = due.length === 0
        ? `<div class="demo-empty">Nothing payable right now — deliver an order first (Orders → Ship → Deliver).</div>`
        : `<div class="payout-grid">
            ${due.map((d) => `
              <div class="payout-card">
                <h5>${d.v.name}</h5>
                <small>${d.count} delivered order${d.count === 1 ? "" : "s"} · rate ${Math.round(d.v.rate * 100)}%</small>
                <div class="payout-amount">${mkd(d.amount)}</div>
                <button type="button" class="demo-pay" data-action="payout" data-id="${d.v.id}">Run payout →</button>
              </div>`).join("")}
          </div>`;

      return `${cards}
        <div class="demo-history-wrap">
          <ul class="demo-history">
            ${state.payouts.map((p) => `
              <li>
                <span><span class="ref">${p.ref}</span>${VENDORS.find((v) => v.id === p.v).name} · ${p.orders} order${p.orders === 1 ? "" : "s"}</span>
                <span class="demo-history-amt">${mkd(p.amount)} · ${p.when} ✓</span>
              </li>`).join("")}
          </ul>
        </div>`;
    }
    /* vendor view */
    const mine = state.payouts.filter((p) => p.v === MY_VENDOR);
    return `
      <div class="kpi-grid" style="grid-template-columns:1fr 1fr">
        ${kpi("Payable balance", payableFor(MY_VENDOR), { hot: true })}
        ${kpi("Paid out to date", mine.reduce((s, p) => s + p.amount, 0))}
      </div>
      <ul class="demo-history">
        ${mine.length === 0 ? "" : mine.map((p) => `
          <li><span><span class="ref">${p.ref}</span>Payout · ${p.orders} order${p.orders === 1 ? "" : "s"}</span>
          <span class="demo-history-amt">${mkd(p.amount)} · ${p.when} ✓</span></li>`).join("")}
      </ul>
      <p class="section-note">Payouts are initiated by the platform admin. Your balance becomes payable when
        an order is delivered — switch to the Admin role to run one.</p>`;
  }

  function pageAccess() {
    const PERMS = [
      ["Browse storefront & place orders", 1, 1, 1],
      ["Manage own products & inventory", 0, 1, 1],
      ["Process & ship own orders", 0, 1, 1],
      ["See all vendors & platform revenue", 0, 0, 1],
      ["Configure commission rates", 0, 0, 1],
      ["Run vendor payouts", 0, 0, 1],
      ["Manage roles & permissions", 0, 0, 1],
    ];
    return `
      <div class="demo-tablewrap">
        <table class="demo-table access-table">
          <thead><tr><th>Permission</th><th>Customer</th><th>Vendor</th><th>Admin</th></tr></thead>
          <tbody>
            ${PERMS.map((p) => `
              <tr><td style="white-space:normal">${p[0]}</td>
                ${p.slice(1).map((x) => `<td>${x ? '<span class="tick">✓</span>' : '<span class="notick">—</span>'}</td>`).join("")}
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <p class="section-note">Implemented with Clerk authentication, Supabase and application-level permission
        checks on every route and query. Try it: switch the role to <strong>Vendor</strong> in the top bar —
        the sidebar locks down and every table re-scopes to that company's data.</p>`;
  }

  function pageAbout() {
    return `
      <ol class="flow-steps">
        <li><span class="step-n">1</span><b>Vendor onboarding</b>Local shops register as vendor companies, each with its own catalog, team and commission rate.</li>
        <li><span class="step-n">2</span><b>One storefront</b>All vendors sell through a single zendo.mk storefront — shared cart, unified checkout, delivery across North Macedonia.</li>
        <li><span class="step-n">3</span><b>Orders & fulfillment</b>Orders route to the right vendor automatically. Vendors process and ship from their own dashboard.</li>
        <li><span class="step-n">4</span><b>Commissions & payouts</b>The platform keeps its commission per order and pays vendors their balance — every denar tracked in payout history.</li>
      </ol>
      <div class="payout-grid">
        <div class="payout-card">
          <h5>Customer storefront</h5>
          <p class="module-desc">Product catalog with categories and search, cart, checkout and order tracking — localized for the Macedonian market.</p>
        </div>
        <div class="payout-card">
          <h5>Vendor dashboard</h5>
          <p class="module-desc">Each vendor company manages its own products, stock, orders, workflows and reports — and sees nothing of other vendors.</p>
        </div>
        <div class="payout-card">
          <h5>Admin console</h5>
          <p class="module-desc">Platform administration: vendors, users, permissions, commission configuration, payout runs and marketplace-wide reporting.</p>
        </div>
        <div class="payout-card">
          <h5>Financial engine</h5>
          <p class="module-desc">Per-order commission calculation, supplier balances, unpaid-order tracking and full payout history — the hardest and most valuable part of the build.</p>
        </div>
      </div>
      <p class="section-note">Architecture: Next.js 15 on Vercel · Clerk authentication with RBAC ·
        Supabase PostgreSQL with Prisma ORM (users, companies, products, orders, commissions, payouts,
        permissions) · Tailwind CSS. Founded, built and operated by Suhejb Musliu.</p>
      <p class="section-note">All numbers in this demo are simulated — real business data stays private.</p>`;
  }

  const PAGES = { overview: pageOverview, orders: pageOrders, vendors: pageVendors, payouts: pagePayouts, access: pageAccess, about: pageAbout };

  /* ---------------- KPI count-up ---------------- */
  const kpiPrev = {};
  function animateKpis() {
    els.page.querySelectorAll("[data-kpi]").forEach((el, i) => {
      const to = +el.dataset.val;
      const isMoney = el.dataset.money === "1";
      const key = `${state.role}:${state.page}:${i}`;
      const from = key in kpiPrev ? kpiPrev[key] : Math.round(to * 0.35);
      kpiPrev[key] = to;
      if (from === to) return;
      const t0 = performance.now();
      const dur = 650;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(from + (to - from) * eased);
        el.textContent = isMoney ? mkd(val) : fmt(val);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------------- render ---------------- */
  function renderPage() {
    els.page.innerHTML = PAGES[state.page]();
    state.orders.forEach((x) => (x.fresh = false));
    animateKpis();
  }

  function renderAll() {
    renderSide();
    renderTopbar();
    renderPage();
  }

  /* ---------------- live order simulation ---------------- */
  function newOrder() {
    const v = VENDORS[Math.floor(Math.random() * VENDORS.length)];
    const ord = o(
      ++state.orderSeq,
      CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)],
      v.id,
      Math.round((400 + Math.random() * 9200) / 10) * 10,
      "New"
    );
    ord.fresh = true;
    state.orders.unshift(ord);
    if (state.orders.length > 26) {
      const idx = state.orders.map((x) => x.status).lastIndexOf("Paid");
      state.orders.splice(idx === -1 ? state.orders.length - 1 : idx, 1);
    }
    state.weeks[state.weeks.length - 1] += Math.max(1, Math.round(ord.total / 600));
    if (state.page === "overview" || state.page === "orders") renderPage();
    else renderTopbar();
  }

  setInterval(() => {
    if (state.live && state.visible && state.mode === "console" && !document.hidden) newOrder();
  }, 4200);

  new IntersectionObserver(
    (entries) => (state.visible = entries[0].isIntersecting),
    { threshold: 0.25 }
  ).observe(frame);

  /* ---------------- interactions ---------------- */
  frame.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    /* console <-> live storefront */
    if (btn.dataset.mode) {
      state.mode = btn.dataset.mode;
      els.mode.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
      els.shell.hidden = state.mode !== "console";
      els.live.hidden = state.mode !== "live";
      els.url.textContent = state.mode === "live" ? "zendo.mk" : state.role === "admin" ? "zendo.mk/admin" : "zendo.mk/dashboard";
      if (state.mode === "live" && !els.live.dataset.ready) {
        els.live.dataset.ready = "1";
        els.live.innerHTML = `
          <div class="demo-live-cta"><div>
            <p>Load the real, production <strong>zendo.mk</strong> storefront right inside this frame.</p>
            <button type="button" class="btn btn-dark" data-action="load-live">Load live site</button>
            <p class="demo-live-note">Prefer a full window? <a href="https://zendo.mk" target="_blank" rel="noopener">Open zendo.mk in a new tab ↗</a></p>
          </div></div>`;
      }
      return;
    }

    /* sidebar navigation (with RBAC locks) */
    if (btn.dataset.nav) {
      const nav = NAV.find((n) => n.id === btn.dataset.nav);
      if (state.role === "vendor" && !nav.vendor) {
        toast(`🔒 "${nav.label}" is admin-only — that's RBAC doing its job`);
        return;
      }
      state.page = nav.id;
      renderSide();
      renderTopbar();
      renderPage();
      return;
    }

    /* role switch */
    if (btn.dataset.role && btn.dataset.role !== state.role) {
      state.role = btn.dataset.role;
      const nav = NAV.find((n) => n.id === state.page);
      if (state.role === "vendor" && !nav.vendor) state.page = "overview";
      els.url.textContent = state.role === "admin" ? "zendo.mk/admin" : "zendo.mk/dashboard";
      renderAll();
      toast(state.role === "admin"
        ? "Signed in as admin@zendo.mk — full platform access"
        : "Signed in as TechShop Skopje — data scoped to your company");
      return;
    }

    const { action, id } = btn.dataset;

    if (action === "toggle-live") {
      state.live = !state.live;
      renderTopbar();
      toast(state.live ? "Live order simulation resumed" : "Live order simulation paused");
    }

    if (action === "filter" || btn.dataset.filter) {
      state.filter = btn.dataset.filter;
      renderPage();
    }

    if (action === "advance") {
      const ord = state.orders.find((x) => x.id === +id);
      if (!ord) return;
      if (ord.status === "New") {
        ord.status = "Shipped";
        toast(`Order #${ord.id} shipped`);
      } else if (ord.status === "Shipped") {
        ord.status = "Delivered";
        toast(`Order #${ord.id} delivered — ${mkd(earnOf(ord))} now payable to ${vendorOf(ord).name}`);
      }
      renderPage();
    }

    if (action === "payout") {
      const v = VENDORS.find((x) => x.id === id);
      const due = state.orders.filter((x) => x.v === v.id && x.status === "Delivered");
      const amount = due.reduce((s, x) => s + earnOf(x), 0);
      if (amount === 0) return;
      due.forEach((x) => (x.status = "Paid"));
      const ref = `PO-${state.payoutSeq++}`;
      state.payouts.unshift({ ref, v: v.id, amount, orders: due.length, when: "just now" });
      renderPage();
      toast(`${ref} — ${mkd(amount)} paid out to ${v.name} ✓`);
    }

    if (action === "load-live") {
      els.live.innerHTML = `<iframe class="demo-live-iframe" src="https://zendo.mk" title="zendo.mk live" loading="lazy"></iframe>`;
    }
  });

  renderAll();
})();
