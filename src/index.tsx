// Icons
export { default as Icons } from './components/Icons';

import './styles/fonts.scss';

// Components
export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
export { default as Form } from './components/Form';
export { default as Modal } from './components/Modal';
export { default as Select } from './components/Select';

// Hooks
export { default as useOutsideClick } from './hooks/useOutsideClick';

// Utils
export { Palette } from './utils/theme';

// Types
export type { ButtonProps } from './components/Button';
export type { InputProps } from './components/Input';
export type { ModalProps } from './components/Modal';
export type { SelectProps } from './components/Select';
export type {
  FormValues,
  FormValidation,
  FormEvent,
  FormProps,
  FormSubmitArguments,
  FormValidationFailedArguments,
} from './components/Form/types';
export { ValidationRule } from './components/Form/types';
