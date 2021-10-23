import React, {ReactElement, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStore,
  setCheckStatus,
  setExpand,
} from "./actions/subscriberActions";
import {Feature} from "./types/featureInterfaces";
import CheckBoxPair from "./CheckBoxPair";
import "../styles/featureMap.scss";
import {RootState} from "./types/types";
import {getLocaleString} from "../Language/selector";

type props = {
  feature: Feature
}

function FeatureNode({ feature } : props): ReactElement {
  const dispatch = useDispatch();

  const features = useSelector((state :RootState) => {
    return state.features.features;
  });

  const onAddOrRemove = useCallback(() => {
    dispatch(setCheckStatus(feature));
    dispatch(setExpand(feature.featureId));
  }, [feature, dispatch]);

  return (
    <li className={"feature_node"}>
      <div className={"feature_contents"}>
        <CheckBoxPair
          onChange={onAddOrRemove}
          label={feature.name}
          id={feature.featureId}
          checkedStatus={feature.checked}
        />
        <label data-testid="price_tag">{getPriceLabel(feature)}</label>
      </div>
      {feature.expanded && (
        <ul>
          {features
            .filter((f) => f.parentId === feature.featureId)
            .map((fe) => (
              <FeatureNode key={fe.featureId} feature={fe} />
            ))}
        </ul>
      )}
    </li>
  );
}

export default function FeatureTree(): ReactElement {
  const dispatch = useDispatch();
  const features = useSelector((state: RootState) => {
    return state.features.features;
  });

  const save = useCallback(() => {
    //call saveSubscriptions() to save selected features
    dispatch(clearStore())
  }, [dispatch, features]);

  return (
    <div className="feature_map" data-testid="feature_map">
      <div className={"title_div"}>{"Subscription Preferences"}</div>
      <hr />
      <ul className={"tree_container"}>
        {features
          .filter((feature) => !feature.parentId)
          .map((feature) => (
            <FeatureNode key={feature.featureId} feature={feature} />
          ))}
      </ul>
      <div>
        <hr />
        <div className={"bottom_container"}>
          <label className={"total_label"} data-testid="total">
            {"Total: $" + calculateTotal(features) + " / mo"}
          </label>
          <button data-testid="save_button" onClick={save} disabled={calculateTotal(features) === 0}>{"Save"}</button>
        </div>
      </div>
    </div>
  );
}

function calculateTotal(features: Feature[]) {
  let total = 0;
  features.forEach((feature) => {
    if (!feature.path && feature.sum) {
      total += feature.sum;
    }
  });

  return total;
}

function getPriceLabel(feature: Feature) {
  const price = feature.sum || feature.price;
  return price ? getLocaleString("price", [price.toString()]) : getLocaleString("no_price");
  //return "(" + (price ? "$" + price : "-") + ")";
}
