function logar() {

    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;
    var admin = document.getElementById('admin').checked;

    console.log(login);
    console.log(senha);
    console.log(admin);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": login,
        "senha": senha
    });

    console.log(raw);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    if (admin) {
        fetch("http://localhost:8094/administrador/login", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result) {
                    var json = JSON.parse(result);
                    sessionStorage.setItem("id", json.administradorId);
                    location.href = '../tela-admin/index.html';
                } else {
                    alert('Login ou senha inválidos!');
                }
            })
            .catch((error) => console.error(error));
    } else {
        fetch("http://localhost:8094/usuario/login", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result) {
                    var json = JSON.parse(result);
                    sessionStorage.setItem("id", json.usuarioId);
                    location.href = '../tela-funcionario/index.html';
                } else {
                    alert('Login ou senha inválidos!');
                }
            })
            .catch((error) => console.error(error));
    }

}