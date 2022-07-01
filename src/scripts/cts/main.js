export class Main {
  constructor(el, info = {}, options = {}) {
    // 데이터 초기화
    this.el = el;
    this.info = info;
    this.template = {
      outside: [
        {
          html: `
            <div class="bk-page bk-image-page" style="background-image: url(../styles/image/bg-back-cover.png); ">
              <div class="...">
              
              </div>
              <div class="bk-back-cover">
                <div class="bk-sub-title"><div data-input="부제">중등 2학년 1학기 100점 만점<br>쌍둥이 기출문제집</div></div>
                <h1 class="bk-main-title"><div data-input="제목">중등 쌍둥이<br>기출문제집</div></h1>
              </div>
            </div>
          `,
          json: {
            input: {
              "제목": {
                kind: "교재",
                value: "`${info.title}`",
                editable: true,
              },
              "부제": {
                value: "`${info.subtitle}`",
                editable: true,
              },
            }
          },
        },
        {
          html: `
            <div class="bk-spine-page">
              <div class="title-area">
                <h1 class="bk-main-title" data-input="제목">중등 쌍둥이 기출문제집</h1>
              </div>
              <div class="bk-info">
                <p class="bk-subject" data-input="과목">수학</p>
                <p class="bk-grade"><span data-input="학년">2학년</span></p>
                <p class="bk-semester"><span data-input="학기">1학기</span></p>
              </div>
            </div>
          `,
          json: {
            input: {
              "제목": {
                kind: "교재",
                value: "`${info.title}`",
                editable: true,
              },
              "과목": {
                value: "`${info.subject}`"
              },
              "학년": {
                value: "`${info.grade}학년`"
              },
              "학기": {
                value: "`${info.semester}학기`"
              },
            }
          },
        },
        {
          html: `
            <div class="bk-page bk-image-page" style="background-image: url(../styles/image/bg-main-cover.png);">
              <div class="bk-title-page">
                <h1 class="bk-main-title"><div data-input="제목">중등 쌍둥이<br>기출문제집</div></h1>
                <div class="bk-sub-title"><div data-input="부제">중등 2학년 1학기 100점 만점<br>쌍둥이 기출문제집</div></div>
          
                <div class="bk-info">
                  <p class="bk-subject" data-input="과목">수학</p>
                  <p class="bk-grade"><span data-input="학년">2학년</span> <span data-input="학기">1학기</span></p>
                </div>
                <div class="bk-copyright">
                  <p class="bk-institute" data-input="기관명">강남 종로학원</p>
                  <p class="bk-writer" data-input="편저">이단비 편저</p>
                </div>
              </div>
            </div>
            `,
            // <div>
            //   <div data-input="제목"></div>
            //   <div data-input="부제"></div>
            //   <div data-input="과목"></div>
            //   <div data-input="학년"></div>
            //   <div data-input="학기"></div>
            //   <div data-input="기관명"></div>
            //   <div data-input="편저"></div>
            // </div>
          json: {
            input: {
              "제목": {
                kind: "교재",
                value: "`${info.title}`",
                editable: true,
              },
              "부제": {
                value: "`${info.subtitle}`",
                editable: true,
              },
              "과목": {
                value: "`${info.subject}`"
              },
              "학년": {
                value: "`${info.grade}학년`"
              },
              "학기": {
                value: "`${info.semester}학기`"
              },
              "기관명": {
                value: "`${info.academyName}`"
              },
              "편저": {
                value: "`${info.writer.join(', ')} 편저`"
              },
            }
          },
        },
      ],
      inside: {
        base: [
          {
            html: `
              <page data-print-name="내지">
                <div class="bk-page bk-image-page">
                  <div class="bk-title-page">
                    <h1 class="bk-main-title"><div data-input="제목">중등 쌍둥이<br>기출문제집</div></h1>
                    <div class="bk-sub-title"><div data-input="부제">중등 2학년 1학기 100점 만점<br>쌍둥이 기출문제집</div></div>
                  </div>
                </div>
              </page>
            `,
            json: {
              input: {
                "제목": {
                  kind: "교재",
                  value: "`${info.title}`",
                  editable: true,
                },
                "부제": {
                  value: "`${info.subtitle}`",
                  editable: true,
                },
              }
            },
          }
        ],
        contents: [

        ],
        exam: [

        ],
        answer: [
          
        ]
      }
    }
    this.pageList = [];

    this.init();
  }

  init() {
    // 구성 배열 정보 저장
    // 구성 템플릿 JSON 정보 저장
    // CSS 존재 시 추가 (완료될때 까지 대기)
    // 구성 템플릿 토대로 페이지 렌더링 (내지 제외)
    this.el.innerHTML = '';
  }

  /**
   * 교재 정보 설정
   * - 제목, 부제, 과목, 학년, 학기, 기관명, 편저
   */
  setBookInfo(info) {
    this.info = {
      ...this.info,
      ...info
    }
  }

  setData() {
    // 목차 순서대로 내지 템플릿 렌더링
  }

  /**
   * 겉표지 그리기
   * - 뒷표지
   * - 책등
   * - 앞표지
   * - 뒷표지 뒤
   * - 책등 빈거
   * - 앞표지 뒤
   */
  renderOutside() {
    const containerEl = this.el;
    const pageListEl = document.createElement('pages');

    let pageElement;
    for (let i = 0, len = this.template.outside.length; i < len; i++) {
      let item = this.template.outside[i];

      if (i % 3 === 0) {
        pageElement = document.createElement('page');
        pageElement.dataset.type = 'outside-cover';
      }

      pageElement.insertAdjacentHTML('beforeend', item.html);
      const itemElement = pageListEl.lastElementChild;
      
      if (itemElement) {
        const inputElementList = itemElement.querySelectorAll('[data-input]');
        for (let inputElement of inputElementList) {
          const inputName = inputElement.dataset.input;
          
          const inputConfig = item?.json?.input?.[inputName];
          if (inputConfig) {
            const fn = new Function('{ info }', `return ${inputConfig.value}`)
            inputElement.textContent = fn({ info: this.info});
          }
        }
      }

      if (i === 2) {
        pageListEl.insertAdjacentElement('beforeend', pageElement);

        if (len === 3) {
          pageElement = document.createElement('page');
          pageElement.dataset.type = 'outside-cover';
          pageElement.appendChild(pageListEl.children[0].children[0].cloneNode(false))
          pageElement.appendChild(pageListEl.children[0].children[1].cloneNode(false))
          pageElement.appendChild(pageListEl.children[0].children[2].cloneNode(false))
          pageListEl.insertAdjacentElement('beforeend', pageElement);
        }
      } else if (i === 4) {
        // 책등 삽입
        const spineElement = pageListEl.children[0].children[1].cloneNode(false);
        spineElement.innerHTML = '';
        pageListEl.insertAdjacentElement('beforeend', spineElement);
        pageListEl.insertAdjacentElement('beforeend', pageElement);
      }
    }

    containerEl.insertAdjacentElement('beforeend', pageListEl);
  }

  /**
   * 속표지, ...?
   */
  renderInsideBase() {
    const containerEl = this.el;
    const pageListEl = document.createElement('pages');

    for (let i = 0, len = this.template.inside.base.length; i < len; i++) {
      let item = this.template.inside.base[i];

      pageListEl.insertAdjacentHTML('beforeend', item.html);
      const itemElement = pageListEl.lastElementChild;

      if (itemElement) {
        const inputElementList = itemElement.querySelectorAll('[data-input]');
        for (let inputElement of inputElementList) {
          const inputName = inputElement.dataset.input;
          
          const inputConfig = item?.json?.input?.[inputName];
          if (inputConfig) {
            const fn = new Function('{ info }', `return ${inputConfig.value}`)
            inputElement.textContent = fn({ info: this.info});
          }
        }
      }
    }

    containerEl.insertAdjacentElement('beforeend', pageListEl);
  }

  /**
   * 목차
   */
  renderInsideContents() {}

  /**
   * 문제
   */
  renderInsideExam() {}

  /**
   * 정답 및 해설
   */
  renderInsideAnswer() {}
}

