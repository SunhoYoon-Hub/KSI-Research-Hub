(() => {
  const form = document.querySelector('#project-form');
  const output = document.querySelector('#yaml-output');
  const copyButton = document.querySelector('#copy-yaml');
  const copyStatus = document.querySelector('#copy-status');

  if (!form || !output || !copyButton) return;

  const quote = (value) => `"${String(value)
    .replace(/\s*\n+\s*/g, ' ')
    .replaceAll('\\', '\\\\')
    .replaceAll('"', '\\"')}"`;
  const makeId = (title) => {
    const latin = title.toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return latin || `research-${Date.now()}`;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const researcherSelect = form.elements.researcher;
    const researcherName = researcherSelect.options[researcherSelect.selectedIndex].dataset.name;
    const fields = String(data.get('fields')).split(',').map((field) => field.trim()).filter(Boolean);
    const keywords = String(data.get('keywords')).split(',').map((keyword) => keyword.trim()).filter(Boolean);
    const doi = String(data.get('doi')).trim();

    const lines = [
      `- id: ${makeId(data.get('title'))}`,
      `  title: ${quote(data.get('title'))}`,
      `  subtitle: ${quote(data.get('subtitle'))}`,
      `  researcher_id: ${data.get('researcher')}`,
      `  researcher: ${quote(researcherName)}`,
      '  fields:',
      ...fields.map((field) => `    - ${quote(field)}`),
      '  keywords:',
      ...keywords.map((keyword) => `    - ${quote(keyword)}`),
      `  stage: ${data.get('stage')}`,
      `  status_label: ${quote(data.get('version'))}`,
      `  description: ${quote(data.get('description'))}`,
      doi ? `  zenodo_url: ${quote(doi)}` : '  zenodo_url:',
      '  featured: false'
    ];

    output.textContent = lines.join('\n');
    copyButton.disabled = false;
    copyStatus.textContent = '데이터가 만들어졌습니다.';
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.textContent);
      copyStatus.textContent = '복사했습니다. GitHub 편집 화면에 붙여넣으세요.';
    } catch {
      copyStatus.textContent = '자동 복사가 제한되었습니다. 위 내용을 직접 선택해 복사하세요.';
    }
  });
})();
