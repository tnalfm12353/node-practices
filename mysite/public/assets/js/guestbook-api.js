const fetch = (index) =>{
    (index == undefined) && (index = 0);
    $.ajax({
        url: "/api/guestbook?index="+index,
        dataType: "json",  	
        type: "get",
        success: function(response) {
            response.data.forEach((vo)=>{
                $("#list-guestbook").append(addGuestbook(vo));
                isFetching = false;
            });
        }
    });
}

const add = (vo) =>{
    $.ajax({
        url: "/api/guestbook",
        async: true,
        dataType: "json",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(vo),
        success: function(response) {
            var vo = response.data;
            $("#list-guestbook").prepend(addGuestbook(vo));	
            $("#add-form")[0].reset();
        }
    });
}

const remove = (id,password) =>{
    $.ajax({
        url: "/api/guestbook/"+id,
        dataType: "json",  	
        type: "delete",		
        data: "password=" + password,
        success: function(response) {
            if(response.result != "success") {
                response.error(response.message);
                return;
            }
            
            if(response.data == -1){
                //비밀번호가 틀린경우.
                $(".validateTips.error").show();
                $("#password-delete")
                    .val("")
                    .focus();
            }else{
                $("#list-guestbook li[data-no=" + response.data +"]").remove();
                $("#dialog-delete-form").dialog("close");
            }
        }
    });
} 