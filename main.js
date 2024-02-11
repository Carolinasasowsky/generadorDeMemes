/* :::::::::::::::::::::::::::::::::::::::::::: BREAKPOINT ::::::::::::::::::::::::::::::::::::::::::::  */
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

/* ::::::::::::::::::::::::::::::::::::::::::::  dark / light :::::::::::::::::::::::::::::::::::::::::::::::   */
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

/* :::::::::::::::::::::::::::::::::::::::  height main container:::::::::::::::::::::::::::::::::::::::   */
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

/*:::::::::::::::::::::::::::::::::::::::  box size meme :::::::::::::::::::::::::::::::::::::::  */
const boxTextMeme = document.getElementById("image-text-container");
const boxTextTop = document.getElementById("text-top");
const boxTextLower = document.getElementById("text-lower");
const marginBox = 40; 

const getMemeBoxFontSize = () =>
	parseInt(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--cajita_meme-tm-inicial-txt"
		)
	);

const getMaxMemeBoxSize = () =>
	parseInt(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--max_meme_box_width"
		)
	);

window.visualViewport.addEventListener("resize", () => {
	if (window.innerWidth <= 600 + marginBox) {
		const tm_ancho = window.visualViewport.width - marginBox;
		const tm_txt = Math.ceil(
			(window.innerWidth - marginBox) / 10 - 10
		); /*inicialmente da 60, es muy grande por eso le quito 10*/

		boxTextMeme.style.width = `${tm_ancho}px`;
		boxTextMeme.style.height = `${tm_ancho}px`;

		boxTextTop.style.fontSize = `${tm_txt}px`;
		boxTextLower.style.fontSize = `${tm_txt}px`;
	} else {
		boxTextMeme.style.height = getMemeBoxFontSize();
		boxTextMeme.style.width = getMemeBoxFontSize();

		boxTextTop.style.fontSize = getMaxMemeBoxSize();
		boxTextLower.style.fontSize = getMaxMemeBoxSize();
	}
	adjustMainContainerHeight();
});

/* ========== Button events for image and text toggling between panels ================ */

const imagePanel = document.getElementById("image-panel");
const textPanel = document.getElementById("text-panel");
const panelContainer = document.getElementById("panel-container");

function mostrarPanelImagen() {
	imagePanel.classList.remove("hide");
	panelContainer.classList.remove("hide");
	textPanel.classList.add("hide");
}

function mostrarPanelImagen1300() {
	document.getElementById("nav-button-img");

	if (
		window.innerWidth >= breakPointUno() &&
		panelContainer.classList.contains("hide")
	) {
		mostrarPanelImagen();
	}
}

window.visualViewport.addEventListener("resize", () => {
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
		scrollToTop.classList.remove("hide");
		scrollDown.classList.remove("hide");
	}
});

document.getElementById("nav-button-img").addEventListener("click", (e) => {
	textPanel.classList.add("hide");
	imagePanel.classList.remove("hide");
	panelContainer.classList.remove("hide");

	uploadUrlInput.classList.add("hide");
	upPcInput.classList.add("hide");

	if (
		window.innerWidth <= breakPointDos() &&
		!panelContainer.classList.contains("hide")
	) {
		scrollToTop.classList.remove("hide");
		scrollDown.classList.remove("hide");
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
		scrollToTop.classList.remove("hide");
		scrollDown.classList.remove("hide");
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

/* ============================================================== */
/*             ******************** IMAGE PANEL  ********************                    */
/* ============================================================== */

/* :::::::::::::::::::::::::::::::::::: selection image source: URL/PC :::::::::::::::::::::::::::::::::::: */
const uploadUrlBtn = document.getElementById("upload-url-btn");
const upPcBtn = document.getElementById("up-pc-btn");

const uploadUrlInput = document.getElementById("upload-url-input");
const upPcInput = document.getElementById("up-pc-input");

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
	if (esMovil()) {
		upPcBtn.innerHTML = `<i class="fa-solid fa-mobile-screen-button"></i>  Móvil`;
	}
}

uploadUrlBtn.addEventListener("click", () => {
	uploadUrlInput.classList.remove("hide");
	upPcInput.classList.add("hide");
});
upPcBtn.addEventListener("click", () => {
	upPcInput.classList.remove("hide");
	uploadUrlInput.classList.add("hide");
});

/* image URL*/
const main_img =
	document.getElementById(
		"main-img"
	); 

function formatearImg() {
	main_img.style.backgroundSize = `cover`;
	main_img.style.backgroundRepeat = `no-repeat`;
	main_img.style.backgroundPosition = `center center`;
}

uploadUrlInput.addEventListener("input", (e) => {
	main_img.style.backgroundImage = `url("${e.target.value}")`;
	formatearImg();
});

/* image PC*/
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

document.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		if (event.target.htmlFor === "input-file") {
			input_file.click();
		}
	}
});

