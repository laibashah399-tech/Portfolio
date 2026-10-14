/* ===== EDIT YOUR DETAILS HERE ===== */
const CONFIG = {
  email: "laibasyed993@gmail.com",
  github: "https://github.com/laibashah399-tech", // e.g. "https://github.com/username"
  linkedin: "", // e.g. "https://linkedin.com/in/username"
  // Easiest option: get a free access key at web3forms.com (enter your email, key arrives instantly) and paste it here.
  web3formsKey: "86c73490-fc38-4ae5-9daa-e26bc81ace41",
  // Used only if web3formsKey is empty (needs a one-time email activation).
  formEndpoint: "https://formsubmit.co/ajax/laibasyed993@gmail.com",
};
const ROLES = [
  "Frontend Developer",
  "HTML, CSS & JavaScript Developer",
  "Tailwind CSS Developer",
  "Responsive UI Builder",
];
const SKILLS = {
  "Core Frontend": ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
  "Styling & Layout": [
    "Tailwind CSS",
    "Flexbox & Grid",
    "Animations & transitions",
  ],
  Tools: ["Git", "GitHub", "VS Code", "npm"],
};
// Leave demo/source empty ("") to hide that button. Never add a link that doesn't work.
const STACK = ["HTML", "CSS", "JavaScript", "Tailwind CSS"];
const PROJECTS = [
  {
    title: "Autograph Addicts (Front End)",
    category: "Website",
    image: "assets/images/project-kb-authentics.jpg",
    desc: "The front-end interface of the Autograph Addicts project, built to be clean, modern and responsive across screen sizes.",
    features: [],
    tech: STACK,
    demo: "https://laibashah399-tech.github.io/Autograph-Addicts/",
    source: "",
  },
  {
    title: "Auction Dashboard (Front End)",
    category: "Dashboard",
    image: "assets/images/project-auction.jpg",
    desc: "Front end of an auction management dashboard covering auctions, lots, bidders, bids, payments and reports.",
    features: [
      "Admin dashboard layout",
      "Auction and lot screens",
      "Bidder management screens",
      "Reporting views",
    ],
    tech: STACK,
    demo: "https://laibashah399-tech.github.io/auction-dashboard-frontend/",
    source: "",
  },
  {
    title: "Currency Converter",
    category: "Web App",
    image: "assets/images/project-currency-converter.jpg",
    desc: "An interactive currency converter where users enter an amount and convert it between currencies.",
    features: [],
    tech: STACK,
    demo: "https://laibashah399-tech.github.io/currency-convertor/",
    source: "",
  },
  {
    title: "Pixel Pakistan",
    category: "Website",
    image: "assets/images/project-pixel-pakistan.jpg",
    desc: "Front-end design and development for Pixel Pakistan, with a responsive, modern layout.",
    features: [],
    tech: STACK,
    demo: "https://laibashah399-tech.github.io/pixelpakistan/",
    source: "",
  },
];

/* ===== HELPERS (DOM built with createElement, no innerHTML) ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function el(tag, props = {}, kids = []) {
  const n = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) =>
    k === "text" ? (n.textContent = v) : n.setAttribute(k, v),
  );
  kids.forEach((k) => n.append(k));
  return n;
}
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== LINKS ===== */
function renderSocial() {
  const items = [
    ["GitHub", CONFIG.github],
    ["LinkedIn", CONFIG.linkedin],
    ["Email", "mailto:" + CONFIG.email],
  ].filter((i) => i[1]);
  ["social-hero", "social-contact", "social-foot"].forEach((id) => {
    const box = $("#" + id);
    items.forEach(([label, href]) =>
      box.append(
        el("a", {
          href,
          text: label,
          target: href.startsWith("http") ? "_blank" : "_self",
          rel: "noopener noreferrer",
        }),
      ),
    );
  });
  const c = $("#c-email");
  c.href = "mailto:" + CONFIG.email;
  c.textContent = CONFIG.email;
}

/* ===== SKILLS ===== */
function renderSkills() {
  const grid = $("#skill-grid");
  Object.entries(SKILLS).forEach(([cat, list]) => {
    const ul = el(
      "ul",
      { class: "chips" },
      list.map((s) => el("li", { text: s })),
    );
    grid.append(
      el("article", { class: "glass rv" }, [el("h3", { text: cat }), ul]),
    );
  });
}

