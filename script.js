const PASSWORD = "";

const passwordScreen = document.getElementById("passwordScreen");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

// ========================================
// ПАРОЛЬ
// ========================================

if (passwordForm) {
  passwordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (passwordInput.value === PASSWORD) {

      passwordScreen.classList.add("hide");

      // Запускаем музыку после ввода пароля
      const music = document.getElementById("music");

      if (music) {
        try {
          music.volume = 0.01;
          await music.play();

          const musicBtn = document.getElementById("musicBtn");
          const musicLabel = document.getElementById("musicLabel");

          if (musicBtn) musicBtn.textContent = "Ⅱ";
          if (musicLabel) musicLabel.textContent = "музыка играет";

        } catch (error) {
          console.log(
            "Не удалось автоматически запустить музыку:",
            error
          );
        }
      }

      setTimeout(() => passwordInput.blur(), 500);

    } else {

      passwordError.classList.add("show");
      passwordInput.classList.remove("shake");

      void passwordInput.offsetWidth;

      passwordInput.classList.add("shake");
      passwordInput.value = "";
      passwordInput.focus();
    }
  });
}


// ========================================
// НАСТРОЙКИ
// ========================================

const CONFIG = {
  name: "Пупс",
  birthday: "Сегодня твой день ❤️",
  musicStartAutomatically: true
};

document
  .querySelectorAll("[data-name]")
  .forEach(el => {
    el.textContent = CONFIG.name;
  });


// ========================================
// СЕРДЕЧКИ
// ========================================

const hearts = document.getElementById("hearts");

function spawnHeart() {

  if (!hearts) return;

  const h = document.createElement("div");

  h.className = "heart";

  h.style.left = Math.random() * 100 + "%";

  h.style.setProperty(
    "--s",
    (10 + Math.random() * 18) + "px"
  );

  h.style.animationDuration =
    (6 + Math.random() * 7) + "s";

  hearts.appendChild(h);

  setTimeout(() => h.remove(), 14000);
}

if (hearts) {
  setInterval(spawnHeart, 900);
}


// ========================================
// ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ
// ========================================

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(e => {

      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));


// ========================================
// КНОПКА НАЧАЛА
// ========================================

// В HTML сейчас beginBtn отсутствует,
// поэтому обязательно проверяем его наличие.

const beginBtn = document.getElementById("beginBtn");

if (beginBtn) {

  beginBtn.addEventListener("click", () => {

    const story = document.querySelector(".story-section");

    if (story) {
      story.scrollIntoView({
        behavior: "smooth"
      });
    }

    if (CONFIG.musicStartAutomatically) {

      const musicBtn =
        document.getElementById("musicBtn");

      if (musicBtn) {
        musicBtn.click();
      }

    }

  });

}


// ========================================
// МУЗЫКА
// ========================================

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

if (music) {
  music.volume = 0.01;
}

if (musicBtn && music) {

  musicBtn.addEventListener("click", async () => {

    if (music.paused) {

      try {

        await music.play();

        musicBtn.textContent = "Ⅱ";

        if (musicLabel) {
          musicLabel.textContent = "музыка играет";
        }

      } catch {

        if (musicLabel) {
          musicLabel.textContent =
            "добавь music.mp3";
        }

      }

    } else {

      music.pause();

      musicBtn.textContent = "♫";

      if (musicLabel) {
        musicLabel.textContent =
          "включить музыку";
      }

    }

  });

}


// ========================================
// СЛУЧАЙНЫЕ ТЕЛЕГРАМ-КРУЖОЧКИ
// ========================================

const telegramCircles = [
  "assets/circles/video3.mp4",
  "assets/circles/video4.mp4",
  "assets/circles/video5.mp4",
  "assets/circles/video6.mp4",
  "assets/circles/video7.mp4",
  "assets/circles/video8.mp4",
  "assets/circles/video9.mp4",
  "assets/circles/video10.mp4",
  "assets/circles/video11.mp4",
  "assets/circles/video12.mp4",
  "assets/circles/video13.mp4",
  "assets/circles/video14.mp4",
  "assets/circles/video15.mp4",
  "assets/circles/video16.mp4",
  "assets/circles/video17.mp4",
  "assets/circles/video18.mp4",
  "assets/circles/video19.mp4"
];

const telegramCircleBtn = document.getElementById("telegramCircleBtn");
const telegramCircleVideo = document.getElementById("telegramCircleVideo");
const telegramCirclePlaceholder = document.getElementById("telegramCirclePlaceholder");
const telegramCircleNumber = document.getElementById("telegramCircleNumber");

