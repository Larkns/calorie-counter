const resetButton = document.querySelector(".reset");
const submitButton = document.querySelector(".submit");

const caloriesForm = document.forms.counter;

const normalCal = document.querySelector(".normal_cal");
const weightGain = document.querySelector(".weight_gain");
const weightLoss = document.querySelector(".weight_loss");

const disableResetButton = () => document.querySelector('.reset').disabled = true;
const disableSubmitButton = () => document.querySelector('.submit').disabled = true;


resetButton.addEventListener("click", (event) => {
    document.querySelector('.result').style.display='none';
    document.querySelector('.counter').style.display='block';

    disableSubmitButton();

    // disableResetButton конфликтует с обновлением формы, пришлось сделать это через setTimeout
    setTimeout(disableResetButton, 1);

    reset();

    event.preventDefault();
});

submitButton.addEventListener("click", (event) => {
    document.querySelector('.counter').style.display='none';
    document.querySelector('.result').style.display='block';

    let activityRatio = 1.2;

    if (caloriesForm.activity[1].checked) activityRatio = 1.375;
    if (caloriesForm.activity[2].checked) activityRatio = 1.55;
    if (caloriesForm.activity[3].checked) activityRatio = 1.725;
    if (caloriesForm.activity[4].checked) activityRatio = 1.9;

    let calculations = ((10 * caloriesForm.parameter[2].value) + (6.25 * caloriesForm.parameter[1].value) - (5 * caloriesForm.parameter[0].value) + 5) * activityRatio;

    if (!caloriesForm.gender[0].checked) {
        calculations = ((10 * caloriesForm.parameter[2].value) + (6.25 * caloriesForm.parameter[1].value) - (5 * caloriesForm.parameter[0].value) - 161) * activityRatio;
    }

    normalCal.textContent = Math.round(calculations);

    weightLoss.textContent = Math.round(calculations * 0.85);
    weightGain.textContent = Math.round(calculations * 1.15);

    event.preventDefault();
});

caloriesForm.onkeyup = function (event) {
    if (caloriesForm.parameter[0].value !== '' ||
        caloriesForm.parameter[1].value !== '' ||
        caloriesForm.parameter[2].value !== '') document.querySelector('.reset').disabled = false;
    if (caloriesForm.parameter[0].value !== '' &&
        caloriesForm.parameter[1].value !== '' &&
        caloriesForm.parameter[2].value !== '') document.querySelector('.submit').disabled = false;
}
