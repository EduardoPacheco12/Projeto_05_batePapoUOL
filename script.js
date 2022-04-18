let nomeUsuario = prompt("Que nome você deseja utilizar?");
const objetoNome = {name: `${nomeUsuario}`};
let arrayMensagens = [];
let armazenamentoMensagens = 0;

function solicitacaoEntradaServer() {
    const requisicaoPost = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', objetoNome);
    requisicaoPost.then(entrarServer);
    requisicaoPost.catch(tratarErro);
}

function tratarErro() {
    alert("Esse nome já está sendo utilizado, tente novamente");
    window.location.reload();
}

function entrarServer() {
    const logado = setInterval(manterConexao, 4000);
    const atualizacaoMensagens = setInterval(buscarMensagens, 3000);
}

function manterConexao() {
    const requisicaoPost = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', objetoNome);
}

function buscarMensagens() {
    const requisicaoGet = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    requisicaoGet.then(atualizarMensagens);
}

function atualizarMensagens(response) {
    arrayMensagens = response.data;
    console.log(arrayMensagens);
    armazenamentoMensagens = document.querySelector(".mensagens");
    armazenamentoMensagens.innerHTML = "";
    for (let i = 0; i < arrayMensagens.length; i++) {
        if (arrayMensagens[i].type === "message") {
            armazenamentoMensagens.innerHTML += `
            <div class="mensagem-chat">
                <p><span>(${arrayMensagens[i].time})</span> <strong>${arrayMensagens[i].from}</strong> para <strong>${arrayMensagens[i].to}</strong>: ${arrayMensagens[i].text}</p>
            </div>
            `;
        }
        if (arrayMensagens[i].type === "status") {
            armazenamentoMensagens.innerHTML += `
            <div class="notificacao-entrada-saida">
                <p><span>(${arrayMensagens[i].time})</span> <strong>${arrayMensagens[i].from}</strong> ${arrayMensagens[i].text}</p>
            </div>
            `
        }
        if (arrayMensagens[i].type === "private_message" && arrayMensagens[i].to === nomeUsuario) {
            armazenamentoMensagens.innerHTML += `
            <div class="mensagem-privada">
            <p><span>(${arrayMensagens[i].time})</span> <strong>${arrayMensagens[i].from}</strong> reservadamente para <strong>${arrayMensagens[i].to}}</strong>: ${arrayMensagens[i].text}</p>
            </div>
            `
        }
    }
    let ultimaPosicao = document.querySelector(".mensagens div:last-child");
    ultimaPosicao.scrollIntoView();
}

solicitacaoEntradaServer();