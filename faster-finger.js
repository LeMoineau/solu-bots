const INPUT_FIELD = document.querySelector("#inputfield");

const validateInput = () => {
  INPUT_FIELD.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 32 }));
};

const timeOut = async (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  });
};

const fasterfinger = async (delay = 0) => {
  console.log("🟡 ready?");
  const words = document.querySelectorAll("#words [wordnr]");
  console.log("🟢 go!");
  let timeElapsed = 0;
  for (let w of words) {
    INPUT_FIELD.value = "";
    for (let l of w.textContent) {
      INPUT_FIELD.value += l;
      await timeOut(delay / w.textContent.length);
    }
    validateInput();
    timeElapsed += delay;
    if (timeElapsed >= 60 * 1000 - delay) return;
  }
  console.log("🏁 finish!");
};
