import Card from "./card"
import {Vector2} from "./utils";

export default class CardController{
    private stageCenter:Vector2;
    private cardOffset:Vector2 = new Vector2(0, -1);
    private firstStackPosition:Vector2;
    private secondStackPosition:Vector2;

    public stack:Array<Card> = [];
    public app:PIXI.Application;

    constructor(app, stageCenter){
        this.app = app;
        this.stageCenter = stageCenter;
        this.firstStackPosition = new Vector2(stageCenter.x-200, stageCenter.y-120);
        this.secondStackPosition = new Vector2(stageCenter.x+200, stageCenter.y-120);
    }

    public createCards(amount, image){
        for(var i=0;i<amount;i++){
            const card = this.createSingleCard(i, image);
            card.setTransform(this.firstStackPosition);
            this.stack.push(card);
        }
    }

    public assignCardsToTimeline(timeline){
        for(var i=this.stack.length-1;i>=0;i--) {
            const card = this.stack[i];
            const x = (i-this.stack.length)*this.cardOffset.x;
            const y = (i-this.stack.length)*-this.cardOffset.y;
            const offset = new Vector2(x, y);
            const goalPosition = Vector2.Add(this.secondStackPosition, offset);
            timeline.add(card.getTween(goalPosition), "-=1");
        }
    }

    private createSingleCard(index, image){
        const offset = this.getOffsetPositionFromIndex(index);
        const card = new Card(index, image, offset, this.stageCenter);
        this.app.stage.addChild(card.cardSprite);
        return card;
    }

    private getOffsetPositionFromIndex(index){
        const x = index * this.cardOffset.x;
        const y = index * this.cardOffset.y;
        return {x:x, y:y}
    }
}