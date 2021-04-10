import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const fetcher = url => axios.get(url).then(res => res.data);

export function PublishedMessages({ onSelect }) {
  const [filter, setFilter] = useState('');
  const { data, error, mutate } = useSWR('/api/published-emails', fetcher);

  const messagesFilterHandler = useCallback(
    item =>
      filter
        ? item.to_email.includes(filter) || item.message_text.includes(filter)
        : true,
    [filter]
  );

  if (error) {
    return <mark>{error}</mark>;
  }
  return (
    <>
      <p>Published Messages</p>
      <button onClick={() => mutate()}>Refresh</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Filter published messages"
        onChange={event => setFilter(event.target.value)}
      />
      {data?.messages.filter(messagesFilterHandler).map(message => (
        <blockquote key={message.id}>
          <p>{message.to_email}</p>
          <p>
            <em>{message.message_text}</em>
          </p>
          <p>
            <code>{format(parseISO(message.sent_at), 'dd/MM/yyyy')}</code>{' '}
            <button onClick={() => onSelect(message.message_text)}>
              Use this message
            </button>
          </p>
        </blockquote>
      ))}
    </>
  );
}

PublishedMessages.propTypes = {
  onSelect: PropTypes.func
};
