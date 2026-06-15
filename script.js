const app = document.querySelector("#app");

function safeText(value) {
  return String(value || "");
}

function icon(className) {
  return `<i class="${safeText(className)}"></i>`;
}

function createImageHTML(item) {
  const image = safeText(item.image);
  const fallback = safeText(item.fallback || "?");

  return `
    <div class="item-image">
      <img src="${image}" alt="${safeText(item.name)} logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <span>${fallback}</span>
    </div>
  `;
}

function renderProfile() {
  const profile = siteData.profile;

  return `
    <header class="profile card glow-card opening-card" data-aos="zoom-in" data-aos-duration="750">
      <div class="profile-photo-wrap">
        <img class="profile-photo" src="${profile.photo}" alt="${profile.name} profile photo">
      </div>

      <div class="profile-info">
        <p class="eyebrow">${icon("fa-solid fa-terminal")} <span id="typing-text">Minecraft Developer</span></p>
        <h1>${profile.name}</h1>
        <p class="role">${profile.role}</p>

        <div class="profile-tags">
          <a href="${profile.discordLink}" target="_blank" rel="noopener noreferrer">
            ${icon("fa-brands fa-discord")} ${profile.discord}
          </a>
        </div>
      </div>
    </header>

    <div class="divider"></div>
  `;
}

function renderAbout() {
  const about = siteData.about;

  if (!about) return "";

  const highlights = about.highlights.map((item) => {
    return `
      <div class="about-chip">
        ${icon(item.icon)}
        <span>${item.label}</span>
      </div>
    `;
  }).join("");

  return `
    <section class="section" data-aos="fade-up">
      <h2 class="section-title">${icon("fa-solid fa-user-astronaut")} ABOUT ME</h2>

      <div class="about-box card">
        <div class="about-top">
          <div>
            <h3>${about.experience}</h3>
            <p>${about.years}</p>
          </div>
          <span class="about-badge">${icon("fa-solid fa-star")} Available</span>
        </div>

        <p class="about-text">${about.text}</p>

        <div class="about-highlights">
          ${highlights}
        </div>
      </div>
    </section>
  `;
}

function renderList(title, items, sectionIcon) {
  if (!items || !items.length) return "";

  const rows = items.map((item, index) => {
    const content = `
      ${createImageHTML(item)}
      <div class="item-info">
        <h3>${item.title} <span>— ${item.years}</span></h3>
        <p>${item.name}</p>
      </div>
      <div class="item-arrow">${icon(item.link ? "fa-solid fa-arrow-up-right-from-square" : "fa-solid fa-circle-minus")}</div>
    `;

    const delay = index * 80;

    if (item.link) {
      return `
        <a class="list-item clickable card" href="${item.link}" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="${delay}">
          ${content}
        </a>
      `;
    }

    return `
      <div class="list-item card" data-aos="fade-up" data-aos-delay="${delay}">
        ${content}
      </div>
    `;
  }).join("");

  return `
    <section class="section">
      <h2 class="section-title" data-aos="fade-right">${icon(sectionIcon)} ${title}</h2>
      <div class="list">
        ${rows}
      </div>
    </section>
  `;
}

function renderServices() {
  const services = siteData.services;

  if (!services || !services.length) return "";

  const rows = services.map((service, index) => {
    return `
      <div class="service-row" data-aos="fade-up" data-aos-delay="${index * 70}">
        <div class="service-name">
          <span class="service-icon">${icon(service.icon)}</span>
          <span>${service.name}</span>
        </div>
        <span class="service-price">${service.price}</span>
      </div>
    `;
  }).join("");

  return `
    <section class="section">
      <h2 class="section-title" data-aos="fade-right">${icon("fa-solid fa-handshake-angle")} SERVICES</h2>
      <div class="services card">
        ${rows}
      </div>
    </section>
  `;
}

function renderContact() {
  const contact = siteData.contact;

  if (!contact) return "";

  return `
    <section class="section" data-aos="fade-up">
      <h2 class="section-title">${icon("fa-solid fa-message")} ${contact.title}</h2>

      <div class="contact-box card glow-card">
        <div class="contact-icon">${icon("fa-brands fa-discord")}</div>
        <div class="contact-content">
          <p>${contact.text}</p>
          <p class="contact-discord">Discord: <span>${contact.discord}</span></p>

          <div class="contact-actions">
            <a class="contact-button" href="${contact.profileLink}" target="_blank" rel="noopener noreferrer">
              ${icon("fa-solid fa-paper-plane")}
              ${contact.profileButtonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  const footer = siteData.footer;

  if (!footer) return "";

  return `
    <footer class="footer" data-aos="fade-up">
      <p>${footer.credit}</p>
    </footer>
  `;
}

function startTypingAnimation() {
  const typingTarget = document.querySelector("#typing-text");

  if (!typingTarget) return;

  if (window.Typed) {
    new Typed("#typing-text", {
      strings: siteData.profile.typing,
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1300,
      loop: true,
      smartBackspace: true
    });
    return;
  }

  typingTarget.textContent = siteData.profile.typing[0] || "Minecraft Developer";
}

function startScrollAnimation() {
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 650,
      easing: "ease-out-cubic",
      offset: 80
    });
  }
}

function renderApp() {
  app.innerHTML = `
    ${renderProfile()}
    ${renderAbout()}
    ${renderList("OWNER", siteData.owner, "fa-solid fa-crown")}
    ${renderList("DEVELOPER", siteData.developer, "fa-solid fa-code")}
    ${renderServices()}
    ${renderContact()}
    ${renderFooter()}
  `;

  startTypingAnimation();
  startScrollAnimation();
}

renderApp();
