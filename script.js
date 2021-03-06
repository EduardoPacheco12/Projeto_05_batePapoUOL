let nomeUsuario = prompt("Que nome você deseja utilizar?");
const objetoNome = {name: `${nomeUsuario}`};
let arrayMensagens = [];
let armazenamentoMensagens = 0;

function solicitacaoEntradaServer() {
    const requisicaoPost = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', objetoNome);
    requisicaoPost.then(entrarServer);
    requisicaoPost.catch(tratarErroEntrada);
}

function tratarErroEntrada() {
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

function enviarMensagem() {
    let valorDigitado = document.querySelector("input").value;
    if (valorDigitado === "") {
        alert("Digite algo pra mensagem ser enviada");
    } else {
        const objetoMensagem = {from: `${nomeUsuario}`, to: "Todos", text: `${valorDigitado}`, type: "message" };
        const requisicaoPost = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objetoMensagem);
        buscarMensagens();
        requisicaoPost.catch(tratarErroEnvio);
    }

}

function tratarErroEnvio() {
    alert("Usuário não está mais logado, favor refazer o login");
    window.location.reload();
}

document.addEventListener("keydown", function(e) {
    if(e.keyCode === 13) {
        enviarMensagem();
    }
});



solicitacaoEntradaServer();