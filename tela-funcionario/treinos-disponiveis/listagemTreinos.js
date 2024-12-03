listar();

function listar() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        headers: myHeaders,
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:8094/treinamento/listar", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            if (json.length !== 0) {
                console.log(json);
                construirCard(json);
            } else {
                var div = document.getElementById('treinamentos');
                var row = `<div class="box-title">
                                <h2 class="title-card">Não há nenhum treinamento lançado no momento</h2>
                           </div>`
                div.innerHTML += row;
            }
        })
        .catch((error) => console.error(error));
}

function construirCard(json) {
    var div = document.getElementById('treinamentos');

    for (var i = 0; i < json.length; i++) {
        var row = `<div class="card-treino">

            <div class="linehead"></div>
            <div class="box-title">
                <h2 class="title-card">${json[i].nome}</h2>
            </div>

            <div class="box-body">
                <h4 class="h4-body">Duração: <span class="h4-body-span">${json[i].horas} horas</span></h4>
                <h4 class="h4-body">Data de lançamento: <span class="h4-body-span">${json[i].dataLancamento}</span></h4>
                <h4 class="h4-body">Relevância: <span class="h4-body-span">${json[i].relevancia}</span></h4>
                <h4 class="h4-body">Descrição: <span class="h4-body-span">${json[i].descricao}</span></h4>
            </div>

            <div class="box-btn">
                <a href="" class="btn">Começar treinamento</a>
            </div>
        </div>`
        div.innerHTML += row;
    }
}