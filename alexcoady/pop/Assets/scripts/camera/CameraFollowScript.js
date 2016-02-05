#pragma strict

var pop: Transform;

function Update () {

	if (!pop) {
		return;
	}

	// Ensures camera moves up with Pop but doesn't ever move down
	transform.position.y += pop.position.y > transform.position.y ? pop.position.y - transform.position.y : 0;
}