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
function start(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    timer.start('timer');
    document.getElementById("start").style.display="none";
    document.getElementById("tiles").style.display="grid";
    Tile.init();
    Tile.makeTile(Tile.row);
    console.log('Hello');
}
function stop(){
    alert('Score is:'+Tile.score+'\nNext Level');
    document.getElementById('tiles').innerHTML='';
    Tile.row+=2;
    Tile.makeTile(Tile.row);
    Tile.init();
    // timer.stop();
    // timer.start('timer');
}
const Tile={
    row:2,
    numEle:7,
    makeTile:(row)=>{
        //Making tiles
        for(i=0;i<row*row;i++){
            var tile=document.createElement("button");
            tile.style.height=150-row*5;
            tile.style.width=150-row*5;
            tile.className="tile";
            tile.id="Tile"+(i);
            // tile.innerHTML=ele[i];
            tile.onclick=function(){Tile.changeTile(this)};
            document.getElementById('tiles').appendChild(tile);
        }
        var s='';
        for(var i=0;i<row;i++)
            s+="auto "
            document.getElementById('tiles').style.gridTemplateColumns=s;
    },
    makeElement:(num)=>{
        var a=[]
        for(var i=0;i<num;i++)
            a.push(Math.floor(Math.random()*10));
        return a;
    },
    makeTileElement:()=>{
        var numEle=Tile.numEle;
        var row=Tile.row;
        var diffEle=Tile.makeElement(numEle);
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
    },
    
    init:()=>{
        Tile.ele=Tile.makeTileElement();
        Tile.open=[];
        Tile.t=undefined;
        Tile.score=0;
    },
    changeTile:(tile)=>{   
        // console.log(Tile);
        console.log(Tile.score);
        if(Tile.t!=undefined){
            clearInterval(Tile.t);
            Tile.t=undefined;
        }
        var num=Number(tile.id.substring(4));
        
        if(Tile.open.length>1){
            //close all tiles
            for(var i=0;i<Tile.open.length;){
                document.getElementById('Tile'+Tile.open[i]).innerHTML='';
                document.getElementById('Tile'+Tile.open[i]).disabled=false;
                Tile.open.shift();
            }
            document.getElementById('Tile'+num).innerHTML=Tile.ele[num];  
            document.getElementById('Tile'+num).disabled=true;   
            Tile.open.push(num);
            Tile.t=setTimeout(()=>{
                for(var i=0;i<Tile.open.length;){
                    document.getElementById('Tile'+Tile.open[i]).innerHTML='';
                    document.getElementById('Tile'+Tile.open[i]).disabled=false;
                    Tile.open.shift();
                };
                Tile.t=undefined;
            },1500);
        }
        else if(Tile.open.length==1){
            document.getElementById('Tile'+num).innerHTML=Tile.ele[num];
            document.getElementById('Tile'+num).disabled=true;
            if(Tile.ele[num]==Tile.ele[Tile.open[0]]){
                document.getElementById('Tile'+num).disabled=true;
                document.getElementById('Tile'+Tile.open[0]).disabled=true;
                Tile.score++;
                document.getElementById('score').innerHTML="Score:"+Tile.score;
                Tile.open=[];
            }
            else{
                Tile.open.push(num);
                Tile.t=setTimeout(()=>{
                    for(var i=0;i<Tile.open.length;){
                        document.getElementById('Tile'+Tile.open[i]).innerHTML='';
                        document.getElementById('Tile'+Tile.open[i]).disabled=false;
                        Tile.open.shift();
                    }
                    Tile.t=undefined;
                },1000);
            }
        }
        else if(Tile.open.length==0){
            document.getElementById('Tile'+num).innerHTML=Tile.ele[num];  
            document.getElementById('Tile'+num).disabled=true;   
            Tile.open.push(num);
            Tile.t=setTimeout(()=>{
                for(var i=0;i<Tile.open.length;){
                    document.getElementById('Tile'+Tile.open[i]).innerHTML='';
                    document.getElementById('Tile'+Tile.open[i]).disabled=false;
                    Tile.open.shift();
                };
                Tile.t=undefined;
            },1500);
        }
        console.log(Tile.open);
        if(Tile.score==Tile.row*Tile.row/2)
           stop();
    }   
}
