BatmanApp.factory('Batman',function ($resource) {

	this.test();

	this.test = function(){
		var test = this.Character;
		console.log(test)
	};

	console.log("hej")console.log("hej")console.log("hej")
	console.log("hej")
	

	this.Character = $resource('http://comicvine.gamespot.com/api/character:id',{api_key:'bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8'});
	console.log(this.Character)

}