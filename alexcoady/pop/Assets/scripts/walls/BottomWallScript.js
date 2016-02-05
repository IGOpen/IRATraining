#pragma strict

function OnTriggerEnter2D (hit: Collider2D) {

	Debug.Log("BOTTOM!");

	if ( hit.CompareTag("Player") ) {
	
		Destroy( hit.gameObject );
		Application.LoadLevel(1);
	}
	
	if ( hit.CompareTag("Balloon") ) {
	
		Debug.Log("Balloon hit floor, destroy!");
		
		if ( hit.collider2D.transform.parent ) {
		
			Destroy( hit.collider2D.transform.parent.gameObject );
		
		} else {
		
			Destroy( hit.gameObject );
		}	
	}
}