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

    private flipIndex(){
        this.cardSprite.zIndex *= -1;
    }

    public getTween(){
        var timeline = new TimelineLite();
        timeline.add( TweenMax.to(this.cardSprite, 2, {x:300}));
        timeline.call( () => { this.flipIndex() });
        timeline.add( TweenMax.to(this.cardSprite, 2, {x:400}));

        return timeline;
    }
}