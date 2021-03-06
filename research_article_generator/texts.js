
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var selection = 1, sequence = 2;

var themeUsageTexts = [selection,
	[selection, //economics and management
		" улучшения инвестиционного климата",
		" продвижения продукта на рынке услуг",
		" повышения квалификации рабочего персонала",
		" снижения налоговой нагрузки на индвидуального предпринимателя",
	],
	" лечения водянки",
	" захоронения ядерных отходов",
	[selection, //math
		" решения систем нелинейных уравнений второго порядка",
		" поиска нормального распределения в случайно сгенерированных данных",
		" генерации диаграммы Вороного",
	],
	[sequence,
		[selection,
			" повышения надежности ",
			" улучшения ",
			" обнаружения дефектов ",
			" исследования ",
		],
		[selection,
			"автоматизированной системы управления производством",
			"двигателей летательных аппаратов",
			"газоотоводов доменной печи",
			"алгоритма типичной унификации точек доступа и избыточности",
			"обработки сообщений контекстно-свободных грамматик"
		],
	],
]

var themeTexts = [selection,
	[sequence,
		[selection,
			"Использование",
			"Разработка",
			"Реализация",
			"Совершенствование",
			"Повышение качества",
			"Эксплуатация",
			"Основные положения",
			"Модернизация",
			"Теоретические возможности использования",
			[sequence,
				[selection, "К вопросу о ","О "],
				[selection, "разработке", "внедрении", "теории"],
			]
		],
		" %theme ",
		[selection,
			[sequence,
				[selection,
					"как средства",
					"как способа",
					"в качестве метода",
					"с целью",
					"для"
				],
				themeUsageTexts
			],
			"в симметричной криптосистеме",
			"в современной распределенной сетевой ОС",
			"в дисперсных средах",
			[selection,
				": от теории к практике",
				": прошлое, настоящее, будущее",
				": основные гипотезы",
				": ключевые моменты",
				": тенденции развития в XXI веке",
			],
		],
	],
	[sequence,
		[selection, "Введение в", "", "Теория и практика"],
		" %theme ",
		[selection,
			"как средство",
			"как способ",
			"как метод",
			"- перспективный метод",
			"- передовая технология",
		],
		themeUsageTexts,
	],
]

