#pragma strict

var isMovingThroughBalloon: boolean = false;
var isSingle:boolean = false;
var isTrap:boolean = false;

function OnTriggerEnter2D (hit: Collider2D) {

	if ( hit.CompareTag("Player") ) {
	
		hit.BroadcastMessage("RecordHeight");

		// If player is moving upwards, ignore collision
		if ( hit.gameObject.rigidbody2D.velocity.y > 0 ) {
			isMovingThroughBalloon = true;
			return;
		}
		
		if (isMovingThroughBalloon) {
			return;
		}
		
		if ( isTrap ) {
			Destroy( this.gameObject );
			return;
		}
		
		// If player is moving downwards/still, jump on balloon
		hit.gameObject.BroadcastMessage("Hop");
		
		if (isSingle) {
			Destroy( this.gameObject );
		}
	}
}

function OnTriggerExit2D () {

	isMovingThroughBalloon = false;
}