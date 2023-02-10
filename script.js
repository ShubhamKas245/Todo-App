const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressbar = document.querySelector(".progress-bar");
const progessVal = document.querySelector(".progress-val");

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const inputFieldsFilled = [...inputFields].every((input) => {
      return input.value;
    });
    if (inputFieldsFilled) {
      checkbox.parentElement.classList.toggle("completed");
    } else {
      progressbar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    progressbar.classList.remove("show-error");
  });
});

// let allInputFieldsFilled = false;

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
// }
