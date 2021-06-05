import React, { useRef, useState } from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonCol,
  IonInput,
  IonAlert,
} from "@ionic/react";

import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/InputControl";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () =>  {
const [calculatedBmi, setCalculatedBmi] = useState<number | string>()
const [error, setError] = useState<string>()
const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg")

const weightInputRef = useRef<HTMLIonInputElement>(null);
const heightInputRef = useRef<HTMLIonInputElement>(null);
const inchesInputRef = useRef<HTMLIonInputElement>(null);

const calculateBMI = () => {
  const enteredWeight = weightInputRef.current!.value;
  const enteredHeight = heightInputRef.current!.value;
  const enteredInches = inchesInputRef.current?.value;

  if (!enteredHeight || !enteredWeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
    setError("Please enter a valid number!")
    return;
  }

  if (calcUnits === "ftlbs" && (!enteredInches || +enteredInches < 0)) {
    return;
  }


  const weightConversionFactor = calcUnits === "ftlbs" ? 2.205 : 1;
  const heightConversionFactor = calcUnits === "ftlbs" ? 3.281 : 1;
  const inchesConversionFactor = calcUnits === "ftlbs" ? 39.37 : 1;

  const weight = +enteredWeight / weightConversionFactor;
  const height = +enteredHeight / heightConversionFactor;
  const inches = Number(enteredInches) / inchesConversionFactor;

  let bmi = calcUnits === "ftlbs" ? weight / ((height + inches) * (height + inches)) : weight / (height * height)


  setCalculatedBmi(bmi)
};

const resetInputs = () => {
  weightInputRef.current!.value = "";
  heightInputRef.current!.value = "";
  inchesInputRef.current!.value = "";
  setCalculatedBmi("");
}

const clearError = () =>
{
  setError("");
}

const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
  setCalcUnits(selectedValue);
}

  return (
    <React.Fragment>
    <IonAlert 
    isOpen={!!error} 
    message={error} 
    buttons={[{text: "Okay", handler: clearError}]}/>
  <IonApp>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">
                Your Height ({calcUnits === "mkg" ? "meters" : "feet"})
              </IonLabel>
              <IonInput type="number" ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        {calcUnits === "ftlbs" &&
        (<IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">
                Your Height (inches)
              </IonLabel>
              <IonInput type="number" ref={inchesInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>)}
        {calcUnits === "mkg" && (
          <IonInput className="ion-hide" type="number" ref={inchesInputRef}></IonInput>
        )}
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">
                Your Weight ({calcUnits === "mkg" ? "kg" : "lbs"})
                </IonLabel>
              <IonInput type="number" ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
        {calculatedBmi && (
          <BmiResult result={calculatedBmi}/>
          )}
      </IonGrid>
    </IonContent>
  </IonApp>
  </React.Fragment>
  )
}

export default App;
