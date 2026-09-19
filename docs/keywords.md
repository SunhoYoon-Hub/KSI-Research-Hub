---
layout: default
title: 주제어 표본실
permalink: /keywords/
description: KSI의 공개 연구에 등록된 Zenodo 주제어를 원문 그대로 수집하고 연구 간 연결을 살펴봅니다.
extra_css: /assets/css/keywords.css
extra_js: /assets/js/keywords.js
---

{% assign cabinet = site.data.keywords %}
<section class="keyword-hero" aria-labelledby="keyword-title">
  <div>
    <p class="section-index">Keyword Cabinet · Zenodo Metadata Collection</p>
    <h1 id="keyword-title">연구의<br><em>키워드</em></h1>
  </div>
  <div class="keyword-hero-copy">
    <p>공개 연구에 등록된 주제어를 번역하거나 다듬지 않고, Zenodo에 표시된 형태 그대로 보관합니다.</p>
    <dl>
      <div><dt>등록 표본</dt><dd>{{ cabinet.specimens | size }}</dd></div>
      <div><dt>출처 기록</dt><dd>{{ cabinet.records | size }}</dd></div>
      <div><dt>연구자</dt><dd>2</dd></div>
    </dl>
  </div>
</section>

<section class="keyword-collection" aria-labelledby="specimen-title">
  <header class="keyword-section-heading">
    <div>
      <p class="section-index">01 / Registered Specimens</p>
      <h2 id="specimen-title">등록 표본</h2>
    </div>
    <p>서랍을 선택하면 해당 주제어가 연결된 연구와 DOI를 확인할 수 있습니다.</p>
  </header>

  <div class="cabinet-toolbar" aria-label="주제어 표본 검색 및 정렬">
    <label>
      <span>표본 검색</span>
      <input type="search" data-keyword-search placeholder="주제어 입력" autocomplete="off">
    </label>
    <div class="cabinet-filters" role="group" aria-label="연구자 필터">
      <button type="button" class="is-active" data-keyword-author="all" aria-pressed="true">전체</button>
      <button type="button" data-keyword-author="Yoon, Sunho" aria-pressed="false">Yoon, Sunho</button>
      <button type="button" data-keyword-author="Ho, Yejin" aria-pressed="false">Ho, Yejin</button>
    </div>
    <label>
      <span>정렬</span>
      <select data-keyword-sort>
        <option value="accession">등록순</option>
        <option value="alpha">가나다·ABC순</option>
        <option value="connections">연결 많은 순</option>
      </select>
    </label>
  </div>

  <div class="cabinet-case">
    <p class="cabinet-count"><span data-keyword-visible>{{ cabinet.specimens | size }}</span> / {{ cabinet.specimens | size }} specimens</p>
    <div class="cabinet-grid" data-keyword-grid>
      {% for specimen in cabinet.specimens %}
      <button
        type="button"
        class="keyword-drawer"
        data-keyword-drawer
        data-accession="{{ specimen.accession }}"
        data-term="{{ specimen.term | downcase | escape }}"
        data-authors="{{ specimen.authors | join: '|' | escape }}"
        data-count="{{ specimen.record_ids | size }}"
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
    <p class="cabinet-empty" data-keyword-empty hidden>조건에 맞는 표본이 없습니다.</p>
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
      <p>같은 주제어가 여러 연구에 쓰였다면 이곳에서 교차 연결됩니다.</p>
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