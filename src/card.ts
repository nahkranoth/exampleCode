import * as PIXI from "pixi.js";
import {TimelineLite, TweenMax} from "gsap";
import {Vector2} from "./mathUtils";

export default class Card{
    public cardSprite:PIXI.Sprite;
    private offsetPosition:Vector2;

    constructor(index, image, offset){
        this.cardSprite = PIXI.Sprite.from(image);
        this.cardSprite.width = 100;
        this.cardSprite.height = 140;
        this.cardSprite.anchor.x = 0.5;
        this.cardSprite.anchor.y = 0.5;
        this.cardSprite.zIndex = index;
        this.offsetPosition = offset;
    }

    public setTransform(position:Vector2){
        this.cardSprite.x = position.x + this.offsetPosition.x;
        this.cardSprite.y = position.y + this.offsetPosition.y;
    }

    private flipZIndex(){
        this.cardSprite.zIndex *= -1;
    }

    public getTween(goalPosition){
        var timeline = new TimelineLite();
        timeline.add( TweenMax.to(this.cardSprite, 1, {x:goalPosition.x/2, y:goalPosition.y/2}));
        timeline.call( () => { this.flipZIndex() });
        timeline.add( TweenMax.to(this.cardSprite, 1, {x:goalPosition.x, y:goalPosition.y}));
        return timeline;
    }
}