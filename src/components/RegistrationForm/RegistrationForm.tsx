import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GGBETLogo from './../../assets/ggbet-logo.svg'; // Убедитесь, что путь к логотипу правильный

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

const RegistrationSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  background: linear-gradient(135deg, #0f1c2c, #1a2a3a); /* Gradient background */
  padding: 20px;
  box-sizing: border-box; /* Include padding in width/height */
  overflow: auto; /* Allow scrolling if content overflows */

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #1e2a3a; /* Darker background for the container */
  border-radius: 12px; /* More rounded corners */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Enhanced shadow */
  overflow: hidden;
  max-width: 1200px; /* Max width for larger screens */
  width: 100%; /* Take full width on smaller screens */
  min-height: 700px; /* Minimum height */
  margin: auto; /* Center the container */

  @media (max-width: 992px) {
    flex-direction: column;
    max-width: 95%;
    min-height: unset; /* Remove min-height for vertical stacking */
  }

  @media (max-width: 768px) {
    border-radius: 0; /* No border-radius on very small screens */
    max-width: 100%;
    height: auto;
  }
`;

const RegistrationCol = styled.div<{ side?: 'left' | 'right' }>`
  flex: 1;
  padding: 40px; /* Increased padding */
  overflow-y: auto; /* Scrollable content */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */

  ${({ side }) =>
    side === 'left' &&
    `
      background: #283a4a; /* Slightly lighter background for the form side */
      border-right: 1px solid rgba(255, 255, 255, 0.1); /* Subtle separator */

      @media (max-width: 992px) {
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    `}

  ${({ side }) =>
    side === 'right' &&
    `
      background: #1e2a3a; /* Consistent background with container */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; /* Center content vertically */
      text-align: center;
      padding: 40px 30px; /* Adjusted padding */
    `}

  @media (max-width: 768px) {
    padding: 20px; /* Less padding on small screens */
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Spacing between form groups */
`;

const FormTitle = styled.h2`
  margin-bottom: 25px; /* More space below title */
  font-size: 30px; /* Larger title */
  font-weight: 700; /* Bolder */
  color: #e0e0e0; /* Lighter white */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Subtle text shadow */

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 5px; /* Less margin, using gap in Form */
`;

const Label = styled.label`
  display: block;
  font-size: 15px; /* Slightly larger label */
  margin-bottom: 8px;
  font-weight: 500;
  color: #b0c4de; /* Softer blue-grey */
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.span`
  position: absolute;
  left: 15px; /* Increased padding for icon */
  font-size: 16px; /* Slightly larger icon */
  color: #8fa6c4; /* Blue-grey color for icons */
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 14px 15px 14px 45px; /* Increased padding and space for icon */
  border: 1px solid ${({ $error }) => ($error ? '#e74c3c' : '#4f6c8c')}; /* Better error color */
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  font-size: 15px;
  background: #1a2a3a; /* Darker input background */
  color: #e0e0e0; /* Lighter text color */
  box-sizing: border-box; /* Include padding in width */

  &:focus {
    border-color: ${({ $error }) => ($error ? '#e74c3c' : '#64b5f6')}; /* Lighter blue on focus */
    background: #223447; /* Slightly lighter background on focus */
    box-shadow: 0 0 0 3px rgba(100, 181, 246, 0.3); /* Blue glowing effect */
  }

  &::placeholder {
    color: #8fa6c4; /* Softer placeholder color */
  }
`;

const PasswordToggleIcon = styled(Icon)`
  left: unset;
  right: 15px; /* Consistent right padding */
  cursor: pointer;
  z-index: 10;
  color: #64b5f6; /* Prominent blue */
  &:hover {
    color: #90caf9; /* Lighter blue on hover */
  }
`;

const ClearUsernameIcon = styled(Icon)`
  left: unset;
  right: 15px;
  cursor: pointer;
  z-index: 10;
  color: #8fa6c4;
  &:hover {
    color: #e0e0e0;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 5px;
  margin-bottom: 5px; /* Less margin, using Form gap */

  input {
    margin-right: 10px;
    margin-top: 5px; /* Align checkbox better */
    accent-color: #64b5f6; /* Accent color for checkbox */
    cursor: pointer;
    flex-shrink: 0;
    width: 18px; /* Larger checkbox */
    height: 18px; /* Larger checkbox */
  }

  label {
    font-size: 14px;
    color: #b0c4de;
    cursor: pointer;
    line-height: 1.5;

    a {
      color: #64b5f6;
      text-decoration: none;
      margin-left: 4px;
      font-weight: 500; /* Make links slightly bolder */

      &:hover {
        text-decoration: underline;
        color: #90caf9;
      }
    }
  }
`;

const ErrorText = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #e74c3c;
  font-weight: 500;
`;

const InfoText = styled(ErrorText)`
  color: #8fa6c4; /* Softer color for info messages */
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  padding: 15px 20px; /* More padding */
  margin-top: 25px; /* More margin */
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #64b5f6, #42a5f5); /* Brighter gradient */
  color: white;
  font-weight: 700; /* Bolder text */
  font-size: 18px; /* Larger font */
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  letter-spacing: 0.5px; /* Add slight letter spacing */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);

  &:disabled {
    background: linear-gradient(135deg, #5c6b7c, #4a5a6a); /* Greyer disabled state */
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #42a5f5, #2196f3); /* Darker gradient on hover */
    transform: translateY(-2px); /* Slight lift effect */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5); /* Enhanced shadow on hover */
  }
`;

const SuccessMessage = styled.p`
  margin-top: 20px;
  font-size: 15px;
  color: #2ecc71;
  font-weight: 600;
  text-align: center;
`;

const RightImage = styled.img`
  max-width: 90%; /* Responsive image */
  height: auto; /* Maintain aspect ratio */
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5); /* Stronger shadow */
`;

const LoginLinkWrapper = styled.div`
  margin-bottom: 25px;
  text-align: left;
  font-size: 15px;
  color: #b0c4de;

  a {
    color: #64b5f6;
    text-decoration: none;
    font-weight: 600; /* Bolder link */
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
      color: #90caf9;
    }
  }
