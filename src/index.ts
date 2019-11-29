import * as PIXI from "pixi.js";
import {TimelineMax} from 'gsap'
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

        var loader = new PIXI.Loader();
        loader.add("card",'img/playcard.png');
        loader.add("flame",'img/flam.png');
        loader.add("smileyBite",'img/smileyBite.png');
        loader.add("smileyPuff",'img/smileyPuff.png');
        loader.add("smileySmile",'img/smileySmile.png');
        loader.load((loader, resources) => {this.afterPreload(loader, resources)});

        new FPS(this.app.stage);
    }

    private afterPreload(loader, resources) {
        this.app.stage.sortableChildren = true;
        this.createCards(resources);
        this.createImageText(resources);
        this.createParticles(resources);
    }

    private createCards(resources){
        this.timeLine = new TimelineMax();
        this.timeLine.pause();//wait for all cards to be assigned before playing
        const cardController = new CardController(this.app, this.stageCenter);
        cardController.createCards(144, resources.card.texture);
        cardController.assignCardsToTimeline(this.timeLine);
        this.timeLine.play();
    }

    private createImageText(resources){
        new ImageTextController(this.app.stage, resources, this.stageCenter);
    }

    private createParticles(resources){
        const particleCenter = new Vector2(this.stageCenter.x, this.stageCenter.y-80);
        new ParticleFlame(this.app, resources, particleCenter);
    }
}
const a = new App();
