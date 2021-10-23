import React, { useEffect } from "react";
import FeatureTree from "./FeatureMap/FeatureMap";
import { useDispatch } from "react-redux";
import { loadLanguage } from "./Language/resourceActions";

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(loadLanguage());
  }, [dispatch]);

  return (
    <div className="App">
      <FeatureTree />
    </div>
  );
}

export default App;
