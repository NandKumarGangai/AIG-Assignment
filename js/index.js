$(document).ready(function(){
    let dataToShow;
    //document.getElementById("brands") = "";
    $(".filters").hide();
    $(".loader").hide();
    $("#mobiles").click(function(){
        //alert("mobiles");
        $(".loader").show();
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
                <div class="text-center btns">
                <button class="btn glyphicon glyphicon-heart text-danger"></button>
                <button class="btn btn-success" type="button" onClick="checkStatus(${d.id})">Add To Cart</button>
                </div>
            `);                              
            }
            $(".loader").hide();
        });

    });

    $("#laptops").click(function(){
        //alert("laptops");
        $(".filters").show();
        $(".loader").show();
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
                <div class="desc">
                <button class="btn btn-link" data-toggle="modal" data-target="#productModel">Know more...</button>
                <div>
                    <h4>&#8377; ${d.price}</h4>
                </div>
                <div id="productModel" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">${d.name}</h4>
                    </div>
                    <div class="modal-body">
                        <p><img class="img-responsive img-thumbnail productImg" id="prodImgLaptop" src="./images/laptops/${d.image}"></p>
                        <div class="">
                            <p>${d.description}</p>
                        </div>
                        <div class="">
                            <p><b>Price: </b>&#8377; ${d.price}</p>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    </div>

                </div>
                </div>

                </div>
                <div class="text-center btns">
                    <button class="btn glyphicon glyphicon-heart"></button>
                    <button class="btn btn-success" type="button" onClick="checkStatus(${d.id})">Add To Cart</button>
                </div>
            `);                              
            }
            $(".loader").hide();
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