const DATA = window.ODS_DATA;
const money = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" });

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function activateTab(nextTab) {
  tabs.forEach((tab) => {
    const selected = tab === nextTab;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    const match = panel.id === nextTab.getAttribute("aria-controls");
    panel.hidden = !match;
  });

  if (nextTab.id === "tab-resume") renderResume();
  return true;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab);
  });

  tab.addEventListener("keydown", (event) => {
    const index = tabs.indexOf(tab);
    let next = null;

    if (event.key === "ArrowRight") {
      next = tabs[(index + 1) % tabs.length];
    } else if (event.key === "ArrowLeft") {
      next = tabs[(index - 1 + tabs.length) % tabs.length];
    } else if (event.key === "Home") {
      next = tabs[0];
    } else if (event.key === "End") {
      next = tabs[tabs.length - 1];
    }

    if (next) {
      event.preventDefault();
      activateTab(next);
    }
  });
});

let uid = 0;
const nextId = () => `row-${++uid}`;

const answers = {};
DATA.questions.forEach((group) => {
  group.fields.forEach((field) => {
    answers[field.id] = "";
  });
});

const lines = {};
DATA.catalog.forEach((category) => {
  lines[category.id] = [];
});

const inclusionState = {};
DATA.inclusions.forEach((section) => {
  section.groups.forEach((group) => {
    group.items.forEach((item) => {
      inclusionState[item.id] = item.value;
    });
  });
});

const optionCards = [
  {
    id: "opt1",
    name: "Option 1 — Essentielle",
    pitch: "Socle de service aligné sur la prise de besoin et la grille de prix.",
    lockedBase: true,
    extras: []
  },
  {
    id: "opt2",
    name: "Option 2 — Renforcée",
    pitch: "L’essentiel, enrichi de protections et d’accompagnement à valeur ajoutée.",
    lockedBase: false,
    extras: []
  },
  {
    id: "opt3",
    name: "Option 3 — Complète",
    pitch: "Vision élargie : cybersécurité, IA et gouvernance TI mensuelle.",
    lockedBase: false,
    extras: []
  }
];

function createExtraFromBundle(bundleId) {
  const bundle = DATA.bundles.find((entry) => entry.id === bundleId);
  if (!bundle) return null;
  return {
    uid: nextId(),
    bundleId: bundle.id,
    label: bundle.label,
    description: bundle.description,
    price: null,
    customizable: Boolean(bundle.customizable)
  };
}

function extrasTotal(card) {
  return card.extras.reduce((sum, extra) => {
    if (extra.price === null || Number.isNaN(extra.price)) return sum;
    return sum + extra.price;
  }, 0);
}

function optionTotal(card) {
  return getMonthlyTotal() + extrasTotal(card);
}

function availableBundlesFor(card) {
  return DATA.bundles.filter((bundle) => {
    if (bundle.customizable) return true;
    return !card.extras.some((extra) => extra.bundleId === bundle.id);
  });
}

function renderResume() {
  const ready = isNeedsReady();
  document.getElementById("resume-locked").hidden = ready;
  document.getElementById("resume-content").hidden = !ready;
  if (!ready) return;

  const base = getMonthlyTotal();
  const oneoff = getOneOffTotal();
  document.getElementById("resume-client").innerHTML = `
    <div class="resume-client-grid">
      <div><span>Client</span><strong>${escapeHtml(answers.entreprise)}</strong></div>
      <div><span>Contact</span><strong>${escapeHtml(answers.contact)}${answers.role_contact ? ` — ${escapeHtml(answers.role_contact)}` : ""}</strong></div>
      <div><span>Budget TI</span><strong>${escapeHtml(answers.budget || "Non renseigné")}</strong></div>
      <div><span>Mensualité de base</span><strong>${formatPrice(base)}</strong></div>
      <div><span>Frais uniques</span><strong>${formatPrice(oneoff)}</strong></div>
    </div>
  `;

  document.getElementById("options-root").innerHTML = optionCards
    .map((card) => {
      const baseList = `<ul class="option-base-list">
        ${
          DATA.catalog
            .flatMap((category) => {
              if (category.kind === "oneoff") return [];
              return lines[category.id].map(
                (line) =>
                  `<li><span>${escapeHtml(line.label)}</span><strong>${formatPrice(lineTotal(line))}</strong></li>`
              );
            })
            .concat(
              getSatQuote().details
                .filter((entry) => entry.total > 0)
                .map(
                  (entry) =>
                    `<li><span>${escapeHtml(entry.label)}</span><strong>${formatPrice(entry.total)}</strong></li>`
                )
            )
            .join("") || "<li>Aucun item mensuel sélectionné dans la grille.</li>"
        }
      </ul>`;

      const extrasHtml =
        card.extras.length === 0
          ? `<p class="option-note">Aucun bundle ajouté. Utilisez « + » pour enrichir cette option.</p>`
          : card.extras
              .map((extra) => {
                const title = extra.customizable
                  ? `<input class="extra-label" data-extra-label="${card.id}" data-uid="${extra.uid}" type="text" value="${escapeAttr(extra.label)}">`
                  : `<strong>${escapeHtml(extra.label)}</strong>`;
                const desc = extra.customizable
                  ? `<textarea class="extra-desc" data-extra-desc="${card.id}" data-uid="${extra.uid}" rows="2">${escapeHtml(extra.description)}</textarea>`
                  : `<p>${escapeHtml(extra.description)}</p>`;
                return `<div class="extra-row" data-uid="${extra.uid}">
                  <div class="extra-copy">
                    ${title}
                    ${desc}
                  </div>
                  <label class="field extra-price-field">
                    <span>Prix ajouté</span>
                    <input class="money-input" data-extra-price="${card.id}" data-uid="${extra.uid}" type="text" inputmode="decimal" value="${escapeAttr(priceInputValue(extra.price))}" placeholder="À déterminer">
                  </label>
                  <button type="button" class="icon-btn" data-extra-remove="${card.id}" data-uid="${extra.uid}" aria-label="Retirer">✕</button>
                </div>`;
              })
              .join("");

      const addOptions = availableBundlesFor(card)
        .map((bundle) => `<option value="${bundle.id}">${escapeHtml(bundle.label)}</option>`)
        .join("");

      const added = extrasTotal(card);
      const total = optionTotal(card);

      return `<article class="option-card" data-opt="${card.id}">
        <header>
          <input class="option-title" data-opt-name="${card.id}" type="text" value="${escapeAttr(card.name)}">
          <textarea class="option-pitch" data-opt-pitch="${card.id}" rows="2">${escapeHtml(card.pitch)}</textarea>
        </header>
        <div class="option-base">
          <span>Base (onglet 1)</span>
          <strong>${formatPrice(base)}</strong>
        </div>
        ${card.lockedBase ? `<p class="option-note">Option de référence. Ajoutez des bundles seulement si nécessaire.</p>` : ""}
        ${baseList}
        <div class="option-extras">
          <div class="option-extras-head">
            <h3>Bundles ajoutés</h3>
          </div>
          <div class="extra-list">${extrasHtml}</div>
          <div class="extra-add">
            <select data-extra-add="${card.id}">
              <option value="">Ajouter un bundle…</option>
              ${addOptions}
            </select>
            <button type="button" class="add-custom" data-extra-plus="${card.id}">+</button>
          </div>
        </div>
        <div class="option-sums">
          <div><span>Prix ajouté</span><strong data-opt-added="${card.id}">${formatPrice(added)}</strong></div>
          <div class="option-total"><span>Mensualité totale</span><strong data-opt-total="${card.id}">${formatPrice(total)}</strong></div>
        </div>
      </article>`;
    })
    .join("");
}

