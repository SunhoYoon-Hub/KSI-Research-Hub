---
layout: default
title: KSI Listening Archive
permalink: /listening/
description: KSI 연구자들이 연구 과정에서 함께한 음악을 연구별로 기록하는 공동 아카이브입니다.
extra_css: /assets/css/listening.css
extra_js: /assets/js/listening-carousel.js
---

<section class="listening-hero" aria-labelledby="listening-title">
  <div>
    <p class="section-index">KSI Listening Archive · 2026</p>
    <h1 id="listening-title">연구 뒤의<br><em>음악</em>을 기록합니다.</h1>
  </div>
  <div class="listening-intro">
    <p>연구자가 구상·집필·개정 과정에서 실제로 들은 음악을 연구별로 남깁니다.</p>
    <small>이 기록은 연구의 이론적 근거나 인용 자료가 아니라, 연구 과정의 문화적 주변 기록입니다.</small>
  </div>
</section>

<section class="listening-archive" aria-label="KSI 연구 음악 기록">
  <div class="archive-toolbar">
    <p><strong>{{ site.data.listening | size }}</strong>개의 연구 음악 기록</p>
    <div class="archive-sort" role="group" aria-label="음악 기록 정렬">
      <button class="is-active" type="button" data-listening-sort="record" aria-pressed="true">기록순</button>
      <button type="button" data-listening-sort="published" aria-pressed="false">공개일순</button>
      <button type="button" data-listening-sort="researcher" aria-pressed="false">연구자별</button>
    </div>
  </div>

  <div class="listening-record-list" data-listening-list>
  {% for record in site.data.listening %}
  {% assign album_count = record.albums | size %}
  <details
    class="listening-record"
    id="{{ record.id }}"
    data-listening-record
    data-listening-carousel
    data-record-order="{{ record.record_order }}"
    data-publication-date="{{ record.publication_date }}"
    data-researcher="{{ record.researcher | escape }}"
  >
    <summary class="record-summary">
      <span class="record-summary-copy">
        <span class="record-code">{{ record.code }}</span>
        <span class="record-title" role="heading" aria-level="2">{{ record.title }}</span>
        <span class="record-subtitle">{{ record.subtitle }}</span>
        <span class="record-summary-meta">
          <span>{{ record.researcher }}</span>
          <span>{{ record.stage }}</span>
          <span>{{ record.publication_label }}</span>
          <span>{% if album_count == 0 %}기록 준비 중{% else %}음악 {{ album_count }}개{% endif %}</span>
        </span>
      </span>
      <span class="record-summary-covers" aria-hidden="true" style="--summary-columns: {% if album_count == 0 %}1{% elsif album_count > 3 %}3{% else %}{{ album_count }}{% endif %};">
        {% if album_count == 0 %}
          <span class="record-summary-empty"><b>Reserved</b><small>Listening space</small></span>
        {% else %}
          {% for album in record.albums %}
            <img src="{{ album.cover_url }}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          {% endfor %}
        {% endif %}
      </span>
      <span class="record-toggle" aria-hidden="true"></span>
    </summary>

    <div class="record-body">
      <div class="record-context">
        <div class="record-context-copy">
          <p class="record-context-label">Connected Research · 연결 연구</p>
          <strong>{{ record.title }}</strong>
          <small>{{ record.researcher }} · {{ record.publication_label }}</small>
        </div>
        <div class="record-context-links">
          <a href="{{ '/' | relative_url }}#{{ record.id }}">KSI 연구 카드 보기 <span aria-hidden="true">→</span></a>
          <a href="{{ record.research_url }}">Zenodo 공개본 <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      {% if album_count == 0 %}
      <section class="listening-empty" aria-label="음악 기록 준비 중">
        <p class="section-index">Reserved Record</p>
        <h3>음악 기록을 위한 공간입니다.</h3>
        <p>연구자가 공개 범위를 확인한 뒤, 실제로 들은 앨범만 이곳에 추가합니다.</p>
      </section>

      <footer class="record-footer">
        <p>빈 공간은 향후 기록 위치만 표시하며, 아직 음악 정보가 공개된 것은 아닙니다.</p>
        <a href="#{{ record.id }}" data-record-close>음악 기록 접기 <span aria-hidden="true">↑</span></a>
      </footer>
      {% else %}
      {% assign initial_album = record.albums | first %}
      <div class="carousel-stage{% if album_count == 1 %} single-album{% endif %}">
        <button class="carousel-control carousel-previous" type="button" data-carousel-previous aria-label="이전 음악"{% if album_count == 1 %} disabled aria-disabled="true"{% endif %}>
          <span aria-hidden="true">←</span>
        </button>

        <div class="coverflow" tabindex="0" role="group" aria-roledescription="음악 회전 목록" aria-label="연구 과정에서 들은 음악">
          {% for album in record.albums %}
          {% assign album_url = album.music_url %}
          {% assign album_platform = album.platform | default: "Apple Music" %}
          <button
            class="album-card{% if album.initial %} is-active{% endif %}"
            type="button"
            data-album-card
            data-index="{{ forloop.index0 }}"
            data-title="{{ album.title | escape }}"
            data-artist="{{ album.artist | escape }}"
            data-credits="{{ album.credits | escape }}"
            data-meta="{{ album.year }} · {{ album.format }}"
            data-note="{{ album.note | escape }}"
            data-url="{{ album_url }}"
            data-platform="{{ album_platform }}"
            aria-label="{{ album.artist }}의 {{ album.title }} 선택"
          >
            <img src="{{ album.cover_url }}" alt="{{ album.title }} 표지" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          </button>
          {% endfor %}
        </div>

        <button class="carousel-control carousel-next" type="button" data-carousel-next aria-label="다음 음악"{% if album_count == 1 %} disabled aria-disabled="true"{% endif %}>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div class="album-navigation" aria-label="음악 바로 선택" style="--album-count: {{ album_count }};">
        {% for album in record.albums %}
        <button type="button" data-album-jump="{{ forloop.index0 }}"{% if album.initial %} class="is-current" aria-current="true"{% endif %}>
          <span>{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
          <small>{{ album.artist }}</small>
        </button>
        {% endfor %}
      </div>

      <section class="album-information" data-album-information aria-live="polite">
        {% assign initial_album_url = initial_album.music_url %}
        {% assign initial_album_platform = initial_album.platform | default: "Apple Music" %}
        <div class="album-identity">
          <p class="album-panel-label">Selected Music · 선택한 음악</p>
          <p class="album-counter"><span data-current-number>01</span> / {{ record.albums | size | prepend: '0' | slice: -2, 2 }}</p>
          <h3 data-current-title>{{ initial_album.title }}</h3>
          <p class="album-artist" data-current-artist>{{ initial_album.artist }}</p>
          <p class="album-credits" data-current-credits{% unless initial_album.credits %} hidden{% endunless %}>{{ initial_album.credits }}</p>
          <p class="album-meta" data-current-meta>{{ initial_album.year }} · {{ initial_album.format }}</p>
        </div>
        <div class="album-note">
          <div data-album-note-copy{% unless initial_album.note %} hidden{% endunless %}>
            <p class="album-panel-label">Listening Note · 음악 기록</p>
            <p data-current-note>{{ initial_album.note }}</p>
          </div>
          <a data-current-link href="{{ initial_album_url }}" target="_blank" rel="noopener noreferrer"><span data-current-platform>{{ initial_album_platform }}</span>에서 듣기 <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer class="record-footer record-footer-compact">
        <a href="#{{ record.id }}" data-record-close>음악 기록 접기 <span aria-hidden="true">↑</span></a>
      </footer>
      {% endif %}
    </div>
  </details>
  {% endfor %}
  </div>
</section>

<section class="listening-participate" aria-labelledby="listening-participate-title">
  <div>
    <p class="section-index">Shared Archive</p>
    <h2 id="listening-participate-title">KSI 구성원의 다음 기록을 기다립니다.</h2>
  </div>
  <div>
    <p>각 연구자는 공개 범위에 동의한 음악만 연구별 기록으로 제안할 수 있습니다.</p>
    <a href="{{ '/contact/' | relative_url }}?type=listening">음악 기록 제안하기 <span aria-hidden="true">→</span></a>
  </div>
</section>
