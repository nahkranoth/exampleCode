import Card from "./card"
import {Vector2} from "./mathUtils";

export class CardController{
    private cardOffset:Vector2 = new Vector2(0, -1);
    private firstStackPosition:Vector2 = new Vector2(120, 220);
    private secondStackPosition:Vector2 = new Vector2(320, 220);

    public stack:Array<Card> = [];
    public app:PIXI.Application;

    constructor(app){
        this.app = app;
        // this.xCenter = this.app.renderer.width / 2;
        // this.yCenter = this.app.renderer.height / 2;

    }
    //TODO: image array for random graphics
    public createAllCards(amount, image){
        for(var i=0;i<amount;i++){
            const card = this.createCard(i, image);
            card.setTransform(this.firstStackPosition);
            this.stack.push(card);
        }
    }

    public assignCardsToTimeline(timeline){
        for(var i=this.stack.length-1;i>=0;i--) {
            const card = this.stack[i];
            timeline.add(card.getTween(), "-=1");
        }
    }

    private createCard(index, image){
        const offset = this.getOffsetPositionFromIndex(index);
        const card = new Card(index, image, offset);
        this.app.stage.addChild(card.cardSprite);
        return card;
    }

    private getOffsetPositionFromIndex(index){
        const x = index * this.cardOffset.x;
        const y = index * this.cardOffset.y;
        return {x:x, y:y}
    }
}