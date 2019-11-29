import * as PIXI from "pixi.js";
import {Vector2} from "./utils";
import Particle from "./particle"

export default class ParticleFlame{
    private stack:Array<Particle> = [];
    private amount:number = 10;
    private time:number = 0;
    private size:number = 66;
    private lifetime:number = 100;
    private position:Vector2;
    private wiggleMultiply:number = 0.12;

    constructor(app, resources, position){
        this.position = position;
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
            sprite.width = this.size;
            sprite.height = this.size;
            const particle = new Particle(sprite, {
                lifetime:this.lifetime,
                position: this.position,
                size: this.size,
                spawnColor:[1,1,0],
                wiggle: 0.3,
                speed:1.6
            });
            this.stack.push(particle);
            container.addChild(sprite);
        }
    }

    private update(dt){
        this.time += dt;
        for(let i=0;i<this.stack.length;i++){
            var particle = this.stack[i];

            const particleTime = this.time + particle.timeOffset;
            const clampTime = particleTime % this.lifetime;
            const lifeTimeCycle = clampTime/this.lifetime;

            if(clampTime <= 1){
                particle.bringToFront();
            }

            particle.updatePosition(clampTime, this.wiggleMultiply);
            particle.updateSize(lifeTimeCycle);
            particle.updateTint(lifeTimeCycle);

            particle.sprite.angle = Math.cos(clampTime*this.wiggleMultiply) * 180/Math.PI * particle.rotationIntensity;
        }
    }
}
