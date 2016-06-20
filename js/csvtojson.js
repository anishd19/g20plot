var inputFile = "../assets/datafile.csv";
var outputFile = "../assets/datafile.json";

const fs = require ("fs");

const key = ["country", "population", "gdp", "purchasing_power"];

const cols = [0, 5, 9, 17];

var parser = function (inFile, key, cols, outFile){
	
	var buffer = "[";
	
	var line = fs.readFileSync(inFile).toString().split("\n");
	
	for(var i=1, l=line.length-2; i<l; i++){
		
		var value = line[i].split(",");
		
		cols.forEach(function(val, index, arr){
		
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
	
	buffer += "]";
	
	fs.writeFileSync(outFile, buffer);
	
	console.log("-----COMPLETE-----");
	console.log("parsed json saved to: " + outFile);
}

parser(inputFile, key, cols, outputFile);
