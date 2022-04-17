let nomeUsuario = prompt("Que nome você deseja utilizar?");
const objetoNome = {name: `${nomeUsuario}`};

function entrarServer() {
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', objetoNome);
    console.log(requisicao);
    requisicao.then(adicionarNotificaçãoEntrada);
    requisicao.catch(tratarErro);
}

function tratarErro() {
    alert("Esse nome já está sendo utilizado, tente novamente");
    window.location.reload();
}

function adicionarNotificaçãoEntrada() {
    const logado = setInterval(manterConexao, 4000);
}

function manterConexao() {
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', objetoNome);
}

entrarServer();