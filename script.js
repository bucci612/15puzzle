const puzzleBoard = document.getElementById("puzzle-board");
const levelButtons = Array.from(document.querySelectorAll("#level-buttons button"));

let cells = [];
let gridSize = 4;

function createBoard(size) {
    gridSize = size;
    puzzleBoard.innerHTML = "";
    cells = [];

    puzzleBoard.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    puzzleBoard.style.gridTemplateRows = `repeat(${size}, 100px)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (i < size * size - 1) {
            cell.textContent = i + 1;
        } else {
            cell.classList.add("empty");
        }
        cell.addEventListener("click", moveCell);
        puzzleBoard.appendChild(cell);
        cells.push(cell);
    }
    shuffle();
}

function moveCell(e) {
    const emptyIndex = cells.findIndex((cell) => cell.classList.contains("empty"));
    const clickedIndex = cells.indexOf(e.target);

    const [emptyRow, emptyCol] = [Math.floor(emptyIndex / gridSize), emptyIndex % gridSize];
    const [clickedRow, clickedCol] = [Math.floor(clickedIndex / gridSize), clickedIndex % gridSize];

    if (Math.abs(emptyRow - clickedRow) + Math.abs(emptyCol - clickedCol) === 1) {
        [cells[emptyIndex].textContent, cells[clickedIndex].textContent] = [cells[clickedIndex].textContent, cells[emptyIndex].textContent];
        cells[emptyIndex].classList.toggle("empty");
        cells[clickedIndex].classList.toggle("empty");
    }

    if (isSolved()) {
        alert("おめでとうございます！パズルを解決しました。");
    }
}

function shuffle() {
    for (let i = 0; i < 1000; i++) {
        const randomIndex = Math.floor(Math.random() * (gridSize * gridSize - 1));
        const emptyIndex = cells.findIndex((cell) => cell.classList.contains("empty"));

        const [emptyRow, emptyCol] = [Math.floor(emptyIndex / gridSize), emptyIndex % gridSize];
        const [randomRow, randomCol] = [Math.floor(randomIndex / gridSize), randomIndex % gridSize];

        if (Math.abs(emptyRow - randomRow) + Math.abs(emptyCol - randomCol) === 1) {
            [cells[emptyIndex].textContent, cells[randomIndex].textContent] = [cells[randomIndex].textContent, cells[emptyIndex].textContent];
            cells[emptyIndex].classList.toggle("empty");
            cells[randomIndex].classList.toggle("empty");
        }
    }
}

function isSolved() {
    for (let i = 0; i < gridSize * gridSize - 1; i++) {
        if (cells[i].textContent != i + 1) {
            return false;
        }
    }
    return true;
}

levelButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        createBoard(index + 3);
    });
});

createBoard(gridSize);
