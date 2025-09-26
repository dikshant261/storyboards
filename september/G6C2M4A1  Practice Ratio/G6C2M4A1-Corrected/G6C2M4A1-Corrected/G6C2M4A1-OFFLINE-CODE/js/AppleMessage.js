const AppleMessage = ({
  stepOne,
  stepTwo,
  boxResultOne,
  correctOption,
  options,
  flag,
}) => {
  if (flag === 1) {
    return React.createElement(
      'div',
      null,
      stepOne && React.createElement(
        'div',
        null,
        boxResultOne === correctOption[0]
          ? React.createElement(
              'p',
              { className: 'success-message' },
              t('successTwo', { count: correctOption[0] })
            )
          : boxResultOne === options[3]
          ? React.createElement(
              'p',
              { className: 'error-message' },
              t('triangleErrorTwo')
            )
          : React.createElement(
              'p',
              { className: 'error-message' },
              t('triangleErrorOne')
            )
      ),
      stepTwo && React.createElement(
        'div',
        null,
        boxResultOne === correctOption[1]
          ? React.createElement(
              'p',
              { className: 'success-message' },
              t('successTwo', { count: correctOption[1] })
            )
          : boxResultOne === options[1]
          ? React.createElement(
              'p',
              { className: 'error-message' },
              t('pentagonErrorTwo')
            )
          : React.createElement(
              'p',
              { className: 'error-message' },
              t('pentagonErrorOne')
            )
      )
    );
  }
  if (flag === 2) {
    return React.createElement(
      'div',
      null,
      stepOne && React.createElement(
        'div',
        null,
        boxResultOne === correctOption[0]
          ? React.createElement(
              'p',
              { className: 'success-message' },
              t('great'),
              React.createElement(
                'span',
                { className: 'option-fraction-error' },
                React.createElement('span', null, '9'),
                React.createElement('span', { className: 'fraction-line-error' }),
                React.createElement('span', null, '14')
              ),
              t('successThree')
            )
          : boxResultOne === options[3]
          ? React.createElement(
              'p',
              { className: 'error-message' },
              t('boyFirstErrorTwo')
            )
          : React.createElement(
              'p',
              { className: 'error-message' },
              t('boyFirstErrorOne')
            )
      ),
      stepTwo && React.createElement(
        'div',
        null,
        boxResultOne === correctOption[1]
          ? React.createElement(
              'p',
              { className: 'success-message' },
              t('great'),
              React.createElement(
                'span',
                { className: 'option-fraction-error' },
                React.createElement('span', null, '14'),
                React.createElement('span', { className: 'fraction-line-error' }),
                React.createElement('span', null, '9')
              ),
              t('successThree')
            )
          : boxResultOne === options[1]
          ? React.createElement(
              'p',
              { className: 'error-message' },
              t('girlsFirstErrorTwo')
            )
          : React.createElement(
              'p',
              { className: 'error-message' },
              t('girlsFirstErrorOne')
            )
      )
    );
  }
  if (flag === 3) {
    return React.createElement(
      'div',
      null,
      stepOne && React.createElement(
        'div',
        null,
        boxResultOne === correctOption[0]
          ? React.createElement(
              'p',
              { className: 'success-message' },
              t('successTwo', { count: correctOption[0] })
            )
          : boxResultOne === options[3]
          ? React.createElement(
              'p',
              { className: 'error-message' },
              t('bananaFirstErrorTwo')
            )
          : React.createElement(
              'p',
              { className: 'error-message' },
              t('bananaFirstErrorOne')
            )
      ),
      stepTwo && React.createElement(
        'div',
        null,
        boxResultOne === correctOption[1]
          ? React.createElement(
              'p',
              { className: 'success-message' },
              t('successTwo', { count: correctOption[1] })
            )
          : boxResultOne === options[1]
          ? React.createElement(
              'p',
              { className: 'error-message' },
              t('appleFirstErrorTwo')
            )
          : React.createElement(
              'p',
              { className: 'error-message' },
              t('appleFirstErrorOne')
            )
      )
    );
  }
  if (flag === 4) {
    return React.createElement(
      'div',
      null,
      stepOne && React.createElement(
        'div',
        null,
        boxResultOne === correctOption[0]
          ? React.createElement(
              'p',
              { className: 'success-message' },
              t('successTwo', { count: correctOption[0] })
            )
          : boxResultOne === options[3]
          ? React.createElement(
              'p',
              { className: 'error-message' },
              t('studentErrorTwo')
            )
          : React.createElement(
              'p',
              { className: 'error-message' },
              t('studentErrorOne')
            )
      ),
      stepTwo && React.createElement(
        'div',
        null,
        boxResultOne === correctOption[1]
          ? React.createElement(
              'p',
              { className: 'success-message' },
              t('successTwo', { count: correctOption[1] })
            )
          : boxResultOne === options[1]
          ? React.createElement(
              'p',
              { className: 'error-message' },
              t('studentPalygroundTwo')
            )
          : React.createElement(
              'p',
              { className: 'error-message' },
              t('studentPalygroundOne')
            )
      )
    );
  }
  return React.createElement(
    'div',
    null,
    stepOne && React.createElement(
      'div',
      null,
      boxResultOne === correctOption[0]
        ? React.createElement(
            'p',
            { className: 'success-message' },
            t('successTwo', { count: correctOption[0] })
          )
        : boxResultOne === options[3]
        ? React.createElement(
            'p',
            { className: 'error-message' },
            t('appleErrorOne')
          )
        : React.createElement(
            'p',
            { className: 'error-message' },
            t('appleErrorTwo')
          )
    ),
    stepTwo && React.createElement(
      'div',
      null,
      boxResultOne === correctOption[1]
        ? React.createElement(
            'p',
            { className: 'success-message' },
            t('successTwo', { count: correctOption[1] })
          )
        : boxResultOne === options[1]
        ? React.createElement(
            'p',
            { className: 'error-message' },
            t('orangeErrorOne')
          )
        : React.createElement(
            'p',
            { className: 'error-message' },
            t('orangeErrorTwo')
          )
    )
  );
};

window.AppleMessage= AppleMessage;
