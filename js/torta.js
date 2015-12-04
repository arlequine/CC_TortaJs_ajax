$(document).ready(function() {

	$("#button").on("click",function(evento){

    evento.preventDefault();
 //   var url = "http:///Users/codea_mac_06/Dropbox/Aliada/Alfredo/torteria_JS/tortas/tortas.html";
      var url = window.location.pathname; 
    $.post(url,function(){
        baked_minutes = 0;
        var tortero = CookingTorta.init();
        var tortas_box = [];
        var burned_tortas = 0;
        var almost_ready = 0;
        var raw = 0;
        while (tortero.anyTortas() == false) {
          tortero.incrementTime();
        }
        $("#message").text(tortero.incrementTime());
        while (tortero.timeOut() == false) {
          var minutes = Math.round(Math.random(10) * 10);
          tortero.increaseBakedMinutes(minutes);
          while (tortero.anyTortas() == true){
            var torta = tortero.pickAnTorta();
            if (torta.burned() === "burned"){
            	burned_tortas += 1;
            }else if (torta.burned() === "listo"){
            	tortas_box.push(torta);
            }else if (torta.burned() === "casi listo"){
            	almost_ready += 1;
            }else{
              raw += 1;
            }
          }
          $("#hours").text(tortero.incrementTime());
          //$("#minutes").text(minutes);
          // $("#box").text(tortas_box);
          $("#almost").text(almost_ready);
          $("#raw").text(raw);
          $("#box").text(tortas_box.length);
          $("total").text(tortas_box.length  + almost_ready + raw);
        }
     });
  }); 
});


var Torta = {
	init: function(){
		self = this;
		return self;
  },
 
	burned: function() {
		  self.estado = "";

	    if (baked_minutes > 10) {
	    	return self.estado = "burned";
	    }else if (baked_minutes >= 8){
	      return self.estado = "listo";
	    }else if (baked_minutes >= 5){
	      return self.estado = "casi listo";
	    }else{
	    	return self.estado = "crudo";
	    }

	},
};

var CookingTorta = {
  init: function(){
    self = this;
    self.tiempo = 0;
    self.tortas = [];
    return self;
  },

  incrementTime: function() {
    this.tiempo += 1;
    if (this.tiempo > 4){
    	for(var i= 0; i<5; i++){
		    var new_torta = Torta.init();
		    this.tortas.push(new_torta);
		    console.log(this.tortas);
    	}
    }
    return this.tiempo;
  },

  anyTortas: function(){
  	// console.log(self.tortas);
    if (this.tortas.length > 0){
    	return true;
    }else {
    	return false;
    }
  },

  pickAnTorta: function(){
  	if (this.anyTortas() == false){
      alert("The tortero has not cooked any tortas");
  	}else{
  		return this.tortas.pop();
  	}
  },

  timeOut: function(){
    if (this.tiempo >= 11){
    	return true;
    }else{
    	return false;
    }
  },

  increaseBakedMinutes: function(minutes){
    baked_minutes = baked_minutes + minutes;
  },

};


 