let contadorIdsTarefas = 0;
const botaoAdicionarTarefa = document.querySelector(".btn-add") 
const inputTarefa = document.querySelector("input") 
const containerListaTarefas = document.querySelector("ul") 
let arrayTarefas = []


botaoAdicionarTarefa.addEventListener("click", adicionarTarefa) 

function salvarTarefasLocalstorage(){
    localStorage.setItem("Dados Tarefas", JSON.stringify(arrayTarefas))
}

function salvarIdLocalstorage(){
    localStorage.setItem("Contador do ID", JSON.stringify(contadorIdsTarefas))
}

function recebeValorInput(){
    return inputTarefa.value.trim() 
}

function limpaValorInput(){
    inputTarefa.value = ''
}

function criaBotaoRemover(){
    const botaoRemoverTarefa = document.createElement("button")
    botaoRemoverTarefa.textContent = "X"
    botaoRemoverTarefa.classList.add("btn-remover")
    botaoRemoverTarefa.addEventListener("click", deletarTarefa)
    return botaoRemoverTarefa
}

function criaItemTarefa(conteudo){
    let itemTarefa = document.createElement("li")
    itemTarefa.setAttribute('id', contadorIdsTarefas)
    itemTarefa.setAttribute("class", "itemTarefa")
    itemTarefa.textContent = conteudo
    const botaoRemoverTarefa = criaBotaoRemover()
    itemTarefa.appendChild(botaoRemoverTarefa)
    return itemTarefa
}


function adicionarTarefa(){
    const conteudoTarefa = recebeValorInput()
    if(conteudoTarefa === ''){
        alert("Coloque uma tarefa válida")
        return
    } 
    contadorIdsTarefas += 1;
    const itemTarefa = criaItemTarefa(conteudoTarefa)
    containerListaTarefas.appendChild(itemTarefa)
    let objetoTarefa = {conteudo: conteudoTarefa, id: String(contadorIdsTarefas)}
    arrayTarefas.push(objetoTarefa)
    limpaValorInput()
    salvarTarefasLocalstorage()
    salvarIdLocalstorage()
}

function deletarTarefa(evento){
    const botao = evento.target;
    const itemTarefa = botao.parentNode;
    containerListaTarefas.removeChild(itemTarefa)
    arrayTarefas = arrayTarefas.filter(tarefa => tarefa.id !== itemTarefa.id)
    salvarTarefasLocalstorage()
}

function resgatarTarefasLocalstorage(){
    const dadosArrayTarefas = JSON.parse(localStorage.getItem("Dados Tarefas"))
    for (const atributo of dadosArrayTarefas){
        const itemTarefa = criaItemTarefa(atributo.conteudo)
        itemTarefa.setAttribute("id", atributo.id)
        const objetoTarefa = {conteudo: atributo.conteudo, id: atributo.id}
        arrayTarefas.push(objetoTarefa)
        containerListaTarefas.appendChild(itemTarefa)
    }
}

function resgatarContadorIdLocalstorage(){
    const contadorIdLocalstorage = JSON.parse(localStorage.getItem("Contador do ID"))
    contadorIdsTarefas = contadorIdLocalstorage
    console.log(contadorIdsTarefas)
}



resgatarTarefasLocalstorage()
resgatarContadorIdLocalstorage()



