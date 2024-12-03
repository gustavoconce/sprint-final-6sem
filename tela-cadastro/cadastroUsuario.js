function cadastrar() {

    var nome = document.getElementById('register-name').value;
    var pass = document.getElementById('register-pass').value;
    var lastname = document.getElementById('register-lastname').value;
    var email = document.getElementById('register-email').value;
    var tel = document.getElementById('register-tel').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "usuarioId": null,
        "firstName": nome,
        "lastName": lastname,
        "email": email,
        "telefone": tel,
        "senha": pass
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    if(nome === "" || pass === "" || lastname === "" || email === "" || tel === ""){
        alert('Preencha todos os campos!')
    } else {
        fetch("http://localhost:8094/usuario/cadastrar", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert(`Usuário ${nome} ${lastname} cadastrado com sucesso!`);
                location.href = '../tela-login/index.html';
            })
            .catch((error) => console.error(error));
    }

}