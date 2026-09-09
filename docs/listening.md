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
  {% for record in site.data.listening %}
  {% assign initial_album = record.albums | first %}
  <details class="listening-record" id="{{ record.id }}" data-listening-record data-listening-carousel>
    <summary class="record-summary">
      <span class="record-summary-copy">
        <span class="record-code">{{ record.code }}</span>
        <span class="record-title" role="heading" aria-level="2">{{ record.title }}</span>
        <span class="record-subtitle">{{ record.subtitle }}</span>
        <span class="record-summary-meta">
          <span>{{ record.researcher }}</span>
          <span>{{ record.stage }}</span>
          <span>{{ record.albums | size }} albums</span>
        </span>
      </span>
      <span class="record-summary-covers" aria-hidden="true">
        {% for album in record.albums %}
          <img src="{{ album.cover_url }}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
        {% endfor %}
      </span>
      <span class="record-toggle" aria-hidden="true"></span>
    </summary>

    <div class="record-body">
      <div class="record-context">
        <p>이 음악 기록은 <strong>{{ record.title }}</strong>의 구상·집필 과정에 연결되어 있습니다.</p>
        <div class="record-context-links">
          <a href="{{ '/' | relative_url }}#{{ record.id }}">KSI 연구 카드 보기 <span aria-hidden="true">→</span></a>
          <a href="{{ record.research_url }}">Zenodo 공개본 <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <div class="carousel-stage">
        <button class="carousel-control carousel-previous" type="button" data-carousel-previous aria-label="이전 앨범">
          <span aria-hidden="true">←</span>
        </button>

        <div class="coverflow" tabindex="0" role="group" aria-roledescription="앨범 회전 목록" aria-label="연구 과정에서 들은 앨범">
          {% for album in record.albums %}
          <button
            class="album-card{% if album.initial %} is-active{% endif %}"
            type="button"
            data-album-card
            data-index="{{ forloop.index0 }}"
            data-title="{{ album.title | escape }}"
            data-artist="{{ album.artist | escape }}"
            data-meta="{{ album.year }} · {{ album.format }}"
            data-note="{{ album.note | escape }}"
            data-url="{{ album.spotify_url }}"
            aria-label="{{ album.artist }}의 {{ album.title }} 선택"
          >
            <img src="{{ album.cover_url }}" alt="{{ album.title }} 앨범 커버" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          </button>
          {% endfor %}
        </div>

        <button class="carousel-control carousel-next" type="button" data-carousel-next aria-label="다음 앨범">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div class="album-navigation" aria-label="앨범 바로 선택">
        {% for album in record.albums %}
        <button type="button" data-album-jump="{{ forloop.index0 }}"{% if album.initial %} class="is-current" aria-current="true"{% endif %}>
          <span>{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
          <small>{{ album.artist }}</small>
        </button>
        {% endfor %}
      </div>

      <section class="album-information" data-album-information aria-live="polite">
        <div>
          <p class="album-counter"><span data-current-number>01</span> / {{ record.albums | size | prepend: '0' | slice: -2, 2 }}</p>
          <h3 data-current-title>{{ initial_album.title }}</h3>
          <p class="album-artist" data-current-artist>{{ initial_album.artist }}</p>
          <p class="album-meta" data-current-meta>{{ initial_album.year }} · {{ initial_album.format }}</p>
        </div>
        <div class="album-note">
          <p data-current-note>{{ initial_album.note }}</p>
          <a data-current-link href="{{ initial_album.spotify_url }}" target="_blank" rel="noopener noreferrer">Spotify에서 앨범 보기 <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer class="record-footer">
        <p>첫 화면의 앨범은 기록의 시작점을 나타내며, 앨범 사이의 순위나 연구 기여도 차이를 뜻하지 않습니다.</p>
        <a href="#{{ record.id }}" data-record-close>음악 기록 접기 <span aria-hidden="true">↑</span></a>
      </footer>
    </div>
  </details>
  {% endfor %}
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
