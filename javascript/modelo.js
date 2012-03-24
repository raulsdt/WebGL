/**
 * Sistema solar
 * @autor José Manuel Serrano Mármol
 * @autor Raul Salazar de Torres
 */


c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("recursos/modelos/tierra.dae");

    /*
     * *****************VARIABLES GLOBALES**************
     */  
    var mundo;

// The program main
function canvasMain(canvasName){

     // Creamos nueva escena
     scn = new c3dl.Scene();
     scn.setCanvasTag(canvasName);

     // Creamos el contexto WebGL
     renderer = new c3dl.WebGL();
     renderer.createRenderer(this);

     // Attach renderer to the scene
     scn.setRenderer(renderer);
     //scn.setAmbientLight([0,0,0,0]);
     scn.init(canvasName);


     if(renderer.isReady() ){
         
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
        cam.setPosition(new Array(50.0, 50.0, 50.0));
        cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));

        //------------------Cargamos los modelos (planetas) COLLADA (.dae)
        mundo = new c3dl.Collada();
        mundo.init("recursos/modelos/tierra.dae");
        mundo.scale([0.25,0.25,0.25]);
        mundo.setAngularVel(new Array(0.0, 0.001, 0.0));
        


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
        scn.addObjectToScene(mundo);

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


        /*
         * *****************EMPIEZA LA ESCENA**************
         */
        scn.startScene();
     }
}