/**
 * data-input element를 찾아서 data-input에 해당하는 필드의 값을 template의 format에 맞게 설정
 * 앞표지, 뒷표지
 * @param {element} pageEl
 * @param {json} templateData
 */
function updateDataInputInPage(pageEl, templateData, data) {
  const elementList = pageEl.querySelectorAll('[data-input]');
  const inputTemplate = templateData.input;
  for (let element of elementList) {
    const dataInput = element.dataset.input;
    const currentTemplate = inputTemplate[dataInput];
    let value = data[dataInput];
    if (currentTemplate) {
      const format = currentTemplate.format;
      value = replaceData(format, value);
    }

    element.textContent = value;
  }
}

// function updateDataVisibleInPage(pageEl, templateData) {
//   const elementList = pageEl.querySelectorAll('[data-visible]')
//   for (let element of elementList) {
//     const dataVisible = element.dataset.visible;
//     element.textContent ;
//   }
// }

/**
 * 전체 페이지에 페이지 번호 설정
 */
function updatePageNumber(pageElList) {}

/**
 * 문자열에서 %s 를 arg 로 치환
 * @param {string} string
 * @param  {...string} args
 * @returns string
 *
 * @example
 *  replaceData('안%s하세요', '녕')
 */
function replaceData(string, ...args) {
  return args.reduce(
    (string, replaceString) => string.replace(/%s/, replaceString),
    string,
  );
}

