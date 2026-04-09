/**
 * Dynamic Quiz Component Helpers + Options-Only Renderer
 *
 * This module mirrors QuizPanel option behavior but delegates feedback display
 * entirely to FeedbackTextboxComponent through pageNFeedbackState/pageNFeedbackUpdate.
 */
(function () {
  const getQuizState = (stateKey) => {
    if (typeof window === "undefined") {
      return { selectedOption: null, isCorrect: false, disabledOptions: {} };
    }

    if (!window[stateKey]) {
      window[stateKey] = {
        selectedOption: null,
        isCorrect: false,
        disabledOptions: {},
      };
    }

    return window[stateKey];
  };

  const updateFeedbackState = (feedbackStateKey, feedbackEventName, mode, text) => {
    if (typeof window === "undefined") return;

    window[feedbackStateKey] = { mode, text };
    window.dispatchEvent(
      new CustomEvent(feedbackEventName, {
        detail: { mode, text },
      }),
    );
  };

  const handleSelection = ({
    pageNumber,
    selectedOption,
    isCorrect,
    feedbackText,
    stateKey,
    feedbackStateKey,
    feedbackEventName,
    correctFallbackText = "Correct!",
    incorrectFallbackText = "Try again.",
  }) => {
    if (typeof window === "undefined") return;

    const currentState = getQuizState(stateKey);
    const updatedDisabledOptions = {
      ...(currentState.disabledOptions || {}),
      ...(isCorrect ? {} : { [selectedOption]: true }),
    };

    window[stateKey] = {
      selectedOption,
      isCorrect,
      disabledOptions: updatedDisabledOptions,
    };

    if (window.playAnswerSound) {
      window.playAnswerSound(isCorrect);
    }

    const resolvedFeedbackText = feedbackText || (isCorrect ? correctFallbackText : incorrectFallbackText);
    const feedbackMode = isCorrect ? "correct" : "incorrect";
    updateFeedbackState(feedbackStateKey, feedbackEventName, feedbackMode, resolvedFeedbackText);

    if (window.PageCompletionManager && window.PageCompletionManager.setPageCompleted) {
      window.PageCompletionManager.setPageCompleted(pageNumber, isCorrect);
    }

    if (isCorrect) {
      window.dispatchEvent(
        new CustomEvent("quizCompleted", {
          detail: {
            pageNumber,
            isCorrect: true,
            selectedOption,
          },
        }),
      );
    }

    if (window.forceAppUpdate) {
      window.forceAppUpdate();
    }
  };

  const getOptionButtonPropsFromPage = (pageNumber, optionKey, buttonIdByOptionMap) => {
    if (
      typeof GridPositionPages === "undefined"
      || !GridPositionPages?.[pageNumber]
      || !buttonIdByOptionMap
    ) {
      return null;
    }

    const buttonId = buttonIdByOptionMap[optionKey];
    if (!buttonId) return null;

    const buttonConfig = GridPositionPages[pageNumber].find((item) => item?.id === buttonId);
    return buttonConfig?.props || null;
  };

  const getIsCorrectOptionFromPageProps = (
    pageNumber,
    optionKey,
    buttonIdByOptionMap,
    fallback = false,
  ) => {
    const props = getOptionButtonPropsFromPage(pageNumber, optionKey, buttonIdByOptionMap);
    const isCorrectOption = props?.isCorrectOption;
    return typeof isCorrectOption === "boolean" ? isCorrectOption : fallback;
  };

  const getOptionFeedbackFromPageProps = (
    pageNumber,
    optionKey,
    isCorrect,
    buttonIdByOptionMap,
    fallback = "",
  ) => {
    const props = getOptionButtonPropsFromPage(pageNumber, optionKey, buttonIdByOptionMap) || {};

    const text = isCorrect
      ? props.correctFeedbackText
      : props.incorrectFeedbackText;

    return typeof text === "string" && text.trim().length > 0 ? text : fallback;
  };

  const DynamicQuizOptionsComponent = React.memo((props) => {
    const localId = React.useId();
    const {
      id,
      quizId,
      pageNumber: pageNumberProp = null,
      options = [],
      optionButtonTextSize = "24gc",
      optionButtonTextColor = "#ffffff",
      optionButtonWidth = 90,
      optionButtonHeight = 80,
      layoutType = "columns",
      columns = 3,
      gap = "10gc",
      stateKey: stateKeyProp = null,
      feedbackStateKey: feedbackStateKeyProp = null,
      feedbackEventName: feedbackEventNameProp = null,
      position,
      processedStyles,
      elementZIndex,
    } = props;

    const resolvedPageNumber = React.useMemo(() => {
      if (typeof pageNumberProp === "number") return pageNumberProp;
      const sourceId = id || quizId || "";
      const match = sourceId.match(/page(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    }, [id, quizId, pageNumberProp]);

    const stateKey = stateKeyProp || `page${resolvedPageNumber || "X"}DynamicQuizState`;
    const feedbackStateKey = feedbackStateKeyProp || `page${resolvedPageNumber || "X"}FeedbackState`;
    const feedbackEventName = feedbackEventNameProp || `page${resolvedPageNumber || "X"}FeedbackUpdate`;

    const [, forceRerender] = React.useReducer((x) => x + 1, 0);
    const quizState = getQuizState(stateKey);

    const processedTextSize = React.useMemo(() => {
      if (
        optionButtonTextSize
        && typeof optionButtonTextSize === "string"
        && optionButtonTextSize.includes("gc")
        && window.GridCellFontUtils?.processGcProperty
      ) {
        return window.GridCellFontUtils.processGcProperty(optionButtonTextSize, "fontSize");
      }
      return optionButtonTextSize;
    }, [optionButtonTextSize]);

    const processedButtonRadius = React.useMemo(() => {
      const radius = "15gc";
      if (window.GridCellFontUtils?.processGcProperty) {
        return window.GridCellFontUtils.processGcProperty(radius, "borderRadius");
      }
      return "15px";
    }, []);

    const processedButtonPadding = React.useMemo(() => {
      const pad = "10gc";
      if (window.GridCellFontUtils?.processGcProperty) {
        return window.GridCellFontUtils.processGcProperty(pad, "padding");
      }
      return "10px";
    }, []);

    const containerStyle = React.useMemo(() => {
      const merged = {
        ...(position?.css || {}),
        ...(processedStyles || {}),
        zIndex: elementZIndex || 56,
        display: "flex",
        flexDirection: layoutType === "rows" ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap,
        boxSizing: "border-box",
      };

      if (window.GridCellFontUtils?.processGcStyles) {
        return window.GridCellFontUtils.processGcStyles(merged);
      }
      return merged;
    }, [position, processedStyles, elementZIndex, layoutType, gap]);

    const getButtonVisual = React.useCallback((optionKey, isCorrectOption) => {
      if (quizState.isCorrect && quizState.selectedOption === optionKey && isCorrectOption) {
        return { backgroundColor: "#44D57A", border: "4px solid #2E8B57", opacity: 1 };
      }
      if (quizState.disabledOptions?.[optionKey]) {
        return { backgroundColor: "#F28283", border: "4px solid #B94A48", opacity: 1 };
      }
      return { backgroundColor: "#695A3B", border: "4px solid #dfa539", opacity: 1 };
    }, [quizState]);

    const onOptionClick = React.useCallback((option, optionIndex) => {
      const optionKey = option.key || option.id || option.name || `option-${optionIndex}`;
      const isDisabled = quizState.isCorrect || quizState.disabledOptions?.[optionKey] === true;
      if (isDisabled) return;

      const isCorrect = option.iscorrect === true || option.isCorrectOption === true;
      const feedbackText = isCorrect
        ? (option.correctFeedbackText || option.feedback || "Correct!")
        : (option.incorrectFeedbackText || option.feedback || "Try again.");

      handleSelection({
        pageNumber: resolvedPageNumber || 0,
        selectedOption: optionKey,
        isCorrect,
        feedbackText,
        stateKey,
        feedbackStateKey,
        feedbackEventName,
      });

      forceRerender();
    }, [quizState, resolvedPageNumber, stateKey, feedbackStateKey, feedbackEventName]);

    return React.createElement(
      "div",
      {
      id: id || quizId || localId,
        className: "dynamic-quiz-options-only",
        style: containerStyle,
        "data-element-type": "dynamic-quiz",
        "data-page-number": resolvedPageNumber,
      },
      options.map((option, optionIndex) => {
        const optionKey = option.key || option.id || option.name || `option-${optionIndex}`;
        const isCorrectOption = option.iscorrect === true || option.isCorrectOption === true;
        const isDisabled = quizState.isCorrect || quizState.disabledOptions?.[optionKey] === true;
        const visual = getButtonVisual(optionKey, isCorrectOption);

        return React.createElement(
          "button",
          {
            key: optionKey,
            type: "button",
            onClick: () => onOptionClick(option, optionIndex),
            disabled: isDisabled,
            className: "dynamic-quiz-option-button",
            style: {
              width: `${optionButtonWidth}%`,
              height: `${optionButtonHeight}%`,
              backgroundColor: visual.backgroundColor,
              border: visual.border,
              borderRadius: processedButtonRadius,
              color: optionButtonTextColor,
              fontSize: processedTextSize,
              opacity: visual.opacity,
              cursor: isDisabled ? "not-allowed" : "pointer",
              whiteSpace: "pre-line",
              boxSizing: "border-box",
              padding: processedButtonPadding,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "data-option-key": optionKey,
          },
          option.text || option.label || `Option ${optionIndex + 1}`,
        );
      }),
    );
  });

  window.DynamicQuizComponent = {
    getQuizState,
    updateFeedbackState,
    handleSelection,
    getOptionButtonPropsFromPage,
    getIsCorrectOptionFromPageProps,
    getOptionFeedbackFromPageProps,
    DynamicQuizOptionsComponent,
  };

  console.log("DynamicQuizComponent loaded");
})();
