const questions = [
  {
    text: "Что лучше всего описывает предметную область?",
    options: [
      "Часть деятельности, которую изучают",
      "Описание структуры будущей БД",
      "Список требований к программе",
      "Набор таблиц и связей между ними"
    ],
    correct: 0,
    explanation: "Предметная область — это часть реальной деятельности, которую изучают перед проектированием системы."
  },
  {
    text: "Что является результатом анализа предметной области?",
    options: [
      "Понимание процессов, данных и проблем",
      "Готовая физическая структура таблиц",
      "Полностью написанная программа",
      "Набор тестов для проверки кода"
    ],
    correct: 0,
    explanation: "Анализ нужен, чтобы понять процессы, данные и проблемы до проектирования БД."
  },
  {
    text: "Какой пример лучше показывает проблемную зону?",
    options: [
      "Остатки товара часто не совпадают",
      "У товара есть название и цена",
      "Заказ связан с покупателем",
      "Отчет содержит несколько полей"
    ],
    correct: 0,
    explanation: "Проблемная зона — это место, где в процессе возникают ошибки, потери времени или расхождения."
  },
  {
    text: "Когда аналитику нужно задать уточняющий вопрос?",
    options: [
      "Когда в требовании есть неясный термин",
      "Когда требование уже согласовано",
      "Когда все поля формы перечислены",
      "Когда процесс описан по шагам"
    ],
    correct: 0,
    explanation:
      "Если термин или правило можно понять по-разному, его нужно уточнить у заказчика до проектирования."
  },
  {
    text: "Какой вариант точнее описывает базу данных?",
    options: [
      "Хранилище связанных сведений",
      "Модель будущих бизнес-процессов",
      "Описание требований заказчика",
      "Схема экранов приложения"
    ],
    correct: 0,
    explanation: "База данных хранит связанные сведения и позволяет быстро их получать."
  },
  {
    text: "Что дает централизованное хранение данных?",
    options: [
      "Меньше расхождений между данными",
      "Меньше сущностей в предметной области",
      "Меньше требований к системе",
      "Меньше связей между объектами"
    ],
    correct: 0,
    explanation: "Ценность БД в хранении, поиске и обновлении данных без лишнего дублирования."
  },
  {
    text: "Что в тексте требований обычно становится сущностью?",
    options: [
      "Тип объектов с общими свойствами",
      "Любое отдельное слово из текста",
      "Каждое действие пользователя",
      "Любой пункт технического задания"
    ],
    correct: 0,
    explanation: "Объект — это то, что нужно описать и о чем собирают сведения."
  },
  {
    text: "Что является простым свойством заказа?",
    options: [
      "Дата оформления",
      "Покупатель заказа",
      "Позиция заказа",
      "Сотрудник склада"
    ],
    correct: 0,
    explanation:
      "Дата оформления — простое свойство заказа. Покупатель, позиция заказа и сотрудник чаще становятся отдельными сущностями или связями."
  },
  {
    text: "Где показана сущность и ее атрибут?",
    options: [
      "Клиент и номер телефона",
      "Клиент и заказ",
      "Заказ и товар",
      "Оплата и доставка"
    ],
    correct: 0,
    explanation: "Клиент — это сущность, а номер телефона — ее свойство, то есть атрибут."
  },
  {
    text: "Что важно сделать на этапе анализа требований?",
    options: [
      "Уточнить цели, правила и ограничения",
      "Сразу создать все таблицы в БД",
      "Сразу написать интерфейс системы",
      "Сразу настроить сервер приложения"
    ],
    correct: 0,
    explanation: "На анализе сначала уточняют цели, правила и ограничения, а уже потом переходят к проектированию."
  }
];

