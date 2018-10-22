var cartElements = [];
var elements = ["hello"];

$(document).ready(function(){
    let dataToShow;
    //document.getElementById("brands") = "";
    $(".filters").hide();
    $(".loader").hide();
    showData("brands", "res", "mobile");

    $("#mobiles").click(function(){
        //alert("mobiles");
        $(".loader").show();
        $(".filters").show();
        document.getElementById("res").innerHTML = "";
        document.getElementById("brands").innerHTML = "";
        showData("brands", "res", "mobile");
    });

    $("#laptops").click(function(){
        //alert("laptops");
        $(".filters").show();
        $(".loader").show();
        document.getElementById("brands").innerHTML = "";
        document.getElementById("res").innerHTML = "";
        showData("brands", "res", "laptop");
        

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
    
    $("").click(function(){

    });
    
});


function showData(brands, res, category){
    elements = [];
    

    $.get("../JSON/products.json", function(data, status){
        var imgSize;
        if(category == "mobile"){ imgSize= "prodImgMob";}else imgSize = "prodImgLaptop";
        var brandsArray = [];
        
        for(d of data){
            if(d.category == category && !brandsArray.includes(d.brand)){
                brandsArray.push(d.brand);
            }
        }
        console.log(brandsArray);
        $('#'+brands).append(`<table>`);
        for(brand of brandsArray){
            $('#'+brands).append(`<tr><td>${brand}: </td><td>&nbsp;<input type="checkbox" name="brand" id=${brand}></td></tr>`);
        }
                
        $('#'+brands).append(`</table>`);

        for(d of data){
            if(d.category == category){                
                elements.push(d);
                $("#"+res).append(`<div class="col-md-4 col-sm-6 col-xs-12 product float-left well text-center">
                <p class="productName">${d.name}</p>
                <img class="img-responsive img-thumbnail productImg" id=${imgSize} src="./images/${d.image}">
                <br>
                <div class="desc">
                    <button class="btn btn-link" data-toggle="modal" data-target="#productModel" onClick="showModal('${d.name}', '${d.image}', '${d.description}', '${d.price}', '${imgSize}')">Know more...</button>
                    <div>
                        <h4>&#8377; ${d.price}</h4>
                    </div>
                        
                </div>
                <div class="text-center btns">
                    <button class="btn glyphicon glyphicon-heart" onClick="addToWishList(${d.id})"></button>
                    <button class="btn btn-success" type="button" onClick="addToCart(${d.id})">Add To Cart</button>
                </div>
            `); 
            }                              
        }
        $(".loader").hide();
        console.log(elements);
    });    
}

function addToCart(id){
    
    var temp = {};
    for(ele of elements){
        if(ele.id == id){
            temp = ele;
            break;
        }
    }    
    if(!cartElements.includes(temp)){
        cartElements.push(temp);
        alert("Product Added to Cart...");
    }else{
        alert("Product Already in Cart...");
    }
    console.log(cartElements);
}

function showModal(name, image, description, price, imgSize){
    // alert(res);
    //console.log(data);
    $("#res").append(`
    <div id="productModel" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">${name}</h4>
            </div>
            <div class="modal-body">
                <p><img class="img-responsive img-thumbnail productImg" id=${imgSize} src="./images/${image}"></p>
                <div class="">
                    <p>${description}</p>
                </div>
                <div class="">
                    <p><b>Price: </b>&#8377; ${price}</p>
                </div>
            </div>                        
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" autofocus>Close</button>
            </div>
        </div>
    </div>
</div>
    `);
}