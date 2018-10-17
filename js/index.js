$(document).ready(function(){
    let dataToShow;
    //document.getElementById("brands") = "";
    $("#mobiles").click(function(){
        //alert("mobiles");
        document.getElementById("brands").innerHTML = "";
        document.getElementById("res").innerHTML = "Mobiles";

    });

    $("#laptops").click(function(){
        //alert("laptops");
        
        document.getElementById("brands").innerHTML = "";
        $("#brands").append('DELL: <input type="checkbox" name="brand" id="dell">');
        $("#brands").append('<br>HP: <input type="checkbox" name="brand" id="hp">');
        $("#brands").append('<br>ASUS: <input type="checkbox" name="brand" id="asus">');
        $.get("../JSON/laptops.json", function(data, status){            
            for(d of data){
                $("#res").append(`<div class="col-md-4 product float-left well text-center  ">
                <p class="productName">${d.name}</p>
                <img class="img-responsive img-thumbnail productImg" id="prodImg" src="./images/laptops/${d.image}">
                <br>
                <div class="text-center">
                <button class="btn glyphicon glyphicon-heart"></button>
                <button class="btn btn-success" type="button" onClick="checkStatus(${d.id})">Add To Cart</button>
                </div>
            `);                              
            }            
        });

        var lfckv = document.getElementById("dell").checked;
        //alert(lfckv);
    });

    $("#tv").click(function(){
        //alert("tv");
        document.getElementById("res").innerHTML = "tv";
        document.getElementById("brands").innerHTML = "";
        $.get("../JSON/laptops.json", function(data, status){
            for(d of data){
                $("#res").append(d.name);
                
            }            
        }); 
    });

    $("#accessories").click(function(){
        //alert("accessories");
        document.getElementById("brands").innerHTML = "";
        document.getElementById("res").innerHTML = "accessories";
    });

    
});
function checkStatus(id){
    alert(id);
}