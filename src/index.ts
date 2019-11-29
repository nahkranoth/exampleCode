import * as PIXI from "pixi.js";
import {TimelineLite} from 'gsap'
import CardController from "./cardController";
import ParticleFlame from "./particleFlame";
import FPS from "./fps";
import {Vector2} from "./utils";
import ImageTextController from "./imageTextController";

class App {
    private app: PIXI.Application;
    private timeLine;
    private stageCenter:Vector2;

    constructor() {
        document.addEventListener("DOMContentLoaded", () => this.afterInit(), false);
    }

    private afterInit(){
        let body = document.body;
        this.stageCenter = new Vector2(body.scrollWidth/2, body.scrollHeight/2);
        this.app = new PIXI.Application({ width: body.scrollWidth, height: body.scrollHeight, antialias: true, transparent:true });
        document.body.appendChild(this.app.view);
        //Image preload phase
        var loader = new PIXI.Loader();
        loader.add("card",'img/playcard.png');
        loader.add("flame",'img/flam.png');
        loader.add("smileyBite",'img/smileyBite.png');
        loader.add("smileyPuff",'img/smileyPuff.png');
        loader.add("smileySmile",'img/smileySmile.png');
        loader.load((loader, resources) => {this.afterPreload(loader, resources)});
        var fps = new FPS(this.app.stage);
    }

    private afterPreload(loader, resources) {
        this.app.stage.sortableChildren = true;
        this.createCards(resources);
        this.createImageText(resources);
        this.createParticles(resources);
    }

    private createCards(resources){
        this.timeLine = new TimelineLite();
        this.timeLine.pause();

        const cardController = new CardController(this.app, this.stageCenter);
        cardController.createAllCards(144, resources.card.texture);
        cardController.assignCardsToTimeline(this.timeLine);

        this.timeLine.play();
    }

    private createImageText(resources){
        new ImageTextController(this.app.stage, resources, this.stageCenter);
    }

    private createParticles(resources){
        new ParticleFlame(this.app, resources, this.stageCenter);
    }


}
const a = new App();
