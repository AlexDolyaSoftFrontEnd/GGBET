import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'; // Import faTimesCircle
import styled from 'styled-components';
import GGBETLogo from './../../assets/ggbet-logo.svg';
import { Link } from 'react-router-dom';

/*
  Типизация данных формы
*/
interface IFormInput {
  username: string;
  password: string;
  acceptTerms: boolean;
  receiveNews: boolean;
  ageConfirmation: boolean;
}

/* ================= STYLED COMPONENTS ================= */

/* Обёртка всей секции */
const RegistrationSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121212;
  position: relative;
`;

/* Контейнер */
const RegistrationContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: auto;
  margin: auto;
  width: 1500px;
  height: 780px;

  display: flex;
  flex-direction: row;
  background: #1e1e1e;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 0;
    max-width: 100%;
    top: 0;
    bottom: 0;
    height: 100%;
  }
`;

/* Колонки */
const RegistrationCol = styled.div<{ side?: 'left' | 'right' }>`
  flex: 1;
  padding: 30px;
  overflow-y: auto;

  ${({ side }) =>
    side === 'left' &&
    `
      border-right: 1px solid #333;

      @media (max-width: 768px) {
        border-right: none;
        border-bottom: 1px solid #333;
      }
    `}

  ${({ side }) =>
    side === 'right' &&
    `
      background: #181818;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    `}
`;

/* Форма */
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

/* Заголовок */
const FormTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 600;
  color: #fff;
`;

/* Группа полей */
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

/* Лейбл */
const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #ddd;
`;

/* Контейнер input + иконка */
const Control = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

/* Иконка */
const Icon = styled.span`
  position: absolute;
  left: 12px;
  font-size: 14px;
  color: #aaa;
`;

/* Input */
const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 12px 12px 12px 38px;
  border: 1px solid ${({ $error }) => ($error ? '#e74c3c' : '#444')};
  border-radius: 8px;
  outline: none;
  transition: border 0.2s, background 0.2s;
  font-size: 14px;
  background: #2a2a2a;
  color: #fff;

  &:focus {
    border-color: ${({ $error }) => ($error ? '#e74c3c' : '#007bff')};
    background: #333;
  }

  &::placeholder {
    color: #888;
  }
`;

// New style for the password toggle icon
const PasswordToggleIcon = styled(Icon)`
  left: unset; // Override left positioning
  right: 12px; // Position on the right
  cursor: pointer;
  z-index: 10; // Ensure it's above the input
  color: #007bff; // Make it more prominent
  &:hover {
    color: #0056b3;
  }
`;

// New style for the clear username icon
const ClearUsernameIcon = styled(Icon)`
  left: unset;
  right: 12px;
  cursor: pointer;
  z-index: 10;
  color: #aaa;
  &:hover {
    color: #fff;
  }
`;

