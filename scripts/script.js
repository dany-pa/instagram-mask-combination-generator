// @ts-nocheck
const TouchGestures = require('TouchGestures');
const Level = require('./Level.js');
const LevelsButtons = require('./LevelsButtons.js');
const Generator = require('./Generator.js');
const LettersUI = require('./LettersUI.js');

(async function() {
    function update() {
        const generator = new Generator(maskLevel.combinationSize.min, maskLevel.combinationSize.max);
        lettersUI.data = generator.generate();
        lettersUI.render();
    }

    const levelsButtons = await LevelsButtons.init();
    levelsButtons.selectedIndex.monitor().subscribe(function(value) {
        maskLevel.set(value.newValue + 1);
        update();
    });

    const maskLevel = new Level();
    await maskLevel.ui.init();

    const lettersUI = new LettersUI();
    await lettersUI.init();
    
    TouchGestures.onTap().subscribe(()=>{
        update();
    });
})();