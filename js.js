function randomPick(min, max, excluded) {
  let number = Math.random() * (max - min + 1) + min;

  while (number > excluded[0] && number < excluded[1]) {
    number = Math.random() * (max - min + 1) + min;
  }
  return number;
}

function random_power(chance) {
  let all_powers = [];
  document.querySelector(".power").style.top =
    Math.floor(
      randomPick(0.08 * window.innerHeight, 0.8 * window.innerHeight, [])
    ) + "px";
  document.querySelector(".power").style.left =
    Math.floor(
      randomPick(0.22 * window.innerWidth, 0.7 * window.innerWidth, [])
    ) + "px";

  Math.floor(chance) === 0
    ? all_powers.push(
        "slowDown",
        "speedUP",
        "decrease",
        "growUP",
        "reverse",
        "scaleUP",
        "scaleDown"
      )
    : Math.floor(chance) === 1 && all_powers.push("speedUP", "reverse");
  if (
    document.querySelector(".ball").clientHeight >=
    0.5 * window.innerHeight
  ) {
    all_powers.splice(all_powers.indexOf("growUP"), 1);
  }

  if (parseInt(document.querySelector(".ball").style.height) <= 10) {
    all_powers.splice(all_powers.indexOf("decrease"), 1);
  }

  all_powers.length > 0 &&
    document
      .querySelector(".power")
      .classList.add(all_powers[Math.floor(Math.random() * all_powers.length)]);
}

function moveBall(horizontal, vertical) {
  let paddle_1 = document.querySelector(".paddle_1"),
    paddle_2 = document.querySelector(".paddle_2"),
    paddle_1_coord = paddle_1.getBoundingClientRect(),
    paddle_2_coord = paddle_2.getBoundingClientRect(),
    ball = document.querySelector(".ball"),
    ball_coord = ball.getBoundingClientRect(),
    board_coord = document.querySelector(".board").getBoundingClientRect(),
    power = document.querySelector(".power"),
    power_coord = power.getBoundingClientRect();

  if (
    (ball_coord.top >= power_coord.top &&
      ball_coord.top <= power_coord.bottom) ||
    (ball_coord.bottom >= power_coord.top &&
      ball_coord.bottom <= power_coord.bottom)
  ) {
    if (
      (ball_coord.left >= power_coord.left &&
        ball_coord.left <= power_coord.right) ||
      (ball_coord.right >= power_coord.left &&
        ball_coord.right <= power_coord.right)
    ) {
      if (power.classList.contains("speedUP")) {
        vertical =
          vertical === Math.abs(vertical)
            ? Math.abs(vertical) + 0.05 * (20 - Math.abs(vertical))
            : -Math.abs(vertical) - 0.05 * (20 - Math.abs(vertical));
        horizontal =
          horizontal === Math.abs(horizontal)
            ? Math.abs(horizontal) + 0.05 * (20 - Math.abs(horizontal))
            : -Math.abs(horizontal) - 0.05 * (20 - Math.abs(horizontal));
        power.classList.remove("speedUP");
      }

      if (power.classList.contains("slowDown")) {
        vertical =
          vertical === Math.abs(vertical)
            ? 0.4 * Math.abs(vertical)
            : -0.4 * Math.abs(vertical);
        horizontal =
          horizontal === Math.abs(horizontal)
            ? 0.4 * Math.abs(horizontal)
            : -0.4 * Math.abs(horizontal);
        power.classList.remove("slowDown");
      }

      if (power.classList.contains("growUP")) {
        ball.style.height = ball.style.height
          ? 1.2 * parseInt(ball.style.height) + "px"
          : "50px";
        ball.style.width = ball.style.width
          ? 1.2 * parseInt(ball.style.width) + "px"
          : "50px";
        power.classList.remove("growUP");
      }

      if (power.classList.contains("decrease")) {
        ball.style.height = ball.style.height
          ? 0.8 * parseInt(ball.style.height) + "px"
          : "20px";
        ball.style.width = ball.style.width
          ? 0.8 * parseInt(ball.style.width) + "px"
          : "20px";
        power.classList.remove("decrease");
      }

      if (power.classList.contains("scaleUP")) {
        if (horizontal === Math.abs(horizontal)) {
          paddle_1.style.height = paddle_1.style.height
            ? 1.2 * parseInt(paddle_1.style.height) + "px"
            : "120px";
          paddle_1.style.width = paddle_1.style.width
            ? 1.2 * parseInt(paddle_1.style.width) + "px"
            : "22px";
          power.classList.remove("scaleUP");
        } else {
          paddle_2.style.height = paddle_2.style.height
            ? 1.2 * parseInt(paddle_2.style.height) + "px"
            : "120px";
          paddle_2.style.width = paddle_2.style.width
            ? 1.2 * parseInt(paddle_2.style.width) + "px"
            : "22px";
          power.classList.remove("scaleUP");
        }
      }

      if (power.classList.contains("scaleDown")) {
        if (horizontal === Math.abs(horizontal)) {
          paddle_2.style.height = paddle_2.style.height
            ? 0.8 * parseInt(paddle_2.style.height) + "px"
            : "80px";
          paddle_2.style.width = paddle_2.style.width
            ? 0.8 * parseInt(paddle_2.style.width) + "px"
            : "18px";
          power.classList.remove("scaleDown");
        } else {
          paddle_1.style.height = paddle_1.style.height
            ? 0.8 * parseInt(paddle_1.style.height) + "px"
            : "80px";
          paddle_1.style.width = paddle_1.style.width
            ? 0.8 * parseInt(paddle_1.style.width) + "px"
            : "18px";
          power.classList.remove("scaleDown");
        }
      }

      if (power.classList.contains("reverse")) {
        horizontal = -horizontal;
        power.classList.remove("reverse");
      }
    }
  }

  if (ball_coord.top <= board_coord.top) {
    vertical = Math.abs(vertical) + 0.001 * (20 - Math.abs(vertical));
  }

  if (ball_coord.bottom >= board_coord.bottom) {
    vertical = -Math.abs(vertical) - 0.001 * (20 - Math.abs(vertical));
  }

  if (
    ball_coord.left <= paddle_1_coord.right &&
    ball_coord.bottom >= paddle_1_coord.top &&
    ball_coord.top <= paddle_1_coord.bottom
  ) {
    horizontal = Math.abs(horizontal) + 0.005 * (20 - Math.abs(horizontal));
    power.classList.length === 1 && random_power(randomPick(0, 3, []));
  }

  if (
    ball_coord.right >= paddle_2_coord.left &&
    ball_coord.bottom >= paddle_2_coord.top &&
    ball_coord.top <= paddle_2_coord.bottom
  ) {
    horizontal = -Math.abs(horizontal) - 0.005 * (20 - Math.abs(horizontal));
    power.classList.length === 1 && random_power(randomPick(0, 3, []));
  }

  if (
    ball_coord.left <= board_coord.left ||
    ball_coord.right >= board_coord.right
  ) {
    if (ball_coord.left <= board_coord.left) {
      document.querySelector(".player_2_score").innerHTML = (
        parseInt(document.querySelector(".player_2_score").innerHTML) + 1
      ).toString();
    } else {
      document.querySelector(".player_1_score").innerHTML = (
        parseInt(document.querySelector(".player_1_score").innerHTML) + 1
      ).toString();
    }

    gameState = "stopped";
    power.className = "power";
    ball.style = document.querySelector(".ball").style;
    document.querySelector(".message").innerHTML = "Press Enter to Start";
    document.querySelector(".message").style.left = 38 + "vw";
    return;
  }

  horizontal = horizontal > 20 ? 20 : horizontal;
  horizontal = horizontal < -20 ? -20 : horizontal;
  vertical = vertical > 20 ? 20 : vertical;
  vertical = vertical < -20 ? -20 : vertical;
  ball.style.top = ball_coord.top + vertical + "px";
  ball.style.left = ball_coord.left + horizontal + "px";

  requestAnimationFrame(() => {
    moveBall(horizontal, vertical);
  });
}

