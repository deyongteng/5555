//获取元素区
var box=document.getElementById('box');
var transZ=document.getElementById('transZ');
var span_box=document.getElementById('span_box');
var spanS=document.querySelectorAll('#span_box span');


//=============================================================================================


//操作span区
css(transZ,"translateZ",300);
css(span_box,"rotateX", 0);
css(span_box,"rotateY", 0);
css(spanS[4],"rotateX", -90);
css(spanS[5],"rotateX", 90);
for (var i = 0; i < spanS.length; i++) {
	if(i<4){
		css(spanS[i],"rotateY",i*90);
	}
	css(spanS[i],"translateZ",-510);
}

//======================================================================================

//阻止默认样式
document.addEventListener("touchstart",function(e){
	e.preventDefault();
});

//=================================================================================

//创建对象和申明变量区
var startPoint={x: 0, y: 0};//储存鼠标点击的x,y的坐标
var startDeg={x: 0, y: 0};//储存旋转度数
var sacle=1024/90;
var last={x: 0, y: 0};
var lastDis={x: 0, y: 0};
var lastTime=0;
var lastTimeDis=0;

//========================================================================================

//给box添加鼠标按下处理函数事件
box.addEventListener("touchstart",function(e){
	
	//获取按下时鼠标x轴的坐标位置
	startPoint.x=e.changedTouches[0].pageX;
	
	//获取按下时鼠标y轴的坐标位置
	startPoint.y=e.changedTouches[0].pageY;
	
	//获取span_box的x轴旋转度数
	startDeg.x=css(span_box,"rotateY");
	
	//获取span_box的y轴旋转度数
	startDeg.y=css(span_box,"rotateX");
	
	last.x=startDeg.x;//????
	last.y=startDeg.y;//????
	
	//初始化
	lastDis.x=0;
	lastDis.y=0;
	
	//初始化
	lastTimeDis = 0;
	
	//获取当前时间戳
	lastTime=new Date().getTime();
});

//=======================================================================================

//给box添加鼠标抚摸事件
box.addEventListener("touchmove",function(e){
	var dis={};
	
	//获取拖动时间戳
	var nowTime=new Date().getTime();
	
	//获取当前鼠标坐标X的位置(当前位置-鼠标按下的位置=差值)
	dis.x=e.changedTouches[0].pageX-startPoint.x;
	
	//获取当前鼠标坐标y的位置
	dis.y=e.changedTouches[0].pageY-startPoint.y;
	
	//当前旋转的度数-当前鼠标坐标点除以sacle（span的宽度除以90度）
	var degX=startDeg.x-(dis.x/sacle);
	var degY=startDeg.y+(dis.y/sacle);
	
	//判断是让y轴只能选择45度
	if(degY > 45){
		degY = 45;
	} else if(degY < -45){
		degY = -45;
	}
	
	//让span——box上下旋转度数
	css(span_box,"rotateY",degX);
	css(span_box,"rotateX",degY);
})