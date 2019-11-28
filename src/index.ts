import * as PIXI from "pixi.js";

class App {

    private app: PIXI.Application;

    constructor() {
        this.app = new PIXI.Application({ width: 640, height: 360, antialias: true });
        document.addEventListener("DOMContentLoaded", () => this.afterInit(), false);
    }

    private afterInit() {
        document.body.appendChild(this.app.view);
        this.app.stage.sortableChildren = true;


        const circle = new PIXI.Graphics();
        circle.beginFill(0x5cafe2);
        circle.drawCircle(0, 0, 80);
        circle.x = 320;
        circle.y = 180;
        circle.zIndex = 0;
        this.app.stage.addChild(circle);

        const circle2 = new PIXI.Graphics();
        circle2.beginFill(0x443344);
        circle2.drawCircle(0, 0, 80);
        circle2.x = 220;
        circle2.y = 180;
        circle2.zIndex = 1;

        this.app.stage.addChild(circle2);
    }

}
const a = new App();