function refreshOptionTotals() {
  optionCards.forEach((card) => {
    const added = document.querySelector(`[data-opt-added="${card.id}"]`);
    const total = document.querySelector(`[data-opt-total="${card.id}"]`);
    if (added) added.textContent = formatPrice(extrasTotal(card));
    if (total) total.textContent = formatPrice(optionTotal(card));
  });
}

function findExtra(cardId, uid) {
  const card = optionCards.find((entry) => entry.id === cardId);
  if (!card) return null;
  return card.extras.find((extra) => String(extra.uid) === String(uid)) || null;
}

function collectOptionsBrief() {
  const base = getMonthlyTotal();
  const entreprise = answers.entreprise || "Client à confirmer";
  const chunks = [
    `# One-pager ODS — 3 options — ${entreprise}`,
    "",
    "Document de synthèse pour générer une page unique présentant trois options de prix au client.",
    "Rédige un one-pager clair, professionnel et comparatif. Ne invente aucun prix absent de ce brief.",
    "",
    "## Contexte client",
    `- **Entreprise** : ${answers.entreprise || "Non renseigné"}`,
    `- **Contact** : ${answers.contact || "Non renseigné"}`,
    `- **Rôle** : ${answers.role_contact || "Non renseigné"}`,
    `- **Domaine** : ${answers.domaine || "Non renseigné"}`,
    `- **Budget TI** : ${answers.budget || "Non renseigné"}`,
    `- **Enjeux** : ${(answers.enjeux || "").trim() || "Non renseigné"}`,
    `- **Pourquoi maintenant** : ${(answers.pourquoi || "").trim() || "Non renseigné"}`,
    "",
    `## Prix de base`,
    `- Mensualité issue de la grille : ${formatPrice(base)}`,
    `- Frais uniques : ${formatPrice(getOneOffTotal())}`
  ];

  const satQuoteHead = getSatQuote();
  if (satQuoteHead.active && !satQuoteHead.error) {
    chunks.push(`- Dont SAT (calculateur) : ${formatPrice(satQuoteHead.monthly)} / mois + ${formatPrice(satQuoteHead.implantation)} d'implantation`);
  }

  const monthlyLines = [];
  DATA.catalog.forEach((category) => {
    if (category.kind === "oneoff") return;
    lines[category.id].forEach((line) => {
      monthlyLines.push(`- ${line.label} : ${formatPrice(lineTotal(line))}`);
    });
  });
  const satQuote = getSatQuote();
  if (satQuote.active && !satQuote.error) {
    satQuote.details.forEach((entry) => {
      monthlyLines.push(`- ${entry.label} : ${entry.total ? formatPrice(entry.total) : "Inclus"}`);
    });
  }
  chunks.push("", "### Détail de la base");
  chunks.push(monthlyLines.length ? monthlyLines.join("\n") : "- Aucun item mensuel");

  chunks.push("", "## Les 3 options");
  optionCards.forEach((card, index) => {
    chunks.push("", `### ${card.name}`);
    chunks.push(card.pitch);
    chunks.push(`- Base : ${formatPrice(base)}`);
    if (!card.extras.length) {
      chunks.push("- Aucun bundle ajouté");
    } else {
      card.extras.forEach((extra) => {
        chunks.push(
          `- Bundle : ${extra.label} — ${extra.description} — prix ajouté : ${formatPrice(extra.price)}`
        );
      });
    }
    chunks.push(`- **Prix ajouté** : ${formatPrice(extrasTotal(card))}`);
    chunks.push(`- **Mensualité totale** : ${formatPrice(optionTotal(card))}`);
    if (index === 0) chunks.push("- Positionnement : option d’entrée / socle");
    if (index === 1) chunks.push("- Positionnement : option recommandée / équilibre");
    if (index === 2) chunks.push("- Positionnement : option premium / couverture élargie");
  });

  chunks.push(
    "",
    "## Consigne de rédaction",
    "Produis un one-pager client avec : rappel du besoin, tableau comparatif des 3 options, bénéfices de chaque bundle retenu, prix ajouté et mensualité totale par option, et une recommandation brève. Ton BZ, clair et orienté décision."
  );

  return chunks.join("\n");
}

function isNeedsReady() {
  return Boolean(
    (answers.entreprise || "").trim() &&
      (answers.contact || "").trim() &&
      (answers.role_contact || "").trim()
  );
}

function updateResumeAccess() {
  const ready = isNeedsReady();
  const tab = document.getElementById("tab-resume");
  const goBtn = document.getElementById("to-options-btn");
  tab.classList.toggle("is-locked", !ready);
  tab.setAttribute("aria-disabled", String(!ready));
  if (goBtn) {
    goBtn.disabled = !ready;
    goBtn.title = ready
      ? "Ouvrir le résumé 3 options"
      : "Complétez entreprise, contact et rôle du contact";
  }
}

