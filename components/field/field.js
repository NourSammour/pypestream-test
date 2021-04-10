import { Field as FormikField } from 'formik';
import PropTypes from 'prop-types';

export function Field({ children, name, label }) {
  return (
    <p>
      <FormikField name={name}>
        {field => (
          <>
            <label htmlFor={name}>{label}</label>
            {field.meta.touched &&
              field.meta.error && <mark>{field.meta.error}</mark>}
            <br />
            {children(field)}
          </>
        )}
      </FormikField>
    </p>
  );
}

Field.propTypes = {
  onSelect: PropTypes.func
};