// === ДАННЫЕ ИЗ JSON ===
let jointData = []; // Данные о соединениях из exel.json

// Загрузка данных из JSON при старте
fetch('exel-gost.json')  // Используем расширенный JSON с ГОСТ данными
  .then(response => {
    if (!response.ok) {
      // Fallback на оригинальный файл
      return fetch('exel.json');
    }
    return response;
  })
  .then(response => {
    if (!response.ok) {
      console.error('Ошибка загрузки JSON данных:', response.status);
      return [];
    }
    return response.json();
  })
  .then(data => {
    jointData = data;
    console.log('Загружено соединений:', jointData.length);
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error);
  });

//Заполнение полей при выборе
window.addEventListener("load", function (e) {
  //---Отлов HTML айтемов---
  const weldingMethod = document.getElementById("weldingMethod");
  const technicalDocumentation = document.getElementById(
    "technicalDocumentation"
  );
  const typeOfConnection = document.getElementById("typeOfConnection");
  const thicknessList = document.getElementById("thicknessList");
  const cuttingAngleValue = this.document.getElementById("cuttingAngle");

  //---Определение нормативно технической документации---
  weldingMethod.addEventListener("change", function () {
    let selectedWeldingMethod = this.value;
    technicalDocumentation.innerHTML = "";
    //---РД---
    if (selectedWeldingMethod === "MMA") {
      let optionFirst = document.createElement("option");
      optionFirst.value = "";
      optionFirst.innerText = "";
      technicalDocumentation.appendChild(optionFirst);

      let optionSecond = document.createElement("option");
      optionSecond.value = "ГОСТ 5264";
      optionSecond.innerText = "ГОСТ 5264";
      technicalDocumentation.appendChild(optionSecond);

      let optionThird = document.createElement("option");
      optionThird.value = "ГОСТ 11534";
      optionThird.innerText = "ГОСТ 11534";
      technicalDocumentation.appendChild(optionThird);
      //---МП---
    } else if (
      selectedWeldingMethod === "MIG/MAG"
    ) {
      let optionFirst = document.createElement("option");
      optionFirst.value = "";
      optionFirst.innerText = "";
      technicalDocumentation.appendChild(optionFirst);

      let optionSecond = document.createElement("option");
      optionSecond.value = "ГОСТ 14771";
      optionSecond.innerText = "ГОСТ 14771";
      technicalDocumentation.appendChild(optionSecond);

      let optionThird = document.createElement("option");
      optionThird.value = "ГОСТ 23518";
      optionThird.innerText = "ГОСТ 23518";
      technicalDocumentation.appendChild(optionThird);
      //---РАД---
    } else if (
      selectedWeldingMethod === "TIG"
    ) {
      let optionFirst = document.createElement("option");
      optionFirst.value = "";
      optionFirst.innerText = "";
      technicalDocumentation.appendChild(optionFirst);

      let optionSecond = document.createElement("option");
      optionSecond.value = "ГОСТ 16037";
      optionSecond.innerText = "ГОСТ 16037";
      technicalDocumentation.appendChild(optionSecond);
      //АФ
    } else if (
      selectedWeldingMethod === "SAW"
    ) {
      let optionFirst = document.createElement("option");
      optionFirst.value = "";
      optionFirst.innerText = "";
      technicalDocumentation.appendChild(optionFirst);

      let optionSecond = document.createElement("option");
      optionSecond.value = "ГОСТ 8713";
      optionSecond.innerText = "ГОСТ 8713";
      technicalDocumentation.appendChild(optionSecond);
    }
  });

  //Формирование списка соединений в зависимости от ГОСТ
  technicalDocumentation.addEventListener("change", function () {
    var selectedWeldingMethod = weldingMethod.value;
    if (
      selectedWeldingMethod === "MMA" &&
      technicalDocumentation.value === "ГОСТ 5264"
    ) {
      let typeOfConnectionArray5264 = [
        "",
        "С1",
        "С28",
        "С3",
        "С2",
        "С4",
        "С5",
        "С6",
        "С7",
        "С42",
        "С8",
        "С9",
        "С10",
        "С11",
        "С12",
        "С13",
        "С14",
        "С15",
        "С16",
        "С43",
        "С17",
        "С18",
        "С19",
        "С20",
        "С21",
        "С45",
        "С23",
        "С24",
        "С25",
        "С26",
        "С27",
        "С39",
        "С40",
        "У1",
        "У2",
        "У4(1)",
        "У4(2)",
        "У5(1)",
        "У5(2)",
        "У6",
        "У7",
        "У8",
        "У9",
        "У10",
        "Т1",
        "Т2",
        "Т3",
        "Т5",
        "Т6",
        "Т7",
        "Т8",
        "Т9",
        "Н1",
        "Н2",
      ];
      typeOfConnectionArray5264.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        typeOfConnection.appendChild(optionElement);
      });
    } else if (
      selectedWeldingMethod === "MIG/MAG" &&
      technicalDocumentation.value === "ГОСТ 14771"
    ) {
      let typeOfConnectionArray14771 = [
        "",
        "С1",
        "С28",
        "С3",
        "С2",
        "С4",
        "С5",
        "С6",
        "С7",
        "С8",
        "C9",
        "С10",
        "С11",
        "С12",
        "С13",
        "С14",
        "С15",
        "С16",
        "С17",
        "С18",
        "С19",
        "С20",
        "С21",
        "С23",
        "С24",
        "С25",
        "С26",
        "С27",
        "У1",
        "У2",
        "У4(1)",
        "У4(2)",
        "У5(1)",
        "У5(2)",
        "У6",
        "У7",
        "У8",
        "У9",
        "У10",
        "Т1",
        "Т3",
        "Т5",
        "Т6",
        "Т7",
        "Т8",
        "Т9",
        "Н1",
        "Н2",
      ];
      typeOfConnectionArray14771.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        typeOfConnection.appendChild(optionElement);
      });
    }
  });
  //----------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------

  //Формирование списка толщин для C1 ГОСТ 5264
  typeOfConnection.addEventListener("change", function () {
    // === ОЧИСТКА ПОЛЕЙ ПРИ СМЕНЕ ТИПА СОЕДИНЕНИЯ ===
    if (typeof clearAllInputs === 'function') {
      clearAllInputs();
    }
    if (typeof clearAllErrors === 'function') {
      clearAllErrors();
    }
    
    let selectedWeldingMethod = weldingMethod.value;
    if (
      selectedWeldingMethod === "MMA" &&
      technicalDocumentation.value === "ГОСТ 5264" &&
      (typeOfConnection.value === "С1" || typeOfConnection.value === "С3")
    ) {
      let thicknessListC1 = ["", "1", "2", "3", "4"];
      thicknessList.innerText = "";
      thicknessListC1.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        thicknessList.appendChild(optionElement);
      });
      cuttingAngleValue.value = "Без скоса";
    } else if (
      selectedWeldingMethod === "MMA" &&
      technicalDocumentation.value === "ГОСТ 5264" &&
      typeOfConnection.value === "С28"
    ) {
      let thicknessListC1 = [
        "",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ];
      thicknessList.innerText = "";
      thicknessListC1.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        thicknessList.appendChild(optionElement);
      });
      cuttingAngleValue.value = "Без скоса";
    } else if (
      selectedWeldingMethod === "MMA" &&
      technicalDocumentation.value === "ГОСТ 5264" &&
      (typeOfConnection.value === "С4" ||
        typeOfConnection.value === "С5" ||
        typeOfConnection.value === "С6")
    ) {
      let thicknessListC1 = ["", "1", "1.5", "2", "2.5", "3", "4"];
      thicknessList.innerText = "";
      thicknessListC1.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        thicknessList.appendChild(optionElement);
      });
      cuttingAngleValue.value = "Без скоса";
    } else if (
      selectedWeldingMethod === "MMA" &&
      technicalDocumentation.value === "ГОСТ 5264" &&
      typeOfConnection.value === "С7"
    ) {
      let thicknessListC1 = ["", "2", "3", "4", "5"];
      thicknessList.innerText = "";
      thicknessListC1.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        thicknessList.appendChild(optionElement);
      });
      cuttingAngleValue.value = "Без скоса";
      //-------------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------------
      // Для ГОСТ 14771
    } else if (
      selectedWeldingMethod === "MIG/MAG" &&
      technicalDocumentation.value === "ГОСТ 14771" &&
      typeOfConnection.value === "С1"
    ) {
      let thicknessListC1 = [
        "",
        "0.5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4",
      ];
      thicknessList.innerText = "";
      thicknessListC1.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        thicknessList.appendChild(optionElement);
      });
      cuttingAngleValue.value = "Без скоса";
    } else if (
      selectedWeldingMethod === "MIG/MAG" &&
      technicalDocumentation.value === "ГОСТ 14771" &&
      typeOfConnection.value === "С28"
    ) {
      let thicknessListC1 = [
        "",
        "1",
        "1.5",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ];
      thicknessList.innerText = "";
      thicknessListC1.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        thicknessList.appendChild(optionElement);
      });
      cuttingAngleValue.value = "Без скоса";
    } else if (
      selectedWeldingMethod === "MIG/MAG" &&
      technicalDocumentation.value === "ГОСТ 14771" &&
      typeOfConnection.value === "С3"
    ) {
      let thicknessListC1 = [
        "",
        "0.5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4",
      ];
      thicknessList.innerText = "";
      thicknessListC1.forEach(function (value) {
        let optionElement = document.createElement("option");
        optionElement.value = value;
        optionElement.innerText = value;
        thicknessList.appendChild(optionElement);
      });
      cuttingAngleValue.value = "Без скоса";
    }
  });
  
  // === ЗАПОЛНЕНИЕ ПАРАМЕТРОВ ИЗ JSON ===
  // При выборе толщины - заполняем параметры из exel.json
  thicknessList.addEventListener("change", function() {
    const selectedConnection = typeOfConnection.value;
    const selectedThickness = thicknessList.value;
    
    if (!selectedConnection || !selectedThickness || jointData.length === 0) {
      return; // Ничего не выбрано или данные не загружены
    }
    
    // Ищем данные в JSON
    const foundData = jointData.find(item => 
      item.connectionType === selectedConnection && 
      item.thickness === selectedThickness
    );
    
    if (foundData) {
      // Заполняем input поля из найденных данных
      const gapInput = document.getElementById('gap');
      const weldWidthInput = document.getElementById('weldWidth');
      const gainHeightInput = document.getElementById('gainHeight');
      const angleAlphaInput = document.getElementById('angleAlpha');
      const bluntingInput = document.getElementById('blunting');
      const radiusTransitionInput = document.getElementById('radiusTransition');
      const diameterInput = document.getElementById('diameter');
      const refractiveHeightInput = document.getElementById('refractiveHeight');
      const protrusionEndInput = document.getElementById('protrusionEnd');
      const weldWidthSecondInput = document.getElementById('weldWidthSecond');
      const gainHeightSecondInput = document.getElementById('gainHeightSecond');
      const distanceBetweenEdgesInput = document.getElementById('distanceBetweenEdges');
      
      // Заполняем поля если данные есть
      if (gapInput && foundData.b) gapInput.value = foundData.b;
      if (weldWidthInput && foundData.e) weldWidthInput.value = foundData.e;
      if (gainHeightInput && foundData.g) gainHeightInput.value = foundData.g;
      if (angleAlphaInput && foundData.angleAlpha) angleAlphaInput.value = foundData.angleAlpha;
      if (bluntingInput && foundData.blunting) bluntingInput.value = foundData.blunting;
      if (radiusTransitionInput && foundData.R) radiusTransitionInput.value = foundData.R;
      if (diameterInput && foundData.diameter) diameterInput.value = foundData.diameter;
      
      // Показываем/скрываем поля в зависимости от типа соединения
      updateParameterVisibility(selectedConnection);
      
      console.log('Загружены данные для', selectedConnection, 'толщина', selectedThickness, ':', foundData);
    } else {
      // Очищаем поля если данных нет
      clearAllInputs();
      console.log('Данные не найдены для', selectedConnection, 'толщина', selectedThickness);
    }
  });
});

// Функция показа/скрытия параметров по типу соединения
function updateParameterVisibility(connectionType) {
  const advancedParams = document.getElementById('advancedParams');
  
  // Показываем diameter для трубных соединений (если есть в названии)
  const diameterInput = document.getElementById('diameter');
  const diameterLabel = diameterInput?.parentElement?.querySelector('label');
  
  // Все поля по умолчанию видимы
  const allInputs = document.querySelectorAll('#parameterInputs input');
  allInputs.forEach(input => {
    input.style.display = 'block';
    const label = input.parentElement?.querySelector('label');
    if (label) label.style.display = 'block';
  });
  
  // Скрываем advanced по умолчанию
  if (advancedParams) {
    advancedParams.style.display = 'none';
  }
  
  // Специфичная логика по типам
  // Будет расширена позже
}
