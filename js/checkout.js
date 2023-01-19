
// Exercise 7

function validateEmail(email) {
	return String(email)
	  .toLowerCase()
	  .match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	  );
};
function addInvalidClass(element, error) {
	if (error) {
	  element.classList.add("is-invalid");
	} else {
	  element.classList.remove("is-invalid");
	  element.classList.add("is-valid");
	}
  };
function validate() {
	let error = 0;
	// Get the input fields
	let fName = document.getElementById("fName");
	let fEmail = document.getElementById("fEmail");
	let fAddress = document.getElementById("fAddress");
	let fPassword = document.getElementById("fPassword");
	let fPhone = document.getElementById("fPhone");
	// Get the error elements
	let errorName = document.getElementById("errorName");
	let errorEmail = document.getElementById("errorEmail");
	let errorAddress = document.getElementById("errorAddress"); 
	let errorLastN = document.getElementById("errorLastN"); 
	let errorPassword = document.getElementById("errorPassword"); 
	let errorPhone = document.getElementById("errorPhone");   
	
	// Validate fields entered by the user: name, phone, password, and email
	if(fName.value === "" || !fName.value.match(/^[A-Za-z\s]*$/) || fName.value.length < 3){
		error++;
	}

	if(fEmail.value == ""){
		error++;
	}
	 
	if(error>0){
		alert("Error");
	}else{
		alert("OK");
	}

}
