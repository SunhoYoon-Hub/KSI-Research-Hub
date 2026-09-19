---
layout: default
title: 판본 기록실
permalink: /versions/
description: KSI 공개 연구의 판본과 다음 개정 계획을 기록합니다.
extra_css: /assets/css/versions.css
---

{% assign published_projects = site.data.projects | where: "stage", "published" %}
{% assign revision_count = 0 %}
{% for project in published_projects %}
  {% if project.revision.next %}
    {% assign revision_count = revision_count | plus: 1 %}
  {% endif %}
{% endfor %}

<section class="version-hero" aria-labelledby="version-title">
  <div>
    <p class="section-index">Version Archive · 2026</p>
    <h1 id="version-title">연구의<br><em>판본</em></h1>
  </div>
  <div class="version-hero-copy">
    <p>공개된 성과를 고정된 결과가 아니라 계속 수정되고 확장되는 연구의 판본으로 기록합니다.</p>
    <dl>
      <div><dt>공개 연구</dt><dd>{{ published_projects | size }}</dd></div>
      <div><dt>공개 판본</dt><dd>{{ published_projects | size }}</dd></div>
      <div><dt>개정 준비</dt><dd>{{ revision_count }}</dd></div>
    </dl>
  </div>
</section>

<section class="version-register" aria-labelledby="version-register-title">
  <header class="version-heading">
    <div>
      <p class="section-index">01 / Version Register</p>
      <h2 id="version-register-title">판본 대장</h2>
    </div>
    <p>연구를 펼치면 현재 공개본과 다음 개정 방향을 함께 확인할 수 있습니다.</p>
  </header>

  <div class="version-list">
    {% for project in published_projects %}
    <details class="version-entry"{% if forloop.first %} open{% endif %}>
      <summary>
        <span class="version-entry-number">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
        <span class="version-entry-title">
          <strong>{{ project.title }}</strong>
          <small>{{ project.subtitle }}</small>
          <span>{{ project.researcher }}</span>
        </span>
        <span class="version-route" aria-label="판본 상태">
          <span class="edition-node is-public">{{ project.release_version }}<small>공개</small></span>
          {% if project.revision.next %}
          <i aria-hidden="true">→</i>
          <span class="edition-node is-planned">{{ project.revision.next | remove: " 준비" }}<small>준비</small></span>
          {% endif %}
        </span>
        <span class="version-toggle" aria-hidden="true"></span>
      </summary>

      <div class="version-entry-body">
        <article class="edition-card is-current">
          <p class="edition-label">Public Edition · 공개 판본</p>
          <h3>{{ project.release_version }}</h3>
          <dl>
            <div><dt>공개일</dt><dd>{{ project.publication_label }}</dd></div>
            <div><dt>저자</dt><dd>{{ project.researcher }}</dd></div>
          </dl>
          <p>{{ project.description }}</p>
          <a href="{{ project.zenodo_url }}" target="_blank" rel="noopener noreferrer">Zenodo 공개본 열기 <span aria-hidden="true">↗</span></a>
        </article>

        {% if project.revision.next %}
        <article class="edition-card is-next">
          <p class="edition-label">Next Edition · 다음 판본</p>
          <h3>{{ project.revision.next }}</h3>
          <ul>
            {% for change in project.revision.changes %}
            <li>{{ change }}</li>
            {% endfor %}
          </ul>
          <p class="edition-notice">개정 내용과 공개 시점은 집필 과정에서 달라질 수 있습니다.</p>
        </article>
        {% else %}
        <article class="edition-card is-unplanned">
          <p class="edition-label">Next Edition · 다음 판본</p>
          <h3>현재 예정 없음</h3>
          <p>새로운 개정 계획이 확정되면 이곳에 추가합니다.</p>
        </article>
        {% endif %}
      </div>
    </details>
    {% endfor %}
  </div>
</section>

<section class="version-guide" aria-labelledby="version-guide-title">
  <div>
    <p class="section-index">02 / Reading Guide</p>
    <h2 id="version-guide-title">판본 읽기</h2>
  </div>
  <div class="version-legend">
    <p><span class="legend-block is-public"></span><strong>공개 판본</strong><small>Zenodo DOI로 보존된 현재 판본</small></p>
    <p><span class="legend-block is-planned"></span><strong>준비 판본</strong><small>방향만 공개되었으며 아직 출판되지 않은 판본</small></p>
  </div>
</section>