/* Чекбокс */
const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
    margin-top: 4px;
    accent-color: #007bff;
    cursor: pointer;
    flex-shrink: 0;
  }

  label {
    font-size: 14px;
    color: #ddd;
    cursor: pointer;
    line-height: 1.4;

    a {
      color: #007bff;
      text-decoration: none;
      margin-left: 4px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

/* Ошибка */
const ErrorText = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #e74c3c;
`;

/* Кнопка */
const SubmitButton = styled.button`
  padding: 14px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:disabled {
    background: #444;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0056b3, #004080);
  }
`;

/* Сообщение об успехе */
const SuccessMessage = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #2ecc71;
  font-weight: 500;
`;

/* Картинка справа */
const RightImage = styled.img`
  max-width: 100%;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
`;

/* Стили для ссылки "Вже з нами? Увійди" */
const LoginLinkWrapper = styled.div`
  margin-bottom: 25px;
  text-align: left;
  font-size: 14px;
  color: #aaa;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/* Стили для логотипа */
const LogoLink = styled(Link)`
  width: 120px;
  height: auto;
  margin-bottom: 30px;
  align-self: flex-start;
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
`;

const PasswordRequirements = styled.ul<{ $show?: boolean }>`
  list-style: none;
  padding: 0;
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 12px;
  color: #888;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
`;

const PasswordRequirementItem = styled.li<{ $met?: boolean }>`
  color: ${({ $met }) => ($met ? '#2ecc71' : '#e74c3c')};
  margin-bottom: 4px;
  transition: color 0.2s ease-in-out;

  &::before {
    content: '•';
    margin-right: 8px;
    font-weight: bold;
  }
`;

/* ================= COMPONENT ================= */

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const password = watch('password', '');
  const username = watch('username', ''); // Watch username to show/hide clear icon

  const onSubmit = (data: IFormInput) => {
    console.log('Данные формы:', data);
    setSuccessMessage(`Реєстрація успішна! Ласкаво просимо, ${data.username}`);
    reset();
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const passwordValidationRules = {
    minLength: {
      value: 8,
      message: 'Пароль повинен бути не менше 8 символів',
    },
    hasUpperCase: {
      value: /[A-Z]/,
      message: 'Пароль повинен містити велику літеру',
    },
    hasLowerCase: {
      value: /[a-z]/,
      message: 'Пароль повинен містити малу літеру',
    },
    hasDigit: {
      value: /\d/,
      message: 'Пароль повинен містити цифру',
    },
    hasSpecialChar: {
      value: /[!@#$%^&*()_+]/,
      message: 'Пароль повинен містити спецсимвол (!@#$%^&*()_+)',
    },
  };

  const isPasswordLongEnough = password.length >= passwordValidationRules.minLength.value;
  const hasUpperCase = passwordValidationRules.hasUpperCase.value.test(password);
  const hasLowerCase = passwordValidationRules.hasLowerCase.value.test(password);
  const hasDigit = passwordValidationRules.hasDigit.value.test(password);
  const hasSpecialChar = passwordValidationRules.hasSpecialChar.value.test(password);

  const clearUsername = () => {
    setValue('username', ''); // Clear the username input
  };

  return (
    <RegistrationSection>
      <RegistrationContainer>
        {/* Левая колонка */}
        <RegistrationCol side="left">
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Логотип-ссылка на главную */}
            <LogoLink to="/">
              <LogoImage src={GGBETLogo} alt="GGBET Logo" />
            </LogoLink>

            <FormTitle>Реєстрація</FormTitle>

            {/* Ссылка "Вже з нами? Увійди" */}
            <LoginLinkWrapper>
              Вже з нами?
              <Link to="/login">Увійдіть</Link>
            </LoginLinkWrapper>

            {/* Поле логина (только email) */}
            <FormGroup>
              <Label htmlFor="username">Електронна пошта:</Label>
              <Control>
                <Icon>
                  <FontAwesomeIcon icon={faUser} />
                </Icon>
                <Input
                  id="username"
                  type="email"
                  placeholder="name@example.com"
                  $error={!!errors.username}
                  {...register('username', {
                    required: 'Поле обовʼязкове для заповнення',
                    minLength: {
                      value: 5,
                      message: 'Мінімум 5 символів',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Введіть коректний email (user@example.com)',
                    },
                  })}
                />
                {username && ( // Conditionally render clear icon if username has text
                  <ClearUsernameIcon onClick={clearUsername}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </ClearUsernameIcon>
                )}
              </Control>
              {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
              <ErrorText style={{ color: '#888' }}>
                Будь ласка, введіть дійсний email. Ця інформація буде використана для входу та
                відновлення пароля.
              </ErrorText>
            </FormGroup>

            {/* Поле пароля */}
            <FormGroup>
              <Label htmlFor="password">Пароль:</Label>
              <Control>
                <Icon>
                  <FontAwesomeIcon icon={faLock} />
                </Icon>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Не менше 8 символів, з цифрами та спецсимволами"
                  $error={!!errors.password}
                  {...register('password', {
                    required: 'Поле обовʼязкове для заповнення',
                    minLength: passwordValidationRules.minLength,
                    validate: {
                      hasUpperCase: (value) =>
                        passwordValidationRules.hasUpperCase.value.test(value) ||
                        passwordValidationRules.hasUpperCase.message,
                      hasLowerCase: (value) =>
                        passwordValidationRules.hasLowerCase.value.test(value) ||
                        passwordValidationRules.hasLowerCase.message,
                      hasDigit: (value) =>
                        passwordValidationRules.hasDigit.value.test(value) ||
                        passwordValidationRules.hasDigit.message,
                      hasSpecialChar: (value) =>
                        passwordValidationRules.hasSpecialChar.value.test(value) ||
                        passwordValidationRules.hasSpecialChar.message,
                    },
                  })}
                />
                <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </PasswordToggleIcon>
              </Control>
              {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
              {/* Dynamic password requirements */}
              <PasswordRequirements $show={password.length > 0}>
                <PasswordRequirementItem $met={isPasswordLongEnough}>
                  Не менше 8 символів
                </PasswordRequirementItem>
                <PasswordRequirementItem $met={hasUpperCase}>
                  Принаймні одна велика літера
                </PasswordRequirementItem>
                <PasswordRequirementItem $met={hasLowerCase}>
                  Принаймні одна мала літера
                </PasswordRequirementItem>
                <PasswordRequirementItem $met={hasDigit}>
                  Принаймні одна цифра
                </PasswordRequirementItem>
                <PasswordRequirementItem $met={hasSpecialChar}>
                  Принаймні один спецсимвол
                </PasswordRequirementItem>
              </PasswordRequirements>
            </FormGroup>

            {/* Чекбокс "Я принимаю условия использования" */}
            <CheckboxWrapper>
              <input
                id="acceptTerms"
                type="checkbox"
                {...register('acceptTerms', {
                  required: 'Ви повинні прийняти умови використання.',
                })}
              />
              <label htmlFor="acceptTerms">
                Я підтверджую, що приймаю{' '}
                <Link to="/terms-of-use" target="_blank" rel="noopener noreferrer">
                  Умови використання
                </Link>
                .
              </label>
            </CheckboxWrapper>
            {errors.acceptTerms && <ErrorText>{errors.acceptTerms.message}</ErrorText>}
            {!errors.acceptTerms && (
              <ErrorText style={{ color: '#888' }}>
                Ознайомтеся з Умовами використання перед реєстрацією.
              </ErrorText>
            )}

            {/* Чекбокс "Потверждения успеха" */}
            <CheckboxWrapper>
              <input
                id="ageConfirmation"
                type="checkbox"
                {...register('ageConfirmation', {
                  required: 'Ви повинні підтвердити свій вік.',
                })}
              />
              <label htmlFor="ageConfirmation">
                Я підтверджую, що мені є 21 рік та не маю обмежень в участі в азартних іграх.
              </label>
            </CheckboxWrapper>
            {errors.ageConfirmation && <ErrorText>{errors.ageConfirmation.message}</ErrorText>}
            {!errors.ageConfirmation && (
              <ErrorText style={{ color: '#888' }}>
                Реєстрація дозволена особам, які досягли 21 року.
              </ErrorText>
            )}

            {/* Чекбокс "Получать новости и акции" */}
            <CheckboxWrapper>
              <input id="receiveNews" type="checkbox" {...register('receiveNews')} />
              <label htmlFor="receiveNews">
                Я погоджуюсь отримувати акційні пропозиції, новини та бонуси від GGBET.UA
              </label>
            </CheckboxWrapper>
            <ErrorText style={{ color: '#888', marginTop: '-5px', marginBottom: '15px' }}>
              Будьте в курсі останніх акцій та бонусів!
            </ErrorText>

            {/* Кнопка отправки */}
            <SubmitButton type="submit">Зареєструватися</SubmitButton>

            {/* Сообщение об успешной регистрации */}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          </Form>
        </RegistrationCol>

        {/* Правая колонка */}
        <RegistrationCol side="right">
          <h3 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px' }}>
            Реєструйтеся та отримуйте бонуси!
          </h3>
          <RightImage
            src="https://ggbet.ua/file/media:1dfedd6e201097b19e2c07fec24d5384b7c605f0ff?w=1000"
            alt="promo"
          />
          <p style={{ color: '#aaa', fontSize: '14px', marginTop: '20px', textAlign: 'center' }}>
            Приєднуйтесь до GGBET.UA та занурюйтесь у світ спортивних ставок та кіберспорту. Миттєві
            виплати, широка лінія та найкращі коефіцієнти чекають на вас!
          </p>
          <Link
            to="/promotions"
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Наші Акції
          </Link>
        </RegistrationCol>
      </RegistrationContainer>
    </RegistrationSection>
  );
};

export default RegistrationForm;
