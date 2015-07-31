// Начальные значения данных

// Координаты игрока по горизонтали
posiciaIgroka = 100;

// начальная позиция босса по горизонтали
posiciaBossa = 0;
// начальное направление босса
napravlenieBossa = 'right';

// Координаты вражеских кораблей, вначале нижний ряд, потом верхний
vragi = [{top: 150, left: 0, nomer: 1, ubit: false },
		{top: 150, left: 100, nomer: 2, ubit: false },
		{top: 150, left: 200, nomer: 3, ubit: false },
		{top: 100, left: 0, nomer: 4, ubit: false },
		{top: 100, left: 100, nomer: 5, ubit: false },
		{top: 100, left: 200, nomer: 6, ubit: false }]

// начальное направление врагов
napravlenieOtriada = 'right';
// начальная позиция отряда врагов
posiciaOtriada = 0;
//счетчик убитых врагов
ubitoVragov = 0;


// Координаты защитных ограждений
krepost1 = 100;
krepost2 = 300;
shirinaKreposti = 99;


// Запуск функции startProgram в момент после полной загрузки веб-страницы
window.onload = startProgram;


// Функции

// стартовая функция
function startProgram(){

	// при любом нажатии кнопок клавиатуры, запускаем программу keyProgram
	window.onkeydown = keyProgram;

	// расставлем по игровому полю ряды врагов
	rasstanovkaVragov();

	// запуск регулярных движений движений босса
	setInterval(moveBoss, 500);

	// запуск регулярных движений движений отряда врагов
	setInterval(moveOtriad, 2000);
}

// функция реагирует на нажатия клавиатуры
// в эту функцию автоматически передаются данные о нажатии в переменную 'e'
function keyProgram(e){

	// влево
    if (e.keyCode == 37){
    	movePlayer('left')
    }

	// вправо
    if (e.keyCode == 39){
    	movePlayer('right')
    }

	// пробел - стреляем
    if (e.keyCode == 32 || e.charCode == 32){
    	vistrel();
    }
    console.log(e)
}

// функция для перемещения игрока по полю
// принимает во внутреннюю переменную 'kuda' напрвление: left или right
function movePlayer(kuda){
	// проверяем, свободна ли ячейка для движения игрока
	if (kuda == 'left' && posiciaIgroka > 49){
		posiciaIgroka -= 50;
	}
	if (kuda == 'right' && posiciaIgroka < 449){
		posiciaIgroka += 50;
	}
	// меняем координаты у html-элемента
	document.getElementById('id_igrok').style.left = posiciaIgroka;
}

function moveBoss(){
	if(napravlenieBossa == 'right'){
		posiciaBossa+=50;
	}
	if(napravlenieBossa == 'left'){
		posiciaBossa-=50;
	}
	if(posiciaBossa > 449){
		napravlenieBossa = 'left';
	}
	if(posiciaBossa < 49){
		napravlenieBossa = 'right';
	}
	// меняем координаты у html-элемента
	document.getElementById('id_boss').style.left = posiciaBossa;
	// если координаты босса и игрока совпадают
	if(posiciaBossa == posiciaIgroka){
		// и если координаты босса меньше или (||) больше первой крепости
		if(posiciaBossa < krepost1 || posiciaBossa > (krepost1 + shirinaKreposti)){
			// и если координаты босса меньше или (||) больше  второй крепости
			if(posiciaBossa < krepost2 || posiciaBossa > (krepost2 + shirinaKreposti)){
				alert('Вы подстрелены боссом. Вашу планету теперь ничто не спасет.');
			}
		}
	}
}

function moveOtriad(){
	if(napravlenieOtriada == 'right'){
		posiciaOtriada+=50;
		moveOtriadRight();
	}
	if(napravlenieOtriada == 'left'){
		posiciaOtriada-=50;
		moveOtriadLeft();
	}
	// если отряд дошел до правой границы поля
	// меняем направление движения
	if(posiciaOtriada > 249){
		napravlenieOtriada = 'left';
		moveOtriadBottom();
	}
	// если отряд дошел до левой границы поля
	if(posiciaOtriada < 49){
		napravlenieOtriada = 'right';
		moveOtriadBottom();
	}
	proverkaPrizemleniaVragov();
}

// функция сдвига врагов влево
function moveOtriadLeft(){
	for (v in vragi) {
		vrag = vragi[v];
		vrag.left-=50;
		rasstanovkaVragov();
	};
}

// функция сдвига врагов вправо
function moveOtriadRight(){
	for (v in vragi) {
		vrag = vragi[v];
		vrag.left+=50;
		rasstanovkaVragov();
	};
}

// функция сдвига врагов вниз
function moveOtriadBottom(){
	for (v in vragi) {
		vrag = vragi[v];
		vrag.top+=50;
		rasstanovkaVragov();
	};
}

// функция проверки приземления врагов
function proverkaPrizemleniaVragov(){
	for (v in vragi) {
		vrag = vragi[v];
		if(vrag.ubit == false && vrag.top > 449){
			alert('Игра окончена, Вы проиграли планету!');
		}
	};
}

// функция выстрела игрока
function vistrel(){
	// перебираем врагов
	for (v in vragi) {
		vrag = vragi[v];
		// если одновременно враг не убит и позиции врага и игрока совпадают, убиваем
		if(vrag.ubit == false && vrag.left == posiciaIgroka){
			//прячем элемент изображающий врага
			idVraga = 'id_vrag_0' + vrag.nomer;
			document.getElementById(idVraga).style.display = 'none';
			vrag.ubit = true;
			// увеличиваем счетчик убитых врагов
			ubitoVragov+=1;
			if(ubitoVragov == 6){
				alert('Ваша планета спасена, Вы выиграли этот бой!');
			}
			// останавливаем функцию чтобы не убить врага над убитым
			return;
		}
	};
}

// функция расстановки врагов
function rasstanovkaVragov(){
	// перебираем все элементы списка врагов
	for (v in vragi) {
		vrag = vragi[v];
		// вычисляем id нужного html-элемента и позиционируем
		idVraga = 'id_vrag_0' + vrag.nomer;
		document.getElementById(idVraga).style.top = vrag.top;
		document.getElementById(idVraga).style.left = vrag.left;
	};
}