"use strict";
exports.__esModule = true;
var PIXI = require("pixi.js");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.app = new PIXI.Application({ width: 640, height: 360, antialias: true });
        document.addEventListener("DOMContentLoaded", function () { return _this.afterInit(); }, false);
    }
    App.prototype.afterInit = function () {
        document.body.appendChild(this.app.view);
        this.app.stage.sortableChildren = true;
        var circle = new PIXI.Graphics();
        circle.beginFill(0x5cafe2);
        circle.drawCircle(0, 0, 80);
        circle.x = 320;
        circle.y = 180;
        circle.zIndex = 0;
        this.app.stage.addChild(circle);
        var circle2 = new PIXI.Graphics();
        circle2.beginFill(0x443344);
        circle2.drawCircle(0, 0, 80);
        circle2.x = 220;
        circle2.y = 180;
        circle2.zIndex = 1;
        this.app.stage.addChild(circle2);
    };
    return App;
}());
var a = new App();
//# sourceMappingURL=index.js.map