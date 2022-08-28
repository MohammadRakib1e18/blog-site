/* 
   navbar configuration
   (hide, display based on user's mouse scrolling)
 */
document.getElementById('body').addEventListener('wheel', function(event){
    
    if(event.deltaY <=0){
        document.getElementById('navbar').classList.add('display-nav');
        document.getElementById('navbar').classList.remove('hide-nav');
        console.log(event.deltaY);
    }
    else{
        document.getElementById('navbar').classList.add('hide-nav');
        document.getElementById('navbar').classList.remove('display-nav');
    }
})
document.getElementById('navbar').classList.add('display-nav');