---
layout: default
title: KSI Bulletin
description: KSI의 연구 공개, 커뮤니티 운영과 Research Hub의 변화를 날짜순으로 보존합니다.
permalink: /bulletin/
extra_js: /assets/js/bulletin-filter.js
---

{% assign bulletin_records = site.data.bulletins %}

<section class="bulletin-hero" aria-labelledby="bulletin-title">
  <div>
    <p class="section-index">KSI Bulletin · News Archive</p>
    <h1 id="bulletin-title">연구의 시간을<br><em>기록합니다.</em></h1>
  </div>
  <p>연구 공개, 커뮤니티 운영과 Research Hub의 변화를 날짜순으로 보존합니다.</p>
  <dl aria-label="KSI 소식 기록 요약">
    <div><dt>기록</dt><dd>{{ bulletin_records | size }}</dd></div>
    <div><dt>첫 기록</dt><dd>2026.07.06</dd></div>
    <div><dt>최근 갱신</dt><dd>2026.09.20</dd></div>
  </dl>
</section>

<section class="bulletin-ledger" aria-labelledby="bulletin-ledger-title">
  <header class="bulletin-ledger-heading">
    <div>
      <p class="section-index">Complete Record</p>
      <h2 id="bulletin-ledger-title">전체 기록</h2>
    </div>
    <p>연구 공개일은 Zenodo 공개본을, 허브 변경일은 GitHub 배포 기록을 기준으로 정리했습니다.</p>
  </header>

  <div class="bulletin-filters" role="group" aria-label="소식 기록 분류">
    <button class="active" type="button" data-bulletin-filter="all" aria-pressed="true">전체</button>
    <button type="button" data-bulletin-filter="release" aria-pressed="false">연구 공개</button>
    <button type="button" data-bulletin-filter="archive" aria-pressed="false">기록 공간</button>
    <button type="button" data-bulletin-filter="community" aria-pressed="false">커뮤니티</button>
    <button type="button" data-bulletin-filter="researcher" aria-pressed="false">연구자</button>
    <button type="button" data-bulletin-filter="hub" aria-pressed="false">허브·운영</button>
  </div>

  <div class="bulletin-records">
    {% for item in bulletin_records %}
    {% assign bulletin_group = item.category %}
    {% if item.category == 'research-history' %}{% assign bulletin_group = 'release' %}{% endif %}
    {% if item.category == 'design' or item.category == 'infrastructure' or item.category == 'operation' %}{% assign bulletin_group = 'hub' %}{% endif %}
    <article class="bulletin-entry bulletin-entry-{{ item.category }}" data-bulletin-group="{{ bulletin_group }}">
      <div class="bulletin-date-block">
        <time datetime="{{ item.date }}">{{ item.date_label }}</time>
        <span>{{ item.kicker }}</span>
      </div>
      <div class="bulletin-entry-copy">
        <p>{{ item.category_label }}</p>
        <h3>{{ item.title }}</h3>
        <div>{{ item.summary }}</div>
      </div>
      <div class="bulletin-entry-action">
        {% if item.url %}
          {% if item.external %}
            <a href="{{ item.url }}">{{ item.link_label }} <span aria-hidden="true">↗</span></a>
          {% else %}
            <a href="{{ item.url | relative_url }}">{{ item.link_label }} <span aria-hidden="true">→</span></a>
          {% endif %}
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="bulletin-note" aria-label="기록 원칙">
  <p class="section-index">Archive Note</p>
  <h2>작은 변화도 지워버리지 않습니다.</h2>
  <p>하나의 연구가 공개되는 순간뿐 아니라, 연구를 연결하고 읽는 방식이 달라진 과정도 KSI의 역사로 함께 기록합니다.</p>
</section>
