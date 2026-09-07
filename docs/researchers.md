---
layout: default
title: 연구자
permalink: /researchers/
description: KSI Research Hub의 공개 연구자와 익명 연구자, 연구별 발전 관계를 소개합니다.
---

{% assign public_researchers = site.data.researchers | where: "anonymous", false %}
{% assign anonymous_researchers = site.data.researchers | where: "anonymous", true %}

<section class="directory-hero">
  <p class="section-index">Researchers</p>
  <h1>질문을 만드는<br><em>사람들</em>입니다.</h1>
  <p>연구자의 관심 분야와 공개 성과를 연결합니다. 이름 공개에 동의하지 않은 구성원은 연구 분야 중심의 익명 프로필로 소개합니다.</p>
</section>

<section class="researcher-directory" aria-labelledby="public-researchers-title">
  <header class="directory-section-heading">
    <div>
      <p class="section-index">01 / Public Profiles</p>
      <h2 id="public-researchers-title">공개 연구자</h2>
    </div>
    <p>실명 공개가 확인된 연구자의 프로필과 연구 기록입니다.</p>
  </header>

  <div class="public-researcher-list">
    {% for researcher in public_researchers %}
      {% assign researcher_projects = site.data.projects | where: "researcher_id", researcher.id %}
      <article class="researcher-profile" id="{{ researcher.id }}">
        <header class="researcher-header">
          <div class="researcher-monogram" aria-hidden="true">{{ researcher.monogram }}</div>
          <div class="researcher-identity">
            <p class="researcher-role">{{ researcher.role_ko }} <span lang="en">{{ researcher.role_en }}</span></p>
            <h2>{{ researcher.name_ko }}</h2>
            <p class="researcher-name-en" lang="en">{{ researcher.name_en }}</p>
            <div class="researcher-fields">{{ researcher.fields | join: " · " }}</div>
            <div class="researcher-fields-en" lang="en">{{ researcher.fields_en | join: " · " }}</div>
          </div>
          <span class="project-count">{{ researcher_projects | size }}개 연구</span>
        </header>

        {% if researcher.id == "yoon-s" %}
        <section class="research-trajectory" aria-labelledby="yoon-trajectory-title">
          <header>
            <div>
              <p class="section-index">Research Trajectory</p>
              <h3 id="yoon-trajectory-title">연구의 발전 경로</h3>
            </div>
            <p>경쟁 비판에서 공정성 탐구로, 다시 두 관점의 종합으로 이어집니다.</p>
          </header>
          <ol class="trajectory-list">
            <li>
              <a href="https://doi.org/10.5281/zenodo.21222993">
                <span class="trajectory-step">01 · 니체</span>
                <strong>낙타의 서열화와 르상티망</strong>
                <small>경쟁·서열화·르상티망 분석</small>
              </a>
            </li>
            <li>
              <a href="{{ '/' | relative_url }}#rawls-theory-of-justice-reading">
                <span class="trajectory-step">02 · 롤스</span>
                <strong>롤스 『정의론』 독서 탐구</strong>
                <small>공정성과 완전성의 원리 검토</small>
              </a>
            </li>
            <li>
              <a href="https://doi.org/10.5281/zenodo.22306643">
                <span class="trajectory-step">03 · 종합</span>
                <strong>평등의 토대, 위대함의 교육</strong>
                <small>롤스의 평등과 니체의 자기초극 종합</small>
              </a>
            </li>
          </ol>
        </section>
        {% endif %}

        <div class="researcher-work-heading">
          <span>연구 기록</span>
          <span lang="en">Research Record</span>
        </div>
        <ol class="researcher-projects">
          {% for project in researcher_projects %}
          <li>
            <div>
              <span>{{ project.status_label }}</span>
              <strong>{{ project.title }}</strong>
              <small>{{ project.subtitle }}</small>
            </div>
            {% if project.zenodo_url %}
              <a href="{{ project.zenodo_url }}" aria-label="{{ project.title }} Zenodo 공개본">DOI ↗</a>
            {% else %}
              <a class="project-pending" href="{{ '/' | relative_url }}#{{ project.id }}">진행 중 →</a>
            {% endif %}
          </li>
          {% endfor %}
        </ol>
      </article>
    {% endfor %}
  </div>

  <header class="directory-section-heading anonymous-heading">
    <div>
      <p class="section-index">02 / Anonymous Profiles</p>
      <h2>익명 연구자</h2>
    </div>
    <p>공개 동의를 받기 전까지 이름과 개인 식별 정보는 표시하지 않습니다.</p>
  </header>

  <div class="anonymous-researcher-grid">
    {% for researcher in anonymous_researchers %}
    <article class="anonymous-researcher-card" id="{{ researcher.id }}">
      <div class="anonymous-card-topline">
        <span class="anonymous-monogram" aria-hidden="true">{{ researcher.monogram }}</span>
        <span class="privacy-badge">익명 공개</span>
      </div>
      <p class="anonymous-role">{{ researcher.role_ko }}</p>
      <h3>{{ researcher.name_ko }}</h3>
      <p class="anonymous-name-en" lang="en">{{ researcher.name_en }}</p>
      <div class="anonymous-fields">
        <span>{{ researcher.fields | join: " · " }}</span>
        <span lang="en">{{ researcher.fields_en | join: " · " }}</span>
      </div>
      <div class="preparation-status">
        <span>{{ researcher.status_ko }}</span>
        <small lang="en">{{ researcher.status_en }}</small>
      </div>
    </article>
    {% endfor %}
  </div>

  <aside class="consent-note" aria-label="연구자 정보 공개 원칙">
    <strong>연구자 정보 공개 원칙</strong>
    <p>실명과 영문명은 본인의 공개 동의를 확인한 뒤 추가합니다. 동의 전에는 분야와 연구 준비 상태만 표시합니다.</p>
  </aside>
</section>
