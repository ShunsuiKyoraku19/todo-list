export function criaItemTarefa(conteudo, id, deletarTarefa) {
  const itemTarefa = document.createElement("li");
  itemTarefa.setAttribute("id", id);
  itemTarefa.classList.add("itemTarefa");
  itemTarefa.textContent = conteudo;

  const botaoRemover = criaBotaoRemover(deletarTarefa);
  itemTarefa.appendChild(botaoRemover);

  return itemTarefa;
}

export function criaBotaoRemover(deletarTarefa) {
  const botaoRemoverTarefa = document.createElement("button");
  botaoRemoverTarefa.textContent = "X";
  botaoRemoverTarefa.classList.add("btn-remover");
  botaoRemoverTarefa.addEventListener("click", deletarTarefa);

  return botaoRemoverTarefa;
}
