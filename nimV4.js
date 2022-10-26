var rankings = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']


//show rules WIP
function showRules() {
    const table = document.getElementById('table')
    const game = table.innerHTML
    const divRules = document.createElement('div')
    rules = 'Ganha o último jogador a retirar uma peça do tabuleiro. Pode retirar uma ou mais peças, somente de um monte'
    divRules.innerText = rules

    clearTable(table)
    table.appendChild(divRules)

    const btn = document.createElement('button')
    btn.innerText = 'voltar'
    btn.addEventListener('click', function() {
        clearTable(table)
        table.innerHTML = game
        setItemEvent(table)

    })
    table.appendChild(btn)
}

//set rank list
function setRank(rank, res) {
    for (i = 9; i > 0; i--) {
        rank[i] = rank[i - 1]
    }
    rank[0] = res
}

//show ranks WIP
function showRankings() {
    let rank = rankings
    const table = document.getElementById('table')
    const game = table.innerHTML

    clearTable(table)
    for (i = 0; i < rank.length; i++) {
        item = document.createElement('p')
        item.innerHTML = `${i+1}-${rank[i]}; `
        table.appendChild(item)
    }
    const btn = document.createElement('button')
    btn.innerText = 'voltar'
    btn.addEventListener('click', function() {
        clearTable(table)
        table.innerHTML = game
        setItemEvent(table)
    })
    table.appendChild(btn)
}

//removes #table content
function clearTable(table) {
    table.innerHTML = "";
}

//builds column
function setColumn(numColumn, column) {
    for (let i = 0; i < numColumn; i++) {
        const item = document.createElement('div')
        item.className = 'point'
        item.id = `${i}`
        column.appendChild(item)
    }
}

//builds NIM table
function setTable(table, numColumns) {
    clearTable(table)
    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div')
        column.className = 'column'
        column.id = `${i}`
        setColumn(i + 1, column)
        table.appendChild(column)
    }
}

//checks if column is empty
function emptyColumn(column) {
    if (column.children.length == 0) {
        return true
    }
    return false
}

//checks if board is empty
function emptyTable(table) {
    for (const col of Array.from(table.children)) {
        if (emptyColumn(col) == false) {
            return false
        }
    }
    return true
}

//returns str P1 or P2 -> P1: user; P2: opponent
function getFirstMove() {
    let opts = document.getElementsByName('firstMove')
    for (i = 0; i < opts.length; i++) {
        if (opts[i].checked) {
            return opts[i].value
        }
    }
}

//returns str 0 or 1 -> 0: IA; 1: person
function getVs() {
    let opts = document.getElementsByName('vs')
    for (i = 0; i < opts.length; i++) {
        if (opts[i].checked) {
            return opts[i].value
        }
    }
}

//returns str 0, 1, 2, 3 -> 0 easier to 4 harder
function getDiff() {
    let opts = document.getElementsByName('diff')
    for (i = 0; i < opts.length; i++) {
        if (opts[i].checked) {
            return opts[i].value
        }
    }
}

//gives interability
function setItemEvent(table) {
    for (const col of Array.from(table.children)) {
        for (const item of Array.from(col.children)) {
            item.addEventListener('mouseover', over)
            item.addEventListener('mouseout', out)
            item.addEventListener('click', delElementsEvent)
        }
    }
}

//removes interability
function delItemEvent(table) {
    for (const col of Array.from(table.children)) {
        for (const item of Array.from(col.children)) {
            item.removeEventListener('mouseover', over)
            item.removeEventListener('mouseout', out)
            item.removeEventListener('click', delElementsEvent)
        }
    }
}

//red color item
function over(event) {
    const tItem = event.target
    const column = event.target.parentElement

    for (const item of Array.from(column.children)) {
        if (Number(tItem.id) <= Number(item.id)) {
            item.style.background = 'red'
        }
    }
}

//returns item green
function out(event) {
    const tItem = event.target
    const column = event.target.parentElement

    for (const item of Array.from(column.children)) {
        if (Number(tItem.id) <= Number(item.id)) {
            item.style.background = 'green'
        }
    }
}


function delElements(tItem, column) {
    for (const item of Array.from(column.children)) {
        if (Number(tItem.id) <= Number(item.id)) {
            column.removeChild(item)
        }
    }
}

function delElementsEvent(event) {
    const tItem = event.target
    const column = event.target.parentElement
    delElements(tItem, column)
    const table = document.getElementById('table')
    if (emptyTable(table)) {
        console.log('vazio por mim')
        end('W')
    } else {
        delItemEvent(table)
        iaMove(table, getDiff())
    }
}

function iaDelElements(tItem, column) {
    for (const item of Array.from(column.children)) {
        if (Number(tItem.id) <= Number(item.id)) {
            column.removeChild(item)
        }
    }
}


function iaDelElementsEvent(event) {
    const tItem = event.target
    const column = event.target.parentElement
    iaDelElements(tItem, column)
    const table = document.getElementById('table')
}


//control of difficulty
function iaMove(table, difficulty) {
    switch (difficulty) {
        case '0':
            iaRMove(table)
            break;
        case '1':
            const chance1 = Math.floor(Math.random() * 7 + 1)
            if (chance1 == 1) {
                iaCMove(table)
            } else {
                iaRMove(table)
            }
            break;
        case '2':
            const chance2 = Math.floor(Math.random() * 2 + 1)
            if (chance2 == 1) {
                iaCMove(table)
            } else {
                iaRMove(table)
            }
            break;
        case '3':
            iaCMove(table)
            break;
    }
    if (emptyTable(table)) {
        console.log('vazio por op')
        end('L')
    } else {
        setItemEvent(table)
    }
}

//starts game
function startGame() {
    const table = document.getElementById('table')
    const numCols = document.getElementById('numCol').value
    let move = getFirstMove()
    const vs = getVs()
    const difficulty = getDiff()

    setTable(table, numCols)
    if (move == 'P1') {
        setItemEvent(table)
    } else {
        iaMove(table, difficulty)
    }
}

//---------------Já acabados e em progresso-----------------------------------------

/**
 * @param {HTMLElement} table The table
 */
function iaRMove(table) {
    /** @type {NodeListOf<HTMLElement>} */
    const childrens = table.childNodes

    const columns_not_empty_arr = []
    for (const col of Array.from(table.children)) {
        if (emptyColumn(col) == false) {
            columns_not_empty_arr.push(col)
        }
    }

    const selected_column = columns_not_empty_arr[Math.floor(Math.random() * columns_not_empty_arr.length)]
    const column_items = selected_column.childNodes
    const randNum = Math.floor(Math.random() * column_items.length)
        /** @type {HTMLElement} */
    const ball = column_items.item(randNum)
    console.log(column_items, randNum, column_items);
    iaDelElements(ball, selected_column)
}

function iaCMove(table) {
    console.log('fui cal')
}

function end(result) {
    switch (result) {
        case 'W':
            window.alert('You won')
            setRank(rankings, 'WIN')
            break;

        case 'L':
            window.alert('You lost')
            setRank(rankings, 'LOSE')
            break;
    }
    table = document.getElementById('table')
    btn = document.createElement('button')
    btn.id = 'play'
    btn.addEventListener('click', startGame)
    btn.innerText = 'JOGAR'

    clearTable(table)
    table.appendChild(btn)
}