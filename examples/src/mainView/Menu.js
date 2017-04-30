import React, { Component, PropTypes } from 'react';
import { browserHistory, hashHistory, Link } from 'react-router';

const propTypes = {

};

const defaultProps = {
    
};

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*
        $.ajax({
            url: './json/main-menu.json',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('./json/main-menu.json', status, err.toString());
            }.bind(this)
        });
        */
    }

    render() {
        // 필수 항목
        return (
            <div className="ui bulleted list">
                <div className="item"><Link to="/button">Button</Link></div>
                <div className="item">Grid</div>
                <div className="item"><Link to="/tree">Tree</Link></div>
                {/*<div className="item">
                    <div>Benefits</div>
                    <div className="list">
                        <a className="item" href="#">Link to somewhere</a>
                        <div className="item">Rebates</div>
                        <div className="item">Discounts</div>
                    </div>
                </div>*/}
                <div className="item">TextInput</div>
                <div className="item">TextArea</div>
                <div className="item"><Link to="/select">Select</Link></div>
                <div className="item">Datepicker</div>
            </div>
        );
    }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;