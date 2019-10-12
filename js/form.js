const errorMessages = {
    firstName : "Please enter a first name.",
    lastName : "Please enter a last name.",
    email : "Please enter a valid email address.",
};

const form = document.querySelector('form');
console.log(form.elements);  

form.onsubmit = (event) =>{
    event.preventDefault();
    console.log('fist name: ', form.elements.firstName.value.trim());
    console.log('last name: ', form.elements.lastName.value.trim());
    console.log('email: ', form.elements.email.value.trim());
  }
