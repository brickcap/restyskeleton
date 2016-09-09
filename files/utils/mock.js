var request = require("request");
var dummy = require("dummy-json");

var args = process.argv[2];

var helpers = {
    user_index:function(options){
	return 'user'+ (1000+parseInt(options.data.index)).toString();
    },
    date:function(options){
	return Date.now();
    }
};

var rent_contract_template = 
    ' {"docs": [{{#repeat 100}} { "tname" : "{{firstName}} {{lastName}}", "rent": {{number 100 10000}},"llord":"{{ user_index}}","curr":"$","day":{{number 1 31}},"reminder":"hello world"} {{/repeat}}]}';

var rent_due_template = 
    ' {"docs": [{{#repeat 100}} { "tname" : "{{firstName}} {{lastName}}","temail":"{{email}}", "rent": {{number 100 10000}},"llord":"{{ user_index}}","curr":"$","date":{{date}},"paid":{{boolean}} } {{/repeat}}]}';


if(args==="usr"){
    //code to add mock users
}

if(args=="data"){
    var result_rent_cotnract = dummy.parse(rent_contract_template, {helpers: helpers});
    var result_due_rent = dummy.parse(rent_due_template, {helpers: helpers});
    var docs = JSON.parse(result_rent_cotnract).docs.concat(JSON.parse(result_due_rent).docs);
    var options = {
	url: "http://localhost:5984/wrinq/_bulk_docs",
	json : {"docs":docs}
    };
    request.post(options,function(error,response,data){
	console.log(data);
    });
}
