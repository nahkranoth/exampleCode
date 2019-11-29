import * as PIXI from "pixi.js";
import ImageText from "./ImageText";
import {Vector2} from "./utils";
import {TimelineMax} from "gsap";

export default class ImageTextController{

    private stage;
    private resources;
    private position:Vector2;
    private styles:Array<PIXI.TextStyle> = [];
    private compositions:Array<Array<string>> = [];
    private currentImageText:ImageText;

    constructor(stage, resources, position){
        this.stage = stage;
        this.resources = resources;
        this.position = position;
        this.styles.push(new PIXI.TextStyle({fill:"white", fontSize:44}));
        this.styles.push(new PIXI.TextStyle({fill:"green", fontSize:22}));
        this.styles.push(new PIXI.TextStyle({fill:"yellow", fontSize:11}));
        this.styles.push(new PIXI.TextStyle({fill:"purple", fontSize:66}));
        this.styles.push(new PIXI.TextStyle({fill:"pink", fontSize:77}));

        this.compositions.push(["[smileyBite]","SmileySmile","[smileySmile"]);
        this.compositions.push(["[smileyPuff]","[smileyBite]","[smileySmile"]);
        this.compositions.push(["[smileyPuff]","[smileyBite]","SmileySmile"]);
        this.compositions.push(["Smiley","[smileyBite]","Smile is a great album"]);
        this.compositions.push(["SmileySmile","by the","Beach Boys"]);
        this.compositions.push(["Brian Wilson","[smileyBite]","[smileySmile"]);
        this.compositions.push(["Brian Wilson","Beach Boys","[smileySmile"]);

        let t = new TimelineMax({repeat:-1});
        t.call(() => {this.createRandomImageText();});
        t.call(()=>{this.currentImageText.destroy();},[], "+=.1");
        t.play();
    }

    createRandomImageText(){
        const ranComposition = this.compositions[Math.floor(Math.random()*this.compositions.length)];
        const ranStyle = this.styles[Math.floor(Math.random()*this.styles.length)];
        const txt = new ImageText(this.resources, ranComposition, ranStyle, this.position.x, this.position.y);
        const container = txt.getContainer();
        this.stage.addChild(container);
        this.currentImageText = txt;
    }
}