`;

const LogoLink = styled(Link)`
  width: 150px; /* Slightly larger logo */
  height: auto;
  margin-bottom: 35px; /* More space below logo */
  align-self: flex-start;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)); /* Shadow for logo */
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03); /* Slight scale on hover */
  }

  @media (max-width: 768px) {
    width: 120px;
    margin-bottom: 25px;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
`;

const PasswordRequirements = styled.ul<{ $show?: boolean }>`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 13px;
  color: #8fa6c4;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  background: #1a2a3a;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const PasswordRequirementItem = styled.li<{ $met?: boolean }>`
  color: ${({ $met }) => ($met ? '#2ecc71' : '#e74c3c')};
  margin-bottom: 5px;
  transition: color 0.2s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '•';
    margin-right: 10px;
    font-weight: bold;
  }
`;

const RightColumnTitle = styled.h3`
  color: #e0e0e0;
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const RightColumnText = styled.p`
  color: #b0c4de;
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 30px;
  line-height: 1.6;
  max-width: 450px;
`;

const RightColumnButton = styled(Link)`
  padding: 12px 25px;
  background-color: #64b5f6;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #42a5f5;
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
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
  const username = watch('username', '');

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
      value: /[!@#$%^&*()_+=-`~[\]{}|\\:;"'<>,.?/]/, // Расширенный набор спецсимволов
      message: 'Пароль повинен містити спецсимвол (!@#$%^&*()_+=-`~[]{}|\\:;"\'<>,.?/)',
    },
  };

  const isPasswordLongEnough = password.length >= passwordValidationRules.minLength.value;
  const hasUpperCase = passwordValidationRules.hasUpperCase.value.test(password);
  const hasLowerCase = passwordValidationRules.hasLowerCase.value.test(password);
  const hasDigit = passwordValidationRules.hasDigit.value.test(password);
  const hasSpecialChar = passwordValidationRules.hasSpecialChar.value.test(password);

  const clearUsername = () => {
    setValue('username', '', { shouldValidate: true }); // Clear username and re-validate
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
                {username && (
                  <ClearUsernameIcon onClick={clearUsername}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </ClearUsernameIcon>
                )}
              </Control>
              {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
              <InfoText>
                Будь ласка, введіть дійсний email. Ця інформація буде використана для входу та
                відновлення пароля.
              </InfoText>
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
            <FormGroup>
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
                <InfoText>Ознайомтеся з Умовами використання перед реєстрацією.</InfoText>
              )}
            </FormGroup>

            {/* Чекбокс "Потверждения успеха" */}
            <FormGroup>
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
                <InfoText>Реєстрація дозволена особам, які досягли 21 року.</InfoText>
              )}
            </FormGroup>

            {/* Чекбокс "Получать новости и акции" */}
            <FormGroup>
              <CheckboxWrapper>
                <input id="receiveNews" type="checkbox" {...register('receiveNews')} />
                <label htmlFor="receiveNews">
                  Я погоджуюсь отримувати акційні пропозиції, новини та бонуси від GGBET.UA
                </label>
              </CheckboxWrapper>
              <InfoText>Будьте в курсі останніх акцій та бонусів!</InfoText>
            </FormGroup>

            {/* Кнопка отправки */}
            <SubmitButton type="submit">Зареєструватися</SubmitButton>

            {/* Сообщение об успешной регистрации */}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          </Form>
        </RegistrationCol>

        {/* Правая колонка */}
        <RegistrationCol side="right">
          <RightColumnTitle>Реєструйтеся та отримуйте бонуси!</RightColumnTitle>
          <RightImage
            src="https://ggbet.ua/file/media:1dfedd6e201097b19e2c07fec24d5384b7c605f0ff?w=1000"
            alt="promo"
          />
          <RightColumnText>
            Приєднуйтесь до GGBET.UA та занурюйтесь у світ спортивних ставок та кіберспорту. Миттєві
            виплати, широка лінія та найкращі коефіцієнти чекають на вас!
          </RightColumnText>
          <RightColumnButton to="/promotions">Наші Акції</RightColumnButton>
        </RegistrationCol>
      </RegistrationContainer>
    </RegistrationSection>
  );
};

export default RegistrationForm;
