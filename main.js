/* ======================== BREAKPOINT ========================  */
let breakPointUno = () =>
	parseInt(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--breakpoints-uno"
		)
	); /* 1300 */

let breakPointDos = () =>
	parseInt(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--breakpoints-dos"
		)
	); /* 850 */

/* ======================== CLARO - OSCURO ========================  */
const btn_oscuro = document.getElementById("nav-button-lightDark");

btn_oscuro.addEventListener("click", () => {
	if (btn_oscuro.textContent.trim() === "Modo Claro") {
		document.documentElement.setAttribute("data-theme-color", "light");
		btn_oscuro.innerHTML = `<i class="fa fa-moon-o" aria-hidden="true"></i> Modo Oscuro`;
	} else {
		document.documentElement.setAttribute("data-theme-color", "dark");
		btn_oscuro.innerHTML = `<i class="fa fa-sun-o"></i> Modo Claro`;
	}
});

/* ======================== Alto del main container========================  */
function adjustMainContainerHeight() {
	if (window.innerWidth <= breakPointDos()) {
		let element = document.getElementById("header-container");
		let compStyles = window.getComputedStyle(element);
		let height = compStyles.getPropertyValue("height");
		let containerHeight = window.visualViewport.height - parseInt(height);

		document.getElementById(
			"main-container"
		).style.minHeight = `${containerHeight}px`;
	}
}

/*======================== TAMAÑO DE LA CAJITA DEL MEME ======================== */
const cajita_del_meme = document.getElementById("image-text-container");
const cajita_txt_sup = document.getElementById("text-top");
const cajita_txt_inf = document.getElementById("text-lower");
const cajita_margin = 40; /* para que no quede muy pegado al borde (der e izq) de la ventana */

const getFontSizeCajitaMeme = () =>
	parseInt(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--cajita_meme-tm-inicial-txt"
		)
	);

const getTamanioMaximoCajitaMeme = () =>
	parseInt(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--cajita_meme-tm-maximo"
		)
	);

window.visualViewport.addEventListener("resize", () => {
	if (window.innerWidth <= 600 + cajita_margin) {
		const tm_ancho = window.visualViewport.width - cajita_margin;
		const tm_txt = Math.ceil(
			(window.innerWidth - cajita_margin) / 10 - 10
		); /*inicialmente da 60, es muy grande por eso le quito 10*/

		cajita_del_meme.style.width = `${tm_ancho}px`;
		cajita_del_meme.style.height = `${tm_ancho}px`;

		cajita_txt_sup.style.fontSize = `${tm_txt}px`;
		cajita_txt_inf.style.fontSize = `${tm_txt}px`;
	} else {
		cajita_del_meme.style.height = getFontSizeCajitaMeme();
		cajita_del_meme.style.width = getFontSizeCajitaMeme();

		cajita_txt_sup.style.fontSize = getTamanioMaximoCajitaMeme();
		cajita_txt_inf.style.fontSize = getTamanioMaximoCajitaMeme();
	}
	adjustMainContainerHeight(); /*Calcula el alto del contenedor-ppal, según el alto de la Ventaga Gráfica*/
});

/* ========== Eventos de los BOTONES de IMG Y TXT  (hacer aparecer un PANEL u otro) ======================== */
const ir_arriba = document.getElementById("ir-arriba");
const ir_abajo = document.getElementById("ir-abajo");

const imagePanel = document.getElementById("image-panel");
const textPanel = document.getElementById("text-panel");
const panelContainer = document.getElementById("panel-container");

function mostrarPanelImagen() {
	imagePanel.classList.remove("hide");
	panelContainer.classList.remove("hide");
	textPanel.classList.add("hide");
}

function mostrarPanelImagen1300() {
	/*Carga pg x 1ra vez, y está a más de 1300px, carga panel de IMG*/

	document
		.getElementById("nav-button-img")
		.focus(); /* carga la pg, y el focus lo tiene el btn imagen*/
	if (
		window.innerWidth >= breakPointUno() &&
		panelContainer.classList.contains("hide")
	) {
		mostrarPanelImagen();
	}
}