function getMonthlyTotal() {
  let monthly = getSatQuote().monthly;
  DATA.catalog.forEach((category) => {
    const sum = lines[category.id].reduce((acc, line) => acc + (lineTotal(line) || 0), 0);
    if (category.kind !== "oneoff") monthly += sum;
  });
  return monthly;
}

function getOneOffTotal() {
  let oneoff = getSatQuote().implantation;
  DATA.catalog.forEach((category) => {
    const sum = lines[category.id].reduce((acc, line) => acc + (lineTotal(line) || 0), 0);
    if (category.kind === "oneoff") oneoff += sum;
  });
  return oneoff;
}

function formatPrice(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "À déterminer";
  return money.format(value);
}

function parseMoney(value) {
  if (value === null || value === undefined) return null;
  const cleaned = String(value)
    .replace(/\s/g, "")
    .replace(/\$/g, "")
    .replace("CAD", "")
    .replace(",", ".");
  if (!cleaned) return null;
  const amount = Number(cleaned);
  return Number.isNaN(amount) ? null : amount;
}

function priceInputValue(price) {
  if (price === null || price === undefined || Number.isNaN(price)) return "";
  return formatPrice(price);
}

function lineTotal(line) {
  if (line.price === null || line.price === undefined) return null;
  return line.price * Number(line.qty || 0);
}

function renderQuestions() {
  const root = document.getElementById("questions-root");
  root.innerHTML = DATA.questions
    .map(
      (group) => `
      <section class="q-group">
        <h3>${group.title}</h3>
        <div class="q-grid">
          ${group.fields
            .map((field) => {
              const wide = field.type === "textarea" ? " wide" : "";
              const control =
                field.type === "textarea"
                  ? `<textarea id="q-${field.id}" rows="3">${escapeHtml(answers[field.id])}</textarea>`
                  : `<input id="q-${field.id}" type="text" value="${escapeAttr(answers[field.id])}">`;
              return `<div class="field${wide}"><label for="q-${field.id}">${field.label}</label>${control}</div>`;
            })
            .join("")}
        </div>
      </section>`
    )
    .join("");

  DATA.questions.forEach((group) => {
    group.fields.forEach((field) => {
      document.getElementById(`q-${field.id}`).addEventListener("input", (event) => {
        answers[field.id] = event.target.value;
        updateResumeAccess();
        if (field.id === "nb_usagers" && !satCalc.usersTouched) {
          const raw = String(event.target.value).replace(/[^\d]/g, "");
          const n = Number.parseInt(raw, 10);
          satCalc.users = n >= 1 && n <= 300 ? String(n) : "";
          const satUsers = document.getElementById("sat-users");
          if (satUsers) satUsers.value = satCalc.users;
          refreshSatCalculatorView();
        }
      });
    });
  });
}

renderQuestions();

const OPTIONAL_FAMILIES = new Set(["SAT", "Cyber", "Téléphonie"]);
const familyOpen = {
  SAT: false,
  Cyber: false,
  Téléphonie: false
};

const satCalc = {
  users: "",
  usersTouched: false,
  ulearn: false,
  ubreach: false,
  domains: "1",
  uphish: false,
  campaigns: "Non",
  rapport: false,
  frequency: "Annuel"
};

function seedSatUsersFromNeeds() {
  if (satCalc.usersTouched || satCalc.users) return;
  const raw = String(answers.nb_usagers || "").replace(/[^\d]/g, "");
  const n = Number.parseInt(raw, 10);
  if (n >= 1 && n <= 300) satCalc.users = String(n);
}

function satUserCount() {
  const n = Number.parseInt(satCalc.users, 10);
  return Number.isInteger(n) ? n : 0;
}

function satSupportTier(users) {
  if (users >= 1 && users <= 10) return { label: "1 à 10 usagers", support: 35, implantation: 350 };
  if (users >= 11 && users <= 25) return { label: "11 à 25 usagers", support: 50, implantation: 400 };
  if (users >= 26 && users <= 50) return { label: "26 à 50 usagers", support: 65, implantation: 450 };
  if (users >= 51) return { label: "51+ usagers", support: 80, implantation: 500 };
  return null;
}

function getSatQuote() {
  const users = satUserCount();
  const active = satCalc.ulearn || satCalc.ubreach || satCalc.uphish || satCalc.rapport;
  if (!active) {
    return { active: false, users, implantation: 0, monthly: 0, details: [], error: "" };
  }
  if (users < 1 || users > 300) {
    return {
      active: true,
      users,
      implantation: 0,
      monthly: 0,
      details: [],
      error: "Le nombre d'utilisateurs doit être entre 1 et 300."
    };
  }

  const tier = satSupportTier(users);
  const details = [];
  let monthly = 0;

  if (satCalc.ulearn) {
    const amount = users * 3.25;
    monthly += amount;
    details.push({
      label: `Capsules uLearn (${users} × ${formatPrice(3.25)})`,
      total: amount
    });
  }

  if (satCalc.ubreach) {
    const domains = Number.parseInt(satCalc.domains, 10) || 0;
    if (domains < 1 || domains > 10) {
      return {
        active: true,
        users,
        implantation: 0,
        monthly: 0,
        details: [],
        error: "Le nombre de domaines doit être entre 1 et 10."
      };
    }
    const amount = domains * 15;
    monthly += amount;
    details.push({
      label: `Surveillance uBreach (${domains} domaine${domains > 1 ? "s" : ""})`,
      total: amount
    });
  }

  monthly += tier.support;
  details.push({
    label: `Support SAT (${tier.label})`,
    total: tier.support
  });

  if (satCalc.uphish) {
    details.push({
      label: "Campagnes d'hameçonnage automatisées uPhish",
      total: 0
    });
    if (satCalc.campaigns !== "Non") {
      const count = Number.parseInt(satCalc.campaigns, 10) || 0;
      const amount = count * 25;
      monthly += amount;
      details.push({
        label: `Campagnes uPhish personnalisées (×${count})`,
        total: amount
      });
    }
  }

  if (satCalc.rapport) {
    const amounts = { Annuel: 45, "Bi-annuel": 75, Trimestriels: 120 };
    const amount = amounts[satCalc.frequency] || 0;
    monthly += amount;
    details.push({
      label: `Rapport ${satCalc.frequency.toLowerCase()}`,
      total: amount
    });
  }

  return {
    active: true,
    users,
    implantation: tier.implantation,
    monthly,
    details,
    error: ""
  };
}

