function currentUser(){
    try{
        let user = firebase.auth().currentUser;
        return user.email;
    }catch(e){
        return e;
    }
}

function singup(){
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    alert("About to singup: email => "+email+", senha =>"+senha);

    if (email.length == 0){
        alert("Digite um email!");
        return false;
    }

    if (senha.length == 0){
        alert("Digite uma senha!");
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function(error){
        var errorCode = error.code;
        var erroeMessage = error.message;
        if(errorCode){
            alert(errorCode);
        }
        if(errorMessage){
            alert(erroeMessage);
        }
    })

    showCurrentUser();
}

function login() {
    console.log("function login(){...}");
    try{
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;

        alert("About to login: email =>"+email+"Senha =>"+senha);

        if (email.length == 0){
            alert("Digite um email!");
            return false;
        }
    
        if (senha.length == 0){
            alert("Digite uma senha!");
            return false;
        }

        firebase.auth().signInWithEmailAndPassword(email, senha).then(function(user){
            console.log("firebase.auth().signInWithEmailAndPassword(email, senha).then(function(user){...");
            showCurrentUser();
        }).catch(function(error){
            console.log("firebase.auth().signInWithEmailAndPassword(email, senha).catch(function(error)");
            var errorCode = error.code;
            var errorMessage = error.message;
    
            if (errorCode == 'auth/wrong-password') {
                alert("Senha incorreta!");
            }else {
                alert(errorMessage);
            }
        });
    }catch(e){
        console.log(e);
    }
}

function mudarSenha(){
    var email = document.getElementById("email").value;

    firebase.auth().sendPasswordResetEmail(email).then(function(){
        alert('Pedido de alteração de senha enviado com sucesso!');
    }).catch(function(error){
        var errorCode = error.code;
        var erroeMessage = error.message;

        if (errorCode == 'auth/invalid-email'){
            alert("Email inválido!");
        }else if(errorCode == 'auth/user-not-found'){
            alert("Email não encontrado!");
        }
    });
}

function logout(){
    try{
        firebase.auth().signOut();
        showCurrentUser();
    }catch(e){
        alert(e);
    }
}

function showCurrentUser(){
    console.log("function showCurrentUser(){...");
    document.getElementById("lbUserLoggedIn").innerHTML = currentUser();
}