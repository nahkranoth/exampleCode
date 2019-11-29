import * as PIXI from "pixi.js";
import {Vector2} from "./Utils";
import Particle from "./particle"

export default class ParticleFlame{
    private stack:Array<Particle> = [];
    private amount:number = 10;
    private time:number = 0;

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
        const size = 46;
        const position = new Vector2(300, 300);
        for (let i = 0; i < this.amount; ++i)
        {
            let sprite = PIXI.Sprite.from(texture);
            sprite.width = size;
            sprite.height = size;
            const particle = new Particle(sprite, {
                lifetime:100,
                position: position,
                size: size,
                spawnColor:[1,1,0],
                wiggle: 0.3
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
            const clampTime = particleTime % particle.lifetime;
            const lifeTimeCycle = clampTime/particle.lifetime;

            particle.updatePosition(clampTime);
            particle.updateSize(lifeTimeCycle);
            particle.updateTint(lifeTimeCycle);

            particle.sprite.angle = Math.cos(clampTime*0.1) * 180/Math.PI * particle.rotationIntensity;
        }
    }
}
