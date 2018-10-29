var allData= [];
$(document).ready(function(){
    console.log("In admin.js");
    
    $.get("http://localhost:8081/", function(data, status){ 
        allData = data;
        console.log(allData);
        document.getElementById("product").innerHTML = "";
        for(d of data){
            $("#product").append(`
            <tr>
                <td>${d.id}</td>
                <td>${d.name}</td>
                <td>${d.brand}</td>
                <td><button type="button" class="btn btn-success" data-toggle="modal" data-target="#view" onclick="viewProduct(${d.id})">VIEW</button></td>
                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productEdit" onclick="editProduct(${d.id})">EDIT</button></td>
                <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#productModel" onclick="removeProduct(${d.id})">DELETE</button></td>
            </tr>
            `);
            
        }
        var totalRows = $('#tblData').find('tbody tr:has(td)').length;
    var recordPerPage = 5;
    var totalPages = Math.ceil(totalRows / recordPerPage);
    var $pages = $('<div id="pages"></div>');
    for (i = 0; i < totalPages; i++) {
        $('<span class="pageNumber">&nbsp;' + (i + 1) + '</span>').appendTo($pages);
    }
    $pages.appendTo('#tblData');
    $('.pageNumber').hover(function() {
        $(this).addClass('focus');
    }, function() {
        $(this).removeClass('focus');
    } );
    $('table').find('tbody tr:has(td)').hide();
    var tr = $('table tbody tr:has(td)');
    for (var i = 0; i<recordPerPage - 1; i++) {
        $(tr[i]).show();
    }
    $('span').click(function(event) {
        $('#tblData').find('tbody tr:has(td)').hide();
        var nBegin = ($(this).text() - 1) * recordPerPage;
        var nEnd = $(this).text() * recordPerPage - 1;
        for (var i = nBegin; i <=nEnd; i++){
            $(tr[i]).show();
        }
    });
    });
});

function viewProduct(id){
    var prod;
    for(d of allData){
        if(d.id == id){
            prod= d;
            console.log("product", prod);            
            break;
        }
    }

    $("#productInfo").empty();
    $("#productInfo").append(`
            
            <div id="view" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">${prod.name}</h4>
                    </div>
                    <div class="modal-body">
                        <p><img class="img-responsive img-thumbnail productImg" id="prodImgMob" src="./images/${prod.image}"></p>
                        <div class="">
                            <p>${prod.description}</p>
                        </div>
                        <div class="">
                            <p><b>Price: </b>&#8377; ${prod.price}</p>
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


function removeProduct(id){
    if(confirm("Are you sure ?")){
        var temp = allData;
        for (i = 0; i < temp.length; i++) {
            if (temp[i].id == id) {
                //temp.splice(i, 1);
                break;
            }
        }
        allData = temp;
        $.post("http://localhost:8081/remove", {"key" : 1001}, function(data, status){ console.log(status);})
        console.log(temp);
    }
    
}