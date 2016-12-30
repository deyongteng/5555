var div=document.getElementById('div');


function cssTransform(element,attr,val){
	
	//判断这个元素是否有这条样式
	if(!element.transform){
		element.transform={};
	}
	
	//判断val（值）是否等于undefined
	if(typeof val=="undefined"){
		if(typeof element.transform[attr]=="undefined"){
			
			//初始值
			switch(attr){
				case "scale":
				case "scaleX":
				case "scaleY":
					element.transform[attr]=100;
					break;
				default:
					element.transform[attr]=0;
			}
		}
		console.log("获取样式");
	}else{
		//元素里的属性值等于val
		element.transform[attr]=val;
		
		//申明一个空字符串以便下面储存值的单位
		var transformVal = "";
		
		//元素的样式值等于val(以免出现其他问题所有用Number转换)
		element.transform[attr] = Number(val);
		for(var s in element.transform){
			
			//判断每一个属性
			switch(s){
				//以下出现的情况就把单位设置为deg
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
				//给以上出现的情况就把单位设置为deg
					transformVal+=" "+s+"("+element.transform[s]+"deg)";
					break;
				
				//以下出现的情况就把单位设置为px
				case "translateX":
				case "translateY":
				case "translateZ":
				//给以上出现的情况就把单位设置为px
					transformVal+=" "+s+"("+element.transform[s]+"px)";
					break;
				//以下出现的情况就把单位设置为/100
				case "scale":
				case "scaleX":
				case "scaleY":
					transformVal += " "+s+"("+element.transform[s]/100+")";
					console.log(element.transform[s]/100)
			}
		}
		console.log(transformVal)
		//元素的样式等于transformVal（有相对应单位的值）
		element.style.WebkitTransform = element.style.transform = transformVal;
	}
}

document.onclick=function(){
	MTween({
		el:div,//元素
		target:{//目标点
			scale: 200,
			translateX: 200,
			translateY: 200,
			rotate: 360
		},
		time:1000,//运动时间（毫秒）
		type:"backOut",//动画类型
		callBack:function(){//回调函数（动画执行完之后，执行的函数）
			console.log("动画执行完了");
		},
		callIn:function(){//并发函数 (动画执行完中,执行的函数)；
			console.log("动画执行中");
		}
	});
};
