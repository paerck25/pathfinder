let container = document.getElementById('container');
let start;
let end;
let arr = [];
let x1 = 10;
let x2 = 8;
let y1 = 10;
let y2 = 12;

function dragWall(ev) {
    ev.preventDefault();
    if (!(ev.target.classList.contains('startPoint')) && !(ev.target.classList.contains('endPoint'))) {
        ev.target.classList.add('wall');
    }
}

function reamoveWall(e) {
    if (!(e.target.classList.contains('startPoint')) && !(e.target.classList.contains('endPoint'))) {
        e.target.classList.toggle('wall');
    }
}

function createGrid(x, y) {
    let hang;
    let ryul
    for (hang = 0; hang < x; hang++) {
        arr.push(new Array());
        for (ryul = 0; ryul < y; ryul++) {
            let div = document.createElement('div');
            div.className = `grid`;
            div.setAttribute('draggable', true);
            div.setAttribute('hang', hang);
            div.setAttribute('ryul', ryul);
            div.addEventListener('dragover', dragWall);
            div.addEventListener('click', reamoveWall);
            arr[hang][ryul] = div;
            container.appendChild(arr[hang][ryul]);
        };
    };
};

function defaultWall() {
    for (let x = 0; x < 80; x++) {
        arr[0][x].classList.add('wall');
        arr[39][x].classList.add('wall');
    }
    for (let i = 0; i < 40; i++) {
        arr[i][0].classList.add('wall');
        arr[i][79].classList.add('wall');
    }
}


function setStartPoint(x, y) {
    start = arr[x][y];
    start.classList.add('startPoint');
}

function setEndPoint(x, y) {
    end = arr[x][y];
    end.classList.add('endPoint');
}

function RandomPosition() {
    x1 = parseInt(Math.random() * 38) + 1
    x2 = parseInt(Math.random() * 38) + 1
    y1 = parseInt(Math.random() * 78) + 1
    y2 = parseInt(Math.random() * 78) + 1
    resetPoint();
    setStartPoint(x1, y1);
    setEndPoint(x2, y2);
}

function createRandomWall() {
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 39; i++) {
            if (!(arr[i][parseInt(Math.random() * 79)].classList.contains('endPoint'))) {
                arr[i][parseInt(Math.random() * 79)].classList.add('wall');
            } else {
                return;
            }
        }
    }
}

function huristic(sx, sy) {
    let a = Math.abs(x2 - sx);
    let b = Math.abs(y2 - sy)
    return (a + b) * 10;
}



function indexOfArray(ary, item) {
    for (let i = 0; i < ary.length; i++) {
        if (ary[i].node === item) {
            return i;
        }
    }
}

function searchOfArrayObj(ary, item1) {
    for (let i = 0; i < ary.length; i++) {
        if (ary[i].node === item1) {
            return true;
        }
    }
    return false;
}



function resetPoint() {
    for (let hang = 1; hang < 39; hang++) {
        for (let ryul = 1; ryul < 79; ryul++) {
            arr[hang][ryul].classList.remove('startPoint');
            arr[hang][ryul].classList.remove('endPoint');
            arr[hang][ryul].classList.remove('wall');
            arr[hang][ryul].classList.remove('path');
            arr[hang][ryul].classList.remove('searchPath');
        };
    };
}
let stopInterval;

