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
      {% assign researcher_projects = site.data.projects | where: "researcher_id", researcher.id %}
      {% unless researcher_projects == empty %}
        <button class="filter-button" type="button" data-project-filter="{{ researcher.id }}">{{ researcher.display_name }}</button>
      {% endunless %}
    {% endfor %}
    <button class="filter-button" type="button" data-project-filter="drafting">진행 연구</button>
  </div>

  <p class="filter-result" aria-live="polite"><span id="visible-project-count">{{ site.data.projects | size }}</span>개의 연구</p>

  <div class="project-grid" id="project-grid">
    {% for project in site.data.projects %}
    {% assign project_researchers = site.data.researchers | where: "id", project.researcher_id %}
    {% assign project_researcher = project_researchers | first %}
    <article class="project-card {% if project.stage == 'published' %}published{% else %}ongoing{% endif %}{% if project.featured %} feature-card{% endif %}" id="{{ project.id }}" data-researcher="{{ project.researcher_id }}" data-stage="{{ project.stage }}">
      <div class="card-topline">
        <span class="status">{{ project.status_label }}</span>
        <span class="field">{{ project.fields | join: " · " }}</span>
      </div>
      <div class="project-title-group">
        <h3>{{ project.title }}</h3>
        <p class="project-subtitle">{{ project.subtitle }}</p>
      </div>
      <a class="researcher-link" href="{{ '/researchers/' | relative_url }}#{{ project.researcher_id }}">{{ project.researcher }}</a>
      <ul class="keyword-list" aria-label="핵심어">
        {% for keyword in project.keywords %}
          <li>{{ keyword }}</li>
        {% endfor %}
      </ul>
      <p class="project-description">{{ project.description }}</p>
      <div class="card-actions">
        {% if project.listening_record %}
          <a class="listening-link" href="{{ '/listening/' | relative_url }}#{{ project.id }}">연구 음악 기록 <span aria-hidden="true">→</span></a>
        {% endif %}
        {% if project.zenodo_url %}
          <a class="doi-link" href="{{ project.zenodo_url }}">Zenodo 공개본 <span aria-hidden="true">↗</span></a>
        {% else %}
          <span class="pending-link">공개 후 DOI 연결</span>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>

  <div class="empty-state" id="empty-state" hidden>조건에 맞는 연구가 없습니다.</div>
</section>

{% assign release_projects = published_projects | sort: "publication_date" %}
<section class="release-log" id="release-log" aria-labelledby="release-log-title">
  <header class="section-heading light-heading">
    <div>
      <p class="section-index">02 / Publication Record</p>
      <h2 id="release-log-title">버전·공개 기록</h2>
    </div>
    <p>Zenodo에 공개된 실제 날짜를 기준으로 각 연구의 공개본과 다음 개정 계획을 기록합니다.</p>
  </header>

  <div class="release-list">
    {% for project in release_projects %}
    <article class="release-entry">
      <div class="release-main">
        <time datetime="{{ project.publication_date }}">{{ project.publication_label }}</time>
        <div class="release-copy">
          <h3>{{ project.title }}</h3>
          <p>{{ project.researcher }}</p>
        </div>
        <div class="release-version">
          <span>Released</span>
          <strong>{{ project.release_version }}</strong>
          <small>{% if project.revision %}{{ project.revision.next }}{% else %}최초 공개본{% endif %}</small>
        </div>
        <a class="release-doi" href="{{ project.zenodo_url }}">Zenodo 공개본 <span aria-hidden="true">↗</span></a>
      </div>
      {% if project.revision %}
      <details class="release-plan">
        <summary><span>{{ project.revision.next }} 개정 계획</span><b>펼치기</b></summary>
        <div>
          <ul>
            {% for change in project.revision.changes limit:3 %}
              <li>{{ change }}</li>
            {% endfor %}
          </ul>
        </div>
      </details>
      {% endif %}
    </article>
    {% endfor %}
  </div>
</section>

<section class="question-archive" id="questions" aria-labelledby="questions-title">
  <header class="section-heading">
    <div>
      <p class="section-index">03 / Open Questions</p>
      <h2 id="questions-title">미해결 질문 보관소</h2>
    </div>
    <p>아직 결론이 나지 않았지만, 다음 연구를 시작하게 할 질문을 기록합니다.</p>
  </header>

  <div class="question-grid">
    {% for question in site.data.open_questions %}
    <article class="question-card" id="{{ question.id }}">
      <div class="question-meta">
        <span class="question-number">{{ question.code }}</span>
        <span class="question-state">미해결</span>
      </div>
      <h3>{{ question.question }}</h3>
      <p>{{ question.note }}</p>
      <ul class="question-keywords" aria-label="관련 주제">
        {% for keyword in question.keywords %}
          <li>{{ keyword }}</li>
        {% endfor %}
      </ul>
    </article>
    {% endfor %}
  </div>

  <footer class="question-archive-footer">
    <p>질문이 연구로 발전하면 공개 연구 및 DOI 기록과 연결합니다.</p>
    <a href="{{ '/contact/' | relative_url }}?type=proposal">새 질문 제안하기 <span aria-hidden="true">→</span></a>
  </footer>
</section>

<section class="affiliated-project" id="affiliated" aria-labelledby="affiliated-title">
  <header class="section-heading">
    <div>
      <p class="section-index">04 / Affiliated Project</p>
      <h2 id="affiliated-title">연계 프로젝트</h2>
    </div>
    <p>KSI의 연구 기록 방식을 공유하면서 각 공동체의 정체성과 운영 범위는 독립적으로 유지합니다.</p>
  </header>
  <a class="affiliated-card" href="{{ '/class-2-2/' | relative_url }}">
    <div class="affiliated-logo">
      <img src="{{ '/assets/images/2026-class-2-2-logo.png' | relative_url }}" alt="2026 2-2 Research Community 로고">
    </div>
    <div class="affiliated-copy">
      <p><span aria-hidden="true"></span>KSI 연계 독립 프로젝트 · 2026</p>
      <h3>2026 Class 2-2<br>Research Community</h3>
      <small>현재 첫 연구 성과를 준비하고 있으며, 참여자 명단은 공개하지 않습니다.</small>
      <b>2-2 Research Hub 열기 <span aria-hidden="true">↗</span></b>
    </div>
  </a>
</section>

<section class="process-section" id="process" aria-labelledby="process-title">
  <header class="section-heading light-heading">
    <div>
      <p class="section-index">05 / Process</p>
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
    <p class="section-index">06 / Participate</p>
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
