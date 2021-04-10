import Head from 'next/head';
import Link from 'next/link';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const SubscribeSchema = Yup.object().shape({
  topic: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

export default function Home() {
  return (
    <main>
      <blockquote>
        To subscribe to our newsletter <Link href="/subscribe">Click here</Link>
      </blockquote>
      <blockquote>
        To publish newsletter <Link href="/publish">Click here</Link>
      </blockquote>
    </main>
  );
}
