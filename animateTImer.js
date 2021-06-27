var ele=document.createElement('p');
document.body.appendChild(ele);
function redSize(){
    var size=100;
    var small=setInterval(()=>{
    ele.style.fontSize=size+"px";size-=10;if(size==10) clearInterval(small); 
    },100)
}
function timer(count){
    var counter=count;
    var timer = setInterval(function(){
        if(counter== 0) 
        {
            clearInterval(timer);
        } 
        else 
        {
            //Execute the CSS change function
            ele.innerHTML=counter;
            redSize();
        }
        counter--;
    }, 1000);
}
timer(10);