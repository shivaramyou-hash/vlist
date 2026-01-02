// eslint-disable-next-line
import { omit } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import toast from '../../components/Toast';

const useCreateUserValidation = ({ callback }) => {
  const { t } = useTranslation('translations');
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user.userData);
  const validate = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value) {
          setErrors({ ...errors, firstName: 'Please fill the details' });
        } else {
          if (!/^[A-Za-z][A-Za-z ]*[A-Za-z]?$/.test(value)) {
            setErrors({
              ...errors,
              firstName: 'Please enter only alphabets',
            });
          } else if (typeof value === 'string') {
            let newObj = omit(errors, 'firstName');
            setErrors(newObj);
          }
        }
        break;

      case 'lastName':
        if (!value) {
          setErrors({ ...errors, lastName: 'Please fill the details' });
        } else {
          if (!/^[A-Za-z][A-Za-z ]*[A-Za-z]?$/.test(value)) {
            setErrors({
              ...errors,
              lastName: 'Please enter only alphabets',
            });
          } else if (typeof value === 'string') {
            let newObj = omit(errors, 'lastName');
            setErrors(newObj);
          }
        }

        break;

      case 'email':
        if (!value) {
          setErrors({
            ...errors,
            email: 'Please fill the details',
          });
        } else {
          if (
            !/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
              value
            )
          ) {
            setErrors({
              ...errors,
              email: 'Please enter a valid email address',
            });
          } else if (typeof value === 'string') {
            let newObj = omit(errors, 'email');
            setErrors(newObj);
          }
        }
        break;

      case 'phone':
        if (!value) {
          setErrors({
            ...errors,
            phone: 'Please fill in the details',
          });
        } else if (!/^\d{5,15}$/.test(value)) {
          setErrors({
            ...errors,
            phone: 'Please enter a valid phone number with 5 to 15 digits.',
          });
        } else {
          let newObj = omit(errors, 'phone');
          setErrors(newObj);
        }
        break;

      case 'password':
        if (!value) {
          setErrors({
            ...errors,
            password: 'Please enter your new password',
          });
        } else {
          if (value.length < 8 || value.length > 16) {
            setErrors({
              ...errors,
              password: 'Password must be between 8 and 16 characters',
            });
          } else if (!/[A-Z]/.test(value)) {
            setErrors({
              ...errors,
              password: 'Password must contain at least one uppercase letter',
            });
          } else if (!/[a-z]/.test(value)) {
            setErrors({
              ...errors,
              password: 'Password must contain at least one lowercase letter',
            });
          } else if (!/[0-9]/.test(value)) {
            setErrors({
              ...errors,
              password: 'Password must contain at least one number',
            });
          } else if (!/[^\w\s]/.test(value)) {
            setErrors({
              ...errors,
              password: 'Password must contain at least one special character',
            });
          } else {
            let newObj = omit(errors, 'password');
            setErrors(newObj);
          }
        }

        break;

      case 'role':
        if (value === 'select' || !value) {
          setErrors({ ...errors, role: 'select role' });
        } else {
          let newObj = omit(errors, 'role');
          setErrors(newObj);
        }
        break;

      case 'portalRole':
        if (value === 'select' || !value) {
          setErrors({ ...errors, portalRole: 'select role' });
        } else {
          let newObj = omit(errors, 'portalRole');
          setErrors(newObj);
        }
        break;
      default:
    }
  };

  const handleChange = (e, value, newVal, label) => {
    let name = newVal === true ? label : e.target.name;
    let val = newVal === true ? value : e.target.value;
    validate(name, val);

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const mandatoryFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'phone',
      'role',
      'portalRole',
    ];

    const emptyFields = mandatoryFields.filter((fieldName) => {
      const value = values[fieldName];
      if (
        fieldName === 'orgId' ||
        fieldName === 'portalRole' ||
        fieldName === 'department' ||
        fieldName === 'role' ||
        fieldName === 'empType'
      ) {
        return !values.hasOwnProperty(fieldName) || !value;
      } else {
        // Handle other input fields
        return (
          !values.hasOwnProperty(fieldName) ||
          typeof value !== 'string' ||
          value.trim() === ''
        );
      }
    });

    if (emptyFields.length > 0) {
      // Show toast message for empty fields
      toast(t('Please_fill'));

      // Set red borders for empty fields
      const emptyFieldErrors = emptyFields.reduce((acc, fieldName) => {
        return {
          ...acc,
          [fieldName]: 'Please fill the details',
        };
      }, {});

      setErrors((prev) => {
        return {
          ...prev,
          ...emptyFieldErrors,
        };
      });

      return;
    }

    // Validate all fields
    const newErrors = {};
    for (const [name, value] of Object.entries(values)) {
      const validationError = validate(name, value);
      if (validationError) {
        newErrors[name] = validationError;
      }
    }

    setErrors(newErrors);

    if (Object.keys(errors).length > 0) {
      toast(t('Please_Enter'));
      setErrors(errors);
    } else {
      callback();
    }
  };

  return {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    setValues,
  };
};

export default useCreateUserValidation;
