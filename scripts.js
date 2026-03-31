
function mostrarError(id, mensaje){
    const input = document.getElementById(id);
    input.classList.add("is-invalid");
    document.getElementById("error-"+ id ).textContent = mensaje;

}

function limpiarError(id, mensaje){
    const input = document.getElementById(id);
    input.classList.remove("is-invalid");
    document.getElementById("error-"+ id ).textContent = "";
}

const campos = {
    nombre: {
        required: true,
        regex: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+{3,50}$/,
        error: {
            required: "El nombre completo es obligatorio.",
            length: "El nombre completo debe tener entre 3 y 50 caracteres.",
            format: "El nombre completo debe contener solo letras y espacios."
        }
    },
    email: {
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error: {
            required: "El correo electrónico es obligatorio.",
            format: "El correo electrónico no es válido."
        }
    },
    password: {
        required: true,
        regex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/,
        error: {
            required: "La contraseña es obligatoria.",
            length: "La contraseña debe tener entre 6 y 18 caracteres.",
            format: "La contraseña debe contener al menos una letra mayúscula y un número."
        }
    },
    born: {
        required: true,
        error: {
            required: "La fecha de nacimiento es obligatoria.",
            age: "Debes tener al menos 13 años para registrarte."
        }
    },
    nombreUsuario: {
        required: true,
        error: {
            required: "El nombre de usuario es obligatorio."
        }
    },
    address: {
        required: true,
        error: {
            required: "La dirección de despacho es obligatoria."
        }
    }
};


document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", function(event){

        const valido = true;


        Object.keys(campos).forEach(function(id) {
            limpiarError(id);
        });

        const nombre = formulario.nombreCompleto.value.trim();
        if(campos.nombre.required && nombre === ""){
            mostrarError("nombreCompleto", campos.nombre.error.required);
            valido = false;
        } else if (!nombre.length >= 3 || !nombre.length <= 50){
            mostrarError("nombreCompleto", campos.nombre.error.length);
            valido = false; 
     
        } else if (!campos.nombre.regex.test(nombre)){
            mostrarError("nombreCompleto", campos.nombre.error.format);
            valido = false;
        }

        const email = formulario.email.value.trim();
        if(campos.email.required && email === ""){
            mostrarError("email", campos.email.error.required);
            valido = false;
        } else if (!campos.email.regex.test(email)){
            mostrarError("email", campos.email.error.format);
            valido = false;

            const password = formulario.password.value.trim();
            if(campos.password.required && password === ""){
                mostrarError("password", campos.password.error.required);
                valido = false;
            } else if (!password.length >= 6 || !password.length <= 18){
                mostrarError("password", campos.password.error.length);
                valido = false;
            } else if (!campos.password.regex.test(password)){
                mostrarError("password", campos.password.error.format);
                valido = false;
            }   

            if(formulario.born.value !== ""){
                var fechaNacimiento = new Date(formulario.born.value);
                var anoNacimiento = fechaNacimiento.getFullYear();
                var anoActual = new Date().getFullYear();
                var edad = anoActual - anoNacimiento;
                
                if(edad < 13){
                    mostrarError("born", campos.born.error.age);
                    valido = false;
                }
            }   
        if(campos.nombreUsuario.required && formulario.nombreUsuario.value.trim() === ""){
            mostrarError("nombreUsuario", campos.nombreUsuario.error.required);
            valido = false;
        }

        if(campos.address.required && formulario.address.value.trim() === ""){
            mostrarError("address", campos.address.error.required);
            valido = false;
        }   

        if(formulario.password.value.trim() !== formulario.password-repeat.value.trim()){
            mostrarError("password-repeat", campos.password.error.match);
            valido = false;
        }
        
    if(!valido){
        event.preventDefault();
        alert("Formulario enviado correctamente.");
    }
};



