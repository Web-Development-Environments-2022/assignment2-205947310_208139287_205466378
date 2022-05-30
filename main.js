const user__dict ={}
user__dict["k"] = ["k","Mazal Mahari","maharim@post.bgu.ac.il",]
let userEntered;
var keys = ["Esc","Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab","Enter"];
var keysdown = {};
var movementKeys = {"up":"","down":"","left":"","right":""}


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const welcomeForm = document.querySelector("#welcome");
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const settingForm = document.querySelector("#settingsForm");
    const gameForm = document.querySelector("#GameForm");
    const submitlogin=document.querySelector("#submitlogin");
    const submitRegister=document.querySelector("#submitRegister");
    const createAccountBtn = document.querySelector("#btn");


    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });


    createAccountBtn.addEventListener("click", e=>{
        e.preventDefault();

        createAccountForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");

        AddUser();
    })

    
    submitlogin.addEventListener("click", e => {
        e.preventDefault();

        welcomeForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    
        
        
    });

    submitRegister.addEventListener("click", e => {
        e.preventDefault();

        welcomeForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        
        
    });
    
    gameForm.addEventListener("submit", e => {
        e.preventDefault();

        settingForm.classList.remove("form--hidden");
        gameForm.classList.add("form--hidden");
        console.log("hey")
        restart=true
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // settingForm.classList.remove("form--hidden");
        // loginForm.classList.add("form--hidden");

        // setFormMessage(loginForm, "error", "Invalid username/password combination");

        isExistInDict();
    });

    settingForm.addEventListener("submit", e=> {
        e.preventDefault();
        settingForm.classList.add("form--hidden");
        gameForm.classList.remove("form--hidden");
        restart=false
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    // VALIDATION - REGISTER    

    $("#email").keyup(function(){
        if(validateEmail()){
            // if the email is validated
            // set input email border green
            $("#email").css("border","2px solid green");
            // and set label 
            $("#emailMsg").html("<p class='text-success'>Validated</p>");
        }else{
            // if the email is not validated
            // set border red
            $("#email").css("border","2px solid red");
            $("#emailMsg").html("<p class='text-danger'>Un-validated</p>");
            buttonState();
        }
    });

    $("#pass").keyup(function(){
        // check
        if(validatePassword()){
            // set input password border green
            $("#pass").css("border","2px solid green");
            //set passMsg 
            $("#passMsg").html("<p class='text-success'>Password validated</p>");
        }else{
                // set input password border red
            $("#pass").css("border","2px solid red");
            //set passMsg 
            $("#passMsg").html("<p class='text-danger'>Password not valid</p>");
        }
        buttonState();
    });

    $("#fullname").keyup(function(){
        // check
        if(validateFullname()){
            // set input fullname border green
            $("#fullname").css("border","2px solid green");
            //set passMsg 
            $("#fullnameMsg").html("<p class='text-success'>Full name validated</p>");
        }else{
                // set input fullname border red
            $("#fullname").css("border","2px solid red");
            //set passMsg 
            $("#fullnameMsg").html("<p class='text-danger'>Full name include numbers.</p>");
        }
        buttonState();
    });

    $("#username").keyup(function(){
        // check
        if(validateUsername()){
            // set input username border green
            $("#username").css("border","2px solid green");
            //set passMsg 
            $("#usernameMsg").html("<p class='text-success'>Full name validated</p>");
        }else{
                // set input username border red
            $("#username").css("border","2px solid red");
            //set passMsg 
            $("#usernameMsg").html("<p class='text-danger'>Full name include numbers.</p>");
        }
        buttonState();
    });

    function allvalid(){
        if(validateEmail() && validatePassword() && validateFullname() && validateUsername()){
            return true;
        }
        else{
            return false;
        }
    }

    function buttonState(){
		if(allvalid()){
			// if the both email and password are validate
			// then button should show visible
			$("#btn").show();
		}else{
			// if both email and pasword are not validated
			// button state should hidden
			$("#btn").hide();
		}
	}

    function validateEmail(){
		// get value of input email
		var email=$("#email").val();
		// use reular expression
		 var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		 if(reg.test(email)){
		 	return true;
		 }else{
		 	return false;
		 }

	}

	function validatePassword(){
		//get input password value
		var pass=$("#pass").val();
        var reg = /[a-zA-Z]+/
        var reg2 = /[0-9]+/
        if(reg.test(pass) && reg2.test(pass) && pass.length > 6){
			return true;
		}else{
			return false;
		}
	}
    function validateFullname(){
		//get input value
		var fullname=$("#fullname").val();
		// check if fullname contains numbers
        var reg = /[0-9]/
		if(!reg.test(fullname) && fullname.length > 0){
			return true;
		}else{
			return false;
		}
	}
    function validateUsername(){
		//get input password value
		var username=$("#username").val();
		// check it s length
		if(username.length > 0){
			return true;
		}else{
			return false;
		}
	}

    function AddUser(){
        if(allvalid()){
            var userName = $("#username").val();
            var password= $("#pass").val();
            var fullName= $("#fullname").val();
            var email= $("#email").val();
            //   var date=$("#date").val();
            user__dict[userName]=[password, fullName, email];
    
            console.log(user__dict);
            alert("Registration executed successfully");
    
        }  
      }  

    // Clear adding in URL after submitting form
// document.getElementById("startGame").addEventListener("click", function(event){
//     event.preventDefault()
// });

// document.getElementById("randomGame").addEventListener("click", function(event){
//     event.preventDefault()
// });




/*
Enter keys to inputs
*/

// Enter key for the up input
document.getElementById("up").addEventListener("keydown",function(event){
    //only one value in the input field
    if(document.getElementById("up").value != ""){
        document.getElementById("up").value = "";
    }
    
    let letter = event.key;
    let c = event.which;
    movementKeys["up"] = c;
    
    // dont show chars twice
    if (((c < 48) || (c > 90)) && (c < 186)) {
        document.getElementById("up").value = letter;
    }
})

//Enter key for the down input
document.getElementById("down").addEventListener("keydown",function(event){
    //only one value in the input field
    if(document.getElementById("down").value != ""){
        document.getElementById("down").value = "";
    }
    
    let letter = event.key;
    let c = event.which;
    movementKeys["down"] = c;
    
    // dont show chars twice
    if (((c < 48) || (c > 90)) && (c < 186)) {
        document.getElementById("down").value = letter;
    }
})

// Enter key for the left input
document.getElementById("left").addEventListener("keydown",function(event){
    //only one value in the input field
    if(document.getElementById("left").value != ""){
        document.getElementById("left").value = "";
    }
    
    let letter = event.key;
    let c = event.which;
    movementKeys["left"] = c;
    
    // dont show chars twice
    if (((c < 48) || (c > 90)) && (c < 186)) {
        document.getElementById("left").value = letter;
    }
})

// Enter keys for the right input
document.getElementById("right").addEventListener("keydown",function(event){
    //only one value in the input field
    if(document.getElementById("right").value != ""){
        document.getElementById("right").value = "";
    }
    
    let letter = event.key;
    let c = event.which;
    movementKeys["right"] = c;
    
    // dont show chars twice
    if (((c < 48) || (c > 90)) && (c < 186)) {
        document.getElementById("right").value = letter;
    }
})

    // VALIDATION - LOGIN

    //const createAccountBtn = document.querySelector("#btn");
    // const Usernamelogin = document.querySelector("Username");

    // check if the user is alredy saved 
    function isExistInDict(){  

        userEntered = $("#Username").val()
        var passwordEntered = $("#Password").val()
        // console.log("Hello");
        
        if(userEntered in user__dict){    
            if(user__dict[userEntered][0].localeCompare(passwordEntered) === 0){
                // Do Show settings
                loginForm.classList.add("form--hidden");
                settingForm.classList.remove("form--hidden");
                //console.log(user__dict);
            }
            else {
                //console.log(user__dict);
                alert("WrongPassword");
            }
        }
        else{
            alert("the user name doesn't exists");
        }
    
    }




    // ABOUT MODAL

    // Get DOM Elements
    const modal = document.getElementById("about");
    const modalBtn = document.getElementById("aboutBtm");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Events
    modalBtn.addEventListener('click',openModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);
    //Keyboard.addEventListener('onkeypress', closeModal);
    
    

    // Open
    function openModal() {
        
        modal.style.display = 'block';
    }

    // Close
    function closeModal() {
        
        modal.style.display = 'none';
    }

    // Close If Outside Click
    function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
    }


    

});