var longtext = 
"Все вы служили народу и народному суеверию, вы, прославленные мудрецы! – а не истине! Потому и воздавали вам почести. " + //Так говорил Заратустра. Отрывок.
"Потому терпели и неверие ваше, что оно было уловкой и хитроумным путем к народу. Так господин дает волю рабам своим, да еще забавляется дерзостью их. " + 
"Но кто ненавистен народу, как волк собакам, так это – свободный дух, враг цепей, который никому не поклоняется и живет в лесах. " + 
"Вытравить такого из логовища – это всегда называлось у народа чувством справедливости; и теперь еще науськивают на него самых свирепых собак. " + 
"\"Ибо истина там, где народ! Горе ищущим!\" – так повелось у вас издавна. " + 
"Вы хотели оправдать народ свой в поклонении его: это называли вы \"волей к истине\", вы, прославленные мудрецы! " + 
"И всегда говорило сердце ваше: \"Из народа вышел я, и оттуда снизошел на меня глас Божий\". " + 
"Умные и, в то же время, упрямые, как ослы, всегда были вы заступниками народа. " + 
"И многие из властителей, желавшие ладить с толпой, впереди коней своих впрягали осленка – какого-нибудь прославленного мудреца. " + 
"А теперь я хочу, чтобы вы совсем, наконец, сбросили с себя львиную шкуру! " + 
"Пеструю шкуру хищного зверя и косматую гриву исследующего, ищущего и покоряющего! " + 
"Чтобы поверил я в \"искренность\" вашу, должны вы сначала сломить в себе волю к поклонению. " + 
"Искренним называю я того, кто удаляется в пустыню безбожия и разбивает там сердце свое, готовое поклоняться. " + 
"Среди желтых песков, палимый солнцем, украдкой посматривает он, сгорая от жажды, на обильные источниками оазисы, где все живое отдыхает в тени. " + 
"Но и жажда не в силах заставить его уподобиться этим умиротворенным и самодовольным: ибо – где оазисы, там и идолы. " + 
"Голодным, одиноким, насильственным и безбожным – таким воля льва повелевает быть ему. " + 
"Быть бесстрашным и внушающим страх, великим и одиноким, свободным от счастья рабов и поклонения богам – такова воля искреннего. " + 
"В пустыне, и господами пустыни искони жили честные, свободные умы; а в городах живут прославленные мудрецы – откормленные вьючные животные. " + 
"Всегда, словно ослы, тянут они – повозку народа! " + 
"Не то, чтобы я сердился на них: но для меня они всегда останутся слугами, украшенными сбруей, хотя бы и сверкала она золотом. " + 
"И часто были они хорошими слугами, достойными похвалы. Ибо так гласит добродетель: \"Если должен ты быть слугой, ищи того, кому наиболее полезна служба твоя. " + 
"Дух и добродетель господина твоего пусть возрастают благодаря тому, что ты сделался слугой ему: так и сам ты возрастешь с духом и добродетелью его\". " + 
"Истинно так, знаменитые мудрецы, слуги народа! Вы возрастали вместе с духом и добродетелью народа – и народ вырос через вас! К чести вашей говорю я это! " + 
"Но народом остаетесь вы для меня и в добродетелях своих, народом с близорукими глазами, который не знает, что такое дух! " + 
"Дух есть жизнь, которая сама же надрезывает жизнь: собственным страданием умножает она знание свое: знали вы уже это? " + 
"И счастье духа в том, чтобы стать помазанником и жертвой на заклание, освященной слезами: знали вы уже это? " + 
"Слепота ослепшего и его искание на ощупь свидетельствуют о силе солнца, на которое взглянул он: знали вы уже это? " + 
"Мало того что дух движет горами; надо, чтобы научился познающий строить из гор: знали вы уже это? " + 
"Вы знаете только искры духа, но не видите, что он – наковальня, не видите жестокости молота его! " + 
"Поистине, вам не ведома гордость духа! Но гораздо непереносимее была бы для вас кротость его, пожелай она заговорить! " + 
"И вы еще ни разу не осмелились ввергнуть дух свой в снежную пучину: ибо вы недостаточно горячи! Потому и незнакомы вам наслаждения холодом его. " + 
"Но во всем вы обходитесь с духом слишком запросто, и мудрость часто превращали вы в богадельню и лечебницу для плохих поэтов. " + 
"Вы не орлы, и потому не испытали вы счастья в ужасе духа. Но кто не птица, тому не дано устраивать привал над пропастью. " + 
"Вы – теплы: но холодны ключи глубокого знания. Холодны, словно лед, глубочайшие источники духа – отрада для рук, горячих деяниями. " + 
"Вот стоите вы предо мной, почтенные и важные, с прямыми спинами, вы, прославленные мудрецы! Ни сильный ветер, ни могучая воля не подвигнут вас. " + 
"Видели вы когда-нибудь, как по морю проносится парус, округлый, надутый ветром и трепещущий от бешенства его? " + 
"Подобно парусу, трепеща от бури духа, мчится мудрость моя по морю – моя необузданная мудрость! " + 
"Но вы, знаменитые мудрецы, слуги народа, – разве можете вы мчаться со мной! " +

