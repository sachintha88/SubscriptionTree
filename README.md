# Getting Started with Subscription Feature

This Document will explain how to get the code run, approach to solve the problem, and assumptions

## How to run the script

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Approach
As the initial data, we have an array of objects which are nodes of a tree-like structure where each leaf has a price attached. \
By clicking on each parent node, users can expand their children.\
\
Each leaf node is a service that users may consider purchasing. By clicking each child (if it is a leaf) users can subscribe to features. \
Idea is to create the UI to represent the structure and calculate the total price for the whole tree and each parent node correspondingly.

Each feature is represented by an object like this:
```
Feature {
       featureId: number;
       parentId: number | null,
       path: string,
       name: string,
       sum?: number,
       price?: number,
       expanded: boolean,
       checked: boolean,
   }
```

#####Mandatory Fields
`feaureId` uniquely represents each feature. \
`parentId` shows the relationship with its parent if any. \
`path` shows the ancestry of the nodes. \
`name` contains the name of the feature. \
`expanded` is a boolean value that stores the status of the node expansion. \
`checked` is a boolean value that represents the status user's choice.

#####Optional Fields
`sum` represents the sum of the price that is calculated by adding the cost of each child that has been selected by the user (only parent nodes have this field). \
`price` represents the value of the service (only child nodes have this field).

####UI Implementation
By iteration through the array of `Feature` objects logic determines the placement of each node and place it where it should represent in the tree. \
Each node will be accompanied by a `CheckBox` component, name, and price label. \
Bottom pain shows the total sum of the services selected by the user.\
By clicking the `save` button in to bottom right corner, users shall send a web service call to the server to save the selection.

#####Tree Representation
 X Parent($50)\
 |________ O Child1(-)\
 |________ O Child2(-)\
 |________ X Child3($50)\
 &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__________ O GrandChild($20)\
  &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__________ X GrandChild($10)\
   &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__________ X GrandChild($40)
    
##Assumptions
When a user selects a `child` node, the user *cannot* uncheck a `parent` node. \
Users won't completely unsubscribe the products as `Total : $0 /mo` would disable to `Save` button.

##Future Improvements
1. Simplify `Feature` object (Eg: by removing fields like `parentId` and use the `path` to determine the parent. \
`caution: this could reduce the performance.` 
2. Write more unit tests to validate the components.
3. Conduct a proper dependency analysis to reduce the bundle size.
4. Use strict Typescript validation.
5. Do a performance tuneup using browser profiler ect.
6. Localize Strings (This feature is 80% done)

