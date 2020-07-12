import React from 'react';
import { notification } from 'antd';

export default (err) => {
  if (err.response) {
    const { response } = err;
    const { statusCode, body, statusText } = response;
    if (statusCode === 422) {
      notification.error({
        message: 'Sorry..',
        description: (
          <ul>
            {body.errors.map((er) => (
              <li>
                {er.param}
                {' '}
                -
                {' '}
                {er.msg}
              </li>
            ))}
          </ul>
        ),
        placement: 'bottomRight',
      });
    } else if (statusCode === 401) {
      notification.error({
        message: 'Sorry..',
        description: statusText,
        placement: 'bottomRight',
      });
    }
  } else {
    notification.error({
      message: 'Sorry..',
      description: 'Server Error',
      placement: 'bottomRight',
    });
  }
};
