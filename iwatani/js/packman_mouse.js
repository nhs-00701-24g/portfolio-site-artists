const img_packman = document.getElementById('packman');
const target = document.getElementById('on_packman');

let intervalID;
let mp4_src,mp4_PosX,mp4_PosY;

let isBlocked = false;
let clearFlag = false;

const gridCells = document.querySelectorAll(".grid-cell");

const grid = document.querySelector(".grid");

for (let i = 1; i < 41; i++) {
  for (let j = 1; j < 49; j++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.id = `cell-${i}-${j}`;
    if(i==3 || i==9 || i==15 || i==21 || i==27 || i==33 || i==39){
      if(j==4 || j==10 || j==16 || j==22 || j==28 || j==34 || j==40 || j==46) {
        cell.classList.add("grid-cell-energy");
      }
    }
    grid.appendChild(cell);
  }
}

target.addEventListener("mouseenter",() => {
  if(isBlocked) {
    return;
    }
  +function() {
    
    let co_r_Element = document.getElementById("co_r");
    let co_r_Element_Width = co_r_Element.offsetWidth;
    let center_Element = document.getElementById("center");
    let center_Element_Width = center_Element.offsetWidth;

    const ga = [];
    ga[0] = "../assets/mouse_event/packman/72ppi/close.png";//閉じる
    ga[1] = "../assets/mouse_event/packman/72ppi/under.png";//下
    ga[2] = "../assets/mouse_event/packman/72ppi/right.png";//右
    ga[3] = "../assets/mouse_event/packman/72ppi/left.png";//左
    ga[4] = "../assets/mouse_event/packman/72ppi/up.png";//上

    let My_url = "";
    const speed = 25;
    const hx = -50;
    const hy = -50;
    let now_num;

    function $(imgLay){
      return document.getElementById(imgLay);
    }

    let load = new Array();//画像先読み込み

    for (let num=0, len=ga.length; num<len; num++) {
      load[num] = new Image();
      load[num].src = My_url + ga[num];
    }

    img_packman.insertAdjacentHTML('afterend','<img src='+ My_url + ga +' id="imgLay" class="target2" style="position:absolute; z-index: 300";>');
    let imgPosX,imgPosY,mX,mY;
    let r2 = speed / Math.sqrt(2);

    const init = () => { // const ○○ = () => {}で、function() {}と同じ意味
      imgPosX = $("imgLay").offsetLeft;
      imgPosY = $("imgLay").offsetTop;
      mX = imgPosX;
      mY = imgPosY;
      moveImg();
    }

    function moveImg(){
    if (((mX+speed) > imgPosX && (mX-speed) > imgPosX)
      || ((mY+speed) > imgPosY && (mY-speed) > imgPosY)
      || ((mX+speed) < imgPosX && (mX-speed) < imgPosX) 
      || ((mY+speed) < imgPosY && (mY-speed) < imgPosY)) {

        // 画像選択
      if ((mX-speed) >= imgPosX) {
        if(now_num == 2) {
          imgPosX += speed;
          num = 0;
        } else {
          imgPosX += speed;
          num = 2;
        }
      } else if ((mX+speed) <= imgPosX) {
        if(now_num == 3) {
          imgPosX -= speed;
          num = 0;
        } else {
          imgPosX -= speed;
          num = 3;
        }
      } else if (mY >= imgPosY) {
        if(now_num == 1) {
          imgPosY += speed;
          num = 0;
        } else {
          imgPosY += speed;
          num = 1;
        }
      } else if (mY <= imgPosY) {
        if(now_num == 4) {
          imgPosY -= speed;
          num = 0;
        } else {
          imgPosY -= speed;
          num = 4;
        }
      }
      now_num = num;

      $("imgLay").src = My_url + ga[num];

      if(imgPosX < co_r_Element_Width) {
        imgPosX = co_r_Element_Width;
      }
      if(imgPosX > co_r_Element_Width + center_Element_Width - 100) {
        imgPosX = co_r_Element_Width + center_Element_Width - 100;
      }
      $("imgLay").style.left = imgPosX + "px";

      if(imgPosY < 100) {
        imgPosY = 100;
      }
      if(imgPosY > 1000) {
        imgPosY = 1000;
      }
      $("imgLay").style.top = imgPosY + "px";

      $("imgLay").style.width = 100 + "px";
      $("imgLay").style.height = 100 + "px";

      mp4_PosX = imgPosX + "px";
      mp4_PosY = imgPosY + "px"


      let gridX = Math.floor((imgPosX - co_r_Element_Width)/25);
      let gridY = Math.floor(imgPosY/25);

      for(let i = gridX; i < gridX+4; i++ ) {
        for(let j = gridY; j > gridY-4; j--) {
          let cell = document.querySelector(`#cell-${j}-${i}`);
          if (cell) {
            cell.style.backgroundColor = "black";
          }
        }
      }

      // すべてのgridcellenergyに背景色が加えられたか（食べられたか）の判定
      let gridCells = document.querySelectorAll(".grid-cell-energy");
      let allCellsBgColor = true;

      gridCells.forEach(cell => {
        if (!cell.hasAttribute('style') || !cell.getAttribute('style').includes('background-color')) {
          allCellsBgColor = false;
          return;
        }
      });

      if(allCellsBgColor) {
        if(!clearFlag) {
          // クリアおめでとうの表示
          console.log("クリアおめでとう");
          clearFlag = true;
        }
      } else {
      }
    }
    setTimeout(moveImg, 100);
  }

    document.onmousemove = function(e){
      mX = e.pageX + hx;
      mY = e.pageY + hy;
    }

    init();
    
  }();
}, false);

target.addEventListener("mouseleave", ()=> {
  const target = document.getElementById('imgLay');
  target.remove();

  img_packman.insertAdjacentHTML(
    'afterend','<video autoplay muted src="../assets/mouse_event/packman/video/sprite-sheet_1.mp4" id="mouseMovie"style="position:absolute; top:'+ mp4_PosY +'; left:' + mp4_PosX + '; z-index: 300; width: 100px; height: 100px;"><source src="../assets/mouse_event/packman/video/sprite-sheet_1.mp4" type="video/mp4"/></video>'
    );

    const target3 = document.getElementById('mouseMovie');

    let video = document.getElementById('mouseMovie');
		video.addEventListener('ended', () => {
      target3.remove();
    },false);

    isBlocked = true;
    setTimeout(() => {
      isBlocked = false;
    }, 3000);

},false)
;