/* ===== PROJECTS: cards, filter, modal ===== */
function renderProjects() {
  const grid = $("#project-grid"),
    filters = $("#filters"),
    modal = $("#modal");
  const cats = ["All", ...new Set(PROJECTS.map((p) => p.category))];
  cats.forEach((c, i) => {
    const b = el("button", {
      type: "button",
      "aria-pressed": i === 0,
      text: c,
    });
    b.onclick = () => {
      $$("button", filters).forEach((x) =>
        x.setAttribute("aria-pressed", x === b),
      );
      $$(".card", grid).forEach((card) =>
        card.classList.toggle("hide", c !== "All" && card.dataset.cat !== c),
      );
    };
    filters.append(b);
  });
  PROJECTS.forEach((p, idx) => {
    const thumb = el("div", { class: "thumb" });
    const img = el("img", {
      src: p.image,
      alt: p.title + " screenshot",
      loading: "lazy",
    });
    img.onerror = () => {
      thumb.classList.add("no-img");
      thumb.textContent = p.title;
    }; // replaceable placeholder
    thumb.append(img);
    const open = el("button", {
      class: "btn ghost sm",
      type: "button",
      text: "View Details",
    });
    open.onclick = () => openModal(p, open);
    const card = el("article", { class: "card rv", "data-cat": p.category }, [
      thumb,
      el("div", { class: "card-body" }, [
        el("h3", { text: p.title }),
        el("p", { text: p.desc }),
        el(
          "ul",
          { class: "chips tech" },
          p.tech.slice(0, 4).map((t) => el("li", { text: t })),
        ),
        el("div", { class: "cta", style: "margin-top:12px" }, [open]),
      ]),
    ]);
    grid.append(card);
  });
  function openModal(p, opener) {
    $("#m-title").textContent = p.title;
    $("#m-desc").textContent = p.desc;
    const fill = (id, arr) => {
      const u = $(id);
      u.replaceChildren(...arr.map((t) => el("li", { text: t })));
      u.hidden = !arr.length;
    };
    fill("#m-feat", p.features);
    fill("#m-tech", p.tech);
    const links = $("#m-links");
    links.replaceChildren();
    if (p.demo)
      links.append(
        el("a", {
          class: "btn",
          href: p.demo,
          target: "_blank",
          rel: "noopener noreferrer",
          text: p.demoLabel || "Live Demo",
        }),
      );
    if (p.source)
      links.append(
        el("a", {
          class: "btn ghost",
          href: p.source,
          target: "_blank",
          rel: "noopener noreferrer",
          text: "View Source Code",
        }),
      );
    if (!links.children.length)
      links.append(
        el("p", { text: "Demo and source links will be added soon." }),
      );
    modal.showModal();
    modal.addEventListener("close", () => opener.focus(), { once: true });
  }
  $("#m-close").onclick = () => modal.close();
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  }); // click backdrop
}

/* ===== NAV, THEME, SCROLL ===== */
function setupNav() {
  const burger = $("#burger"),
    menu = $("#menu");
  const toggle = (open) => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger.onclick = () => toggle(!menu.classList.contains("open"));
  $$("a", menu).forEach((a) =>
    a.addEventListener("click", () => toggle(false)),
  );
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggle(false);
  });

  const links = $$('.menu a[href^="#"]');
  const spy = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting)
          links.forEach((a) =>
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + e.target.id,
            ),
          );
      }),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  $$("main section").forEach((s) => spy.observe(s));

  const top = $("#top");
  addEventListener(
    "scroll",
    () => top.classList.toggle("show", scrollY > 600),
    { passive: true },
  );
  top.onclick = () =>
    scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  // theme with saved preference (storage may be blocked, so try/catch)
  const root = document.documentElement;
  try {
    const t = localStorage.getItem("theme");
    if (t) root.dataset.theme = t;
  } catch (e) {}
  $("#theme").onclick = () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark"; // light is the default
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  };
}

