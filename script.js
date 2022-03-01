/* create a gameboard object that's going to store the flow of game modules */


/* create the table to for the board*/
var setUp = {
    player1: 'Player1',
    init: function() {
        this.cacheDom();
        this.InputtedName();
        this.clearName();
    },
    cacheDom: function() {
        this.$header = document.querySelector('#header');
        this.$gameBoard = document.querySelector('#gameBoard');
        this.$userName = document.getElementById('name');
        this.$submitBtn = document.querySelector('#Username');
        this.$clearAll = document.querySelector('#clearAll');
        this.$welcomePlayer = document.querySelector('h2');
    },
    setPlayerName: function(playerName) {
        this.player1 = playerName;
    },
    headerName: function(playerName) {
        this.$header.textContent = 'Welcome ' + this.player1;
    },
    InputtedName: function() {
        this.$submitBtn.addEventListener('click', e=> {
            this.player1 = this.$userName.value
            this.headerName();
        })
    },
    clearName: function() {
        this.$clearAll.addEventListener('click', e=> {
            this.player1.textContent = '';
            this.$welcomePlayer.textContent = 'Welcome Player';
        })
    }
}

setUp.init();


/*gameplay experience*/
var gamePlay = {
    winningArrays: [
        ['1', '2', '3'],
        ['1', '4', '7'],
        ['1', '5', '9'],
        ['2', '5', '8'],
        ['4', '5', '6'],
        ['3', '5', '7'],
        ['3', '6', '9'],
        ['7' ,'8', '9']
    ],
    xMarkgameBoard: [],
    yMarkgameBoard: [],
    xMark: {name: 'X', value: ''},
    oMark: {name: 'O', value: ''},
    StartPoint: 0,
    markCounter: 0,
    init: function () {
        this.cacheDom();
        this.sortIndex();
        this.clearAll();
        this.selectMark();
        this.hovers();
    },
    cacheDom: function() {
        this.$cellElements = document.querySelectorAll('[data-cell]');
        this.$gameBoard = document.querySelector('#gameBoard');
        this.$clearAll = document.querySelector('#clearAll');
        this.$Marks = document.querySelectorAll('input');
        this.$turnBase = document.querySelector('h3');
    },
    turnBase: function(mark) {
        this.$turnBase.textContent = 'Player ' +  mark + '\'s' + ' turn';
    },
    playGame: function() {
        this.$cellElements.forEach(cell => {
            cell.addEventListener('click', e=> {
                if (e.target.textContent === '') {
                    //Player 'x'
                    if((this.StartPoint) % 2 == this.xMark.value && (this.StartPoint != 8)) {
                        e.target.textContent = this.xMark.name;
                        this.turnBase(this.xMark.name)
                        this.arrangeArrays(this.xMarkgameBoard, e.target.id, this.sortIndex)
                        this.winCondition(this.xMarkgameBoard)
                        this.StartPoint += 1
                    }
                    // Player 'o'
                    else if ((this.StartPoint) % 2 != this.xMark.value && (this.StartPoint != 8)) {
                        e.target.textContent = this.oMark.name;
                        this.turnBase(this.oMark.name)
                        this.arrangeArrays(this.yMarkgameBoard, e.target.id, this.sortIndex)
                        this.winCondition(this.yMarkgameBoard)
                        this.StartPoint += 1
                    }
                    // Tie Outcome
                    else {
                        if((this.StartPoint) % 2 == 0) {
                            e.target.textContent = this.xMark.name;
                            alert('tie!')
                        }
                        else {
                            e.target.textContent = this.oMark.name;
                            alert('tie!')
                        }
                    }
                }
                else {
                    return
                }
            })
        })
    },
    arrangeArrays: function(UserArray, push, sort) {
        UserArray.push(push)
        UserArray.sort(sort)
    },
    sortIndex: function(a, b) {
        return a - b;       // 1. < 0 ... a , 2. 0... nothing will change, 3. 0 ... b comes first
    },
    compareArrays: function(winArray, UIArray) {    // compareArrays([1, 2, 3], [1, 2, 3, 4]) -> true
        return UIArray.every(function(e) {
            return winArray.includes(e);
        });
    },
    winCondition: function(UserArray) {
        let counter = 0;

        // condition runs after 3 marks have been selected
        if (UserArray.length >= 3) {
            while (counter < this.winningArrays.length) {
                if(this.compareArrays(UserArray, this.winningArrays[counter]) == true) {
                    if((this.StartPoint % 2) == 0) {
                        alert('Player X Win!')
                    }
                    else {
                        alert('Player O Win!')
                    }
                    counter++
                }
                else {
                    counter++
                }
            }
        }
    },
    clearAll: function() {
        let myArray = Array.from(document.querySelectorAll('[data-cell]'));

        this.$clearAll.addEventListener('click', e => {
            myArray.forEach(box => box.textContent = '');
            this.xMarkgameBoard = [];
            this.yMarkgameBoard = [];
            this.StartPoint = 0;
            this.markCounter = 0;
            document.getElementById('xMark').disabled = false;
            document.getElementById('oMark').disabled = false;
        })
    },
    selectMark: function() {
        this.$Marks.forEach(eachMark => eachMark.addEventListener('click', e => {
            if(e.target.value == 0) {
                this.xMark.value = e.target.value;
                this.markCounter += 1;
            }
            else {
                this.oMark.value = e.target.value;
                this.StartPoint += 1;
                this.markCounter += 1;
            }
        // Player can't fill board until they select 'x' or 'o' mark
        this.playGame();
        this.disableInput();
        }))
    },
    disableInput: function() {
        if(this.markCounter >= 1) {
            document.getElementById('xMark').disabled = true;
            document.getElementById('oMark').disabled = true;
        }
    },
    hovers: function() {
        this.$cellElements.forEach(innerbox => innerbox.addEventListener('mouseenter', e=> {
            e.target.style.backgroundColor = 'AliceBlue'

            setTimeout(function() {
                e.target.style.backgroundColor = '';
            }, 150);
        }))
    }
}

gamePlay.init()










