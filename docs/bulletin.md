---
layout: default
title: KSI Bulletin
description: KSI의 연구 공개, 커뮤니티 운영과 Research Hub의 변화를 날짜순으로 보존합니다.
permalink: /bulletin/
---

{% assign bulletin_records = site.data.bulletins %}

<section class="bulletin-hero" aria-labelledby="bulletin-title">
  <div>
    <p class="section-index">KSI Bulletin · Since 2026</p>
    <h1 id="bulletin-title">연구가 공개되고<br><em>기록 공간이 자란 과정</em>을 남깁니다.</h1>
  </div>
  <p>KSI의 연구 공개, 커뮤니티 운영, 연구자 기록과 Research Hub의 기능 변화를 날짜순으로 보존합니다.</p>
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
      <h2 id="bulletin-ledger-title">전체 소식 기록</h2>
    </div>
    <p>연구 공개일은 Zenodo 공개본을, 허브 변경일은 GitHub 배포 기록을 기준으로 정리했습니다.</p>
  </header>

  <div class="bulletin-legend" aria-label="소식 분류 안내">
    <span><i class="release"></i>연구 공개</span>
    <span><i class="archive"></i>기록 공간</span>
    <span><i class="community"></i>커뮤니티</span>
    <span><i class="researcher"></i>연구자</span>
    <span><i class="hub"></i>허브 개편</span>
  </div>

  <div class="bulletin-records">
    {% for item in bulletin_records %}
    <article class="bulletin-entry bulletin-entry-{{ item.category }}">
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
        {% else %}
          <span>기록 보존</span>
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
