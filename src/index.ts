import * as PIXI from "pixi.js";
import {TimelineLite} from 'gsap'
import CardController from "./cardController";
import ImageText from "./ImageText";
import ParticleFlame from "./particleFlame";

class App {
    private app: PIXI.Application;
    private timeLine;

    constructor() {
        this.app = new PIXI.Application({ width: 640, height: 360, antialias: true });
        document.addEventListener("DOMContentLoaded", () => this.afterInit(), false);
    }

    private afterInit(){
        document.body.appendChild(this.app.view);
        //Image preload phase
        var loader = new PIXI.Loader();
        loader.add("card",'img/playcard.png');
        loader.add("flame",'img/flam.png');
        loader.load((loader, resources) => {this.afterPreload(loader, resources)});
    }

    private afterPreload(loader, resources) {
        this.app.stage.sortableChildren = true;
        // this.createCards(resources);
        // this.createImageText(resources);
        this.createParticles(resources);
    }

    private createCards(resources){
        this.timeLine = new TimelineLite();
        this.timeLine.pause();

        const cardController = new CardController(this.app);
        cardController.createAllCards(144, resources.card.texture);
        cardController.assignCardsToTimeline(this.timeLine);

        this.timeLine.play();
    }

    private createImageText(resources){
        const style = new PIXI.TextStyle({fill:"white", fontSize:44});
        const txt = new ImageText(resources, ["Test","[card]", "Test", "[card]"], style, 200, 200);
        const container = txt.getContainer();
        this.app.stage.addChild(container);
    }

    private createParticles(resources){
        const particleFlame = new ParticleFlame(this.app, resources);
    }


}
const a = new App();
