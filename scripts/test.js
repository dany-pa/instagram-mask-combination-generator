// @ts-nocheck
let min = 4;
let max = 10;

// console.log(generateCombination(min, max))
// console.log(generateCombination(min, max))

class Level {
    #level = 2
    #availableLevels = [1,2,3]

    constructor(level){
        this.#level = level || 2;
    }

    get(){
        return this.#level
    }

    set(newLeve){
        if (!this.#availableLevels.includes(newLeve)){
            throw Error(`Допустимые значения для уровня сложности: ${this.#availableLevels.toString()}`)
        }
    }
}

// const maskLevel = new Level()
// console.log(maskLevel.set(5))
// level.set(5)
console.log(level.difficulty)