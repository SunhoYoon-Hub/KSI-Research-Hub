(() => {
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#contact-status');
  if (!form || !status) return;

  const typeField = form.elements.type;
  const queryType = new URLSearchParams(window.location.search).get('type');
  if (queryType === 'join' || queryType === 'proposal') typeField.value = queryType;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const recipient = form.dataset.recipient;
    if (!recipient || recipient === 'CONTACT_EMAIL_PLACEHOLDER') {
      status.textContent = 'KSI Owner의 공개 연락처가 아직 설정되지 않았습니다.';
      return;
    }

    const data = new FormData(form);
    const typeLabel = data.get('type') === 'join' ? 'KSI 참여 신청' : '연구 제안';
    const subject = `[KSI ${typeLabel}] ${data.get('topic')}`;
    const body = [
      `문의 유형: ${typeLabel}`,
      `이름: ${data.get('name')}`,
      `소속 또는 관심 분야: ${data.get('affiliation') || '-'}`,
      `회신 이메일: ${data.get('reply')}`,
      `연구 제목 또는 참여 목적: ${data.get('topic')}`,
      '',
      '내용',
      data.get('message')
    ].join('\n');

    status.textContent = '이메일 앱을 여는 중입니다. 열린 창에서 내용을 확인한 뒤 전송해주세요.';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