window.visualViewport.addEventListener("resize", () => {
	/* Cuando se agranda la ventana a más de 1300, debe conservar 
                                                            lo que estaba seleccionado, o mostrar Panel Imagen, por defecto */
	if (
		window.innerWidth >= breakPointUno() &&
		panelContainer.classList.contains("hide")
	) {
		mostrarPanelImagen();
	}

	if (
		window.innerWidth <= breakPointDos() &&
		!panelContainer.classList.contains("hide")
	) {
		ir_arriba.classList.remove("hide");
		ir_abajo.classList.remove("hide");
	}
});

document.getElementById("nav-button-img").addEventListener("click", (e) => {
	textPanel.classList.add("hide");
	imagePanel.classList.remove("hide");
	panelContainer.classList.remove("hide");

	upload_url_input.classList.add(
		"hide"
	); /* Siempre que cargue IMG, deben estar ocultos*/
	subir_pc_input.classList.add("hide");

	if (
		window.innerWidth <= breakPointDos() &&
		!panelContainer.classList.contains("hide")
	) {
		ir_arriba.classList.remove("hide");
		ir_abajo.classList.remove("hide");
	}
});

document.getElementById("nav-button-text").addEventListener("click", (e) => {
	imagePanel.classList.add("hide");
	textPanel.classList.remove("hide");
	panelContainer.classList.remove("hide");

	if (
		window.innerWidth <= breakPointDos() &&
		!panelContainer.classList.contains("hide")
	) {
		ir_arriba.classList.remove("hide");
		ir_abajo.classList.remove("hide");
	}
});

document.getElementById("panel-close-btn").addEventListener("click", (e) => {
	imagePanel.classList.add("hide");
	textPanel.classList.add("hide");
	panelContainer.classList.add("hide");

	if (window.innerWidth <= breakPointDos()) {
		ir_arriba.classList.add("ocultar");
		ir_abajo.classList.add("ocultar");
	}
});

/* ================================================================================================ */
/*                                       PANEL DE IMAGEN                                            */
/* ================================================================================================ */

/* ======================== Seleccionar origen de la imagen URL / PC ======================== */
const uploadUrlBtn = document.getElementById("upload-url-btn");
const subir_pc_btn = document.getElementById("subir-pc-btn");

const upload_url_input = document.getElementById("upload-url-input");
const subir_pc_input = document.getElementById("subir-pc-input");

function esMovil() {
	return (
		navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/webOs/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i)
	);
}
function dispositivoMovil() {
	/* Si es celu, cambia el icono de subir img por Desktop a Mobile*/
	if (esMovil()) {
		subir_pc_btn.innerHTML = `<i class="fa-solid fa-mobile-screen-button"></i>  Móvil`;
	}
}

uploadUrlBtn.addEventListener("click", () => {
	upload_url_input.classList.remove("hide");
	subir_pc_input.classList.add("hide");
});
subir_pc_btn.addEventListener("click", () => {
	subir_pc_input.classList.remove("hide");
	upload_url_input.classList.add("hide");
});

/* Si la imagen es por URL*/
const main_img =
	document.getElementById(
		"main-img"
	); /* cajita DIV donde va a ir la img como background*/

function formatearImg() {
	main_img.style.backgroundSize = `cover`; /* cover/contain/100%/auto 100%/*/
	main_img.style.backgroundRepeat = `no-repeat`;
	main_img.style.backgroundPosition = `center center`;
}

upload_url_input.addEventListener("input", (e) => {
	main_img.style.backgroundImage = `url("${e.target.value}")`;
	formatearImg();
});

/* Si la imagen es por PC*/
const input_file = document.getElementById("input-file");
input_file.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			main_img.style.backgroundImage = `url("${e.target.result}")`;
			formatearImg();
		};
		reader.readAsDataURL(file);
	}
});

// Funciona el ENTER en input-file
document.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		if (event.target.htmlFor === "input-file") {
			input_file.click();
		}
	}
});

/* ======================== Seleccionar color de FONDO img,  y BLEND MODE (se aplica al background) ======================== */
const input_color = document.getElementById("input-color"); //input que selecciona color
const blendMode = document.getElementById("blendMode");

