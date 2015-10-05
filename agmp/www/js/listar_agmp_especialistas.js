var serviceURL = "http://www.agmp.org.br/services/";

var blog;
var element;
	$('#blogListPage').bind('pageinit', function(event) {
		getblogList();
	});

	
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};



function getblogList() {
	var id = getUrlVars()["id"];
	function success(pos) {
		$.getJSON(serviceURL + 'listar_agmp_convenios.php?id='+id+'&location='+pos.coords.latitude+','+pos.coords.longitude, function(data) {
			$('#blogList li').remove();
			blog = data.items;
			$.each(blog, function(index, blog) {
				$('#blogList').append('<li class="ui-corner-all" style="margin: 10px 20px">' +
						'<a href="tel:' + blog.tel + '" data-role="button" data-icon="tel" class="phone_icon"></a>' +
						'<img src="http://www.agmp.org.br/upload/' + blog.logo + '" class="logo_lado"><h4>' + blog.nome + '</h4>' +
						'<p><strong>Telefone</strong>: ' + blog.tel + '</p>' +
						'<p><strong>Endereço</strong>: ' + blog.endereco + '<br>' + blog.objeto + '</p>' +
						'<a href="https://www.google.com.br/maps/search/' + blog.nome + '" class="phone_endereco" target="_blank"></a>' +
						'</li>' +
						'');
			});
		
			$('#blogList').listview('refresh');
	
	});
	}
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
navigator.geolocation.getCurrentPosition(success, error, options);
}



function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
