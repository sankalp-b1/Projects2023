import { proxy } from "valtio";

const state = proxy({
    intro: true,
    //default color was yellow
    // color: '#EFBD48', 
    color: '#FF8C00',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png'
    
    

});

export default state;