const bonusCase = {
  title: "Бонусный мини-кейс",
  description: "Выдели сущности и их атрибуты по короткому описанию.",
  scenario:
    "Клиент оформляет заказ в интернет-магазине. В заказе указывается дата оформления, статус заказа и адрес доставки. В заказ добавляются товары: для каждого товара известны название, цена и количество.",
  explanation:
    "В простой учебной модели товар можно описать названием, ценой и количеством. В более точной модели количество обычно относится не к товару, а к позиции заказа.",
  blocks: [
    {
      question: "Какие сущности можно выделить?",
      options: ["Клиент", "Заказ", "Товар", "Дата оформления", "Статус заказа", "Цена"],
      correctIndexes: [0, 1, 2]
    },
    {
      question: "Какие атрибуты относятся к заказу?",
      options: [
        "Дата оформления",
        "Статус заказа",
        "Адрес доставки",
        "Название товара",
        "Цена товара",
        "Количество товара"
      ],
      correctIndexes: [0, 1, 2]
    },
    {
      question: "Какие данные относятся к товару в простой учебной модели?",
      options: [
        "Название товара",
        "Цена товара",
        "Количество товара",
        "Дата оформления",
        "Статус заказа",
        "Адрес доставки"
      ],
      correctIndexes: [0, 1, 2]
    }
  ]
};

const questionsContainer = document.getElementById("questions");
const quizForm = document.getElementById("quiz-form");
const answeredCount = document.getElementById("answered-count");
const progressFill = document.getElementById("progress-fill");
const resultPanel = document.getElementById("result-panel");
const resultScore = document.getElementById("result-score");
const resultGrade = document.getElementById("result-grade");
const resultPercent = document.getElementById("result-percent");
const correctCount = document.getElementById("correct-count");
const answeredSummary = document.getElementById("answered-summary");
const missedCount = document.getElementById("missed-count");
const bonusCaseContainer = document.getElementById("bonus-case");
const bonusResult = document.getElementById("bonus-result");
const reviewList = document.getElementById("review-list");
const resetButton = document.getElementById("reset-button");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

function shuffleArray(values) {
  const items = values.slice();

  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }

  return items;
}

function renderOptionList(options, inputName, inputType, cardClass = "") {
  return shuffleArray(options.map((_, optionIndex) => optionIndex))
    .map(
      (optionIndex) => `
        <label class="option">
          <input type="${inputType}" name="${inputName}" value="${optionIndex}">
          <span class="option-card${cardClass ? ` ${cardClass}` : ""}">
            <span class="option-marker" aria-hidden="true"></span>
            <span class="option-text">${escapeHtml(options[optionIndex])}</span>
          </span>
        </label>
      `
    )
    .join("");
}

function renderQuestions() {
  questionsContainer.innerHTML = questions
    .map(
      (question, index) => `
        <fieldset class="question-card">
          <legend>Вопрос ${index + 1}. ${escapeHtml(question.text)}</legend>
          <div class="option-list">
            ${renderOptionList(question.options, `q${index}`, "radio")}
          </div>
        </fieldset>
      `
    )
    .join("");
}

function renderBonusCase() {
  bonusCaseContainer.innerHTML = `
    <div class="bonus-case__head">
      <div>
        <p class="eyebrow">Бонус</p>
        <h2 id="bonus-case-title">${escapeHtml(bonusCase.title)}</h2>
        <p class="bonus-case__description">${escapeHtml(bonusCase.description)}</p>
      </div>
      <span class="bonus-case__summary">3 дополнительных задания</span>
    </div>
    <div class="bonus-case__scenario">
      <span>Сценарий</span>
      <p>${escapeHtml(bonusCase.scenario)}</p>
    </div>
    <div class="bonus-case__blocks">
      ${bonusCase.blocks
        .map(
          (block, index) => `
            <fieldset class="question-card bonus-block">
              <legend>Блок ${index + 1}. ${escapeHtml(block.question)}</legend>
              <p class="bonus-block__hint">Выбери все подходящие варианты.</p>
              <div class="option-list option-list--checkbox">
                ${renderOptionList(block.options, `bonus${index}`, "checkbox", "option-card--checkbox")}
              </div>
            </fieldset>
          `
        )
        .join("")}
    </div>
  `;
}

