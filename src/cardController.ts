import Card from "./card"
import {CardStack} from "./cardStack";
import {Vector2} from "./mathUtils";

export class CardController{
    private cardOffset:Vector2 = {x:0, y:-1};

    private firstCardStack:CardStack;
    private secondCardStack:CardStack;

    public app:PIXI.Application;

    constructor(app){
        this.app = app;
        // this.xCenter = this.app.renderer.width / 2;
        // this.yCenter = this.app.renderer.height / 2;
        this.firstCardStack = new CardStack(120, 220);
        this.secondCardStack = new CardStack(320, 220);
    }

    public createCards(amount, image){
        for(var i=0;i<amount;i++){
            const card = this.createCard(i, image);
            this.firstCardStack.Assign(card);
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