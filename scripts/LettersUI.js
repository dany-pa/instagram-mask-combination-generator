const NativeUI = require('NativeUI');
const Time = require('Time');
const Loader = require('./Loader.js');

class LettersUI {
    constructor(data){
        this._isShowStartText = true;
        this._letters = {
            i:  text=>NativeUI.setText('и', text),
            e:  text=>NativeUI.setText('э', text),
            a:  text=>NativeUI.setText('а', text),
            o:  text=>NativeUI.setText('о', text),
            u:  text=>NativeUI.setText('у', text),
            bi: text=>NativeUI.setText('ы', text),
        };
        this.startTextName = 'startText';
        this._timer = undefined;
        this._loader = undefined;
        this._loadingTime = 1000;
        this.data = data || {};
    }

    async init(){
        this._loader = new Loader()
        await this._loader.init()
    }

    render(){
        this._clearTimer();
        this._hideStartText();
        this._clear();
        this._loader.show();

        this._timer = Time.setTimeout(()=>{
            this._loader.hide();
            this._print();
        }, this._loadingTime)

    }

    _clearTimer(){
        if(this._timer){
            Time.clearInterval(this._timer);
        }
    }

    _hideStartText(){
        if (this._isShowStartText){
            NativeUI.setText(this.startTextName, '');
            this._isShowStartText = false;
        }
    }

    _clear(){
        for (let letter in this._letters){
            this._letters[letter]('')
        }
    }

    _print(){
        for (let letter in this.data){
            this._letters[letter](this.data[letter]);
        }
    }
}

module.exports = LettersUI