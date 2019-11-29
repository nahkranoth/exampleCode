import * as PIXI from "pixi.js";
import {TimelineLite, TweenMax} from "gsap";
import {Vector2} from "./utils";

export default class Card{
    public cardSprite:PIXI.Sprite;
    private offsetPosition:Vector2;
    private stageCenter:Vector2;

    constructor(index, image, offset, stageCenter){
        this.stageCenter = stageCenter;
        this.cardSprite = PIXI.Sprite.from(image);
        this.cardSprite.width = 100;
        this.cardSprite.height = 140;
        this.cardSprite.anchor.x = 0.5;
        this.cardSprite.anchor.y = 0.5;
        this.cardSprite.zIndex = index;
        this.offsetPosition = offset;
    }

    public setTransform(position){
        this.cardSprite.x = position.x + this.offsetPosition.x;
        this.cardSprite.y = position.y + this.offsetPosition.y;
    }

    private flipZIndex(){
        this.cardSprite.zIndex *= -1;
    }

    public getTween(goal){
        var timeline = new TimelineLite();
        timeline.add(TweenMax.to(this.cardSprite, 1, {x:this.stageCenter.x, y:goal.y/2}));
        timeline.call( () => { this.flipZIndex() });
        timeline.add(TweenMax.to(this.cardSprite, 1, {x:goal.x, y:goal.y}));
        return timeline;
    }
}