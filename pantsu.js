/*--------------------------


                  GYOZA
-------------------------*/
enchant.Sound.enabledInMobileSafari = true;

enchant();
window.onload= function () {
  var pantsu = new Game(320,320);
  pantsu.preload(
    '/img/start.png','img/Nami.png','/img/P1_001.png','/img/Teki_001.png','/img/ikada.png',
    '/img/投げパン.png',
  );
  pantsu.onload = function(){

    //初期化
    pantsu.keybind(32,'space');
    pantsu.keybind(74,'j');



    var Pan1dx;
    var Pan1dy;
    var Pan1sw = 0; //パンツの矛先スイッチ
    var Pan1s = 7;  //パンツの移動速度
    var Pan1dwt = 0; //パンツ投げディレイタイマー
    var Pan1T1irs = [];//Pan1とT1の当たり判定

    var pan1Timer = 0;//
    var pan1dtimer = 0;
    var rand;



/*=======================
      タイトル
========================*/
      var createStartScene = function(){
        var scene = new Scene();
        scene.backgroundColor = 'red';
        var startImage = new Sprite(236,48);
        startImage.image = pantsu.assets['/img/start.png'];
        startImage.x = 42;
        startImage.y = 136;
        scene.addChild(startImage);

        var title = new Label('パンツ オブ カブリアン');
        title.textAlign = 'center';
        title.color = '#ffffff';
        title.x = 0;
        title.y = 96;
        title.font = '28px sans-serif';

        scene.addChild(title);

        // サブタイトルラベル設定
          var subTitle = new Label("Pantsu of Kabrian");
          subTitle.textAlign = 'center';
          subTitle.x = 0;
          subTitle.y = 196;
          subTitle.font = '14px sans-serif';
          scene.addChild(subTitle);

          startImage.addEventListener(Event.TOUCH_START, function(e){
            pantsu.replaceScene(GameScene());
          });
          return scene;
        };



        /*----------------------メイン-----------------------------------
        P1, Teki1, Score


        --------------------------------------------------------------*/
          var GameScene = function(){
            var scene = new Scene();


            /*==============BG======================

            ======================================*/
              var bg1 = new Sprite(200, 20);            //背景スプライト
              var bgg1 = new Sprite(320,20);           //地面スプライト
              bgg1.image = pantsu.assets['img/Nami.png']; // 画像を設定
              bgg1.x = 0;                                 // 横位置調整
              bgg1.y = 70;                                 // 縦位置調整
              scene.addChild(bgg1);                       // シーンに追加

              var bg2 = new Sprite(200, 20);            // スプライトを作る
              //bg2.image = pantsu.assets['./img/BG01-2.png']; // 画像を設定
              bg2.x = 198;                                 // 横位置調整
              bg2.y = 0;                                 // 縦位置調整
              scene.addChild(bg2);                       // シーンに追加

              pantsu.addEventListener(Event.ENTER_FRAME, function(){
              bg1.x -= 2
              bg2.x -= 2;
                if (bg1.x <= -200){
                bg1.x = 200;
              　 }
                if (bg2.x <= -200){
                bg2.x = 200;
                }

             });

             //================Ikada=======================
             //
             //
             //=========================================
                 var Ikada1 = Class.create(Sprite,{
                   initialize:function(x,y){
                   Sprite.call(this,61,30);
                   this.image = pantsu.assets['/img/ikada.png'];
                   scene.addChild(this);
                   }});
                 var ikada1 = new Ikada1(61,30);//P1表示
                 //------------------
                 //初期座標
                 //------------------
                 ikada1.x = 250;  ikada1.y = 125;  ikada1.frame = 0;

                 //================Pantsu=======================
                 //
                 //
                 //=========================================
                     var Pantsu1 = Class.create(Sprite,{
                       initialize:function(x,y){
                       Sprite.call(this,35,23);
                       this.image = pantsu.assets['/img/投げパン.png'];
                       scene.addChild(this);
                       }});
                     var Pan1 = new Pantsu1(35,23);//P1表示
                     //------------------
                     //初期座標
                     //------------------
                     Pan1.x = 270;  Pan1.y = 120;  Pan1.frame = 0;


        //================P1=======================
        //
        //
        //=========================================
            var Player1 = Class.create(Sprite,{
              initialize:function(x,y){
              Sprite.call(this,20,39);
              this.image = pantsu.assets['/img/P1_001.png'];
              scene.addChild(this);
              }});
            var P1 = new Player1(20,39);//P1表示
            //------------------
            //初期座標
            //------------------
            P1.x = 260;  P1.y = 100;  P1.frame = 0;


            //無限に常に読まれる
            P1.addEventListener('enterframe', function(){


                //P1.x = 30;
                /*===========================
                クリックイベント
                ============================*/
                P1.scene.addEventListener('touchstart', function(event){
                  if (Pan1sw == 0){
                    Pan1dx = event.x; Pan1dy = event.y;
                      if (Pan1.y < Pan1dy){Pan1sw = 1};
                      if (Pan1.y > Pan1dy){Pan1sw = 2};
                  }

                });
                /*=============================
                  ファンクションルーチン

                =============================*/
                //Pan1swが 1 or 2 だった時
                if (Pan1sw == 1 || Pan1sw == 2){Pandst();}


            }); //P1.addEventListener

            //クリック


          //================Teki1=======================
          //
          //
          //=========================================
              var Teki1 = Class.create(Sprite,{
                initialize:function(x,y){
                Sprite.call(this,58,34);
                this.image = pantsu.assets['/img/Teki_001.png'];
                scene.addChild(this);
                }});
              var T1 = new Teki1(58,34);//P1表示
              //------------------
              //初期座標
              //------------------
              T1.x = 0;  T1.y = 100;  T1.frame = 0;

              /*===============================
              投げパンツ移動
              ファンクショn: Pandst
              Pan1sw
                    1:Pan1.y<Pan1dy
                    2:Pan1.y>Pan1dy
                    3.行先に到着
              ===============================*/
              function Pandst (){

                if (Pan1dx < Pan1.x){Pan1.x -= Pan1s;}

                if (Pan1sw == 1){
                  if (Pan1.y < Pan1dy){Pan1.y += Pan1s;}
                  if (Pan1.x < Pan1dx && Pan1.y > Pan1dy){
                    Pan1sw = 3;
                    Pan1dwt = 1;
                    pan1dtimer = 0;
                    Pan1.opacity = 0;//透明度を100%にする

                      if(Pan1.intersect(T1)) {
                        T1.frame = 2;
                        Pan1T1irs[1] = 1;
                      }

                    startpantsuTimer()//パンツ非表示メソッドへ

                  }
                }
                if (Pan1sw == 2) {
                  if (Pan1.y > Pan1dy){Pan1.y -= Pan1s;}
                  if (Pan1.x < Pan1dx && Pan1.y < Pan1dy){
                    Pan1sw = 3;
                    Pan1dwt = 1;
                    pan1dtimer = 0;
                    Pan1.opacity = 0;//透明度を100%にする
                      if(Pan1.intersect(T1)) {
                        T1.frame = 2;
                        Pan1T1irs[1] = 1;
                      }

                    startpantsuTimer()//パンツ非表示メソッドへ

                  }
                }
              }
                /*==============================

                タイマー
                ==============================*/
                function startpantsuTimer(){
                  var pan1Timer = setInterval(function(){
                    pan1dtimer++;
                    if (Pan1T1irs[1] == 1){T1.opacity -= 0.35;}

                    //-----パンツが消えてから2秒後----------
                    if (pan1dtimer > 2){
                      clearInterval(pan1Timer,T1.opacity);
                      Pan1sw = 0;
                      pan1dtimer = 0;
                      Pan1.x = 270;  Pan1.y = 120;//初期位置へ移動
                      Pan1.opacity = 1;//透明度0%

                      if (Pan1T1irs[1] == 1){
                      Pan1T1irs[1] = 0;//当たり判定を初期値にする
                      T1.x = 0;
                      T1.y = Math.floor(Math.random()*120)+100; //初期位置へ移動
                      T1.opacity = 1; //透明度0%
                      T1.frame = 1 //フレーム1
                    }

                    }

                    console.log(pan1dtimer,Pan1T1irs[2]);

                  }, 1000);}




              function stopShowing() {
              clearInterval(startpantsuTimer)
            }

















              return scene;
            };
          /*-----------------ゲームオーバー---------------------------------



          -------------------------------------------------------------*/
                    var GameoverScene = function(){
                        var scene = new Scene();
                        var Label5 = new Label('ゲームオーバーシーン　タッチでゲームシーンに戻る');
                        Label5.x = 0;   Label5.y = 20;
                        scene.addChild(Label5);
                        scene.backgroundColor = 'rgba(0,0,255,0,5)';
                        scene.addEventListener(Event.TOUCH_START, function(e){
                          pantsu.popScene();
                        });

                        return scene;
                    };
                    pantsu.replaceScene(createStartScene());

                    //GameStart------------
}
    pantsu.start(); // ゲームをスタートさせます

};
