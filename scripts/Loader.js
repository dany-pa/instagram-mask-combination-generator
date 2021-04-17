const Scene = require('Scene');
const Animation = require('Animation');
const Reactive = require('Reactive');

class Loader {
    constructor(){
        this.loader = undefined;
    }

    async init(){
        if (this.loader) return

        this.loader = await Scene.root.findFirst('loader')
        const timeDriver = Animation.timeDriver({
            durationMilliseconds: 25000,
            loopCount: Infinity,
            mirror: false,
        }); 
        const samplerRotateLoader = Animation.samplers.easeInOutQuad(0,360);
        const animRotateLoading = Animation.animate(timeDriver, samplerRotateLoader);
        this.loader.transform.rotationZ = animRotateLoading;
        timeDriver.start();
    }

    show(){
        this.loader.transform.y = Reactive.val(200);
    }

    hide(){
        this.loader.transform.y = Reactive.val(1000);
    }
}

module.exports = Loader