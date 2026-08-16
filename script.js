const botaoAdicionar = document.getElementById("botaoAdicionar");
const input = document.getElementById("tarefaInput");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const mensagemVazia = document.getElementById("mensagemVazia");

botaoAdicionar.addEventListener("click", adicionarTarefa);

input.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

function adicionarTarefa() {

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        input.focus();
        return;
    }

    criarTarefa(texto, false);

    input.value = "";

    input.focus();

    salvarTarefas();

    atualizarContador();
    atualizarEstatisticas();
}

function criarTarefa(texto, concluida) {

    const tarefa = document.createElement("li");

    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = texto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "excluir";

    tarefa.appendChild(textoTarefa);
    tarefa.appendChild(botaoExcluir);

    if (concluida) {
        tarefa.classList.add("concluida");
    }

    textoTarefa.addEventListener("click", function () {

        tarefa.classList.toggle("concluida");

        salvarTarefas();
        atualizarContador();
        atualizarEstatisticas();
    });

    botaoExcluir.addEventListener("click", function () {

        tarefa.remove();

        salvarTarefas();
        atualizarContador();
        atualizarEstatisticas();
    });

    lista.appendChild(tarefa);
}

function atualizarContador() {

    const tarefas = lista.querySelectorAll("li");

    let pendentes = 0;

    tarefas.forEach(function (tarefa) {

        if (!tarefa.classList.contains("concluida")) {
            pendentes++;
        }

    });

    contador.textContent = "Tarefas pendentes: " + pendentes;

    atualizarMensagem();
}

function atualizarMensagem() {

    const tarefas = lista.querySelectorAll("li");

    if (tarefas.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }
}

function salvarTarefas() {

    const tarefas = [];

    lista.querySelectorAll("li").forEach(function (tarefa) {

        tarefas.push({
            texto: tarefa.querySelector("span").textContent,
            concluida: tarefa.classList.contains("concluida")
        });

    });

    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {

    const tarefasSalvas = localStorage.getItem("minhasTarefas");

    if (tarefasSalvas) {

        const tarefas = JSON.parse(tarefasSalvas);

        tarefas.forEach(function (tarefa) {
            criarTarefa(tarefa.texto, tarefa.concluida);
        });
    }

    atualizarContador();
    atualizarEstatisticas();
}

function atualizarEstatisticas() {

    const tarefas = lista.querySelectorAll("li");
    const concluidas = lista.querySelectorAll("li.concluida");

    document.getElementById("totalTarefas").textContent = tarefas.length;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas.length;

    document.getElementById("tarefasPendentes").textContent =
        tarefas.length - concluidas.length;
}

carregarTarefas();
