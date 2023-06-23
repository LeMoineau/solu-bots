const ACCEPTED_COLORS = [
  "4e7cf6",
  "3c69d9",
  "5180f3",
  "1c469d",
  "618eca",
  "4c7beb",
  "4f7ef5",
  "4c7af2",
  "4977ee",
  "4875ec",
  "4674ea",
  "4572e7",
  "4371e5",
  "416fe2",
  "406ddf",
  "3e6bdd",
  "3d6ada",
  "3c69d9",
  "5c8add",
  "5b88d7",
  "5f8cca",
  "6a98c4",
  "6b96af",
  "2a55b4",
  "2d58b8",
  "2e59ba",
  "3f6dd9",
  "4a79e9",
  "4f7df5",
  "5b74dc",
  "5b88d6",
  "5f73d5",
  "6b99ba",
  "6c9bba",
  "6d99a9",
  "1d479f",
  "1e48a0",
  "1f49a2",
  "2d59ba",
  "3c69d1",
  "3d6ad2",
  "3f6cd6",
  "1c469e",
  "1d479e",
  "1e49a1",
];
const DIRECTIONS = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};
const RECT_SIZE = 32;
const START_POINT = {
  x: 28,
  y: 25,
};
const NB_ROW = 15; //normal row = 15, col = 17
const NB_COL = 17;
const KEYS = {
  UP: new KeyboardEvent("keydown", { keyCode: 38 }),
  RIGHT: new KeyboardEvent("keydown", { keyCode: 39 }),
  DOWN: new KeyboardEvent("keydown", { keyCode: 40 }),
  LEFT: new KeyboardEvent("keydown", { keyCode: 37 }),
};
const INTERVAL_DELAY = 20;
const DETECTION_OFFSET = 8;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

//id used to setInterval
let snakeMovementId = -1;

// SNAKE INFOS
let snakePos = {
  x: 4, // coords begin from 0
  y: 7,
};
let snakeDirection = DIRECTIONS.RIGHT;
let logs = {};

// UTILS
const arrayEquals = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

const press = (key) => {
  document.dispatchEvent(key);
};

const fillRect = (x, y, width, height, color = "red") => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

const getPixelColor = function (x, y) {
  const data = ctx.getImageData(x, y, 1, 1).data;
  return rgbToHex(data[0], data[1], data[2]);
};

// SNAKE ACTIONS
const snakeOnCase = function (casePos) {
  const x =
    START_POINT.x + casePos.x * RECT_SIZE + RECT_SIZE / 2 + casePos.offsetX;
  const y =
    START_POINT.y + casePos.y * RECT_SIZE + RECT_SIZE / 2 + casePos.offsetY;
  const color = getPixelColor(x, y);
  if (!ACCEPTED_COLORS.includes(color)) {
    if (!Object.keys(logs).includes(color)) logs[color] = 1;
    else logs[color] += 1;
  }
  fillRect(x + 1, y - 1, 2, 2, "red");
  const res = ACCEPTED_COLORS.includes(color);
  return res;
};

const calculateSnakeTargetCase = () => {
  let c = snakePos.x;
  let r = snakePos.y;
  let offsetX = 0,
    offsetY = 0;
  switch (snakeDirection) {
    case DIRECTIONS.DOWN:
      r++;
      offsetY = DETECTION_OFFSET;
      break;
    case DIRECTIONS.UP:
      r--;
      offsetY = -DETECTION_OFFSET;
      break;
    case DIRECTIONS.LEFT:
      c--;
      offsetX = -DETECTION_OFFSET;
      break;
    case DIRECTIONS.RIGHT:
      c++;
      offsetX = DETECTION_OFFSET;
      break;
    default:
      break;
  }
  return {
    x: c,
    y: r,
    offsetX: offsetX,
    offsetY: offsetY,
  };
};

const waitSnakeRunCases = async (nbCase) => {
  return new Promise((resolve) => {
    let currentNbCase = 0;
    let targetCase = calculateSnakeTargetCase();
    snakeMovementId = setInterval(() => {
      if (snakeOnCase(targetCase)) {
        snakePos = Object.assign({}, targetCase);
        targetCase = calculateSnakeTargetCase();
        currentNbCase++;
      }
      if (currentNbCase >= nbCase) {
        clearInterval(snakeMovementId);
        resolve();
      }
    }, INTERVAL_DELAY);
  });
};

const moveSnake = (direction) => {
  snakeDirection = direction;
  switch (direction) {
    case DIRECTIONS.DOWN:
      press(KEYS.DOWN);
      break;
    case DIRECTIONS.UP:
      press(KEYS.UP);
      break;
    case DIRECTIONS.LEFT:
      press(KEYS.LEFT);
      break;
    case DIRECTIONS.RIGHT:
      press(KEYS.RIGHT);
      break;
    default:
      break;
  }
};

// SNAKE PATH
const beginGame = async () => {
  moveSnake(DIRECTIONS.RIGHT);
  await waitSnakeRunCases(1);
  moveSnake(DIRECTIONS.DOWN);
  await waitSnakeRunCases(6);
  moveSnake(DIRECTIONS.LEFT);
  await waitSnakeRunCases(5);
};

const aLoop = async () => {
  moveSnake(DIRECTIONS.UP);
  await waitSnakeRunCases(NB_ROW - 2);
  moveSnake(DIRECTIONS.RIGHT);
  await waitSnakeRunCases(1);
  moveSnake(DIRECTIONS.DOWN);
  await waitSnakeRunCases(NB_ROW - 2);
};

const aMiniLoop = async () => {
  moveSnake(DIRECTIONS.LEFT);
  await waitSnakeRunCases(1);
  moveSnake(DIRECTIONS.DOWN);
  await waitSnakeRunCases(1);
  moveSnake(DIRECTIONS.RIGHT);
  await waitSnakeRunCases(1);
  moveSnake(DIRECTIONS.DOWN);
  await waitSnakeRunCases(1);
};

const infiniteSnake = async () => {
  let pair = true;
  await beginGame();
  while (botRunning) {
    for (let i = 0; i < 7; i++) {
      await aLoop();
      moveSnake(DIRECTIONS.RIGHT);
      await waitSnakeRunCases(1);
    }
    moveSnake(DIRECTIONS.UP);
    await waitSnakeRunCases(NB_ROW - 2);
    moveSnake(DIRECTIONS.RIGHT);
    await waitSnakeRunCases(2);
    moveSnake(DIRECTIONS.DOWN);
    await waitSnakeRunCases(1);
    for (let i = 0; i < 6; i++) {
      await aMiniLoop();
    }
    moveSnake(pair ? DIRECTIONS.LEFT : DIRECTIONS.DOWN);
    await waitSnakeRunCases(1);
    if (pair) {
      moveSnake(DIRECTIONS.DOWN);
      await waitSnakeRunCases(1);
      moveSnake(DIRECTIONS.LEFT);
      await waitSnakeRunCases(NB_COL - 2);
    } else {
      moveSnake(DIRECTIONS.LEFT);
      await waitSnakeRunCases(NB_COL - 1);
    }
    moveSnake(DIRECTIONS.UP);
    await waitSnakeRunCases(1);
    pair = !pair;
  }
};

let botRunning = true;
