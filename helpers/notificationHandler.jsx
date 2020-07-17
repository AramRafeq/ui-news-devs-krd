import React from 'react';
import { notification } from 'antd';

export default (err) => {
  if (err.response) {
    const { response } = err;
    const { statusCode, body, statusText } = response;
    if (statusCode === 422) {
      notification.error({
        message: 'ببوره‌...',
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
        message: 'ببوره‌...',
        description: response.body.msg || statusText,
        placement: 'bottomRight',
      });
    } else if (statusCode === 404) {
      notification.error({
        message: 'ببوره‌...',
        description: response.body.msg,
        placement: 'bottomRight',
      });
    }
  } else {
    notification.error({
      message: 'ببوره‌...',
      description: 'هه‌ڵه‌یه‌ك له‌ راژه‌ رویدا',
      placement: 'bottomRight',
    });
  }
};
