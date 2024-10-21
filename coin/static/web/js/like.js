


$(document).ready(function() {
    getVoteState();

    // 추천 버튼 클릭 이벤트
    $('#upvote-btn').click(function() {
        voteAction(this, "UP");
    });

    // 비추천 버튼 클릭 이벤트
    $('#downvote-btn').click(function() {
        voteAction(this,"DOWN");
    });
});

function voteAction(e, voteType){
    const home=$("#home").attr("content");
    const bno=$("#bno").val();
    const username=$("#USER_username").val();
    if(!username){
        alert('로그인후 이용 가능합니다.');
        return;
    }

    $.ajax({
        url: `${home}/api/like`,
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({bno, voteType}),
        success: function(result) {
//       console.log("* 반환 처리값 :" ,result);

            if(result.code ===1) {
                $('#upvote-count').text(result.data.upvoteCount);
                $('#downvote-count').text(result.data.downvoteCount);
                $('.vote-container .btn').removeClass('active');

                if(result.data.message==="create"){
                    $(e).addClass('active');

                }else if(result.data.message==="update"){
                    $(e).addClass('active');

                }else if(result.data.message==="delete"){
                    $(e).removeClass('active');
                }

            } else{
                alert("추천 오류 입니다.");
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function getVoteState(){
    const home=$("#home").attr("content");
    const bno=$("#bno").val();

    $.ajax({
        url: `${home}/api/like`,
        type: "GET",
        data: {bno},
        success: function(result) {
            if(result.code ===1) {
                $('#upvote-count').text(result.data.upvoteCount);
                $('#downvote-count').text(result.data.downvoteCount);
                $('.vote-container .btn').removeClass('active');
                if(result.data.myVoted==="UP"){
                    $("#upvote-btn").addClass('active');
                }else if(result.data.myVoted==="DOWN"){
                    $("#downvote-btn").addClass('active');
                }
            } else{
                alert("추천 오류 입니다.");
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}