function getAnsweredCount() {
  const formData = new FormData(quizForm);
  return questions.reduce((count, _, index) => (formData.get(`q${index}`) === null ? count : count + 1), 0);
}

function updateProgress() {
  const answered = getAnsweredCount();
  answeredCount.textContent = `${answered} из ${questions.length}`;
  progressFill.style.width = `${(answered / questions.length) * 100}%`;
}

function getGradeLabel(percent) {
  if (percent >= 90) {
    return "Оценка: отлично";
  }

  if (percent >= 70) {
    return "Оценка: хорошо";
  }

  if (percent >= 50) {
    return "Оценка: нужно повторить тему";
  }

  return "Оценка: стоит вернуться к материалу";
}

function renderReview(selectedAnswers) {
  reviewList.innerHTML = selectedAnswers
    .map(({ question, selectedIndex, isCorrect }, index) => {
      const selectedLabel =
        selectedIndex === null ? "Нет ответа" : question.options[selectedIndex];
      const correctLabel = question.options[question.correct];
      const explanation = question.explanation || "";
      const statusClass = isCorrect
        ? "review-status--correct"
        : selectedIndex === null
          ? "review-status--blank"
          : "review-status--wrong";
      const statusLabel = isCorrect ? "Верно" : selectedIndex === null ? "Без ответа" : "Ошибка";

      return `
        <article class="review-item ${isCorrect ? "review-item--correct" : "review-item--wrong"}">
          <div class="review-head">
            <div>
              <p class="review-kicker">Вопрос ${index + 1}</p>
              <h3>${escapeHtml(question.text)}</h3>
            </div>
            <span class="review-status ${statusClass}">${statusLabel}</span>
          </div>
          <div class="review-answer">
            <span>Ваш ответ</span>
            <strong>${escapeHtml(selectedLabel)}</strong>
          </div>
          <div class="review-answer review-answer--correct">
            <span>Правильный ответ</span>
            <strong>${escapeHtml(correctLabel)}</strong>
          </div>
          ${
            explanation
              ? `
                <div class="review-explanation">
                  <span>Пояснение</span>
                  <p>${escapeHtml(explanation)}</p>
                </div>
              `
              : ""
          }
        </article>
      `;
    })
    .join("");
}

function getSelectedIndexes(formData, name) {
  return formData
    .getAll(name)
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value));
}

function normalizeIndexes(values) {
  return values.slice().sort((left, right) => left - right);
}

function arraysEqual(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((value, index) => value === right[index]);
}

function renderBonusChips(labels, modifierClass = "") {
  if (!labels.length) {
    return '<span class="bonus-chip bonus-chip--muted">Нет ответа</span>';
  }

  return labels
    .map((label) => `<span class="bonus-chip${modifierClass ? ` ${modifierClass}` : ""}">${escapeHtml(label)}</span>`)
    .join("");
}

