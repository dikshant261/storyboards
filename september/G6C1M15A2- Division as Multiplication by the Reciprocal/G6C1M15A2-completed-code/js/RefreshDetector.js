const RefreshDetector = ({
  onRefresh
}) => {
  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries[0].type === "reload") {
      sessionStorage.clear();
    }
  }, [onRefresh]);
  return null; // this component doesn't render anything
};
window.RefreshDetector=RefreshDetector