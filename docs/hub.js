// SBTCVM Project Hub - public web version
// Same item structure as the Firefox extension, adapted for full-page layout

const items = [
  // === ORIGINAL SBTCVM RESOURCES ===
  {
    category: 'SBTCVM Original',
    type: 'link',
    url: 'https://github.com/SBTCVM/SBTCVM-Gen2-9',
    name: 'SBTCVM Gen2-9 Repository',
    tag: 'repo',
    desc: "Thomas Leathers' original SBTCVM repository on GitHub"
  },
  {
    category: 'SBTCVM Original',
    type: 'link',
    url: 'https://github.com/SBTCVM/SBTCVM-Gen2-9/wiki',
    name: 'SBTCVM Wiki',
    tag: 'docs',
    desc: 'Official SBTCVM documentation wiki'
  },
  {
    category: 'SBTCVM Original',
    type: 'link',
    url: 'https://discord.gg/PJ6jU3UH',
    name: 'SBTCVM Discord',
    tag: 'community',
    desc: 'Discussion server for SBTCVM and ternary computing'
  },

  // === TUTORIALS ===
  {
    category: 'Tutorials',
    type: 'text',
    file: 'content/sbtcvm_tutorial.txt',
    name: 'SBTCVM Architecture Tutorial',
    tag: 'tutorial',
    desc: 'How the SBTCVM machine works (foundational)'
  },
  {
    category: 'Tutorials',
    type: 'text',
    file: 'content/ternoo_tutorial.txt',
    name: 'TernOO Tutorial',
    tag: 'tutorial',
    desc: 'TernOO architecture, opcodes, and usage patterns'
  },
  {
    category: 'Tutorials',
    type: 'text',
    file: 'content/bases_tutorial.txt',
    name: 'Counting Bases & The Ternary Advantage',
    tag: 'tutorial',
    desc: 'Binary, ternary, decimal, hex, and bal27 compared',
    companion: 'inspector'
  },

  // === TernOO PROJECT ===
  {
    category: 'TernOO',
    type: 'text',
    file: 'content/design_v0.2.txt',
    name: 'TernOO Design v0.2',
    tag: 'doc',
    desc: 'Current design document with v0.2 register-based opcode semantics'
  },
  {
    category: 'TernOO',
    type: 'link',
    url: 'https://github.com/SkepticusMaximus/SBTCVM-Gen2-9-TernOO',
    name: 'TernOO Fork on GitHub',
    tag: 'repo',
    desc: 'TernOO fork of SBTCVM (work in progress)'
  },

  // === TOOLS ===
  {
    category: 'Tools',
    type: 'iframe',
    file: 'content/inspector.html',
    name: 'TernOO Object Inspector',
    tag: 'tool',
    desc: 'Interactive typed-tryte decoder, multi-base input'
  },
  {
    category: 'Tools',
    type: 'iframe',
    file: 'content/opcode_ref.html',
    name: 'SBTCVM Opcode Reference',
    tag: 'tool',
    desc: 'All assembler keywords with decimal and bal27 opcodes'
  }
];

const tagNames = {
  doc: 'DOC',
  tool: 'TOOL',
  tutorial: 'TUTOR',
  repo: 'REPO',
  docs: 'DOCS',
  community: 'CHAT'
};

let activeItemEl = null;

function renderList(filter) {
  filter = filter || '';
  const list = document.getElementById('list');
  list.innerHTML = '';
  const f = filter.toLowerCase();

  const categoryOrder = [];
  const grouped = {};
  items.forEach(item => {
    const match = !f
      || item.name.toLowerCase().includes(f)
      || item.desc.toLowerCase().includes(f)
      || item.tag.includes(f)
      || item.category.toLowerCase().includes(f);
    if (!match) return;
    if (!grouped[item.category]) {
      grouped[item.category] = [];
      categoryOrder.push(item.category);
    }
    grouped[item.category].push(item);
  });

  let totalCount = 0;
  categoryOrder.forEach(cat => {
    const heading = document.createElement('div');
    heading.className = 'category-heading';
    heading.textContent = cat;
    list.appendChild(heading);

    grouped[cat].forEach(item => {
      totalCount++;
      const el = document.createElement('div');
      el.className = 'artifact-item';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'artifact-name';
      const tagSpan = document.createElement('span');
      tagSpan.className = 'artifact-tag tag-' + item.tag;
      tagSpan.textContent = tagNames[item.tag] || item.tag.toUpperCase();
      nameDiv.appendChild(tagSpan);
      nameDiv.appendChild(document.createTextNode(' ' + item.name));

      const descDiv = document.createElement('div');
      descDiv.className = 'artifact-desc';
      descDiv.textContent = item.desc;

      el.appendChild(nameDiv);
      el.appendChild(descDiv);
      el.addEventListener('click', () => openItem(item, el));
      list.appendChild(el);
    });
  });

  document.getElementById('count').textContent = totalCount + ' item' + (totalCount !== 1 ? 's' : '');
}

function openItem(item, el) {
  if (item.type === 'link') {
    window.open(item.url, '_blank');
    return;
  }

  if (activeItemEl) activeItemEl.classList.remove('active');
  if (el) {
    el.classList.add('active');
    activeItemEl = el;
  }

  const header = document.getElementById('contentHeader');
  const body = document.getElementById('contentBody');

  header.textContent = item.name;
  body.innerHTML = '<div class="welcome">loading…</div>';

  document.getElementById('welcome').style.display = 'none';
  document.getElementById('contentView').classList.add('show');

  if (item.type === 'text') {
    fetch(item.file)
      .then(r => r.text())
      .then(text => {
        body.innerHTML = '';
        const pre = document.createElement('pre');
        pre.textContent = text;
        body.appendChild(pre);
      })
      .catch(err => {
        body.innerHTML = '<div class="welcome">Error loading: ' + err.message + '</div>';
      });
  } else if (item.type === 'iframe') {
    body.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = item.file;
    body.appendChild(iframe);
  }

  // If this item has a companion tool, replace the sidebar list with
  // the companion tool loaded in an iframe, with a back button to
  // restore the menu.
  if (item.companion === 'inspector') {
    showCompanion('content/inspector.html', 'TernOO Object Inspector');
  }
}

function showCompanion(url, label) {
  const list = document.getElementById('list');
  list.innerHTML = '';

  const backBtn = document.createElement('button');
  backBtn.className = 'companion-back';
  backBtn.textContent = '← back to menu';
  backBtn.addEventListener('click', () => {
    renderList();
  });
  list.appendChild(backBtn);

  const labelDiv = document.createElement('div');
  labelDiv.className = 'companion-label';
  labelDiv.textContent = label + ' (companion)';
  list.appendChild(labelDiv);

  const frameWrap = document.createElement('div');
  frameWrap.className = 'companion-frame-wrap';
  const frame = document.createElement('iframe');
  frame.src = url;
  frame.className = 'companion-frame';
  frameWrap.appendChild(frame);
  list.appendChild(frameWrap);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search').addEventListener('input', e => renderList(e.target.value));
  renderList();
});
