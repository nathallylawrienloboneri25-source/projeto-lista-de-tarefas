
const botaoAdicionar = document.getElementById("botaoAdicionar");
const input = document.getElementById("tarefaInput");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

botaoAdicionar.addEventListener("click", adicionarTarefa);

function adicionarTarefa() {

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const tarefa = document.createElement("li");

    tarefa.innerHTML = `
        <span>${texto}</span>
        <button class="excluir">Excluir</button>
    `;

    tarefa.querySelector("span").addEventListener("click", function () {
        tarefa.classList.toggle("concluida");
        atualizarContador();
    });

    tarefa.querySelector(".excluir").addEventListener("click", function () {
        tarefa.remove();
        atualizarContador();
    });

    lista.appendChild(tarefa);

    input.value = "";

    atualizarContador();
}

function atualizarContador() {

    const tarefas = document.querySelectorAll("#listaTarefas li");

    let pendentes = 0;

    tarefas.forEach(function (tarefa) {

        if (!tarefa.classList.contains("concluida")) {
            pendentes++;
        }

    });

    contador.textContent = "Tarefas pendentes: " + pendentes;
}