function satFamilyHint() {
  const quote = getSatQuote();
  if (quote.active && !quote.error) return `facultatif · ${formatPrice(quote.monthly)} / mois`;
  return "facultatif";
}

function refreshSatCalculatorView() {
  const quote = getSatQuote();
  const implEl = document.getElementById("sat-impl-out");
  const monthEl = document.getElementById("sat-month-out");
  const errEl = document.getElementById("sat-calc-error");
  const breakdown = document.getElementById("sat-breakdown");
  const hint = document.getElementById("sat-family-hint");

  if (implEl) implEl.textContent = quote.error || !quote.active ? "—" : formatPrice(quote.implantation);
  if (monthEl) monthEl.textContent = quote.error || !quote.active ? "—" : formatPrice(quote.monthly);
  if (errEl) {
    errEl.hidden = !quote.error;
    errEl.textContent = quote.error || "";
  }
  if (breakdown) {
    breakdown.innerHTML = quote.details
      .map(
        (entry) =>
          `<li><span>${escapeHtml(entry.label)}</span><strong>${
            entry.total ? formatPrice(entry.total) : "Inclus"
          }</strong></li>`
      )
      .join("");
    breakdown.hidden = quote.details.length === 0;
  }
  if (hint) hint.textContent = satFamilyHint();
  renderTotals();
}

function satSwitch(key, label) {
  const on = satCalc[key];
  return `<button type="button" class="ios-switch ${on ? "is-on" : ""}" data-sat-toggle="${key}" role="switch" aria-checked="${on}" aria-label="${escapeAttr(label)}">
    <span class="ios-switch-track">
      <span class="ios-switch-label ios-switch-label-on">Oui</span>
      <span class="ios-switch-label ios-switch-label-off">Non</span>
      <span class="ios-switch-thumb" aria-hidden="true"></span>
    </span>
  </button>`;
}

function renderSatCalculator() {
  seedSatUsersFromNeeds();
  const quote = getSatQuote();
  return `<article class="sat-calc" id="sat-calc">
    <div class="sat-calc-head">
      <h4>Calculateur de mensualité SAT</h4>
      <p class="cat-note">Même grille que la plateforme SAT : uLearn, uBreach, uPhish et rapports.</p>
    </div>
    <div class="sat-calc-grid">
      <div class="sat-calc-row">
        <label for="sat-users">Nombre d'utilisateurs</label>
        <input id="sat-users" class="sat-num" data-sat-field="users" type="text" inputmode="numeric" value="${escapeAttr(satCalc.users)}" placeholder="1 à 300">
      </div>
      <div class="sat-calc-row">
        <span>Capsules uLearn</span>
        ${satSwitch("ulearn", "Capsules uLearn")}
      </div>
      <div class="sat-calc-row">
        <span>Surveillance du Dark Web uBreach</span>
        ${satSwitch("ubreach", "Surveillance du Dark Web uBreach")}
      </div>
      <div class="sat-sub" data-sat-sub="ubreach" ${satCalc.ubreach ? "" : "hidden"}>
        <label for="sat-domains">Nombre de domaine(s) à surveiller</label>
        <input id="sat-domains" class="sat-num" data-sat-field="domains" type="text" inputmode="numeric" value="${escapeAttr(satCalc.domains)}">
      </div>
      <div class="sat-calc-row">
        <span>Campagnes d'hameçonnage automatisées uPhish</span>
        ${satSwitch("uphish", "Campagnes d'hameçonnage automatisées uPhish")}
      </div>
      <div class="sat-sub" data-sat-sub="uphish" ${satCalc.uphish ? "" : "hidden"}>
        <label for="sat-campaigns">Ajout de campagne(s) personnalisée(s)</label>
        <select id="sat-campaigns" data-sat-field="campaigns">
          <option value="Non" ${satCalc.campaigns === "Non" ? "selected" : ""}>Non</option>
          <option value="1" ${satCalc.campaigns === "1" ? "selected" : ""}>1</option>
          <option value="2" ${satCalc.campaigns === "2" ? "selected" : ""}>2 (recommandé)</option>
          <option value="3" ${satCalc.campaigns === "3" ? "selected" : ""}>3</option>
          <option value="4" ${satCalc.campaigns === "4" ? "selected" : ""}>4</option>
          <option value="5" ${satCalc.campaigns === "5" ? "selected" : ""}>5</option>
        </select>
      </div>
      <div class="sat-calc-row">
        <span>Rapport</span>
        ${satSwitch("rapport", "Rapport SAT")}
      </div>
      <div class="sat-sub" data-sat-sub="rapport" ${satCalc.rapport ? "" : "hidden"}>
        <label for="sat-frequency">Fréquence du rapport</label>
        <select id="sat-frequency" data-sat-field="frequency">
          <option value="Annuel" ${satCalc.frequency === "Annuel" ? "selected" : ""}>Annuel</option>
          <option value="Bi-annuel" ${satCalc.frequency === "Bi-annuel" ? "selected" : ""}>Bi-annuel</option>
          <option value="Trimestriels" ${satCalc.frequency === "Trimestriels" ? "selected" : ""}>Trimestriels</option>
        </select>
      </div>
    </div>
    <p class="sat-calc-error" id="sat-calc-error" ${quote.error ? "" : "hidden"}>${escapeHtml(quote.error)}</p>
    <ul class="sat-breakdown" id="sat-breakdown" ${quote.details.length ? "" : "hidden"}>
      ${quote.details
        .map(
          (entry) =>
            `<li><span>${escapeHtml(entry.label)}</span><strong>${
              entry.total ? formatPrice(entry.total) : "Inclus"
            }</strong></li>`
        )
        .join("")}
    </ul>
    <div class="sat-results">
      <div><span>Frais d'implantation</span><strong id="sat-impl-out">${
        quote.error || !quote.active ? "—" : formatPrice(quote.implantation)
      }</strong></div>
      <div><span>Mensualité SAT</span><strong id="sat-month-out">${
        quote.error || !quote.active ? "—" : formatPrice(quote.monthly)
      }</strong></div>
    </div>
    <p class="cat-note sat-calc-note">Les tableaux ci-dessous restent disponibles pour des ajouts hors calculateur.</p>
  </article>`;
}