/* ===== HERO EFFECTS ===== */
function setupHero() {
  const role = $("#role");
  if (reduceMotion) {
    role.textContent = ROLES[0];
  } else {
    let r = 0,
      c = 0,
      del = false;
    (function tick() {
      const w = ROLES[r];
      role.textContent = w.slice(0, c);
      if (!del && c < w.length) {
        c++;
        setTimeout(tick, 80);
      } else if (!del) {
        del = true;
        setTimeout(tick, 1500);
      } else if (c > 0) {
        c--;
        setTimeout(tick, 35);
      } else {
        del = false;
        r = (r + 1) % ROLES.length;
        setTimeout(tick, 300);
      }
    })();
    const dots = $("#dots"); // 14 lightweight floating dots
    for (let i = 0; i < 14; i++)
      dots.append(
        el("span", {
          style: `left:${Math.random() * 100}%;top:${40 + Math.random() * 60}%;animation-duration:${6 + Math.random() * 8}s;animation-delay:-${Math.random() * 8}s`,
        }),
      );
  }
  const ring = $(".photo-ring"),
    img = $("#profile");
  let triedPlaceholder = false;
  // 1) your photo (profile.jpg)  2) illustrated placeholder  3) "LB" initials
  img.addEventListener("error", () => {
    if (!triedPlaceholder) {
      triedPlaceholder = true;
      img.alt = "Profile photo placeholder";
      img.src = "assets/images/profile.jpg.png";
    } else ring.classList.add("no-img");
  });
  if (img.complete && img.naturalWidth === 0)
    img.dispatchEvent(new Event("error"));
  // gentle 3D tilt that follows the pointer (desktop only)
  if (!reduceMotion && matchMedia("(hover: hover)").matches) {
    const hero = $("#home");
    hero.addEventListener("pointermove", (e) => {
      const r = ring.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / innerWidth,
        y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      ring.style.setProperty("--ry", (x * 22).toFixed(1) + "deg");
      ring.style.setProperty("--rx", (-y * 22).toFixed(1) + "deg");
    });
    hero.addEventListener("pointerleave", () => {
      ring.style.setProperty("--rx", "0deg");
      ring.style.setProperty("--ry", "0deg");
    });
  }
}

/* ===== SCROLL REVEAL ===== */
function setupReveal() {
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 },
  );
  $$(".rv").forEach((n, i) => {
    n.style.transitionDelay = (i % 3) * 80 + "ms";
    io.observe(n);
  });
}

/* ===== CONTACT FORM ===== */
function setupForm() {
  const form = $("#form"),
    status = $("#status");
  const rules = {
    name: (v) => v.trim().length >= 2 || "Please enter your name.",
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ||
      "Please enter a valid email address.",
    subject: (v) => v.trim().length >= 3 || "Please enter a subject.",
    message: (v) =>
      v.trim().length >= 10 || "Message should be at least 10 characters.",
  };
  const check = (f) => {
    const res = rules[f.name](f.value),
      ok = res === true;
    f.setAttribute("aria-invalid", !ok);
    f.nextElementSibling.textContent = ok ? "" : res;
    return ok;
  };
  $$("input[name],textarea", form)
    .filter((f) => rules[f.name])
    .forEach((f) => f.addEventListener("blur", () => check(f)));
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "";
    status.textContent = "";
    const fields = $$("input,textarea", form).filter((f) => rules[f.name]);
    if (!fields.map(check).every(Boolean)) {
      status.className = "bad";
      status.textContent = "Please fix the highlighted fields.";
      return;
    }
    if (form.website.value) return; // honeypot: bots fill this, humans can't see it
    if (!CONFIG.formEndpoint) {
      // no backend yet: never fake success
      status.className = "bad";
      status.textContent =
        "The form isn't connected to an email service yet. Please email me directly.";
      return;
    }
    const btn = $("button[type=submit]", form);
    btn.disabled = true;
    status.textContent = "Sending...";
    try {
      const data = Object.fromEntries(
        fields.map((f) => [f.name, f.value.trim()]),
      );
      let url = CONFIG.formEndpoint;
      if (CONFIG.web3formsKey) {
        // Web3Forms: no activation step
        url = "https://api.web3forms.com/submit";
        data.access_key = CONFIG.web3formsKey;
        data.from_name = "Portfolio website";
        data.subject = "Portfolio message: " + data.subject;
      } else {
        data._subject = "Portfolio message: " + data.subject;
        data._template = "table";
        data._captcha = "false";
      }
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({}));
      const msg = String(out.message || "");
      if (/activat/i.test(msg)) {
        // first time: FormSubmit asks the owner to confirm by email
        status.className = "bad";
        status.textContent =
          "Almost ready: the site owner must confirm the activation email once. Please try again later or email " +
          CONFIG.email +
          ".";
        return;
      }
      if (!res.ok || out.success === "false" || out.success === false)
        throw new Error(msg || res.status);
      status.className = "ok";
      status.textContent = "Thank you! Your message has been sent.";
      form.reset();
    } catch (err) {
      // Fallback so the message is never lost: open the visitor's email app with the message filled in
      status.className = "bad";
      status.textContent =
        "Couldn't send directly, so your email app is opening instead. If nothing opens, write to " +
        CONFIG.email +
        ".";
      const d = Object.fromEntries(fields.map((f) => [f.name, f.value.trim()]));
      location.href =
        "mailto:" +
        CONFIG.email +
        "?subject=" +
        encodeURIComponent("Portfolio message: " + d.subject) +
        "&body=" +
        encodeURIComponent(
          d.message + "\n\nFrom: " + d.name + " (" + d.email + ")",
        );
    } finally {
      btn.disabled = false;
    }
  });
}

