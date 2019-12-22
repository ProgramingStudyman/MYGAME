/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            妖怪の怪談
                          GYOZA
                                  2019/07/29
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
enchant.Sound.enabledInMobileSafari = true;

enchant();
window.onload = function() {

  var game01 = new Game(320, 320);
  game01.preload(
  '/img/Enemy/Mob001.png', '/img/Enemy/Mob002.png','/img/Enemy/Mob003.png','/img/BG01-1.png', '/img/BG01-2.png', '/img/start.png',
  '/img/Card/Card-number.png', '/img/Card/Cardmain.png', 'img/Ground-001.png',
  '/img/Player/P1_001.png', '/se/atack01.wav'
   );

game01.onload = function() {

//==========初期化==============
  //------スペースキーの取得---------
  game01.keybind( 32, 'space' );

  //--------jキーの取得------------
  game01.keybind(74, 'j' );

  //--------タイマー定義------------
  timer = 0;  timer2 = 0;


  /*=======================
  P1変数定義 ~
  =======================*/
  //--------P1座標取得変数--------
  var getx;
  var gety;
  //---------P1ライフ------------
  var P1life = 100;
  var P1dmg = 1;
  //-------アクションスイッチ---------
  AT = false;

  //---攻撃アニメ用変数---------------
  P1AttackAnim = Array();
  P1AttackAnim[0] = 0;

  T1AttackAnim = Array();
  T1AttackAnim[0] = 0;


  //--------ジャンプ変数定義---------
  JP = false;
  jpy = 0;  jpy2 = 0;

  //-------アイーンアクション定義---------
  ainT = 0;//アイーンタイム

  /*=======================
   敵 変数定義
  =======================*/
  //------------敵ライフ-----------
  var T1Life = 10;
  var T1dmg = 1;
  //-----------敵AI乱数------------
  var AIR　= 1 + Math.floor(Math.random()*2);

  //--------TekiMaxNumber(Teki現在数)-----------
  TMN = 1;

  /*=======================
    CARD(P1とT1両方含む)
  =======================*/
  ACS = Array; //addChildスイッチ
  battle = 0;
  encount = 0;
  encountrnd =0;

  enctimer = 0;

  crdhx = 0;
  crdhndnum = Math.floor(Math.random()*6);

  cardrnd = Array(); //card手乱数取得変数
  for (i = 0; i<6; i++){
  cardrnd[i] = Math.floor(Math.random()*3); //cardhand 乱数取得
  }

  crdhandnow = Array();//選択カード取得用変数


  CARDSETon = false;  //CARDSETファンクションのスイッチ

  game01.P1spacekey = false;
  game01.enterkeyleft = false;
  game01.enterkeyright = false;
  nocrd = false;

  var i; var i2;
  var selectcrd = 0;//選択カード
  var cardrndT1;
  /*-----------------------
  使用カードの初期値代入
  -----------------------*/
  entercrd = Array;
  for ( i = 0; i < 6; i++ ){entercrd[i] = false;}

    //game01.PLv = 1;
    //game01.PEXP = 0;

    var WG = new PhysicsWorld(0, 9.8);   //重力設定

  //ラベル
  var Label1 = new Label(P1life); var Label2 = new Label(T1Life);
  var Label3 = new Label("何もありません!!");
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


/*==================タイトル=======================



================================================*/
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


/*----------------------メイン-----------------------------------
P1, Teki1, Score


--------------------------------------------------------------*/
  var GameScene = function(){
    var scene = new Scene();

    WG.step(game01.fps);//重力読み込み

  /*================================
   メソッド,自作関数


  ================================*/
      function CARDSET(i,i2,crdhx){
        /*--------------------------
         カード配置リセット
        --------------------------*/
              /*--------------------------
              カードを6枚全て広げた状態にする
              --------------------------*/
                i2 = 10;
               for (i = 0; i<6; i++){
               crdmain[i].x = i2;
               i2 += 50; //手札座標の間隔
               }
              /*--------------------------
              カード配置
              --------------------------*/
                crdhx = 10;
                for (i=0; i<6; i++){

                 cardrnd[i] = Math.floor(Math.random()*4); //自カード手に乱数代入

                 crdhandnow[i] = cardrnd[i];

                 crdhand[i].x = crdhx; //カード手X座標
                 crdhand[i].y = 150; //カード手Y座標
                 crdhand[i].frame = cardrnd[i];

                 crdhx += 50;

                }
          }

  /*=============タイマー関数====================
   1秒毎に呼び出し
  ===========================================*/
    var timeract = function(){
    timer++;

   //敵AI乱数取得
   var AIR　= 1 + Math.floor (Math.random() * 2);

   if (encount == 0 && AT == false){
      encountrnd = Math.floor (Math.random() * 2);

   }

   //------------エンカウント発生----------------
   //敵1
   if (encountrnd == 1){
     encount = 1;
     //T1.x = 320; T1.y =60; T1.frame = 0;
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
   //var Label3 = new Label("");

   Label1.font = "10px cursive";
   Label2.font = "10px cursive";
   //Label3.font = "10px cursive";

   Label1.x = 100;  Label1.y = 10;
   Label2.x = 200;  Label2.y = 10;
   //Label3.x = 100;  Label3.y = 50;

   Label1.color = "rgb(0,0,0)";
   Label2.color = "rgb(0,0,0)";
   //Label3.color = "rgb(0,0,0)";

   game01.rootScene.addChild(Label1);
   game01.rootScene.addChild(Label2);
   //game01.rootScene.removeChild(Label3);

   //game01.rootScene.addChild(Label3);
   //game01.rootScene.addChild(Label4);

   //デバック
    //console.log(cardrnd);
  //console.log(P1life, T1Life, P1dmg, T1dmg);
   }

    setInterval(timeract, 1000);  //タイマー関数呼び出し



    /*==============BG======================

    ======================================*/
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

  /*================P1=======================


  =========================================*/
      var Player1 = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,32,32);
        this.image = game01.assets['/img/Player/P1_001.png'];
        scene.addChild(this);
        }});
      var P1 = new Player1(32,32);//P1表示

      /*------------------
      初期座標
      ------------------*/
      P1.x = 50;  P1.y = 60;  P1.frame = 0;
      P1.animeWaitMax = 3;  P1.animeWaitCount = 0;

      //無限に常に読まれる
      P1.addEventListener('enterframe', function(){

      /*------------------
      左キー押す
      ------------------*/
      if(AT == false && battle == 0 && game01.input.left){
        P1.x -= 3;
        P1.scaleX = -1;
        P1.frame += 1;
      }

      /*------------------
      右キー押す
      ------------------*/
      if(AT == false && battle == 0 && game01.input.right){
        P1.x += 3;
        P1.scaleX = 1;
        P1.frame += 1;
      }

      /*------------------
       上キー押す
      ------------------*/
      if(AT == false && battle == 0 && game01.input.up){
        P1.y -= 3;
        P1.frame += 1;
      }

      /*------------------
      右キー押す
      ------------------*/
      if(AT == false && battle == 0 && game01.input.down){
        P1.y += 3;
        P1.frame += 1;
      }
      /*--------------------
      フレームループ
      --------------------*/
      if (P1.frame > 3){
        P1.frame = 1;
      }

      /*--------------------
      何も推されてない時
      左キーと右キーが押されていない時
      フレームを立ち状態にする
      --------------------*/
      if ( !game01.input.left && !game01.input.right && !game01.input.up && !game01.input.down ){
        P1.frame = 0;
      }

      //スペースキー
      if(AT == false && battle == 0 && game01.input.space ){}

      //Jキー
      if(AT == false && JP == false && game01.input.j )
        {JP = true; jpy2 = 9;}
        if (JP == true){jpy2 -= 0.8;}

        if (JP == true && P1.y>60){
            JP = false;
            jpy = 0;
            jpy2 = 0;
            P1.y = 60
          }

        P1.y -= jpy + jpy2;
      });

      //クリック
      game01.rootScene.addEventListener('touchend', function(event)
      {P1.x = event.x;  P1.y = event.y; });

      /*===============Teki1=====================
        AIR
      =========================================*/
        var Teki1 = Class.create(Sprite,{
        initialize:function(x,y){
          Sprite.call(this,32,32)
          //this.image = game01.assets['/img/Enemy/Mob001.png'];
          if (TMN == 1){this.image = game01.assets['/img/Enemy/Mob001.png'];}
          if (TMN == 2){this.image = game01.assets['/img/Enemy/Mob002.png'];}
          if (TMN == 3){this.image = game01.assets['/img/Enemy/Mob003.png'];}
        }});


        /*----------------------
         敵1作成
        ----------------------*/
        var T1 = new Teki1(32,32);
        if (TMN == 1) {var T1 = new Teki1(32,32);}
        if (TMN == 2) {var T1 = new Teki1(24,32);}
        if (TMN == 3) {var T1 = new Teki1(32,32);}
        T1.x = 420; T1.y =60; T1.frame = 0;
        T1.animeWaitMax = 3;  T1.animeWaitCount = 0;

        //-------------無限ループ-----------------------
        T1.addEventListener('enterframe', function(){

          // P1に近づく
          if (AIR = 1 && this.x > P1.x && battle == 0 && encount != 0)
          {T1.x -= 2;}

          //P1に近づく
          if (AIR = 1 && this.x < P1.x && battle == 0 && encount != 0)
          {T1.x += 2;}

      if (battle == 0){
          if (T1.animeWaitCount >= this.animeWaitMax) {
            T1.animeWaitCount = 0;
        //this.frame = this.age % 3;

        //-------各Teki歩行アニメ-----------------

          if (TMN == 1 && this.frame >= 0 && this.frame <= 1) {
            this.frame++;
          }else if (TMN == 1 && this.frame >=1)
          {this.frame = 0;}

          if (TMN == 2 && this.frame >= 0 && this.frame <= 1) {
            this.frame++;
          }else if (TMN == 2 && this.frame >=1)
          {this.frame = 0;}

          if (TMN == 3 && this.frame >= 0 && this.frame <= 2) {
            this.frame++;
          }else if (TMN == 3 && this.frame >=2)
          {this.frame = 0;}

        } else {this.animeWaitCount++;}
        }

        /*------------------------
        Teki切り替え用のログ 未実装
        ------------------------*/
        if (this.x < -32) {
          TMN++;
          this.x = 232;

          if (TMN == 1){T1.image = game01.assets['/img/Enemy/Mob001.png'];}
          if (TMN == 2){T1.image = game01.assets['/img/Enemy/Mob002.png'];}
          if (TMN == 3){T1.image = game01.assets['/img/Enemy/Mob003.png'];}

          if (TMN == 3){}
          if (TMN > 3){
             TMN = 3;
             game01.replaceScene(GameoverScene());
          }
        }

        //-------Teki向き--------------
        if (T1.x > P1.x){T1.scaleX = 1;}
        else {T1.scaleX = -1;}

      });

  /*============当たり判定=====================
  内容:
  バトルカード展開
  cardhandnow = 選択しているカード手

  =========================================*/
      //P1:敵1
      P1.addEventListener('enterframe',function(){
        if(P1.intersect(T1) && battle == 0)
        {
          battle = 1;
        }

      //  PlifeLabel.life = game01.PLife;
      //エンカウントにより表示、非表示
      if (battle != 0){

        if (CARDSETon == false){

          /*--------------------------
          P1,T1座標を指定する
          --------------------------*/
          P1.x = 40; P1.y =60;
          T1.x = 280; T1.y =60;

          CARDSET();
          CARDSETon = true;
        }
      /*-----------------------
      カードを表示する
      使用されたカードは削除する
      -----------------------*/
      for (i=0; i<6; i++){
        if (entercrd[i] == false){

          if (CARDSETon == false){

            CARDSET();
            CARDSETon = true;
          }

          scene.addChild(crdmain[i]);//カード札
          scene.addChild(crdhand[i]);//カード手

        }else if (entercrd[i] == true) {
          scene.removeChild(crdmain[i]);
          scene.removeChild(crdhand[i]);
        }
      }

    }else{
      /*--------------------------
      カード削除
      --------------------------*/
      for (i=0; i<6; i++){
      scene.removeChild(crdmain[i]);//カード札
      scene.removeChild(crdhand[i]);//カード手
      }
    }

    /*------------------バトル開始-座標-----------------------
    ---------------------------
    バトル無しの状態
    ---------------------------*/
    if(battle == 0){

      /*------------------------------
      カードを一つにまとめた形にする
      -------------------------------*/
      i2 = 10;
      for (i = 0; i <6; i++)
      crdmain[i].x = i2;
      i2 += 2


    /*----------------------------
    バトル1開始
    ----------------------------*/
    }else if (battle == 1){
      //-----------------
      //P1,T1の状態
      //-----------------
      P1.frame = 0;　T1.frame = 0;

      /*------------------
      初期座標取得
      -----------------*/
      getx = P1.x;  gety = P1.y;

      if (CARDSETon == false){
        for (i=0; i<6; i++){
         cardrnd[i] = Math.floor(Math.random()*3);
        }
        CARDSET();
        CARDSETon = true;
      }


      /*-------------------------
      使用されたカード削除
      -------------------------*/
      for (i=0; i<6; i++){
       scene.removeChild(crdmain[entercrd]);
       scene.removeChild(crdhand[entercrd]);
      }



      /*------------カード選択-----------
      selectcrd 選択カード順番
      y = 120 選択   y = 150 無選択
      -------------------------------*/
        /*---------------------------
        座標
        ---------------------------*/
        for (i2=0; i2<6; i2++){
         if (selectcrd == i2 ){
           for (i=0; i <6; i++){
             crdmain[i].y = 150;  //選択無しカード札座標
             crdhand[i].y = 152;  //選択無しカード手座標
           }

              crdmain[i2].y = 120;  //選択済みカード札座標
              crdhand[i2].y = 122;  //選択無しカード手座標
           }
         }

            /*----battle-----------------------
            キー操作
            ---------------------------*/
             //左キー入力

            if (AT == false && game01.enterkeyleft == false && game01.input.left){
              game01.enterkeyleft = true;
              selectcrd -= 1

              for (i =1; i<6; i++){
              if (entercrd[selectcrd] == true && entercrd[selectcrd-i] == false)
              {selectcrd -= i;}
             }

              //for (i=0; i<6; i++){
              //if (entercrd[selectcrd] = true ){
                //console.log(entercrd[1],selectcrd)
            //  }}

              }

            //右キー入力
            if (AT == false && game01.enterkeyright == false && game01.input.right){
              game01.enterkeyright = true;
              if (entercrd[selectcrd] == false){selectcrd += 1;}

              for (i =1; i<6; i++){
              if (entercrd[selectcrd] == true && entercrd[selectcrd+i] == false)
              {selectcrd += i;}
             }

            }
            if (selectcrd > 5){selectcrd = 5}
            if (selectcrd < 0){selectcrd = 0}

            //左,右連打禁止キーオフ
            if (!game01.input.left)
            {game01.enterkeyleft = false;}

            if (!game01.input.right)
            {game01.enterkeyright = false;}

    /*-----------------()--------------------------

    カード決定

    -------------------------------------------*/
         //スペースキーが押されていない時にキーロックをオフにする
         if (!game01.input.space){game01.P1spacekey = false;}

         //0~6枚のカードをいずれか選んだとき
         for (i =0; i < 6; i++){

          /*-----------------------------------
          スペースキーを押す
          -----------------------------------*/

           if (AT == false && game01.P1spacekey == false && selectcrd == i && entercrd[i] == false &&
               game01.input.space){

          /*-------------------------------
          決定カード変数をオンにする
          -------------------------------*/
           entercrd[selectcrd] = true

           /*-------------------------------
           スペースキーのキーロックをオンにする
           -------------------------------*/
           game01.P1spacekey = true;

           game01.assets["/se/atack01.wav"].play()

           /*-------------------------------
           選択したカードを削除
           -------------------------------*/
           scene.removeChild(crdmain[entercrd]);//カード札
           scene.removeChild(crdhand[entercrd]);//カード手

           /*-------------------------------
           //敵カード手に乱数代入
           -------------------------------*/
           cardrndT1 = Math.floor(Math.random()*3); //Teki cardhand 乱数取得

           /*-------------------------------
           敵カード札座標設定
           -------------------------------*/
           crdmainT1.x = 210; crdmainT1.y = 40;

           /*-------------------------------
           カード手座標設定
           -------------------------------*/
           crdhandT1[cardrndT1].x = crdmainT1.x; crdhandT1[cardrndT1].y = crdmainT1.y + 2;

           /*-------------------------
           P1手前カード札座標
           -------------------------*/
           crdmain[6].x = 90;  crdmain[6].y = 40

           /*-------------------------
           P1手前カード手座標
           -------------------------*/
           crdhand[6].x = crdmain[6].x;  crdhand[6].y = crdmain[6].y + 2;
           crdhand[6].frame = crdhandnow[i];

           /*-------------------------
           P1手前カード表示
           -------------------------*/
           scene.addChild(crdmain[6]);
           scene.addChild(crdhand[6]);

           /*------------------------
           敵カード,手表示
           ------------------------*/
           scene.addChild(crdmainT1);
           scene.addChild(crdhandT1[cardrndT1]);

           /*------------------------
           勝敗判定
           ------------------------*/
           //P1の数字が敵より大だった時
           if (crdhandnow[i] > cardrndT1)
           {
             T1DMG();
             startP1Attack01();
             AT = true;


           }
           //P1の数字が敵より小だった時
           if (crdhandnow[i] < cardrndT1)
           {
             P1DMG();
             startT1Attack01();
             AT = true;
           }

             /*-----------------------
             P1チョキ : T1パー
             P1グー : T1チョキ
            　P1パー : T1グー
             あいこ以外,敵より数字が大きい時
             ----------------------*/

             /*
             if ( crdhandnow[i] ==　2 && cardrndT1 == 5 || crdhandnow[i] == 0 && cardrndT1 == 2 ||
                  crdhandnow[i] ==　5 && cardrndT1 == 0 || crdhandnow[i] != cardrndT1 && crdhandnow[i] > cardrndT1){
                  T1DMG();
             }
             /*

             /*---------------------
               T1チョキ : P1パー
               T1パー: P1グー
               T1グー : P1チョキ
               あいこ以外,敵より数字が小さい時
             ---------------------*/

            /*
            if ( crdhandnow[i] ==　5 && cardrndT1 == 2 || crdhandnow[i] ==　0 && cardrndT1 == 5 ||
                  crdhandnow[i] ==　2 && cardrndT1 == 0 || crdhandnow[i] != cardrndT1 && crdhandnow[i] < cardrndT1){
                  P1DMG();

             }
             */

             /*------------------------------
             あいこメソッド
             ------------------------------*/
             if ( crdhandnow[i] == cardrndT1){
               var Label3 = new Label("あいこだよ");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             /*-----------------------------
             P1負けダメージメソッド
             -----------------------------*/
             function P1DMG(){
               P1life -= P1dmg;
               var Label3 = new Label("T1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             /*-----------------------------
             T1負けダメージメソッド
             -----------------------------*/
             function T1DMG() {
               T1Life -= T1dmg;
               var Label3 = new Label("P1勝ち");
               Label3.x = 150;  Label3.y = 50
               game01.rootScene.addChild(Label3);
             }

             //------P1攻撃アニメ------------------
             function startP1Attack01(){
               var P1AttackAnimTimer = setInterval(function(){
                 //console.log(P1AttackAnim[0])
                 //-------敵に近づくアニメ-----------
                 if (P1AttackAnim[0] == 0){
                   P1.x += 3;
                    if (P1.x > T1.x-32){
                      P1AttackAnim[0] = 1;
                    }}
                  //-------敵の位置から所定の位置へ戻るアニメ---------------
                 if (P1AttackAnim[0] == 1){
                   P1.x -= 3;
                    if (P1.x < 40){
                      P1AttackAnim[0] = 0;
                      AT = false;
                      clearInterval(P1AttackAnimTimer)
                      //P1dmgnumanim();
                    }}
               }, 10);}

               function startT1Attack01(){
                 var T1AttackAnimTimer = setInterval(function(){
                   //-------P1に近づくアニメ-----------
                   if (T1AttackAnim[0] == 0){
                     T1.x -= 3;
                      if (T1.x < P1.x + 32){
                        T1AttackAnim[0] = 1;
                      }}
                    //-------敵の位置から所定の位置へ戻るアニメ---------------
                   if (T1AttackAnim[0] == 1){
                     T1.x += 3;
                      if (T1.x > 280){
                        T1AttackAnim[0] = 0;
                        AT = false;
                        clearInterval(T1AttackAnimTimer)
                        //T1dmgnumanim();
                      }}

                 }, 10);}

                 //ダメージ表示


    /*----------------------------------
    選択カードを一つ戻す
    ----------------------------------*/
    selectcrd -= 1;

    }

    /*----------------------------------
    カードが全て無くなった時
    ----------------------------------*/
    if (entercrd[0] == true && entercrd[1] == true && entercrd[2] == true &&
        entercrd[3] == true && entercrd[4] == true && entercrd[5] == true){

          /*--------------------------
          カード配置リセット
          --------------------------*/

          CARDSETon = false;

          if(CARDSETon == false){
            CARDSET();
            CARDSETon = true;
          }

               for (i = 0; i<6; i++){

               scene.addChild(crdmain[i]);//カード札
               scene.addChild(crdhand[cardrnd[i]]);//カード手

               entercrd[i] = false;//決定されたカードをoffにする
             }

          }

    }//0~6枚のカードのいずれかのカードを選んだ時

     /*-----------------------------
     バトル終了
     -----------------------------*/
      if ( T1Life < 1){
       /*-----------------------
       T1座標設定
       -----------------------*/
       T1.x = 420; T1.y =60; T1.frame = 0;

       /*-----------------------
       P1手札削除
       -----------------------*/
       for (i=0; i<7; i++){
        scene.removeChild(crdmain[i]);
        scene.removeChild(crdhand[i]);
       }

       /*-----------------------
       T1手札削除
       -----------------------*/
       for (i=0; i<6; i++){
        scene.removeChild(crdmainT1);
        scene.removeChild(crdhandT1[i]);
       }

       /*-----------------------
       CARDSETonをoffにする
       -----------------------*/
       CARDSETon = false;

       /*-----------------------
       決定されたカードをoffにする
       -----------------------*/
       for (i = 0; i<6; i++){
       entercrd[i] = false;
       }

      /*-----------------------
      T1Life全回復
      -----------------------*/
      T1Life = 10;

      /*-----------------------
      エンカウント = 0
      -----------------------*/

      encountrnd = 0;
      encount = 0;
      battle = 0;
      T1.x = 340; T1.y =60; T1.frame = 0;

      startencountTimer()
      function startencountTimer(){
      var encountTimer = setInterval(function(){
        enctimer++;
      }, 1000);}
      if (enctimer > 10){


        //encount = 0;
      }

      /*-----------------------
      バトル変数off
      -----------------------*/
      //battle = 0;

      }

    }

}); //P1.addEventListener('enterframe',function(

/*==================CARD==========================
card,hand [6] = 手前表示手札

================================================*/
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
      for (i = 0; i<7; i++){
      crdmain[i] = new CARD(50,75);
      }

      //敵カード作成
      crdmainT1 = new CARD(50,75);
      scene.removeChild(crdmainT1);

      /*============HAND===================

      ===================================*/
      var CARDHAND = Class.create(Sprite,{
        initialize:function(x,y){
        Sprite.call(this,50,70);
        this.y = crdmain[0].y + 20;  this.frame = 0;//初期座標
        this.image = game01.assets['/img/Card/Card-number.png'];
        }});

      //P1cardhand作成
      crdhand = new Array();
      for (i=0; i<6; i++){
        crdhand[i] = new CARDHAND(32,56);
        crdhand[i].frame = cardrnd[i];
      }
      crdhand[6] = new CARDHAND(32,56); //手前のカード

      //敵cardhand作成
      crdhandT1 = new Array();
      for (i=0; i<6; i++){
        crdhandT1[i] = new CARDHAND(32,56);
        crdhandT1[i].frame = i;
      scene.removeChild(crdhandT1[i]);
      }

      /*----------------------PAD---------------------------

      ----------------------------------------------------*/
      var pad = new Pad();
      pad.x = 0;
      pad.y = 225;

      game01.rootScene.addChild(pad);
          scene.addChild(pad);

          /*=====================
            BUTTON1   btn1
          =====================*/
          var btn1 = new Button("ボタン", "light");
              btn1.tag = "A";
              btn1.width = 50;
              btn1.height = 30;
              btn1.x = 130;
              btn1.y = 270
              btn1.buttonMode = 'space';
          scene.addChild(btn1);

          /*========================
            BUTTON2   btn2
          ========================*/
          var btn2 = new Button("ボタン", "light");
              btn2.tag = "B";
              btn2.width = 50;
              btn2.height = 30;
              btn2.x = 210
              btn2.y = 270
              scene.addChild(btn2);

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
                game01.popScene();
              });

              return scene;
          };
          game01.replaceScene(createStartScene());

          //GameStart------------
        }
            game01.start(); // ゲームをスタートさせます
        };