input_color.addEventListener("input", (e) => {
	main_img.style.backgroundColor = `${e.target.value}`;
});

blendMode.addEventListener("input", (e) => {
	main_img.style.backgroundBlendMode = `${e.target.value}`;
});

/* ======================== apply reset filters ======================== */
const resetFilters = document.getElementById(
	"reset-filters"
);
const brillo = document.getElementById("brillo");
const opacidad = document.getElementById("opacidad");
const contraste = document.getElementById("contraste");
const desenfoque = document.getElementById("desenfoque");
const grises = document.getElementById("grises");
const sepia = document.getElementById("sepia");
const hueR = document.getElementById("hue");
const saturacion = document.getElementById("saturacion");
const invertido = document.getElementById("invertido");

brillo.addEventListener("input", obtenerValorFiltros);
opacidad.addEventListener("input", obtenerValorFiltros);
contraste.addEventListener("input", obtenerValorFiltros);
desenfoque.addEventListener("input", obtenerValorFiltros);
grises.addEventListener("input", obtenerValorFiltros);
sepia.addEventListener("input", obtenerValorFiltros);
hueR.addEventListener("input", obtenerValorFiltros);
saturacion.addEventListener("input", obtenerValorFiltros);
invertido.addEventListener("input", obtenerValorFiltros);

resetFilters.addEventListener("click", () => {
	filtrarImg(1, 1, 100, 0, 0, 0, 0, 100, 0);
});

function obtenerValorFiltros() {
	filtrarImg(
		brillo.value,
		opacidad.value,
		contraste.value,
		desenfoque.value,
		grises.value,
		sepia.value,
		hueR.value,
		saturacion.value,
		invertido.value
	);
}

function filtrarImg(bri, opa, con, blu, gri, sep, hue, sat, inv) {
	brillo.value = `${bri}`;
	opacidad.value = `${opa}`;
	contraste.value = `${con}`;
	desenfoque.value = `${blu}`;
	grises.value = `${gri}`;
	sepia.value = `${sep}`;
	hueR.value = `${hue}`;
	saturacion.value = `${sat}`;
	invertido.value = `${inv}`;
	main_img.style.filter = `brightness(${bri}) opacity(${opa}) contrast(${con}%) blur(${blu}px) grayscale(${gri}%) sepia(${sep}%) hue-rotate(${hue}deg) saturate(${sat}%) invert(${inv})`;
	mostarValorFiltros();
}

/* ::::::::::::::::::::::::::: Valores de los filtros ::::::::::::::::::::::::::: */
function mostarValorFiltros() {
	const label_bri = document.querySelector('label[for="brillo"]');
	const label_opa = document.querySelector('label[for="opacidad"]');
	const label_con = document.querySelector('label[for="contraste"]');
	const label_des = document.querySelector('label[for="desenfoque"]');
	const label_gri = document.querySelector('label[for="grises"]');
	const label_sep = document.querySelector('label[for="sepia"]');
	const label_hue = document.querySelector('label[for="hue"]');
	const label_sat = document.querySelector('label[for="saturacion"]');
	const label_inv = document.querySelector('label[for="invertido"]');

	label_bri.innerHTML = `BRILLO [${brillo.value * 100}%]`;
	label_opa.innerHTML = `OPACIDAD [${opacidad.value * 100}%]`;
	label_con.innerHTML = `CONTRASTE [${contraste.value}%]`;
	label_des.innerHTML = `DESENFOQUE [${desenfoque.value}px]`;
	label_gri.innerHTML = `ESCALA DE GRISES [${grises.value}%]`;
	label_sep.innerHTML = `SEPIA [${sepia.value}%]`;
	label_hue.innerHTML = `ROTACIÓN DE COLOR [${hueR.value}deg]`;
	label_sat.innerHTML = `SATURACIÓN [${saturacion.value}%]`;
	label_inv.innerHTML = `INVERTIDO [${invertido.value * 100}%]`;
}