let lastTelegramCircle = -1;
let musicWasPlayingBeforeCircle = false;

function setMusicUiPlaying() {
  if (musicBtn) musicBtn.textContent = "Ⅱ";
  if (musicLabel) musicLabel.textContent = "музыка играет";
}

function setMusicUiPaused() {
  if (musicBtn) musicBtn.textContent = "♫";
  if (musicLabel) musicLabel.textContent = "включить музыку";
}

function resumeMusicAfterCircle() {
  if (!music || !musicWasPlayingBeforeCircle) return;

  music.play()
    .then(() => setMusicUiPlaying())
    .catch(() => {});

  musicWasPlayingBeforeCircle = false;
}

function playRandomTelegramCircle() {
  if (!telegramCircleVideo || telegramCircles.length === 0) return;

  let randomIndex;

  if (telegramCircles.length === 1) {
    randomIndex = 0;
  } else {
    do {
      randomIndex = Math.floor(Math.random() * telegramCircles.length);
    } while (randomIndex === lastTelegramCircle);
  }

  lastTelegramCircle = randomIndex;

  // Запоминаем состояние музыки до кружочка.
  musicWasPlayingBeforeCircle = !!(music && !music.paused);

  if (musicWasPlayingBeforeCircle) {
    music.pause();
    setMusicUiPaused();
  }

  const src = telegramCircles[randomIndex];

  telegramCircleVideo.pause();
  telegramCircleVideo.removeAttribute("src");
  telegramCircleVideo.load();
  telegramCircleVideo.src = src;

  // Кружочки тише фоновой музыки.
  telegramCircleVideo.volume = 0.10;
  telegramCircleVideo.muted = false;
  telegramCircleVideo.load();

  telegramCircleVideo.onloadeddata = async () => {
    telegramCirclePlaceholder?.style.setProperty("display", "none");

    if (telegramCircleNumber) {
      telegramCircleNumber.textContent = `кружочек #${randomIndex + 1}`;
    }

    telegramCircleVideo.volume = 0.20;
    telegramCircleVideo.muted = false;

    try {
      await telegramCircleVideo.play();
    } catch (error) {
      console.log("Не удалось запустить кружочек:", error);
      resumeMusicAfterCircle();
    }
  };
}

if (telegramCircleVideo) {
  telegramCircleVideo.addEventListener("ended", () => {
    resumeMusicAfterCircle();
  });

  telegramCircleVideo.addEventListener("error", () => {
    resumeMusicAfterCircle();

    if (telegramCircleNumber) {
      telegramCircleNumber.textContent = "Не удалось открыть этот кружочек";
    }
  });
}

telegramCircleBtn?.addEventListener("click", playRandomTelegramCircle);

// ========================================
// ФОТО
// ========================================

document
  .querySelectorAll(".photo-card")
  .forEach(card => {

    card.addEventListener("click", () => {

      const modal = document.getElementById("modal");
      const modalImg = document.getElementById("modalImg");

      if (!modal || !modalImg) return;

      // Видео не открываем через фото-модалку
      if (card.dataset.type === "video") return;

      modalImg.src = card.dataset.src;

      modal.classList.add("open");

    });

  });


// ========================================
// ЗАКРЫТИЕ МОДАЛКИ
// ========================================

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");

if (modalClose && modal) {

  modalClose.onclick = () => {
    modal.classList.remove("open");
  };

}

if (modal) {

  modal.onclick = e => {

    if (e.target.id === "modal") {
      modal.classList.remove("open");
    }

  };

}


// ========================================
// СВЕЧИ
// ========================================

let blown = 0;

document
  .querySelectorAll(".flame")
  .forEach(f => {

    f.addEventListener("click", () => {

      if (f.classList.contains("off")) return;

      f.classList.add("off");

      blown++;

      if (blown === 3) {

        confetti();

        const finalBtn =
          document.getElementById("finalBtn");

        if (finalBtn) {
          finalBtn.classList.remove("hidden");
        }

      }

    });

  });


// ========================================
// ФИНАЛЬНАЯ КНОПКА
// ========================================

const finalBtn = document.getElementById("finalBtn");

if (finalBtn) {

  finalBtn.addEventListener("click", () => {

    const final =
      document.getElementById("final");

    if (final) {

      final.scrollIntoView({
        behavior: "smooth"
      });

    }

    setTimeout(confetti, 500);

  });

}