function renderBonusResult(formData) {
  const blockResults = bonusCase.blocks.map((block, index) => {
    const selectedIndexes = normalizeIndexes(getSelectedIndexes(formData, `bonus${index}`));
    const selectedLabels = selectedIndexes.map((optionIndex) => block.options[optionIndex]);
    const correctLabels = block.correctIndexes.map((optionIndex) => block.options[optionIndex]);
    const isCorrect = arraysEqual(selectedIndexes, block.correctIndexes);

    return {
      block,
      selectedIndexes,
      selectedLabels,
      correctLabels,
      isCorrect
    };
  });

  const correctBlocks = blockResults.filter((result) => result.isCorrect).length;
  const answeredBlocks = blockResults.filter((result) => result.selectedIndexes.length > 0).length;
  const missedBlocks = blockResults.length - answeredBlocks;

  bonusResult.innerHTML = `
    <div class="bonus-result__head">
      <div>
        <p class="eyebrow">Бонусный мини-кейс</p>
        <h3 id="bonus-result-title">${escapeHtml(bonusCase.title)}</h3>
        <p class="bonus-result__summary">Отдельный результат по бонусу. Он не влияет на счетчик 10 основных вопросов.</p>
      </div>
      <div class="bonus-score">
        <strong>${correctBlocks} из ${blockResults.length}</strong>
        <span>верных заданий</span>
      </div>
    </div>
    <div class="bonus-result__stats">
      <div class="stat">
        <strong>${correctBlocks}</strong>
        <span>верных</span>
      </div>
      <div class="stat">
        <strong>${answeredBlocks}</strong>
        <span>с ответом</span>
      </div>
      <div class="stat">
        <strong>${missedBlocks}</strong>
        <span>без ответа</span>
      </div>
    </div>
    <div class="bonus-review-list">
      ${blockResults
        .map((result, index) => {
          const statusClass = result.isCorrect
            ? "review-status--correct"
            : result.selectedIndexes.length === 0
              ? "review-status--blank"
              : "review-status--wrong";
          const statusLabel = result.isCorrect
            ? "Верно"
            : result.selectedIndexes.length === 0
              ? "Без ответа"
              : "Ошибка";

          return `
            <article class="bonus-review-item ${result.isCorrect ? "bonus-review-item--correct" : "bonus-review-item--wrong"}">
              <div class="review-head">
                <div>
                  <p class="review-kicker">Блок ${index + 1}</p>
                  <h4>${escapeHtml(result.block.question)}</h4>
                </div>
                <span class="review-status ${statusClass}">${statusLabel}</span>
              </div>
              <div class="bonus-answer-group">
                <span>Ваши ответы</span>
                <div class="bonus-answer-chips">
                  ${renderBonusChips(result.selectedLabels)}
                </div>
              </div>
              <div class="bonus-answer-group bonus-answer-group--correct">
                <span>Правильные ответы</span>
                <div class="bonus-answer-chips">
                  ${renderBonusChips(result.correctLabels, "bonus-chip--correct")}
                </div>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
    <div class="bonus-result__explanation">
      <span>Пояснение</span>
      <p>${escapeHtml(bonusCase.explanation)}</p>
    </div>
  `;
}

function showResults() {
  const formData = new FormData(quizForm);
  const selectedAnswers = questions.map((question, index) => {
    const rawValue = formData.get(`q${index}`);
    const selectedIndex = rawValue === null ? null : Number(rawValue);
    return {
      question,
      selectedIndex,
      isCorrect: selectedIndex === question.correct
    };
  });

  const correctAnswers = selectedAnswers.filter((answer) => answer.isCorrect).length;
  const answered = selectedAnswers.filter((answer) => answer.selectedIndex !== null).length;
  const missed = questions.length - answered;
  const percent = Math.round((correctAnswers / questions.length) * 100);

  resultScore.textContent = `${correctAnswers} из ${questions.length}`;
  resultPercent.textContent = `${percent}%`;
  resultGrade.textContent = getGradeLabel(percent);
  correctCount.textContent = String(correctAnswers);
  answeredSummary.textContent = String(answered);
  missedCount.textContent = String(missed);

  renderReview(selectedAnswers);
  renderBonusResult(formData);
  resultPanel.hidden = false;
  resultPanel.classList.add("is-visible");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

renderQuestions();
renderBonusCase();
updateProgress();

quizForm.addEventListener("change", updateProgress);
quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showResults();
});

resetButton.addEventListener("click", () => {
  quizForm.reset();
  renderQuestions();
  renderBonusCase();
  updateProgress();
  reviewList.innerHTML = "";
  bonusResult.innerHTML = "";
  resultPanel.hidden = true;
  resultPanel.classList.remove("is-visible");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
