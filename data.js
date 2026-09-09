window.ODS_DATA = {
  questions: [
    {
      id: "general",
      title: "Général",
      fields: [
        { id: "entreprise", label: "Nom de l'entreprise", type: "text" },
        { id: "contact", label: "Nom du contact", type: "text" },
        { id: "role_contact", label: "Rôle du contact", type: "text" },
        { id: "domaine", label: "Domaine d'affaire", type: "text" },
        { id: "pourquoi", label: "Pourquoi maintenant ?", type: "textarea" },
        { id: "enjeux", label: "Enjeux présentement", type: "textarea" },
        { id: "obj_court", label: "Objectifs court terme (mois)", type: "textarea" },
        { id: "obj_moyen", label: "Objectifs moyen terme (année)", type: "textarea" },
        { id: "obj_long", label: "Objectifs long terme (années)", type: "textarea" },
        { id: "budget", label: "Budget TI", type: "text" },
        { id: "fiscal", label: "Fin de l'année fiscale", type: "text" },
        { id: "firme", label: "Firme TI actuelle", type: "text" },
        { id: "termes", label: "Changements termes et conditions standards", type: "textarea" }
      ]
    },
    {
      id: "ti",
      title: "TI",
      fields: [
        { id: "nb_usagers", label: "Nombre d'utilisateurs", type: "text" },
        { id: "types_usagers", label: "Types d'utilisateurs", type: "textarea" },
        { id: "m365", label: "Travaille avec M365 ?", type: "text" },
        { id: "licences", label: "Détail des licences (+ état attendu)", type: "textarea" },
        { id: "sauvegardes", label: "Sauvegardes (M365, local ou distant)", type: "textarea" },
        { id: "teletravail", label: "Télétravail", type: "textarea" },
        { id: "wifi", label: "Wifi", type: "textarea" },
        { id: "postes", label: "Postes", type: "textarea" },
        { id: "bureaux", label: "Installations de bureau physiques", type: "textarea" },
        { id: "byod", label: "Bring your own device ?", type: "text" },
        { id: "switchs", label: "Switchs", type: "textarea" },
        { id: "parefeu", label: "Pare-feu", type: "textarea" },
        { id: "ups", label: "UPS", type: "textarea" },
        { id: "serveur", label: "Serveur physique sur place", type: "textarea" },
        { id: "sites", label: "Différents sites avec équipements", type: "textarea" },
        { id: "ti_autre", label: "Autre", type: "textarea" }
      ]
    },
    {
      id: "logiciels",
      title: "Logiciels",
      fields: [
        { id: "comptables", label: "Comptables", type: "textarea" },
        { id: "gestion", label: "Gestion", type: "textarea" },
        { id: "logiciels_autre", label: "Autre", type: "textarea" }
      ]
    },
    {
      id: "cyber",
      title: "Cybersécurité",
      fields: [
        { id: "cyberassurance", label: "Cyberassurance", type: "textarea" },
        { id: "formations", label: "Formations", type: "textarea" },
        { id: "politiques", label: "Politiques", type: "textarea" }
      ]
    },
    {
      id: "telephonie",
      title: "Téléphonie",
      fields: [
        { id: "besoin_tel", label: "Besoin en téléphonie", type: "textarea" },
        { id: "autres_donnees", label: "Autres données importantes (et autres départements)", type: "textarea" }
      ]
    }
  ],

  catalog: [
    {
      id: "infogerance",
      family: "TI",
      name: "Infogérance",
      kind: "monthly",
      items: [
        { id: "bz-mobile", label: "BZ Support Mobile", price: 15 },
        { id: "bz-premium", label: "BZ Support Premium", price: 80 }
      ]
    },
    {
      id: "m365",
      family: "TI",
      name: "Microsoft 365",
      kind: "monthly",
      note: "Prix annuels à paiement mensuel (rabais 15 % vs mensuel).",
      items: [
        { id: "intune", label: "Microsoft Intune Device", price: 3.78 },
        { id: "def-biz", label: "Microsoft Defender for Business", price: 4.31 },
        { id: "def-o365-1", label: "Defender for O365 Plan 1", price: 2.84 },
        { id: "def-o365-2", label: "Defender for O365 Plan 2", price: 7.14 },
        { id: "def-edr", label: "Defender for Endpoint Plan 2 (EDR)", price: 7.46 },
        { id: "def-biz-srv", label: "Defender for Business Server", price: 4.31 },
        { id: "entra-p1", label: "Microsoft Entra ID P1", price: 9.98 },
        { id: "spo-gb", label: "Espace supplémentaire Sharepoint /GB", price: 0.28 },
        { id: "exo-1", label: "Exchange Online Plan 1", price: 5.67 },
        { id: "exo-2", label: "Exchange Online Plan 2", price: 11.45 },
        { id: "apps-biz", label: "M365 Apps for Business", price: 14.91 },
        { id: "apps-ent", label: "M365 Apps for Entreprise", price: 23.76 },
        { id: "bbasic", label: "M365 Business Basic", price: 9.98 },
        { id: "bstd", label: "M365 Business Standard", price: 19.95 },
        { id: "bprem", label: "M365 Business Premium", price: 31.29 },
        { id: "def-purview-prem", label: "Microsoft Defender and Purview Suites for M365 Premium", price: 21.42 },
        { id: "def-suite-prem", label: "Microsoft Defender Suite For M365 Business Premium", price: 14.28 },
        { id: "purview-suite-prem", label: "Microsoft Purview Suite For M365 Business Premium", price: 14.28 },
        { id: "e5", label: "M365 E5", price: 85.47 },
        { id: "e3", label: "M365 E3", price: 53.34 },
        { id: "f3", label: "M365 F3", price: 14.28 },
        { id: "f5", label: "M365 F5 Security + Compliance", price: 21.12 },
        { id: "pbi", label: "Power BI pro", price: 19.95 },
        { id: "pa", label: "Power Automate /User", price: 21.42 },
        { id: "proj1", label: "Project Plan 1", price: 14.28 },
        { id: "proj3", label: "Project Plan 3", price: 42.74 },
        { id: "visio1", label: "Visio Plan 1", price: 7.14 },
        { id: "visio2", label: "Visio Plan 2", price: 21.42 },
        { id: "def-o365-1-obnl", label: "Defender for O365 Plan 1 OBNL", price: 1.14 },
        { id: "def-biz-srv-obnl", label: "Microsoft Defender for Business Server OBNL", price: 1.71 },
        { id: "def-biz-obnl", label: "Microsoft Defender for Business OBNL", price: 1.71 },
        { id: "intune-obnl", label: "Microsoft Intune OBNL", price: 2.84 },
        { id: "bbasic-obnl", label: "M365 Business Basic OBNL", price: 0 },
        { id: "bstd-obnl", label: "M365 Business Standard OBNL", price: 4.83 },
        { id: "bprem-obnl", label: "M365 Business Premium OBNL", price: 7.87 },
        { id: "o365-e3-obnl", label: "Office 365 E3 OBNL", price: 8.51 },
        { id: "pbi-obnl", label: "Power BI pro OBNL", price: 5.98 },
        { id: "pa-obnl", label: "Power Automate /User OBNL", price: 5.35 },
        { id: "proj3-obnl", label: "Project Plan 3 OBNL", price: 17.12 },
        { id: "visio1-obnl", label: "Visio Plan 1 OBNL", price: 2.84 },
        { id: "visio2-obnl", label: "Visio Plan 2 OBNL", price: 8.51 },
        { id: "copilot-biz", label: "Microsoft Copilot Business", price: 29.93 },
        { id: "sauv-m365-sherweb", label: "Sauvegarde Microsoft 365 Sherweb", price: 4 },
        { id: "sauv-m365-bz", label: "Sauvegarde Microsoft 365 BZ", price: 8.96 }
      ]
    },
    {
      id: "licence-admin",
      family: "TI",
      name: "Licence Administrateur",
      kind: "monthly",
      items: [
        { id: "lic-admin-bz", label: "Licence Administrateur BZ", price: 11.4 }
      ]
    },
    {
      id: "bz-cloud",
      family: "TI",
      name: "Ressources BZ Cloud",
      kind: "monthly",
      items: [
        { id: "vm", label: "Machines virtuelles", price: 6.5 },
        { id: "cpu", label: "Processeurs", price: 34.35 },
        { id: "ram", label: "RAM Provisionné", price: 7.3 },
        { id: "disk", label: "Espace disque Provisionné", price: 0.17 },
        { id: "console", label: "Accès console", price: 6.3 },
        { id: "1u", label: "Location 1U", price: 133.75 },
        { id: "lien-50", label: "Augmentation lien internet 50Mbps", price: 100 },
        { id: "fw-adv", label: "Pare-feu virtuel avancé", price: null }
      ]
    },
    {
      id: "spla",
      family: "TI",
      name: "Licences SPLA",
      kind: "monthly",
      items: [
        { id: "cal-office", label: "CAL Office Standard", price: 24.27 },
        { id: "cal-ts", label: "CAL Terminal Serveur", price: 11.36 },
        { id: "cal-sql", label: "CAL SQL Serveur Standard", price: 40 },
        { id: "sql-std", label: "SQL Serveur Standard 2 cores (minimum 4)", price: 257.01 },
        { id: "sql-ent", label: "SQL Serveur Entreprise 2 cores (minimum 4)", price: 967.69 }
      ]
    },
    {
      id: "sec-ti",
      family: "TI",
      name: "Sécurité",
      kind: "monthly",
      items: [
        { id: "duo", label: "Solution Gérée Authentification 2FA (Duo)", price: 10 },
        { id: "av-trad", label: "Antivirus Traditionnel", price: 4 }
      ]
    },
    {
      id: "sauv-bz",
      family: "TI",
      name: "Sauvegarde BZ",
      kind: "monthly",
      items: [
        { id: "q50", label: "Quota 50 GB", price: 10.7 },
        { id: "q250", label: "Quota 250 GB", price: 42.8 },
        { id: "q1000", label: "Quota 1000 GB", price: 128.4 },
        { id: "veeam-srv", label: "Veeam Agents for Server (par serveur physique)", price: 20.02 },
        { id: "veeam-ws", label: "Veeam Agent Workstation", price: 7.28 },
        { id: "veeam-cc", label: "Veeam Cloud Connect", price: 9.1 },
        { id: "veeam-std", label: "Veeam B&R Std", price: 9.1 },
        { id: "veeam-ent", label: "VEEAM B&R Ent", price: 16.38 }
      ]
    },
    {
      id: "autres-ti",
      family: "TI",
      name: "Autres",
      kind: "monthly",
      items: [
        { id: "fortimanager", label: "Fortimanager", price: 5 },
        { id: "lastpass", label: "Lastpass", price: 8.25 }
      ]
    },
    {
      id: "ti-unique",
      family: "TI",
      name: "Frais uniques TI",
      kind: "oneoff",
      items: [
        { id: "mig-ti", label: "Frais de migration unique", price: 2000 }
      ]
    },
    {
      id: "sat-impl",
      family: "SAT",
      name: "Frais d'implantation unique",
      kind: "oneoff",
      items: [
        { id: "sat-1-10", label: "1 à 10 usagers", price: 350 },
        { id: "sat-11-25", label: "11 à 25 usagers", price: 400 },
        { id: "sat-26-50", label: "26 à 50 usagers", price: 450 },
        { id: "sat-51", label: "51+ usagers", price: 500 }
      ]
    },
    {
      id: "ulearn",
      family: "SAT",
      name: "ULearn",
      kind: "monthly",
      items: [
        { id: "ulearn-lic", label: "Licence par nombre d'usagers", price: 3.25 },
        { id: "ulearn-s10", label: "Support 1 à 10 usagers", price: 35 },
        { id: "ulearn-s25", label: "Support 11 à 25 usagers", price: 50 },
        { id: "ulearn-s50", label: "Support 26 à 50 usagers", price: 65 },
        { id: "ulearn-s51", label: "Support 51 usagers", price: 80 }
      ]
    },
    {
      id: "ubreach",
      family: "SAT",
      name: "UBreach",
      kind: "monthly",
      items: [
        { id: "ub-alert", label: "Alertes en temps réel / nom de domaine", price: 15 },
        { id: "ub-s10", label: "Support 1 à 10 usagers", price: 35 },
        { id: "ub-s25", label: "Support 11 à 25 usagers", price: 50 },
        { id: "ub-s50", label: "Support 26 à 50 usagers", price: 65 },
        { id: "ub-s51", label: "Support 51+ usagers", price: 80 }
      ]
    },
    {
      id: "uphish",
      family: "SAT",
      name: "UPhish",
      kind: "monthly",
      items: [
        { id: "up-s10", label: "Support 1 à 10 usagers — campagnes automatisées", price: 35 },
        { id: "up-s25", label: "Support 11 à 25 usagers — campagnes automatisées", price: 50 },
        { id: "up-s50", label: "Support 26 à 50 usagers — campagnes automatisées", price: 65 },
        { id: "up-s51", label: "Support 51+ usagers — campagnes automatisées", price: 80 },
        { id: "up-perso", label: "Campagne(s) personnalisée(s)", price: 25 }
      ]
    },
    {
      id: "sat-rapports",
      family: "SAT",
      name: "Rapports SAT",
      kind: "monthly",
      items: [
        { id: "rap-trim", label: "Rapports trimestriels", price: 120 },
        { id: "rap-bi", label: "Rapports bi-annuels", price: 75 },
        { id: "rap-an", label: "Rapport annuel", price: 45 }
      ]
    },
    {
      id: "cyber-tech",
      family: "Cyber",
      name: "Service technique",
      kind: "oneoff",
      items: [
        { id: "c-bloc2", label: "Conseil et accompagnement cyber (Bloc 2h)", price: 400 },
        { id: "c-bloc3", label: "Conseil et accompagnement cyber (Bloc 3h)", price: 570 },
        { id: "c-bloc5", label: "Conseil et accompagnement cyber (Bloc 5h)", price: 875 },
        { id: "c-seance-teams", label: "Séance éducative (1 heure) via Teams avec enregistrement", price: 850 },
        { id: "c-seance-pres", label: "Séance éducative (1 heure) en présentiel", price: 800 },
        { id: "c-phish-24", label: "1 campagne d'hameçonnage annuelle (0-24 users)", price: 750 },
        { id: "c-phish-49", label: "1 campagne d'hameçonnage annuelle (25-49 users)", price: 850 },
        { id: "c-phish-75", label: "1 campagne d'hameçonnage annuelle (49-75 users)", price: 950 },
        { id: "c-phish-plus", label: "1 campagne d'hameçonnage annuelle (75 users +) — sur mesure", price: null },
        { id: "c-balayage", label: "Balayage de vulnérabilités", price: null },
        { id: "c-pol-ia", label: "Politique de cybersécurité — cadre d'utilisation (avec IA)", price: 2400 },
        { id: "c-pol", label: "Politique de cybersécurité — cadre d'utilisation (sans IA)", price: 2000 },
        { id: "c-pol-ia-cli", label: "Politique IA — client", price: 850 },
        { id: "c-pol-ia-non", label: "Politique IA — non-client", price: 1000 },
        { id: "c-audit", label: "Audit de sécurité préliminaire", price: null }
      ]
    },
    {
      id: "cyber-l25",
      family: "Cyber",
      name: "Offre Cyber-BZ Loi 25",
      kind: "monthly",
      items: [
        { id: "c-l25", label: "Conseil et accompagnement Loi 25", price: null }
      ]
    },
    {
      id: "cyber-holi",
      family: "Cyber",
      name: "Offre Cyber-BZ holistique",
      kind: "monthly",
      items: [
        { id: "c-holi", label: "Outils et accompagnement cyber holistique", price: null }
      ]
    },
    {
      id: "tel-mensuel",
      family: "Téléphonie",
      name: "Téléphonie — mensualité",
      kind: "monthly",
      note: "Prix total minimum 50 $. Le 1er DID est inclus.",
      items: [
        { id: "t-fond", label: "Offre FONDATION", price: 17 },
        { id: "t-ess", label: "Offre ESSENTIELLE", price: 20 },
        { id: "t-sup", label: "Offre SUPÉRIEURE", price: 0 },
        { id: "t-teams", label: "Téléphonie TEAMS", price: 27 },
        { id: "t-did", label: "DID supplémentaire", price: 2.5 },
        { id: "t-soft", label: "Application Softphone", price: 5 },
        { id: "t-gxp2135", label: "Location d'appareil GXP2135", price: 5 },
        { id: "t-gxp2160", label: "Location d'appareil GXP2160", price: 10 },
        { id: "t-gxp2170", label: "Location d'appareil GXP2170 + exp.", price: 15 },
        { id: "t-analog", label: "Poste analogique (module audioconférence, alarme)", price: 25 },
        { id: "t-console", label: "Location console de réception virtuelle", price: 40 },
        { id: "t-enreg", label: "Enregistrement global et permanent des appels", price: 35 },
        { id: "t-frais-poste", label: "Frais d'utilisation par poste", price: 2 },
        { id: "t-sms-500", label: "Plateforme de messagerie texte (500 textos inclus)", price: 25 },
        { id: "t-sms-2", label: "Plateforme de messagerie texte (2e instance)", price: 25 },
        { id: "t-user", label: "Utilisateur supplémentaire", price: 5 },
        { id: "t-trans", label: "Transcription des messages vocaux (par tranche de 25)", price: 30 },
        { id: "t-fax", label: "Service de télécopieur virtuel", price: 24.5 }
      ]
    },
    {
      id: "tel-unique",
      family: "Téléphonie",
      name: "Téléphonie — frais uniques",
      kind: "oneoff",
      note: "Configuration : frais minimum 200 $ total.",
      items: [
        { id: "t-cfg", label: "Configuration des utilisateurs", price: 75 },
        { id: "t-act-did", label: "Frais d'activation du DID", price: 75 },
        { id: "t-achat-2135", label: "Achat GXP2135", price: 155 },
        { id: "t-achat-2160", label: "Achat GXP2160", price: 205 },
        { id: "t-achat-2170", label: "Achat GXP2170 + Exp.", price: 440 },
        { id: "t-eva", label: "Frais d'installation EVA", price: 250 }
      ]
    }
  ],

  inclusions: [
    {
      id: "distinctifs",
      title: "Services distinctifs",
      groups: [
        {
          heading: "Accès privilèges",
          items: [
            { id: "d1", label: "Accès à une équipe multidisciplinaire intégrée", value: "inclus" },
            { id: "d2", label: "Accès à un directeur de compte dédié pour la gestion des besoins d'affaires et les suivis", value: "inclus" },
            { id: "d3", label: "Accès au portail Web d'affaire Mon BZ (communications et information d'affaires)", value: "inclus" },
            { id: "d4", label: "Accès à 10 formations d'introduction de Talamus", value: "inclus" }
          ]
        },
        {
          heading: "Accès écosystème",
          items: [
            { id: "d5", label: "Événement privé sur la vision TI avec des spécialistes TI et en cybersécurité", value: "inclus" },
            { id: "d6", label: "Événement de réseautage et de relations d'affaires", value: "inclus" },
            { id: "d7", label: "Webinaire périodique sur des sujets de pointe en technologie", value: "inclus" },
            { id: "d8", label: "Communication périodique BZ : opportunités et actualités TI pertinentes", value: "inclus" }
          ]
        }
      ]
    },
    {
      id: "infogerance-inc",
      title: "Services gérés | Infogérance",
      groups: [
        {
          heading: "Support et service régulier",
          items: [
            { id: "i1", label: "Accès au service à la clientèle technique 7 h à 17 h (soutien technique)", value: "exclus" },
            { id: "i2", label: "Accès au service à la clientèle technique 7 h à 17 h (expertise technique)", value: "exclus" },
            { id: "i3", label: "Accès au soutien technique rapide (Hotline)", value: "exclus" }
          ]
        },
        {
          heading: "Support et service d'urgence",
          items: [
            { id: "i4", label: "Accès au service d'urgence 24 heures sur 24, 365 jours par an", value: "exclus" },
            { id: "i5", label: "Accès à l'équipe SWAT Division sécurité", value: "exclus" },
            { id: "i6", label: "Accès à l'équipe SWAT Division technologique", value: "exclus" }
          ]
        },
        {
          heading: "Gestion de l'environnement technologique",
          items: [
            { id: "i7", label: "Gestion de l'environnement Microsoft 365", value: "exclus" },
            { id: "i8", label: "Installation des mises à jour et correctifs (Microsoft, pares-feux, commutateurs, postes…)", value: "exclus" },
            { id: "i9", label: "Installation planifiée des équipements informatiques/technologiques", value: "exclus" },
            { id: "i10", label: "Évaluation, installation et configuration des fonctionnalités avancées essentielles (2FA, GEOIP, etc.)", value: "exclus" },
            { id: "i11", label: "Dépannage de système, de logiciel et des équipements", value: "exclus" },
            { id: "i12", label: "Installation de logiciel (Microsoft Office + logiciels spécialisés)", value: "exclus" },
            { id: "i13", label: "Surveillance des systèmes supportés (gestion des alertes par courriel 8 h/17 h)", value: "exclus" },
            { id: "i14", label: "Émission rapport d'incident cybersécurité simplifié et nécessaire ou selon la législation en vigueur", value: "exclus" }
          ]
        },
        {
          heading: "Gestion et déploiement de projet technologique",
          items: [
            { id: "i15", label: "Planification et suivi", value: "exclus" },
            { id: "i16", label: "Élaboration et gestion du plan directeur", value: "exclus" },
            { id: "i17", label: "Rencontre TI périodique : suivi opérationnel avec un conseiller expert technique", value: "exclus" },
            { id: "i18", label: "Comité TI périodique : comité de vision stratégique et développement TI", value: "exclus" }
          ]
        },
        {
          heading: "Mobilisation",
          items: [
            { id: "i19", label: "Les déplacements nécessaires à l'exécution des tâches spécifiées", value: "exclus" }
          ]
        }
      ]
    },
    {
      id: "cloud-inc",
      title: "Service infonuagique | Hébergement | Sauvegardes",
      groups: [
        {
          heading: "Sauvegardes M365",
          items: [
            { id: "c1", label: "Sauvegarde 365 | Service BZ | Environnement partagé", value: "exclus" },
            { id: "c2", label: "Sauvegarde 365 | Service BZ | Environnement dédié", value: "exclus" },
            { id: "c3", label: "Archivage hors-ligne (sauvegarde 365 BZ)", value: "inclus" },
            { id: "c4", label: "Disque d'archivage physique hors ligne (copie client) — sauvegarde 365", value: "exclus" },
            { id: "c5", label: "Sauvegarde 365 | Service Sherweb", value: "exclus" }
          ]
        },
        {
          heading: "Sauvegarde environnement local",
          items: [
            { id: "c6", label: "Sauvegarde environnement local | Service BZ", value: "exclus" },
            { id: "c7", label: "Archivage hors-ligne (environnement local)", value: "inclus" },
            { id: "c8", label: "Disque d'archivage physique hors ligne (copie client) — local", value: "exclus" }
          ]
        },
        {
          heading: "Service d'hébergement (infrastructure)",
          items: [
            { id: "c9", label: "Capacité de CPU", value: "exclus" },
            { id: "c10", label: "Capacité de mémoire vive", value: "exclus" },
            { id: "c11", label: "Capacité d'espace disque", value: "exclus" },
            { id: "c12", label: "1 adresse IP publique maximum", value: "exclus" },
            { id: "c13", label: "Accès console", value: "exclus" },
            { id: "c14", label: "Vitesse lien internet (50 Mbps par défaut)", value: "exclus" },
            { id: "c15", label: "Utilisation d'espace physique (1U)", value: "exclus" },
            { id: "c16", label: "Machine virtuelle", value: "exclus" },
            { id: "c17", label: "Pare-feu virtuel de base", value: "exclus" },
            { id: "c18", label: "Pare-feu virtuel avancé", value: "exclus" },
            { id: "c19", label: "Sauvegarde de vos données", value: "exclus" },
            { id: "c20", label: "Archivage trimestriel hors-ligne", value: "inclus" },
            { id: "c21", label: "Disque d'archivage hors-ligne (hébergement)", value: "exclus" }
          ]
        },
        {
          heading: "Licence",
          items: [
            { id: "c22", label: "Licence Microsoft SPLA", value: "exclus" }
          ]
        }
      ]
    },
    {
      id: "equip-inc",
      title: "Service équipements | Logiciels et licences",
      groups: [
        {
          heading: "Conseil et gestion",
          items: [
            { id: "e1", label: "Accompagnement et conseils | Achat d'équipement informatique | Gestion des licences", value: "exclus" },
            { id: "e2", label: "Surveillance des garanties de service | Équipements réseaux | Serveurs, pare-feux et commutateurs", value: "exclus" },
            { id: "e3", label: "Surveillance des garanties de service | Postes de travail", value: "exclus" }
          ]
        },
        {
          heading: "Licences et logiciels",
          items: [
            { id: "e4", label: "Licence M365 (selon le choix du client)", value: "exclus" },
            { id: "e5", label: "Licence Copilot", value: "exclus" },
            { id: "e6", label: "Fortimanager", value: "exclus" },
            { id: "e7", label: "Licence Duo", value: "exclus" },
            { id: "e8", label: "Field Effect (MDR)", value: "exclus" },
            { id: "e9", label: "Lastpass", value: "exclus" },
            { id: "e10", label: "SignNow", value: "exclus" },
            { id: "e11", label: "Zeedrive", value: "exclus" },
            { id: "e12", label: "Exclaimer", value: "exclus" }
          ]
        }
      ]
    },
    {
      id: "cyber-inc",
      title: "Services cybersécurité",
      groups: [
        {
          heading: "Service-conseil",
          items: [
            { id: "y1", label: "Accompagnement, conseil et expertise en cybersécurité", value: "exclus" },
            { id: "y2", label: "Rencontre périodique : suivi des activités avec un conseiller en cybersécurité", value: "exclus" }
          ]
        },
        {
          heading: "Gestion de la Loi 25",
          items: [
            { id: "y3", label: "Préparation de base", value: "exclus" },
            { id: "y4", label: "Accompagnement spécialisé", value: "exclus" },
            { id: "y5", label: "Rédaction des documents nécessaires à la conformité", value: "exclus" },
            { id: "y6", label: "Accès portail de documentation client Loi 25", value: "exclus" },
            { id: "y7", label: "Conseil et accompagnement Loi 25", value: "exclus" },
            { id: "y8", label: "Travaux de mises à jour annuelles Loi 25", value: "exclus" }
          ]
        },
        {
          heading: "Programme santé et sécurité technologique (PSST)",
          items: [
            { id: "y9", label: "Formation et capsules en continu", value: "exclus" },
            { id: "y10", label: "Campagne d'hameçonnage automatisée en continu", value: "exclus" },
            { id: "y11", label: "Campagne(s) d'hameçonnage personnalisée(s)", value: "exclus" },
            { id: "y12", label: "Surveillance du dark Web", value: "exclus" },
            { id: "y13", label: "Rapport qualitatif des résultats", value: "exclus" }
          ]
        },
        {
          heading: "Balayages (détection)",
          items: [
            { id: "y14", label: "Balayage de vulnérabilités externe", value: "exclus" },
            { id: "y15", label: "Balayage de vulnérabilités interne", value: "exclus" }
          ]
        },
        {
          heading: "Plans et rapports (élaboration)",
          items: [
            { id: "y16", label: "Plan d'intervention en cas d'incident de cybersécurité (élaboration)", value: "exclus" },
            { id: "y17", label: "Plan de reprise des activités en cas de sinistre (élaboration)", value: "exclus" },
            { id: "y18", label: "Plan de restauration (élaboration)", value: "exclus" },
            { id: "y19", label: "Politique de cybersécurité — cadre d'utilisation (élaboration)", value: "exclus" },
            { id: "y20", label: "Politique et plan de sauvegarde (élaboration)", value: "exclus" },
            { id: "y21", label: "Service de préparation d'information technique aux demandes externes (third party risk assessment)", value: "exclus" },
            { id: "y22", label: "Rapport d'évaluation des facteurs relatifs à la vie privée (ÉFVP)", value: "exclus" }
          ]
        },
        {
          heading: "Plans et rapports (suivi et mises à jour)",
          items: [
            { id: "y23", label: "Plan d'intervention en cas d'incident de cybersécurité (suivi)", value: "exclus" },
            { id: "y24", label: "Plan de reprise des activités en cas de sinistre (suivi)", value: "exclus" },
            { id: "y25", label: "Plan de restauration (suivi)", value: "exclus" },
            { id: "y26", label: "Politique de cybersécurité — cadre d'utilisation (suivi)", value: "exclus" },
            { id: "y27", label: "Politique et plan de sauvegarde (suivi)", value: "exclus" }
          ]
        },
        {
          heading: "Audits",
          items: [
            { id: "y28", label: "Audit de sécurité préliminaire", value: "exclus" },
            { id: "y29", label: "Bilan de santé technologique", value: "exclus" }
          ]
        },
        {
          heading: "Mobilisation",
          items: [
            { id: "y30", label: "Les déplacements nécessaires à l'exécution des tâches spécifiées dans le contrat", value: "exclus" }
          ]
        }
      ]
    },
    {
      id: "affaires-inc",
      title: "Services solution d'affaires",
      groups: [
        {
          heading: "Service-conseil",
          items: [
            { id: "a1", label: "Accompagnement, conseil et expertise en cybersécurité et solution TI", value: "exclus" }
          ]
        },
        {
          heading: "Implantation et gestion de projet",
          items: [
            { id: "a2", label: "Accompagnement d'assurance — compréhension des informations technologiques et complétion des formulaires", value: "exclus" }
          ]
        },
        {
          heading: "Planification et suivi",
          items: [
            { id: "a3", label: "Rencontre périodique : suivi des opérations avec un conseiller expert technique", value: "exclus" },
            { id: "a4", label: "Rencontre périodique : suivi des opérations avec un directeur technique", value: "exclus" },
            { id: "a5", label: "Rencontre périodique : comité de vision stratégique et développement TI", value: "exclus" },
            { id: "a6", label: "Élaboration d'un calendrier des activités annuelles", value: "exclus" },
            { id: "a7", label: "Élaboration et gestion du plan directeur", value: "exclus" }
          ]
        },
        {
          heading: "Gestion des actifs",
          items: [
            { id: "a8", label: "Établissement du catalogue des actifs", value: "exclus" }
          ]
        },
        {
          heading: "Tests",
          items: [
            { id: "a9", label: "Test de restauration partiel", value: "exclus" },
            { id: "a10", label: "Test de restauration complet", value: "exclus" }
          ]
        },
        {
          heading: "Évaluation et analyse",
          items: [
            { id: "a11", label: "Rapport d'évaluation de la cote de sécurité M365", value: "exclus" },
            { id: "a12", label: "Bilan de santé général technologique", value: "exclus" }
          ]
        },
        {
          heading: "Développement de connaissances",
          items: [
            { id: "a13", label: "Séance éducative « Introduction à la cybersécurité »", value: "exclus" },
            { id: "a14", label: "Séance éducative « Évitez d'être hameçonnés »", value: "exclus" },
            { id: "a15", label: "Séance éducative « L'importance d'une politique de cybersécurité »", value: "exclus" },
            { id: "a16", label: "Séance éducative « Démystifier la Loi 25 »", value: "exclus" },
            { id: "a17", label: "Séance éducative « Introduction à Copilot »", value: "exclus" },
            { id: "a18", label: "Parcours de formation Talamus.Pro", value: "exclus" },
            { id: "a19", label: "Questionnaire et rapport post-séance éducative", value: "exclus" }
          ]
        },
        {
          heading: "Approche IA",
          items: [
            { id: "a20", label: "Politique d'utilisation de l'IA", value: "exclus" },
            { id: "a21", label: "Licence Copilot", value: "exclus" }
          ]
        }
      ]
    }
  ],

  bundles: [
    {
      id: "vciso",
      label: "Protection de cybersécurité « vCISO »",
      description:
        "Accompagnement d'un responsable cybersécurité virtuel : gouvernance, priorisation des risques, suivi Loi 25 et posture de sécurité adaptée à la taille de l'entreprise."
    },
    {
      id: "ia-agentique",
      label: "IA agentique",
      description:
        "Mise en place d'agents IA utiles au quotidien (automatisation, assistance documentaire, gains de productivité) avec cadre d'utilisation et accompagnement à l'adoption."
    },
    {
      id: "comiteti",
      label: "Comité TI mensuels",
      description:
        "Rencontres mensuelles structurées avec un conseiller BZ pour suivre les priorités, le plan directeur et les décisions technologiques alignées sur les objectifs d'affaires."
    },
    {
      id: "vanille",
      label: "Vanille",
      description: "Bundle personnalisé selon le besoin du client. Adaptez le titre, la description et le prix.",
      customizable: true
    }
  ]
};
