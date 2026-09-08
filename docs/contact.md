---
layout: default
title: 연구 제안 및 참여 신청
permalink: /contact/
description: KSI Owner에게 연구 제안, 참여 신청 또는 음악 기록 이메일을 작성하는 화면입니다.
---

<section class="directory-hero contact-hero">
  <p class="section-index">Contact KSI</p>
  <h1>질문을 연구로<br>이어봅니다.</h1>
  <p>연구 제안, KSI 참여 신청 또는 연구 음악 기록을 작성하면 KSI Owner에게 보낼 이메일이 준비됩니다.</p>
</section>

<section class="contact-layout">
  <form class="contact-form" id="contact-form" data-recipient="{{ site.contact_email }}">
    <div class="form-field">
      <label for="contact-type">문의 유형</label>
      <select id="contact-type" name="type">
        <option value="proposal">연구 제안</option>
        <option value="join">KSI 참여 신청</option>
        <option value="listening">KSI 음악 기록</option>
      </select>
    </div>

    <div class="form-field">
      <label for="contact-name">이름</label>
      <input id="contact-name" name="name" type="text" autocomplete="name" required>
    </div>

    <div class="form-field">
      <label for="contact-affiliation">소속 또는 관심 분야</label>
      <input id="contact-affiliation" name="affiliation" type="text" placeholder="예: 생명과학 · 약리학">
    </div>

    <div class="form-field">
      <label for="contact-reply">회신받을 이메일</label>
      <input id="contact-reply" name="reply" type="email" autocomplete="email" required>
    </div>

    <div class="form-field full-field">
      <label for="contact-topic">연구 제목 또는 참여 목적</label>
      <input id="contact-topic" name="topic" type="text" required>
    </div>

    <div class="form-field full-field">
      <label for="contact-message">내용</label>
      <textarea id="contact-message" name="message" rows="8" required placeholder="연구 질문, 진행 상황, 함께 검토하고 싶은 내용을 적어주세요."></textarea>
    </div>

    <button class="generate-button" type="submit">KSI Owner에게 이메일 쓰기</button>
    <p class="contact-status" id="contact-status" aria-live="polite"></p>
  </form>

  <aside class="contact-guide">
    <p class="section-index">Before sending</p>
    <h2>KSI 참여·수록 기준</h2>
    <p>제안이나 신청 전에 KSI가 어떤 연구를 수록하고 어떻게 검토하는지 확인할 수 있습니다.</p>
    <a href="https://zenodo.org/communities/sum-of-inquiries/curation-policy">Zenodo KSI 정책 읽기 <span aria-hidden="true">↗</span></a>
    <small>입력 내용은 이 사이트에 저장되지 않으며, 이메일 앱이 열린 뒤 직접 전송합니다.</small>
  </aside>
</section>

<script src="{{ '/assets/js/contact-email.js' | relative_url }}" defer></script>
