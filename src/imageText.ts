import * as PIXI from "pixi.js";
import {Vector2} from "./utils";

export default class ImageText{

    private resources;
    private stack:Array<ContentItem> = [];
    private container:PIXI.Container;
    private style:PIXI.TextStyle;
    private position:Vector2;
    private height:number;
    private lastX:number;
    private xOffset:number = 20;
    private width:number = 0;

    constructor(resources, content, style, x, y){
        this.resources = resources;
        this.style = style;
        this.position = new Vector2(x,y);
        this.lastX = x;
        this.container = new PIXI.Container();
        this.height = style.fontSize/1.333; //transform from points to pixels
        this.xOffset *= style.fontSize/100; //offset dependant on font size
        this.contentToStack(content);
        this.applyStack();
        this.centerContainer();
    }

    public destroy(){
        this.container.destroy({children:true});
    }

    public getContainer(){
        return this.container;
    }

    private centerContainer(){
        this.container.x = -(this.width/2)+this.xOffset; //center text
    }

    private applyStack(){
        for(var i=0;i<this.stack.length;i++){
            let item = this.stack[i];
            const displayItem = item.isImage ? this.addImage(item.image) : this.addText(item.text);
            this.container.addChild(displayItem);
            const itemWidth = displayItem.width + this.xOffset;
            this.width += itemWidth;
            this.lastX = displayItem.x + itemWidth;
        }
    }

    private addText(txt){
        let result = new PIXI.Text(txt, this.style);
        result.x = this.lastX;
        result.y = this.position.y;
        return result;
    }

    private addImage(img){
        const sprite = PIXI.Sprite.from(img);
        const ratio = sprite.width/sprite.height;
        sprite.height = this.height * 1.1;
        sprite.width = this.height * 1.1 * ratio;
        sprite.x = this.lastX;
        sprite.anchor.y = 0.5;
        sprite.y = this.position.y + this.height*.95;//divided by 2 to compensate for text/texture margin
        return sprite;
    }

    private contentToStack(content){
        for(var i=0;i<content.length;i++){
            let item = content[i];
            if(item[0] == "["){
                const imgName = item.split("[")[1].split("]")[0];
                this.stack.push(new ContentItem(true, "", this.resources[imgName].texture));
                continue;
            }
            this.stack.push(new ContentItem(false, item))
        }
    }
}

class ContentItem{
    public isImage:boolean;
    public image:PIXI.Sprite;
    public text:string;
    constructor(isImage = false, text = "", image = undefined){
        this.isImage = isImage;
        this.image = image;
        this.text = text;
    }
}