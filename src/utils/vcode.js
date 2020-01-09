/*生成4位随机数*/
function rand(){
    var str="abcdefghijklmnopqrstuvwxyz0123456789";
    var arr=str.split("");
    var validate="";
    var ranNum;
    for(var i=0;i<4;i++){
        ranNum=Math.floor(Math.random()*36);   //随机数在[0,35]之间
        validate+=arr[ranNum];
    }
    return validate;
}

/**生成一个随机数**/
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**生成一个随机色**/
function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
}

/*干扰线的随机x坐标值*/
function lineX(){
    var ranLineX=Math.floor(Math.random()*90);
    return ranLineX;
}

/*干扰线的随机y坐标值*/
function lineY(){
    var ranLineY=Math.floor(Math.random()*40);
    return ranLineY;
}

function vcode(mycanvas, code = rand(), width = 90, height = 38){
    mycanvas.width = width;
    mycanvas.height = height;
    mycanvas.style.width = width + 'px';
    mycanvas.style.height = height + 'px';

    var ctx=mycanvas.getContext('2d');
    ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
    ctx.fillRect(0,0,width,height);

    /*生成干扰线20条*/
    for(var j=0;j<20;j++){
        ctx.strokeStyle='#fff';
        ctx.beginPath();    //若省略beginPath，则每点击一次验证码会累积干扰线的条数
        ctx.moveTo(lineX(),lineY());
        ctx.lineTo(lineX(),lineY());
        ctx.lineWidth=0.5;
        ctx.closePath();
        ctx.stroke();
    }

    ctx.fillStyle=randomColor(50, 160); //随机生成字体颜色
    ctx.font='bold 20px Arial';
    ctx.fillText(code,25,25);   //把rand()生成的随机数文本填充到canvas中
}

export default vcode