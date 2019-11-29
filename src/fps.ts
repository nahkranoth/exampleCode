import * as PIXI from "pixi.js";

export default class FPS{
    private times = [];
    private fps;
    private txt;

    constructor(stage){
        const style = new PIXI.TextStyle({fill:"white", fontSize:22});
        this.txt = new PIXI.Text("60", style);
        this.txt.y = 6;
        this.txt.x = 10;
        stage.addChild(this.txt);
        this.loop();
    }

    public loop() {
        window.requestAnimationFrame(() => {
            const now = performance.now();
            while (this.times.length > 0 && this.times[0] <= now - 1000) {
                this.times.shift();
            }
            this.times.push(now);
            this.fps = this.times.length;
            this.txt.text = this.fps + " FPS";
            this.loop();
        });
    }
}