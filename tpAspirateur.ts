//tableau représantant les différentes orientations possible pour un objet
let globalListDirection = ["N","E","S","W"];
//tableau d'instruction donnée à l'aspirateur
let globalListOfInstruction = ["D","A","D","A","D","A","D","A","A"];


let main = ():void =>{
    //Générer une pièce
    let room = createRoom(10,10);

    //Crée l'aspirateur
    let vacuumCleaner = new VacuumCleaner(5,5,"N");
    
    //effectuer les instructions de l'aspirateur et les afficher en console
    globalListOfInstruction.forEach(element => {
        objectMouving(vacuumCleaner,element,room);
    });
    
}

//génération de la pièce dans laquelle se déplacera l'aspirateur 
let createRoom = (x:number,y:number):any => {
    let grid = [] ;
    for(let i = 0 ; i<x; i++){
        let rowGrid = [];
        for(let j = 0 ; j<y ;j++){
            rowGrid.push(`x = ${i} et y =${j}`);
        }
        grid.push(rowGrid);
    }
    return grid ;
}

//Classe abstraite liés à tout les objets dans la pièce qui auront une abscisse et une ordonnée (même les objets immobiles)
abstract class ObjectInRoom {
    x:number;
    y:number;    
    constructor(x:number, y:number) { 
        this.x = x ;
        this.y = y ;        
    } 
}
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
class VacuumCleaner extends ObjectInRoom {
    type:string;  
    orientation:string;     
    constructor(x:number, y:number, orientation:string){
        super(x,y);
        this.orientation = orientation ;
        this.type = "aspirateur" ;      
    }
    setOrientation(newOrientation:string):void{
        this.orientation = newOrientation ;
    }
    setX(newX:number):void{
        this.x = newX ;
    }
    setY(newY:number):void{
        this.y = newY ;
    }
}

// function permettant de bouger un objet en fonction de la direction choisi
let objectMouving = (objectToMouv:VacuumCleaner,orientation:string,room:any):void =>{
    if(orientation === "D" ||  orientation === "G"){
        if(orientation === "D"){ objectNewRotation(objectToMouv,"D"); }
        if(orientation === "G"){ objectNewRotation(objectToMouv,"G"); }        
    }
    if(orientation === "A"){ objectMoveForward(objectToMouv,room)}
    console.log(objectToMouv);
}

//nouvelle orientation d'un objet après avoir effectué une rotation à gauche ou à droite
let objectNewRotation = (orientationOfObjectToMouv:VacuumCleaner,rotationToDo:string):void => {
    let degre:number ;
    if(rotationToDo === "D"){degre = 1 ;}
    if(rotationToDo === "G"){degre = -1 ;} 

    let indexOfActualOrientation = globalListDirection.indexOf(orientationOfObjectToMouv.orientation)
    let indexOfNewOrientation = indexOfActualOrientation + degre ;

    if(indexOfNewOrientation < 0){
        indexOfNewOrientation = globalListDirection.length -1 ;
    }
    if(indexOfNewOrientation > globalListDirection.length - 1 ){
        indexOfNewOrientation = 0 ;
    }

    orientationOfObjectToMouv.setOrientation(globalListDirection[indexOfNewOrientation]);
    
}

//position de l'objet après avoir avant avancer selon sont orientation actuelle
let objectMoveForward = (objectToMouvForward:VacuumCleaner,room:any):void =>{
    let newX:number;
    let newY:number;
    if(objectToMouvForward.orientation === "N"){newX = objectToMouvForward.x ;newY = objectToMouvForward.y+1 ; }
    if(objectToMouvForward.orientation === "S"){newX = objectToMouvForward.x ;newY = objectToMouvForward.y-1 ; }
    if(objectToMouvForward.orientation === "E"){newX = objectToMouvForward.x+1 ;newY = objectToMouvForward.y ; }
    if(objectToMouvForward.orientation === "W"){newX = objectToMouvForward.x-1 ;newY = objectToMouvForward.y ; }

    if( newX > -1 && newX < room.length-1 && newY >- 1 && newY < room[0].length-1 ){
        objectToMouvForward.setX(newX);
        objectToMouvForward.setY(newY);
    }
    //(try catch ?)
}


main();