function renderPricing() {
  const root = document.getElementById("pricing-root");
  const families = [];
  DATA.catalog.forEach((category) => {
    const last = families[families.length - 1];
    if (!last || last.name !== category.family) {
      families.push({ name: category.family, categories: [category] });
    } else {
      last.categories.push(category);
    }
  });

  root.innerHTML = families
    .map((family) => {
      const inner = family.categories.map((category) => renderPriceCategory(category)).join("");
      if (!OPTIONAL_FAMILIES.has(family.name)) {
        return `<h3 class="family-label">${family.name}</h3>${inner}`;
      }
      const opened = familyOpen[family.name] ? "open" : "";
      const hint = family.name === "SAT" ? satFamilyHint() : "facultatif";
      const hintId = family.name === "SAT" ? " id=\"sat-family-hint\"" : "";
      const body = family.name === "SAT" ? `${renderSatCalculator()}${inner}` : inner;
      return `<details class="family-fold" data-family="${family.name}" ${opened}>
        <summary class="family-label">${family.name} <small${hintId}>${hint}</small></summary>
        <div class="family-fold-body">${body}</div>
      </details>`;
    })
    .join("");

  renderTotals();
}

function renderPriceCategory(category) {
  const options = category.items
    .map((item) => {
      const already = lines[category.id].some((line) => line.itemId === item.id);
      const priceLabel = item.price === null ? "AD" : formatPrice(item.price);
      return `<option value="${item.id}" ${already ? "disabled" : ""}>${item.label} — ${priceLabel}</option>`;
    })
    .join("");

  const rows = lines[category.id];
  const body =
    rows.length === 0
      ? `<tr class="empty-row"><td colspan="5">Aucun item. Choisissez-en un dans la liste.</td></tr>`
      : rows
          .map((line, index) => {
            const total = lineTotal(line);
            const nameCell = line.custom
              ? `<input class="item-name" data-act="label" data-cat="${category.id}" data-uid="${line.uid}" type="text" value="${escapeAttr(line.label)}">`
              : escapeHtml(line.label);
            const priceCell = `<input class="money-input" data-act="price" data-cat="${category.id}" data-uid="${line.uid}" type="text" inputmode="decimal" value="${escapeAttr(priceInputValue(line.price))}" placeholder="À déterminer">`;
            const upDisabled = index === 0 ? "disabled" : "";
            const downDisabled = index === rows.length - 1 ? "disabled" : "";
            return `<tr data-row="${line.uid}">
              <td>${nameCell}</td>
              <td class="num">${priceCell}</td>
              <td class="num"><input data-act="qty" data-cat="${category.id}" data-uid="${line.uid}" type="number" min="0" step="1" value="${line.qty}"></td>
              <td class="num line-total">${formatPrice(total)}</td>
              <td>
                <div class="row-tools">
                  <button type="button" class="icon-btn" data-move="up" data-cat="${category.id}" data-uid="${line.uid}" ${upDisabled} title="Monter" aria-label="Monter">↑</button>
                  <button type="button" class="icon-btn" data-move="down" data-cat="${category.id}" data-uid="${line.uid}" ${downDisabled} title="Descendre" aria-label="Descendre">↓</button>
                  <button type="button" class="icon-btn" data-act="remove" data-cat="${category.id}" data-uid="${line.uid}" title="Retirer" aria-label="Retirer">✕</button>
                </div>
              </td>
            </tr>`;
          })
          .join("");

  const subtotal = rows.reduce((sum, line) => sum + (lineTotal(line) || 0), 0);

  return `<article class="cat-card" data-cat="${category.id}">
    <div class="cat-toolbar">
      <div>
        <h4>${category.name}</h4>
        ${category.note ? `<p class="cat-note">${category.note}</p>` : ""}
      </div>
      <div class="cat-actions">
        <select data-act="add" data-cat="${category.id}">
          <option value="">Ajouter un item…</option>
          ${options}
        </select>
        <button type="button" class="add-custom" data-act="custom" data-cat="${category.id}">+ Élément</button>
      </div>
    </div>
    <table class="price-table">
      <thead>
        <tr>
          <th>Item</th>
          <th class="num">Prix</th>
          <th class="num">Qté</th>
          <th class="num">Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${body}</tbody>
      <tfoot>
        <tr class="subtotal-row">
          <td colspan="3">Sous-total</td>
          <td class="num">${formatPrice(subtotal)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </article>`;
}

function openFamilyFor(catId) {
  const category = DATA.catalog.find((item) => item.id === catId);
  if (category && OPTIONAL_FAMILIES.has(category.family)) {
    familyOpen[category.family] = true;
  }
}

function renderTotals() {
  document.getElementById("pricing-totals").innerHTML = `
    <div>Mensualité <strong>${formatPrice(getMonthlyTotal())}</strong></div>
    <div>Frais uniques <strong>${formatPrice(getOneOffTotal())}</strong></div>
  `;
}

function updateInclusionCount() {
  const iCount = DATA.inclusions.reduce(
    (sum, section) => sum + section.groups.reduce((acc, group) => acc + group.items.length, 0),
    0
  );
  const nav = document.getElementById("nav-i");
  if (nav) nav.textContent = `${iCount} items à basculer`;
}

