---
layout: default
title: 질문의 별자리
permalink: /constellation/
description: KSI Research Hub의 질문과 연구 성과가 발전하고 연결되는 관계를 살펴봅니다.
extra_css: /assets/css/constellation.css
extra_js: /assets/js/constellation.js
---

<section class="constellation-hero">
  <div>
    <p class="section-index">Constellation of Inquiries</p>
    <h1>질문은 서로의 빛을 빌려<br><em>연구가 됩니다.</em></h1>
  </div>
  <p>완성된 성과만 나열하지 않고, 질문이 탐구와 공개 기록으로 발전하는 관계를 보여줍니다. 점을 선택하면 연결된 연구의 정보를 확인할 수 있습니다.</p>
</section>

<section class="constellation-section" aria-labelledby="constellation-title">
  <header class="constellation-heading">
    <div>
      <p class="section-index">01 / Research Map</p>
      <h2 id="constellation-title">질문과 연구의 관계도</h2>
    </div>
    <ul class="constellation-legend" aria-label="표시 범례">
      <li><i class="legend-question"></i> 질문</li>
      <li><i class="legend-drafting"></i> 발전 중</li>
      <li><i class="legend-published"></i> 공개 기록</li>
    </ul>
  </header>

  <div class="constellation-shell">
    <div class="constellation-map" aria-label="질문과 연구의 연결 지도">
      <span class="constellation-watermark" aria-hidden="true">K = Σ Iᵢ</span>
      <svg class="constellation-lines" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
        <line data-from="q-hierarchy" data-to="p-nietzsche" x1="105" y1="135" x2="300" y2="150"></line>
        <line data-from="p-nietzsche" data-to="p-equality" x1="300" y1="150" x2="565" y2="250"></line>
        <line data-from="q-fairness" data-to="d-rawls" x1="145" y1="340" x2="350" y2="325"></line>
        <line data-from="d-rawls" data-to="p-equality" x1="350" y1="325" x2="565" y2="250"></line>
        <line data-from="q-connection" data-to="p-pandemic" x1="375" y1="550" x2="610" y2="535"></line>
        <line data-from="q-spacetime" data-to="p-spacetime" x1="735" y1="105" x2="875" y2="155"></line>
        <line data-from="q-obesity" data-to="p-glp1" x1="765" y1="385" x2="900" y2="435"></line>
      </svg>

      <button class="constellation-node node-question" type="button" style="--x:10.5%;--y:19.3%" data-node="q-hierarchy" data-kind="질문" data-title="교육의 서열은 성장을 촉진하는가, 르상티망을 낳는가?" data-description="성적 경쟁과 서열화가 학생의 성장에 미치는 영향을 묻는 출발점입니다." data-meta="교육철학 · 니체" aria-label="질문: 교육의 서열은 성장을 촉진하는가, 르상티망을 낳는가?">
        <span class="node-core"></span><span class="node-label">서열과 르상티망</span>
      </button>

      <button class="constellation-node node-published" type="button" style="--x:30%;--y:21.4%" data-node="p-nietzsche" data-kind="공개 기록" data-title="낙타의 서열화와 르상티망" data-description="현대 교육의 무한 경쟁과 성적 서열화를 니체의 철학을 통해 고찰한 연구입니다." data-meta="Yoon, Sunho · 교육철학 · v1.0 공개" data-url="https://doi.org/10.5281/zenodo.21222993" aria-label="공개 연구: 낙타의 서열화와 르상티망">
        <span class="node-core"></span><span class="node-label">낙타의 서열화와<br>르상티망</span>
      </button>

      <button class="constellation-node node-question" type="button" style="--x:14.5%;--y:48.6%" data-node="q-fairness" data-kind="질문" data-title="공정한 교육은 모두를 똑같이 대하는 것인가?" data-description="형식적으로 같은 기회와 실질적으로 공정한 기회의 차이를 묻습니다." data-meta="정치철학 · 교육철학 · 롤스" aria-label="질문: 공정한 교육은 모두를 똑같이 대하는 것인가?">
        <span class="node-core"></span><span class="node-label">교육과 공정성</span>
      </button>

      <button class="constellation-node node-drafting" type="button" style="--x:35%;--y:46.4%" data-node="d-rawls" data-kind="발전 중" data-title="롤스 『정의론』 독서 탐구" data-description="공정으로서의 정의와 완전성의 원리를 중심으로 자유와 평등의 관계를 검토합니다." data-meta="Yoon, Sunho · 정치철학 · 집필 중" data-url="{{ '/' | relative_url }}#rawls-theory-of-justice-reading" aria-label="발전 중 연구: 롤스 정의론 독서 탐구">
        <span class="node-core"></span><span class="node-label">롤스 『정의론』<br>독서 탐구</span>
      </button>

      <button class="constellation-node node-published is-active" type="button" style="--x:56.5%;--y:35.7%" data-node="p-equality" data-kind="공개 기록" data-title="평등의 토대, 위대함의 교육" data-description="롤스의 평등과 니체의 자기초극을 연결하여 한국 중등교육의 모순을 분석합니다." data-meta="Yoon, Sunho · 교육철학 · v1.0 공개" data-url="https://doi.org/10.5281/zenodo.22306643" aria-label="공개 연구: 평등의 토대, 위대함의 교육">
        <span class="node-core"></span><span class="node-label">평등의 토대,<br>위대함의 교육</span>
      </button>

      <button class="constellation-node node-question" type="button" style="--x:37.5%;--y:78.6%" data-node="q-connection" data-kind="질문" data-title="연결은 언제 보호가 되고, 언제 배제가 되는가?" data-description="팬데믹의 방역·정보·교육 연결이 보호와 단절을 동시에 낳는 조건을 묻습니다." data-meta="사회철학 · 교육학" aria-label="질문: 연결은 언제 보호가 되고, 언제 배제가 되는가?">
        <span class="node-core"></span><span class="node-label">연결과 배제</span>
      </button>

      <button class="constellation-node node-published" type="button" style="--x:61%;--y:76.4%" data-node="p-pandemic" data-kind="공개 기록" data-title="철학·교육학적 관점에서 본 팬데믹의 사회적 문제" data-description="혐오·낙인과 원격수업의 교육 격차를 철학·교육학적으로 분석한 연구입니다." data-meta="Yoon, Sunho · 사회철학·교육학 · v1.0 공개" data-url="https://doi.org/10.5281/zenodo.22718001" aria-label="공개 연구: 철학 교육학적 관점에서 본 팬데믹의 사회적 문제">
        <span class="node-core"></span><span class="node-label">팬데믹의<br>사회적 문제</span>
      </button>

      <button class="constellation-node node-question" type="button" style="--x:73.5%;--y:15%" data-node="q-spacetime" data-kind="질문" data-title="시·공간은 관찰과 무관하게 실재하는가?" data-description="과학과 철학의 관점에서 시·공간의 존재 방식과 인식 조건을 묻습니다." data-meta="과학철학 · 상대성 이론" aria-label="질문: 시공간은 관찰과 무관하게 실재하는가?">
        <span class="node-core"></span><span class="node-label">시·공간의 실재성</span>
      </button>

      <button class="constellation-node node-published" type="button" style="--x:87.5%;--y:22.1%" data-node="p-spacetime" data-kind="공개 기록" data-title="시·공간은 실재하는가" data-description="시·공간의 실재성과 상대성 이론을 과학과 철학의 두 관점에서 탐구합니다." data-meta="Yoon, Sunho · 과학철학 · v1.0 공개" data-url="https://doi.org/10.5281/zenodo.22270214" aria-label="공개 연구: 시공간은 실재하는가">
        <span class="node-core"></span><span class="node-label">시·공간은<br>실재하는가</span>
      </button>

      <button class="constellation-node node-question" type="button" style="--x:76.5%;--y:55%" data-node="q-obesity" data-kind="질문" data-title="비만을 생활습관의 문제로만 설명할 수 있는가?" data-description="비만의 생물학적·대사적 요인과 약리학적 치료 가능성을 묻습니다." data-meta="생명과학 · 약리학" aria-label="질문: 비만을 생활습관의 문제로만 설명할 수 있는가?">
        <span class="node-core"></span><span class="node-label">비만과 치료 전략</span>
      </button>

      <button class="constellation-node node-published" type="button" style="--x:90%;--y:62.1%" data-node="p-glp1" data-kind="공개 기록" data-title="GLP-1 수용체 작용체가 불러온 비만 치료의 변화 ver.1" data-description="GLP-1의 생리적 기능과 수용체 작용제를 중심으로 비만 치료 전략의 발전을 탐구합니다." data-meta="Ho, Yejin · 생명과학·약리학 · v1.0 공개" data-url="https://doi.org/10.5281/zenodo.22538005" aria-label="공개 연구: GLP-1 수용체 작용체가 불러온 비만 치료의 변화">
        <span class="node-core"></span><span class="node-label">GLP-1과<br>비만 치료</span>
      </button>
    </div>

    <aside class="constellation-inspector" aria-live="polite">
      <p class="inspector-kind">공개 기록</p>
      <h3>평등의 토대, 위대함의 교육</h3>
      <p class="inspector-description">롤스의 평등과 니체의 자기초극을 연결하여 한국 중등교육의 모순을 분석합니다.</p>
      <p class="inspector-meta">Yoon, Sunho · 교육철학 · v1.0 공개</p>
      <a class="inspector-link" href="https://doi.org/10.5281/zenodo.22306643">기록 열기 <span aria-hidden="true">↗</span></a>
    </aside>
  </div>

  <p class="constellation-note">선은 영향과 발전의 방향을 나타냅니다. 하나의 질문은 공개 이후에도 닫히지 않으며, 다음 탐구의 출발점이 될 수 있습니다.</p>
</section>
