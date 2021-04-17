class Generator {
    constructor(min, max){
        this._lettersCount = this.getRandomInt(min, max);
        this._combination = [];
    }

    setCombinationSize(min, max){
        this._lettersCount = this.getRandomInt(min, max);   
    }

    get _START_POSITION(){
        return 0
    }    

    get _MIDDLE_POSITION(){
        return this._lettersCount / 2
    }

    get _END_POSITION(){
        return this._lettersCount - 1
    }

    get _IS_SHORT_COMBINATION(){
        return this._lettersCount <= 5
    }

    get _VOWEL_PLACEHOLDER(){
        return '%vowel%';
    }

    get _VOWELS(){
        return [
            {
                en: 'i',
                ru: 'и',
            },
            {
                en: 'e',
                ru: 'э',
            },
            {
                en: 'a',
                ru: 'а',
            },
            {
                en: 'o',
                ru: 'о',
            },
            {
                en: 'u',
                ru: 'у',
            },
            {
                en: 'bi',
                ru: 'ы',
            },
        ]
    }

    get _CONSONANTS(){
        return ['б','в','г','д','ж','з','к','л','м','н','п','р','с','т','ф','х','ц','ч','ш'];
    }

    generate(){
        this._combination = [];
        return this._generateRandomLetter()
    }

    getRandomInt(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    removeElFromArr(val, arr){
        return arr.filter(el => el != val);
    }

    _base(){
        if (this._IS_SHORT_COMBINATION){
            this._addVowelToFirstPart()
        } else {
            this._addVowelToFirstPart()
            this._addVowelToSecondPart()
        }
        
        return this._generateForAllVowels()
    }

    _generateRandomLetter(curLetterCount = 0){
        if (curLetterCount == this._lettersCount) {
            return this._base()
        }

        curLetterCount++
        let arrForRandom = this._CONSONANTS;
        const prevConsonant = this._combination[this._combination.length - 1]

        if (prevConsonant){
            arrForRandom = this.removeElFromArr(prevConsonant, arrForRandom)
        }

        const curConsonant = arrForRandom[this.getRandomInt(this._START_POSITION, arrForRandom.length - 1)];
        this._combination.push(curConsonant);

        return this._generateRandomLetter(curLetterCount)
    }

    _addVowelToFirstPart(){
        const vowelPosition = this.getRandomInt(
            this._START_POSITION, 
            this._MIDDLE_POSITION - 1
        );
        this._combination[vowelPosition] = this._VOWEL_PLACEHOLDER;
    }

    _addVowelToSecondPart(){
        const vowelPosition = this.getRandomInt(
            this._MIDDLE_POSITION, 
            this._END_POSITION
        );
        this._combination[vowelPosition] = this._VOWEL_PLACEHOLDER;
    }

    _generateForAllVowels(){
        return this._VOWELS.reduce((combinationsObj, letter)=>{
            const regexp = new RegExp(`${this._VOWEL_PLACEHOLDER}`, 'g')
            return Object.assign(combinationsObj, {
                [letter.en]: this._combination.join('').replace(regexp, letter.ru)
            })
        }, {})
    }
}

module.exports = Generator