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
    return;
}

firstName.addEventListener('blur', validateFirstName)

function validateLastName(){
    //check if form is empty = return
    if (checkIfEmpty(lastName)) return;
    if (!checkIfOnlyLetters(lastName)) return;
    return;
}

lastName.addEventListener('blur', validateLastName);

//*** COMPLETE THIS ***/
function validatePassword(){
    //check if form is empty = return
    if (checkIfEmpty(password)) return;
    //if () return;
    return;
}

lastName.addEventListener('blur', validatePassword)


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