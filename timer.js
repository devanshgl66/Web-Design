const timer={
    int:undefined,
    start:function(id){
        var t=(18*3600+30*60)*1000;
        timer.int=setInterval(function(){
            var d=new Date(t);
            // console.log(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
            document.getElementById(id).innerHTML=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
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
export default timer;