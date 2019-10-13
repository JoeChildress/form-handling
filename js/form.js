//Fields
const firstName = document.getElementById('firstName'),
    lastName = document.getElementById('lastName'),
    password = document.getElementById('password'),
    confirmPassword = document.getElementById('confirmPassword'),
    email = document.getElementById('email');

//Form
const form = document.getElementById('signIn');

//Custom Colors
const green = "#4caf50",
    red = "#f44336";


form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (
        validateFirstName() &&
        validateLastName() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateEmail()
    ) {
        console.log('form sent!');

        const formData = {};
        formData.firstName = firstName.value;
        formData.lastName = lastName.value;
        formData.password = password.value;
        formData.email = email.value;
        const container = document.querySelector('.container');
        const loader = document.createElement('div');
        loader.className = "progress";
        const loadingBar = document.createElement('div');
        loadingBar.className = "intermediate";
        loader.appendChild(loadingBar);
        container.appendChild(loader);

        //Timeout to simulate ajax time
        setTimeout(function () {
            const loaderDiv = document.querySelector('.progress');
            const panel = document.createElement('div');
            panel.className = "card-panel green";
            const text = document.createElement('span');
            text.appendChild(document.createTextNode(`Welcome ${formData.firstName}!`));
            panel.appendChild(text);
            container.replaceChild(panel, loaderDiv);
            panel.scrollIntoView();
            console.log("Form data:", formData);
        }, 1000);

    } else {
        console.log('form NOT sent!');
    }

    return;
});


//Validation
function validateFirstName() {
    //check if form is empty = return
    if (checkIfEmpty(firstName)) return;
    if (!checkIfOnlyLetters(firstName)) return;
    return true;
}

firstName.addEventListener('blur', validateFirstName)

function validateLastName() {
    //check if form is empty = return
    if (checkIfEmpty(lastName)) return;
    if (!checkIfOnlyLetters(lastName)) return;
    return true;
}

lastName.addEventListener('blur', validateLastName);


function validatePassword() {
    //check if form is empty = return
    if (checkIfEmpty(password)) return;
    if (!meetLength(password, 4, 20)) return;
    if (!containsCharacters(password, "high")) return;
    return true;
}

password.addEventListener('blur', validatePassword);

function validateConfirmPassword() {

    if (!password.classList.contains('valid')) {
        setInvalid(confirmPassword, "Password must be valid.");
        return;
    }

    if (!matchesCharacters(confirmPassword, password, "Passwords must match.")) return;
    return true;
}

confirmPassword.addEventListener('blur', validateConfirmPassword);

function validateEmail() {
    if (checkIfEmpty(email)) return;
    if (!containsCharacters(email, "email")) return;
    return true;
}

email.addEventListener('blur', validateEmail);

//Utility 
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        // set field invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        //set field to valid
        setValid(field)
        return false
    }
}

function isEmpty(val) {
    if (val === "") return true;
    return false;
}

function setInvalid(field, message) {
    field.className = "invalid";
    field.nextElementSibling.innerHTML = message;;
    field.nextElementSibling.style.color = red;
}

function setValid(field) {
    field.className = "valid";
    field.nextElementSibling.innerHTML = "";
    field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters.`);
        return false;
    }
}

function meetLength(field, low, high) {
    if (field.value.length >= low && field.value.length <= high) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} needs to be between ${low} to ${high} charcters in length.`)
        return false;
    }
}

function containsCharacters(field, level) {

    let regEx,
        message;

    switch (level) {
        case "low":
            regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
            message = `${field.name} must contain at least 1 uppercase, 1 lowercase charcter.`;
            return matchWithRegEx(field, regEx, message);
            break;

        case "medium":
            regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
            message = `${field.name} must contain at least 1 uppercase, 1 lowercase, 1 number charcter.`;
            return matchWithRegEx(field, regEx, message);
            break;

        case "high":
            regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            message = `${field.name} must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special charcter.`;
            return matchWithRegEx(field, regEx, message);
            break;

        case "email":
            regEx = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
            message = `${field.name} must contain an email name, @ and a domain: ex. email1@hello.com`;
            return matchWithRegEx(field, regEx, message);
            break;

        default:
            return false;
    }
}

function matchWithRegEx(field, regEx, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}

function matchesCharacters(field, originalField, message) {
    if (field.value === originalField.value) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}