function moveUpDown(paddle, direction) {
  let moveKey = 0,
    moveTime = 0,
    frames = 10,
    second = 50,
    fps = second / frames,
    x = parseInt(paddle.style.top);

  clearTimeout(moveTime);

  moveTime = setTimeout(function () {
    clearInterval(moveKey);
  }, second);

  clearInterval(moveKey);

  moveKey = setInterval(function () {
    if (
      (paddle.getBoundingClientRect().top >
        document.querySelector(".board").getBoundingClientRect().top &&
        direction === -1) ||
      (paddle.getBoundingClientRect().bottom <
        document.querySelector(".board").getBoundingClientRect().bottom &&
        direction === 1)
    )
      x = x + (50 / frames) * direction;

    paddle.style.top = x + "px";
  }, fps);
}

function initGame() {
  let paddle_1 = document.querySelector(".paddle_1"),
    paddle_2 = document.querySelector(".paddle_2"),
    paddle_1_coord = paddle_1.getBoundingClientRect(),
    paddle_2_coord = paddle_2.getBoundingClientRect();

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      gameState = gameState === "stopped" && "play";

      if (gameState === "play") {
        paddle_1.style.top = paddle_2.style.top = window.innerHeight / 2 + "px";
        document.querySelector(".message").innerHTML = "";
        document.querySelector(".message").style.left = 42 + "vw";
        document.querySelector(".ball").style.height = document.querySelector(
          ".ball"
        ).style.width = "30px";
        paddle_1.style.height = paddle_2.style.height = "100px";
        paddle_1.style.width = paddle_2.style.width = "20px";

        requestAnimationFrame(() => {
          moveBall(randomPick(-5, 5, [-3, 3]), randomPick(-5, 5, [-3, 3]));
        });
      }
    }

    if (gameState === "play") {
      if (e.key === "w") {
        moveUpDown(paddle_1, -1);
        paddle_1_coord = paddle_1.getBoundingClientRect();
      }

      if (e.key === "s") {
        moveUpDown(paddle_1, 1);
        paddle_1_coord = paddle_1.getBoundingClientRect();
      }

      if (e.key === "ArrowUp") {
        moveUpDown(paddle_2, -1);
        paddle_2_coord = paddle_2.getBoundingClientRect();
      }
      if (e.key === "ArrowDown") {
        moveUpDown(paddle_2, 1);
        paddle_2_coord = paddle_2.getBoundingClientRect();
      }
    }
  });
}

let gameState = "stopped";
initGame();
