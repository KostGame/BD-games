const questions = [
  {
    text: "Что лучше всего описывает предметную область?",
    options: [
      "Фрагмент реальной деятельности",
      "Набор экранов будущей системы",
      "Список команд для разработчика",
      "Структура файлов приложения"
    ],
    correct: 0
  },
  {
    text: "Что обычно выясняют при анализе предметной области?",
    options: [
      "Какие процессы и данные важны",
      "Какие цвета будут в интерфейсе",
      "Какие кнопки стоят на форме",
      "Какие файлы лежат в проекте"
    ],
    correct: 0
  },
  {
    text: "Какой случай ближе всего к проблемной зоне?",
    options: [
      "Данные часто расходятся с фактами",
      "В отчете много разных столбцов",
      "В системе есть несколько ролей",
      "У заявки есть уникальный номер"
    ],
    correct: 0
  },
  {
    text: "Что чаще всего помогает найти причину проблемы?",
    options: [
      "Разбор процесса по шагам",
      "Выбор названия таблицы",
      "Подбор размера шрифта",
      "Создание новой папки"
    ],
    correct: 0
  },
  {
    text: "Какой вариант ближе всего к базе данных?",
    options: [
      "Упорядоченное хранилище сведений",
      "Набор страниц с описанием проекта",
      "Список задач для программиста",
      "Схема расположения экранов"
    ],
    correct: 0
  },
  {
    text: "Для чего чаще всего нужна база данных?",
    options: [
      "Хранить и быстро получать сведения",
      "Рисовать внешний вид приложения",
      "Заменять обсуждение требований",
      "Автоматически исправлять ошибки"
    ],
    correct: 0
  },
  {
    text: "Что в анализе текста обычно считают объектом?",
    options: [
      "То, о чем хранятся сведения",
      "Любое действие в предложении",
      "Любой признак оформления",
      "Любая ошибка в документе"
    ],
    correct: 0
  },
  {
    text: "Что обычно становится атрибутом сущности?",
    options: [
      "Свойство, нужное для учета",
      "Раздел пользовательского меню",
      "Отдельный экран приложения",
      "Команда запуска программы"
    ],
    correct: 0
  },
  {
    text: "Какой пример похож на сущность и ее атрибут?",
    options: [
      "Клиент и номер телефона",
      "Проверить и сохранить",
      "Быстро и регулярно",
      "Ошибка и исправление"
    ],
    correct: 0
  },
  {
    text: "Что делают на этапе анализа требований?",
    options: [
      "Уточняют цели и ограничения",
      "Публикуют готовую систему",
      "Исправляют найденные баги",
      "Настраивают рабочий сервер"
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
  renderQuestions();
  updateProgress();
  reviewList.innerHTML = "";
  resultPanel.hidden = true;
  resultPanel.classList.remove("is-visible");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
