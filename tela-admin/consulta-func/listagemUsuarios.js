listar();

function listar() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const requestOptions = {
        headers: myHeaders,
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8094/usuario/listar", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            if(json.length !== 0){
                console.log(json)
                construirTabela(json);
            } else {
                alert('Consulta retornou vazia');
            }
        })
        .catch((error) => console.error(error));
}

function construirTabela(json){
    var table = document.getElementById('tabela');

    for (var i = 0; i < json.length; i++){
        var row = `<tr>
                        <th scope="row">${json[i].usuarioId}</th>
                        <td>${json[i].firstName} ${json[i].lastName}</td>
                        <td>${json[i].email}</td>
                        <td>${json[i].telefone}</td>
                        <td>
                            <div class="box-op">
                                <a href="" class="custom-icon" onclick="removerUsuario(${json[i].usuarioId})"><i class="fi fi-bs-cross"></i></a>
                            </div>
                        </td>
                   </tr>`
        table.innerHTML += row;
    }
}

function removerUsuario(usuarioId) {

    if (confirm(`Você realmente deseja remover o usuário com ID ${usuarioId}?`)) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(usuarioId);

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
                }
            })
            .catch((error) => console.error(error));
    }
}