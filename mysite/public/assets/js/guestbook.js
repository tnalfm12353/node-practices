$(() => {
	
	$("#btn-fetch").click(()=>{
		// let id = $("#list-guestbook li:last").data("no"); // where
		let index = $("#list-guestbook").children().length;
		fetch(index);
	});

	$("#add-form").submit((event) => {
		event.preventDefault();
			
		vo = {	}
			
		// valiation
		vo.name = $("#input-name").val();
		if(vo.name == "") {
			const title = "이름";
			const message = title +" 빈칸을 입력해주세요";
			validDialog(title,message);
			return ;
		}
			
		vo.password = $("#input-password").val();
		if(vo.password == "") {
			const title = "패스워드";
			const message = title +" 빈칸을 입력해주세요";
			validDialog(title,message);
			return ;
		}
		
		vo.message = $("#tx-content").val();
		if(vo.message == "") {
			const title = "내용";
			const message = title +" 빈칸을 입력해주세요";
			validDialog(title,message);
			return ;
		}
		
		add(vo);
	});	
	
	$(document).on("click", "#list-guestbook li a", function(event){
			event.preventDefault();
			let no = $(this).data("no");
			$("#hidden-no").val(no);
			deleteDialog.dialog("open");
	});
	
	const deleteDialog = $("#dialog-delete-form").dialog({
			autoOpen: false,
			width: 300,
			height: 220,
			modal: true,
			buttons: {
				"삭제" : () => {
					const id = $("#hidden-no").val();
					const password = $("#password-delete").val();
					remove(id,password);
					
				},
				"취소" : function() {
					$(this).dialog("close");
				}
			},
			close: function() {
				// 1. password 비우기
				// 2. no 비우기
				$("#password-delete, #hidden-no").val("");
				// 3. error message 숨기기
				$(".validateTips.error").hide();
			}
	});
	
	$(window).scroll(() =>{
		const $window = $(this);
		
		let windowHeight = $window.height(); // 브라우저 높이
		let scrollTop = $window.scrollTop(); // 스크롤 위치
		let documentHeight = $(document).height(); // body 높이
		
		if(scrollTop + windowHeight + 10 > documentHeight) {
			if(!isFetching){
				isFetching = true;
				// let id = $("#list-guestbook li:last").data("no");
				let index = $("#list-guestbook").children().length;
				fetch(index);
			}
					
		}
	});
});

const validDialog = (title, message) =>{
	$("#dialog-message p").text(message);
	$("#dialog-message").dialog({
		title: title,
		content:message,
		modal: true,
		buttons: {
			"확인": function() {
				$(this).dialog("close");
			}
		},
	});
}

const addGuestbook = (vo) =>{
	return(	"<li data-no='" + vo.id + "'>" + 
				"<strong>" + vo.name + "</strong>" +
				"<p>" + vo.message + "</p>" +
				"<strong></strong>" + 
				"<a href='' data-no='" + vo.id + "'>삭제</a>" + 
			"</li>");
}

var isFetching = false;