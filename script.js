(() => {
  const d = window.weddingDetails || {};
  const $ = (id) => document.getElementById(id);
  const safe = (value, fallback) => (typeof value === 'string' && value.trim()) ? value.trim() : fallback;
  const groom = safe(d.groom, 'Andrew');
  const bride = safe(d.bride, "Bride's Name");
  const initials = safe(d.initials, 'A & B');
  $('coupleNames').innerHTML = `${escapeHTML(groom)} <i>&amp;</i> ${escapeHTML(bride)}`;
  $('dateText').textContent = safe(d.date, '01 · 05 · 2027');
  $('venueIntro').textContent = safe(d.venueIntro, 'The celebration will take place at');
  $('venueText').textContent = safe(d.venue, 'Venue name · Address');
  $('timeText').textContent = safe(d.time, 'At [time]');
  $('sealLetters').textContent = initials;
  $('insideMonogram').textContent = initials;

  function escapeHTML(value) {
    return value.replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  const world = $('world');
  const openButton = $('openButton');
  const openPrompt = $('openPrompt');
  const replayButton = $('replayButton');
  let isOpen = false;
  let busy = false;

  function openInvitation() {
    if (busy || isOpen) return;
    busy = true;
    isOpen = true;
    world.classList.add('is-opening');
    openButton.setAttribute('aria-label', 'Invitation opening');
    openPrompt.disabled = true;
    window.setTimeout(() => {
      world.classList.add('is-open');
      openButton.setAttribute('aria-label', 'Invitation opened');
      openPrompt.hidden = true;
      replayButton.hidden = false;
      busy = false;
      burstPetals();
    }, 1550);
  }

  function closeInvitation() {
    if (busy || !isOpen) return;
    busy = true;
    world.classList.remove('is-open', 'is-opening');
    isOpen = false;
    replayButton.hidden = true;
    openPrompt.hidden = false;
    openPrompt.disabled = false;
    openButton.setAttribute('aria-label', 'Open the wedding invitation');
    window.setTimeout(() => { busy = false; }, 1100);
  }

  openButton.addEventListener('click', openInvitation);
  openPrompt.addEventListener('click', openInvitation);
  replayButton.addEventListener('click', closeInvitation);

  // A few subtle floating baby's-breath petals add depth without slowing mobile devices.
  const field = $('petalField');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    for (let i = 0; i < 13; i++) {
      const petal = document.createElement('span');
      petal.className = 'floating-petal';
      petal.style.setProperty('--x', `${(i * 37 + 11) % 100}%`);
      petal.style.setProperty('--delay', `${(i % 7) * -1.7}s`);
      petal.style.setProperty('--duration', `${13 + (i % 5) * 2}s`);
      petal.style.setProperty('--drift', `${(i % 2 ? 1 : -1) * (18 + (i % 4) * 8)}px`);
      field.appendChild(petal);
    }
  }
  function burstPetals() {
    if (reducedMotion) return;
    for (let i = 0; i < 16; i++) {
      const petal = document.createElement('span');
      petal.className = 'burst-petal';
      petal.style.setProperty('--angle', `${(360 / 16) * i}deg`);
      petal.style.setProperty('--distance', `${65 + (i % 4) * 19}px`);
      $('stage').appendChild(petal);
      window.setTimeout(() => petal.remove(), 1500);
    }
  }
})();
