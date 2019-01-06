var startExperienteBtn = document.getElementById('start_experience');

startExperienteBtn.onclick = function(){
    document.getElementById('container').outerHTML = '';
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
};


var trelloKey = "9ead4b2b6e8a2fa475ec919720dc3eb1";
var cards;
var lists;
var labels;

$(document).ready(function() {
	console.log("READY");
	$.get(
		"https://api.trello.com/1/boards/55e136b4fd6ce2a9c4253e55?key="+trelloKey+"&cards=open&lists=open",
		{},
		function(data) {
			cards = data.cards;
			lists = data.lists;
			console.log("cards & lists:");
			console.log(data.cards);
			console.log(data.lists);

			console.log("AFTER:");
			console.log(cards);
			console.log(lists);
			console.log("TESTING:");
			console.log(cards[0]);
			console.log(cards[0].name);
			console.log(cards[1]["name"]);
			console.log("idAttachmentCover::: ");
			console.log(cards[0]["idAttachmentCover"]);
			console.log("FINISHED GET");

			// var imgUrl = getImageForCard(cards[0]);
			// getImageForCard(cards[0], function(imageURL) {
			// 	console.log("image 0 url:  " + imageURL);
			// });

			async.each(cards, function(single, callback){
				if (single["idAttachmentCover"] != null) {
					$.get(
						"https://api.trello.com/1/cards/"+single["id"]+"/attachments/"+ single["idAttachmentCover"] +"?key="+trelloKey,
							{},
						function(data) {
						single["imageURL"] = data["url"];
            console.log("the imageURL: ", data["url"]);
						callback();
					//callback(data["url"]);
						}
					);
				} else {
					callback();
				}
				//getImageForCard(single);
			}, function(err) {
				if (err == null) {
					console.log("CELEBRACTION");


					//init();
					//animate();
				} else {
					console.log("WTFFF" + err);
				}
			});

			var idAttachment = "55e13985f53ebc938e20b703";

			// init();
			// animate();
			//alert('page content: ' + data);
		}
	);
});



	function getNameForCard(card, callback) {

	}

	function getImageForCard(card, callback) {
		if (card != null) {
			console.log("not nil yo");
			$.get(
			"https://api.trello.com/1/cards/"+card["id"]+"/attachments/"+ card["idAttachmentCover"] +"?key="+trelloKey,
			{},
			function(data) {
				callback(data["url"]);
			}
			);
		} else {
			console.log("PRETTY NIL");
		}
	}