/* ================================================================================================ */
/*                                       PANEL DE TEXTO                                             */
/* ================================================================================================ */

/* ======================== Aplicar TXT superior y/o inferior ======================== */
const inputTextTop = document.getElementById("input-text-top");
const mainTextTop = document.getElementById("text-top");
inputTextTop.addEventListener("input", (e) => {
	mainTextTop.textContent = inputTextTop.value;
	mainTextTop.textContent = mainTextTop.textContent.toUpperCase();
});

const inputTextLower = document.getElementById("input-text-lower");
const mainTextLower = document.getElementById("text-lower");
inputTextLower.addEventListener("input", (e) => {
	mainTextLower.textContent = inputTextLower.value;
	mainTextLower.textContent = mainTextLower.textContent.toUpperCase();
});

const hideTextTopCheckbox = document.getElementById("hide-text-top");
hideTextTopCheckbox.addEventListener("click", () => {
	mainTextTop.classList.toggle("hide");
});

const hideTextLowerCheckbox = document.getElementById("hide-text-lower");
hideTextLowerCheckbox.addEventListener("click", () => {
	mainTextLower.classList.toggle("hide");
});

/* ======================== Fuente - Tamaño - Alineación ======================== */
const fontSelection = document.getElementById("font-selection");
function cargarFuentes() {
	var font = "";

	let array = [
		{ familia: "'Anton',  sans-serif", fuente: "Anton" },
		{ familia: "'Amaranth', sans-serif", fuente: "Amaranth" },
		{ familia: "'BlackOpsOne', sans-serif", fuente: "BlackOpsOne" },
		{ familia: "'DancingScript', sans-serif", fuente: "DancingScript" },
		{ familia: "'Dokdo', sans-serif", fuente: "Dokdo" },
		{ familia: "'Honk', sans-serif", fuente: "Honk" },
		{ familia: "'Luckiest Guy', sans-serif", fuente: "Luckiest Guya" },
		{ familia: "'OldStandardTT', serif", fuente: "OldStandardTT" },
		{ familia: "'Pacifico', cursive", fuente: "Pacifico" },
		{ familia: "'RammettoOne', sans-serif", fuente: "RammettoOne" },
		{ familia: "'SongMyung', serif", fuente: "SongMyung" },
		{ familia: "'SpecialElite', serif", fuente: "SpecialElite" },
		{ familia: "'Teko', sans-serif", fuente: "Teko" },
		{ familia: "'Ultra', serif", fuente: "Ultra" },
	];

	for (var i = 0; i < array.length; i++) {
		font +=
			`<option value="` +
			array[i].familia +
			`">` +
			array[i].fuente +
			`</option>`;
	}
	fontSelection.innerHTML = font;
}

fontSelection.addEventListener("input", () => {
	/*estaba change y no tomaba*/
	mainTextTop.style.fontFamily = fontSelection.value;
	mainTextLower.style.fontFamily = fontSelection.value;
});

const memeTextSize = document.getElementById("meme-text-size");
memeTextSize.addEventListener("input", () => {
	mainTextTop.style.fontSize = `${memeTextSize.value}px`;
	mainTextLower.style.fontSize = `${memeTextSize.value}px`;
});

document.getElementById("btn-align-left").addEventListener("click", () => {
	mainTextTop.style.textAlign = "left";
	mainTextLower.style.textAlign = "left";
});

document.getElementById("btn-align-center").addEventListener("click", () => {
	mainTextTop.style.textAlign = "center";
	mainTextLower.style.textAlign = "center";
});

document.getElementById("btn-align-right").addEventListener("click", () => {
	mainTextTop.style.textAlign = "right";
	mainTextLower.style.textAlign = "right";
});

/* ======================== Color de la fuente, color de fondo, y fondo transparente ======================== */
const inputTextColor = document.getElementById("input-text-color");
const inputFontColor = document.getElementById("input-font-color");
const transBg = document.getElementById("transBg");

inputTextColor.addEventListener("input", () => {
	mainTextTop.style.color = `${inputTextColor.value}`;
	mainTextLower.style.color = `${inputTextColor.value}`;
});

