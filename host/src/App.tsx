import React from "react";
import Input from "./Input";

// @ts-expect-error remote/Button is a federated module.
const RemoteButton = React.lazy(() => import("remote/Button"));

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
