import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { Field, PublishedMessages } from '../components';
const fetcher = url => axios.get(url).then(res => res.data);

const SubscribeSchema = Yup.object().shape({
  topic: Yup.string().required('Required'),

  message: Yup.string().required('Required')
});

export default function Publish() {
  const [message, setMessage] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const { data } = useSWR('/api/topics', fetcher);
  useEffect(() => {
    const code = prompt('Enter access code to proceed!', '');
    setAccessCode(code);
  }, []);

  if (accessCode !== 'admin') {
    return accessCode ? (
      <p>
        <mark>Error</mark> You can not view this page, Invalid access code.
        <br />
        Refresh page and try again
      </p>
    ) : null;
  }

  return (
    <main>
      <p>
        <Link href="/subscribe">Add Subscriber </Link>
      </p>
      <p>
        <em>Publish email form</em>
      </p>
      <Formik
        validationSchema={SubscribeSchema}
        enableReinitialize={true}
        initialValues={{ message: message, topic: '' }}
        onSubmit={async (values, { setErrors, resetForm, setStatus }) => {
          const url = '/api/publish-email';
          axios
            .post(url, values)
            .then(() => {
              resetForm();
              setStatus({ message: 'Sent' });
            })
            .catch(err => {
              setErrors({ message: err.response.data.error });
            });
        }}
      >
        {({ status }) => {
          return (
            <Form>
              <Field name="message" label="Message:">
                {({ field }) => <textarea {...field} id={field.name} />}
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
              <button type="submit">Publish</button>
              {status?.message ? <mark>{status.message}</mark> : null}
            </Form>
          );
        }}
      </Formik>
      <hr />
      <PublishedMessages onSelect={messageBody => setMessage(messageBody)} />
    </main>
  );
}
