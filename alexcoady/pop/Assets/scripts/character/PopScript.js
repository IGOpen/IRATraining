#pragma strict

var maxSpeed:float = 10;
var jumpScale:float = 6;
var height:int = 0;

var scoreSkin: GUISkin;


function Start () {

//	anim = GetComponent("Animator");
}

function Update () {

	var move:float;

	// If gyroscope is available, use that mudda
	if ( SystemInfo.supportsGyroscope ) {
				
	    move = Input.acceleration.x;
	    // Speed this interaction up a bit
	    move *= 2;
	    		
	} else {
	
		move = Input.GetAxis("Horizontal");
	}

	rigidbody2D.velocity.x = move * maxSpeed;
}

function Hop () {

	rigidbody2D.velocity.y = rigidbody2D.gravityScale * jumpScale;
}

function RecordHeight () {

	height = Mathf.Ceil( transform.position.y );
}

function OnGUI () {

	GUI.skin = scoreSkin;
	
	GUI.Label( new Rect( Screen.width - 150, 10, 140, 140 ), '' + height );
}