//object to create timer
const timer={
    int:undefined,
    start:function(id){
        var t=(18*3600+30*60)*1000;
        timer.int=setInterval(function(){
            var d=new Date(t);
            // console.log(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
            document.getElementById(id).innerHTML="Time:"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            t+=1000;
        },1000)
    },
    stop:function(){
        if(timer.int!=undefined){
            clearInterval(timer.int);
            timer.int=undefined;
        }
    }
}
var row=2;
var numEle=7;
function makeTile(row){
    //Making tiles
    for(i=0;i<row*row;i++){
        var tile=document.createElement("button");
        tile.style.height=150-row*5;
        tile.style.width=150-row*5;
        tile.className="tile";
        tile.id="Tile"+(i);
        // tile.innerHTML=ele[i];
        tile.onclick=function(){changeTile(this)};
        document.getElementById('tiles').appendChild(tile);
    }
    var s='';
    for(var i=0;i<row;i++)
        s+="auto "
        document.getElementById('tiles').style.gridTemplateColumns=s;
}

//function to make elements of tiles and return them in array
function makeElement(num){
    var a=[]
    for(var i=0;i<num;i++)
        a.push(Math.floor(Math.random()*10));
    return a;
}
//function to put elements in tiles
function makeTileElement(){
    var diffEle=makeElement(numEle);
    var ele=[];
    for(var i=0;i<row*row;i++)
        ele.push(-1);
    for(var i=0;i<(row*row/2);i++){
        //finding element number and its position
        var x=Math.floor(Math.random()*row*row);
        while(ele[x]!=-1)
            x=Math.floor(Math.random()*row*row);
        var e=Math.floor(Math.random()*numEle);
        ele[x]=diffEle[e];
        x=Math.floor(Math.random()*row*row);
        while(ele[x]!=-1)
            x=Math.floor(Math.random()*row*row);
        ele[x]=diffEle[e];
    }
    //ele is array of items which is showed on tiles at random
    return ele;
}

const changeTile=(function(){
    var ele=makeTileElement();
    var open=[];
    t=undefined;
    var score=0;
    showScore=document.getElementById('score');
    showScore.innerHTML="Score :"+score;
    return (Tile)=>{   
        // console.log(Tile);
        console.log(score);
        if(t!=undefined){
            clearInterval(t);
            t=undefined;
        }
        var num=Number(Tile.id.substring(4));
        
        if(open.length>1){
            //close all tiles
            for(var i=0;i<open.length;){
                document.getElementById('Tile'+open[i]).innerHTML='';
                document.getElementById('Tile'+open[i]).disabled=false;
                open.shift();
            }
            document.getElementById('Tile'+num).innerHTML=ele[num];  
            document.getElementById('Tile'+num).disabled=true;   
            open.push(num);
            t=setTimeout(()=>{
                for(var i=0;i<open.length;){
                    document.getElementById('Tile'+open[i]).innerHTML='';
                    document.getElementById('Tile'+open[i]).disabled=false;
                    open.shift();
                };
                t=undefined;
            },1500);
        }
        else if(open.length==1){
            document.getElementById('Tile'+num).innerHTML=ele[num];
            document.getElementById('Tile'+num).disabled=true;
            if(ele[num]==ele[open[0]]){
                document.getElementById('Tile'+num).disabled=true;
                document.getElementById('Tile'+open[0]).disabled=true;
                score++;
                document.getElementById('score').innerHTML="Score:"+score;
                open=[];
            }
            else{
                open.push(num);
                t=setTimeout(()=>{
                    for(var i=0;i<open.length;){
                        document.getElementById('Tile'+open[i]).innerHTML='';
                        document.getElementById('Tile'+open[i]).disabled=false;
                        open.shift();
                    }
                    t=undefined;
                },1000);
            }
        }
        else if(open.length==0){
            document.getElementById('Tile'+num).innerHTML=ele[num];  
            document.getElementById('Tile'+num).disabled=true;   
            open.push(num);
            t=setTimeout(()=>{
                for(var i=0;i<open.length;){
                    document.getElementById('Tile'+open[i]).innerHTML='';
                    document.getElementById('Tile'+open[i]).disabled=false;
                    open.shift();
                };
                t=undefined;
            },1500);
        }
        console.log(open);
        if(score==row*row/2)
           timer.stop();
    }
        
})();


function start(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    timer.start('timer');
    document.getElementById("start").style.display="none";
    document.getElementById("tiles").style.display="grid";
    makeTile(row);
}
