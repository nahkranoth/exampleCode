import * as PIXI from "pixi.js";
import {Vector2} from "./Utils";
import rgb2hex = PIXI.utils.rgb2hex;

export default class ParticleFlame{
    private stack:Array<Particle> = [];
    private amount:number = 10;
    private time:number = 0;
    private particleSpawnSize = 46;
    private spawnColor = [1,1,0];
    private spawnPosition:Vector2 = new Vector2(300, 300);
    constructor(app, resources){
        const container = new PIXI.ParticleContainer(this.amount, {
            vertices: true,
            position: true,
            rotation: true,
            uvs: true,
            tint: true
        });

        app.stage.addChild(container);
        this.spawnParticles(container, resources.flame.texture);
        app.ticker.add((dt)=>{this.update(dt)})
    }
    
    private spawnParticles(container, texture){
        for (let i = 0; i < this.amount; ++i)
        {
            let sprite = PIXI.Sprite.from(texture);
            sprite.width = this.particleSpawnSize;
            sprite.height = this.particleSpawnSize;
            const particle = new Particle();
            particle.sprite = sprite;
            particle.timeOffset = Math.random()*100;
            particle.lifetime = 100;
            particle.speed =  new Vector2(Math.random()*1.3,(Math.random()*.5)+0.5);
            particle.rotationIntensity = Math.random()*.5+.3;
            this.stack.push(particle);
            container.addChild(sprite);
        }
    }

    private update(dt){
        this.time += dt;
        for(let i=0;i<this.stack.length;i++){
            var particle = this.stack[i];
            const particleTime = this.time + particle.timeOffset;
            const clampTime = particleTime % particle.lifetime;
            particle.sprite.x = this.spawnPosition.x + Math.sin(clampTime*0.1)* 10 * particle.speed.x;
            particle.sprite.y = this.spawnPosition.y - clampTime * particle.speed.y;
            const lifeTimeCycle = clampTime/particle.lifetime;
            const size = Math.abs(this.particleSpawnSize * Math.sin(( lifeTimeCycle * Math.PI * 2) * .5));
            particle.sprite.width = particle.sprite.height = size;
            particle.sprite.anchor.x = 0.5;
            particle.sprite.anchor.y = 0.5;
            const newGreen = this.spawnColor[1] - clampTime/particle.lifetime;
            const newClr = [this.spawnColor[0], newGreen, this.spawnColor[2]];
            particle.sprite.tint = PIXI.utils.rgb2hex(newClr);
            particle.sprite.angle = Math.cos(clampTime*0.1) * 180/Math.PI * particle.rotationIntensity;
        }
    }
}

class Particle{
    public sprite:PIXI.Sprite;
    public speed:Vector2;
    public lifetime:number = 1;
    public timeOffset:number = 0;
    public rotationIntensity:number = 0;
}