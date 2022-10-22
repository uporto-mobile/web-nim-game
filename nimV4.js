//Falta definir os textos´
function rules() {
    alert('Rules Here:')
}

function rankings(rankings) {
    alert('rankings here:')
}

function clearTable(table) {
    table.innerHTML = "";
}

function setColumn(numColumn, column) {
    for (let i = 0; i < numColumn; i++) {
        const item = document.createElement('div')
        item.className = 'point'
        item.id = `${i}`
        column.appendChild(item)
    }
}

function setTable(table, numColumns) {
    clearTable(table)
    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div')
        column.className = 'column'
        column.id = `${i}`
        setColumn(i+1, column)
        table.appendChild(column)
    }
}

//returns P1 or P2 -> P1: user; P2: opponent
function getFirstMove() {
    let opts = document.getElementsByName('firstMove')
    for (i=0; i < opts.length; i++) {
        if (opts[i].checked) {
            return opts[i].value
        }
    }
}

//returns 0 or 1 -> 0: IA; 1: person
function getVs() {
    let opts = document.getElementsByName('vs')
    for (i=0; i < opts.length; i++) {
        if (opts[i].checked) {
            return opts[i].value
        }
    }
}

//returns 0, 1, 2, 3 -> 0 easier to 4 harder
function getDiff() {
    let opts = document.getElementsByName('diff')
    for (i=0; i < opts.length; i++) {
        if (opts[i].checked) {
            return opts[i].value
        }
    }
}

function setItemEvent(table) {
    for (const col of Array.from(table.children)) {
        for (const item of Array.from(col.children)) {
            item.addEventListener('mouseover', over)
            item.addEventListener('mouseout', out)
            item.addEventListener('click', delElements)
        }
    }
}

function delItemEvent(table) {
    for (const col of Array.from(table.children)) {
        for (const item of Array.from(col.children)) {
            item.removeEventListener('mouseover', over)
            item.removeEventListener('mouseout', out)
            item.removeEventListener('click', delElements)
        }
    }
}

function over(event) {
    const tItem = event.target
    const column = event.target.parentElement

    for (const item of Array.from(column.children)) {
        if (Number(tItem.id) <= Number(item.id)) {
                item.style.background = 'red' 
        }
    }
}

function out(event) {
    const tItem = event.target
    const column = event.target.parentElement

    for (const item of Array.from(column.children)) {
        if (Number(tItem.id) <= Number(item.id)) {
                item.style.background = 'green'        
        }
    }
}

function delElements(event) {
    const tItem = event.target
    const column = event.target.parentElement

    for (const item of Array.from(column.children)) {
        if (Number(tItem.id) <= Number(item.id)) {
            column.removeChild(item)
        }
    }
}

function emptyColumn(column) {
    if (column.children.length == 0) {
        return true
    }
    return false
}

function emptyTable(table) {
    for (const col of Array.from(table.children)) {
        if (emptyColumn(col) == false) {
            return false
        }
    }
    return true
}

function end(table) {
    if (emptyTable(table)) {
        console.log('vazio')
    }
    console.log('ainda tem')
}

//---------------Já acabados e em progresso-----------------------------------------

let ranking = []
//A definir
/*
function setRank(rank, res) {
    if (rank.length >= 10) {
        rank.deleteFirstItem()
    }
    rank.appendChild(res)
    return rank
}
*/

function playerMove(table) {
    setItemEvent(table)
    //joga
    delItemEvent(table)

}

function iaMove(table, difficulty) {
    //case difficulty x
    //joga
}

function start() {
    const table = document.getElementById('table')
    const numCols = document.getElementById('numCol').value
    let move = getFirstMove()
    const vs = getVs()
    const difficulty = getDiff()

    setTable(table, numCols)

    do {
        if (move == 'P1') {
            playerMove()
        } else {
            iaMove()
        }
    } while (end != true);



    //setRank(rankings, res)
}