"Лазеров существует великое множество: газовые, твердотельные, волоконные, жидкостные, на парах металлов, на свободных электронах, полупроводниковые, на центрах окраски, газодинамические, эксимерные, химические и даже лазеры с накачкой ядерным взрывом. В этой части статьи мы рассмотрим различные виды лазеров, на каких длинах волн они светят и где применяются. " + //http://brutalengineer.ru/2016/07/04/mnogoobrazie-lazerov-chast-2/
"В газовых лазерах активной средой, как это явствует из названия, является газ. К ним относятся: гелий-неоновый лазер, лазер на углекислом газе, аргоновый, криптоновый и азотный лазеры, лазер на угарном газе. " +
"В гелий-неоновом лазере усиление света происходит на атомах неона, гелий же работает как теплоотвод и служит для повышения давления. Это очень маломощные лазеры (от 1 до 100мВт), энергия к которым подводится с помощью продольного газового разряда. Накачка на верхний лазерный уровень происходит при столкновении электронов разряда с атомами неона. Основная длина волны – 0.6328 нм. Путем установки призмы или дифракционной решетки (частотно-селективных элементов) можно получить генерацию на длинах волн 0.5435, 0.5939, 0.6118, 1.1523, 1.52 и 3.3913 мкм " +
"Лазер на углекислом газе (CO2-лазер) – один из самых популярных промышленных лазеров (сегодня его вытесняют волоконный и диодный лазеры). Они используются для обработки различных материалов и анализа состава атмосферы. Есть даже ряд проектов по использованию этих лазеров для управления молниями. Активной средой углекислотных лазеров является смесь газов: CO2, N2 и He. Иногда для улучшения разряда добавляют Xe и некоторые органические вещества. Накачка, как и в гелий-неоновом лазере, осуществляется путем создания разряда в среде (есть и экзотические методы, например, прямой впрыск электронного пучка). Разряд используют как продольный тлеющий (в лазерах в виде трубок), так и поперечный высокочастотный (в лазерах с полуволноводным резонатором). Накачка происходит за счет столкновения молекул углекислого газа и азота (с последующей передачей энергии на углекислый газ) с электронами разряда. Основная длина волны таких лазеров лежит в инфракрасном диапазоне и составляет 10.6 мкм. Для различных исследовательских целей используют частотно-селективные элементы, которые позволяют перестраивать длину волны в диапазоне от 9 до 11 мкм. " +
"Аргоновый лазер также возбуждается электрическим разрядом, однако рабочие лазерные уровни соответствуют ионам, а не молекулам (атомам) газа. Чем выше степень ионизации атома (т.е. чем больше электронов с него улетело), тем более короткую длину волны может генерировать лазер. Всего длин волн, которые излучает лазер, 14, в порядке убывания интенсивности: 0.488, 0.5145, 0.3638-0.3336, 0.4965, 0.4765, 0.3851-0.3511, 0.5287, 0.5017, 0.3358-0.3003, 0.4727, 0.4658, 0.4579, 0.4545, 0.3055-0.2754 мкм. Используются, в основном, для литографии, в офтальмологии и для накачки других лазеров – Ti:Sa и лазеров на красителях. " +
"Криптоновый лазер устроен так же, как и аргоновый, но излучает, в основном, на длине волны 0.647 мкм. Более слабое излучение соответствует 0.416, 0.5309, 0.5682, 0.6764, 0.7525 и 0.7993 мкм. Также используются в литографии и офтальмологии. " +
"Азотный лазер способен генерировать длину волны 0.3371 мкм и, более слабо, 0.316 и 0.357 мкм. Накачка осуществляется электрическим разрядом. При этом коэффициент усиления в таких лазерах настолько высок, что лазер может работать и без резонатора. Областью применения являются, в основном, научные исследования и измерение параметров атмосферы. " +
"CO-лазер работает на смеси CO, N2 и He, его принцип работы аналогичен CO2-лазеру, но требуются криогенные температуры, в связи с чем он не нашел широкого распространения в промышленности, хотя и обладает существенно большим КПД. Длины волна лазера лежат в диапазонах 2,5—4,2 мкм и 4,8—8,3 мкм. " +
"Эти лазеры сходны газовым лазерам, однако, как явствует из названия, в качестве активной среды в них используются пары различных металлов. В лазерной трубке присутствуют две (иногда больше) небольшие емкости с металлом буферный инертный газ. Одна из емкостей нагревается до высоких температур, металл начинает испаряться и диффундировать по всей трубке, осаждаясь во второй емкости. Когда ресурс первой емкости выработан, нагрев переключается на вторую емкость, а направление диффузии и осаждения меняется. Накачка лазера производится с помощью разряда в газе. При этом ион инертного газа сталкивается с атомом металла и передает ему энергию. В силу особенностей структуры энергетических уровней, такие лазеры работают только в импульсном режиме. " +
"Самый известный лазер на парах металлов использует медь. Усиление в среде настолько большое, что он способен работать без резонатора. Это довольно мощный лазер, который излучает на длинах волн 0.5106 и 0.5782 мкм. Один из немногих лазеров на парах металла, который нашел свое применение вне научных и учебных лабораторий – он используется в скоростной фотографии и для накачки лазеров на красителях. " +
"Вторым по популярности является гелий-кадмиевый лазер. Его спектр – 0.44 и 0.325 мкм, то есть ультрафиолетовая область, за счет чего он нашел свое применение в полиграфии и ультрафиолетовых детекторах. " +
"Более экзотические лазеры на парах металлов используют пары ртути (в смеси с гелием, длины волн 0.567 и 0.615 мкм), селена (24 полосы от красного до УФ) и золота (0.627 нм). Кроме как в научных экспериментах применяются редко. " +
"В этих лазерах накачка активной среды (газа) происходит за счет химических реакций. Способны генерировать непрерывную мощность вплоть до мегаватт. Основных представителя этого семейства два – кислород-ионный и фторводородный лазеры. " +
"Кислород-ионный лазер работает за счет реакции газообразного хлора, молекулярного йода, раствора перекиси водорода и гидроксида калия. В результате химической реакции раствора с хлором (помимо тепла и хлорида калия) образуется кислород, который передает свою энергию молекулам йода, который затем и излучает на длине волны 1.315 мкм. " +
"Лазер на фтористом водороде использует цепную реакцию: атомарный фтор соединяется с молекулярным водородом с образованием молекулы HF и атомарного водорода. Атомарный водород, в свою очередь, реагирует с молекулярным фтором, снова образуя HF и атомарный фтор. Для запуска реакции используется электрический разряд. Существует также и лазер на изотопе водорода – дейтерии, отличающийся от HF-лазера длинами волн: HF излучает в диапазоне 2.7-2.9 мкм, а DF – 3.6-4.2 мкм. " +
"Этот класс лазеров использует химическую реакцию с неустойчивыми молекулами – эксимерами. Такие молекулы образуются с участием инертных газов и способны существовать только в возбужденном состоянии. Соединение атомов в молекулы происходит благодаря электрическому разряду. Используются повсеместно в ультрафиолетовой литографии и офтальмологии. Длины волн следующие: 0.193 мкм (ArF), 0.248 мкм (KrF), 0.308 мкм (XeCl), 0.353 мкм (XeF). " +
"Пожалуй, самый экзотичный вид лазеров. Накачка среды в них осуществляется посредством ядерных реакций. Способны излучать свет в диапазоне от рентгена до дальнего ИК. Есть два типа таких лазеров – одни из них используют ядерные процессы в реакторе, а другие – ядерный взрыв, после которого среда переходит в возбужденное состояние. Последние, разумеется, одноразовые. " +
"В качестве активной среды в таких лазерах используются, как это явствует из названиия, жидкости, имеющие какую-либо окраску. Самым популярным красителем является Родамин 6G, но я слышал о получении генерации даже на бренди. В маломощных лазерах используется кювета с жидкостью, а в мощных вариантах формируется тонкая струя, что позволяет избежать проблем с охлаждением. Для накачки используются другие лазеры – твердотельные и газовые. Спектр таких лазеров очень широк и составляет десятки нанометров. Это позволяет производить перестройку по длине волны или же генерировать сразу во всем спектре (при этом происходит генерация сверхкоротких импульсов). Различные разновидности красителя Кумарина полностью перекрывают диапазон длин волн от 0.435 до 0.565 нм. Различные Родамины светят в суммарной области 0.540-0.675 мкм, а прочие красители перекрывают весь оставшийся спектр вплоть до 0.940 мкм. Применяются, в основном, для создания лазерных часов, лазерной спектроскопии и генерации сверхкоротких импульсов в исследовательских и (изредка) промышленных целях. " +
"В качестве активной среды используются кристаллы с добавлением активных веществ. При этом лазерные уровни образуются в активном веществе из-за воздействия на него внешней кристаллической решетки. Природные кристаллы для лазерных целей не подходят, поэтому их специальном образом выращивают, добиваясь при этом высокой однородности распределения примесей по кристаллу и однородности самого кристалла.  Единственным способом ввести энергию в такие лазеры является свет. Накачка осуществляется с помощью ламп (импульсных и непрерывных), других лазеров и диодов. " +
"Лазер на рубине был первым лазером оптического диапазона. Активным веществом являются ионы хрома, а кристалл – Al2O3. Для накачки применяют лампы-вспышки. Длина волны 0.6943 нм. Используется в голографии и для удаления татуировок. " +
"Существует несколько лазеров на ионах неодима, различающихся матричными кристаллами и, соответственно, длиной волны. Накачка производится либо с помощью ламп, либо, что наиболее популярно на сегодняшний день, с помощью диодов. Самым популярным является Nd:YAG (неодим в аллюмо-иттриевом гранате). Основная длина волны 1.064 мкм, второстепенная – 1.32 нм. С помощью нелинейных кристаллов иногда удваивают частоту лазера (длина волны составляет 0.532 мкм), именно такая схема используется в китайских зеленых лазерных указках. Применяется в обработке материалов, дальномерах, научных исследованиях и для накачки других лазеров. Еще два лазера на неодиме – Nd:YLF и Nd:YVO применяются в основном для накачки Ti:Sa лазеров и имеют длины волн 1.047 (вторичная 1.053) и 1.064 мкм соответственно. " +
"Отдельно стоит лазер на неодиме в стекле. Вместо кристалла здесь использовано аморфное стекло, что приводит к заметно более широкому спектру, чем у Nd:YAG. Длины волн отличаются совсем немного – 1.062 и 1.054 нм (в зависимости от типа стекла), но эти лазеры способны достигать энергий в импульсе вплоть до мегаджоулей (тераватты пиковой мощности). Используются для лазерной плавки и в попытках реализации лазерного термоядерного синтеза. " +
"Еще три лазера используют в качестве матричного кристалла аллюмо-итриевый гранат (YAG), различаются они легирующими добавками. Иттербиевый лазер (Yb:YAG) имеет длину волны 1.03 мкм и используется для обработки материалов, спектроскопии и в дальномерах. Гольмиевый лазер (Ho:YAG) с длиной волны 2.1 мкм используется в медицине, а лазер на тулии (Tm:YAG) – в радарах (его длина волны 2 мкм). " +
"Титан-сапфировый лазер (Ti:Sa) имеет сверхширокий спектр излучения – от 0.65 до 1.1 мкм. За счет этого его можно как перестраивать во всем диапазоне, так и выбирать какую-то длину волны, кроме того, он способен излучать сразу во всем спектре (при этом получаются сверхкороткие импульсы). Для его накачки используется множество других лазеров, а сам Ti:Sa нашел свое применение в научных исследованиях, дальномерах и спектроскопии. Из-за своей сложности применения в промышленности не нашли. " +
"Еще один тип лазеров использует в качестве матричного кристалла селенид цинка (ZnSe). В основном применяются два типа активных легирующих добавок – хром и железо. Диапазоны длин волн, им соответствующие – 1.9-3.6 мкм и 4-4.5 мкм. Используются для генерации сверхкоротких импульсов, что имеет применение в промышленности. " +
"К твердотельным лазерам относится и волоконный лазер. Существенное отличие конструкции в том, что вместо короткого и толстого кристалла используется очень длинное и очень тонкое волокно (его длина может достигать километров). При этом в одном волокне выполнено сразу несколько волноводов – один из них – это активная среда лазера, легированная эрбием, а остальные проводят излучение накачки от лазерного диода, которое на пути следования постепенно проникает в основной волновод. Очень активно используются в промышленности для резки, гравировки и сварки. Кроме того, нашли свое применение в медицине и косметологии, используются в качестве усилителей в оптоволоконной связи. Длины волн от 1.53 до 1.56 мкм. " +
"Самый распространенный тип лазеров. В основе конструкции лежит полупроводниковый диод с отражающими гранями, однако из-за особенностей применения как лазера и физики необходимых процессов, они сильно отличаются от своих радиотехнических прародителей. Накачиваются напрямую током – в активной среде (на p-n переходе) происходит рекомбинация электронов и дырок (пустых мест без электронов) с испусканием кванта света. Изначально работали лишь при криогенных температурах, однако сегодня этого не требуется. Излучают в различных диапазонах – от ближнего УФ до дальнего ИК и в терагерцовом (но заполняют спектр не полностью). Нашли широчайшее применение в телекоммуникациях, промышленности, научных исследованиях и быту. Активно используются для накачки других лазеров."
"Излучают в рентгеновском диапазоне – от долей ангстрема до единиц нанометров. В основе конструкции лежит ондулятор (последовательность противоположно расположенных магнитов), через который летит поток электронов. За счет переменного магнитного поля происходит поперечное колебание электронов, которые излучают свет вдоль направления движения. Используются в кристаллографии и исследовании материалов. "


