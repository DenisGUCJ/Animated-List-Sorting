const draggables = document.querySelectorAll('.draggable')
const container = document.querySelector('.draggable-container')
const plusButton = document.getElementById('plusButton')
const minusButton = document.getElementById('minusButton')
const buttons = document.querySelectorAll('.button')
const switches = document.querySelectorAll('.switch')
let timer = null
let delay = null
let _swap = true



buttons.forEach((button) => {

    button.addEventListener('click', (e) => {
        if (button.id == 'plusButton') {
            incrementDraggables()
        } else {
            decrementDrraggables()
        }
    })

    button.addEventListener('mousedown', (e) => {
        delay = setTimeout(() => {
            timer = setInterval(() => {
                if (button.id == 'plusButton') {
                    incrementDraggables()
                } else {
                    decrementDrraggables()
                }
            }, 10);
        }, 300)
    })

    button.addEventListener('mouseup', () => {
        console.log('Up')
        clearTimeout(delay)
        clearInterval(timer)
    })
})

for (var i = 0; i < 4; i++) {
    container.appendChild(createNewDraggable())
}

/*
plusButton.addEventListener('mousedown',(e)=>{
    console.log(plusButton.id)
    timer = setInterval(() => {
        console.log(e.type)
        onPlusButtonClicked()
    }, 100);
})

plusButton.addEventListener('mouseup',(e)=>{
    clearInterval(timer)
})
*/


/*
draggables.forEach(draggable => {
    addEventListernersToDraggable(draggable)
})
*/

container.addEventListener('dragover', (e) => {

    e.preventDefault();
    const dragging = document.querySelector('.dragging')
    const element = findCrossedElement(e.clientX, e.clientY)

    if (element != null) {

        if (_swap) {

            const afterDraggable = dragging.nextElementSibling
            const afterElement = element.nextElementSibling
            const boxDraggable = dragging.getBoundingClientRect()
            const boxElement = element.getBoundingClientRect()
            const offsetX = boxElement.left - boxDraggable.left
            const offsetY = boxElement.top - boxDraggable.top

            container.insertBefore(dragging, afterElement)
            container.insertBefore(element, afterDraggable)

            element.classList.add('animated')
            element.style.setProperty('--x', `${offsetX}px`)
            element.style.setProperty('--y', `${offsetY}px`)
        } else {

            const afterElement = element.nextElementSibling
            const afterDraggable = dragging.nextElementSibling

            container.insertBefore(dragging, afterElement)
            iterateThtoughDraggables(afterDraggable, dragging)


        }

    }

})

function iterateThtoughDraggables(start, end) {
    do {

    } while (start == end)
}


function findCrossedElement(x, y) {

    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging):not(.animated)')]
    let result = null
    draggableElements.forEach(element => {
        const box = element.getBoundingClientRect()
        if (x > box.left && x < box.right && y > box.top && y < box.bottom) {
            result = element
        }
    });

    return result
}

function incrementDraggables() {

    const N = container.childElementCount
    if (N < Math.pow(15, 2)) {
        const newDraggable = createNewDraggable()
        container.appendChild(newDraggable)
        changeGridSizes()
    }
}

function decrementDrraggables() {

    const N = container.childElementCount
    if (N == 0) return
    container.removeChild(container.lastChild)
    changeGridSizes()
}


function changeGridSizes() {

    const N = container.childElementCount
    var i = 0
    while (true) {
        if (N < 1) {
            break;
        }
        if (N > Math.pow(i, 2) && N <= Math.pow(i + 1, 2)) {
            const draggable = document.querySelector('.draggable')
            const box = draggable.getBoundingClientRect()
            container.style.setProperty('--N', `${i + 1}`)
            break;
        }
        i++;
    }
}

function resizeDraggables(height, width) {

    console.log({ height, width })

    draggables.forEach((draggable) => {

        draggable.classList.add('resize')
        draggable.style.setProperty('--width', `${width}px`)
        draggable.style.setProperty('--height', `${height}px`)
    })
}

function createNewDraggable() {

    const newDraggable = document.createElement("li")
    newDraggable.className = "draggable"
    newDraggable.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16)
    newDraggable.draggable = true

    addEventListernersToDraggable(newDraggable)
    newDraggable.classList.add('appended')

    return newDraggable
}

/*
function findPrevious(element) {
    do {
        element = element.previousSibling;
    } while (element && element.nodeType != 1)
    return element
}
*/

function addEventListernersToDraggable(draggable) {

    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })

    draggable.addEventListener('animationend', (e) => {
        console.log('END')
        console.log(e)
        draggable.classList.remove('animated')
        draggable.classList.remove('appended')

        //draggable.classList.remove('resize')
    })
}


