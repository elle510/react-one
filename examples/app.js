'use strict';

import React, { Component, PropTypes } from 'react';

import Menu from './Menu';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
				<div className="header">
                    React UI
				</div>

				<div className="main">
					<div className="left-frame">
                        <Menu />
					</div>

					<div className="center-frame">
                        <div className="path-breadcrumb"></div>
                        <div className="center-frame-content">
                            {this.props.children}
                        </div>
					</div>                   
				</div>
			</div>
        )
    }
}

export default App;