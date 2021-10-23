import FeatureTree from '../FeatureMap'
import React, {ReactElement} from "react";
import { Provider } from "react-redux";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {cleanup, render} from "@testing-library/react";
import { featureReducer } from '../reducers/featureReducer';
import {languageReducer} from "../../Language/languageReducer";
import '@testing-library/jest-dom/extend-expect';
import thunkMiddleware from "redux-thunk";

describe("Initial State Check", () => {
    afterEach(cleanup)

    it('Feature map exists', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        expect(getAllByTestId("feature_map")).toHaveLength(1);
    });

    it('Three check boxes exist', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        expect(getAllByTestId("checkBox")).toHaveLength(3);
    });

    it('Total Price is zero', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        expect(getAllByTestId("total")[0]).toHaveTextContent("Total: $0 / mo")
    });

    it('Save Button is disabled', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        expect(getAllByTestId("save_button")[0]).toBeDisabled();
    });
});

describe("Node Check", () => {
    afterEach(cleanup)

    it('Parent Expand', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[0].click()
        expect(getAllByTestId("checkBox")).toHaveLength(6);
    });

    it('Parent Expand and Collapse', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[0].click()
        expect(getAllByTestId("checkBox")).toHaveLength(6);
        getAllByTestId("checkBox")[0].click()
        expect(getAllByTestId("checkBox")).toHaveLength(3);
    });

    it('Click child', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[0].click()
        expect(getAllByTestId("checkBox")).toHaveLength(6);
        getAllByTestId("checkBox")[5].click()
        expect(getAllByTestId("checkBox")).toHaveLength(9);
    });

    it('Click leaf node', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[0].click()
        expect(getAllByTestId("checkBox")).toHaveLength(6);
        getAllByTestId("checkBox")[2].click()
        expect(getAllByTestId("checkBox")).toHaveLength(8);
        getAllByTestId("checkBox")[3].click()
        expect(getAllByTestId("checkBox")).toHaveLength(8);
    });

    it('Parent should not bwe disabled when leaf node is enabled', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[0].click()
        getAllByTestId("checkBox")[2].click()
        getAllByTestId("checkBox")[3].click()
        getAllByTestId("checkBox")[0].click()
        expect(getAllByTestId("checkBox")[0]).toBeChecked();
    });

    it('Check Price Tag', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[0].click()
        getAllByTestId("checkBox")[2].click()
        getAllByTestId("checkBox")[1].click()
        getAllByTestId("checkBox")[2].click()
        getAllByTestId("checkBox")[3].click()
        getAllByTestId("checkBox")[5].click()
        getAllByTestId("checkBox")[6].click()
        expect(getAllByTestId("price_tag")[0]).toHaveTextContent("130");
    });
});

describe("Save Button Enable/Disable", () => {
    it('Select Main Category', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[1].click()
        expect(getAllByTestId("save_button")[0]).toBeDisabled()
    });

    it('Select Sub Category', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[1].click()
        getAllByTestId("checkBox")[3].click()
        expect(getAllByTestId("save_button")[0]).toBeDisabled()
    });

    it('Select Feature', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[1].click()
        getAllByTestId("checkBox")[3].click()
        getAllByTestId("checkBox")[4].click()
        expect(getAllByTestId("save_button")[0]).toBeEnabled()
    });

    it('Press Save', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[1].click()
        getAllByTestId("checkBox")[3].click()
        getAllByTestId("checkBox")[4].click()
        expect(getAllByTestId("save_button")[0]).toBeEnabled()
        getAllByTestId("save_button")[0].click()
        expect(getAllByTestId("save_button")[0]).toBeDisabled()
    });

    it('Select Deselect', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[1].click()
        getAllByTestId("checkBox")[3].click()
        getAllByTestId("checkBox")[4].click()
        getAllByTestId("checkBox")[4].click()
        expect(getAllByTestId("save_button")[0]).toBeDisabled()
    });
});

describe("Calculate Cost", () => {
    it('Check Total Cost', async () => {
        const { getAllByTestId } = useReduxWrapper(<FeatureTree />)
        getAllByTestId("checkBox")[1].click()
        getAllByTestId("checkBox")[3].click()
        getAllByTestId("checkBox")[2].click()
        getAllByTestId("checkBox")[7].click()
        getAllByTestId("checkBox")[6].click()
        getAllByTestId("checkBox")[4].click()
        getAllByTestId("checkBox")[3].click()
        expect(getAllByTestId("total")[0]).toHaveTextContent("Total: $130 / mo")
    });
});

export function createTestStore() {
    const rootReducer = combineReducers({
        features: featureReducer,
        messages: languageReducer,
    });
    const middleware = applyMiddleware(thunkMiddleware);
    return middleware(createStore)(rootReducer);
}

function useReduxWrapper(Component: ReactElement) {
    return render(
        <Provider store={createTestStore()}>
            {Component}
        </Provider>
    );
}