/* ===== ANIMATED PAGE BACKGROUND (soft drifting glows + connected particles) ===== */
function setupBackground() {
  const cv = $("#bg");
  if (!cv || reduceMotion) return;
  const cx = cv.getContext("2d"),
    dpr = Math.min(devicePixelRatio || 1, 1.5);
  let W,
    H,
    P = [],
    rgb = {},
    mx = -999,
    my = -999,
    t = 0;
  const toRgb = (h) => {
    h = h.trim().replace("#", "");
    if (h.length === 3) h = [...h].map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const readColors = () => {
    const s = getComputedStyle(document.documentElement);
    rgb = {
      a: toRgb(s.getPropertyValue("--v1")),
      b: toRgb(s.getPropertyValue("--v2")),
      c: toRgb(s.getPropertyValue("--v3")),
    };
  };
  readColors();
  new MutationObserver(readColors).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  function size() {
    W = innerWidth;
    H = innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(80, Math.floor((W * H) / 18000));
    P = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.8,
    }));
  }
  size();
  addEventListener("resize", size);
  addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true },
  );
  const orbs = [
    { k: "a", p: 0, sx: 0.0031, sy: 0.0023 },
    { k: "b", p: 2, sx: 0.0024, sy: 0.0029 },
    { k: "c", p: 4, sx: 0.0019, sy: 0.0026 },
  ];
  (function frame() {
    t++;
    cx.clearRect(0, 0, W, H);
    orbs.forEach((o) => {
      // slow drifting colour glows
      const x = W * (0.5 + 0.4 * Math.sin(t * o.sx + o.p)),
        y = H * (0.5 + 0.38 * Math.cos(t * o.sy + o.p));
      const g = cx.createRadialGradient(x, y, 0, x, y, Math.max(W, H) * 0.5),
        c = rgb[o.k];
      g.addColorStop(0, `rgba(${c},${o.k === "c" ? 0.09 : 0.13})`);
      g.addColorStop(1, `rgba(${c},0)`);
      cx.fillStyle = g;
      cx.fillRect(0, 0, W, H);
    });
    const c = rgb.b;
    cx.fillStyle = `rgb(${c})`;
    cx.strokeStyle = `rgb(${c})`;
    P.forEach((p, i) => {
      // particles + faint links
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      cx.globalAlpha = 0.55;
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, 6.283);
      cx.fill();
      for (let j = i + 1; j < P.length; j++) {
        const q = P[j],
          d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) {
          cx.globalAlpha = (1 - d / 130) * 0.22;
          cx.beginPath();
          cx.moveTo(p.x, p.y);
          cx.lineTo(q.x, q.y);
          cx.stroke();
        }
      }
      const dm = Math.hypot(p.x - mx, p.y - my);
      if (dm < 170) {
        cx.globalAlpha = (1 - dm / 170) * 0.4;
        cx.beginPath();
        cx.moveTo(p.x, p.y);
        cx.lineTo(mx, my);
        cx.stroke();
      }
    });
    cx.globalAlpha = 1;
    requestAnimationFrame(frame);
  })();
}

/* ===== INIT ===== */
$("#year").textContent = new Date().getFullYear();
renderSocial();
renderSkills();
renderProjects();
setupNav();
setupHero();
setupForm();
setupReveal();
setupBackground();
