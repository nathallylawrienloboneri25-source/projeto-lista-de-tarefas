function adicionarTarefa() {

    const input = document.getElementById("tarefaInput");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const lista = document.getElementById("listaTarefas");

    const novaTarefa = document.createElement("li");

    novaTarefa.innerHTML = `
        <span>${texto}</span>
        <button class="excluir" onclick="excluirTarefa(this)">
            Excluir
        </button>
    `;

    novaTarefa.addEventListener("click", function(event) {

        if (event.target.tagName !== "BUTTON") {
            novaTarefa.classList.toggle("concluida");
            atualizarContador();
        }

    });

    lista.appendChild(novaTarefa);

    input.value = "";

    atualizarContador();
}


function excluirTarefa(botao) {

    botao.parentElement.remove();

    atualizarContador();
}


function atualizarContador() {

    const tarefas = document.querySelectorAll("#listaTarefas li");

    let pendentes = 0;

    tarefas.forEach(function(tarefa) {

        if (!tarefa.classList.contains("concluida")) {
            pendentes++;
        }

    });

    document.getElementById("contador").textContent =
        "Tarefas pendentes: " + pendentes;
}
