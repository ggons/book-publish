class Main {
  constructor(el, informations = {}, options = {}) {
    // 데이터 초기화
    this.pageList = [];
  }

  init() {
    // 구성 배열 정보 저장
    // 구성 템플릿 JSON 정보 저장
    // CSS 존재 시 추가 (완료될때 까지 대기)
    // 구성 템플릿 토대로 페이지 렌더링 (내지 제외)
  }

  setData() {
    // 목차 순서대로 내지 템플릿 렌더링
  }

  renderCover() {}

  renderContents() {}
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
          깊이1
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
*/
