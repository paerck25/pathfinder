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


function setStartPoint(x, y) {
    start = arr[x][y];
    start.classList.add('startPoint');
}

function setEndPoint(x, y) {
    end = arr[x][y];
    end.classList.add('endPoint');
}

function RandomPosition() {
    x1 = parseInt((Math.random() * 18) + 1);
    x2 = parseInt(Math.random() * 20);
    y1 = parseInt((Math.random() * 38) + 1);
    y2 = parseInt(Math.random() * 40);
    resetPoint();
    setStartPoint(x1, y1);
    setEndPoint(x2, y2);
    console.log(x1, y1, x2, y2);
}


function moveRight() {
    console.log('moveRight');
    y1++
}
function moveLeft() {
    console.log('moveLeft');
    y1--
}
function moveUp() {
    console.log('moveUp');
    x1--
}
function moveDown() {
    console.log('moveDown');
    x1++
}

function moveRightUp() {
    console.log('moveRightUp');
    y1++
    x1--
}
function moveLeftDown() {
    console.log('moveLeftDown');
    y1--
    x1++
}
function moveLeftUp() {
    console.log('moveLeftUp');
    x1--
    y1--
}
function moveRightDown() {
    console.log('moveRightDown');
    x1++
    y1++
}


function createRandomWall() {
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 20; i++) {
            if (!(arr[i][parseInt(Math.random() * 40)].classList.contains('endPoint'))) {
                arr[i][parseInt(Math.random() * 40)].classList.add('wall');
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

function getCost(cx, cy, ex, ey) {
    let a = Math.abs(cx - ex);
    let b = Math.abs(cy - ey)
    return (a + b) * 10;
}

function getCosts(cx, cy, ex, ey) {
    let a = Math.abs(cx - ex);
    let b = Math.abs(cy - ey)
    return (a + b) * 14;
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
    for (let hang = 0; hang < 20; hang++) {
        for (let ryul = 0; ryul < 40; ryul++) {
            arr[hang][ryul].classList.remove('startPoint');
            arr[hang][ryul].classList.remove('endPoint');
            arr[hang][ryul].classList.remove('wall');
            arr[hang][ryul].classList.remove('path');
            arr[hang][ryul].classList.remove('searchPath');
        };
    };
}
let stopInterval;

// function findPath() {
//     let run = true;
//     let openList = [];
//     let closeList = [];
//     let pathList = [];
//     let currentNode;
//     const startNode = { node: arr[x1][y1], x: x1, y: y1, f: 0, g: 0 }
//     const endNode = { node: arr[x2][y2], x: x2, y: y2, f: 0, g: 0 }
//     const startX = x1;
//     const startY = y1;
//     const endX = x2;
//     const endY = y2;
//     openList.push(startNode);

//     while(run) {
//         openList.sort(function (a, b) {
//             return a.f - b.f;
//         })
//         currentNode = openList.shift();

//         closeList.push(currentNode.node);

//         if (openList.length > 0) {
//             pathList.push(currentNode.parent);
//         }

//         let rightNode = { node: arr[currentNode.x][currentNode.y + 1], x : currentNode.x, y : currentNode.y + 1,  f: getCost(currentNode.x, currentNode.y + 1, startX, startY) + huristic(currentNode.x, currentNode.y + 1), g: getCost(currentNode.x, currentNode.y + 1, startX, startY), move: moveRight, parent : currentNode.node }
//         let leftNode = { node: arr[currentNode.x][currentNode.y - 1], x : currentNode.x, y : currentNode.y - 1, f: getCost(currentNode.x, currentNode.y - 1, startX, startY) + huristic(currentNode.x, currentNode.y - 1), g: getCost(currentNode.x, currentNode.y - 1, startX, startY), move: moveLeft, parent : currentNode.node }
//         let downNode = { node: arr[currentNode.x + 1][currentNode.y], x : currentNode.x + 1, y : currentNode.y, f: getCost(currentNode.x + 1, currentNode.y, startX, startY) + huristic(currentNode.x + 1, currentNode.y), g: getCost(currentNode.x + 1, currentNode.y, startX, startY), move: moveDown, parent : currentNode.node }
//         let upNode = { node: arr[currentNode.x - 1][currentNode.y], x : currentNode.x - 1, y : currentNode.y, f: getCost(currentNode.x - 1, currentNode.y, startX, startY) + huristic(currentNode.x - 1, currentNode.y), g: getCost(currentNode.x - 1, currentNode.y, startX, startY), move: moveUp, parent : currentNode.node }
//         let rightDownNode = { node: arr[currentNode.x + 1][currentNode.y + 1], x : currentNode.x + 1, y : currentNode.y + 1,  f: getCosts(currentNode.x + 1, currentNode.y + 1, startX, startY) + huristic(currentNode.x + 1, currentNode.y + 1), g: getCosts(currentNode.x + 1, currentNode.y + 1, startX, startY), move: moveRightDown, parent : currentNode.node }
//         let leftUpNode = { node: arr[currentNode.x - 1][currentNode.y - 1], x : currentNode.x - 1, y : currentNode.y - 1, f: getCosts(currentNode.x - 1, currentNode.y - 1, startX, startY) + huristic(currentNode.x - 1, currentNode.y - 1), g: getCosts(currentNode.x - 1, currentNode.y - 1, startX, startY), move: moveLeftUp, parent : currentNode.node }
//         let leftDownNode = { node: arr[currentNode.x + 1][currentNode.y - 1], x : currentNode.x + 1, y : currentNode.y - 1, f: getCosts(currentNode.x + 1, currentNode.y - 1, startX, startY) + huristic(currentNode.x + 1, currentNode.y - 1), g: getCosts(currentNode.x + 1, currentNode.y - 1, startX, startY), move: moveLeftDown, parent : currentNode.node }
//         let rightUpNode = { node: arr[currentNode.x - 1][currentNode.y + 1], x : currentNode.x - 1, y : currentNode.y + 1, f: getCosts(currentNode.x - 1, currentNode.y + 1, startX, startY) + huristic(currentNode.x - 1, currentNode.y + 1), g: getCosts(currentNode.x - 1, currentNode.y + 1, startX, startY), move: moveRightUp, parent : currentNode.node }

//         if ((currentNode.y != 41) && !(rightUpNode.node.classList.contains('startPoint')) && !(rightUpNode.node.classList.contains('wall')) && !(rightUpNode.node.classList.contains('searchPath')) && !(closeList.includes(rightUpNode.node))) {
//             if (searchOfArrayObj(openList, rightUpNode.node)) {
//                 const index = indexOfArray(openList, rightUpNode.node);
//                 console.log(index);
//                 console.log(openList[index].g);
//                 console.log(getCost(rightUpNode.x, rightUpNode.y, startX, startY));
//                 if(openList[index].g > getCost(rightUpNode.x, rightUpNode.y, startX, startY)){
//                     console.log(openList[index]);
//                     openList[index].parent = rightUpNode.node;
//                     openList[index].g = rightUpNode.g;
//                     openList[index].f = rightUpNode.f;
//                     console.log(openList[index]);
//                 }
//             } else {
//                 openList.push(rightUpNode);
//             }

//         }
//         if ((currentNode.y != 41) && !(leftDownNode.node.classList.contains('startPoint')) && !(leftDownNode.node.classList.contains('wall')) && !(leftDownNode.node.classList.contains('searchPath')) && !(closeList.includes(leftDownNode.node))) {
//             if (searchOfArrayObj(openList, leftDownNode.node)) {
//                 const index = indexOfArray(openList, leftDownNode.node);
//                 console.log(index);
//                 console.log(openList[index].g);
//                 console.log(getCost(leftDownNode.x, leftDownNode.y, startX, startY));
//                 if(openList[index].g > getCost(leftDownNode.x, leftDownNode.y, startX, startY)){
//                     console.log(openList[index]);
//                     openList[index].parent = leftDownNode.node;
//                     openList[index].g = leftDownNode.g;
//                     openList[index].f = leftDownNode.f;
//                     console.log(openList[index]);
//                 }
//             } else {
//                 openList.push(leftDownNode);
//             }

//         }
//         if ((currentNode.y != 41) && !(leftUpNode.node.classList.contains('startPoint')) && !(leftUpNode.node.classList.contains('wall')) && !(leftUpNode.node.classList.contains('searchPath')) && !(closeList.includes(leftUpNode.node))) {
//             if (searchOfArrayObj(openList, leftUpNode.node)) {
//                 const index = indexOfArray(openList, leftUpNode.node);
//                 console.log(index);
//                 console.log(openList[index].g);
//                 console.log(getCost(leftUpNode.x, leftUpNode.y, startX, startY));
//                 if(openList[index].g > getCost(leftUpNode.x, leftUpNode.y, startX, startY)){
//                     console.log(openList[index]);
//                     openList[index].parent = leftUpNode.node;
//                     openList[index].g = leftUpNode.g;
//                     openList[index].f = leftUpNode.f;
//                     console.log(openList[index]);
//                 }
//             } else {
//                 openList.push(leftUpNode);
//             }

//         }
//         if ((currentNode.y != 41) && !(rightDownNode.node.classList.contains('startPoint')) && !(rightDownNode.node.classList.contains('wall')) && !(rightDownNode.node.classList.contains('searchPath')) && !(closeList.includes(rightDownNode.node))) {
//             if (searchOfArrayObj(openList, rightDownNode.node)) {
//                 const index = indexOfArray(openList, rightDownNode.node);
//                 console.log(index);
//                 console.log(openList[index].g);
//                 console.log(getCost(rightDownNode.x, rightDownNode.y, startX, startY));
//                 if(openList[index].g > getCost(rightDownNode.x, rightDownNode.y, startX, startY)){
//                     console.log(openList[index]);
//                     openList[index].parent = rightDownNode.node;
//                     openList[index].g = rightDownNode.g;
//                     openList[index].f = rightDownNode.f;
//                     console.log(openList[index]);
//                 }
//             } else {
//                 openList.push(rightDownNode);
//             }

//         }
//         if ((currentNode.y != 41) && !(rightNode.node.classList.contains('startPoint')) && !(rightNode.node.classList.contains('wall')) && !(rightNode.node.classList.contains('searchPath')) && !(closeList.includes(rightNode.node))) {
//             if (searchOfArrayObj(openList, rightNode.node)) {
//                 const index = indexOfArray(openList, rightNode.node);
//                 console.log(index);
//                 console.log(openList[index].g);
//                 console.log(getCost(rightNode.x, rightNode.y, startX, startY));
//                 if(openList[index].g > getCost(rightNode.x, rightNode.y, startX, startY)){
//                     console.log(openList[index]);
//                     openList[index].parent = rightNode.node;
//                     openList[index].g = rightNode.g;
//                     openList[index].f = rightNode.f;
//                     console.log(openList[index]);
//                 }
//             } else {
//                 openList.push(rightNode);
//             }

//         }
//         if ((currentNode.y != -1) && !(arr[currentNode.x][currentNode.y - 1].classList.contains('startPoint')) && !(arr[currentNode.x][currentNode.y - 1].classList.contains('wall')) && !(arr[currentNode.x][currentNode.y - 1].classList.contains('searchPath')) && !(closeList.includes(arr[currentNode.x][currentNode.y - 1]))) {
//             if (searchOfArrayObj(openList, arr[currentNode.x][currentNode.y - 1])) {
//                 const index = indexOfArray(openList, arr[currentNode.x][currentNode.y - 1]);
//                 console.log(index);
//                 console.log(openList[index].g);
//                 console.log(getCost(leftNode.x, leftNode.y, startX, startY));
//                 if(openList[index].g > getCost(currentNode.x, currentNode.y - 1, startX, startY)){
//                     console.log(openList[index]);
//                     openList[index].parent = leftNode.node;
//                     openList[index].g = leftNode.g;
//                     openList[index].f = leftNode.f;
//                     console.log(openList[index]);
//                 }
//             } else {
//                 openList.push(leftNode);
//             }

//         }
//         if ((currentNode.x != 21) && !(arr[currentNode.x + 1][currentNode.y].classList.contains('startPoint')) && !(arr[currentNode.x + 1][currentNode.y].classList.contains('wall')) && !(arr[currentNode.x + 1][currentNode.y].classList.contains('searchPath')) && !(closeList.includes(arr[currentNode.x + 1][currentNode.y]))) {
//             if (searchOfArrayObj(openList, arr[currentNode.x + 1][currentNode.y])) {
//                 const index = indexOfArray(openList, arr[currentNode.x + 1][currentNode.y]);
//                 console.log(index);
//                 console.log(openList[index].g);
//                 console.log(getCost(downNode.x, downNode.y, startX, startY));
//                 if(openList[index].g > getCost(currentNode.x + 1, currentNode.y, startX, startY)){
//                     console.log(openList[index]);
//                     openList[index].parent = downNode.node;
//                     openList[index].g = downNode.g;
//                     openList[index].f = downNode.f;
//                     console.log(openList[index]);
//                 }
//             } else {
//                 openList.push(downNode);
//             }

//         }
//         if ((currentNode.x != -1) && !(arr[currentNode.x - 1][currentNode.y].classList.contains('startPoint')) && !(arr[currentNode.x - 1][currentNode.y].classList.contains('wall')) && !(arr[currentNode.x - 1][currentNode.y].classList.contains('searchPath')) && !(closeList.includes(arr[currentNode.x - 1][currentNode.y]))) {
//             if (searchOfArrayObj(openList, arr[currentNode.x - 1][currentNode.y])) {
//                 const index = indexOfArray(openList, arr[currentNode.x - 1][currentNode.y]);
//                 console.log(index);
//                 console.log(openList[index].g);
//                 console.log(getCost(upNode.x, upNode.y, startX, startY));
//                 if(openList[index].g > getCost(currentNode.x - 1, currentNode.y, startX, startY)){
//                     console.log(openList[index]);
//                     openList[index].parent = upNode.node;
//                     openList[index].g = upNode.g;
//                     openList[index].f = upNode.f;
//                     console.log(openList[index]);
//                 }
//             } else {
//                 openList.push(upNode);
//             }

//         }
//         if (currentNode.node === endNode.node) {
//             for(let i=0; i<pathList.length; i++){
//                 pathList[i].classList.add('path');
//             }
//             run = false;
//         }
//         // console.log('open',openList);
//         // console.log('close',closeList);
//         // console.log('current',currentNode);
//         currentNode.node.classList.add('searchPath');
//     }
// }

// function searchStart() {
//     // moveInterval = setInterval(findPath,30)
//     findPath();
// }


function findPath() {
    let run = true;
    let openList = [];
    let closeList = [];
    let pathList = [];
    let currentNode;
    const startNode = { node: arr[x1][y1], x: x1, y: y1, f: 0, g: 0 }
    const endNode = { node: arr[x2][y2], x: x2, y: y2, f: 0, g: 0 }
    const startX = x1;
    const startY = y1;
    const endX = x2;
    const endY = y2;
    openList.push(startNode);
    function aStar() {
        openList.sort(function (a, b) {
            return a.f - b.f;
        })
        currentNode = openList.shift();

        closeList.push(currentNode);

        if (openList.length > 0) {
            pathList.push(currentNode.parent);
        }

        let rightNode = { node: arr[currentNode.x][currentNode.y + 1], x: currentNode.x, y: currentNode.y + 1, f: getCost(currentNode.x, currentNode.y + 1, startX, startY) + huristic(currentNode.x, currentNode.y + 1), g: getCost(currentNode.x, currentNode.y + 1, startX, startY), move: moveRight, parent: currentNode.node }
        let leftNode = { node: arr[currentNode.x][currentNode.y - 1], x: currentNode.x, y: currentNode.y - 1, f: getCost(currentNode.x, currentNode.y - 1, startX, startY) + huristic(currentNode.x, currentNode.y - 1), g: getCost(currentNode.x, currentNode.y - 1, startX, startY), move: moveLeft, parent: currentNode.node }
        let downNode = { node: arr[currentNode.x + 1][currentNode.y], x: currentNode.x + 1, y: currentNode.y, f: getCost(currentNode.x + 1, currentNode.y, startX, startY) + huristic(currentNode.x + 1, currentNode.y), g: getCost(currentNode.x + 1, currentNode.y, startX, startY), move: moveDown, parent: currentNode.node }
        let upNode = { node: arr[currentNode.x - 1][currentNode.y], x: currentNode.x - 1, y: currentNode.y, f: getCost(currentNode.x - 1, currentNode.y, startX, startY) + huristic(currentNode.x - 1, currentNode.y), g: getCost(currentNode.x - 1, currentNode.y, startX, startY), move: moveUp, parent: currentNode.node }
        let rightDownNode = { node: arr[currentNode.x + 1][currentNode.y + 1], x: currentNode.x + 1, y: currentNode.y + 1, f: getCosts(currentNode.x + 1, currentNode.y + 1, startX, startY) + huristic(currentNode.x + 1, currentNode.y + 1), g: getCosts(currentNode.x + 1, currentNode.y + 1, startX, startY), move: moveRightDown, parent: currentNode.node }
        let leftUpNode = { node: arr[currentNode.x - 1][currentNode.y - 1], x: currentNode.x - 1, y: currentNode.y - 1, f: getCosts(currentNode.x - 1, currentNode.y - 1, startX, startY) + huristic(currentNode.x - 1, currentNode.y - 1), g: getCosts(currentNode.x - 1, currentNode.y - 1, startX, startY), move: moveLeftUp, parent: currentNode.node }
        let leftDownNode = { node: arr[currentNode.x + 1][currentNode.y - 1], x: currentNode.x + 1, y: currentNode.y - 1, f: getCosts(currentNode.x + 1, currentNode.y - 1, startX, startY) + huristic(currentNode.x + 1, currentNode.y - 1), g: getCosts(currentNode.x + 1, currentNode.y - 1, startX, startY), move: moveLeftDown, parent: currentNode.node }
        let rightUpNode = { node: arr[currentNode.x - 1][currentNode.y + 1], x: currentNode.x - 1, y: currentNode.y + 1, f: getCosts(currentNode.x - 1, currentNode.y + 1, startX, startY) + huristic(currentNode.x - 1, currentNode.y + 1), g: getCosts(currentNode.x - 1, currentNode.y + 1, startX, startY), move: moveRightUp, parent: currentNode.node }

        if ((currentNode.y < 41) && !(rightUpNode.node.classList.contains('startPoint')) && !(arr[currentNode.x - 1][currentNode.y].classList.contains('wall')) && !(rightNode.node.classList.contains('wall')) && !(rightUpNode.node.classList.contains('wall')) && !(rightUpNode.node.classList.contains('searchPath')) && !(closeList.includes(rightUpNode.node))) {
            if (searchOfArrayObj(openList, rightUpNode.node)) {
                const index = indexOfArray(openList, rightUpNode.node);
                console.log(index);
                console.log(openList[index].g);
                console.log(getCost(rightUpNode.x, rightUpNode.y, startX, startY));
                if (openList[index].g > getCost(rightUpNode.x, rightUpNode.y, startX, startY)) {
                    console.log(openList[index]);
                    openList[index].parent = currentNode.node;
                    openList[index].g = rightUpNode.g;
                    openList[index].f = rightUpNode.f;
                    console.log(openList[index]);
                }
            } else {
                openList.push(rightUpNode);
            }

        }
        if ((currentNode.y < 41) && !(leftDownNode.node.classList.contains('startPoint')) && !(arr[currentNode.x + 1][currentNode.y].classList.contains('wall')) && !(arr[currentNode.x][currentNode.y - 1].classList.contains('wall')) && !(leftDownNode.node.classList.contains('wall')) && !(leftDownNode.node.classList.contains('searchPath')) && !(closeList.includes(leftDownNode.node))) {
            if (searchOfArrayObj(openList, leftDownNode.node)) {
                const index = indexOfArray(openList, leftDownNode.node);
                console.log(index);
                console.log(openList[index].g);
                console.log(getCost(leftDownNode.x, leftDownNode.y, startX, startY));
                if (openList[index].g > getCost(leftDownNode.x, leftDownNode.y, startX, startY)) {
                    console.log(openList[index]);
                    openList[index].parent = currentNode.node;
                    openList[index].g = leftDownNode.g;
                    openList[index].f = leftDownNode.f;
                    console.log(openList[index]);
                }
            } else {
                openList.push(leftDownNode);
            }

        }
        if ((currentNode.y < 41) && !(leftUpNode.node.classList.contains('startPoint')) && !(arr[currentNode.x - 1][currentNode.y].classList.contains('wall')) && !(arr[currentNode.x][currentNode.y - 1].classList.contains('wall')) && !(leftUpNode.node.classList.contains('wall')) && !(leftUpNode.node.classList.contains('searchPath')) && !(closeList.includes(leftUpNode.node))) {
            if (searchOfArrayObj(openList, leftUpNode.node)) {
                const index = indexOfArray(openList, leftUpNode.node);
                console.log(index);
                console.log(openList[index].g);
                console.log(getCost(leftUpNode.x, leftUpNode.y, startX, startY));
                if (openList[index].g > getCost(leftUpNode.x, leftUpNode.y, startX, startY)) {
                    console.log(openList[index]);
                    openList[index].parent = currentNode.node;
                    openList[index].g = leftUpNode.g;
                    openList[index].f = leftUpNode.f;
                    console.log(openList[index]);
                }
            } else {
                openList.push(leftUpNode);
            }

        }
        if ((currentNode.y < 41) && !(rightDownNode.node.classList.contains('startPoint')) && !(arr[currentNode.x + 1][currentNode.y].classList.contains('wall')) && !(rightNode.node.classList.contains('wall')) && !(rightDownNode.node.classList.contains('wall')) && !(rightDownNode.node.classList.contains('searchPath')) && !(closeList.includes(rightDownNode.node))) {
            if (searchOfArrayObj(openList, rightDownNode.node)) {
                const index = indexOfArray(openList, rightDownNode.node);
                console.log(index);
                console.log(openList[index].g);
                console.log(getCost(rightDownNode.x, rightDownNode.y, startX, startY));
                if (openList[index].g > getCost(rightDownNode.x, rightDownNode.y, startX, startY)) {
                    console.log(openList[index]);
                    openList[index].parent = currentNode.node;
                    openList[index].g = rightDownNode.g;
                    openList[index].f = rightDownNode.f;
                    console.log(openList[index]);
                }
            } else {
                openList.push(rightDownNode);
            }

        }
        if ((currentNode.y > -1) && (currentNode.y < 41) && !(rightNode.node.classList.contains('startPoint')) && !(rightNode.node.classList.contains('wall')) && !(rightNode.node.classList.contains('searchPath')) && !(closeList.includes(rightNode.node))) {
            if (searchOfArrayObj(openList, rightNode.node)) {
                const index = indexOfArray(openList, rightNode.node);
                console.log(index);
                console.log(openList[index].g);
                console.log(getCost(rightNode.x, rightNode.y, startX, startY));
                if (openList[index].g > getCost(rightNode.x, rightNode.y, startX, startY)) {
                    console.log(openList[index]);
                    openList[index].parent = currentNode.node;
                    openList[index].g = rightNode.g;
                    openList[index].f = rightNode.f;
                    console.log(openList[index]);
                }
            } else {
                openList.push(rightNode);
            }

        }
        if ((currentNode.y < 41) && (currentNode.y > -1) && !(leftNode.node.classList.contains('startPoint')) && !(leftNode.node.classList.contains('wall')) && !(leftNode.node.classList.contains('searchPath')) && !(closeList.includes(leftNode.node))) {
            if (searchOfArrayObj(openList, leftNode.node)) {
                const index = indexOfArray(openList, leftNode.node);
                console.log(index);
                console.log(openList[index].g);
                console.log(getCost(leftNode.x, leftNode.y, startX, startY));
                if (openList[index].g > getCost(leftNode.x, leftNode.y, startX, startY)) {
                    console.log(openList[index]);
                    openList[index].parent = currentNode.node;
                    openList[index].g = leftNode.g;
                    openList[index].f = leftNode.f;
                    console.log(openList[index]);
                }
            } else {
                openList.push(leftNode);
            }

        }
        if ((currentNode.x > -1) && (currentNode.x < 21) && !(downNode.node.classList.contains('startPoint')) && !(downNode.node.classList.contains('wall')) && !(downNode.node.classList.contains('searchPath')) && !(closeList.includes(downNode.node))) {
            if (searchOfArrayObj(openList, downNode.node)) {
                const index = indexOfArray(openList, downNode.node);
                console.log(index);
                console.log(openList[index].g);
                console.log(getCost(downNode.x, downNode.y, startX, startY));
                if (openList[index].g > getCost(downNode.x, downNode.y, startX, startY)) {
                    console.log(openList[index]);
                    openList[index].parent = currentNode.node;
                    openList[index].g = downNode.g;
                    openList[index].f = downNode.f;
                    console.log(openList[index]);
                }
            } else {
                openList.push(downNode);
            }

        }
        if ((currentNode.x < 21) && (currentNode.x > -1) && !(upNode.node.classList.contains('startPoint')) && !(upNode.node.classList.contains('wall')) && !(upNode.node.classList.contains('searchPath')) && !(closeList.includes(upNode.node))) {
            if (searchOfArrayObj(openList, upNode.node)) {
                const index = indexOfArray(openList, upNode.node);
                console.log(index);
                console.log(openList[index].g);
                console.log(getCost(upNode.x, upNode.y, startX, startY));
                if (openList[index].g > getCost(upNode.x, upNode.y, startX, startY)) {
                    console.log(openList[index]);
                    openList[index].parent = currentNode.node;
                    openList[index].g = upNode.g;
                    openList[index].f = upNode.f;
                    console.log(openList[index]);
                }
            } else {
                openList.push(upNode);
            }

        }
        if (currentNode.node === endNode.node) {
            for (let i = 0; i < pathList.length; i++) {
                pathList[i].classList.add('path');
            }
            clearInterval(stopInterval)
        }
        if(openList.length === 0){
                clearInterval(stopInterval);
            }
        console.log('open',openList);
        // console.log('close', closeList);
        // console.log('current',currentNode);
        currentNode.node.classList.add('searchPath');
    }
    stopInterval = setInterval(aStar, 10);
}

function searchStart() {
    // moveInterval = setInterval(findPath,30)
    findPath();
}

document.getElementById('button1').addEventListener('click', RandomPosition)
document.getElementById('button2').addEventListener('click', searchStart)
document.getElementById('button3').addEventListener('click', createRandomWall)
document.getElementById('button4').addEventListener('click', clearInterval(stopInterval))

function init() {
    createGrid(20, 40);
    setStartPoint(x1, y1);
    setEndPoint(x2, y2);
}

init();