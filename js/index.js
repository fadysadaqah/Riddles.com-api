var json = []
var count = 1
function parseHTML(data) {
    $('.main').html(data)
}
function get_questions() {
    var questions = $('.main .riddle_print .panel-default .panel-body .orange_dk_blockquote')
    var answers = $('.main .riddle_print .panel-default .panel-body .dark_purple_blockquote')
    for (var i = 0; i < questions.length; i++) {
        var part = { question: questions.eq(i).text(), ans: answers.eq(i).text() }
        json.push(part)
    }
}
function json_to_table (json) {
    var tr;

    for (var i = 0; i < json.length; i++) {
        tr = $('<tr/>');

        tr.append("<td>" + i + "</td>");
        tr.append("<td>" + json[i].question + "</td>");
        tr.append("<td>" + json[i].ans + "</td>");
        $('table').append(tr);
    }
};
function get_data(url,count_max ) {
    if (count == count_max+1) {
        console.log(json)
        // $('.container').text(JSON.stringify(json))
        json_to_table(json)

    } else {
        
        $.ajax({
            type: "GET",
            url: url + count,
            success: function (data) {
                parseHTML(data)
                get_questions()
                console.log('************************************************')
                console.log(count)
                console.log('************************************************')
                count++
                get_data(url,count_max)
            }
        })
    }
}
var url = "https://www.riddles.com/best-riddles?page="
var count_max = 5
get_data(url,count_max)