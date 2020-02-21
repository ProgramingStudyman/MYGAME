/*--------------------------------------------------
  Pantsu of Cabrian

                  GYOZA 2020/02
---------------------------------------------------*/
enchant.Sound.enabledInMobileSafari = true;

enchant();
window.onload= function () {
  var pantsu = new Game(320,320);
  pantsu.preload(
    '/PCimg/start.png','PCimg/Nami.png','/PCimg/P1_001.png','/PCimg/Teki_001.png','/PCimg/ikada.png',
    '/PCimg/投げパン.png','PCimg/海.png','PCimg/崖.png','PCimg/sky.png','PCimg/Rockshadow.png',
    'PCimg/P1_srrow.png','/PCimg/Title.png','/PCimg/Oct.png'


  );
  pantsu.onload = function(){

    //初期化
    pantsu.keybind(32,'space');//スペースキー割当
    pantsu.keybind(74,'j');//jキー割当









/*=======================
      タイトル
========================*/
      var createStartScene = function(){


        var scene = new Scene();
            scene.backgroundColor = 'red';


            var startImage = Class.create(Sprite,{
            initialize:function(x,y){
            Sprite.call(this,320,320);
            this.image = pantsu.assets['/PCimg/Title.png'];
            scene.addChild(this);
            }});

            var Si1 = new startImage(256,192);//startImage表示





              /*-----------------------
              タッチイベント
              -----------------------*/

            Si1.addEventListener(Event.TOUCH_START, function(e){
               pantsu.replaceScene(GameScene());

            });


            return scene;
               };


        /*=====================メイン=================================
        GameSceneß
        P1, Teki1, Score

        ===========================================================*/
          var GameScene = function(){
            var scene = new Scene();

            /*------------------
            初期値設定
            -------------------*/
            var Pan1dx;//パンツの行先x
            var Pan1dy;//パンツの行先y
            var Pan1sw = 0; //パンツの矛先スイッチ
            var Pan1s = 7;  //パンツの移動速度
            var Pan1dwt = 1; //パンツ投げディレイタイマー
            var Pan1T1irs = [];//Pan1とT1の当たり判定
            Pan1T1irs[1] = 0;//敵1の衝突判定初期値
            Pan1T1irs[2] = 0;//敵1の衝突判定初期値
            Pan1T1irs[3] = 0;//敵1の衝突判定初期値

            var pan1Timer = 0;//消滅パンツ親タイマー
            var pan1dtimer = 0;//消滅パンツ子タイマー

            var my = -4;//パンツ重力y
            var my2 = 0.2;//パンツ重力y2



            var T1sp = -58;//敵初期位置
            var T2sp = -58;//敵初期位置
            var T3sp = -58;//敵初期位置
            var oct1sp = -59;

            pantsu.life = 3;//ライフ初期値
            var lifeLabel = new LifeLabel(180,0, pantsu.life);//ライフ追加
            lifeLabel.life = pantsu.life;

            pantsu.score = 0;//スコア初期値
            var scoreLabel = new ScoreLabel(0,0);//スコア追加
            scoreLabel.score = pantsu.score;//スコアをゲームと同期

            scene.addChild(lifeLabel);//ライフをシーンに追加
            scene.addChild(scoreLabel);//スコアをシーンに追加


            /*==============BG======================


           ======================================*/


           /*-------------
           海
           -------------*/

           var BG_sea = Class.create(Sprite,{
           initialize:function(x,y){
           Sprite.call(this,320,250);
           this.image = pantsu.assets['PCimg/海.png'];
           }});
           var bg_sea1 = new BG_sea(320,250);
           var bg_sea2 = new BG_sea(320,250);


               bg_sea1.x = 0;  bg_sea1.y = 80;
               bg_sea2.x = -320; bg_sea2.y = 80;

          scene.addChild(bg_sea1);
          scene.addChild(bg_sea2);




         /*-------------
         崖
         -------------*/
         var BG_gake = Class.create(Sprite,{
         initialize:function(x,y){
         Sprite.call(this,320,20);
         this.image = pantsu.assets['PCimg/崖.png'];
         }});
         var bg_gake1 = new BG_gake(320,20);
         var bg_gake2 = new BG_gake(320,20);


             bg_gake1.x = 0;  bg_gake1.y = 60;                                 // 横位置調整
             bg_gake2.x = -320; bg_gake2.y = 60;

             scene.addChild(bg_gake1);// シーンに追加
             scene.addChild(bg_gake2);// シーンに追加





       /*-------------
       空
       -------------*/
       var bg5 = new Sprite(320, 16);            // スプライトを作る
           bg5.image = pantsu.assets['PCimg/sky.png']; // 画像を設定
           bg5.x = 0; bg5.y = 44;
           scene.addChild(bg5);// シーンに追加


      /*-------------
      影
      -------------*/
      var BG_kage = Class.create(Sprite,{
      initialize:function(x,y){
      Sprite.call(this,320,16);
      this.image = pantsu.assets['PCimg/Rockshadow.png'];
      }});
      var bg_syadow1 = new BG_kage(320,20);
      var bg_syadow2 = new BG_kage(320,20);

       bg_syadow1.x = 0; bg_syadow1.y = 80;
       bg_syadow2.x = -320; bg_syadow2.y = 80;

       scene.addChild(bg_syadow1);
       scene.addChild(bg_syadow2);


         /*-------------
         空
         -------------*/
        sky = new Sprite(320,44);//Spriteを作ります
        surface = new Surface(320,44);//Surfaceを作ります
        sky.image = surface;//spriteのimageにsurfaceを代入します
        context = surface.context;//コンテキストを取得します
        //以下、HTML5のcanvasと同じように使えます
        context.beginPath(); 	//パスを開始
        context.fillStyle = "rgb( 204, 237, 255)";//赤い線にする

       /*
       for (var i = 0; i < 50; i++) {
      context.moveTo(0,i);	//ペンを(50,50)に移動
      context.lineTo(320,i);//(100,100)まで直線を描く
      context.strokeStyle="rgb( 0, 0, 255)";
      context.strokeStyle="rgb( 0, , 255)";
      console.log(i2);
      }
      */
      context.fillRect(0, 0, 320, 44);
      context.closePath();	//パスを終了
      context.stroke();		//パスを描画する

      scene.addChild(sky);//空をシーンに追加


      /*------------------
      ライフ追加
      ------------------*/
      scene.addChild(lifeLabel);//ライフをシーンに追加

      /*------------------
      スコア追加
      ------------------*/
      scene.addChild(scoreLabel);//スコアをシーンに追加




      //背景イベント
      pantsu.addEventListener(Event.ENTER_FRAME, function(){
        //背景移動
        bg_sea1.x += 2;
        bg_sea2.x += 2;
        bg_gake1.x += 2;
        bg_gake2.x += 2;
        bg_syadow1.x += 2;
        bg_syadow2.x += 2;

      //端まで行った時の動作
        if (bg_sea1.x >= 320){bg_sea1.x = -320;}
        if (bg_sea2.x >= 320){bg_sea2.x = -320;}
        if (bg_gake1.x >= 320){bg_gake1.x = -320;}
        if (bg_gake2.x >= 320){bg_gake2.x = -320;}
        if (bg_syadow1.x >= 320){bg_syadow1.x = -320;}
        if (bg_syadow2.x >= 320){bg_syadow2.x = -320;}



      });


      /*================Ikada=======================


      =========================================*/
      var Ikada1 = Class.create(Sprite,{
      initialize:function(x,y){
      Sprite.call(this,61,30);
      this.image = pantsu.assets['/PCimg/ikada.png'];
      scene.addChild(this);
      }});
      var ikada1 = new Ikada1(61,30);//P1表示


      /*------------------
      Ikada
      初期座標
      ------------------*/
      ikada1.x = 250;  ikada1.y = 125;//イカダ初期座標
      ikada1.frame = 0;//イカダフレーム

      /*================Pantsu=======================


      =============================================*/
      var Pantsu1 = Class.create(Sprite,{
      initialize:function(x,y){
      Sprite.call(this,35,23);
      this.image = pantsu.assets['/PCimg/投げパン.png'];
      scene.addChild(this);
      }});
      var Pan1 = new Pantsu1(35,23);//P1表示



      /*------------------
      パンツ
      初期座標
      ------------------*/
      Pan1.x = 270;  Pan1.y = 120;//パンツ初期座標
      Pan1.frame = 0;//パンツフレーム





      /*================P1=======================


      =========================================*/
        var Player1 = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,20,39);
        this.image = pantsu.assets['/PCimg/P1_001.png'];
        scene.addChild(this);
        }});
        var P1 = new Player1(20,39);//P1表示

        var Player1Srrow = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,28,40);
        this.image = pantsu.assets['PCimg/P1_srrow.png'];
        scene.addChild(this);
        }});
        var P1_srrow = new Player1Srrow(28,40);//P1表示



        /*------------------
        P1
        初期座標
        ------------------*/
        P1.x = 260;  P1.y = 100;
        P1.frame = 0;

        P1_srrow.opacity = 0;//投げ透明度100%


        //無限に常に読まれる
        P1.addEventListener('enterframe', function(){

          console.log(pantsu.life)
          /*=====================
          レベル
          ======================*/
          if(scoreLabel.score < 200 ){
            Pan1dwt = 1;
        }else if(scoreLabel.score >200 || scoreLabel.score<700 ){
            Pan1dwt = 0.5;
          }else if(scoreLabel.score > 700){
            Pan1dwt = 0.1;
          }



        /*==================-
        立ちアニメ
        ====================*/
        P1.frame += 0.2;

          if (P1.frame>3){P1.frame = 0;}


        /*===========================
        クリックイベント
        ============================*/
        P1.scene.addEventListener('touchstart', function(event){
        if (Pan1sw == 0){
          Pan1dx = event.x; Pan1dy = event.y;


          Pan1sw = 1;


        }

        });



        /*=============================
        ファンクションルーチン





        =============================*/
        //Pan1swが 1だった時
        if (Pan1sw == 1){
          Pandst();
        }

        /*--------------
        敵1衝突時
        出現スコア
        --------------*/
        if (Pan1T1irs[1] == 0){
          Teki1Do();

        }
          /*-----------------
          敵1衝突時
          スコア500以上で敵２出現
          ------------------*/
        if(Pan1T1irs[2] == 0 && pantsu.score >200){
          Teki2Do()
        }

        /*-----------------

        スコア888以上で敵3出現
        ------------------*/
        if(Pan1T1irs[3] == 0 && pantsu.score >400){
        Teki3Do()
        }


        }); //P1.addEventListener







        /*================Teki1=======================
        設定

        =========================================*/
        var Teki1 = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,58,34);
        this.image = pantsu.assets['/PCimg/Teki_001.png'];
        scene.addChild(this);
        }});
        var T1 = new Teki1(58,34);//P1表示
        var T2 = new Teki1(58,34);


        /*------------------
        初期座標
        ------------------*/
        T1.x = T1sp;  T1.y = 100; //T1初期位置
        T2.x = T2sp;  T2.y = 100;


        T1.frame = 0;
        T2.frame = 0;


        T1.animeWaitMax = 3;
        T1.animeWaitCount = 0;
        T2.animeWaitMax = 3;
        T2.animeWaitCount = 0;



        var Teki2 = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,59,63);
        this.image = pantsu.assets['/PCimg/Oct.png'];
        scene.addChild(this);
        }});
        var oct1 = new Teki2(59,63);//P1表示


        /*------------------
        初期座標
        ------------------*/
        oct1.x = oct1sp;  oct1.y = 180; //T1初期位置


        oct1.frame = 0;
      ;


        /*==============================
        Teki1Do
        =============================*/
        function Teki1Do(){
        T1.x++;

        if (T1.animeWaitCount >= T1.animeWaitMax) {
        T1.animeWaitCount = 0;

        if (T1.frame >= 0 && T1.frame < 1) {
        T1.frame++;
        }else if (T1.frame >=0)
        {
        T1.frame = 0;
        }

        }else {T1.animeWaitCount++;}



        /*----------------
        ダメージ食らう
        ----------------*/
        if (T1.x > 200){

          lifeLabel.life -=  1
          ikada1.frame +=1;
          T1.x = T1sp;

            if (lifeLabel.life <= 0){
                pantsu.replaceScene(GameoverScene());



            }
        }

        }

        /*==============================
        Teki2Do
        =============================*/
        function Teki2Do(){
        T2.x++;

        if (T2.animeWaitCount >= T2.animeWaitMax) {
        T2.animeWaitCount = 0;

        if (T2.frame >= 0 && T2.frame < 1) {
        T2.frame++;
      }else if (T2.frame >=0)
        {
        T2.frame = 0;
        }

      }else {T2.animeWaitCount++;}



        /*----------------
        ダメージ食らう
        ----------------*/
        if (T2.x > 200){

          lifeLabel.life -=  1
          ikada1.frame +=1;
          T2.x = T2sp;

            if (lifeLabel.life <= 0){
                pantsu.replaceScene(GameoverScene());

            }
        }

        }

        /*==============================
        Teki3Do
        =============================*/
        function Teki3Do(){

          oct1.x++;
          oct1.frame += 0.2;




          /*----------------
          ダメージ食らう
          ----------------*/
          if (oct1.x > 200){

            lifeLabel.life -= 1
            ikada1.frame += 1;
            oct1.x = oct1sp;

              if (lifeLabel.life <= 0){
                  pantsu.replaceScene(GameoverScene());

              }
          }

          }







        /*===============================
        投げパンツ移動
        ファンクショn: Pandst
        Pan1sw
        1:Pan1.y<Pan1dy
        2:Pan1.y>Pan1dy
        3.行先に到着
        当たり判定
        ===============================*/
        function Pandst(){
          //行先Xより右にパンツがあったら

          P1.opacity = 0;
          P1_srrow.x = P1.x-5;  P1_srrow.y = P1.y;

          if(P1_srrow.frame < 4){
            P1_srrow.frame += 0.5;
            P1_srrow.opacity = 1;

          }





        if (Pan1dx < Pan1.x){
          Pan1.x -= Pan1s;
        }

          console.log(Pan1.y,Pan1dy,Pan1sw,my)
          Pan1.y += (my+my2);
          my2 += 0.2
        //}

        /*--------パンツ到着時---------------

        ---------------------------------*/
        if (Pan1.x < Pan1dx && Pan1.y > Pan1dy && my2 > 0 ){

          /*-------
          P1
          -------*/
            Pan1sw = 3;//到着パンツ
            //Pan1dwt = 1;
           pan1dtimer = 0;
           Pan1.opacity = 0;//パンツの透明度を100%にする

           P1.opacity = 1;  //P1が表示される
           P1_srrow.opacity = 0; //P1投げが非表示
           P1_srrow.frame = 0; //P1投げフレーム0


           /*-----------------
           衝突判定　P1 T1
           -----------------*/
        if(Pan1.within(T1, 30)) {
        T1.frame = 2;
        Pan1T1irs[1] = 1;//当たり判定on
        pantsu.score = scoreLabel.score += 100;

        }
        if(Pan1.within(T2, 30)) {
        T2.frame = 2;
        Pan1T1irs[2] = 1;//当たり判定on
        pantsu.score = scoreLabel.score += 100;

        }

        if(Pan1.within(oct1, 30)) {
        oct1.frame = 2;
        Pan1T1irs[3] = 1;//当たり判定on
        pantsu.score = scoreLabel.score += 150;
        }

        startpantsuTimer()//パンツ非表示メソッドへ

        }

        }
        /*==============================

        タイマー
        ==============================*/
        function startpantsuTimer(){
        var pan1Timer = setInterval(function(){
        pan1dtimer++;
        /*------------------
        敵をだんたんど透明にする
        -------------------*/
        if (Pan1T1irs[1] == 1){T1.opacity -= 0.35;}
        if (Pan1T1irs[2] == 1){T2.opacity -= 0.35;}
        if (Pan1T1irs[3] == 1){oct1.opacity -= 0.35;}

        //-----パンツが消えてから2秒後----------
        if (pan1dtimer > Pan1dwt){
        clearInterval(pan1Timer,T1.opacity);
        clearInterval(pan1Timer,T2.opacity);
        clearInterval(pan1Timer,oct1.opacity);

        Pan1sw = 0;//パンツ矛先スイッチ初期値
        pan1dtimer = 0;//パンツ子タイマー初期値
        Pan1.x = 270;  Pan1.y = 120;//初期位置へ移動
        Pan1.opacity = 1;//透明度0%
        my = -4;//パンツ重力初期値
        my2 = 0.2;//パンツ重力2初期値

        //敵1と衝突時
        if (Pan1T1irs[1] == 1){
        Pan1T1irs[1] = 0;//当たり判定を初期値にする
        T1.x = T1sp;
        T1.y = Math.floor(Math.random()*120)+100; //初期位置へ移動
        T1.opacity = 1; //透明度0%
        T1.frame = 1; //フレーム1
        }

        if (Pan1T1irs[2] == 1){
        Pan1T1irs[2] = 0;//当たり判定を初期値にする
        T2.x = T2sp;
        T2.y = Math.floor(Math.random()*120)+100; //初期位置へ移動
        T2.opacity = 1; //透明度0%
        T2.frame = 1; //フレーム1
        }

        if (Pan1T1irs[3] == 1){
        Pan1T1irs[3] = 0;//当たり判定を初期値にする
        oct1.x = oct1sp;
        oct1.y = Math.floor(Math.random()*120)+100; //初期位置へ移動
        oct1.opacity = 1; //透明度0%
        oct1.frame = 1; //フレーム1
        }

        }



        }, 1000);}










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
            pantsu.replaceScene(createStartScene());

            });

            return scene;
            };
            pantsu.replaceScene(createStartScene());

            //GameStart------------
}
    pantsu.start(); // ゲームをスタートさせます

};
