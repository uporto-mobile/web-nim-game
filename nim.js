function criarItems(colNum) {
    const colItems = document.createElement("span")
    colItems.className = "column"
    for (let index = 0; index < colNum; index++) {
        const item = document.createElement("div")
        item.id = `${index}`
        const image = document.createElement("img")
            // TODO: Mudar aqui para escolher a imagem
        image.src = "img.png"
        item.appendChild(image)
        item.appendChild(image)
        colItems.appendChild(item)
    }
    colItems.addEventListener("click", removeItems)

    return colItems
}

function criarColunas(numberOfColumns, boardElement) {
    for (let index = 0; index < numberOfColumns; index++) {
        const element = criarItems(index);
        console.log(element.children);
        boardElement.appendChild(element)
    }
}


function removeItems(event) {
    console.log(event);
    const targetElement = event.target.parentElement
    const columnElement = event.target.parentElement.parentElement

    for (const item of Array.from(columnElement.children)) {
        if (Number(targetElement.id) <= Number(item.id)) {
            columnElement.removeChild(item)
        }
    }
}

window.onload = () => {
    const element = document.getElementById("tabuleiro")
    criarColunas(6, element)
}