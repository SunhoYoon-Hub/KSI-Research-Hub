---
layout: default
title: 주제어 표본실
permalink: /keywords/
description: KSI의 공개 연구에 등록된 Zenodo 주제어를 한국어와 영어 표본으로 나누어 보관합니다.
extra_css: /assets/css/keywords.css
extra_js: /assets/js/keywords.js
---

{% assign cabinet = site.data.keywords %}
{% assign korean_specimens = cabinet.specimens | where: "language", "ko" %}
{% assign english_specimens = cabinet.specimens | where: "language", "en" %}
<section class="keyword-hero" aria-labelledby="keyword-title">
  <div>
    <p class="section-index">Keyword Cabinet · Zenodo Metadata Collection</p>
    <h1 id="keyword-title">연구의<br><em>키워드</em></h1>
  </div>
  <div class="keyword-hero-copy">
    <p>공개 연구에 등록된 주제어를 번역하거나 섞지 않고, Zenodo에 표시된 형태 그대로 한국어와 영어로 나누어 보관합니다.</p>
    <dl>
      <div><dt>전체 표본</dt><dd>{{ cabinet.specimens | size }}</dd></div>
      <div><dt>한국어</dt><dd>{{ korean_specimens | size }}</dd></div>
      <div><dt>English</dt><dd>{{ english_specimens | size }}</dd></div>
    </dl>
  </div>
</section>

<section class="keyword-collection" aria-labelledby="specimen-title">
  <header class="keyword-section-heading">
    <div>
      <p class="section-index">01 / Registered Specimens</p>
      <h2 id="specimen-title">등록 표본</h2>
    </div>
    <p>언어를 고른 뒤 서랍을 선택하면 주제어가 연결된 연구와 DOI를 확인할 수 있습니다.</p>
  </header>

  <div class="cabinet-toolbar" aria-label="주제어 언어 선택 및 검색">
    <div class="language-switch" role="group" aria-label="주제어 언어">
      <button type="button" class="is-active" data-keyword-language="ko" aria-pressed="true">한국어 표본 <span>{{ korean_specimens | size }}</span></button>
      <button type="button" data-keyword-language="en" aria-pressed="false">English Specimens <span>{{ english_specimens | size }}</span></button>
    </div>
    <label class="cabinet-search">
      <span>표본 검색</span>
      <input type="search" data-keyword-search placeholder="현재 언어의 주제어 검색" autocomplete="off">
    </label>
  </div>

  <div class="cabinet-case">
    <p class="cabinet-count"><span data-keyword-visible>{{ korean_specimens | size }}</span> / <span data-keyword-total>{{ korean_specimens | size }}</span> specimens</p>
    <div class="cabinet-grid" data-keyword-grid>
      {% for specimen in cabinet.specimens %}
      <button
        type="button"
        class="keyword-drawer"
        data-keyword-drawer
        data-accession="{{ specimen.accession }}"
        data-term="{{ specimen.term | downcase | escape }}"
        data-language="{{ specimen.language }}"
        data-template="specimen-{{ forloop.index0 }}"
        aria-controls="keyword-inspector"
      >
        <span class="drawer-number">{{ specimen.accession }}</span>
        <strong>{{ specimen.term }}</strong>
        <span class="drawer-meta">{{ specimen.record_ids | size }} record{% if specimen.record_ids.size > 1 %}s{% endif %}</span>
        <i aria-hidden="true"></i>
      </button>
      {% endfor %}
    </div>
    <p class="cabinet-empty" data-keyword-empty hidden>현재 조건에 맞는 표본이 없습니다.</p>
  </div>

  {% for specimen in cabinet.specimens %}
  <template id="specimen-{{ forloop.index0 }}">
    <p class="inspector-accession">{{ specimen.accession }}</p>
    <h3>{{ specimen.term }}</h3>
    <p class="inspector-authors">{{ specimen.authors | join: ' · ' }}</p>
    <div class="inspector-records">
      {% for record_id in specimen.record_ids %}
      {% assign source_record = cabinet.records | where: "id", record_id | first %}
      <a href="{{ source_record.doi }}" target="_blank" rel="noopener noreferrer">
        <span>{{ source_record.title }}</span>
        <small>{{ source_record.author }} · DOI 열기 ↗</small>
      </a>
      {% endfor %}
    </div>
  </template>
  {% endfor %}

  <section class="keyword-inspector" id="keyword-inspector" aria-live="polite">
    <div class="inspector-placeholder">
      <p class="section-index">02 / Cross References</p>
      <h3>표본 서랍을 선택하세요.</h3>
      <p>선택한 주제어가 사용된 연구 기록을 이곳에서 확인할 수 있습니다.</p>
    </div>
  </section>
</section>

<section class="source-register" aria-labelledby="source-register-title">
  <header class="keyword-section-heading">
    <div>
      <p class="section-index">03 / Source Register</p>
      <h2 id="source-register-title">출처 대장</h2>
    </div>
    <p>2026년 9월 19일 기준, 공개 Zenodo 레코드의 주제어 메타데이터입니다.</p>
  </header>
  <div class="source-register-grid">
    {% for record in cabinet.records %}
    <article>
      <span>{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
      <h3>{{ record.title }}</h3>
      <p>{{ record.author }} · 주제어 {{ record.keywords | size }}개</p>
      <a href="{{ record.doi }}" target="_blank" rel="noopener noreferrer">Zenodo 원문 확인 ↗</a>
    </article>
    {% endfor %}
  </div>
</section>
