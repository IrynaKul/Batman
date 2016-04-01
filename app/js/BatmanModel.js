batmanPlannerApp.factory('batmanModel',function ($resource) {
	
	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];

	var arrayObjects=[];
	var top10id=[6129,1696,4885,1698,1807,5555,1697,3715,1702,3718];

	this.getTop10 = function(){
		for (var i=0;i<top10id.length;i++){
			var find = $resource('https://www.comicvine.com/api/characters/?api_key=f9043525bd2e79300101a963676d0bdc40534402&limit=10&format=json&filter=id:'+top10id[i]);
			find.get(function(data){
				var a=data.results[0];
				arrayObjects.push({id:a.id,
							name:a.name,
							real_name:a.real_name,
							image:a.image,
							deck:a.deck,
							first_appeared_in_issue:a.first_appeared_in_issue,
							gender:a.gender,
							aliases:a.aliases});
				console.log(arrayObjects);
			})
		}
		return arrayObjects;
	}


	//function that returns a dish of specific ID
	return this;
});