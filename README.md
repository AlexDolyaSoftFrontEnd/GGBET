# GGBET Registration Form

Этот репозиторий содержит компонент формы регистрации для Веб-приложения GGBET, разработанный с использованием React, TypeScript и `styled-components`. Форма включает клиентскую валидацию с помощью `react-hook-form` и ряд улучшений пользовательского опыта, таких как динамические подсказки по паролю и переключение видимости пароля.

## Особенности

*   **React и TypeScript:** Современная разработка на React с строгой типизацией для повышения надежности кода.
*   **`react-hook-form`:** Эффективная и легкая библиотека для управления формами и валидации.
*   **`styled-components`:** Стилизация компонентов для создания модульного и поддерживаемого CSS.
*   **Поле Email:** Валидация для корректного формата электронной почты.
*   **Валидация Пароля:** Строгие правила валидации пароля (минимальная длина, заглавные/строчные буквы, цифры, спецсимволы) с динамическими подсказками для пользователя.
*   **Переключение Видимости Пароля:** Иконка для скрытия/отображения введенного пароля.
*   **Чекбоксы Согласия:** Обязательные чекбоксы для принятия условий использования и подтверждения возраста (21+).
*   **Чекбокс Подписки:** Опциональный чекбокс для получения новостей и акций.
*   **Адаптивный Дизайн:** Оптимизация для корректного отображения на различных устройствах (десктоп, планшет, мобильный).
*   **Сообщение об Успехе:** Всплывающее сообщение об успешной регистрации.
*   **Интеграция с `react-router-dom`:** Ссылки для навигации на страницы входа, условий использования и акций.
*   **Иконки FontAwesome:** Визуальное улучшение полей ввода с помощью иконок.

## Установка

Чтобы запустить проект локально, выполните следующие шаги:

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/ВАШ_НИКНЕЙМ/ggbet-registration-form.git
    cd ggbet-registration-form
    ```

2.  **Установите зависимости:**
    ```bash
    npm install
    # или
    yarn install
    ```

3.  **Запустите проект:**
    ```bash
    npm start
    # или
    yarn start
    ```
    Приложение будет доступно по адресу `http://localhost:3000`.

## Использование компонента

Компонент `RegistrationForm` можно использовать в вашем React-приложении:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm'; // Предполагаемый путь
import LoginPage from './components/LoginPage'; // Пример
import TermsOfUsePage from './components/TermsOfUsePage'; // Пример
import PromotionsPage from './components/PromotionsPage'; // Пример

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        {/* Другие маршруты */}
      </Routes>
    </Router>
  );
}

export default App;
