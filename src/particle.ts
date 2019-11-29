import * as PIXI from "pixi.js";
import {Vector2} from "./utils";

export default class Particle{
    public sprite:PIXI.Sprite;
    public speed:Vector2;
    public timeOffset:number = 0;
    public rotationIntensity:number = 0;
    public spawnPosition:Vector2;
    public spawnSize:number;
    public spawnColor = [];

    constructor(sprite, attr){
        this.sprite = sprite;
        this.timeOffset = Math.random()*attr.lifetime;
        this.speed =  new Vector2(Math.random()*attr.speed,(Math.random()*.5)+0.5);
        this.rotationIntensity = Math.random()*.5+attr.wiggle;
        this.spawnPosition = attr.position;
        this.spawnSize = attr.size;
        this.spawnColor = attr.spawnColor;
        this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
    }

    public bringToFront(){
        this.sprite.parent.addChild(this.sprite);
    }

    public updatePosition(time, damp){
        this.sprite.x = this.spawnPosition.x + Math.sin(time*damp) * 10 * this.speed.x;
        this.sprite.y = this.spawnPosition.y - time * this.speed.y;
    }

    public updateSize(cycle){
        const size = Math.abs(this.spawnSize * Math.sin(( cycle * Math.PI * 2) * .5));
        this.sprite.width = this.sprite.height = size;
    }

    public updateTint(cycle){
        const newClr = [this.spawnColor[0], this.spawnColor[1] - cycle, this.spawnColor[2]];
        this.sprite.tint = PIXI.utils.rgb2hex(newClr);
    }
}