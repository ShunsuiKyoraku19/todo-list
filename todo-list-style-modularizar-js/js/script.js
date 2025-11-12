import { criaItemTarefa } from "./modules/manipulaDom.js";

let contadorIdsTarefas = 0;
const botaoAdicionarTarefa = document.getElementById("btn-add");
const inputTarefa = document.getElementById("task-input");
const containerListaTarefas = document.querySelector("ul");
let arrayTarefas = [];

botaoAdicionarTarefa.addEventListener("click", adicionarTarefa);

function salvarTarefasLocalstorage() {
  localStorage.setItem("Dados Tarefas", JSON.stringify(arrayTarefas));
}

function salvarIdLocalstorage() {
  localStorage.setItem("Contador do ID", JSON.stringify(contadorIdsTarefas));
}

function recebeValorInput() {
  return inputTarefa.value.trim();
}

function limpaValorInput() {
  inputTarefa.value = "";
}

function adicionarTarefa() {
  const conteudoTarefa = recebeValorInput();
  if (conteudoTarefa === "") {
    alert("Coloque uma tarefa válida");
    return;
  }

  contadorIdsTarefas += 1;

  const itemTarefa = criaItemTarefa(conteudoTarefa, contadorIdsTarefas, deletarTarefa);

  containerListaTarefas.appendChild(itemTarefa);

  const objetoTarefa = { conteudo: conteudoTarefa, id: String(contadorIdsTarefas) };
  arrayTarefas.push(objetoTarefa);

  limpaValorInput();
  salvarTarefasLocalstorage();
  salvarIdLocalstorage();
}

function deletarTarefa(evento) {
  const botao = evento.target;
  const itemTarefa = botao.parentNode;

  containerListaTarefas.removeChild(itemTarefa);

  arrayTarefas = arrayTarefas.filter((tarefa) => tarefa.id !== itemTarefa.id);

  salvarTarefasLocalstorage();
}

function resgatarTarefasLocalstorage() {
  const dadosArrayTarefas = JSON.parse(localStorage.getItem("Dados Tarefas")) || [];

  for (const atributo of dadosArrayTarefas) {
    const itemTarefa = criaItemTarefa(atributo.conteudo, atributo.id, deletarTarefa);
    itemTarefa.setAttribute("id", atributo.id);

    arrayTarefas.push({ conteudo: atributo.conteudo, id: atributo.id });
    containerListaTarefas.appendChild(itemTarefa);
  }
}

function resgatarContadorIdLocalstorage() {
  const contadorIdLocalstorage = JSON.parse(localStorage.getItem("Contador do ID"));
  contadorIdsTarefas = contadorIdLocalstorage || 0;
  console.log("Contador de IDs restaurado:", contadorIdsTarefas);
}

resgatarTarefasLocalstorage();
resgatarContadorIdLocalstorage();
