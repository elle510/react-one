'use strict';

var React = require('react');
var ReactDom = require('react-dom');

var Util = require('../../../src/services/util');

var LiveObject = React.createClass({
	render: function() {
		return (
			<Pum.Splitter sizeLeft={200} minLeft={100} maxLeft={350} minHeight={300}>
				<Pum.SplitterPane>
					<div>
						TREE 영역
					</div>
					<div>
						TREE 영역
					</div>
				</Pum.SplitterPane>

				<Pum.SplitterPane type="v" sizeRight={700} minRight={300} maxRigit={1000}>
					<Pum.SplitterPane>
						조회 대상 영역
					</Pum.SplitterPane>

					<Pum.SplitterPane>
						조회 결과 영역
					</Pum.SplitterPane>
				</Pum.SplitterPane>
			</Pum.Splitter>
		);
	}
});

ReactDom.render(<LiveObject />, document.getElementById('app'));