const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const progressbar = document.querySelector(".progress-bar");
const progessVal = document.querySelector(".progress-val");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away,keep going!",
  "Whoa! You just completed all the goals,time for chill :S",
];

// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
//   first: {
//     name: "",
//     completed: false,
//   },
//   second: {
//     name: "",
//     completed: false,
//   },
//   third: {
//     name: "",
//     completed: false,
//   },
// };
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = Object.values(allGoals).filter(
  (goals) => goals.completed
).length;

progessVal.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progessVal.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const inputFieldsFilled = [...inputFields].every((input) => {
      return input.value;
    });

    if (inputFieldsFilled) {
      checkbox.parentElement.classList.toggle("completed");

      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goals) => goals.completed
      ).length;

      progessVal.style.width = `${
        (completedGoalsCount / inputFields.length) * 100
      }%`;
      progessVal.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressbar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressbar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id] = input.value.name;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

// let allInputFieldsFilled = false;

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
// }
