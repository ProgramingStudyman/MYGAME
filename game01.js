//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//
//            妖怪の怪談
//                          GYOZA
//                                  2019/07/29
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

enchant();
window.onload = function() {

  var game01 = new Game(320, 320);
  game01.preload(
  '/img/chara1.png', '/img/BG01-1.png', '/img/BG01-2.png', '/img/start.png',
  '/img/Card/Card-number.png', '/img/Card/Cardmain.png', 'img/Ground-001.png',
  '/img/Card/card-hand00.png', '/img/Card/card-hand02.png', '/img/Card/card-hand05.png',
  '/img/Player/Chara-001-d.png'

   );


game01.onload = function() {

//==========初期化==============
//
//=============================
  //------------------------
  //スペースキーの取得
  //------------------------
  game01.keybind( 32, 'space' );

  //------------------------
  //jキーの取得
  //------------------------
  game01.keybind(74, 'j' );

  //------------------------
  //タイマー定義
  //------------------------
  timer = 0;  timer2 = 0;

  //------------------------
  //P1変数定義 ~
  //------------------------
  //P1ライフ
  var P1life = 100;
  var P1dmg = 1;
  //アクションスイッチ
  AT = false;

  //ジャンプ変数定義
  JP = false;
  jpy = 0;  jpy2 = 0;

  //アイーンアクション定義
  ainT = 0;//アイーンタイム

  //------------------------
  //敵 変数定義
  //------------------------
  //敵ライフ
  var T1Life = 10;
  var T1dmg = 1;
  //敵AI乱数
  var AIR　= 1 + Math.floor(Math.random()*2);

  //TekiMaxNumber(Teki現在数)
  TMN = 1;

  //-----------------------
  //CARD(P1とT1両方含む)
  //----------------------
  battle = 0;
  encount = 0;
  encountrnd =0;
  crdhx = 0;
  crdhndnum = Math.floor(Math.random()*6);;
  cardrnd = Array();
  crdhandnow = Array();//選択カード取得用変数

  game01.P1key = false;

  var i; var i2;
  var selectcrd = 0;//選択カード
  var cardrndT1;
  //-----------------------
  //使用カードの初期値代入
  //-----------------------
  entercrd = Array;
  for ( i = 0; i < 6; i++ ){entercrd[i] = false;}

    //game01.PLv = 1;
    //game01.PEXP = 0;

    var WG = new PhysicsWorld(0, 9.8);   //重力設定

  //ラベル
  var Label1 = new Label(P1life); var Label2 = new Label(T1Life);
  var Label3 = new Label("");
  //ラベルフォントサイズ
  Label1.font = "10px cursive"; Label2.font = "10px cursive";
  Label3.font = "10px cursive";
  //ラベル位置
  Label3.x = 100;  Label3.y = 50;
  //Label1.x = 100;  Label1.y = 10;
  //Label2.x = 150;  Label2.y = 250;
  //Label3.x = 100; Label3.y = 300;
  //Label4.x = 150; Label4.y = 300;

  //Label1表示
  game01.rootScene.addChild(Label1);

//-------------------タイトル-------------------------------
//
//
//
//---------------------------------------------------------
      var createStartScene = function(){
        var scene = new Scene();
        scene.backgroundColor = '#fcc800';
        var startImage = new Sprite(236,48);
        startImage.image = game01.assets['/img/start.png'];
        startImage.x = 42;
        startImage.y = 136;
        scene.addChild(startImage);

        var title = new Label('妖怪の怪談');
        title.textAlign = 'center';
        title.color = '#ffffff';
        title.x = 0;
        title.y = 96;
        title.font = '28px sans-serif';

        scene.addChild(title);

        // サブタイトルラベル設定
          var subTitle = new Label("花粉症の娘たち");
          subTitle.textAlign = 'center';
          subTitle.x = 0;
          subTitle.y = 196;
          subTitle.font = '14px sans-serif';
          scene.addChild(subTitle);

          startImage.addEventListener(Event.TOUCH_START, function(e){
            game01.replaceScene(GameScene());
          });
          return scene;
        };


//----------------------メイン-----------------------------------
//P1, Teki1, Score
//
//
//--------------------------------------------------------------
  var GameScene = function(){
    var scene = new Scene();

    WG.step(game01.fps);//重力読み込み

  //=============タイマー関数====================
  // 1秒毎に呼び出し
  //===========================================
    var timeract = function(){
    timer++;

   //敵AI乱数取得
   var AIR　= 1 + Math.floor (Math.random() * 2);

   if (encount == 0){
     var encountrnd = Math.floor(Math.random()*2);
   }

   //------------エンカウント発生----------------
   //敵1
   if (encountrnd == 1){
     encount = 1;
     T1.x = 320; T1.y =60; T1.frame = 0;
   }
   //敵表示・非表示
   if (encount == 1){
   scene.addChild(T1);
 }else{scene.removeChild(T1);}
   //敵非表示
   if (encount == 0){
   scene.removeChild(T1);
   }
   //敵座標

          //黒で画面消す
           elaser01 = new Sprite(320,320);//Spriteを作ります
           surface = new Surface(320,320);//Surfaceを作ります
           elaser01.image = surface;//spriteのimageにsurfaceを代入します
           context = surface.context;//コンテキストを取得します
           //以下、HTML5のcanvasと同じように使えます
           context.beginPath(); 	//パスを開始
           context.fillStyle = "rgb( 255, 255, 255)";//赤い線にする
    　     //context.moveTo(0,0);	//ペンを(50,50)に移動
           //context.lineTo(320,100);//(100,100)まで直線を描く
           context.fillRect(0, 0, 320, 200);
           context.closePath();	//パスを終了
           context.stroke();		//パスを描画する
           game01.rootScene.addChild(elaser01);//シーンにサーフェスを追加する

   var Label1 = new Label(P1life);
   var Label2 = new Label(T1Life);
   var Label3 = new Label("");

   Label1.font = "10px cursive";
   Label2.font = "10px cursive";
   Label3.font = "10px cursive";

   Label1.x = 100;  Label1.y = 10;
   Label2.x = 200;  Label2.y = 10;
   Label3.x = 100;  Label3.y = 50;

   Label1.color = "rgb(0,0,0)";
   Label2.color = "rgb(0,0,0)";
   Label3.color = "rgb(0,0,0)";

   game01.rootScene.addChild(Label1);
   game01.rootScene.addChild(Label2);
   game01.rootScene.removeChild(Label3);

   //game01.rootScene.addChild(Label3);
   //game01.rootScene.addChild(Label4);

   //デバック
    //console.log(cardrnd);
  console.log(P1life, T1Life, P1dmg, T1dmg);
   }

    setInterval(timeract, 1000);  //タイマー関数呼び出し


    //----------------BG--------------------
    //
    //--------------------------------------
      var bg1 = new Sprite(200, 200);            //背景スプライト
      var bgg1 = new Sprite(320,100);           //地面スプライト
      bgg1.image = game01.assets['img/Ground-001.png']; // 画像を設定
      bgg1.x = 0;                                 // 横位置調整
      bgg1.y = 70;                                 // 縦位置調整
      scene.addChild(bgg1);                       // シーンに追加

      var bg2 = new Sprite(200, 200);            // スプライトを作る
      //bg2.image = game01.assets['./img/BG01-2.png']; // 画像を設定
      bg2.x = 198;                                 // 横位置調整
      bg2.y = 0;                                 // 縦位置調整
      scene.addChild(bg2);                       // シーンに追加

      game01.addEventListener(Event.ENTER_FRAME, function(){
      bg1.x -= 2
      bg2.x -= 2;
        if (bg1.x <= -200){
        bg1.x = 200;
      　 }
        if (bg2.x <= -200){
        bg2.x = 200;
        }

            });

  //================P1=======================
  //
  //=========================================
      var Player1 = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,32,32);
        //初期座標
        this.image = game01.assets['/img/Player/Chara-001-d.png'];
        scene.addChild(this);
        }});
      var P1 = new Player1(32,32);//P1表示
      P1.x = 50;  P1.y = 60;  P1.frame = 1;

      //無限に常に読まれる
      P1.addEventListener('enterframe', function(){

      //左キー
      if(AT == false && battle == 0 && game01.input.left)
        {P1.x-=5;  P1.scaleX = -1; P1.frame = P1.age % 2; }

      //右キー
      if(AT == false && battle == 0 && game01.input.right)
      {P1.x += 5;  P1.scaleX = 1;  P1.frame = P1.age % 2; }

      //スペースキー
      if(AT == false && battle == 0 && game01.input.space )
      //  {AT = true; P1.frame = 4; }
       //if　(P1.frame == 4 ) {P1.frame = 1; AT = false;}
       //アイーンアクションスイッチ
       //var ainact = function()
       //{if　(P1.frame == 4 ) {P1.frame = 1; AT = false; }}


      //Jキー
      if(AT == false && JP == false && game01.input.j )
        {JP = true; jpy2 = 9;}
        if (JP == true){jpy2 -= 0.8;}

        if (JP == true && P1.y>60){
            JP = false;
            jpy = 0;
            jpy2 = 0;
            P1.y = 60}

        P1.y -= jpy + jpy2;
      });


      //クリック
      game01.rootScene.addEventListener('touchend', function(event)
      {P1.x = event.x;  P1.y = event.y; });

      //===============Teki1=====================
      //  AIR
      //=========================================
      var Teki1 = Class.create(Sprite,{
        initialize:function(x,y){
          Sprite.call(this,32,32)
          this.image = game01.assets['/img/chara1.png'];

        }});

        //----------------------
        //敵1作成
        //----------------------
        var T1 = new Teki1(32,32);
        T1.x = 200; T1.y =60; T1.frame = 0;

        T1.animeWaitMax = 3;		// アニメーションのWait値
        T1.animeWaitCount = 0;	// アニメーションのWait値のカウント

        //-------------無限ループ-----------------------
        T1.addEventListener('enterframe', function(){

          if (AIR = 1 && this.x > P1.x){
          this.x -= 2;  // P1に近づく
          }
          if (AIR = 1 && this.x < P1.x){
          this.x += 2;  //P1に近づく
          }

      if (battle == 0){

          if (this.animeWaitCount >= this.animeWaitMax) {
            this.animeWaitCount = 0;
        //this.frame = this.age % 3;

        //-------各Teki歩行アニメ-----------------

          if (TMN == 1 && this.frame >= 0 && this.frame <= 1) {
            this.frame++;
          }else if (TMN == 1 && this.frame >=1) {
            this.frame = 0;
          }

          if (TMN == 2 && this.frame >= 5 && this.frame <= 6) {
            this.frame++;
          }else if (TMN == 2 && this.frame >=6) {
            this.frame = 5;
          }

          if (TMN == 3 && this.frame >= 10 && this.frame <= 11) {
            this.frame++;
          }else if (TMN == 3 && this.frame >=11) {
            this.frame = 10;
          }

        } else {
                this.animeWaitCount++;
                }

        }

        //------------------------
        //Teki切り替え用のログ 未実装
        //------------------------
        if (this.x < -32) {
          TMN++;
          this.x = 232;

          //if (TMN == 1){T1.frame =0;}
          if (TMN == 2){T1.frame =5;}
          if (TMN == 3){T1.frame =10;}
          if (TMN > 3){
            TMN = 3;
            game01.replaceScene(GameoverScene());
          }
        }

        //-------Teki向き--------------
        if (this.x > P1.x){this.scaleX = -1;}
        else {this.scaleX = 1;}

      });

  //============当たり判定=====================
  //内容:
  //バトルカード展開
  //cardhandnow = 選択しているカード手
  //
  //=========================================
      //P1:敵1
      P1.addEventListener('enterframe',function(){
        if(P1.intersect(T1))
        {battle = 1;}

      //  PlifeLabel.life = game01.PLife;
      //エンカウントにより表示、非表示
      if (battle != 0){

      //-----------------------
      //カードを表示する
      //使用されたカードは削除する
      //-----------------------
      for (i=0; i<6; i++){
        if (entercrd[i] == false){
          scene.addChild(crdmain[i]);//カード札
          scene.addChild(crdhand[i]);//カード手
        }else if (entercrd[i] == true) {
          scene.removeChild(crdmain[i]);
          scene.removeChild(crdhand[i]);
        }
      }

    }else{
      //--------------------------
      //カード削除
      //--------------------------
      for (i=0; i<6; i++){
      scene.removeChild(crdmain[i]);//カード札
      scene.removeChild(crdhand[i]);//カード手
      }
    }
    //------------------バトル開始-座標-----------------------
    //---------------------------
    //バトル無しの状態
    //---------------------------
    if(battle == 0){

      //------------------------------
      //カードを一つにまとめた形にする
      //-------------------------------
      var i2 = 10;
      for (i = 0; i <6; i++)
      crdmain[i].x = i2;
      i2 += 2

    //----------------------------
    //バトル1開始
    //----------------------------
    }else if (battle == 1){
      //-----------------
      //P1,T1の状態
      //-----------------
      P1.frame = 0;　T1.frame = 0;

      //--------------------------
      //カードを6枚全て広げた状態にする
      //--------------------------
      i2 = 10;
      for (i = 0; i<6; i++){
      crdmain[i].x = i2;
      i2 += 50;
      }
      //-------------------------
      //使用されたカード削除
      //-------------------------
      for (i=0; i<6; i++){
      scene.removeChild(crdmain[entercrd]);
      scene.removeChild(crdhand[entercrd]);
      }

      //--------------------------
      //P1,T1座標を指定する
      //--------------------------
      P1.x = 40; P1.y =60;
      T1.x = 280; T1.y =60;

      //--------------------------
      //カード配置
      //--------------------------
        crdhx = 20;
        for (i=0; i<6; i++){
         cardrnd[i] = i;
         //
         crdhandnow[i] = cardrnd[i];
         crdhand[cardrnd[i]].x = crdhx; crdhand[cardrnd[i]].y = 150;

         crdhx += 50;
        }

        //------------カード選択-----------
        //selectcrd 選択カード順番
        //y = 120 無選択   y = 150 選択
        //-------------------------------
        for (i2=0; i2<6; i2++){
         if (selectcrd == i2){
           for (i=0; i <6; i++){crdmain[i].y = 150;}
              crdmain[i2].y = 120;
           }
         }

         if (game01.input.left){selectcrd -= 1} //左キー入力
         if (game01.input.right){selectcrd += 1}//右キー入力

         if (selectcrd < 0){selectcrd = 0;}
         if (selectcrd > 5){selectcrd = 5;}

         //---------------------------
         //カード決定
         //---------------------------
         //スペースキーが押されていない時にキーロックをオフにする
         if (!game01.input.space){game01.P1key = false;}

         //0~6枚のカードをいずれか選んだとき
         for (i =0; i < 6; i++){

           //--------------------------
           //スペースキーを押す
           //--------------------------
           if (game01.P1key == false && selectcrd == i && game01.input.space){

           //-------------------------------
           //決定カードをentercrdに取得
           //-------------------------------
           entercrd[selectcrd] = true


           //-------------------------------
           //スペースキーのキーロックをオンにする
           //-------------------------------
           game01.P1key = true;

           //-------------------------------
           //選択したカードを削除
           //-------------------------------
           scene.removeChild(crdmain[entercrd]);//カード札
           scene.removeChild(crdhand[entercrd]);//カード手

           //-------------------------------
           //敵カード手に乱数代入
           //-------------------------------
           cardrndT1 = Math.floor(Math.random()*5); //Teki cardhand 乱数取得

           //-------------------------------
           //敵カード札座標設定
           //-------------------------------
           crdmainT1.x = 210; crdmainT1.y = 40;

           //-------------------------------
           //カード手座標設定
           //-------------------------------
           crdhandT1[cardrndT1].x = crdmainT1.x + 10; crdhandT1[cardrndT1].y = crdmainT1.y + 10;

           //crdmainT1.scale(0.5,0.5);
           //-------------------------
           //P1手前カード札座標
           //-------------------------
           crdmain[6].x = 90;  crdmain[6].y = 40

           //-------------------------
           //P1手前カード手座標
           //-------------------------
           crdhand[6].x = crdmain[6].x + 10;  crdhand[6].y = crdmain[6].y + 10;
           crdhand[6].frame = crdhandnow[i];

           //-------------------------
           //P1手前カード表示
           //-------------------------
           scene.addChild(crdmain[6]);
           scene.addChild(crdhand[6]);

           //------------------------
           //敵カード,手表示
           //------------------------
           scene.addChild(crdmainT1);
           scene.addChild(crdhandT1[cardrndT1]);

           //------------------------
           //勝敗判定
           //------------------------


             //-----------------------
             //P1チョキ : T1パー
             //----------------------
             if ( crdhandnow[i] ==　2 && cardrndT1 == 5){
               T1Life -= T1dmg
               var Label3 = new Label("P1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             //---------------------
             //P1グー : T1チョキ
             //----------------------
             else if ( crdhandnow[i] == 0 && cardrndT1 == 2){
               T1Life -= T1dmg;
               var Label3 = new Label("P1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             //---------------------
             //P1パー : T1グー
             //---------------------
             else if ( crdhandnow[i] ==　5 && cardrndT1 == 0){
               T1Life -= T1dmg;
               var Label3 = new Label("P1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             //---------------------------
             //あいこ以外,敵より数字が大きい時
             //---------------------------
             else if ( crdhandnow[i] != cardrndT1 && crdhandnow[i] > cardrndT1 ){
               T1Life -= 1;
               var Label3 = new Label("P1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             //---------------------
             //T1チョキ : P1パー
             //---------------------
             if ( crdhandnow[i] ==　5 && cardrndT1 == 2){
               P1life -= P1dmg;
               var Label3 = new Label("T1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             //--------------------
             //T1パー: P1グー
             //-------------------
             else if ( crdhandnow[i] ==　0 && cardrndT1 == 5){
               P1life -= P1dmg;
               var Label3 = new Label("T1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             //-------------------
             // T1グー : P1チョキ
             //-------------------
             else if ( crdhandnow[i] ==　2 && cardrndT1 == 0){
               P1life -= P1dmg;
               var Label3 = new Label("T1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             //----------------------------
             //あいこ以外,敵より数字が小さい時
             //----------------------------
             else if ( crdhandnow[i] != cardrndT1 && crdhandnow[i] < cardrndT1 ){
               P1life -= P1dmg;
               var Label3 = new Label("T1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             if ( crdhandnow[i] == cardrndT1){
               var Label3 = new Label("あいこだよ");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }


           }

         }//いずれかのカードを選んだ時
       }



     //-----------------------------
     //バトル終了
     //-----------------------------
      if ( T1Life < 1 ){
       battle = 0;

       //-----------------------
       //P1手札削除
       //-----------------------
       for (i=0; i<7; i++){
        scene.removeChild(crdmain[i]);
        scene.removeChild(crdhand[i]);
       }

       //-----------------------
       //T1手札削除
       //-----------------------
       for (i=0; i<6; i++){
        scene.removeChild(crdmainT1);
        scene.removeChild(crdhandT1[i]);
       }

       //-----------------------
       //エンカウント = 0
       //-----------------------
         encount = 0;

      //-----------------------
      //T1Life全回復
      //-----------------------
      T1Life = 10;

      }


      //Debug
      //crdhndnum = Math.floor(Math.random()*6);;
      console.log(game01.P1key);


      });




//==================CARD==========================
//card,hand [6] = 手前表示手札
//
//================================================
//-------MAIN-------------------------------
      var CARD = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,50,75);
        //初期座標
        this.y = 150;  this.frame = 1;
        this.image = game01.assets['/img/Card/Cardmain.png'];

        //scene.addChild(this);
        }});



      var crdmain = Array();
      var i;
      for (i = 0; i<7; i++){
      crdmain[i] = new CARD(50,75);
      }

      //敵カード作成
      crdmainT1 = new CARD(50,75);
      scene.removeChild(crdmainT1);

      //============HAND===================

      //===================================
      var CARDHAND = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,32,50);
        //初期座標
        this.y = crdmain[0].y + 20;  this.frame = 0;

        //if (crdhndnum == 0){
        this.image = game01.assets['/img/Card/Card-number.png'];
      //}else if (crdhndnum == 2) {
        //this.image = game01.assets['/img/Card/Card-hand02.png'];
      //}

     //}

        }});

      //P1cardhand作成
      crdhand = new Array();
      for (i=0; i<6; i++){
        crdhand[i] = new CARDHAND(32,56);
        crdhand[i].frame = i
      }
      crdhand[6] = new CARDHAND(32,56);

      //敵cardhand作成
      crdhandT1 = new Array();
      for (i=0; i<6; i++){
        crdhandT1[i] = new CARDHAND(32,56);
        crdhandT1[i].frame = i;
      scene.removeChild(crdhandT1[i]);
      }



      //----------------------PAD---------------------------
      //
      //----------------------------------------------------

      var pad = new Pad();
      pad.x = 0;
      pad.y = 225;
      game01.rootScene.addChild(pad);
          scene.addChild(pad);

          //=====================
          //  BUTTON1   btn1
          //=====================
          var btn1 = new Button("ボタン", "light");
              btn1.tag = "A";
              btn1.width = 50;
              btn1.height = 30;
              btn1.x = 130;
              btn1.y = 270
          scene.addChild(btn1);

          //========================
          //  BUTTON2   btn2
          //========================
          var btn2 = new Button("ボタン", "light");
              btn2.tag = "B";
              btn2.width = 50;
              btn2.height = 30;
              btn2.x = 210
              btn2.y = 270
              scene.addChild(btn2);




            return scene;
          };



//-----------------ゲームオーバー---------------------------------
//
//
//
//-------------------------------------------------------------
          var GameoverScene = function(){
              var scene = new Scene();
              var Label5 = new Label('ゲームオーバーシーン　タッチでゲームシーンに戻る');
              Label5.x = 0;
              Label5.y = 20;
              scene.addChild(Label5);
              scene.backgroundColor = 'rgba(0,0,255,0,5)';
              scene.addEventListener(Event.TOUCH_START, function(e){
                game01.popScene();
              });


              return scene;
          };
          game01.replaceScene(createStartScene());

          //GameStart------------
        }
            game01.start(); // ゲームをスタートさせます
        };
