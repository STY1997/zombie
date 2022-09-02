let creature_class = class Creature {
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

let zombie_class = class Zombie extends Creature {
    constructor(x, y, movement, name) {
        super(x, y);
        this.movement = movement;
        this.name = name;
        this.isInfected = true;
        this.isMovementEnd = false;
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

    //move one step
    oneStep(move) {
        const commandTable = {
            "L": {
                action: () => {
                    //console.log("action1")
                    if (this.x === 0) {
                        this.x = mapSize - 1;
                    } else {
                       this.x--; 
                    } 
                }
            },
            "R": {
                action: () => {
                    //console.log("action2")
                    if (this.x === mapSize - 1) {
                        this.x = 0;
                    } else {
                        this.x++;
                    }
                }
            },
            "U": {
                action: () => {
                    //console.log("action3")
                    if (this.y === mapSize - 1) {
                        this.y = 0;
                    } else {
                        this.y++;
                    }
                }
            },
            "D": {
                action: () => {
                    //console.log("action4")
                    if (this.y === 0) {
                        this.y = mapSize - 1;
                    } else {
                       this.y--; 
                    }  
                }
            }
        }
        commandTable[move].action();
    }

    // oneStep(move) {
    //     switch(move) {
    //         case "L":
    //             if (this.x === 0) {
    //                 this.x = mapSize - 1;
    //             } else {
    //                this.x--; 
    //             }  
    //             break;
    //         case "R":
    //             if (this.x === mapSize - 1) {
    //                 this.x = 0;
    //             } else {
    //                 this.x++;
    //             }
    //             break;
    //         case "U":
    //             if (this.y === mapSize - 1) {
    //                 this.y = 0;
    //             } else {
    //                 this.y++;
    //             }
    //             break;
    //         case "D":
    //             if (this.y === 0) {
    //                 this.y = mapSize - 1;
    //             } else {
    //                this.y--; 
    //             }  
    //             break;
    //         default:
    //             console.log("ignore illegal command: " + move) 
    //     }
    // }

    //print the final position
    finalPosition() {
        return `${this.name} is at ${this.toString()}`
    }
}

export default {creature_class, zombie_class};