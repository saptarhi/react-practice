import React from "react";
import ControlledForm from "./components/ControlledForm";
import UncontrolledForm from "./components/UncontrolledForm";
import FormRHFZod from "./components/FormRHFZod";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="forms-container">
        <div className="form-box">
          <h2 className="form-title">Controlled Components</h2>
          <ControlledForm />
        </div>
        <div className="form-box">
          <h2 className="form-title">Uncontrolled Components</h2>
          <UncontrolledForm />
        </div>
        <div>
          <h2 className="form-title">Form with React Hook Form + Zod</h2>
          <FormRHFZod />
        </div>
      </div>
    </div>
  );
}
