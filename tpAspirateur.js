var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//tableau représantant les différentes orientations possible pour un objet
var globalListDirection = ["N", "E", "S", "W"];
//tableau d'instruction donnée à l'aspirateur
var globalListOfInstruction = ["D", "A", "D", "A", "D", "A", "D", "A", "A"];
var main = function () {
    //Générer une pièce
    var room = createRoom(10, 10);
    //Crée l'aspirateur
    var vacuumCleaner = new VacuumCleaner(5, 5, "N");
    //effectuer les instructions de l'aspirateur et les afficher en console
    globalListOfInstruction.forEach(function (element) {
        objectMouving(vacuumCleaner, element, room);
    });
};
//génération de la pièce dans laquelle se déplacera l'aspirateur 
var createRoom = function (x, y) {
    var grid = [];
    for (var i = 0; i < x; i++) {
        var rowGrid = [];
        for (var j = 0; j < y; j++) {
            rowGrid.push("x = " + i + " et y =" + j);
        }
        grid.push(rowGrid);
    }
    return grid;
};
//Classe abstraite liés à tout les objets dans la pièce qui auront une abscisse et une ordonnée (même les objets immobiles)
var ObjectInRoom = /** @class */ (function () {
    function ObjectInRoom(x, y) {
        this.x = x;
        this.y = y;
    }
    return ObjectInRoom;
}());
//Classe abstraite liés à tout les objets dans la pièce qui auront la possibilité de bouger
/*
abstract class ObjectMouvingInRoom extends ObjectInRoom {
    orientation:string;
    constructor(x:number, y:number, orientation:string){
        super(x,y);
        this.orientation = orientation;
    }
    newOrientation(newOrientation:string):void{
        this.orientation = newOrientation ;
    }
}
*/
//Objets de type aspirateur
var VacuumCleaner = /** @class */ (function (_super) {
    __extends(VacuumCleaner, _super);
    function VacuumCleaner(x, y, orientation) {
        var _this = _super.call(this, x, y) || this;
        _this.orientation = orientation;
        _this.type = "aspirateur";
        return _this;
    }
    VacuumCleaner.prototype.setOrientation = function (newOrientation) {
        this.orientation = newOrientation;
    };
    VacuumCleaner.prototype.setX = function (newX) {
        this.x = newX;
    };
    VacuumCleaner.prototype.setY = function (newY) {
        this.y = newY;
    };
    return VacuumCleaner;
}(ObjectInRoom));
// function permettant de bouger un objet en fonction de la direction choisi
var objectMouving = function (objectToMouv, orientation, room) {
    if (orientation === "D" || orientation === "G") {
        if (orientation === "D") {
            objectNewRotation(objectToMouv, "D");
        }
        if (orientation === "G") {
            objectNewRotation(objectToMouv, "G");
        }
    }
    if (orientation === "A") {
        objectMoveForward(objectToMouv, room);
    }
    console.log(objectToMouv);
};
//nouvelle orientation d'un objet après avoir effectué une rotation à gauche ou à droite
var objectNewRotation = function (orientationOfObjectToMouv, rotationToDo) {
    var degre;
    if (rotationToDo === "D") {
        degre = 1;
    }
    if (rotationToDo === "G") {
        degre = -1;
    }
    var indexOfActualOrientation = globalListDirection.indexOf(orientationOfObjectToMouv.orientation);
    var indexOfNewOrientation = indexOfActualOrientation + degre;
    if (indexOfNewOrientation < 0) {
        indexOfNewOrientation = globalListDirection.length - 1;
    }
    if (indexOfNewOrientation > globalListDirection.length - 1) {
        indexOfNewOrientation = 0;
    }
    orientationOfObjectToMouv.setOrientation(globalListDirection[indexOfNewOrientation]);
};
//position de l'objet après avoir avant avancer selon sont orientation actuelle
var objectMoveForward = function (objectToMouvForward, room) {
    var newX;
    var newY;
    if (objectToMouvForward.orientation === "N") {
        newX = objectToMouvForward.x;
        newY = objectToMouvForward.y + 1;
    }
    if (objectToMouvForward.orientation === "S") {
        newX = objectToMouvForward.x;
        newY = objectToMouvForward.y - 1;
    }
    if (objectToMouvForward.orientation === "E") {
        newX = objectToMouvForward.x + 1;
        newY = objectToMouvForward.y;
    }
    if (objectToMouvForward.orientation === "W") {
        newX = objectToMouvForward.x - 1;
        newY = objectToMouvForward.y;
    }
    if (newX > -1 && newX < room.length - 1 && newY > -1 && newY < room[0].length - 1) {
        objectToMouvForward.setX(newX);
        objectToMouvForward.setY(newY);
    }
    //(try catch ?)
};
main();
