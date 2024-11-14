import ReactDOM from "react-dom";
import React from "react";
import { init, loadRemote } from "@module-federation/runtime";

import Input from "./Input";

import pkg from "../package.json";
const deps = pkg.dependencies;

init({
  name: "host-runtime",
  remotes: [
    {
      name: "remote",
      entry: "http://localhost:3002/remoteEntry.js",
    },
  ],
  shared: {
    react: {
      version: deps.react,
      scope: "default",
      lib: () => React,
      shareConfig: { singleton: true, requiredVersion: deps.react },
    },
    "react-dom": {
      version: deps["react-dom"],
      lib: () => ReactDOM,
      scope: "default",
      shareConfig: { singleton: true, requiredVersion: deps["react-dom"] },
    },
  },
});

const RemoteButton = React.lazy(() => loadRemote("remote/Button"));

const App = () => (
  <div>
    <h1>Host app</h1>
    <h2>Host own components</h2>
    <Input />
    <h2>Remote components</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton size="large" />
      <br />
      <RemoteButton size="small" />
    </React.Suspense>
  </div>
);

export default App;