// ========================================
// КНОПКА "СНОВА"
// ========================================

// Сейчас такой кнопки в HTML нет.
// Поэтому код больше не ломает сайт.

const againBtn = document.getElementById("againBtn");

if (againBtn) {

  againBtn.addEventListener("click", () => {
    location.reload();
  });

}


// ========================================
// КОНФЕТТИ
// ========================================

function confetti() {

  const box =
    document.getElementById("confetti");

  if (!box) return;

  for (let i = 0; i < 100; i++) {

    const p =
      document.createElement("i");

    p.className = "piece";

    p.style.left =
      Math.random() * 100 + "%";

    p.style.background = [
      "#ff6f9e",
      "#ffd166",
      "#fff",
      "#b8a1ff",
      "#8de5c1"
    ][
      Math.floor(Math.random() * 5)
    ];

    p.style.animationDelay =
      Math.random() * 0.7 + "s";

    p.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    box.appendChild(p);

    setTimeout(
      () => p.remove(),
      3500
    );

  }

}


// ========================================
// ❤️ ТАЙМЕР ВОСПОМИНАНИЙ
// ========================================

// 25 января 2026 года, 21:17
const relationshipStart =
  new Date(2026, 0, 25, 21, 17, 0);

const yearsEl =
  document.getElementById("years");

const daysEl =
  document.getElementById("days");

const hoursEl =
  document.getElementById("hours");

const minutesEl =
  document.getElementById("minutes");

const secondsEl =
  document.getElementById("seconds");


function updateMemoryTimer() {

  // Проверяем элементы
  if (
    !yearsEl ||
    !daysEl ||
    !hoursEl ||
    !minutesEl ||
    !secondsEl
  ) {
    console.error(
      "❌ Не найдены элементы таймера"
    );

    return;
  }

  const now = new Date();

  let years =
    now.getFullYear() -
    relationshipStart.getFullYear();

  // Дата годовщины в текущем году
  const anniversary =
    new Date(
      now.getFullYear(),
      relationshipStart.getMonth(),
      relationshipStart.getDate(),
      relationshipStart.getHours(),
      relationshipStart.getMinutes(),
      relationshipStart.getSeconds()
    );

  if (now < anniversary) {
    years--;
  }

  // Последняя годовщина
  const lastAnniversary =
    new Date(
      relationshipStart.getFullYear() + years,
      relationshipStart.getMonth(),
      relationshipStart.getDate(),
      relationshipStart.getHours(),
      relationshipStart.getMinutes(),
      relationshipStart.getSeconds()
    );

  let difference =
    now.getTime() -
    lastAnniversary.getTime();

  if (difference < 0) {
    difference = 0;
  }

  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );

  difference -=
    days *
    1000 *
    60 *
    60 *
    24;

  const hours =
    Math.floor(
      difference /
      (1000 * 60 * 60)
    );

  difference -=
    hours *
    1000 *
    60 *
    60;

  const minutes =
    Math.floor(
      difference /
      (1000 * 60)
    );

  difference -=
    minutes *
    1000 *
    60;

  const seconds =
    Math.floor(
      difference / 1000
    );

  yearsEl.textContent = years;
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}


// Запускаем таймер сразу
updateMemoryTimer();

// Обновляем каждую секунду
setInterval(
  updateMemoryTimer,
  1000
);

/* ========================================
💘 СЕКЦИЯ "ТЫ МЕНЯ ЛЮБИШЬ?"
======================================== */

const loveChoice = document.getElementById("loveChoice");
const loveBtn = document.getElementById("loveBtn");
const noLoveBtn = document.getElementById("noLoveBtn");
const noLoveMessage = document.getElementById("noLoveMessage");

let escapeCount = 0;
let lastEscape = 0;

const messages = [
"Эй! А ну вернись 😭",
"Не-не-не, даже не думай!",
"Ты точно хочешь это нажать? 👀",
"Кнопка против такого выбора 💀",
"Я не дам тебе выбрать этот вариант 😤",
"НЕТ. Такого варианта не существует ❤️"
];

function showEscapeMessage() {

if (!noLoveMessage) return;

const index = Math.min(
escapeCount - 1,
messages.length - 1
);

noLoveMessage.textContent = messages[index];

noLoveMessage.classList.add("show");

clearTimeout(window.escapeMessageTimer);

window.escapeMessageTimer = setTimeout(() => {
noLoveMessage.classList.remove("show");
}, 1600);
}

