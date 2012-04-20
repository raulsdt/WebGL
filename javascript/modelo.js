/**
 * Sistema solar
 * @autor José Manuel Serrano Mármol
 * @autor Raul Salazar de Torres
 */


c3dl.addMainCallBack(canvasMain, "tutorial");

c3dl.addModel("recursos/modelos/sol.dae");
c3dl.addModel("recursos/modelos/mercurio.dae");
c3dl.addModel("recursos/modelos/venus.dae");
c3dl.addModel("recursos/modelos/tierra.dae");
c3dl.addModel("recursos/modelos/marte.dae");
c3dl.addModel("recursos/modelos/jupiter.dae");
c3dl.addModel("recursos/modelos/saturno.dae");
c3dl.addModel("recursos/modelos/urano.dae");
c3dl.addModel("recursos/modelos/neptuno.dae");

    /*
     * *****************VARIABLES GLOBALES**************
     */

//var rot0 = 0; var rot1 = 0; var rot2 = 0; var rot3 = 0; var rot4 = 0; var rot5 = 0; var rot6 = 0; var rot7 = 0;
//var t0 = 0; var t1 = 0; var t2 = 0; var t3 = 0; var t4 = 0; var t5 = 0; var t6 = 0; var t7 = 0;
var rotaciones = [0,0,0,0,0,0,0,0];
var tiempos = [0,0,0,0,0,0,0,0];

var tiempoDesdeCambio = 0;
var isDragging = false; //Nos muestra si se esta actualmente moviendo el ratón o no
var rotationStartCoords = [0,0]; //Coordenadas en las que el ratón comienza la rotación
var SENSITIVITY = 0.7;
ZOOM_SENSITIVITY = 3;

var NUM_PARTICULAS = 100;

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



