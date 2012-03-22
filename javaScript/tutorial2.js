// Tutorial 2: the javascript
// The models used need to be parsed before the page
// render. This code will parse the model files
// and when this complete the parser will call the
// main. The argument being passed - "tutorial" -
// is the id of the canvas element on the html page.

c3dl.addMainCallBack(canvasMain, "tutorial");

//c3dl.addModel("duck.dae");
//var duck;

// The program main
function canvasMain(canvasName){

 // Create new c3dl.Scene object
 scn = new c3dl.Scene();
 scn.setCanvasTag(canvasName);


 // Create GL context
 renderer = new c3dl.WebGL();
 renderer.createRenderer(this);

 // Attach renderer to the scene
 scn.setRenderer(renderer);
 scn.init(canvasName);

 //the isReady() function tests whether or not a renderer
 //is attached to a scene.  If the renderer failed to
 //initialize this will return false but only after you
 //try to attach it to a scene.
 if(renderer.isReady() )
 {
 // Create a Collado object that
 // will contain a imported
 // model of something to put
 // in the scene.

//duck = new c3dl.Collada();

ejeX = new c3dl.Line();
ejeX.setCoordinates([0,0,0], [100,0,0]);
ejeX.setColors([1,0,0], [1,0,0]);

ejeY = new c3dl.Line();
ejeY.setCoordinates([0,0,0], [0,100,0]);
ejeY.setColors([0,1,0], [0,1,0]);

ejeZ = new c3dl.Line();
ejeZ.setCoordinates([0,0,0], [0,0,100]);
ejeZ.setColors([0,0,1], [0,0,1]);

//Creacion de esfera



 // If the path is already parsed
 // (as it is in this case)
 // then the model is automatically retrieved
 // from a collada manager.
// duck.init("duck.dae");
 

 // Give the duck a bit of a spin on y
// duck.setAngularVel(new Array(0.0, 0.001, 0.0));

 /*Añadimos los objetos creados a las escena*/
 
 //EJES
 scn.addObjectToScene(ejeX);
 scn.addObjectToScene(ejeY);
 scn.addObjectToScene(ejeZ);
 
 

 // Create a camera
 var cam = new c3dl.FreeCamera();

 // Place the camera.
 // WebGL uses a right handed co-ordinate system.
 // move 200 to the right
 // move 300 up
 // move 500 units out
 cam.setPosition(new Array(20.0, 20.0, 20.0));

 // Point the camera.
 // Here it is pointed at the same location as
 // the duck so the duck will appear centered.
 cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));

 // Add the camera to the scene
 scn.setCamera(cam);

 // Start the scene
 scn.startScene();
 }
}