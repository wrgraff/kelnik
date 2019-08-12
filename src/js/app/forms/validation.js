// Get all forms
var validationForms = document.querySelectorAll('[data-validate]');
// console.log('Validation forms:' + validationForms);

// Validation RegExp patterns
var validationPatterns = {
    email: /.+@.+\..+/i,
};

// Adding error message
var addError = function(input, text) {
    var error = input.parentElement.querySelector('.input__error');
    error.innerHTML = text;
};

// Check requred status
var checkRequired = function(input) {
    if (input.required && (input.value == '')) {
        // console.log('Required field is false');
        addError(input, 'Необходимо заполнить это поле');
        return false;
    }
    // console.log('Required field is true');
    return true;
};
// Check matching with patterns
var checkPattern = function(input) {
    if (!input.dataset.validatePattern || (input.value == '')) { return true };

    var inputPattern = validationPatterns[input.dataset.validatePattern],
        inputValue = input.value;

    // console.log('Pattern is ' + inputPattern.test(inputValue));
    if (!inputPattern.test(inputValue)) {
        addError(input, 'Поле заполнено неверно');
    }
    return inputPattern.test(inputValue);
};

// Validate input
var validateInput = function(input, isHardCheck) {
    // console.log('input on check');
    // Check all validate parameters
    var isInputValid = checkRequired(input) && checkPattern(input),
        isNotEmpty = input.value || false;

    // Adding classes to inputs
    if (isInputValid && isNotEmpty) {
        input.classList.add('input__field_status_valid');
        input.classList.remove('input__field_status_invalid');
        // console.log('input soft checked ok');
        return true;
    } else if (!isInputValid && isHardCheck) {
        input.classList.remove('input__field_status_valid');
        input.classList.add('input__field_status_invalid');
        // console.log('input hard checked not ok');
        return false;
    } else if (!isInputValid) {
        input.classList.remove('input__field_status_valid');
        // console.log('input soft checked not ok');
        return true;
    };
    return true;
};

// Validate form
var validateForm = function(form) {
    var inputs = form.querySelectorAll('.input__field');
    // console.log(inputs);

    inputs.forEach((input) => {
        // console.log(input);
        input.parentElement.append( addElement('span', 'input__error') );
        input.addEventListener('keyup', function() {
            validateInput(input, false);
        });
        input.addEventListener('click', function() {
            validateInput(input, false);
        });
        input.addEventListener('change', function() {
            validateInput(input, true);
        });
        input.addEventListener('blur', function() {
            validateInput(input, true);
        });
    });

    // Catch submit action
    form.onsubmit = function(e) {
        var isFormValid = true;
        inputs.forEach((input) => {
            if (!validateInput(input, true)) {
                isFormValid = isFormValid && validateInput(input, true);
            }
        });
        return isFormValid;
    };
};
validationForms.forEach((form) => {
    validateForm(form);
});
