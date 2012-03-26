/**
 * Sistema solar
 * @autor José Manuel Serrano Mármol
 * @autor Raul Salazar de Torres
 */


c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("recursos/modelos/tierra.dae");
c3dl.addModel("recursos/modelos/jupiter.dae");


    /*
     * *****************VARIABLES GLOBALES**************
     */  
var mundo;
var tiempoDesdeCambio = 0;
var isDragging = false; //Nos muestra si se esta actualmente moviendo el ratón o no
var rotationStartCoords = [0,0]; //Coordenadas en las que el ratón comienza la rotación
var SENSITIVITY = 0.7;
ZOOM_SENSITIVITY = 3;

var NUM_PARTICULAS = 100;

var timesincelastchange=0; //Variable de llamada al callback
var tierra;

//Llamada cuando el usuario levanta la tecla izquierda del ratón
function mouseUp(evt)
{
	if(evt.which == 1)
	{
		isDragging = false;
	}
}

//Llamada cuando el usuario baja la tecla izquierda del ratón
// grabandose la posición de partida del ratón para utilizarlo como datos de referencia
function mouseDown(evt)
{
	if(evt.which == 1)
	{
		isDragging = true;
		rotationStartCoords[0] = xevtpos(evt);
		rotationStartCoords[1] = yevtpos(evt);
	}
}



//Llamada producida con el movimiento del ratón.
//Esta función unicamente funciona cuando se mantiene activo el botón izqeuirdo del ratón.
//Determina cuanto ha sido el movimiento producido por el ratón para realizar rotaciones con respecto a ello.
function mouseMove(evt)
{
	if(isDragging == true)
	{
                var cam = scn.getCamera();
		var x = xevtpos(evt);
		var y = yevtpos(evt);
		
		// how much was the cursor moved compared to last time
		// this function was called?
		var deltaX = x - rotationStartCoords[0];
                var deltaY = y - rotationStartCoords[1];

		cam.yaw(-deltaX * SENSITIVITY);
		cam.pitch(deltaY * SENSITIVITY);
		
		// now that the camera was updated, reset where the
		// rotation will start for the next time this function is 
		// called.
		rotationStartCoords = [x,y];
	}
}


//Llamada producida con el movimiento del Scroll del ratón y produciendonos zoom
function mouseScroll(evt) {
	var cam = scn.getCamera();
        var pos = cam.getPosition();
        var constante_movimiento = 5;
        
	if(-evt.detail*ZOOM_SENSITIVITY < 0)
		{
                    cam.setPosition([pos[0]-constante_movimiento,pos[1]-constante_movimiento,pos[2]-constante_movimiento]);            
                    cam.goFarther(-1 * -evt.detail*ZOOM_SENSITIVITY);
                        
		}
		
		// towards screen
		else
		{
                     cam.setPosition([pos[0]+constante_movimiento,pos[1]+constante_movimiento,pos[2]+constante_movimiento]);
                     cam.goCloser(-evt.detail*ZOOM_SENSITIVITY);
		}
}



//Calcula el valor de la coordenada X de la ventana
function xevtpos(evt)
{
    return 2 * (evt.clientX / evt.target.width) - 1;
}

//Calcula el valor de la coordenada Y de la ventana
function yevtpos(evt)
{
    return 2 * (evt.clientY / evt.target.height) - 1;
}



//Callback para llamar a rotacion
function spinduck(time){
 // Tiempo en milisegundos de refresco
 timesincelastchange+=time;

 //El refresco se produce cada 3 seg
 if(timesincelastchange >=3000){
 tierra.setAngularVel(new Array(0.0,y,0.0));
 //tierra.rotateOnAxis([0,1,0], 20);

 timesincelastchange = 0;
 }
}

function getAleatorio(min, max){
    return trimNums(c3dl.getRandom(min, max));
}

