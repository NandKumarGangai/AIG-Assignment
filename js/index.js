$(document).ready(function(){
    let dataToShow;
    //document.getElementById("brands") = "";
    $(".filters").hide();
    $("#mobiles").click(function(){
        //alert("mobiles");
        $(".filters").show();
        document.getElementById("res").innerHTML = "";
        document.getElementById("brands").innerHTML = "";
        $('#brands').append(`
            <table>
                <tr><td>Mi: </td><td>&nbsp;<input type="checkbox" name="brand" id="mi"></td></tr>
                <tr><td>SAMSUNG: </td><td>&nbsp;<input type="checkbox" name="brand" id="samsung"></td></tr>
                <tr><td>NOKIA: </td><td>&nbsp;<input type="checkbox" name="brand" id="nokia"></td></tr>
            </table>
        `);
        
        $.get("../JSON/mobiles.json", function(data, status){            
            for(d of data){
                $("#res").append(`<div class="col-md-4 col product well text-center">
                <p class="productName">${d.name}</p>
                <img class="img-responsive img-thumbnail productImg" id="prodImgMob" src="./images/mobiles/${d.image}">
                <br>
                <div class="text-center">
                <button class="btn glyphicon glyphicon-heart text-danger"></button>
                <button class="btn btn-success" type="button" onClick="checkStatus(${d.id})">Add To Cart</button>
                </div>
            `);                              
            }            
        });

    });

    $("#laptops").click(function(){
        //alert("laptops");
        $(".filters").show();
        document.getElementById("brands").innerHTML = "";
        document.getElementById("res").innerHTML = "";
        
        $('#brands').append(`
            <table>
                <tr><td>DELL: </td><td>&nbsp;<input type="checkbox" name="brand" id="mi"></td></tr>
                <tr><td>HP: </td><td>&nbsp;<input type="checkbox" name="brand" id="samsung"></td></tr>
                <tr><td>ASUS: </td><td>&nbsp;<input type="checkbox" name="brand" id="nokia"></td></tr>
            </table>
        `);

        $.get("../JSON/laptops.json", function(data, status){            
            for(d of data){
                $("#res").append(`<div class="col-md-4 product float-left well text-center">
                <p class="productName">${d.name}</p>
                <img class="img-responsive img-thumbnail productImg" id="prodImgLaptop" src="./images/laptops/${d.image}">
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

    $("#others").click(function(){
        document.getElementById("dropdown_menu").innerHTML = "";
        $.get("../JSON/categories.json", function(data, status){
            for(category of data.categories)
            $("#dropdown_menu").append(`
            <li><a href="#">${category}</a></li>
            `);
        });
    });
    
});
function checkStatus(id){
    alert(id);
}