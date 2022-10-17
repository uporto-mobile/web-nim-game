function criarItems(colNum) {
    const colItems = document.createElement("span")
    colItems.className = "column"
    for (let index = 0; index < colNum; index++) {
        const el0 = document.createElement("div")
        el0.id = `  ${index}`
        const element = document.createElement("img")
        element.alt = "0"
        el0.appendChild(element)
        el0.appendChild(element)
        colItems.appendChild(el0)
    }
    colItems.addEventListener("click", removeItems)

    return colItems
}

function criarColunas(numberOfColumns, boardElement) {
    for (let index = 1; index < numberOfColumns + 1; index++) {
        const element = criarItems(index);
        console.log(element.children);
        boardElement.appendChild(element)
    }
}




function generateBoard(numberOfColumns, boardElement) {
    criarColunas(numberOfColumns, boardElement)
    boardElement.appendChild(columns)
}


function removeItems(event) {
    console.log(event);
    const targetElement = event.target.parentElement
    const columnElement = event.target.parentElement.parentElement
    const childrens = columnElement.children
    for (const item of columnElement.children) {
        if (Number(targetElement.id) <= Number(item.id))
            columnElement.removeChild(item)

    }
    childrens.splice(targetElement.id, childrens.lenght - targetElement.id)
}

window.onload = () => {
    const element = document.getElementById("tabuleiro")
    generateBoard(6, element)
}