function escapeNoLoveButton(x, y) {

if (!noLoveBtn || !loveChoice) return;

const now = Date.now();

// Не дёргаем кнопку слишком часто
if (now - lastEscape < 250) return;

lastEscape = now;
escapeCount++;

showEscapeMessage();

noLoveBtn.classList.add("running");

const area = loveChoice.getBoundingClientRect();
const button = noLoveBtn.getBoundingClientRect();

const padding = 10;

const maxX =
area.width - button.width - padding;

const maxY =
area.height - button.height - padding;

// Текущая позиция
const currentX =
button.left - area.left;

const currentY =
button.top - area.top;

let bestX = currentX;
let bestY = currentY;
let bestScore = -Infinity;

// Генерируем несколько вариантов
for (let i = 0; i < 35; i++) {
	

const candidateX =
  padding +
  Math.random() *
  Math.max(1, maxX - padding);

const candidateY =
  padding +
  Math.random() *
  Math.max(1, maxY - padding);

const centerX =
  area.left +
  candidateX +
  button.width / 2;

const centerY =
  area.top +
  candidateY +
  button.height / 2;

// Расстояние до курсора
const distanceToMouse =
  Math.hypot(
    centerX - x,
    centerY - y
  );

// Расстояние от текущего положения
const movement =
  Math.hypot(
    candidateX - currentX,
    candidateY - currentY
  );

// Чем дальше от курсора — тем лучше
const score =
  distanceToMouse * 1.5 +
  movement * 0.35;

if (score > bestScore) {

  bestScore = score;
  bestX = candidateX;
  bestY = candidateY;

}

}

// Ограничиваем максимальный прыжок
const maxJump =
escapeCount < 3
? 100
: escapeCount < 6
? 160
: 230;

const dx = bestX - currentX;
const dy = bestY - currentY;

const distance =
Math.hypot(dx, dy);

if (distance > maxJump) {


const ratio = maxJump / distance;

bestX =
  currentX + dx * ratio;

bestY =
  currentY + dy * ratio;


}

// Не позволяем выйти за пределы области
bestX = Math.max(
padding,
Math.min(maxX, bestX)
);

bestY = Math.max(
padding,
Math.min(maxY, bestY)
);

noLoveBtn.style.left =
`${bestX}px`;

noLoveBtn.style.top =
`${bestY}px`;

// Маленькая реакция
noLoveBtn.classList.remove("shake");

void noLoveBtn.offsetWidth;

noLoveBtn.classList.add("shake");

}

/* Наведение мыши */

if (noLoveBtn) {

document.addEventListener("mousemove", e => {
	

const rect =
  noLoveBtn.getBoundingClientRect();

const centerX =
  rect.left + rect.width / 2;

const centerY =
  rect.top + rect.height / 2;

const distance =
  Math.hypot(
    e.clientX - centerX,
    e.clientY - centerY
  );

// Чем больше попыток —
// тем раньше кнопка начинает убегать
const dangerZone =
  Math.max(
    55,
    125 - escapeCount * 7
  );

if (distance < dangerZone) {

  escapeNoLoveButton(
    e.clientX,
    e.clientY
  );

}


});

/* Если всё-таки поймали */

noLoveBtn.addEventListener("click", e => {


e.preventDefault();

escapeNoLoveButton(
  e.clientX,
  e.clientY
);


});

/* Телефон */

noLoveBtn.addEventListener(
"touchstart",
e => {

  e.preventDefault();

  const touch = e.touches[0];

  escapeNoLoveButton(
    touch.clientX,
    touch.clientY
  );

},
{ passive: false }

);

}

/* Правильный ответ ❤️ */

if (loveBtn) {

loveBtn.addEventListener("click", () => {


if (noLoveMessage) {

  noLoveMessage.textContent =
    "Я так и знал ❤️";

  noLoveMessage.classList.add("show");

}

if (typeof confetti === "function") {
  confetti();
}


});

}

/* ==================================================
   ОБНИМАШКА
================================================== */

const hugBtn =
  document.getElementById("hugBtn");

const hugScreen =
  document.getElementById("hugScreen");

const hugProgressBox =
  document.getElementById("hugProgressBox");

const hugProgressFill =
  document.getElementById("hugProgressFill");

const hugProgressText =
  document.getElementById("hugProgressText");

const hugStatus =
  document.getElementById("hugStatus");

const hugHeartContainer =
  document.getElementById("hugHeartContainer");


let hugRunning = false;


/* ==================================================
   СЕРДЕЧКО
================================================== */

