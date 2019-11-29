export class Vector2{
    public x:number;
    public y:number;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    static Add(a, b){
        let result:Vector2 = new Vector2(0,0);
        result.x = a.x + b.x;
        result.y = a.y + b.y;
        return result;
    }
}