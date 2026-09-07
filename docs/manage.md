---
layout: default
title: Owner 연구 관리
permalink: /manage/
description: KSI Owner가 연구 항목 데이터를 만들고 반영하기 위한 관리 도구입니다.
---

<section class="directory-hero manage-hero">
  <p class="section-index">Owner tool</p>
  <h1>Owner 연구 관리</h1>
  <p>KSI Owner용 도구입니다. 정보를 입력하면 연구 목록에 붙여넣을 데이터 조각을 만듭니다. 입력 내용은 전송되거나 자동 저장되지 않습니다.</p>
</section>

<section class="editor-layout">
  <form class="project-form" id="project-form">
    <div class="form-field full-field">
      <label for="project-title">연구 제목</label>
      <input id="project-title" name="title" type="text" required placeholder="예: 언어게임과 규칙의 형성">
    </div>

    <div class="form-field full-field">
      <label for="project-subtitle">부제</label>
      <input id="project-subtitle" name="subtitle" type="text" required placeholder="예: 비트겐슈타인의 사용 이론을 중심으로">
    </div>

    <div class="form-field">
      <label for="project-researcher">연구자</label>
      <select id="project-researcher" name="researcher">
        {% for researcher in site.data.researchers %}
          <option value="{{ researcher.id }}" data-name="{{ researcher.display_name }}">{{ researcher.display_name }}</option>
        {% endfor %}
      </select>
    </div>

    <div class="form-field">
      <label for="project-fields">분야</label>
      <input id="project-fields" name="fields" type="text" required placeholder="철학, 교육">
      <small>쉼표로 구분</small>
    </div>

    <div class="form-field">
      <label for="project-keywords">핵심어</label>
      <input id="project-keywords" name="keywords" type="text" required placeholder="롤스, 정의론, 공정성">
      <small>쉼표로 구분</small>
    </div>

    <div class="form-field">
      <label for="project-stage">상태</label>
      <select id="project-stage" name="stage">
        <option value="drafting">예정·집필 중</option>
        <option value="published">공개 완료</option>
      </select>
    </div>

    <div class="form-field">
      <label for="project-version">버전 표시</label>
      <input id="project-version" name="version" type="text" value="집필 중" placeholder="v1.0 공개">
    </div>

    <div class="form-field full-field">
      <label for="project-description">짧은 설명</label>
      <textarea id="project-description" name="description" rows="4" required placeholder="연구 질문과 접근 방법을 한두 문장으로 적습니다."></textarea>
    </div>

    <div class="form-field full-field">
      <label for="project-doi">Zenodo DOI 주소</label>
      <input id="project-doi" name="doi" type="url" placeholder="https://doi.org/10.5281/zenodo.00000000">
      <small>아직 공개 전이라면 비워도 됩니다.</small>
    </div>

    <button class="generate-button" type="submit">데이터 만들기</button>
  </form>

  <aside class="editor-output" aria-labelledby="output-title">
    <p class="section-index">Generated data</p>
    <h2 id="output-title">붙여넣을 내용</h2>
    <pre id="yaml-output" tabindex="0">왼쪽 정보를 입력한 뒤 ‘데이터 만들기’를 누르세요.</pre>
    <div class="output-actions">
      <button id="copy-yaml" type="button" disabled>내용 복사</button>
      <a href="https://github.com/SunhoYoon-Hub/KSI-Research-Hub/edit/main/docs/_data/projects.yml">GitHub에서 편집</a>
    </div>
    <p class="save-note">복사한 내용을 데이터 파일 맨 아래에 붙여넣고 <strong>Commit changes</strong>를 누르면 사이트가 자동 갱신됩니다. 저장소 수정 권한이 있는 계정만 반영할 수 있습니다.</p>
    <p class="copy-status" id="copy-status" aria-live="polite"></p>
  </aside>
</section>

<script src="{{ '/assets/js/project-editor.js' | relative_url }}" defer></script>
