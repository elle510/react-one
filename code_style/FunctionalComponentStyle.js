'use strict';

// Type1
import React from 'react';

const FunctionalComponent = (props) => (
	<div>Hello { props.name }</div>
);

export default FunctionalComponent;

// Type2
import React from 'react';

const FunctionalComponent = ({ name }) => (
	<div>Hello { name }</div>
);

export default FunctionalComponent;

// Type3
import React from 'react';

const FunctionalComponent = (props) => {
	
	return (
		<div>Hello { props.name }</div>
	);
};

export default FunctionalComponent;

// Type4
import React from 'react';

const FunctionalComponent = ({ name }) => {
	
	return (
		<div>Hello { name }</div>
	);
};

export default FunctionalComponent;

// Type5
import React from 'react';

export default ({ name }) => <h1>Hello {name}!</h1>;