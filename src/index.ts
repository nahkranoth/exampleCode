import * as PIXI from "pixi.js";
import * as path from 'path'
import {TweenMax} from 'gsap'
import {CardController} from "./cardController";

class App {
    private app: PIXI.Application;
    constructor() {
        this.app = new PIXI.Application({ width: 640, height: 360, antialias: true });
        document.addEventListener("DOMContentLoaded", () => this.afterInit(), false);
    }

    private afterInit(){
        document.body.appendChild(this.app.view);

        //Image preload phase
        var loader = new PIXI.Loader();
        loader.add("card",'img/playcard.png');
        loader.load((loader, resources) => {this.afterPreload(loader, resources)});
    }

    private afterPreload(loader, resources) {
        this.app.stage.sortableChildren = true;
        const cardController = new CardController(this.app);
        cardController.createCards(144, resources.card.texture);
    }


    // private createParticles(){
    //     const container = new PIXI.ParticleContainer(10);
    //     for (let i = 0; i < 100; ++i)
    //     {
    //         let sprite = PIXI.Sprite.from("myImage.png");
    //         container.addChild(sprite);
    //     }
    // }


}
const a = new App();
