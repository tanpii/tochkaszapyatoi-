Пользовательский клиентский сервис был спроектирован с учетом возможного роста функционала в будущем, что обусловило выбор архитектуры. В качестве архитектурного решения была использована архитектура FSD, которая позволяет четко разграничить функциональные блоки приложения и обеспечивает гибкость при добавлении новых возможностей.

В рамках текущей реализации были созданы следующие ключевые страницы:
1.	Главная страница — предоставляет пользователю общий обзор доступных функций приложения, включая навигацию по основным разделам.
2.	Каталог книг — страница, которая позволяет пользователям просматривать доступные книги с возможностью фильтрации и поиска по различным параметрам.
3.	Страница конкретной книги — предоставляет подробную информацию о выбранной книге, включая возможность забронировать книгу и оставить отзыв.
4.	Личный кабинет — страница, на которой пользователь может просматривать и редактировать информацию о себе, бронируемых книгах и полученных достижениях, а также историю чтения.

<img width="318" alt="image" src="https://github.com/user-attachments/assets/1c5cac72-c62c-41d3-bec9-9c0ca0545419" />


Для локального запуска в режиме разработки:

```sh
npm install
npm run dev
```