inputFontColor.addEventListener("input", () => {
	if (transBg.checked) {
		mainTextTop.style.backgroundColor = `transparent`;
		mainTextLower.style.backgroundColor = `transparent`;
	} else {
		mainTextTop.style.backgroundColor = `${inputFontColor.value}`;
		mainTextLower.style.backgroundColor = `${inputFontColor.value}`;
	}
});

transBg.addEventListener("click", () => {
	if (transBg.checked) {
		mainTextTop.style.backgroundColor = `transparent`;
		mainTextLower.style.backgroundColor = `transparent`;

		mainTextTop.style.position = `absolute`;
		mainTextLower.style.position = `absolute`;
	} else {
		mainTextTop.style.backgroundColor = `${inputFontColor.value}`;
		mainTextLower.style.backgroundColor = `${inputFontColor.value}`;

		mainTextTop.style.position = `static`;
		mainTextLower.style.position = `static`;
	}
});

/* ======================== Contorno de la fuente ======================== */
const outlineLessBtn = document.getElementById("outlineLessBtn");
const outlineLightBtn = document.getElementById("outlineLightBtn");
const outlineDarkBtn = document.getElementById("outlineDarkBtn");

outlineLessBtn.addEventListener("click", () => {
	mainTextTop.style.textShadow = `none`;
	mainTextLower.style.textShadow = `none`;
});

outlineLightBtn.addEventListener("click", () => {
	/* desplazamiento hor (X-offset), el desplazamiento vert (Y-offset), el desenfoque (blur) y el color (color*/
	mainTextTop.style.textShadow = `2px  0px 0px white, 
                                         -2px  0px 0px white,
                                          0px  2px 0px white,
                                          0px -2px 0px white`;
	mainTextLower.style.textShadow = `2px  0px 0px white, 
                                          -2px  0px 0px white,
                                           0px  2px 0px white,
                                           0px -2px 0px white`;
});

outlineDarkBtn.addEventListener("click", () => {
	/* desplazamiento hor (X-offset), el desplazamiento vert (Y-offset), el desenfoque (blur) y el color (color*/
	mainTextTop.style.textShadow = `2px  0px 0px black, 
                                         -2px  0px 0px black,
                                          0px  2px 0px black,
                                          0px -2px 0px black`;
	mainTextLower.style.textShadow = `2px  0px 0px black, 
                                          -2px  0px 0px black,
                                           0px  2px 0px black,
                                           0px -2px 0px black`;
});

/* ======================== Espaciado e Interlineado ======================== */
const espaciado_txt_meme = document.getElementById("espaciado-txt-meme");
const interlineado_txt_meme = document.getElementById("interlineado-txt-meme");

espaciado_txt_meme.addEventListener("input", () => {
	mainTextTop.style.padding = `${espaciado_txt_meme.value}px 20px`;
	mainTextLower.style.padding = `${espaciado_txt_meme.value}px 20px`;
});

interlineado_txt_meme.addEventListener("change", () => {
	mainTextTop.style.lineHeight = `${interlineado_txt_meme.value}`;
	mainTextLower.style.lineHeight = `${interlineado_txt_meme.value}`;
});

/* ================================================================================================*/
/* ------------ BOTON descargar MEME como IMG ---------------- */
const div_img_txt = document.getElementById("image-text-container");
const meme_download_btn = document.getElementById("meme-download-btn");
meme_download_btn.addEventListener("click", () => {
	domtoimage.toBlob(div_img_txt).then((blob) => {
		window.saveAs(blob, "meme.png");
	});
});

/* ================================================================================================*/

function initializePageFunctions() {
	mostrarPanelImagen1300(); /* El Panel de IMG debe ser VISIBLE, si la ventana está a mas de 1300px*/
	dispositivoMovil(); /* Carga la pg, y es un celu? */
	cargarFuentes(); /* Para el panel de TXT */
	//altoContenedorPpal();     /*Calcula el alto del contenedor-ppal, según el alto de la Ventaga Gráfica*/
	mostarValorFiltros();
}

/* Cuando se termina de cargar la página  */
window.onload = initializePageFunctions;
