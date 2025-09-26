const Option = ({
  option,
  correctOption,
  response,
  result,
  errorShow,
  flag,
  boxCss,
  reset,
}) => {
  const correct = correctOption;
  const questionIndex = flag; // flag represents the question index (0-3)
  const sceneName = SceneStateManager.getSceneName(questionIndex);
  
  // Initialize from scene state
  const [clickedButtons, setClickedButtons] = React.useState(() => {
    return SceneStateManager.getSceneState(sceneName).clickedButtons;
  });
  const [disabledButtons, setDisabledButtons] = React.useState(() => {
    return SceneStateManager.getSceneState(sceneName).disabledButtons;
  });
  const [answered, setAnswered] = React.useState(() => {
    return SceneStateManager.getSceneState(sceneName).answered;
  });

  // Sync local state with scene state when questionIndex changes
  React.useEffect(() => {
    const sceneState = SceneStateManager.getSceneState(sceneName);
    setClickedButtons(sceneState.clickedButtons);
    setDisabledButtons(sceneState.disabledButtons);
    setAnswered(sceneState.answered);
  }, [questionIndex, sceneName]);

  // Reset state when reset prop changes to true
  React.useEffect(() => {
    if (reset) {
      setClickedButtons([]);
      setDisabledButtons([]);
      setAnswered(false);
      // Clear scene state
      SceneStateManager.resetSceneState(sceneName);
    }
  }, [reset, sceneName]);

  const handleClick = (opt, index) => {
    // Don't process if already answered or button already disabled
    if (answered || disabledButtons.includes(index)) return;
    
    // Call response handler first
    response(opt);

    if (opt === correct) {
      const newClickedButtons = [...clickedButtons, index];
      const newDisabledButtons = [0, 1, 2, 3];
      setClickedButtons(newClickedButtons);
      setDisabledButtons(newDisabledButtons);
      setAnswered(true);
      
      // Save to scene state
      SceneStateManager.updateSceneState(sceneName, {
        clickedButtons: newClickedButtons,
        disabledButtons: newDisabledButtons,
        answered: true,
        feedbackShown: true,
        feedbackType: 'correct',
        result: opt,
        showTap: false,
        showNext: true,
        boxCss: 'correct-box'
      });
    } else {
      const newClickedButtons = [...clickedButtons, index];
      const newDisabledButtons = [...disabledButtons, index];
      setClickedButtons(newClickedButtons);
      setDisabledButtons(newDisabledButtons);
      
      // Save to scene state
      SceneStateManager.updateSceneState(sceneName, {
        clickedButtons: newClickedButtons,
        disabledButtons: newDisabledButtons,
        answered: false,
        feedbackShown: true,
        feedbackType: 'incorrect',
        result: opt,
        showTap: true,
        showNext: false,
        boxCss: 'wrong-box'
      });
    }
  };

  return React.createElement(
    "div",
    { className: "option-container" },

    // Options grid
    React.createElement(
      "div",
      { className: "option-grid" },
      option.map((opt, index) => {
        let btnClass = "";
        if (opt === correct && answered) {
          btnClass = "correct";
        } else if (clickedButtons.includes(index) && opt !== correct) {
          btnClass = "wrong";
        }

        return React.createElement(
          "button",
          {
            key: index,
            onClick: () => handleClick(opt, index),
            disabled: answered || disabledButtons.includes(index),
            className: btnClass,
          },
          opt
        );
      })
    ),

    // Feedback Box
    React.createElement(
      "div",
      { className: `feedback-box ${boxCss}` },
      errorShow
        ? React.createElement(ErrorMessage, {
            result,
            flag,
            correctOption,
          })
        : null
    )
  );
};
window.Option=Option;