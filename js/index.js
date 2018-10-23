var cartElements = [];
var elements = [];
var wishList = [];

$(document).ready(function(){
    let dataToShow;
    //document.getElementById("brands") = "";
    $(".filters").hide();
    $(".loader").hide();
    //showData("brands", "res", "mobile");

    $("#mobiles").click(function(){
        //alert("mobiles");
        $(".loader").show();
        $(".filters").show();
        $("#filter").show();
        document.getElementById("res").innerHTML = "";
        document.getElementById("brands").innerHTML = "";
        showData("brands", "res", "mobile");
    });

    $("#laptops").click(function(){
        //alert("laptops");
        $(".filters").show();
        $(".loader").show();
        $("#filter").show();
        document.getElementById("brands").innerHTML = "";
        document.getElementById("res").innerHTML = "";
        showData("brands", "res", "laptop");
        

        //var lfckv = document.getElementById("dell").checked;
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
    
    $("#cart").click(function(){
        $(".loader").show();
        $(".filters").hide();
        document.getElementById("res").innerHTML = "";
        document.getElementById("brands").innerHTML = "";    
        showCartElements("res");
        
        $(".loader").hide();
    });

    $("#wishesList").click(function(){
        $(".loader").show();
        $(".filters").hide();
        document.getElementById("res").innerHTML = "";
        document.getElementById("brands").innerHTML = "";    
        showCartElements("res");
        
        $(".loader").hide();
    });
    
});

/**
 * Showing the products based on category
 * @param {*} brands 
 * @param {*} res 
 * @param {*} category
 */
function showData(brands, res, category){
    elements = [];
    console.log(brands, res, category);

    $.get("../JSON/products.json", function(data, status){
        var imgSize;
        if(category == "mobile"){ imgSize= "prodImgMob";}else imgSize = "prodImgLaptop";
        var brandsArray = [];
        
        for(d of data){
            if(d.category == category && !brandsArray.includes(d.brand)){
                brandsArray.push(d.brand);
            }
        }
        //console.log(brandsArray);
        
        $('#'+brands).append(`<table>`);
        for(brand of brandsArray){
            $('#'+brands).append(`<tr><td>${brand}: </td><td>&nbsp;<input type="checkbox" name="brand" id=${brand}></td></tr>`);
        }                
        $('#'+brands).append(`</table>`);

        for(var i=0; i< data.length; i++){
            var btnClass = "btn btn-success";
            var btnContent = "Add To Cart";
            if(data[i].category == category){                
                elements.push(data[i]);
                for(cartElement of cartElements){
                    if(cartElement.id == data[i].id){
                        btnClass = "btn btn-danger";
                        btnContent = "Added";
                        break;
                    }
                }
                $("#"+res).append(`<div class="col-md-4 col-sm-6 col-xs-12 product float-left well text-center">
                <p class="productName">${data[i].name}</p>
                <img class="img-responsive img-thumbnail productImg" id=${imgSize} src="./images/${data[i].image}">
                <br>
                <div class="desc">
                    <button class="btn btn-link" data-toggle="modal" data-target="#productModel" onClick="showModal('${data[i].name}', '${data[i].image}', '${data[i].description}', '${data[i].price}', '${imgSize}')">Know more...</button>
                    <div>
                        <h4>&#8377; ${data[i].price}</h4>
                    </div>
                        
                </div>
                <div class="text-center btns">
                    <button class="btn glyphicon glyphicon-heart" onClick="addToWishList(${data[i].id})"></button>
                    <button class="${btnClass}" type="button" onClick="addToCart(${data[i].id}, '${brands}', '${res}', '${category}')">${btnContent}</button>
                </div>
            `); 
            }                              
        }
        $(".loader").hide();
        //console.log(elements);
    });    
}

/**
 * Adding elements to cart
 * @param {*} id 
 */
function addToCart(id, brands, res, category){
    console.log(id);
    
    var temp = {};
    var flag = true;
    for(ele of elements){
        if(ele.id == id){
            temp = ele;
            break;
        }
    } 
    for(ele of cartElements){
        if(ele.id == id){
            flag = false;
            break;
        }
    }   
    if(flag){
        cartElements.push(temp);
        alert("Product Added to Cart...");
    }else{
        alert("Product Already in Cart...");
    }

    $(".loader").show();
        $(".filters").show();
        $("#filter").show();
        document.getElementById("res").innerHTML = "";
        document.getElementById("brands").innerHTML = "";
    showData("brands", "res", category);
    console.log(cartElements);
}

/**
 * Removing a element from a cart
 * @param {} id 
 */
function removeFromCart(id){    

    for(var i=0; i< cartElements.length; i++){
        if(cartElements[i].id == id){
            cartElements.splice(i, 1);
            alert("REMOVED...");
            break;
        }
    }
        $(".loader").show();
        $(".filters").hide();
        document.getElementById("res").innerHTML = "";
        document.getElementById("brands").innerHTML = "";    
        showCartElements("res");
        
        $(".loader").hide();
    console.log(cartElements);
}

/**
 * Adding a product into wishlist
 * @param {*} id 
 */
function addToWishList(id){
    
    var temp = {};
    var flag = true;
    for(ele of elements){
        if(ele.id == id){
            temp = ele;
            break;
        }
    }
    for(ele of wishList){
        if(ele.id == id){
            flag = false;
            break;
        }
    }    
    if(flag){
        wishList.push(temp);
        alert("Product Added to WishList...");
    }else{
        alert("Product Already in WishList...");
    }
    console.log(wishList);
}

/**
 * For showing the pop up type modal 
 * @param {*} name 
 * @param {*} image 
 * @param {*} description 
 * @param {*} price 
 * @param {*} imgSize 
 */
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

/**
 * Showing cart elements 
 * @param {*} res 
 */
function showCartElements(res){
    console.log("in cart");
    var total=0;
    for(ele of cartElements){
        total += ele.price; 
    }
    $(".filters").show();
    $("#filter").hide();
    $("#brands").append(`
        <h4>Total Items are: ${cartElements.length}</h4>
        <h4>Total Amount is: ${total}</h4>
        <button class="btn btn-primary" type="button" onClick="placeOrder(${total})">PLACE ORDER</button>
    `);
    for(cartEle of cartElements){
        $("#"+res).append(`<div class="col-md-4 col-sm-6 col-xs-12 product float-left well text-center">
                <p class="productName">${cartEle.name}</p>
                <img class="img-responsive img-thumbnail productImg"  id="prodImgMob" src="./images/${cartEle.image}">
                <br>
                <div class="desc">
                    <button class="btn btn-link" data-toggle="modal" data-target="#productModel" onClick="showModal()">Know more...</button>
                    <div>
                        <h4>&#8377; ${cartEle.price}</h4>
                    </div>
                        
                </div>
                <div class="text-center btns">
                    
                    <button class="btn btn-danger" type="button" onClick="removeFromCart(${cartEle.id})">REMOVE</button>
                </div>
            `);
    }
}

/**
 * Showing cart elements 
 * @param {*} res 
 */
function showWishListElements(res){
    console.log("in cart");
    for(cartEle of cartElements){
        $("#"+res).append(`<div class="col-md-4 col-sm-6 col-xs-12 col-md-offset-2 product float-left well text-center">
                <p class="productName">${cartEle.name}</p>
                <img class="img-responsive img-thumbnail productImg" id="" src="./images/${cartEle.image}">
                <br>
                <div class="desc">
                    <button class="btn btn-link" data-toggle="modal" data-target="#productModel" onClick="showModal()">Know more...</button>
                    <div>
                        <h4>&#8377; ${cartEle.price}</h4>
                    </div>
                        
                </div>
                <div class="text-center btns">
                    
                    <button class="btn btn-danger" type="button" onClick="removeFromCart(${cartEle.id})">REMOVE</button>
                </div>
            `);
    }
}

function placeOrder(amount){
    if(amount>0)
        alert("Order Placed for amount "+amount);
    else alert("Plz add some items into cart ");
}

