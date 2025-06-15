search=document.querySelector("button");
userfood=document.querySelector(".box");
text=document.querySelector(".content");
recipe=document.querySelector(".recipe");

search.addEventListener("click",function(e){
   e.preventDefault();
   let userchoice=userfood.value.trim();
   
   findfood(userchoice);
   
});

async function findfood(userchoice){

    text.innerHTML="<h2>Fetching data......</h2>";
    try{
    const link= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userchoice}`);
    let data=await link.json();
    text.innerHTML="";
    if(data.meals){
        data.meals.forEach(function(meal){
         layout=document.createElement("div");    
         layout.classList.add("outer");
         layout.innerHTML=`
        <img src=${meal.strMealThumb}
        <h2>${meal.strMeal}</h2>
        <p>${meal.strArea} ${meal.strCategory}</p>  
       
         `;
         btn=document.createElement("button");
         btn.innerText="Recipe";
        
        layout.appendChild(btn);
        
        btn.addEventListener("click",function(){
            instruct(meal);
        });
        
        text.appendChild(layout);
         
            });    //completed for each loop
        }          //if bracket closed
        else{
            text.innerHTML = "<h2>No items available</h2>";
            }
        }// try bracket closed
        catch(error){
        text.innerHTML = "<h2>Sorry !! Can't access data</h2>";
            
        }
}
     


 function instruct(meal){
    console.log(meal)
    let innerdiv = document.createElement("div");
    recipe.innerHTML = "";
    innerdiv.classList.add("newbox");
    let youtubeUrl = meal.strYoutube.replace("watch?v=", "embed/");


    innerdiv.innerHTML = `
     <h1>Ingredients</h1>
     <ol class="ingredient"></ol>
     <i class="fa-regular fa-circle-xmark" ></i>  

     <h2>Instruction</h3>
     <p>${meal.strInstructions}</p>
     <h2>Learn from video </h2>
      <iframe width="560" height="315" src="${youtubeUrl}" frameborder="0" allowfullscreen></iframe>

     `;
     
     
     icon=innerdiv.querySelector(".fa-circle-xmark");
     icon.addEventListener("click",function(){
        remove_item();
     });
     
    recipe.appendChild(innerdiv);
    ingre(meal);


    


}
function ingre(meal){
    item=document.querySelector(".ingredient");
    for(let i=1;i<=20;i++){
        let instruction=meal[`strIngredient${i}`];
        let amount=meal[`strMeasure${i}`];

        if(instruction && instruction.trim()!==""){
             create=document.createElement("li");
            create.innerText=`${instruction.trim()}-${amount}`;
             item.appendChild(create);
        
    }
}
    



}
function remove_item(){
    recipe.innerHTML="";
}
