
var has_data = false;
var data;
var has_avgs = false;

function set_data(lines) {
    data = lines;
    has_data = true;
}
    
function draw_flavor_averages_bar(flavor) {

	var avgs = [];
	
	var count = 0;
    for (var i=0; i<data.length; i++) {
	for (var j=0; j<data[i].length; j++) {
	    if (i==0) { 
	    	avgs.push(0);
	    }
	    else {
			if (j==0) {
				if(data[i][j] != flavor) {
					break;
				}
				avgs[j] = 0;
				count += 1;
			} else {
				avgs[j]+=Number(data[i][j]);
			}
	    } 
	} 
    }
    for (var j = 0; j <data[0].length; j++) {
	avgs[j] = avgs[j]/count;
	console.log(" column "+j+" Avg = "+avgs[j]); 

    }

    has_avgs = true;

    createBarVertices(avgs, flavor); 
    
}

function draw_all_flavor_bar() {

	var avgs1 = [];
	var avgs2 = [];
	var avgs3 = [];
	var curAvg;
	var count1 = 0, count2 = 0, count3 = 0;
    for (var i=0; i<data.length; i++) {
	for (var j=0; j<data[i].length; j++) {
	    if (i==0) { 
	    		avgs1.push(0);
	    		avgs2.push(0);
	    		avgs3.push(0);
	    	}
	    else {
			if (j==0) {
				if(data[i][j] == 'setosa') {
					curAvg = avgs1;
					count1 += 1;
				} else if(data[i][j] == 'versicolor') {
					curAvg = avgs2;
					count2 += 1;
				} else if(data[i][j] == 'virginica') {
					curAvg = avgs3;
					count3 += 1;
				} else {
					break;
				}
				curAvg[j] = 0;
			} else {
				curAvg[j]+=Number(data[i][j]);
			}
	    } 
	} 
    }
    for (var j = 0; j <data[0].length; j++) {
	avgs1[j] = avgs1[j]/count1;
	avgs2[j] = avgs2[j]/count2;
	avgs3[j] = avgs3[j]/count3;
    }

    has_avgs = true;

    createMutiBarVertices(avgs1, avgs2, avgs3); 
    
}