function findPath() {
    let openList = [];
    let closeList = [];
    let pathList = [];
    let currentNode;
    const startNode = { node: arr[x1][y1], x: x1, y: y1, f: 0, g: 0 }
    const endNode = { node: arr[x2][y2], x: x2, y: y2, f: 0, g: 0 }
    openList.push(startNode);
    function aStar() {
        openList.sort(function (a, b) {
            return a.f - b.f;
        })
        currentNode = openList.shift();

        closeList.push(currentNode);

        if (openList.length > 0) {
            pathList.push(currentNode);
        }

        let rightNode = { node: arr[currentNode.x][currentNode.y + 1], x: currentNode.x, y: currentNode.y + 1, f: currentNode.g + 10 + huristic(currentNode.x, currentNode.y + 1), g: currentNode.g + 10, parent: currentNode.node }
        let leftNode = { node: arr[currentNode.x][currentNode.y - 1], x: currentNode.x, y: currentNode.y - 1, f: currentNode.g + 10 + huristic(currentNode.x, currentNode.y - 1), g: currentNode.g + 10, parent: currentNode.node }
        let downNode = { node: arr[currentNode.x + 1][currentNode.y], x: currentNode.x + 1, y: currentNode.y, f: currentNode.g + 10 + huristic(currentNode.x + 1, currentNode.y), g: currentNode.g + 10, parent: currentNode.node }
        let upNode = { node: arr[currentNode.x - 1][currentNode.y], x: currentNode.x - 1, y: currentNode.y, f: currentNode.g + 10 + huristic(currentNode.x - 1, currentNode.y), g: currentNode.g + 10, parent: currentNode.node }
        let rightDownNode = { node: arr[currentNode.x + 1][currentNode.y + 1], x: currentNode.x + 1, y: currentNode.y + 1, f: (currentNode.g + 14) + huristic(currentNode.x + 1, currentNode.y + 1), g: currentNode.g + 14, parent: currentNode.node }
        let leftUpNode = { node: arr[currentNode.x - 1][currentNode.y - 1], x: currentNode.x - 1, y: currentNode.y - 1, f: (currentNode.g + 14) + huristic(currentNode.x - 1, currentNode.y - 1), g: currentNode.g + 14, parent: currentNode.node }
        let leftDownNode = { node: arr[currentNode.x + 1][currentNode.y - 1], x: currentNode.x + 1, y: currentNode.y - 1, f: (currentNode.g + 14) + huristic(currentNode.x + 1, currentNode.y - 1), g: currentNode.g + 14, parent: currentNode.node }
        let rightUpNode = { node: arr[currentNode.x - 1][currentNode.y + 1], x: currentNode.x - 1, y: currentNode.y + 1, f: (currentNode.g + 14) + huristic(currentNode.x - 1, currentNode.y + 1), g: currentNode.g + 14, parent: currentNode.node }

        if ((upNode.x != 0) && (rightNode.y != 79) && !(rightUpNode.node.classList.contains('startPoint')) && !(upNode.node.classList.contains('wall')) && !(rightNode.node.classList.contains('wall')) && !(rightUpNode.node.classList.contains('wall')) && !(rightUpNode.node.classList.contains('searchPath')) && !(closeList.includes(rightUpNode.node))) {
            if (searchOfArrayObj(openList, rightUpNode.node)) {
                const index = indexOfArray(openList, rightUpNode.node);
                if (openList[index].g > rightUpNode.g) {
                    openList[index].parent = currentNode.node;
                    openList[index].g = rightUpNode.g;
                    openList[index].f = rightUpNode.f;
                }
            } else {
                openList.push(rightUpNode);
            }

        }
        if ((leftNode.y != 0) && (downNode.x != 39) && !(leftDownNode.node.classList.contains('startPoint')) && !(downNode.node.classList.contains('wall')) && !(leftNode.node.classList.contains('wall')) && !(leftDownNode.node.classList.contains('wall')) && !(leftDownNode.node.classList.contains('searchPath')) && !(closeList.includes(leftDownNode.node))) {
            if (searchOfArrayObj(openList, leftDownNode.node)) {
                const index = indexOfArray(openList, leftDownNode.node);
                if (openList[index].g > leftDownNode.g) {
                    openList[index].parent = currentNode.node;
                    openList[index].g = leftDownNode.g;
                    openList[index].f = leftDownNode.f;
                }
            } else {
                openList.push(leftDownNode);
            }

        }
        if ((leftNode.y != 0) && (upNode.x != 0) && !(leftUpNode.node.classList.contains('startPoint')) && !(upNode.node.classList.contains('wall')) && !(leftNode.node.classList.contains('wall')) && !(leftUpNode.node.classList.contains('wall')) && !(leftUpNode.node.classList.contains('searchPath')) && !(closeList.includes(leftUpNode.node))) {
            if (searchOfArrayObj(openList, leftUpNode.node)) {
                const index = indexOfArray(openList, leftUpNode.node);
                if (openList[index].g > leftUpNode.g) {
                    openList[index].parent = currentNode.node;
                    openList[index].g = leftUpNode.g;
                    openList[index].f = leftUpNode.f;
                }
            } else {
                openList.push(leftUpNode);
            }

        }

        if ((rightNode.y != 79) && (downNode.x != 39) && !(rightDownNode.node.classList.contains('startPoint')) && !(downNode.node.classList.contains('wall')) && !(rightNode.node.classList.contains('wall')) && !(rightDownNode.node.classList.contains('wall')) && !(rightDownNode.node.classList.contains('searchPath')) && !(closeList.includes(rightDownNode.node))) {
            if (searchOfArrayObj(openList, rightDownNode.node)) {
                const index = indexOfArray(openList, rightDownNode.node);
                if (openList[index].g > rightDownNode.g) {
                    openList[index].parent = currentNode.node;
                    openList[index].g = rightDownNode.g;
                    openList[index].f = rightDownNode.f;
                }
            } else {
                openList.push(rightDownNode);
            }

        }
        if ((rightNode.y != 79) && !(rightNode.node.classList.contains('startPoint')) && !(rightNode.node.classList.contains('wall')) && !(rightNode.node.classList.contains('searchPath')) && !(closeList.includes(rightNode.node))) {
            if (searchOfArrayObj(openList, rightNode.node)) {
                const index = indexOfArray(openList, rightNode.node);
                if (openList[index].g > rightNode.g) {
                    openList[index].parent = currentNode.node;
                    openList[index].g = rightNode.g;
                    openList[index].f = rightNode.f;
                }
            } else {
                openList.push(rightNode);
            }

        }
        if ((leftNode.y != 0) && !(leftNode.node.classList.contains('startPoint')) && !(leftNode.node.classList.contains('wall')) && !(leftNode.node.classList.contains('searchPath')) && !(closeList.includes(leftNode.node))) {
            if (searchOfArrayObj(openList, leftNode.node)) {
                const index = indexOfArray(openList, leftNode.node);
                if (openList[index].g > leftNode.g) {
                    openList[index].parent = currentNode.node;
                    openList[index].g = leftNode.g;
                    openList[index].f = leftNode.f;
                }
            } else {
                openList.push(leftNode);
            }

        }
        if ((downNode.x != 39) && !(downNode.node.classList.contains('startPoint')) && !(downNode.node.classList.contains('wall')) && !(downNode.node.classList.contains('searchPath')) && !(closeList.includes(downNode.node))) {
            if (searchOfArrayObj(openList, downNode.node)) {
                const index = indexOfArray(openList, downNode.node);
                if (openList[index].g > downNode.g) {
                    openList[index].parent = currentNode.node;
                    openList[index].g = downNode.g;
                    openList[index].f = downNode.f;
                }
            } else {
                openList.push(downNode);
            }

        }
        if ((upNode.x != 0) && !(upNode.node.classList.contains('startPoint')) && !(upNode.node.classList.contains('wall')) && !(upNode.node.classList.contains('searchPath')) && !(closeList.includes(upNode.node))) {
            if (searchOfArrayObj(openList, upNode.node)) {
                const index = indexOfArray(openList, upNode.node);
                if (openList[index].g > upNode.g) {
                    openList[index].parent = currentNode.node;
                    openList[index].g = upNode.g;
                    openList[index].f = upNode.f;
                }
            } else {
                openList.push(upNode);
            }

        }
        if (currentNode.node === endNode.node) {
            let pathNode = currentNode
            let finalList = []
            const length = pathList.length;
            console.log(length);
            for (let i = 0; i < length; i++) {
                finalList.push(pathNode.parent);
                let a = pathList.pop();
                if (a.node === pathNode.parent) {
                    pathNode = a;
                }
                finalList[i].classList.add('path');
            }
        }

        if (currentNode.node === endNode.node) {
            clearInterval(stopInterval);
        }

        if (openList.length === 0) {
            clearInterval(stopInterval);
            console.log('stop');
        }

        currentNode.node.classList.add('searchPath');
    }
    stopInterval = setInterval(aStar, 5);
    endNode.node.classList.remove('wall')
}

function searchStart() {
    findPath();
}

document.getElementById('button1').addEventListener('click', RandomPosition)
document.getElementById('button2').addEventListener('click', searchStart)
document.getElementById('button3').addEventListener('click', createRandomWall)

function init() {
    createGrid(40, 80);
    setStartPoint(x1, y1);
    setEndPoint(x2, y2);
    defaultWall()
}

init();