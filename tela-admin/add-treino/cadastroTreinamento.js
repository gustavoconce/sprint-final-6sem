function cadastrar() {
    var nome = document.getElementById('nome').value;
    var horas = parseInt(document.getElementById('horas').value);
    var dataLancamento = document.getElementById('dataLancamento').value;
    var relevancia = document.getElementById('relevancia').value;
    var descricao = document.getElementById('descricao').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "treinamentoId": null,
        "nome": nome,
        "horas": horas,
        "dataLancamento": dataLancamento,
        "relevancia": relevancia,
        "descricao": descricao
    });
    console.log(raw);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    if (nome === "" || isNaN(horas) || dataLancamento === "" || relevancia === "Selecione uma opção" || descricao === "") {
        alert('Preencha todos os campos!')
    } else {
        fetch("http://localhost:8094/treinamento/cadastrar", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert(`${nome} cadastrado com sucesso!`);
                location.href = '../index.html';
            })
            .catch((error) => console.error(error));
    }
}