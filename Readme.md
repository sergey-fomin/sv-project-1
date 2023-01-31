# JS Sprint


+    userRouter.post('/user/register', registerUser);
    userRouter.post('/user/login', loginUser);
    userRouter.post('/user/update', authMiddleware, updateUser);
    userRouter.get('/user/profile', authMiddleware, getUser);

+    cardRouter.get('/cards', getAllCards);
    cardRouter.post('/cards', authMiddleware, createCard);
    cardRouter.delete('/cards', authMiddleware, deleteCard);
    cardRouter.post('/cards/like', authMiddleware, likeCard);

// Запускаем приложение
// Достаем токен из локалСтораджа
// Если токена не было в локалСторадже - рисуем главную, не рисуем профиль, рисуем карточки, в хэдере рисуем
// "Вход"/"Регистрация"
// Карточки при этом получаем с сервера

// Если токен был - ставим его в апи
// Делаем запрос за профилем
// Если ответ успешный - передаем эти данные на отрисовку в профиль
// В хэдере рисуем емейл и ссылку Выйти

// Если ответ не успешный - то как в случае если токена не было + стереть данные из локалСтораджа

// Логика старта приложения:
// Параллельно грузим и карточки, и профиль через Promise.all(api.getProfile(), api.getCads())
// В обработчике смотрим [profileRespose, cardsResponse]
// рисуем карточки
// с профилем делаем то что выше


добавить фикс эл-т с текущим роутом
добавить класс управления состоянием авторизации через дата-атрибуты без значений (показать/скрыть профиль)
разнести логин и регистрацию модули



Выполнил: [Сергей Фомин](https://htmlacademy.ru//profile/id1606421).
