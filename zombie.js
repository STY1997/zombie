//Chanege input Here，make sure the positions of zombies and creature is in range, or an exception with an error message will be throw 
//The program cannot recognize commands other than "L", "R", "U" and "D", 
const input = {"gridSize": 5,
    "zombie": [
        {
            "x": 3,
            "y": 1
        },
        {
            "x": 1,
            "y": 4
        }
    ],
    "creatures": [
        {
            "x": 0,
            "y": 1
        },
        {
            "x": 1,
            "y": 2
        },
        {
            "x": 1,
            "y": 1
        },
        {
            "x": 4,
            "y": 4    
        },
        {
            "x": 3,
            "y": 0    
        }
    ],
    "commands": "RDLDD"
}

//variables
let zombieList;
let creatureList;
let commands;
let zombieNum = 0;
let mapSize;
const creatureClassList = [];
const zombieClassList = []
let zombieQueue = [];

/**
 * 
 * @param {*} input 
 */
function deconstructure(input) {
    commands = input.commands;
    zombieList = input.zombie;
    creatureList = input.creatures;
    mapSize = input.gridSize;
    zombieList.forEach(zombie => {
        let x = zombie.x;
        let y = zombie.y;
        //value check;
        if (x < 0 || y < 0 || x >= mapSize || y >= mapSize || mapSize <= 0) {
            console.log("Wrong position input, please check the value!")
        }
        let zombie_ = new Zombie(x, y, commands, `zombie${zombieNum}`);
        zombieNum++;
        zombieClassList.push(zombie_);
        zombieQueue.push(zombie_);
    });
    creatureList.forEach(creature => {
        let x = creature.x;
        let y = creature.y;
        let creature_ = new Creature(x, y);
        creatureClassList.push(creature_);
    });
    console.log("zombie num: " ,zombieClassList.length)
    console.log("creature num: ", creatureClassList.length)
}

//Creature class
class Creature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isInfected = false;
    }

    infected() {
        this.isInfected = true;
    }

    toString() {
        return `position: (${this.x}, ${this.y})`;
    }
}

//Zombie class
class Zombie extends Creature {
    constructor(x, y, movement, name) {
        super(x, y);
        this.movement = movement;
        this.name = name;
        this.isInfected = true;
        this.isMovementEnd = false;
        this.commandTable = {
            "L": [-1, 0],
            "R": [1, 0],
            "U": [0, 1],
            "D": [0, -1]
        }
    }

    //move one step
    oneStep(move) {
        let newPosition = [this.x + this.commandTable[move][0], this.y + this.commandTable[move][1]];
        let newP = [];
        newPosition.forEach(element => {
            if (element === mapSize) {
                element = 0;
            } else if (element === -1) {
                element = mapSize - 1
            }
            newP.push(element);
        });
        this.x = newP[0];
        this.y = newP[1];   
    }

    
    move() {
        for (let i = 0; i < this.movement.length; i++) {
            this.oneStep(this.movement[i]);
            console.log(`${this.name} moved to (${this.x}, ${this.y})`);
            //check inflect
            for (let i = 0; i < creatureClassList.length; i++) {

                if (this.x === creatureClassList[i].x && 
                    this.y === creatureClassList[i].y && 
                    creatureClassList[i].isInfected === false) {

                    creatureClassList[i].infected();
                    let newZombie = new Zombie(creatureClassList[i].x, creatureClassList[i].y, commands, `zombie${zombieNum}`)
                    zombieNum++;
                    zombieClassList.push(newZombie);
                    zombieQueue.push(newZombie);
                    console.log(`${this.name} infected a creature at (${this.x}, ${this.y})`);
                }
            }
        }
        this.isMovementEnd = true;
    }

    //print the final position
    finalPosition() {
        return `${this.name} is at ${this.toString()}`
    }

}

//Main function
function run() {
    deconstructure(input);
    let count = 0;
    while (zombieQueue.length > 0) {
        console.log("--------------Round: " + count + "-----------------");
        zombieQueue[0].move();
        zombieQueue.shift();
        count++;
    }
    console.log("---------------------------------------")
    console.log("Alive creatures: ")
    creatureClassList.forEach(element => {
        if (element.isInfected === false) {
            console.log("A creature is alive at " + element.toString())
        }
    });
    console.log("Number of zombies: ", zombieClassList.length);
    zombieClassList.forEach(element => {
        console.log(element.finalPosition());
    });
}


//程序使用说明书：
//1.打开terminal，调整目录到zombie
//2.安装node之后在命令行输入node zombie.js, 结果会自动显示在terminal上。
run()

