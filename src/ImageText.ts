import * as PIXI from "pixi.js";
import {Vector2} from "./Utils";

export default class ImageText{

    private resources;
    private stack:Array<ContentItem> = [];
    private container:PIXI.Container;
    private style:PIXI.TextStyle;
    private position:Vector2;
    private height:number;
    private lastX:number;
    private xOffset:number = 20;

    constructor(resources, content, style, x, y){
        this.resources = resources;
        this.style = style;
        this.position = new Vector2(x,y);
        this.lastX = x;
        this.container = new PIXI.Container();
        this.height = style.fontSize/1.333; //transform from points to pixels
        this.xOffset *= style.fontSize/100;
        this.processContentToStack(content);
        this.processStack();
    }

    public getContainer(){
        return this.container;
    }

    private processStack(){
        for(var i=0;i<this.stack.length;i++){
            let item = this.stack[i];
            const displayItem = item.isImage ? this.addImage(item.image) : this.addText(item.text);
            this.container.addChild(displayItem);
            this.lastX = displayItem.x + displayItem.width + this.xOffset;
        }
    }

    private addText(txt){
        const result = new PIXI.Text(txt, this.style);
        result.x = this.lastX;
        result.y = this.position.y;
        return result;
    }

    private addImage(img){
        const sprite = PIXI.Sprite.from(img);
        const ratio = sprite.width/sprite.height;
        sprite.height = this.height;
        sprite.width = this.height * ratio;
        sprite.x = this.lastX;
        sprite.y = this.position.y + this.height/4;//divided by 4 to compensate for text texture margin
        return sprite;
    }

    private processContentToStack(content){
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
    public image;
    public text:string;
    constructor(isImage = false, text = "", image = undefined){
        this.isImage = isImage;
        this.image = image;
        this.text = text;
    }
}