// "Развитие веб-технологий привело к тому, что с момента своего появления браузеры претерпели ряд существенных изменений. Если на заре существования они представляли собой простейшие приложения, предназначенные для просмотра статичных документов с HTML-разметкой, то теперь браузеры фактически являются средством доступа к полноценной распределенной операционной системе, предоставляя пользователю функции, ранее доступные только непосредственно на локальной машине. \
// Существуют онлайн-сервисы, обеспечивающие возможность создания и редактирования документов (apps.google.com), разработки на нескольких языках программирования (http://ideone.com/), доступа к удаленному серверу виртуальных машин (https://sourceforge.net/projects/phpvirtualbox/), и даже запуска в браузере операционной системы (https://win95.ajf.me/). Музыкальные и видео-сервисы также давно стали привычными. \
// Кроме того, веб-технологии привели к достижению практически полной кроссплатформенности, т.е. ситуации, когда программное обеспечение не зависит от аппаратуры и ОС пользователя. \
// Все это, а также огромная пользовательская аудитория, привело к тому, что браузеры стали рассматриваться как одна из наиболее перспективных игровых платформ. \
// Ранее основным средством создания интерактивных приложений в браузере была технология Adobe Flash Player, а встроенные возможности, такие как JavaScript, применялись только в качестве вспомогательных, однако появление стандарта HTML5 в корне изменило ситуацию. Поддержка воспроизведения звука и видео, а также отрисовка 2d- (canvas) и 3d-графики (WebGL) встроенными средствами позволила браузеру стать платформой для полноценных интерактивных приложений без использования сторонних расширений и дополнений. \
// Игра жанра tower defense “Rescue ASCII” (http://www.kongregate.com/games/qiray/rescue-ascii) написана на языке программирования JavaScript с использованием таких средств HTML5 как canvas, что позволило достичь высокой производительности при отрисовке поля и большого количества игровых объектов по сравнению с работой с DOM. Однако, такие элементы как всплывающие окна, меню и т.п. были сделаны в виде блочных элементов, т.к. скорость их отрисовки не является критичным параметром, а реализация с помощью элементов разметки существенно проще. Также использовался сервис Kongregate API для включения социальной составляющей в виде общедоступной статистики лучших игроков. \
// Аркада-головоломка Bombersudoku (https://vk.com/app5120532), объединяющая классические Bomberman и судоку, напротив, с целью обеспечения совместимости со старыми версиями браузеров, не поддерживающими технологии HTML5, реализована исключительно с применением предыдущей версии стандарта HTML. Кроме того в разработке был использован открытый интерфейс социальной сети «ВКонтакте» vkAPI, что позволило реализовать хранение данных пользователя на стороне сервера и такую социальную функцию как «рассказать друзьям». \
// В настоящее время в связи с введением в стандарте HTML5 событий касания, таких как touchstart, touchmove и т.д., а также настройки размеров активной области экрана с помощью метатега, стала возможной адаптация игровых веб-приложений под мобильные устройства. Подобное направление в виду развития технологий, повсеместного распространения высокоскоростных сетей и быстрого роста аудитории является очень перспективным. "
