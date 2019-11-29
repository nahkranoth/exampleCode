import Card from "./card";
import {Vector2} from "./mathUtils";

export class CardStack{
    public position:Vector2;

    constructor(x, y){
        this.position = new Vector2(x, y);
    }

    public Assign(card:Card){
        card.setTransform(this.position);
    }
}