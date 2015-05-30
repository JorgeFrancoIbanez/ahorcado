

var Contactos = {
			$index: window.localStorage.getItem("Contactos:index"),
			$table: document.getElementById("tabla"),
			$form: document.getElementById("form"),
			$button_save: document.getElementById("guardar"),
			$button_discard: document.getElementById("borrar"),

			init: function() {
				// Inicializa storage index
				if (!Contactos.index) {
					window.localStorage.setItem("Contactos:index", Contactos.index = 1);
				}

				// Inicializa el formulario (lo deja en blanco
				Contactos.$form.reset();
				Contactos.$button_discard.addEventListener("click", function(event) {
					Contactos.$form.reset();
					Contactos.$form.id_entry.value = 0;
				}, true);
				
                Contactos.$form.addEventListener("submit", function(event) {
					var entry = {
						id: parseInt(this.id_entry.value),
						first_name: this.first_name.value,
						last_name: this.last_name.value,
						email: this.email.value
					};
					if (entry.id == 0) { // add
						Contactos.storeAdd(entry);
						Contactos.tableAdd(entry);
					}
					else { // edit
						Contactos.storeEdit(entry);
						Contactos.tableEdit(entry);
					}

					this.reset();
					this.id_entry.value = 0;
					event.preventDefault();
				}, true);

				// initialize table
				if (window.localStorage.length - 1) { //comprueba que haya valor en el local storage entre 0 y localstorage.length-1
					var Contactos_list = [], i, key;
					for (i = 0; i < window.localStorage.length; i++) {
						key = window.localStorage.key(i); //almacena la llave(key o index) en la pocision del local storage
						if (/Contactos:\d+/.test(key)) { //comprueba que la key obtenida comience con "Contactos" y termine con un caracter numero
							Contactos_list.push(JSON.parse(window.localStorage.getItem(key))); //jala la informacion en esa posicion
						}
					}

					if (Contactos_list.length) {
						Contactos_list
							.sort(function(a, b) {
								return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
							})
							.forEach(Contactos.tableAdd);
					}
				}
                
                
				Contactos.$table.addEventListener("click", function(event) {
					var op = event.target.getAttribute("data-op");
					if (/Editar|Eliminar|MAP/.test(op)) {
						var entry = JSON.parse(window.localStorage.getItem("Contactos:"+ event.target.getAttribute("data-id")));
						if (op == "Editar") {
							Contactos.$form.first_name.value = entry.first_name;
							Contactos.$form.last_name.value = entry.last_name;
							Contactos.$form.email.value = entry.email;
							Contactos.$form.id_entry.value = entry.id;
						}
						if (op == "Eliminar") {
							if (confirm('¿Seguro quieres eliminar este registro "'+ entry.first_name +' '+ entry.last_name +'" de tus  Contactos?')) {
								Contactos.storeRemove(entry);
								Contactos.tableRemove(entry);
							}
						}

                        if (op=="MAP") {
                            
                            Contactos.mapa();
                            
                        }
                            
						event.preventDefault();
					}
				}, true);
			},
    
    //mapa
            mapa: function(){

                            function getLocation() {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                                } else {
                                    x.innerHTML = "Geolocation is not supported by this browser.";
                                }
                            }

                            function showPosition(position) {
                                var latlon = position.coords.latitude + "," + position.coords.longitude;

                                var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
                                +latlon+"&zoom=14&size=400x300&sensor=false";
                                document.getElementById("mapholder").innerHTML = '<img class="span4" src="'+img_url+'">';
                            }

                            function showError(error) {
                                switch(error.code) {
                                    case error.PERMISSION_DENIED:
                                        x.innerHTML = "Usuario nego la peticion para la Geolocation."
                                        break;
                                    case error.POSITION_UNAVAILABLE:
                                        x.innerHTML = "La informacion de la geolocalizacion es inaccesible."
                                        break;
                                    case error.TIMEOUT:
                                        x.innerHTML = "Se vencio el tiempo de la peticion."
                                        break;
                                    case error.UNKNOWN_ERROR:
                                        x.innerHTML = "Error Desconocido ocurrio."
                                        break;
                                }
                            } 
                getLocation();
            }, 
			storeAdd: function(entry) {
				entry.id = Contactos.index;
				window.localStorage.setItem("Contactos:index", ++Contactos.index);  //valor y llave
				window.localStorage.setItem("Contactos:"+ entry.id, JSON.stringify(entry)); 
			},
			storeEdit: function(entry) {
				window.localStorage.setItem("Contactos:"+ entry.id, JSON.stringify(entry));
			},
			storeRemove: function(entry) {
				window.localStorage.removeItem("Contactos:"+ entry.id);
			},

			
    
            tableAdd: function(entry) {
				var $tr = document.createElement("tr"), $td, key;
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}
				}

                $td = document.createElement("td");
				$td.innerHTML = '<a data-op="MAP" data-id="'+ entry.id +'">MAP</a> | <a data-op="Editar" data-id="'+ entry.id +'">Editar</a> | <a data-op="Eliminar" data-id="'+ entry.id +'">Eliminar</a>';
				$tr.appendChild($td);
				$tr.setAttribute("id", "entry-"+ entry.id);
				Contactos.$table.appendChild($tr);
			},

    
    
            tableEdit: function(entry) {
				var $tr = document.getElementById("entry-"+ entry.id), $td, key;
				$tr.innerHTML = "";
				for (key in entry) {
					if (entry.hasOwnProperty(key)) {
						$td = document.createElement("td");
						$td.appendChild(document.createTextNode(entry[key]));
						$tr.appendChild($td);
					}
				}
				$td = document.createElement("td");
				$td.innerHTML = '<a data-op="MAP" data-id="'+ entry.id +'">MAP</a> | <a data-op="Editar" data-id="'+ entry.id +'">Editar</a> | <a data-op="Eliminar" data-id="'+ entry.id +'">Eliminar</a>';
				$tr.appendChild($td);
			},
			tableRemove: function(entry) {
				Contactos.$table.removeChild(document.getElementById("entry-"+ entry.id));
			}
		};
		Contactos.init();