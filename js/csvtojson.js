var inputFile = "../assets/datafile.csv";
var outputFile = "../assets/datafile.json";

const fs = require ("fs");

const key = ["country", "population", "gdp", "purchasing_power"];

var parser = function (inFile, key, outFile){
	
	var buffer = "[";
	
	var line = fs.readFileSync(inFile).toString().split("\n");
	
	var col = [];
	
	for(var i=0, l=line.length-2; i<l; i++){
		
		var value = line[i].split(",");
		
		if(i==0){
			value.forEach(function(val, index, arr){
				switch(true){
					case (val.indexOf("Country Name") > -1):
						col[0] = index;
						break;
					case (val.indexOf("Population (Millions) - 2013") > -1):
						col[1] = index;
						break;
					case (val.indexOf("GDP Billions (US$) - 2013") > -1):
						col[2] = index;
						break;
					case (val.indexOf("Purchasing Power in Billions ( Current International Dollar) - 2013") > -1):
						col[3] = index;
						break;
				}
			});
			
		}else{
			col.forEach(function(val, index, arr){
		
				if(index == 0)
					buffer += "{";
				
				buffer += '"' + key[index] + '"' + ":" + value[val];
				
				if(!(index == arr.length - 1))
					buffer += ",";
				
				if(index == arr.length - 1)
					buffer += "}";
			});
			
			if(i != l-1)
			buffer += ",";
		}
	}
	
	buffer += "]";
	
	fs.writeFileSync(outFile, buffer);
	
	console.log("-----COMPLETE-----");
	console.log("parsed json saved to: " + outFile);
}

parser(inputFile, key, outputFile);
