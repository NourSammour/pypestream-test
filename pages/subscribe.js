import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import { Field } from '../components';
import useSWR from 'swr';
const fetcher = url => axios.get(url).then(res => res.data);

const SubscribeSchema = Yup.object().shape({
  topic: Yup.string()
    .matches(/^\b[a-zA-Z0-9_]+\b$/, 'One word only')
    .required('Required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});
const initialValues = { email: '', topic: '' };
export default function Subscribe() {
  const { data } = useSWR('/api/topics', fetcher);

  return (
    <main>
      <p>
        <Link href="/publish">Publish email</Link>
      </p>
      <p>
        <em>Add new subscriber form</em>
      </p>
      <Formik
        validationSchema={SubscribeSchema}
        initialValues={initialValues}
        onSubmit={async (
          values,
          { setErrors, resetForm, setStatus, setValues }
        ) => {
          const url = '/api/add-subscriber';
          axios
            .post(url, values)
            .then(() => {
              resetForm();
              setStatus({ message: 'Saved' });
            })
            .catch(err => {
              setErrors({ email: err.response.data.error });
            });
        }}
      >
        {({ status }) => {
          return (
            <Form>
              <Field name="email" label="Email:">
                {({ field }) => <input {...field} id={field.name} />}
              </Field>
              <Field name="topic" label="Topic:">
                {({ field, form }) => (
                  <>
                    <input {...field} id={field.name} />
                    <br />
                    {data?.rows ? (
                      <>
                        Select Topic or create new one:
                        <br />
                        {data.rows.map(item => (
                          <React.Fragment key={item.id}>
                            <button
                              type="button"
                              onClick={() => {
                                form.setFieldValue('topic', item.name);
                              }}
                            >
                              {item.name}
                            </button>{' '}
                          </React.Fragment>
                        ))}
                      </>
                    ) : null}
                  </>
                )}
              </Field>
              <button type="submit">Subscribe</button>{' '}
              {status?.message ? <mark>{status.message}</mark> : null}
            </Form>
          );
        }}
      </Formik>
    </main>
  );
}
