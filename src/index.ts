import * as PIXI from "pixi.js";
import * as path from 'path'

class App {

    private app: PIXI.Application;
    private cardAmount = 5;
    private xCenter;
    private yCenter;
    private xCenterOffset = -200;
    private yCenterOffset = 0;
    private xOffset = -2;
    private yOffset = -2;

    constructor() {
        this.app = new PIXI.Application({ width: 640, height: 360, antialias: true });
        document.addEventListener("DOMContentLoaded", () => this.afterInit(), false);
    }

    private afterInit(){
        var loader = new PIXI.Loader();
        loader.add("card",'img/playcard.png');
        loader.load((loader, resources) => {this.afterPreload(loader, resources)});
    }

    private afterPreload(loader, resources) {
        console.log("Preloaded");
        this.xCenter = this.app.renderer.width / 2;
        this.yCenter = this.app.renderer.height / 2;
        document.body.appendChild(this.app.view);
        this.app.stage.sortableChildren = true;
        for(var i=0;i<this.cardAmount;i++){
            this.createCard(i, resources.card.texture);
        }
    }

    private createCard(index, image){
        const position = this.getStartPositionFromIndex(index);
        //TODO: preload Image
        const card = PIXI.Sprite.from(image);
        card.width = 100;
        card.height = 140;
        card.anchor.x = 0.5;
        card.anchor.y = 0.5;
        card.zIndex = index;
        card.x = position.x;
        card.y = position.y;
        this.app.stage.addChild(card);
    }

    private getStartPositionFromIndex(index){
        const x = this.xCenter + index * this.xOffset + this.xCenterOffset;
        const y = this.yCenter + index * this.yOffset + this.yCenterOffset;
        return {x:x, y:y}
    }
}
const a = new App();
