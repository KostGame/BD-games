const questions = [
  {
    text: "Что такое предметная область?",
    options: [
      "Любая таблица в базе данных",
      "Часть реального мира, которую мы изучаем для создания системы",
      "Только список сотрудников организации",
      "Только программа, которую пишет разработчик"
    ],
    correct: 1
  },
  {
    text: "Зачем перед созданием БД анализировать предметную область?",
    options: [
      "Чтобы сразу начать писать код",
      "Чтобы понять процессы, данные и проблемы организации",
      "Чтобы выбрать цвет интерфейса",
      "Чтобы удалить лишние документы"
    ],
    correct: 1
  },
  {
    text: "Что такое проблемная зона?",
    options: [
      "Место, где стоит сервер",
      "Ошибка в названии таблицы",
      "Часть процесса, где есть трудности, ошибки или потери времени",
      "Любая кнопка в программе"
    ],
    correct: 2
  },
  {
    text: "Какой пример лучше всего подходит под проблемную зону?",
    options: [
      "У компании красивый логотип",
      "Заказы долго обрабатываются вручную",
      "В офисе есть стулья",
      "У товара есть название"
    ],
    correct: 1
  },
  {
    text: "Что такое база данных?",
    options: [
      "Систематизированное хранилище данных",
      "Обычный текстовый документ",
      "Картинка с таблицей",
      "Любая папка на рабочем столе"
    ],
    correct: 0
  },
  {
    text: "Какое преимущество дает база данных?",
    options: [
      "Усложняет поиск информации",
      "Позволяет хранить и быстро получать данные",
      "Запрещает создавать отчеты",
      "Полностью заменяет всех сотрудников"
    ],
    correct: 1
  },
  {
    text: "Что такое объект при анализе текста?",
    options: [
      "То, что можно выделить и описать в предметной области",
      "Только физический предмет",
      "Только строка в таблице",
      "Только пользователь программы"
    ],
    correct: 0
  },
  {
    text: "Что такое атрибут?",
    options: [
      "Название всей программы",
      "Свойство объекта или сущности",
      "Ошибка в процессе",
      "Вид базы данных"
    ],
    correct: 1
  },
  {
    text: "Какой вариант содержит объект и его атрибут?",
    options: [
      "Клиент, ФИО",
      "Быстро, медленно",
      "Ошибка, исправить",
      "Интернет, программа"
    ],
    correct: 0
  },
  {
    text: "Что происходит на этапе анализа в жизненном цикле программного продукта?",
    options: [
      "Сбор и систематизация требований",
      "Только написание кода",
      "Только установка программы пользователю",
      "Только тестирование кнопок"
    ],
    correct: 0
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

function renderQuestions() {
  questionsContainer.innerHTML = questions
    .map(
      (question, index) => `
        <fieldset class="question-card">
          <legend>Вопрос ${index + 1}. ${escapeHtml(question.text)}</legend>
          <div class="option-list">
            ${question.options
              .map(
                (option, optionIndex) => `
                  <label class="option">
                    <input type="radio" name="q${index}" value="${optionIndex}">
                    <span class="option-card">
                      <span class="option-marker" aria-hidden="true"></span>
                      <span class="option-text">${escapeHtml(option)}</span>
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
          ${
            isCorrect
              ? ""
              : `
                <div class="review-answer review-answer--correct">
                  <span>Правильный ответ</span>
                  <strong>${escapeHtml(correctLabel)}</strong>
                </div>
              `
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
  updateProgress();
  reviewList.innerHTML = "";
  resultPanel.hidden = true;
  resultPanel.classList.remove("is-visible");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