// function insertData() {
//   const fn = new Function(교재, )
// }

/*
  페이지 종류

    디자인 + 교재 정보
      - 앞표지
      - 앞표지 반대
      - 뒷표지
      - 뒷표지 반대
      - 속표지

      {
        input: {
          제목: {
            수정가능여부
            줄바꿈가능여부
            에디터 툴바 제공 여부 (폰트 사이즈)
          }
          부제: {
            수정가능여부
            줄바꿈가능여부
          }
          과목
          학년: {
            번호 유형
          }
          학기: {
            번호 유형
          }
          기관명
          편저
        }
      }

    디자인 + 목차 정보
      - 목차
      - 도비라

      {
        input: {
          단원 번호: {
            번호 유형
          }
        },
        unit: {
          
        }
        html: {
          깊이1: "<div><span>${</span></div>"
          깊이2
          깊이3
        }
      }

    이미지
      - 빈페이지
      - 메모
      - 개념 
        Q: 페이지 번호가 필요한지? (통이미지인데..?)
      - ... (페이지로 제작된 이미지)

    디자인 내지 + 문항(N)
      {
        input: {
          페이지 번호
          단원명
          내지명
        },
        entry: {
          문제: {
            htmlFn: "<div class='entry'><div data-level="3">${entry.level3}</div></div>"
          }
          대발문: {
            htmlFn: "<div class='entry'>${entry.level1}</div>"
          }
          이미지: {
            html
          }
        }
      }

    디자인 내지 + 개념(1)
      {
        input: {
          페이지 번호
          단원명
          내지명
        }
      }


  pages
    page
      data-print-name="겉표지,내지"

      div.bk-page data-outside-name="앞표지,책등,뒷표지,앞표지뒤,책등뒤,뒷표지뒤" data-inside-name="속표지,목차,대단원표지,중단원표지,소단원표지,문제,마인드맵"> odd even
        width: 230mm; 224 + 3 + 3
        height: 303mm; 297 + 3 + 3
        overflow: hidden;
        
        <div class="...">
          .bk-header
            height: 20mm; + 3mm 도련
          .bk-body
            width: 194mm;
            height: 264mm;
            margin: 0 auto;
            overflow: hidden;
          .bk-footer
            height: 13mm; + 3mm 도련
        </div>

        data-outside-name="앞표지,책등,뒷표지,앞표지뒤,책등뒤,뒷표지뒤"
        data-outside-name="책등,책등뒤"
          width: 15mm;

        div
          data-inside-name="속표지,목차,대단원표지,중단원표지,소단원표지,문제,마인드맵"
          .page-odd .page-even

          div[data-inside-name="문제"]
            .bk-header
              height: 20mm; + 3mm 도련
            .bk-body
              width: 194mm;
              height: 264mm;
              margin: 0 auto;
              overflow: hidden;
            .bk-footer
              height: 13mm; + 3mm 도련

          div[data-inside-name="마인드맵"]
    
  

  <pages>
    <page>
      <div class="bk-page" data-outside-name="뒷표지">
        <div class="bk-back-cover">
          <div class="bk-sub-title"><div data-input="부제">중등 2학년 1학기 100점 만점<br>쌍둥이 기출문제집</div></div>
          <h1 class="bk-main-title"><div data-input="제목">중등 쌍둥이<br>기출문제집</div></h1>
        </div>
      </div>
      <div class="bk-page" data-outside-name="앞표지">
        <div class="bk-title-page">
          <h1 class="bk-main-title"><div data-input="제목">중등 쌍둥이<br>기출문제집</div></h1>
          <div class="bk-sub-title"><div data-input="부제">중등 2학년 1학기 100점 만점<br>쌍둥이 기출문제집</div></div>
    
          <div class="bk-info">
            <p class="bk-subject" data-input="과목">수학</p>
            <p class="bk-grade"><span data-input="학년">2학년</span> <span data-input="학기">1학기</span></p>
          </div>
          <div class="bk-copyright">
            <p class="bk-institute" data-input="기관명">강남 종로학원</p>
            <p class="bk-writer" data-input="편저">이단비 편저</p>
          </div>
        </div>
      </div>
    </page>
  </pages>


  <page data-print-name="내지">
    <div class="bk-page" data-inside-name="속표지,목차,대단원표지,중단원표지,소단원표지,문제,마인드맵,정답과해설">
      .bk-header
        height: 20mm; + 3mm 도련
      .bk-body
        width: 194mm;
        height: 264mm;
        margin: 0 auto;
        overflow: hidden;
      .bk-footer
        height: 13mm; + 3mm 도련

      <div 
    </div>
  </page>

194mm
264mm..



  <div class="bk-page" data-inside-name="속표지,목차,대단원표지,중단원표지,소단원표지,문제,마인드맵,정답과해설">
    <div class="bk-container">
      <header></header>
      <body>문제</body>
      <footer></footer>
    </div>
  </div>

  <div class="bk-page" data-inside-name="속표지,목차,대단원표지,중단원표지,소단원표지,문제,마인드맵,정답과해설">
    <div class="bk-container">
      <header></header>
      <body><div><img src="..." width="100%" /></div></body>
      <footer></footer>
    </div>
  </div>

  <div class="bk-page" data-inside-name="속표지,목차,대단원표지,중단원표지,소단원표지,문제,마인드맵,정답과해설">
    <div class="bk-container">
      <div 이미지 />
    </div>
  </div>



  앞표지..뒤표지... 책등  
  
  
  
  속표지  

  목차...
  문제...
  정답과해설...
  




  reset - 문제지, 교재
common - 문제지, 교재
bk - 교재
exp - 문제지
theme...






내지 구성




조판영역
  너비 194  (좌측 여백 8) + 바디 (194) + (우측 여백 8)
  높이 264  (헤더 20) + 바디 (264) + (푸터 13)

교재
  너비 230 -> 224
  높이 303 -> 297
  
A4
  너비 210
  높이 297



출력 
  - A4
  - 출판
    교재 사이즈 + 여백 10 (CSS)

    프린트 설정
      너비 250 여백 0
      높이 323 여백 0
*/