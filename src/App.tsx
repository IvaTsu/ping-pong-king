import "./App.css";

import { GoogleLogin } from "@react-oauth/google";

import { decodeJWT } from "./utils/decodeJWT";

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="card">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = decodeJWT(credentialResponse.credential);
            console.log(credentialResponse);
            console.log({ decoded });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
}

export default App;