function createHugHeart() {

  if (!hugHeartContainer) return;

  const heart =
    document.createElement("div");

  heart.className =
    "hug-floating-heart";

  const hearts = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💓",
    "💞",
    "🩷"
  ];

  heart.textContent =
    hearts[
      Math.floor(
        Math.random() * hearts.length
      )
    ];

  heart.style.left =
    Math.random() * 100 + "%";

  heart.style.fontSize =
    (18 + Math.random() * 30) + "px";

  heart.style.animationDuration =
    (3 + Math.random() * 2) + "s";

  hugHeartContainer.appendChild(
    heart
  );


  setTimeout(() => {

    heart.remove();

  }, 5500);

}


/* ==================================================
   НАЖАТИЕ НА КНОПКУ
================================================== */

hugBtn?.addEventListener(
  "click",
  () => {

    if (hugRunning) return;

    hugRunning = true;


    /* Показываем прогресс */

    hugProgressBox?.classList.add(
      "active"
    );


    /* Меняем текст кнопки */

    hugBtn.textContent =
      "🫂 Обнимаю тебя...";

    hugBtn.disabled = true;


    /* ==================================================
       ЗАПУСК ПОЛНОЭКРАННОЙ АНИМАЦИИ
    ================================================== */

    hugScreen?.classList.remove(
      "active"
    );

    /*
       Небольшой reflow.
       Благодаря этому CSS animation
       гарантированно запускается каждый раз.
    */

    void hugScreen?.offsetWidth;

    hugScreen?.classList.add(
      "active"
    );


    /* ==================================================
       ТАЙМЕР 5 СЕКУНД
    ================================================== */

    const startTime =
      performance.now();

    const duration =
      5000;


    /* Сердечки */

    const heartInterval =
      setInterval(
        createHugHeart,
        120
      );


    /* ==================================================
       ПРОГРЕСС
    ================================================== */

    function updateProgress(now) {

      const elapsed =
        now - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      const percent =
        Math.floor(
          progress * 100
        );


      if (hugProgressFill) {

        hugProgressFill.style.width =
          percent + "%";

      }


      if (hugProgressText) {

        const blocks =
          Math.floor(
            percent / 10
          );

        hugProgressText.textContent =
          "█".repeat(blocks) +
          "░".repeat(10 - blocks) +
          " " +
          percent +
          "%";

      }


      /* Текст во время обнимашки */

      if (hugStatus) {

        if (percent < 40) {

          hugStatus.textContent =
            "Обнимаю тебя... 🫂";

        } else if (percent < 80) {

          hugStatus.textContent =
            "Крепко-крепко держу ❤️";

        } else {

          hugStatus.textContent =
            "Ещё чуть-чуть... 💕";

        }

      }


      if (progress < 1) {

        requestAnimationFrame(
          updateProgress
        );

      } else {

        /* ==================================================
           5 СЕКУНД ПРОШЛО
        ================================================== */

        clearInterval(
          heartInterval
        );


        if (hugProgressFill) {

          hugProgressFill.style.width =
            "100%";

        }


        if (hugProgressText) {

          hugProgressText.textContent =
            "██████████ 100%";

        }


        if (hugStatus) {

          hugStatus.textContent =
            "Обнимашка получена ❤️";

        }


        hugBtn.textContent =
          "❤️ Обнимашка получена";


        /*
           Даём последним сердечкам
           немного долететь
        */

        setTimeout(() => {

          /*
             Полностью убираем
             полноэкранный эффект
          */

          hugScreen?.classList.remove(
            "active"
          );


          /*
             Возвращаем кнопку
          */

          hugBtn.textContent =
            "🫂 Получить обнимашку";

          hugBtn.disabled =
            false;


          /*
             Убираем прогресс
          */

          hugProgressBox?.classList.remove(
            "active"
          );


          /*
             Очищаем сердечки
          */

          if (hugHeartContainer) {

            hugHeartContainer.innerHTML =
              "";

          }


          /*
             Сбрасываем прогресс
          */

          if (hugProgressFill) {

            hugProgressFill.style.width =
              "0%";

          }

          if (hugProgressText) {

            hugProgressText.textContent =
              "0%";

          }


          hugRunning =
            false;

        }, 800);

      }

    }


    requestAnimationFrame(
      updateProgress
    );

  }
);
/* =========================
   PHOTO STORY REVEAL
========================= */

const photoStory =
  document.querySelector(".photo-story");

if (photoStory) {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.15
      }
    );

  observer.observe(photoStory);

}
