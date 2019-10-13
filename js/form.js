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

//Validation
function validateFirstName(){
    //check if form is empty = return
    if (checkIfEmpty(firstName)) return;
    if (!checkIfOnlyLetters(firstName)) return;
    return true;
}

firstName.addEventListener('blur', validateFirstName)

function validateLastName(){
    //check if form is empty = return
    if (checkIfEmpty(lastName)) return;
    if (!checkIfOnlyLetters(lastName)) return;
    return true;
}

lastName.addEventListener('blur', validateLastName);


function validatePassword(){
    //check if form is empty = return
    if (checkIfEmpty(password)) return;
    if (!meetLength(password, 4, 20)) return;
    if (!containsCharacters(password, "high")) return;
    return true;
}

password.addEventListener('blur', validatePassword);

function validateConfirmPassword(){
    //check if form is empty = return
    if (checkIfEmpty(confirmPassword)) return;
    if (!meetLength(confirmPassword, 4, 20)) return;
    if (!containsCharacters(confirmPassword, "high")) return;
    if (!matchesCharacters(confirmPassword, password, "Passwords do not match.")) return;
    return true;
}

confirmPassword.addEventListener('blur', validateConfirmPassword);

//Utility 
function checkIfEmpty(field){
    if (isEmpty(field.value.trim())){
        // set field invalid
        setInvalid(field,`${field.name} must not be empty`);
        return true;
    } else { 
        //set field to valid
        setValid(field)
        return false 
    }
}

function isEmpty(val){
    if (val === "") return true;
    return false;
}

function setInvalid(field,message){
    field.className = "invalid";
    field.nextElementSibling.innerHTML = message;;
    field.nextElementSibling.style.color = red;
}

function setValid(field){
    field.className = "valid";
    field.nextElementSibling.innerHTML = "";
    field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field){
    if (/^[a-zA-Z ]+$/.test(field.value)){
        setValid(field);
        return true;
    } else {
        setInvalid(field,`${field.name} must contain only letters.`);
        return false;
    }
}

function meetLength(field, low, high){
    if (field.value.length >= low && field.value.length <= high){
        setValid(field);
        return true;
    } else {
        setInvalid(field,`${field.name} needs to be between ${low} to ${high} charcters in length.`)
        return false;
    }
}

function containsCharacters(field, level){
    
    let regEx,
        message;

    switch (level) {
        case "low" :
            regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
            message = `${field.name} must contain at least 1 uppercase, 1 lowercase charcter.`;
            return matchWithRegEx(field,regEx,message);
            break;

        case "medium" :
            regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
            message = `${field.name} must contain at least 1 uppercase, 1 lowercase, 1 number charcter.`;
            return matchWithRegEx(field,regEx,message);
            break;

        //High is default
        default :
            regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            message = `${field.name} must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special charcter.`;
            return matchWithRegEx(field,regEx,message);
    }

    
}

function matchWithRegEx(field,regEx,message){
    if (field.value.match(regEx)){
        setValid(field);
        return true;
    } else {
        setInvalid(field,message);
        return false;
    }
}

function matchesCharacters(field,originalField, message){
    if (field.value === originalField.value){
        setValid(field);
        return true;
    } else {
        setInvalid(field,message);
        return false;
    }
}