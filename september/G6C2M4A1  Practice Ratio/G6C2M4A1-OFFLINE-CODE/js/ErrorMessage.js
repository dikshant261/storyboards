function ErrorMessage({
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  correctOption,
  options,
}) {
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
            ' ',
            correctOption[0],
            ' ',
            t('success', { word: 'symbol' })
          )
        : boxResultOne === options[5]
        ? React.createElement(
            'p',
            { className: 'error-message' },
            t('dogErrortwo')
          )
        : React.createElement(
            'p',
            { className: 'error-message' },
            t('dogErrorone', { word: 'symbol :' })
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
            ' ',
            correctOption[1],
            ' ',
            t('success', { word: 'word' })
          )
        : boxResultOne === options[2]
        ? React.createElement(
            'p',
            { className: 'error-message' },
            t('dogErrortwo')
          )
        : React.createElement(
            'p',
            { className: 'error-message' },
            t('dogErrorone', { word: 'word to' })
          )
    ),
    stepThree && React.createElement(
      'div',
      null,
      boxResultOne === correctOption[2]
        ? React.createElement(
            'p',
            { className: 'success-message' },
            t('great'),
            ' ',
            React.createElement(
              'span',
              { className: 'option-fraction-error' },
              React.createElement('span', null, '3'),
              React.createElement('span', { className: 'fraction-line-error' }),
              React.createElement('span', null, '2')
            ),
            t('success', { word: 'fraction' })
          )
        : boxResultOne === options[4]
        ? React.createElement(
            'p',
            { className: 'error-message' },
            t('dogErrorFraction')
          )
        : React.createElement(
            'p',
            { className: 'error-message' },
            t('dogErrorone', { word: 'fraction form' })
          )
    )
  );
}
window.ErrorMessage = ErrorMessage;