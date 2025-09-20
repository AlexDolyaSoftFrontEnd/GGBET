# GGBET Registration Form

Форма включает клиентскую валидацию с помощью `react-hook-form` и ряд улучшений пользовательского опыта, таких как динамические подсказки по паролю и переключение видимости пароля.

<img width="1920" height="861" alt="Screenshot_2025_09_20-3" src="https://github.com/user-attachments/assets/aa37c3ba-df1b-4df1-9994-10257ab5eaf9" />

## Особенности

*   **React и TypeScript:** Разработка на React с строгой типизацией для повышения надежности кода.
*   **`react-hook-form`:** Легкая библиотека для управления формами и валидации.
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