//Callback para la rotación de los planetas
function rotacionPlanetas(time){
    
   for(i = 0; i < 8; i++){
       tiempos[i] += time;
   }
   
   if(tiempos[0] >=30){
       rotaciones[0] += 0.05;
       mercurio.setPosition([12 * Math.cos(rotaciones[0]),0, 12 * Math.sin(rotaciones[0])]);
       tiempos[0] = 0;
   }
   
   if(tiempos[1] >=40){
       rotaciones[1] += 0.05;
       venus.setPosition([20 * Math.cos(rotaciones[1]),0, 20 * Math.sin(rotaciones[1])]);
       tiempos[1] = 0;
   }
   
   if(tiempos[2] >= 50){
       rotaciones[2] += 0.05;
       tierra.setPosition([28 * Math.cos(rotaciones[2]),0, 28 * Math.sin(rotaciones[2])]);
       tiempos[2] = 0;
   }
   
   if(tiempos[3] >= 60){
       rotaciones[3] += 0.05;
       marte.setPosition([36 * Math.cos(rotaciones[3]),0, 36 * Math.sin(rotaciones[3])]);
       tiempos[3] = 0;
   }
   
   if(tiempos[4] >= 70){
       rotaciones[4] += 0.04;
       jupiter.setPosition([44 * Math.cos(rotaciones[4]),0, 44 * Math.sin(rotaciones[4])]);
       tiempos[4] = 0;
   }
   
   if(tiempos[5] >= 80){
       rotaciones[5] += 0.04;
       saturno.setPosition([55 * Math.cos(rotaciones[5]),0, 55 * Math.sin(rotaciones[5])]);
       tiempos[5] = 0;
   }
   
   if(tiempos[6] >=90){
       rotaciones[6] += 0.04;
       urano.setPosition([63 * Math.cos(rotaciones[6]),0, 63 * Math.sin(rotaciones[6])]);   
       tiempos[6] = 0;
   }
   
   if(tiempos[7] >=100){
       rotaciones[7] += 0.04;
       neptuno.setPosition([73 * Math.cos(rotaciones[7]),0, 73 * Math.sin(rotaciones[7])]);
       tiempos[7] = 0;
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
        * *****************SISTEMAS DE PARTICULAS SOL******************
        */ 
        
        sSol = new c3dl.ParticleSystem();
        sSol.setPosition([0,0,0]);
        
        sSol.setTexture("recursos/texturas/flare.gif");
        
        sSol.setMinVelocity([-12,-12,-12]);
        sSol. setMaxVelocity([12,12,12]);
        
        sSol.setMinLifetime(0.3);
        sSol.setMaxLifetime(0.4);
        
        /** Definicion de Color**/
        sSol.setMinColor([0.4,0,0,0]);
        sSol.setMaxColor([1,0.4,0,1]);
        
        /** Definición tamaño de particulas **/
        sSol.setMinSize(3);
        sSol.setMaxSize(6);
        
        sSol.setSrcBlend(c3dl.ONE);
        sSol.setDstBlend(c3dl.DST_ALPHA);
        
        sSol.setAcceleration([0,0,0]);
        sSol.setEmitRate(20);
        
        sSol.init(NUM_PARTICULAS);
        
         
        /*
         * *****************SISTEMAS DE PARTICULAS******************
         */ 
        
        estrellas = new c3dl.ParticleSystem();
        estrellas.setPosition([0,0,0]);
        
        estrellas.setTexture("recursos/texturas/shine.gif");
        
        estrellas.setMinVelocity([-10,-10,-10]);
        estrellas. setMaxVelocity([10,10,10]);
        
        estrellas.setMinLifetime(4);
        estrellas.setMaxLifetime(20);
        
        /** Definicion de Color**/
        estrellas.setMinColor([1,1,1,1]);
        estrellas.setMaxColor([1,1,1,1]);
        
        /** Definición tamaño de particulas **/
        estrellas.setMinSize(0.5);
        estrellas.setMaxSize(3);
        
        estrellas.setSrcBlend(c3dl.ONE);
        estrellas.setDstBlend(c3dl.DST_ALPHA);
        
        estrellas.setAcceleration([0,0,0]);
        estrellas.setEmitRate(20);
        
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
        // -------------- Cargamos modelo del sol COLLADA (.dae)
        sol = new c3dl.Collada();
        sol.init("recursos/modelos/sol.dae");
        sol.scale([0.12,0.12,0.12]);
        sol.setAngularVel(new Array(0, 0.001, 0.0));
        
        
        // -------------- Cargamos modelo del Mercurio COLLADA (.dae)
        mercurio = new c3dl.Collada();
        mercurio.init("recursos/modelos/mercurio.dae");
        mercurio.scale([0.04,0.04,0.04]);
        mercurio.setAngularVel(new Array(0,0.001,0.0));
        
        // -------------- Cargamos modelo del Venus COLLADA (.dae)
        venus = new c3dl.Collada();
        venus.init("recursos/modelos/venus.dae");
        venus.scale([0.06,0.06,0.06]);
        venus.setAngularVel(new Array(0,0.001,0.0));
        
        //--------------- Cargamos modelo de Tierra COLLADA (.dae)
        tierra = new c3dl.Collada();
        tierra.init("recursos/modelos/tierra.dae");     
        tierra.scale([0.05,0.05,0.05]);
        tierra.setAngularVel(new Array(0, 0.001, 0.0));
        
        //--------------- Cargamos modelo de Marte COLLADA (.dae)
        marte = new c3dl.Collada();
        marte.init("recursos/modelos/marte.dae");     
        marte.scale([0.045,0.045,0.045]);
        marte.setAngularVel(new Array(0, 0.001, 0.0));
       
        // -------------- Cargamos modelo de Jupiter COLLADA (.dae)
        jupiter = new c3dl.Collada();
        jupiter.init("recursos/modelos/jupiter.dae");
        jupiter.scale([0.075,0.075,0.075]);
        jupiter.setAngularVel(new Array(0, 0.001, 0.0));
        
        // -------------- Cargamos modelo de Saturno COLLADA (.dae)
        saturno = new c3dl.Collada();
        saturno.init("recursos/modelos/saturno.dae");
        saturno.roll(45);
        saturno.scale([0.07,0.07,0.07]);
        
        // -------------- Cargamos modelo de Urano COLLADA (.dae)
        urano = new c3dl.Collada();
        urano.init("recursos/modelos/urano.dae");
        urano.roll(45);
        urano.scale([0.055,0.055,0.055]);
        urano.setAngularVel(new Array(0, 0.001, 0.0));
        
        // -------------- Cargamos modelo de Neptuno COLLADA (.dae)
        neptuno = new c3dl.Collada();
        neptuno.init("recursos/modelos/neptuno.dae");
        neptuno.roll(45);
        neptuno.scale([0.06,0.06,0.06]);
        neptuno.setAngularVel(new Array(0, 0.001, 0.0));
        
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
        scn.addObjectToScene(sol);
        scn.addObjectToScene(mercurio);
        scn.addObjectToScene(venus);
        scn.addObjectToScene(tierra);
        scn.addObjectToScene(marte);
        scn.addObjectToScene(jupiter);
        scn.addObjectToScene(saturno);
        scn.addObjectToScene(urano);
        scn.addObjectToScene(neptuno);
        
        scn.addObjectToScene(sSol);
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


    // ------- Llamada a funciones de callback
        scn.setUpdateCallback(rotacionPlanetas);
     
    //------ Llamada al control de la escena por parte del ratón
        scn.setMouseCallback(mouseUp,mouseDown, mouseMove,mouseScroll);

    //------ Comienzo de la escena
        scn.startScene();
        
     }
}



