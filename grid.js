let container = document.getElementById('container');
let start;
let end;
let arr = [];
let x1 = 10;
let x2 = 10;
let y1 = 10;
let y2 = 14;

function dragWall(ev) {
    ev.preventDefault();
    if (!(ev.target.classList.contains('startPoint')) && !(ev.target.classList.contains('endPoint'))) {
        ev.target.classList.add('wall');
    }
}

function reamoveWall(e) {
    if (e.target.classList.contains('wall')) {
        e.target.classList.remove('wall');
    } else {
        e.target.classList.add('wall');
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


function currenToEnd(sx, sy) {
    // let a = (Math.pow(sx - x2, 2));
    // let b = (Math.pow(sy - y2, 2));
    // return Math.sqrt(a + b);
    let a = Math.abs(x2 - sx);
    let b = Math.abs(y2 - sy)
    return (a + b) * 10;
}





let moveInterval;

let cost = 0;

function moveRight() {
    console.log('moveRight');
    ++y1
    cost += 10
    // arr[x1+1][y1].classList.add('searchPath');
    // arr[x1-1][y1].classList.add('searchPath');
}
function moveLeft() {
    console.log('moveLeft');
    --y1
    cost += 10
    // arr[x1+1][y1].classList.add('searchPath');
    // arr[x1-1][y1].classList.add('searchPath');
}
function moveUp() {
    console.log('moveUp');
    --x1
    cost += 10
    // arr[x1][y1+1].classList.add('searchPath');
    // arr[x1][y1-1].classList.add('searchPath');
}
function moveDown() {
    console.log('moveDown');
    ++x1
    cost += 10
    // arr[x1][y1+1].classList.add('searchPath');
    // arr[x1][y1-1].classList.add('searchPath');
}

function moveRightUp() {
    console.log('moveRightUp');
    y1++
    x1--
    cost += 14
}
function moveLeftDwon() {
    console.log('moveLeftDwon');
    y1--
    x1++
    cost += 14
}
function moveLeftUp() {
    console.log('moveLeftUp');
    x1--
    y1--
    cost += 14
}
function moveRightDown() {
    console.log('moveRightDown');
    x1++
    y1++
    cost += 14
}

let closeList = [];
let parentNode;

function createRandomWall(){
    for(let j=0; j<5; j++){
        for(let i=0; i<20; i++){
            arr[i][parseInt(Math.random() * 40)].classList.add('wall');
        }
    }
}



function moveStartPoint() {
    let openList = [];

    if (!(x1 === 19) && !(arr[x1 + 1][y1].classList.contains('startPoint')) && !(arr[x1 + 1][y1].classList.contains('wall')) && !(arr[x1 + 1][y1].classList.contains('path'))) {
        openList.push([(currenToEnd(x1 + 1, y1)) + (10 + cost), moveDown])
    }
    if (!(x1 === 0) && !(arr[x1 - 1][y1].classList.contains('startPoint')) && !(arr[x1 - 1][y1].classList.contains('wall')) && !(arr[x1 - 1][y1].classList.contains('path'))) {
        openList.push([(currenToEnd(x1 - 1, y1)) + (10 + cost), moveUp])
    }
    if (!(y1 === 39) && !(arr[x1][y1 + 1].classList.contains('startPoint')) && !(arr[x1][y1 + 1].classList.contains('wall')) && !(arr[x1][y1 + 1].classList.contains('path'))) {
        openList.push([(currenToEnd(x1, y1 + 1)) + (10 + cost), moveRight])
    }
    if (!(y1 === 0) && !(arr[x1][y1 - 1].classList.contains('startPoint')) && !(arr[x1][y1 - 1].classList.contains('wall')) && !(arr[x1][y1 - 1].classList.contains('path'))) {
        openList.push([(currenToEnd(x1, y1 - 1)) + (10 + cost), moveLeft])
    }
    // if (!(x1 === 19) && !(y1 === 39) && (!arr[x1 + 1][y1 + 1].classList.contains('wall')) && (!arr[x1 + 1][y1 + 1].classList.contains('path')) && !(arr[x1 + 1][y1].classList.contains('wall')) && !(arr[x1 + 1][y1].classList.contains('path')) && !(arr[x1][y1 + 1].classList.contains('wall')) && !(arr[x1][y1 + 1].classList.contains('path'))) {
    //     openList.push([currenToEnd(x1 + 1, y1 + 1) + (14 + cost), moveRightDown])
    // }
    // if (!(x1 === 0) && !(y1 === 0) && (!arr[x1 - 1][y1 - 1].classList.contains('wall')) && (!arr[x1 - 1][y1 - 1].classList.contains('path')) && !(arr[x1][y1 - 1].classList.contains('wall')) && !(arr[x1][y1 - 1].classList.contains('path')) && !(arr[x1 - 1][y1].classList.contains('wall')) && !(arr[x1 - 1][y1].classList.contains('path'))) {
    //     openList.push([currenToEnd(x1 - 1, y1 - 1) + (14 + cost), moveLeftUp])
    // }
    // if (!(x1 === 0) && !(y1 === 39) && (!arr[x1 - 1][y1 + 1].classList.contains('wall')) && (!arr[x1 - 1][y1 + 1].classList.contains('path')) && !(arr[x1][y1 + 1].classList.contains('wall')) && !(arr[x1][y1 + 1].classList.contains('path')) && !(arr[x1 - 1][y1].classList.contains('wall')) && !(arr[x1 - 1][y1].classList.contains('path'))) {
    //     openList.push([currenToEnd(x1 - 1, y1 + 1) + (14 + cost), moveRightUp])
    // }
    // if (!(x1 === 19) && !(y1 === 0) && (!arr[x1 + 1][y1 - 1].classList.contains('wall')) && (!arr[x1 + 1][y1 - 1].classList.contains('path')) && !(arr[x1][y1 - 1].classList.contains('wall')) && !(arr[x1][y1 - 1].classList.contains('path')) && !(arr[x1 + 1][y1].classList.contains('wall')) && !(arr[x1 + 1][y1].classList.contains('path'))) {
    //     openList.push([currenToEnd(x1 + 1, y1 - 1) + (14 + cost), moveLeftDwon])
    // }


    console.log(openList);

    let minArr = [];

    for (let i = 0; i < openList.length; i++) {
        minArr.push(openList[i][0]);
    }

    const minValue = Math.min.apply(null, minArr);

    console.log(minArr);
    // for(let i=0; i<openList.length; i++){
    //     if(openList[i][0]===minValue){
    //         openList[i][1]();
    //     }
    // }

    switch (minValue) {
        case openList[0][0]:
            openList[0][1]();
            break;
        case openList[1][0]:
            openList[1][1]();
            break;
        case openList[2][0]:
            openList[2][1]();
            break;
        case openList[3][0]:
            openList[3][1]();
            break;
        // case openList[4][0]:
        //     openList[4][1]();
        //     break;
        // case openList[5][0]:
        //     openList[5][1]();
        //     break;
        // case openList[6][0]:
        //     openList[6][1]();
        //     break;
        // case openList[7][0]:
        //     openList[7][1]();
        //     break;
    }
    console.log(closeList);
    arr[x1][y1].classList.add('path');
    console.log('그리고');
    if (x1 == x2 && y1 == y2) {
        clearInterval(moveInterval);
    }
}
function searchStart() {
    moveInterval = setInterval(moveStartPoint,30)
    // moveStartPoint();
}

document.getElementById('button1').addEventListener('click', RandomPosition)
document.getElementById('button2').addEventListener('click', searchStart)
document.getElementById('button3').addEventListener('click', createRandomWall)


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

function init() {
    createGrid(20, 40);
    setStartPoint(x1, y1);
    setEndPoint(x2, y2);
}

init();