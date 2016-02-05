// Camera
var cam: Camera;

// Wall objects
var leftWall: BoxCollider2D;
var rightWall: BoxCollider2D;
var bottomWall: BoxCollider2D;

function Start () {

	// Bouncy left wall
	leftWall.size = new Vector2 (1f, cam.ScreenToWorldPoint ( new Vector3 (0f, Screen.height * 2f, 0f)).y);
	leftWall.center = new Vector2(cam.ScreenToWorldPoint( new Vector3(0f, 0f, 0f)).x - 0.5f, 0f);
	
	// Bouncy right wall
	rightWall.size = new Vector2 (1f, cam.ScreenToWorldPoint ( new Vector3 (0f, Screen.height * 2f, 0f)).y);
	rightWall.center = new Vector2 (cam.ScreenToWorldPoint( new Vector3(Screen.width, 0f, 0f)).x + 0.5f, 0f);

	// Game over bottom wall
	bottomWall.size = new Vector2 (cam.ScreenToWorldPoint (new Vector3 (Screen.width * 2f, 0f, 0f)).x, 1f);
	bottomWall.center = new Vector2 (0f, cam.ScreenToWorldPoint (new Vector3 (0f, 0f, 0f)).y - 1.5f);
}