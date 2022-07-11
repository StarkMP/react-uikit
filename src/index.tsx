import './styles/fonts.scss';

// Components
export { default as Icons } from './components/Icons';
export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
export { default as Form } from './components/Form';
export { default as Modal } from './components/Modal';
export { default as Select } from './components/Select';
export { default as Dropdown } from './components/Dropdown';
export { default as Switcher } from './components/Switcher';

// Misc
export { useNotifications } from './components/Notification/Provider';
export { default as useOutsideClick } from './hooks/useOutsideClick';
export { Palette } from './utils/theme';
export { default as UIKitProvider } from './components/Provider';

// Types
export type { ButtonProps } from './components/Button';
export type { InputProps } from './components/Input';
export type { ModalProps } from './components/Modal';
export type { SelectProps } from './components/Select';
export type { DropdownProps } from './components/Dropdown';
export type { SwitcherProps } from './components/Switcher';
export type {
  FormValues,
  FormValidation,
  FormEvent,
  FormProps,
  FormSubmitArguments,
  FormValidationFailedArguments,
} from './components/Form/types';
export { ValidationRule } from './components/Form/types';
export type { ProviderOptions as UIKitProviderProps } from './components/Provider';
