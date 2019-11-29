import Card from "./card"
import {Vector2} from "./utils";

/*TODO:

    Cleanup zIndex flip
    Make animation nicer
    Dress stage

*/

export default class CardController{
    private cardOffset:Vector2 = new Vector2(0, -1);
    private firstStackPosition:Vector2;
    private secondStackPosition:Vector2;

    public stack:Array<Card> = [];
    public app:PIXI.Application;


    constructor(app, stageCenter){
        this.app = app;
        this.firstStackPosition = new Vector2(stageCenter.x-200, stageCenter.y-120);
        this.secondStackPosition = new Vector2(stageCenter.x+200, stageCenter.y-120);

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
            const x = (i-this.stack.length)*this.cardOffset.x;
            const y = (i-this.stack.length)*-this.cardOffset.y;
            const offset = new Vector2(x, y);
            const goalPosition = Vector2.Add(this.secondStackPosition, offset);
            timeline.add(card.getTween(goalPosition), "-=1");
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