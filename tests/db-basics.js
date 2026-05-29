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
    text: "Зачем используют метод «5 Почему»?",
    options: [
      "Чтобы найти первопричину проблемы",
      "Чтобы описать сущности и связи",
      "Чтобы выбрать тип базы данных",
      "Чтобы составить список атрибутов"
    ],
    correct: 0,
    explanation: "Разбор по шагам помогает добраться до первопричины, а не остановиться на симптомах."
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
    text: "Что лучше считать атрибутом сущности «Заказ»?",
    options: [
      "Дата оформления заказа",
      "Клиент, который сделал заказ",
      "Товар, добавленный в заказ",
      "Менеджер, обработавший заказ"
    ],
    correct: 0,
    explanation: "Атрибут описывает сущность: например, дату, номер, статус или другое свойство."
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

function renderQuestions() {
  questionsContainer.innerHTML = questions
    .map(
      (question, index) => `
        <fieldset class="question-card">
          <legend>Вопрос ${index + 1}. ${escapeHtml(question.text)}</legend>
          <div class="option-list">
            ${shuffleArray(question.options.map((_, optionIndex) => optionIndex))
              .map(
                (optionIndex) => `
                  <label class="option">
                    <input type="radio" name="q${index}" value="${optionIndex}">
                    <span class="option-card">
                      <span class="option-marker" aria-hidden="true"></span>
                      <span class="option-text">${escapeHtml(question.options[optionIndex])}</span>
                    </span>
                  </label>
                `
              )
              .join("")}
          </div>
        </fieldset>
      `
    )
    .join("");
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
  resultPanel.hidden = false;
  resultPanel.classList.add("is-visible");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

renderQuestions();
updateProgress();

quizForm.addEventListener("change", updateProgress);
quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showResults();
});

resetButton.addEventListener("click", () => {
  quizForm.reset();
  renderQuestions();
  updateProgress();
  reviewList.innerHTML = "";
  resultPanel.hidden = true;
  resultPanel.classList.remove("is-visible");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