function renderInclusions() {
  const root = document.getElementById("inclusions-root");
  root.innerHTML = DATA.inclusions
    .map(
      (section) => `
      <section class="inc-section" data-section="${section.id}">
        <div class="inc-head">
          <h3>${section.title}</h3>
          <div class="inc-tools">
            <button type="button" class="add-custom" data-inc-all="inclus" data-section="${section.id}">Tout inclus</button>
            <button type="button" class="add-custom" data-inc-all="exclus" data-section="${section.id}">Tout exclus</button>
          </div>
        </div>
        ${section.groups
          .map(
            (group, groupIndex) => `
          <div class="inc-group">
            <div class="inc-group-head">
              <h4>${group.heading}</h4>
              <button type="button" class="add-custom" data-inc-add="${section.id}" data-group="${groupIndex}">+ Élément</button>
            </div>
            ${
              group.items.length === 0
                ? `<p class="inc-empty">Aucun élément dans ce groupe.</p>`
                : group.items
                    .map((item) => {
                      const value = inclusionState[item.id] || "exclus";
                      const label = item.custom
                        ? `<input class="inc-label" data-inc-label="${item.id}" type="text" value="${escapeAttr(item.label)}">`
                        : `<p>${escapeHtml(item.label)}</p>`;
                      return `<div class="inc-row">
                  ${label}
                  <div class="inc-row-tools">
                    <button type="button" class="ios-switch ${value === "inclus" ? "is-on" : ""}" data-inc-toggle="${item.id}" role="switch" aria-checked="${value === "inclus"}" aria-label="${escapeAttr(item.label)}">
                      <span class="ios-switch-track">
                        <span class="ios-switch-label ios-switch-label-on">Inclus</span>
                        <span class="ios-switch-label ios-switch-label-off">Exclus</span>
                        <span class="ios-switch-thumb" aria-hidden="true"></span>
                      </span>
                    </button>
                    <button type="button" class="icon-btn" data-inc-remove="${item.id}" data-section="${section.id}" data-group="${groupIndex}" aria-label="Retirer">✕</button>
                  </div>
                </div>`;
                    })
                    .join("")
            }
          </div>`
          )
          .join("")}
      </section>`
    )
    .join("");
  updateInclusionCount();
}

function findLine(catId, uidValue) {
  return lines[catId].find((line) => line.uid === uidValue);
}

function addCatalogItem(catId, itemId) {
  const category = DATA.catalog.find((item) => item.id === catId);
  const item = category.items.find((entry) => entry.id === itemId);
  if (!item || lines[catId].some((line) => line.itemId === item.id)) return;
  lines[catId].push({
    uid: nextId(),
    itemId: item.id,
    label: item.label,
    price: item.price,
    qty: 1,
    custom: false
  });
  openFamilyFor(catId);
  renderPricing();
}

function addCustomItem(catId) {
  lines[catId].push({
    uid: nextId(),
    itemId: null,
    label: "Nouvel élément",
    price: 0,
    qty: 1,
    custom: true
  });
  openFamilyFor(catId);
  renderPricing();
}

function moveLine(catId, uidValue, direction) {
  const list = lines[catId];
  if (!list || list.length < 2) return;
  const index = list.findIndex((line) => String(line.uid) === String(uidValue));
  const next = index + direction;
  if (index < 0 || next < 0 || next >= list.length) return;
  const copy = list.slice();
  const [row] = copy.splice(index, 1);
  copy.splice(next, 0, row);
  lines[catId] = copy;
  openFamilyFor(catId);
  renderPricing();
}

document.getElementById("pricing-root").addEventListener("change", (event) => {
  const satField = event.target.dataset.satField;
  if (satField) {
    satCalc[satField] = event.target.value;
    if (satField === "users") satCalc.usersTouched = true;
    refreshSatCalculatorView();
    return;
  }
  const act = event.target.getAttribute("data-act");
  const catId = event.target.getAttribute("data-cat");
  if (act === "add" && event.target.value) {
    addCatalogItem(catId, event.target.value);
  }
});

document.getElementById("pricing-root").addEventListener("toggle", (event) => {
  const fold = event.target.closest(".family-fold");
  if (!fold) return;
  familyOpen[fold.dataset.family] = fold.open;
}, true);

document.getElementById("pricing-root").addEventListener("pointerdown", (event) => {
  const moveBtn = event.target.closest("button[data-move]");
  if (!moveBtn || moveBtn.disabled) return;
  event.preventDefault();
  event.stopPropagation();
  const direction = moveBtn.getAttribute("data-move") === "up" ? -1 : 1;
  moveLine(moveBtn.getAttribute("data-cat"), moveBtn.getAttribute("data-uid"), direction);
});

document.getElementById("pricing-root").addEventListener("click", (event) => {
  const satToggle = event.target.closest("[data-sat-toggle]");
  if (satToggle) {
    event.preventDefault();
    const key = satToggle.dataset.satToggle;
    satCalc[key] = !satCalc[key];
    if (key === "ubreach" && satCalc.ubreach && !satCalc.domains) satCalc.domains = "1";
    satToggle.classList.toggle("is-on", satCalc[key]);
    satToggle.setAttribute("aria-checked", String(satCalc[key]));
    const sub = document.querySelector(`[data-sat-sub="${key}"]`);
    if (sub) sub.hidden = !satCalc[key];
    familyOpen.SAT = true;
    refreshSatCalculatorView();
    return;
  }
  const button = event.target.closest("button[data-act]");
  if (!button || button.disabled) return;
  event.preventDefault();
  const act = button.getAttribute("data-act");
  const catId = button.getAttribute("data-cat");
  const rowUid = button.getAttribute("data-uid");
  if (act === "custom") addCustomItem(catId);
  if (act === "remove") {
    lines[catId] = lines[catId].filter((line) => String(line.uid) !== String(rowUid));
    openFamilyFor(catId);
    renderPricing();
  }
});

document.getElementById("pricing-root").addEventListener("blur", (event) => {
  if (event.target.dataset.act !== "price") return;
  const line = findLine(event.target.dataset.cat, event.target.dataset.uid);
  if (!line) return;
  event.target.value = priceInputValue(line.price);
}, true);

