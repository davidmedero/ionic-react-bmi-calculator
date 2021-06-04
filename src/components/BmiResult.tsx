import React from "react";
import {IonRow, IonCol, IonCard, IonCardContent} from "@ionic/react";

const BmiResult: React.FC<{result: number | string}> = props => {
return (
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                  <h2 className="ion-text-center">Your Body-Mass-Index</h2>
                <h3 className="ion-text-center">{Number(props.result).toFixed(2)}</h3>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
  );
};

export default BmiResult;