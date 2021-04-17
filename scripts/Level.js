const Materials = require('Materials');
const Textures = require('Textures');
const NativeUI = require('NativeUI');

class Level {
    constructor(level){
        this._level = level || 2;
        this._levelsTexts = ['легко', 'средне', 'сложно'];
        this._EASY_LEVEL = 1;
        this._MEDIUM_LEVEL = 2;
        this._HARD_LEVEL = 3;
        this._availableLevels = [
            this._EASY_LEVEL,
            this._MEDIUM_LEVEL, 
            this._HARD_LEVEL
        ];
        this._combinationSizes = [
            {min: 3, max:4}, 
            {min: 5, max:6}, 
            {min: 7, max:8},
        ];

        this.ui = new LevelUI(this.difficulty, this.text);
    }

    get difficulty(){
        return this._level
    }

    set difficulty(newLevel){
        this.set(newLevel)
    }

    set(newLevel){
        if (!this._availableLevels.includes(newLevel)){
            throw Error(`Допустимые значения для уровня сложности: ${this._availableLevels.toString()}`)
        }

        this._level = newLevel;
       
        this.ui.changeLevel(this.difficulty, this.text)
    }

    get text(){
        return this._levelsTexts[this.difficulty - 1]
    }

    get combinationSize(){
        const size = this._combinationSizes[this.difficulty - 1]
        return {
            min: size.min,
            max: size.max,
        }
    }
}

class LevelUI {
    constructor(level, difficultyText){
        this.level = level
        this.difficultyText = difficultyText

        this.buttons = {
            level1: {
                name: "tLetters1",
                texture: undefined
            },
            level2: {
                name: "tLetters2",
                texture: undefined
            },
            level3: {
                name: "tLetters3",
                texture: undefined
            }
        }
        this.border = {
            name: 'mLetters',
            material: undefined,
        }
        this.text = {
            name: 'levelText'
        }
    }

    async init(){
        [
            this.border.material,
            this.buttons.level1.texture,
            this.buttons.level2.texture,
            this.buttons.level3.texture,
        ] = await Promise.all([
            Materials.findFirst(this.border.name),
            Textures.findFirst(this.buttons.level1.name),
            Textures.findFirst(this.buttons.level2.name),
            Textures.findFirst(this.buttons.level3.name),
        ])
    }

    changeLevel(newLevel, difficultyText){
        this.level = newLevel;
        this.difficultyText = difficultyText;
        
        this.setBorder();
        this.setText();
    }

    setBorder(){
        this.border.material.diffuse = this.buttons[`level${this.level}`].texture;
    }

    setText(){
        
        NativeUI.setText(this.text.name, this.difficultyText)
    }
}

module.exports = Level