function canvasMain(canvasName){

     // Creamos nueva escena
     scn = new c3dl.Scene();
     scn.setCanvasTag(canvasName);
     
     // Creamos el contexto WebGL
     renderer = new c3dl.WebGL();
     renderer.createRenderer(this);
     
     scn.setBackgroundColor([0,0,0]);
     // Attach renderer to the scene
     scn.setRenderer(renderer);
     //scn.setAmbientLight([0,0,0,0]);   
     scn.init(canvasName);
     

     if(renderer.isReady() ){
         
        /*
         * *****************SISTEMAS DE PARTICULAS******************
         */ 
        
        estrellas = new c3dl.ParticleSystem();
        estrellas.setPosition([-30.0,-20.0,50.0]);
        
        estrellas.setMinVelocity([5,5,0]);
        estrellas. setMaxVelocity([8,8,0]);
        
        estrellas.setMinLifetime(5);
        estrellas.setMaxLifetime(30);
        
        /** Definicion de Color**/
        estrellas.setMinColor([0.8,0.4,0.4,0.5]);
        estrellas.setMaxColor([1,0.6,0.6,0.5]);
        
        /** Definición tamaño de particulas **/
        estrellas.setMinSize(0.1);
        estrellas.setMaxSize(0.3);
        
        estrellas.setSrcBlend(c3dl.ONE);
        estrellas.setDstBlend(c3dl.DST_ALPHA);
        
        estrellas.setAcceleration([0,0,0]);
        estrellas.setEmitRate(2500);
        
        estrellas.init(NUM_PARTICULAS);
        
        /*
         * *****************MATERIALES PARA LOS OBJETOS**************
         */   


        /*
         * *****************CREACIÓN DE OBJETOS DE LA ESCENA**************
         */
        
        //---------------------Creamos ejes cartesianos
        ejeX = new c3dl.Line();
        ejeX.setCoordinates([0,0,0], [100,0,0]);
        ejeX.setColors([1,0,0], [1,0,0]);

        ejeY = new c3dl.Line();
        ejeY.setCoordinates([0,0,0], [0,100,0]);
        ejeY.setColors([0,1,0], [0,1,0]);

        ejeZ = new c3dl.Line();
        ejeZ.setCoordinates([0,0,0], [0,0,100]);
        ejeZ.setColors([0,0,1], [0,0,1]);

        //----------------Creamos y posicionamos la camara
        var cam = new c3dl.FreeCamera();
        cam.setPosition(new Array(70.0, 70.0, 70.0));
        cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));

        
        // Cargamos modelos
        // -------------- Cargamos modelo de Planeta Jupiter COLLADA (.dae)
        jupiter = new c3dl.Collada();
        jupiter.init("recursos/modelos/jupiter.dae");
        
        jupiter.translate([-10,28,22]);
        jupiter.scale([0.1,0.1,0.1]);
        jupiter.setAngularVel(new Array(0, 0.001, 0.0));
        //jupiter.rotateOnAxis([0,1,0], 20);
        
        
        
        //------------------Cargamos modelo de Planeta Tierra
        tierra = new c3dl.Collada();
        tierra.init("recursos/modelos/tierra.dae");
        
        tierra.setAngularVel(new Array(0, 0.001, 0.0));
        tierra.translate([11,28,22]);
        tierra.scale([0.1,0.1,0.1]);
        //tierra.rotateOnAxis(this.up, 80.3);
        
        /*
         * *****************AÑADIMOS LOS OBJETOS DE LA ESCENA**************
         */

        //--------------------------Añadimos ejes
        scn.addObjectToScene(ejeX);
        scn.addObjectToScene(ejeY);
        scn.addObjectToScene(ejeZ);

        //Añadimos la camara
        scn.setCamera(cam);

        //--------------Añadimos los objetos que compone la escena
        scn.addObjectToScene(tierra);
        scn.addObjectToScene(jupiter);
        scn.addObjectToScene(estrellas);

        /*
         * *****************AÑADIMOS LUCES A LA ESCENA**************
         */

    //    var diffuse = new c3dl.PositionalLight();
    //    diffuse.setName('diffuse');
    //    diffuse.setPosition([0,300,0]);
    //    diffuse.setDiffuse([0.5,0.5,0.5,1]);
    //    //diffuse.setAmbient([0.4,1,0.4,1]);
    //    diffuse.setOn(true);
    //    scn.addLight(diffuse);

    // ------- Llamada a la función de callback
     //scn.setUpdateCallback(spinduck); -- Para implementar la rotación si es necesario.
     
     //------ Llamada al control de la escena por parte del ratón
      scn.setMouseCallback(mouseUp,mouseDown, mouseMove,mouseScroll);

        /*
         * *****************EMPIEZA LA ESCENA**************
         */
        scn.startScene();
        
     }
}



