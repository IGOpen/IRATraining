#pragma strict

function OnGUI () {

	GUI.Label ( new Rect( Screen.width / 2 - 40, 50, 80, 30 ), "GAME OVER" );
	
	// Retry button
	if (GUI.Button (new Rect (Screen.width / 2 - 30, 150, 60, 30), "Retry?")) {
				
		Application.LoadLevel(0);
	}
}