document.getElementById("pricing-root").addEventListener("input", (event) => {
  const satField = event.target.dataset.satField;
  if (satField) {
    satCalc[satField] = event.target.value;
    if (satField === "users") satCalc.usersTouched = true;
    refreshSatCalculatorView();
    return;
  }
  const act = event.target.dataset.act;
  const catId = event.target.dataset.cat;
  const line = findLine(catId, event.target.dataset.uid);
  if (!line) return;
  if (act === "qty") line.qty = Number(event.target.value || 0);
  if (act === "price") {
    line.price = parseMoney(event.target.value);
  }
  if (act === "label") line.label = event.target.value;
  const row = event.target.closest("tr");
  if (row) {
    row.querySelector(".line-total").textContent = formatPrice(lineTotal(line));
  }
  const card = event.target.closest(".cat-card");
  const subtotal = lines[catId].reduce((sum, entry) => sum + (lineTotal(entry) || 0), 0);
  card.querySelector(".subtotal-row .num").textContent = formatPrice(subtotal);
  renderTotals();
});

document.getElementById("inclusions-root").addEventListener("click", (event) => {
  const bulk = event.target.closest("[data-inc-all]");
  if (bulk) {
    const section = DATA.inclusions.find((entry) => entry.id === bulk.dataset.section);
    section.groups.forEach((group) => {
      group.items.forEach((item) => {
        inclusionState[item.id] = bulk.dataset.incAll;
      });
    });
    renderInclusions();
    return;
  }

  const addBtn = event.target.closest("[data-inc-add]");
  if (addBtn) {
    const section = DATA.inclusions.find((entry) => entry.id === addBtn.dataset.incAdd);
    const group = section.groups[Number(addBtn.dataset.group)];
    const id = `custom-${nextId()}`;
    group.items.push({ id, label: "Nouvel élément", value: "exclus", custom: true });
    inclusionState[id] = "exclus";
    renderInclusions();
    const field = document.querySelector(`[data-inc-label="${id}"]`);
    if (field) {
      field.focus();
      field.select();
    }
    return;
  }

  const removeBtn = event.target.closest("[data-inc-remove]");
  if (removeBtn) {
    const section = DATA.inclusions.find((entry) => entry.id === removeBtn.dataset.section);
    const group = section.groups[Number(removeBtn.dataset.group)];
    const itemId = removeBtn.dataset.incRemove;
    group.items = group.items.filter((item) => item.id !== itemId);
    delete inclusionState[itemId];
    renderInclusions();
    return;
  }

  const toggle = event.target.closest("[data-inc-toggle]");
  if (!toggle) return;
  const id = toggle.dataset.incToggle;
  inclusionState[id] = inclusionState[id] === "inclus" ? "exclus" : "inclus";
  const on = inclusionState[id] === "inclus";
  toggle.classList.toggle("is-on", on);
  toggle.setAttribute("aria-checked", String(on));
});

