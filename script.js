// Helper → Extract video ID from all typical YouTube URL formats
function getVideoID(url) {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1);
    }
    if (u.hostname.includes('youtube.com')) {
      return u.searchParams.get('v');
    }
    return null;
  } catch {
    return null;
  }
}

// Build all standard thumbnail URLs
function buildThumbUrls(id) {
  return {
    'Max Res (HD)': `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    'Standard (SD)': `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    'HQ':            `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    'MQ':            `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    'Default':       `https://img.youtube.com/vi/${id}/default.jpg`
  };
}

// DOM nodes
const form        = document.getElementById('linkForm');
const ytUrlInput  = document.getElementById('ytUrl');
const errorBox    = document.getElementById('error');
const holder      = document.getElementById('thumbHolder');
const grid        = document.getElementById('thumbGrid');

// Handle submit
form.addEventListener('submit', e => {
  e.preventDefault();
  errorBox.classList.add('hidden');
  holder.classList.add('hidden');
  grid.innerHTML = '';

  const url = ytUrlInput.value.trim();
  const id  = getVideoID(url);

  if (!id) {
    errorBox.textContent = '❌ Could not parse that YouTube link.';
    errorBox.classList.remove('hidden');
    return;
  }

  const thumbs = buildThumbUrls(id);

  // Build cards
  Object.entries(thumbs).forEach(([label, src]) => {
    const card = document.createElement('div');
    card.className = 'thumbCard';

    const img = new Image();
    img.src = src;
    img.alt = label;

    const link = document.createElement('a');
    link.href = src;
    link.download = `${id}-${label.replace(/\s/g,'_')}.jpg`;
    link.textContent = 'Download';

    card.appendChild(img);
    card.appendChild(link);
    grid.appendChild(card);
  });

  holder.classList.remove('hidden');
});
