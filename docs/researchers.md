---
layout: default
title: 연구자
permalink: /researchers/
description: KSI Research Hub의 연구자별 연구 목록입니다.
---

<section class="directory-hero">
  <p class="section-index">Researchers</p>
  <h1>연구자별 탐구 기록</h1>
  <p>공개 동의를 전제로 연구자가 참여한 성과와 진행 중인 탐구를 함께 표시합니다.</p>
</section>

<section class="researcher-directory" aria-label="연구자 목록">
  {% for researcher in site.data.researchers %}
    {% assign researcher_projects = site.data.projects | where: "researcher_id", researcher.id %}
    <article class="researcher-profile" id="{{ researcher.id }}">
      <header class="researcher-header">
        <div class="researcher-monogram" aria-hidden="true">{{ researcher.display_name | slice: 0 }}</div>
        <div>
          <p>{{ researcher.role }}</p>
          <h2>{{ researcher.display_name }}</h2>
          <div class="researcher-fields">{{ researcher.fields | join: " · " }}</div>
        </div>
        <span class="project-count">{{ researcher_projects | size }}개 연구</span>
      </header>

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
            <span class="project-pending">진행 중</span>
          {% endif %}
        </li>
        {% endfor %}
      </ol>
    </article>
  {% endfor %}
</section>
