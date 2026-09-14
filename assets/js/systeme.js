/**
 * ==============================================================================
 * LOGIQUE DE LA PAGE SYSTÈME & INFRASTRUCTURE — NOAH BERTRAND
 * ==============================================================================
 * Gestion du schéma réseau interactif, de l'inspecteur d'équipements,
 * de la simulation WoWLAN et de la synchronisation du thème sombre/clair.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initSystemeTheme();
  initSystemeNavbar();
  initNetworkInspector();
});

/* ==============================================================================
   1. THÈME SOMBRE / CLAIR (SYNCHRONISÉ AVEC LE PORTFOLIO)
   ============================================================================== */

function initSystemeTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlRoot.setAttribute("data-theme", savedTheme);
  updateSysThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlRoot.getAttribute("data-theme") === "dark" ? "light" : "dark";
      htmlRoot.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
      updateSysThemeIcon(currentTheme);
    });
  }
}

function updateSysThemeIcon(theme) {
  const themeIcon = document.getElementById("theme-icon");
  if (!themeIcon) return;
  themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

/* ==============================================================================
   1.1 NAVBAR & MENU MOBILE
   ============================================================================== */

function initSystemeNavbar() {
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("nav-mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }
}

/* ==============================================================================
   2. DONNÉES & INSPECTEUR RÉSEAU INTERACTIF
   ============================================================================== */

const NETWORK_NODES_DATA = {
  wan: {
    title: "Poste Client Distant (Nomade WAN)",
    badge: "Zone WAN / Internet",
    role: "Accès à distance sécurisé depuis l'IUT de Nantes ou l'extérieur",
    ip: "IP Publique dynamique (Client FAI / 4G / Wi-Fi IUT)",
    ports: "Origine dynamique -> Cible : 443 (HTTPS), 80 (HTTP), 22 (SSH)",
    protocols: "TCP/IP, HTTP/3 (QUIC), TLS 1.3, OpenSSH, WebSockets",
    desc: "Depuis l'extérieur, le poste nomade accède au Dashboard sur astroytixo.info pour déclencher le WoWLAN, ou se connecte à pc.noahbertrand.fr pour contrôler le PC de bureau via noVNC dans le navigateur.",
    codeTitle: "Requête sécurisée & flux distant",
    code: `<span class="c-comment"># Accès au Dashboard principal (FastAPI + Caddy HTTP/3)</span>
<span class="c-keyword">curl</span> -I https://astroytixo.info

<span class="c-comment"># Connexion SSH directe vers le Raspberry Pi (via NAT Box SFR)</span>
<span class="c-keyword">ssh</span> noah@astroytixo.info

<span class="c-comment"># Flux noVNC WebSockets vers le PC de bureau</span>
<span class="c-param">GET</span> https://pc.noahbertrand.fr/vnc.html <span class="c-val">(BasicAuth: noah)</span>`
  },
  router: {
    title: "Box SFR (Passerelle & Frontière Réseau)",
    badge: "Passerelle WAN / LAN",
    role: "Acheminement WAN/LAN, baux DHCP et redirection NAT/PAT",
    ip: "WAN : IP Publique SFR | LAN : 192.168.0.1 (Sous-réseau 192.168.0.0/24)",
    ports: "Redirections NAT : 80 -> :80 | 443 -> :443 | 22 -> :22 vers 192.168.0.50",
    protocols: "NAT/PAT, DHCP, Pare-feu SPI, Wi-Fi 6, IPv4/IPv6",
    desc: "La Box SFR constitue la passerelle centrale. Les flux HTTP (80) et HTTPS (443) ainsi que le port SSH (22) sont redirigés directement en PAT vers l'IP fixe du Raspberry Pi 5 (192.168.0.50).",
    codeTitle: "Table NAT / PAT active sur la Box SFR",
    code: `<span class="c-comment"># Redirections de ports (NAT/PAT Box SFR) :</span>
Port Externe 80   (TCP) -> 192.168.0.50:80   <span class="c-param">(Caddy HTTP / ACME)</span>
Port Externe 443  (TCP/UDP) -> 192.168.0.50:443  <span class="c-param">(Caddy HTTPS / HTTP3)</span>
Port Externe 22   (TCP) -> 192.168.0.50:22   <span class="c-param">(SSH Raspberry Pi 5)</span>

<span class="c-comment"># Adressage LAN local :</span>
Box SFR Gateway : <span class="c-val">192.168.0.1</span>
Raspberry Pi 5  : <span class="c-val">192.168.0.50</span> (IP fixe)
PC Linux Cible  : <span class="c-val">192.168.0.11</span> (Bail DHCP Wi-Fi)`
  },
  pi: {
    title: "Raspberry Pi 5 8Go (Chef d'Orchestre Home Lab)",
    badge: "Serveur & Reverse Proxy",
    role: "Caddy Server, Dashboard FastAPI (Forward Auth), Docker/Portainer & Relais WoWLAN",
    ip: "192.168.0.50 (IP Fixe sur le LAN 192.168.0.0/24)",
    ports: "Écoute : 80, 443, 22 | Internes : 8000 (FastAPI), 9000 (Portainer), 7681 (ttyd)",
    protocols: "Caddy Server (HTTP/3), Docker Engine, Portainer CE, FastAPI Forward Auth",
    desc: "Le cœur névralgique 24h/24. Caddy assure le reverse proxying et le TLS automatique. Son snippet auth_gate interroge le backend FastAPI pour autoriser les accès à ssh, portainer et codejelly. L'interface offre un bouton dédié pour envoyer le Magic Packet WoWLAN sur le Wi-Fi.",
    codeTitle: "Extrait du Caddyfile réel avec snippet auth_gate",
    code: `<span class="c-comment"># Protection centralisée Forward Auth via FastAPI</span>
<span class="c-keyword">(auth_gate)</span> {
    <span class="c-param">forward_auth</span> 127.0.0.1:8000 {
        <span class="c-param">uri</span> /api/auth/verify
        <span class="c-param">copy_headers</span> Set-Cookie
    }
    <span class="c-keyword">handle_errors</span> {
        <span class="c-param">@unauthorized</span> expression \`{err.status_code} == 401\`
        <span class="c-param">redir</span> @unauthorized https://astroytixo.info 302
    }
}

<span class="c-comment"># Dashboard Principal FastAPI & déclencheur WoWLAN</span>
<span class="c-keyword">astroytixo.info</span> {
    <span class="c-param">reverse_proxy</span> 127.0.0.1:8000 { <span class="c-param">flush_interval</span> -1 }
}`
  },
  pc: {
    title: "PC Workstation (Linux Arch / Omarchy)",
    badge: "Station de Travail Cible",
    role: "Station haute performance en veille suspend, réveillée par WoWLAN Wi-Fi & pilotée par noVNC",
    ip: "192.168.0.11 (DHCP / Wi-Fi local)",
    ports: "Écoute : Magic Packet WoWLAN sur carte Wi-Fi | 6080 (noVNC / websockify)",
    protocols: "WoWLAN (Wake-on-Wireless-LAN), noVNC, X11/Wayland, ACPI Suspend",
    desc: "Le PC principal tourne sous Linux (Arch / Omarchy). Il est placé en état 'suspend' (veille RAM) pour ne consommer presque rien. Dès que Noah clique sur le bouton dans astroytixo.info, le Raspberry Pi envoie le Magic Packet en Wi-Fi. Le PC se réveille et devient contrôlable en mode graphique sur pc.noahbertrand.fr.",
    codeTitle: "Configuration noVNC dans le Caddyfile pour le PC",
    code: `<span class="c-comment"># Accès Bureau Distant Web vers le PC Linux (192.168.0.11)</span>
<span class="c-keyword">pc.noahbertrand.fr</span> {
    <span class="c-param">basicauth</span> {
        noah $2a$14$c9hmFi94z... <span class="c-comment"># Hash Bcrypt</span>
    }
    <span class="c-param">redir</span> / /vnc.html?autoconnect=true&resize=scale&quality=6 302
    <span class="c-param">reverse_proxy</span> 192.168.0.11:6080
}`
  }
};

function initNetworkInspector() {
  const cards = document.querySelectorAll(".net-node-card");
  const inspector = document.getElementById("network-inspector");
  if (!cards || !inspector) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      const nodeId = card.getAttribute("data-node");
      const data = NETWORK_NODES_DATA[nodeId];
      if (!data) return;

      renderInspectorContent(data);
    });
  });

  // Sélectionner le Raspberry Pi 5 par défaut
  const defaultNode = document.querySelector('.net-node-card[data-node="pi"]');
  if (defaultNode) {
    defaultNode.classList.add("active");
    renderInspectorContent(NETWORK_NODES_DATA["pi"]);
  }
}

function renderInspectorContent(data) {
  const titleEl = document.getElementById("insp-title");
  const badgeEl = document.getElementById("insp-badge");
  const roleEl = document.getElementById("insp-role");
  const ipEl = document.getElementById("insp-ip");
  const portsEl = document.getElementById("insp-ports");
  const protoEl = document.getElementById("insp-proto");
  const descEl = document.getElementById("insp-desc");
  const codeTitleEl = document.getElementById("insp-code-title");
  const codeEl = document.getElementById("insp-code");

  if (titleEl) titleEl.textContent = data.title;
  if (badgeEl) badgeEl.textContent = data.badge;
  if (roleEl) roleEl.textContent = data.role;
  if (ipEl) ipEl.textContent = data.ip;
  if (portsEl) portsEl.textContent = data.ports;
  if (protoEl) protoEl.textContent = data.protocols;
  if (descEl) descEl.textContent = data.desc;
  if (codeTitleEl) codeTitleEl.textContent = data.codeTitle;
  if (codeEl) codeEl.innerHTML = data.code;
}