document.getElementById("inclusions-root").addEventListener("input", (event) => {
  const field = event.target.closest("[data-inc-label]");
  if (!field) return;
  const id = field.dataset.incLabel;
  DATA.inclusions.forEach((section) => {
    section.groups.forEach((group) => {
      const item = group.items.find((entry) => entry.id === id);
      if (item) item.label = field.value;
    });
  });
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function collectBrief() {
  const entreprise = answers.entreprise || "Client à confirmer";
  const chunks = [
    `# Brief ODS — ${entreprise}`,
    "",
    "Document de synthèse à déposer à une IA pour rédiger une offre de service BZ.",
    "Rédige une ODS professionnelle à partir des informations ci-dessous. Conserve le ton BZ, structure l'offre, et n'invente pas de prix ou d'inclusions absents de ce brief.",
    "",
    "## 1. Prise de besoin"
  ];

  DATA.questions.forEach((group) => {
    chunks.push("", `### ${group.title}`);
    group.fields.forEach((field) => {
      const value = (answers[field.id] || "").trim() || "Non renseigné";
      chunks.push(`- **${field.label}** : ${value}`);
    });
  });

  chunks.push("", "## 2. Grille de prix");
  let monthly = getSatQuote().monthly;
  let oneoff = getSatQuote().implantation;
  let hasPrices = false;

  const satQuote = getSatQuote();
  if (satQuote.active && !satQuote.error) {
    hasPrices = true;
    chunks.push("", "### SAT — Calculateur de mensualité");
    chunks.push(`- Nombre d'utilisateurs : ${satQuote.users}`);
    chunks.push(`- Capsules uLearn : ${satCalc.ulearn ? "Oui" : "Non"}`);
    chunks.push(
      `- Surveillance uBreach : ${satCalc.ubreach ? "Oui" : "Non"}${
        satCalc.ubreach ? ` (${satCalc.domains} domaine${Number.parseInt(satCalc.domains, 10) > 1 ? "s" : ""})` : ""
      }`
    );
    chunks.push(
      `- uPhish : ${satCalc.uphish ? "Oui" : "Non"}${
        satCalc.uphish && satCalc.campaigns !== "Non" ? ` (${satCalc.campaigns} campagne(s) personnalisée(s))` : ""
      }`
    );
    chunks.push(
      `- Rapport : ${satCalc.rapport ? "Oui" : "Non"}${satCalc.rapport ? ` (${satCalc.frequency})` : ""}`
    );
    satQuote.details.forEach((entry) => {
      chunks.push(`- ${entry.label} : ${entry.total ? formatPrice(entry.total) : "Inclus"}`);
    });
    chunks.push(`- Frais d'implantation SAT : ${formatPrice(satQuote.implantation)}`);
    chunks.push(`- Mensualité SAT : ${formatPrice(satQuote.monthly)}`);
  }

  DATA.catalog.forEach((category) => {
    const rows = lines[category.id];
    if (!rows.length) return;
    hasPrices = true;
    const sum = rows.reduce((acc, line) => acc + (lineTotal(line) || 0), 0);
    if (category.kind === "oneoff") oneoff += sum;
    else monthly += sum;
    chunks.push("", `### ${category.family} — ${category.name} (${category.kind === "oneoff" ? "frais uniques" : "mensuel"})`);
    rows.forEach((line) => {
      chunks.push(
        `- ${line.label} | prix ${formatPrice(line.price)} | qté ${line.qty} | total ${formatPrice(lineTotal(line))}`
      );
    });
    chunks.push(`- Sous-total : ${formatPrice(sum)}`);
  });

  if (!hasPrices) {
    chunks.push("", "Aucun item de prix n'a été ajouté.");
  } else {
    chunks.push("", `**Mensualité totale : ${formatPrice(monthly)}**`);
    chunks.push(`**Frais uniques totaux : ${formatPrice(oneoff)}**`);
  }

  chunks.push("", "## 3. Inclusions et exclusions");
  DATA.inclusions.forEach((section) => {
    const included = [];
    const excluded = [];
    section.groups.forEach((group) => {
      if (!group.items.length) return;
      group.items.forEach((item) => {
        const target = inclusionState[item.id] === "inclus" ? included : excluded;
        target.push(`${group.heading} — ${item.label}`);
      });
    });
    if (!included.length && !excluded.length) return;
    chunks.push("", `### ${section.title}`);
    chunks.push("Inclus :");
    chunks.push(included.length ? included.map((item) => `- ${item}`).join("\n") : "- Aucun");
    chunks.push("Exclus :");
    chunks.push(excluded.length ? excluded.map((item) => `- ${item}`).join("\n") : "- Aucun");
  });

  chunks.push(
    "",
    "## Consigne de rédaction",
    "Produis le corps d'une offre de service : compréhension du besoin, proposition, inclusions/exclusions, grille de coûts, et mentions de facturation. Distingue clairement mensualités et frais uniques. Si un prix est « À déterminer », laisse-le tel quel."
  );

  return chunks.join("\n");
}

const dialog = document.getElementById("brief-dialog");
const briefText = document.getElementById("brief-text");

document.getElementById("ready-btn").addEventListener("click", () => {
  briefText.value = collectBrief();
  dialog.showModal();
});

document.getElementById("to-options-btn").addEventListener("click", () => {
  updateResumeAccess();
  if (!isNeedsReady()) {
    document.getElementById("page-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
    const field = document.getElementById("q-entreprise") || document.getElementById("q-contact");
    field?.focus();
    return;
  }
  activateTab(document.getElementById("tab-resume"));
  document.getElementById("page-scroll")?.scrollTo({ top: 0 });
});

document.getElementById("resume-back-btn").addEventListener("click", () => {
  activateTab(document.getElementById("tab-offre"));
  document.getElementById("page-scroll")?.scrollTo({ top: 0 });
});

document.getElementById("options-ready-btn").addEventListener("click", () => {
  briefText.value = collectOptionsBrief();
  dialog.showModal();
});

function addBundleToOption(cardId) {
  const card = optionCards.find((entry) => entry.id === cardId);
  const select = document.querySelector(`select[data-extra-add="${cardId}"]`);
  if (!card || !select || !select.value) return;
  const extra = createExtraFromBundle(select.value);
  if (!extra) return;
  card.extras.push(extra);
  renderResume();
}

document.getElementById("options-root").addEventListener("click", (event) => {
  const plus = event.target.closest("[data-extra-plus]");
  if (plus) {
    event.preventDefault();
    addBundleToOption(plus.dataset.extraPlus);
    return;
  }
  const remove = event.target.closest("[data-extra-remove]");
  if (remove) {
    const card = optionCards.find((entry) => entry.id === remove.dataset.extraRemove);
    if (!card) return;
    card.extras = card.extras.filter((extra) => String(extra.uid) !== String(remove.dataset.uid));
    renderResume();
  }
});

document.getElementById("options-root").addEventListener("change", (event) => {
  const select = event.target.closest("select[data-extra-add]");
  if (!select || !select.value) return;
  addBundleToOption(select.dataset.extraAdd);
});

document.getElementById("options-root").addEventListener("input", (event) => {
  const name = event.target.closest("[data-opt-name]");
  if (name) {
    const card = optionCards.find((entry) => entry.id === name.dataset.optName);
    if (card) card.name = name.value;
    return;
  }
  const pitch = event.target.closest("[data-opt-pitch]");
  if (pitch) {
    const card = optionCards.find((entry) => entry.id === pitch.dataset.optPitch);
    if (card) card.pitch = pitch.value;
    return;
  }
  const label = event.target.closest("[data-extra-label]");
  if (label) {
    const extra = findExtra(label.dataset.extraLabel, label.dataset.uid);
    if (extra) extra.label = label.value;
    return;
  }
  const desc = event.target.closest("[data-extra-desc]");
  if (desc) {
    const extra = findExtra(desc.dataset.extraDesc, desc.dataset.uid);
    if (extra) extra.description = desc.value;
    return;
  }
  const price = event.target.closest("[data-extra-price]");
  if (price) {
    const extra = findExtra(price.dataset.extraPrice, price.dataset.uid);
    if (extra) {
      extra.price = parseMoney(price.value);
      refreshOptionTotals();
    }
  }
});

document.getElementById("options-root").addEventListener("blur", (event) => {
  const price = event.target.closest("[data-extra-price]");
  if (!price) return;
  const extra = findExtra(price.dataset.extraPrice, price.dataset.uid);
  if (!extra) return;
  price.value = priceInputValue(extra.price);
}, true);

document.getElementById("brief-close").addEventListener("click", () => dialog.close());

document.getElementById("brief-copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(briefText.value);
  document.getElementById("brief-copy").textContent = "Copié";
  setTimeout(() => {
    document.getElementById("brief-copy").textContent = "Copier";
  }, 1600);
});

document.getElementById("brief-download").addEventListener("click", () => {
  const blob = new Blob([briefText.value], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = (answers.entreprise || "ods").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-");
  link.href = url;
  link.download = `brief-ods-${slug || "client"}.md`;
  link.click();
  URL.revokeObjectURL(url);
});

try {
  renderPricing();
} catch (err) {
  console.error("Erreur de rendu de la grille de prix", err);
}
renderInclusions();
updateResumeAccess();

const qCount = DATA.questions.reduce((sum, group) => sum + group.fields.length, 0);
document.getElementById("nav-q").textContent = `${qCount} questions`;
document.getElementById("nav-p").textContent = `${DATA.catalog.length} catégories`;
updateInclusionCount();

const scroller = document.getElementById("page-scroll");
document.querySelectorAll(".studio-nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (!target || !scroller) return;
    scroller.scrollTo({ top: target.offsetTop - 12, behavior: "smooth" });
  });
});
