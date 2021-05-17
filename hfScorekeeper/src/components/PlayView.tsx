import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  useIonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { GameProps } from "../models/props";

const PlayView = () => {
  // Store Game Info
  let gameProps = new GameProps();

  // Ionic Alerts
  const [present] = useIonAlert();

  // Stateful value to track which view to show the user
  let [playState, setPlayState] = useState<string>();

  // Stateful Forms - state creation
  let [players, setPlayers] = useState<number>();

  // Stateful Forms - state updates
  const playersChange = (event: any) => {
    setPlayers(event.target.value);
  };

  // Player Count form submission handler
  const createTeams = (event: React.FormEvent) => {
    event.preventDefault(); // Stop page from refreshing etc

    // Build out default template for the teams to be injected in next step
    if (players && players >= 2 && players % 2 === 0) {
      gameProps.playerCount = players;
      gameProps.teamCount = players / 2;
      for (let i = 0; i < gameProps.teamCount; i++) {
        gameProps.teams.push({ name: "", score: 0, opener: 50, members: [] });
      }
      setPlayState("buildTeams"); // Move to the next step
      return;
    }

    // Show alert if the data is bad
    present({
      header: `${players} Player(s) is Invalid`,
      message: `Use even values greater than 2`,
      buttons: ["Try Again"],
    });
    return;
  };

  if (playState === "start") {
    return (
      <div className="playView start">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Begin by answering some basic info!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={createTeams}>
              <IonItem>
                <IonLabel position="floating">Total Number of Players</IonLabel>
                <IonInput
                  required
                  type="number"
                  min="2"
                  name="players"
                  id="players"
                  value={players}
                  onIonChange={playersChange}
                ></IonInput>
              </IonItem>

              <IonButton type="submit">Confirm</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
    );
  }

  if (playState === "buildTeams") {
    return (
      <div className="playView buildTeams">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle></IonCardSubtitle>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={createTeams}>
              <IonItem>
                <IonLabel position="floating">Total Number of Players</IonLabel>

                <IonInput
                  required
                  type="number"
                  min="2"
                  name="players"
                  id="players"
                  value={players}
                  onIonChange={playersChange}
                ></IonInput>
              </IonItem>
              <IonButton type="submit">Confirm</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
    );
  }

  return (
    <div className="playView">
      <IonButton
        fill="outline"
        shape="round"
        color="secondary"
        onClick={() => setPlayState("start")}
      >
        Start!
      </IonButton>
    </div>
  );
};

export default PlayView;