/* :::::::::::::::::::::::::::::::::::: choose image background color and Blend Mode ::::::::::::::::::::::::::::::::::::*/
const inputColor = document.getElementById("input-color"); 
const blendMode = document.getElementById("blendMode");

inputColor.addEventListener("input", (e) => {
	main_img.style.backgroundColor = `${e.target.value}`;
});

blendMode.addEventListener("input", (e) => {
	main_img.style.backgroundBlendMode = `${e.target.value}`;
});

/* :::::::::::::::::::::::::::::::::::: apply reset filters :::::::::::::::::::::::::::::::::::: */
const resetFilters = document.getElementById("reset-filters");
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

/* :::::::::::::::::::::::::::::::::::: filter values :::::::::::::::::::::::::::::::::::: */
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

/* ============================================================== */
/*                ****************** TEXT PANEL ******************                           */
/* ============================================================== */

/* :::::::::::::::::::::::::::::::: apply text top/lower :::::::::::::::::::::::::::::::: */

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

/* :::::::::::::::::::::::::::::::: Font / Size / Alignment :::::::::::::::::::::::::::::::: */
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
	//se agregó una clase para indicar que se está cargando una nueva tipografí
	mainTextTop.classList.add("loading-font");
	mainTextLower.classList.add("loading-font");

	//cambiar la tipografía
	mainTextTop.style.fontFamily = fontSelection.value;
	mainTextLower.style.fontFamily = fontSelection.value;

	// Esperar a que la tipografía se cargue antes de eliminar la clase
		mainTextTop.onload = mainTextLower.onload = function () {
		mainTextTop.classList.remove("loading-font");
		mainTextLower.classList.remove("loading-font");
	};
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

/* :::::::::::::::::::::::::::::::: color font / bg color / bg transparent :::::::::::::::::::::::::::::::: */
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

/* :::::::::::::::::::::::::::::::::::::: outline font :::::::::::::::::::::::::::::::::::::::::: */
const outlineLessBtn = document.getElementById("outlineLessBtn");
const outlineLightBtn = document.getElementById("outlineLightBtn");
const outlineDarkBtn = document.getElementById("outlineDarkBtn");

outlineLessBtn.addEventListener("click", () => {
	mainTextTop.style.textShadow = `none`;
	mainTextLower.style.textShadow = `none`;
});

outlineLightBtn.addEventListener("click", () => {
	
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
	
	mainTextTop.style.textShadow = `2px  0px 0px black, 
                                         -2px  0px 0px black,
                                          0px  2px 0px black,
                                          0px -2px 0px black`;
	mainTextLower.style.textShadow = `2px  0px 0px black, 
                                          -2px  0px 0px black,
                                           0px  2px 0px black,
                                           0px -2px 0px black`;
});

/* ::::::::::::::::::::::::::::::::::::::::::: line spacing  :::::::::::::::::::::::::::::::::::::::::::: */
const spacingTextMeme = document.getElementById("spacing-text-meme");
const lineTextMeme = document.getElementById("line-text-meme");

spacingTextMeme.addEventListener("input", () => {
	mainTextTop.style.padding = `${spacingTextMeme.value}px 20px`;
	mainTextLower.style.padding = `${spacingTextMeme.value}px 20px`;
});

lineTextMeme.addEventListener("change", () => {
	mainTextTop.style.lineHeight = `${lineTextMeme.value}`;
	mainTextLower.style.lineHeight = `${lineTextMeme.value}`;
});


/* ::::::::::::::::::::::::::::::::::::::: download Meme as image  :::::::::::::::::::::::::::::::: */
const div_img_txt = document.getElementById("image-text-container");
const meme_download_btn = document.getElementById("meme-download-btn");
meme_download_btn.addEventListener("click", () => {
	domtoimage.toBlob(div_img_txt).then((blob) => {
		window.saveAs(blob, "meme.png");
	});
});



function initializePageFunctions() {
	mostrarPanelImagen1300(); 
	dispositivoMovil(); 
	cargarFuentes();
	mostarValorFiltros();
}


window.onload = initializePageFunctions;
