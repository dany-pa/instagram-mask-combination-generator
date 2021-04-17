const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Reactive = require('Reactive');

async function init(){
    const [
        texturePicker1, 
        texturePicker2, 
        texturePicker3 
    ] = await Promise.all([
        Textures.findFirst('picker1'),
        Textures.findFirst('picker2'),
        Textures.findFirst('picker3'),
    ]);

    const picker = NativeUI.picker;
    const pickerConfig = {
        selectedIndex: 1,
        items: [
            {image_texture: texturePicker1},
            {image_texture: texturePicker2},
            {image_texture: texturePicker3},
        ]
    } 
    picker.configure(pickerConfig)
    picker.visible = Reactive.val(true);
    return picker
}

module.exports = {
    init: init
}