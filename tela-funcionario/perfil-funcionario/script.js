
var uid = sessionStorage.getItem("id")

console.log(uid);

function removerUsuario(uid) {

    if (confirm(`Você realmente deseja remover sua conta?`)) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(uid);

        const requestOptions = {
            headers: myHeaders,
            body: raw,
            method: "DELETE",
            redirect: "follow"
        };

        fetch("http://localhost:8094/usuario/remover", requestOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.length !== 0) {
                    console.log(json);
                    location.href = '../../tela-delete/index.html';
                }
            })
            .catch((error) => console.error(error));
    }
}

function deletar() {
    removerUsuario(uid);
}

function alterarAtributo(i, uid, data) {
    endpoints = ["Email", "Telefone", "Senha"]

    if (confirm(`Você realmente deseja alterar o atributo ${endpoints[i]}?`)) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "uid": uid,
            "dado": data
        });

        const requestOptions = {
            headers: myHeaders,
            body: raw,
            method: "PUT",
            redirect: "follow"
        };

        fetch(`http://localhost:8094/usuario/update${endpoints[i]}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result) {
                    console.log(result);
                    alert(`${endpoints[i]} alterado com sucesso!`);
                }
            })
            .catch((error) => console.error(error));
    }

}

function alteraEmail() {
    var email = document.getElementById('email');
    if (email.value) {
        alterarAtributo(0, uid, email.value);
        email.value = "";
    } else {
        alert("Preencha o campo!");
    }

}

function alteraTel() {
    var telefone = document.getElementById('telefone');
    if (telefone.value) {
        alterarAtributo(1, uid, telefone.value);
        telefone.value = "";
    } else {
        alert("Preencha o campo!");
    }
}

function alteraSenha() {
    var senha = document.getElementById('senha');
    if (senha.value) {
        alterarAtributo(2, uid, senha.value);
        senha.value = "";
    } else {
        alert("Preencha o campo!");
    }
}