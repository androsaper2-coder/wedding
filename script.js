const d = weddingDetails;
const couple = `${d.groom} <i>&</i> ${d.bride}`;
document.getElementById('coupleNames').innerHTML = couple;
document.getElementById('dateText').textContent = d.date;
document.getElementById('venueText').textContent = d.venueIntro;
document.getElementById('placeText').textContent = d.venue;
document.getElementById('timeText').textContent = d.time;
document.getElementById('sealLetters').textContent = d.initials;
document.getElementById('monogramInside').textContent = d.initials.replace('&', ' & ');

const stage = document.getElementById('stage');
const button = document.getElementById('openButton');
const hint = document.getElementById('hint');
button.addEventListener('click', () => {
  const opened = stage.classList.toggle('opened');
  button.setAttribute('aria-label', opened ? 'Close the invitation' : 'Open the invitation');
  hint.textContent = opened ? 'Your special day · 01 May 2027' : 'Tap the seal to open your invitation';
});
