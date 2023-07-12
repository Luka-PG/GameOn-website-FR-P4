function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const formData = document.querySelectorAll(".formData");
  const modalClose = document.querySelectorAll(".close");
  const Name = document.getElementById("first");
  const Surname = document.getElementById("last");
  const Email = document.getElementById("email");
  const Birth = document.getElementById("birthdate");
  const Tournament = document.getElementById("quantity");
  const Check = document.querySelectorAll('input[name="location"]');
  const Condition = document.getElementById("checkbox1");

  const validationModal = document.querySelector(".validation-modal");
  const closeValidationModal = document.querySelector(".btn-close");
  const closeValidBtn = document.querySelector(".valid-close");


//messages d'erreur
  const nameError = "Veuillez entrer au moins 2 caractères alphabétiques pour votre nom.";
  const surnameError = "Veuillez entrer au moins 2 caractères alphabétiques pour votre prénom.";
  const emailError = "Veuillez entrer une adresse mail valide.";
  const dateError = "Veuillez entrer une date de naissance valide.";
  const checkError = "Vous devez choisir une option.";
  const conditionError = "Vous devez acceptez les termes et conditions pour pouvoir vous inscrire.";
  const tournamentError = "Merci d'entrer une valeur valide";

//établissements des valeur pour chaques entrée du formulaire
  Name.Valid = false;
  Surname.Valid = false;
  Email.Valid = false;
  Birth.Valid = false;
  Tournament.Valid = false;
  Check.Valid = false;
  Condition.Valid = true;


// event d'ouverture de modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// event de fermeture de modal
modalClose.forEach((btn) => btn.addEventListener("click", closemodal));

//fonction d'ouverture de modal
function launchModal() {
  modalbg.style.display = "block";
}

//fonction de fermeture de modal
function closemodal() {
  modalbg.style.display = "none";
}

//clear field
function clearField (element) {
  element.valid = false;
  element.value = '';
}
 
// clear form 
function clearForm () {
  clearField(Name);
  clearField(Surname);
  clearField(Email);
  clearField(Birth);
  clearField(Tournament);
  Check.valid = false;
  document.querySelectorAll("input[name='location']:checked")[0].checked = false;
  formContent.style.display="block";
  modalSuccess.style.display="none";
  closemodal();
}
 
//fonction pour afficher les message d'erreur
function inputError(text, el, display) {
  document.querySelector(`.${el}`).style.display = "block";
  document.querySelector(`.${el}`).innerText = text;
}

//fonction pour ne plus afficher les message d'erreur
function noInputError(text, el, display) {
  document.querySelector(`.${el}`).style.display = "none";
}

//bordure rouge lors d'une erreur d'input
function errorBorder(el) {
  el.style.border = "1px solid red";
}

//bordure verte lorsque tout va bien
function noErrorBorder(el) {
  el.style.border = "2px solid green";
}

//regex pour les vérifications de nom/prénom
function chart2Min(value) {
  return /^[a-zA-Z]{2,}$/.test(value);
}

//vérification du nom
Name.addEventListener("input", function () {
  if (!(chart2Min(Name.value)) || Name === '') {
      errorBorder(Name);
      inputError(nameError, "error-first", "block");
      Name.Valid = false;
    } else {
      noInputError(nameError, "error-first", "none");
      noErrorBorder(Name);
      Name.Valid = true;
    }
  });

//vérification du prénom
  Surname.addEventListener("input", function () {
    if (!(chart2Min(Surname.value)) || Surname === '') {
      errorBorder(Surname);
      inputError(surnameError, "error-last", "block");
      Surname.Valid = false;
    } else {
      noInputError(surnameError, "error-last", "none");
      noErrorBorder(Surname);
      Surname.Valid = true;
    }
  });

//vérification de l'email
  Email.addEventListener("input", function (e) {
   if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(e.target.value)) || e.target.value === '') {
      errorBorder(Email);
      inputError(emailError, "error-email", "block");
      Email.Valid = false;
    } else {
      noInputError(emailError, "error-email", "none");
      noErrorBorder(Email);
      Email.Valid = true;
    }
  });

//vérification de la date de naissance
  Birth.addEventListener("change", function (e) {
    //obtention de la date d'aujourd'hui et la date entrée
    let now = new Date();
    let date = e.target.value;
    //on les convertis en objet js
    let nowParse = Date.parse(now);
    let dateParse = Date.parse(e.target.value);
    //si la date est elle d'aujourd'hui ou plus, non valide
    if (date == null || dateParse > nowParse) {
      errorBorder(Birth);
      inputError(dateError, "error-birth", "block");
      Birth.Valid = false;
    } else {
      noInputError(dateError, "error-birth", "none");
      noErrorBorder(Birth);
      Birth.Valid = true;
    }
  });

//vérification du nombre de tournois participé 
  Tournament.addEventListener("input", function (e) {
    if (e.target.value == null || e.target.value == "" || e.target.value < 1 ) {
      errorBorder(Tournament);
      inputError(tournamentError, "error-tournament", "block");
      Tournament.Valid = false;
    } else {
      noInputError(tournamentError, "error-tournament", "none");
      noErrorBorder(Tournament);
      Tournament.Valid = true;
    }
  });

//vérification du choix de ville (affichage d'erreur seulement à la confirmation du modal)
  for (let i = 0; i < Check.length; i++) {
    //écoute des changements de statut 
    Check[i].addEventListener("change", () => {
      //si un choix est coché, la valeur devient vraie
      if (Check[i].checked == true) {
        Check.Valid = true;
        noInputError(checkError, "error-check", "none");
      } else {
        Check.Valid = false;
        inputError(checkError, "error-check", "block");
      }
    });
  }


//vérification du cochage de la case "conditions d'utilisation"
  Condition.addEventListener("change", function (e) {
    if (!e.currentTarget.checked) {
      inputError(conditionError, "error-condition", "block");
      Condition.Valid = false;
    } 
    else {
      noInputError(conditionError, "error-condition", "none");
      Condition.Valid = true;
    }
  });


  modalbg.addEventListener("submit", validate);
  function validate(e) {
    //vérification des variables
    if (
      Name.Valid &&
      Surname.Valid &&
      Email.Valid &&
      Birth.Valid &&
      Tournament.Valid &&
      Check.Valid &&
      Condition.Valid
    ) {
      e.preventDefault();
      //ouverture du modal de confirmation
      closemodal();
      validationModal.style.display = "block";
      closeValidationModal.addEventListener("click", function (e){
        validationModal.style.display = "none";
        closemodal();
      });
      closeValidBtn.addEventListener("click", function (e){
        validationModal.style.display = "none";
        closemodal();
      });
    }
    //si il y à erreur, affichage de messages d'erreur
    else {
      e.preventDefault();
      if (!Name.Valid) {
        errorBorder(Name);
        inputError(nameError, "error-first", "block");
      }
      if (!Surname.Valid) {
        errorBorder(Surname);
        inputError(surnameError, "error-last", "block");
      }
      if (!Email.Valid) {
        errorBorder(Email);
        inputError(emailError, "error-mail", "block");
      }
      if (!Birth.Valid) {
        errorBorder(Birth);
        inputError(dateError, "error-birth", "block");
      }
      if (!Tournament.Valid) {
        errorBorder(Tournament);
        inputError(tournamentError, "error-tournament", "block");
      }
      if (!Check.Valid) {
        inputError(checkError, "error-check", "block");
      }    
      if (!Condition.Valid) {
        inputError(conditionError, "error-condition", "block");
      }
    }
  }