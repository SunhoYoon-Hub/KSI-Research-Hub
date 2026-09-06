---
layout: default
title: Home
description: KSI 학생 연구의 진행, 동료평가, 개정과 Zenodo 공개본을 연결하는 연구 허브입니다.
---

{% assign published_projects = site.data.projects | where: "stage", "published" %}
{% assign drafting_projects = site.data.projects | where: "stage", "drafting" %}

<section class="intro" aria-labelledby="intro-title">
  <div class="intro-copy">
    <p class="eyebrow">Student Research Infrastructure · 2026</p>
    <h1 id="intro-title">연구의 과정과<br><em>공개된 성과</em>를 잇습니다.</h1>
    <p class="lead">KSI 구성원의 연구 질문, 동료평가, 개정 기록과 Zenodo 영구 공개본을 한곳에서 탐색합니다.</p>
  </div>
  <dl class="overview" aria-label="연구 현황 요약">
    <div><dt>공개 연구</dt><dd>{{ published_projects | size }}</dd></div>
    <div><dt>진행 연구</dt><dd>{{ drafting_projects | size }}</dd></div>
    <div><dt>연구자</dt><dd>{{ site.data.researchers | size }}</dd></div>
  </dl>
</section>

<section class="research-section" id="research" aria-labelledby="research-title">
  <header class="section-heading">
    <div>
      <p class="section-index">01 / Research</p>
      <h2 id="research-title">연구 성과</h2>
    </div>
    <p>최종 성과는 Zenodo에 보존되며, 각 DOI는 해당 버전의 영구 주소입니다.</p>
  </header>

  <div class="filter-bar" role="group" aria-label="연구 목록 필터">
    <button class="filter-button active" type="button" data-project-filter="all">전체</button>
    {% for researcher in site.data.researchers %}
      <button class="filter-button" type="button" data-project-filter="{{ researcher.id }}">{{ researcher.display_name }}</button>
    {% endfor %}
    <button class="filter-button" type="button" data-project-filter="drafting">진행 연구</button>
  </div>

  <p class="filter-result" aria-live="polite"><span id="visible-project-count">{{ site.data.projects | size }}</span>개의 연구</p>

  <div class="project-grid" id="project-grid">
    {% for project in site.data.projects %}
    <article class="project-card {% if project.stage == 'published' %}published{% else %}ongoing{% endif %}{% if project.featured %} feature-card{% endif %}" data-researcher="{{ project.researcher_id }}" data-stage="{{ project.stage }}">
      <div class="card-topline">
        <span class="status">{{ project.status_label }}</span>
        <span class="field">{{ project.fields | join: " · " }}</span>
      </div>
      <h3>{{ project.title }}</h3>
      <p class="project-subtitle">{{ project.subtitle }}</p>
      <a class="researcher-link" href="{{ '/researchers/' | relative_url }}#{{ project.researcher_id }}">{{ project.researcher }}</a>
      <ul class="keyword-list" aria-label="핵심어">
        {% for keyword in project.keywords %}
          <li>{{ keyword }}</li>
        {% endfor %}
      </ul>
      <p class="project-description">{{ project.description }}</p>
      {% if project.zenodo_url %}
        <a class="doi-link" href="{{ project.zenodo_url }}">Zenodo 공개본 <span aria-hidden="true">↗</span></a>
      {% else %}
        <span class="pending-link">공개 후 DOI 연결</span>
      {% endif %}
    </article>
    {% endfor %}
  </div>

  <div class="empty-state" id="empty-state" hidden>조건에 맞는 연구가 없습니다.</div>
</section>

<section class="process-section" id="process" aria-labelledby="process-title">
  <header class="section-heading light-heading">
    <div>
      <p class="section-index">02 / Process</p>
      <h2 id="process-title">연구가 공개되기까지</h2>
    </div>
    <p>GitHub는 과정을 기록하고, Zenodo는 완성된 버전을 보존합니다.</p>
  </header>
  <ol class="process-list">
    <li><span>01</span><strong>구상</strong><p>질문과 목적을 제안합니다.</p></li>
    <li><span>02</span><strong>집필</strong><p>자료와 원고를 발전시킵니다.</p></li>
    <li><span>03</span><strong>검토</strong><p>근거와 가독성을 점검합니다.</p></li>
    <li><span>04</span><strong>개정</strong><p>피드백과 변경 내역을 남깁니다.</p></li>
    <li><span>05</span><strong>공개</strong><p>Zenodo DOI로 보존합니다.</p></li>
  </ol>
</section>

<section class="participate" id="participate" aria-labelledby="participate-title">
  <div>
    <p class="section-index">03 / Participate</p>
    <h2 id="participate-title">새로운 질문과 검토를 기다립니다.</h2>
    <p class="participate-copy">KSI는 연구 제안과 구성원 참여 신청을 Owner에게 이메일로 받고, 공개 연구의 수록 기준은 Zenodo KSI 커뮤니티 정책에 따라 운영합니다.</p>
  </div>
  <div class="participate-actions">
    <a class="primary-action" href="{{ '/contact/' | relative_url }}?type=proposal">연구 제안하기 <span aria-hidden="true">→</span></a>
    <a class="secondary-action" href="{{ '/contact/' | relative_url }}?type=join">KSI 참여 신청하기 <span aria-hidden="true">→</span></a>
    <a class="policy-action" href="https://zenodo.org/communities/sum-of-inquiries/curation-policy">KSI 참여·수록 기준 읽기 <span aria-hidden="true">↗</span></a>
    <small>KSI Owner에게 연결됩니다.</small>
  </div>
</section>

<script src="{{ '/assets/js/project-filter.js' | relative_url }}" defer></script>
