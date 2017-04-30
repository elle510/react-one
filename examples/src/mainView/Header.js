
import React, { Component, PropTypes } from 'react';

const propTypes = {

};

const defaultProps = {
    
};

class Header extends Component {
    constructor(props) {
        super(props);

        // this.handleClick = this.handleClick.bind(this);
    }

    render() {
        
        return (
            <div>
                <div className="navbar">
                    <div className="navbar-header">
                        {/*<div className="navbar-brand">Logo</div>*/}
                        <div className="navbar-title">React UI Examples</div>
                    </div>
                </div>
                {/*<div className="navbar">
                    레이아웃: <Puf.DropDownList items={[]} width={100} />
                    스킨: <Puf.DropDownList url="/demo/data/skins.json" method="GET" width={100} onChange={this.onChangeSkin} />
                </div>*/}
            </div>
        )
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;