class Main {
  constructor(el, informations = {}, options = {}) {
    // 데이터 초기화
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

  renderCover() {

  }

  renderContents() {

  }
}

/**
 * data-input element를 찾아서 data-input에 해당하는 필드의 값을 template의 format에 맞게 설정
 * @param {element} pageEl 
 * @param {json} templateData 
 */
function updateDataInputInPage(pageEl, templateData, data) {
  const elementList = pageEl.querySelectorAll('[data-input]')
  const inputTemplate = templateData.input;
  for (let element of elementList) {
    const dataInput = element.dataset.input;
    const currentTemplate = inputTemplate[dataInput];
    let value = data[dataInput];
    if (currentTemplate) {
      const format = currentTemplate.format;
      value = replaceData(format, value);
    }

    element.textContent = value
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
function updatePageNumber(pageElList) {

}

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
  return args.reduce((string, replaceString) => string.replace(/%s/, replaceString), string);
}